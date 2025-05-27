// src/task-workflow/domains/reporting/services/rendering/template-rendering.service.ts

import { Injectable, Logger } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as fs from 'fs/promises';
import * as path from 'path';

import {
  IReportTemplateService,
  ReportType,
} from '../../interfaces/service-contracts.interface';
import {
  ReportData,
  EnhancedInsight,
} from '../../interfaces/report-data.interface';
import { ReportingConfigService } from '../infrastructure/reporting-config.service';

// Import services for coordination
import { ContentGeneratorService } from '../core/content-generator.service';
import { TemplateFactoryService } from './template-factory.service';
import { EnhancedInsightsGeneratorService } from '../analytics/enhanced-insights-generator.service';
import { SchemaDrivenIntelligenceService } from '../analytics/schema-driven-intelligence.service';
import { SmartResponseSummarizationService } from '../analytics/smart-response-summarization.service';
import { IndividualTaskTemplateDataService } from '../data/individual-task-template-data.service';

/**
 * Template Rendering Service
 *
 * SINGLE RESPONSIBILITY: Template compilation and rendering
 * - Manages Handlebars template engine
 * - Handles template compilation and caching
 * - Provides template rendering with data injection
 * - Manages template helpers and partials
 *
 * DEPENDENCIES:
 * - ReportingConfigService: For template path resolution
 *
 * SOLID PRINCIPLES:
 * - SRP: Only handles template rendering concerns
 * - OCP: Extensible through helper registration
 * - DIP: Depends on abstractions (interfaces)
 */
@Injectable()
export class TemplateRenderingService implements IReportTemplateService {
  private readonly logger = new Logger(TemplateRenderingService.name);
  private readonly handlebarsInstance: typeof Handlebars;
  private readonly templateCache = new Map<
    string,
    HandlebarsTemplateDelegate
  >();

  constructor(
    private readonly config: ReportingConfigService,
    private readonly contentGenerator: ContentGeneratorService,
    private readonly templateFactory: TemplateFactoryService,
    private readonly enhancedInsightsGenerator: EnhancedInsightsGeneratorService,
    private readonly schemaIntelligence: SchemaDrivenIntelligenceService,
    private readonly smartSummarization: SmartResponseSummarizationService,
    private readonly individualTaskTemplateData: IndividualTaskTemplateDataService,
  ) {
    this.handlebarsInstance = Handlebars.create();
    this.registerHelpers();
    // Register partials asynchronously (don't await in constructor)
    this.registerPartials().catch((error) => {
      this.logger.error(
        'Failed to register partials during initialization:',
        error,
      );
    });
  }

  /**
   * Render a report template with provided data
   */
  async renderReportTemplate(
    reportType: ReportType,
    data: ReportData,
  ): Promise<string> {
    try {
      const templatePath = this.getTemplatePath(reportType);
      const template = await this.getCompiledTemplate(templatePath);

      const enhancedData = this.enhanceDataForRendering(data, reportType);
      return template(enhancedData);
    } catch (error) {
      this.logger.error(
        `Failed to render template for ${reportType}`,
        error.stack,
      );
      return this.generateErrorTemplate(reportType, data, error);
    }
  }

  /**
   * COORDINATION METHODS - Extracted from ReportGeneratorService
   */

  /**
   * Render report template with enhanced coordination
   * Handles fallback to standard template if enhanced fails
   */
  async renderReportTemplateWithCoordination(
    reportType: ReportType,
    data: ReportData,
    customizations?: any,
  ): Promise<string> {
    try {
      // Use enhanced template generation with TemplateFactoryService
      return await this.generateEnhancedTemplate(
        reportType,
        data,
        customizations,
      );
    } catch (error) {
      this.logger.warn(
        `Enhanced template generation failed for ${reportType}, falling back to standard template: ${error.message}`,
      );
      // Fallback to standard template service
      return this.renderReportTemplate(reportType, data);
    }
  }

  /**
   * Generate enhanced insights with smart MCP response
   * Used by MCP operations service for token-efficient responses
   */
  async generateInsightsWithSmartResponse(
    reportType: ReportType,
    reportData: ReportData,
    filePath: string,
  ): Promise<{
    insights: EnhancedInsight[];
    smartResponse: {
      summary: string;
      keyInsights: string[];
      actionableRecommendations: string[];
      tokenCount: number;
    };
  }> {
    // Get enhanced insights from the insights generator
    const insightsResult =
      await this.enhancedInsightsGenerator.generateInsightsWithSmartResponse(
        reportType,
        reportData,
        filePath,
      );

    // Generate optimized smart summary using SmartResponseSummarizationService
    const smartSummary = await this.smartSummarization.createOptimizedSummary(
      reportType,
      reportData,
      filePath,
    );

    // Combine insights with optimized smart response
    return {
      insights: insightsResult.insights,
      smartResponse: smartSummary,
    };
  }

  /**
   * Generate smart summary for MCP responses
   * Creates token-efficient summaries that direct users to comprehensive reports
   */
  async generateSmartSummary(
    reportType: ReportType,
    reportData: ReportData,
    filePath: string,
    maxTokens: number = 200,
  ): Promise<{
    summary: string;
    keyInsights: string[];
    actionableRecommendations: string[];
    tokenCount: number;
  }> {
    return this.smartSummarization.createOptimizedSummary(
      reportType,
      reportData,
      filePath,
      maxTokens,
    );
  }

  /**
   * Generate dynamic content using ContentGeneratorService
   * Provides executive summaries, key insights, and actionable recommendations
   */
  generateDynamicContent(
    reportType: ReportType,
    data: ReportData,
  ): {
    executiveSummary: string;
    keyInsights: string[];
    actionableRecommendations: string[];
    detailedAnalysis: string;
  } {
    return {
      executiveSummary: this.contentGenerator.generateExecutiveSummary(
        reportType,
        data,
      ),
      keyInsights: this.contentGenerator.generateKeyInsights(reportType, data),
      actionableRecommendations:
        this.contentGenerator.generateActionableRecommendations(
          reportType,
          data,
        ),
      detailedAnalysis: this.contentGenerator.generateDetailedAnalysis(
        reportType,
        data,
      ),
    };
  }

  /**
   * Generate schema-driven insights using SchemaDrivenIntelligenceService
   * Provides database schema analysis and intelligent recommendations
   */
  async generateSchemaInsights(
    reportType: ReportType,
    data: ReportData,
  ): Promise<EnhancedInsight[]> {
    try {
      // Create a temporary file path for schema analysis (not actually used for file operations)
      const tempFilePath = `temp-${reportType}-${Date.now()}.html`;

      const schemaResult = await this.schemaIntelligence.generateSchemaInsights(
        reportType,
        data,
        tempFilePath,
      );

      return schemaResult.enhancedReportData.enhancedInsights || [];
    } catch (error) {
      this.logger.warn(
        `Failed to generate schema insights for ${reportType}: ${error.message}`,
      );
      return [];
    }
  }

  /**
   * Render individual task template with specialized data service
   * Handles task-specific report types that require detailed analysis
   */
  async renderIndividualTaskTemplate(
    reportType: ReportType,
    taskId: string,
    filters?: Record<string, string>,
  ): Promise<string> {
    try {
      this.logger.debug(
        `Rendering individual task template: ${reportType} for task: ${taskId}`,
      );

      // Get task-specific data using the specialized service
      let templateData: any;

      switch (reportType) {
        case 'task_progress_health':
          templateData =
            await this.individualTaskTemplateData.getTaskProgressHealthData(
              taskId,
              filters,
            );
          break;
        case 'implementation_execution':
          templateData =
            await this.individualTaskTemplateData.getImplementationExecutionData(
              taskId,
              filters,
            );
          break;
        case 'code_review_quality':
          templateData =
            await this.individualTaskTemplateData.getCodeReviewQualityData(
              taskId,
              filters,
            );
          break;
        case 'research_documentation':
          templateData =
            await this.individualTaskTemplateData.getResearchDocumentationData(
              taskId,
              filters,
            );
          break;
        case 'communication_collaboration':
          templateData =
            await this.individualTaskTemplateData.getCommunicationCollaborationData(
              taskId,
              filters,
            );
          break;
        default:
          throw new Error(
            `Unsupported individual task report type: ${reportType}`,
          );
      }

      // Convert to ReportData format for template rendering
      const reportData: ReportData = {
        title: this.getIndividualTaskReportTitle(reportType, taskId),
        generatedAt: new Date(),
        taskId,
        metrics: { taskSpecific: templateData },
        charts: [],
        recommendations: [],
      };

      // Render using standard template rendering with enhanced data
      return await this.renderReportTemplate(reportType, reportData);
    } catch (error) {
      this.logger.error(
        `Failed to render individual task template ${reportType} for task ${taskId}`,
        error.stack,
      );
      return this.generateIndividualTaskErrorTemplate(
        reportType,
        taskId,
        error,
      );
    }
  }

  /**
   * Get appropriate title for individual task reports
   */
  private getIndividualTaskReportTitle(
    reportType: ReportType,
    taskId: string,
  ): string {
    const titleMap = {
      task_progress_health: `Task Progress Health Analysis - ${taskId}`,
      implementation_execution: `Implementation Execution Analysis - ${taskId}`,
      code_review_quality: `Code Review Quality Assessment - ${taskId}`,
      research_documentation: `Research Documentation Analysis - ${taskId}`,
      communication_collaboration: `Communication & Collaboration Analysis - ${taskId}`,
    };

    return (
      titleMap[reportType as keyof typeof titleMap] ||
      `Individual Task Report - ${taskId}`
    );
  }

  /**
   * Generate error template for individual task reports
   */
  private generateIndividualTaskErrorTemplate(
    reportType: ReportType,
    taskId: string,
    error: any,
  ): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Individual Task Report Error - ${taskId}</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-50 p-8">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="bg-red-100 p-3 rounded-full mr-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Individual Task Report Error</h1>
              <p class="text-gray-600">Report Type: ${reportType} | Task ID: ${taskId}</p>
            </div>
          </div>
          
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h2 class="text-lg font-semibold text-red-800 mb-2">Error Details</h2>
            <p class="text-red-700 font-mono text-sm">${error.message}</p>
          </div>
          
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 class="text-lg font-semibold text-blue-800 mb-2">Troubleshooting</h2>
            <ul class="text-blue-700 text-sm space-y-1">
              <li>• Verify that task ID "${taskId}" exists in the system</li>
              <li>• Check that the task has sufficient data for ${reportType} analysis</li>
              <li>• Ensure the IndividualTaskTemplateDataService is properly configured</li>
              <li>• Review the template file for ${reportType.replace(/_/g, '-')}.hbs</li>
            </ul>
          </div>
        </div>
      </body>
    </html>
    `;
  }

  /**
   * Generate enhanced template using TemplateFactoryService
   * Provides sophisticated template generation and customization
   */
  async generateEnhancedTemplate(
    reportType: ReportType,
    data: ReportData,
    customizations?: any,
  ): Promise<string> {
    try {
      // Enhance data with template factory configurations
      const chartConfig =
        this.templateFactory.getChartConfiguration(reportType);
      const contentPriority =
        this.templateFactory.getContentPriority(reportType);
      const shouldIncludeCharts =
        this.templateFactory.shouldIncludeCharts(reportType);

      // Create enhanced data with factory configurations
      // PRESERVE rich transformed data from ReportDataTransformer
      const enhancedData = {
        ...data,
        chartConfig,
        contentPriority,
        shouldIncludeCharts,
        customizations: customizations || {},
        // Only add content generation if not already provided by transformer
        ...(data.dynamicContent || {
          executiveSummary: this.contentGenerator.generateExecutiveSummary(
            reportType,
            data,
          ),
          keyInsights: this.contentGenerator.generateKeyInsights(
            reportType,
            data,
          ),
          actionableRecommendations:
            this.contentGenerator.generateActionableRecommendations(
              reportType,
              data,
            ),
        }),
      };

      // Use the enhanced template rendering with factory configurations
      return this.renderReportTemplate(reportType, enhancedData);
    } catch (error) {
      this.logger.warn(
        `Failed to generate enhanced template: ${error.message}`,
      );
      // Fallback to standard template service
      return this.renderReportTemplate(reportType, data);
    }
  }

  /**
   * Get compiled template with caching
   */
  private async getCompiledTemplate(
    templatePath: string,
  ): Promise<HandlebarsTemplateDelegate> {
    if (this.templateCache.has(templatePath)) {
      return this.templateCache.get(templatePath)!;
    }

    const templateSource = await fs.readFile(templatePath, 'utf-8');
    const compiledTemplate = this.handlebarsInstance.compile(templateSource);

    // Cache in production for performance
    if (process.env.NODE_ENV === 'production') {
      this.templateCache.set(templatePath, compiledTemplate);
    }

    return compiledTemplate;
  }

  /**
   * Enhance data with rendering metadata and utilities
   */
  private enhanceDataForRendering(
    data: ReportData,
    reportType: ReportType,
  ): any {
    // Transform metrics structure to match template expectations
    const transformedMetrics = this.transformMetricsForTemplate(
      data.metrics,
      reportType,
    );

    // Transform charts to include chartData structure expected by templates
    const chartData = this.transformChartsForTemplate(data.charts);

    return {
      ...data,
      // Template metadata
      reportType,
      generatedAt: new Date().toISOString(),
      templateVersion: '2.0.0',

      // Flattened metrics structure for template compatibility
      metrics: transformedMetrics,

      // Chart data in expected format
      chartData,

      // Utility functions available in templates
      utils: {
        formatDate: (date: Date) => date?.toLocaleDateString() || 'N/A',
        formatDateTime: (date: Date) => date?.toLocaleString() || 'N/A',
        formatNumber: (num: number) => num?.toLocaleString() || '0',
        formatPercentage: (num: number) => `${(num || 0).toFixed(1)}%`,
        formatDuration: (hours: number) => {
          if (!hours) return 'N/A';
          if (hours < 1) return `${Math.round(hours * 60)}m`;
          if (hours < 24) return `${hours.toFixed(1)}h`;
          return `${Math.round(hours / 24)}d`;
        },
      },
    };
  }

  /**
   * Transform nested metrics structure to flat structure expected by templates
   */
  private transformMetricsForTemplate(
    metrics: any,
    _reportType: ReportType,
  ): any {
    // For individual task reports, return the taskSpecific metrics directly
    if (metrics.taskSpecific) {
      return metrics.taskSpecific;
    }

    // For aggregate reports, flatten the nested structure
    const transformed: any = {};

    // Flatten task metrics to root level (task-summary template expects this)
    if (metrics.tasks) {
      Object.assign(transformed, metrics.tasks);
    }

    // Keep other metrics nested for specific templates that expect them
    if (metrics.delegations) {
      transformed.delegations = metrics.delegations;
    }
    if (metrics.codeReviews) {
      transformed.codeReviews = metrics.codeReviews;
    }
    if (metrics.performance) {
      transformed.performance = metrics.performance;
    }
    if (metrics.timeSeriesAnalysis) {
      transformed.timeSeriesAnalysis = metrics.timeSeriesAnalysis;
    }
    if (metrics.implementationPlans) {
      transformed.implementationPlans = metrics.implementationPlans;
    }
    if (metrics.codeReviewInsights) {
      transformed.codeReviewInsights = metrics.codeReviewInsights;
    }
    if (metrics.delegationFlow) {
      transformed.delegationFlow = metrics.delegationFlow;
    }

    return transformed;
  }

  /**
   * Transform charts array to chartData structure expected by templates
   */
  private transformChartsForTemplate(charts: any[]): any {
    if (!Array.isArray(charts) || charts.length === 0) {
      return {
        statusLabels: [],
        statusData: [],
        priorityLabels: [],
        priorityData: [],
      };
    }

    // Find specific charts by type or title
    const statusChart = charts.find(
      (chart) =>
        chart.title?.toLowerCase().includes('status') ||
        chart.type === 'pie' ||
        chart.type === 'doughnut',
    );

    const priorityChart = charts.find(
      (chart) =>
        chart.title?.toLowerCase().includes('priority') || chart.type === 'bar',
    );

    return {
      statusLabels: statusChart?.labels || [],
      statusData: statusChart?.datasets?.[0]?.data || [],
      priorityLabels: priorityChart?.labels || [],
      priorityData: priorityChart?.datasets?.[0]?.data || [],
    };
  }

  /**
   * Get template file path for report type
   */
  private getTemplatePath(reportType: ReportType): string {
    const templateFileName = `${reportType.replace(/_/g, '-')}.hbs`;
    return path.join(this.config.templatesPath, templateFileName);
  }

  /**
   * Register Handlebars helpers for enhanced template functionality
   */
  private registerHelpers(): void {
    // Date formatting helpers
    this.handlebarsInstance.registerHelper('formatDate', (date: Date) => {
      return date ? new Date(date).toLocaleDateString() : 'N/A';
    });

    this.handlebarsInstance.registerHelper('formatDateTime', (date: Date) => {
      return date ? new Date(date).toLocaleString() : 'N/A';
    });

    this.handlebarsInstance.registerHelper('formatTime', (date: Date) => {
      return date ? new Date(date).toLocaleTimeString() : 'N/A';
    });

    // Number formatting helpers
    this.handlebarsInstance.registerHelper('formatNumber', (num: number) => {
      return typeof num === 'number' ? num.toLocaleString() : '0';
    });

    this.handlebarsInstance.registerHelper(
      'formatPercentage',
      (num: number) => {
        return typeof num === 'number' ? `${num.toFixed(1)}%` : '0%';
      },
    );

    this.handlebarsInstance.registerHelper('formatCurrency', (num: number) => {
      return typeof num === 'number' ? `$${num.toLocaleString()}` : '$0';
    });

    this.handlebarsInstance.registerHelper(
      'formatDuration',
      (hours: number) => {
        if (typeof hours !== 'number') return 'N/A';
        if (hours < 1) return `${Math.round(hours * 60)}m`;
        if (hours < 24) return `${hours.toFixed(1)}h`;
        return `${Math.round(hours / 24)}d`;
      },
    );

    // String helpers
    this.handlebarsInstance.registerHelper('capitalize', (str: string) => {
      return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    });

    this.handlebarsInstance.registerHelper('uppercase', (str: string) => {
      return str ? str.toUpperCase() : '';
    });

    this.handlebarsInstance.registerHelper(
      'truncate',
      (str: string, length: number) => {
        if (!str) return '';
        return str.length > length ? str.substring(0, length) + '...' : str;
      },
    );

    // Conditional helpers
    this.handlebarsInstance.registerHelper('eq', (a: any, b: any) => a === b);
    this.handlebarsInstance.registerHelper('ne', (a: any, b: any) => a !== b);
    this.handlebarsInstance.registerHelper(
      'gt',
      (a: number, b: number) => a > b,
    );
    this.handlebarsInstance.registerHelper(
      'lt',
      (a: number, b: number) => a < b,
    );
    this.handlebarsInstance.registerHelper(
      'gte',
      (a: number, b: number) => a >= b,
    );
    this.handlebarsInstance.registerHelper(
      'lte',
      (a: number, b: number) => a <= b,
    );

    // Array helpers
    this.handlebarsInstance.registerHelper('length', (array: any[]) => {
      return Array.isArray(array) ? array.length : 0;
    });
    this.handlebarsInstance.registerHelper('first', (array: unknown[]) => {
      return Array.isArray(array) && array.length > 0 ? array[0] : null;
    });

    this.handlebarsInstance.registerHelper('last', (array: unknown[]) => {
      return Array.isArray(array) && array.length > 0
        ? array[array.length - 1]
        : null;
    });

    // Chart.js helper for generating chart configurations
    this.handlebarsInstance.registerHelper('chartConfig', (chartData: any) => {
      return JSON.stringify(chartData);
    });

    // Status badge helper for Tailwind CSS classes
    this.handlebarsInstance.registerHelper('statusBadge', (status: string) => {
      const statusClasses = {
        completed: 'bg-green-100 text-green-800 border-green-200',
        'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
        'not-started': 'bg-gray-100 text-gray-800 border-gray-200',
        'needs-review': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'needs-changes': 'bg-red-100 text-red-800 border-red-200',
        paused: 'bg-orange-100 text-orange-800 border-orange-200',
        cancelled: 'bg-red-100 text-red-800 border-red-200',
      };
      return (
        statusClasses[status as keyof typeof statusClasses] ||
        'bg-gray-100 text-gray-800 border-gray-200'
      );
    });

    // Priority badge helper
    this.handlebarsInstance.registerHelper(
      'priorityBadge',
      (priority: string) => {
        const priorityClasses = {
          Critical: 'bg-red-500 text-white',
          High: 'bg-orange-500 text-white',
          Medium: 'bg-yellow-500 text-white',
          Low: 'bg-green-500 text-white',
        } as const;
        return (
          priorityClasses[priority as keyof typeof priorityClasses] ||
          'bg-gray-500 text-white'
        );
      },
    );

    // Math helpers
    this.handlebarsInstance.registerHelper(
      'add',
      (a: number, b: number) => (a || 0) + (b || 0),
    );
    this.handlebarsInstance.registerHelper(
      'subtract',
      (a: number, b: number) => (a || 0) - (b || 0),
    );
    this.handlebarsInstance.registerHelper(
      'multiply',
      (a: number, b: number) => (a || 0) * (b || 0),
    );
    this.handlebarsInstance.registerHelper('divide', (a: number, b: number) =>
      b !== 0 ? (a || 0) / b : 0,
    );

    // JSON helper for debugging
    this.handlebarsInstance.registerHelper('json', (obj: any) => {
      return JSON.stringify(obj, null, 2);
    });

    this.logger.log('Handlebars helpers registered successfully');
  }

  /**
   * Register Handlebars partials from the layouts directory
   */
  private async registerPartials(): Promise<void> {
    try {
      const layoutsPath = path.join(this.config.templatesPath, 'layouts');

      // Check if layouts directory exists
      try {
        await fs.access(layoutsPath);
      } catch {
        this.logger.warn(`Layouts directory not found: ${layoutsPath}`);
        return;
      }

      // Read all .hbs files in the layouts directory
      const layoutFiles = await fs.readdir(layoutsPath);
      const hbsFiles = layoutFiles.filter((file) => file.endsWith('.hbs'));

      for (const file of hbsFiles) {
        const partialName = `layouts/${path.basename(file, '.hbs')}`;
        const partialPath = path.join(layoutsPath, file);

        try {
          const partialContent = await fs.readFile(partialPath, 'utf-8');
          this.handlebarsInstance.registerPartial(partialName, partialContent);
          this.logger.log(`Registered partial: ${partialName}`);
        } catch (error) {
          this.logger.error(
            `Failed to register partial ${partialName}:`,
            error,
          );
        }
      }

      this.logger.log(`Successfully registered ${hbsFiles.length} partials`);
    } catch (error) {
      this.logger.error('Failed to register partials:', error);
    }
  }

  /**
   * Generate error template when rendering fails
   */
  private generateErrorTemplate(
    reportType: ReportType,
    data: ReportData,
    error: any,
  ): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Template Error - ${data.title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-50 p-8">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="bg-red-100 p-3 rounded-full mr-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Template Rendering Error</h1>
              <p class="text-gray-600">Report Type: ${reportType}</p>
            </div>
          </div>
          
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h2 class="text-lg font-semibold text-red-800 mb-2">Error Details</h2>
            <p class="text-red-700 font-mono text-sm">${error.message}</p>
          </div>
          
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h2 class="text-lg font-semibold text-gray-800 mb-2">Raw Data</h2>
            <pre class="text-sm text-gray-600 overflow-auto">${JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </body>
    </html>
    `;
  }

  /**
   * Clear template cache (useful for development)
   */
  clearCache(): void {
    this.templateCache.clear();
    this.logger.log('Template cache cleared');
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.templateCache.size,
      keys: Array.from(this.templateCache.keys()),
    };
  }
}
