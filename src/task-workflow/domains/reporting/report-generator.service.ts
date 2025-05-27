// src/task-workflow/domains/reporting/report-generator.service.ts

import { Injectable, Logger } from '@nestjs/common';
import {
  ReportType,
  WhereClause,
} from './interfaces/service-contracts.interface';
import {
  ReportData,
  ReportFilters,
  ReportMetrics,
} from './interfaces/report-data.interface';

// New Architecture Services
import { ReportPathGeneratorService } from './services/infrastructure/report-path-generator.service';
import { MetricsCalculatorService } from './services/data/metrics-calculator.service';
import { ReportTemplateService } from './services/core/report-template.service';

// Strategy Pattern for SOLID Principles
import { ReportStrategyFactory } from './strategies/report-strategy.factory';

// Data Transformation for Rich Metrics Utilization
import { ReportDataTransformer } from './transformers/report-data.transformer';
import {
  ContentGeneratorService,
  ChartGenerationService,
  ChartFactoryService,
  TimeSeriesAnalysisService,
  PerformanceBenchmarkService,
  RecommendationEngineService,
  TemplateFactoryService,
  EnhancedInsightsGeneratorService,
  SchemaDrivenIntelligenceService,
  SmartResponseSummarizationService,
  EnhancedInsight,
} from './services';

/**
 * Report Generator Service
 *
 * Follows SOLID principles:
 * - SRP: Single responsibility - orchestrates report generation
 * - OCP: Open for extension via new service implementations
 * - LSP: Services are substitutable via interfaces
 * - ISP: Clients depend only on interfaces they use
 * - DIP: Depends on abstractions, not concrete implementations
 *
 * SIMPLIFIED: Removed interface over-engineering, using direct service injection
 */
@Injectable()
export class ReportGeneratorService {
  private readonly logger = new Logger(ReportGeneratorService.name);

  constructor(
    // Strategy Pattern for SOLID Principles
    private readonly strategyFactory: ReportStrategyFactory,

    // Legacy Services (Backward Compatibility)
    private readonly metricsCalculator: MetricsCalculatorService,
    private readonly timeSeriesAnalysis: TimeSeriesAnalysisService,
    private readonly performanceBenchmark: PerformanceBenchmarkService,
    private readonly chartGeneration: ChartGenerationService,
    private readonly recommendationEngine: RecommendationEngineService,
    private readonly reportTemplate: ReportTemplateService,
    private readonly enhancedInsightsGenerator: EnhancedInsightsGeneratorService,
    private readonly contentGenerator: ContentGeneratorService,
    private readonly schemaIntelligence: SchemaDrivenIntelligenceService,
    private readonly smartSummarization: SmartResponseSummarizationService,
    private readonly chartFactory: ChartFactoryService,
    private readonly templateFactory: TemplateFactoryService,
    private readonly reportPathGenerator: ReportPathGeneratorService,
  ) {}

  /**
   * Generate complete report with data and template rendering
   * This is the preferred method for new implementations
   */
  async generateCompleteReport(
    reportType: ReportType,
    options: {
      startDate?: Date;
      endDate?: Date;
      taskId?: string;
      includeCharts?: boolean;
      priority?: string;
      owner?: string;
      mode?: string;
    } = {},
  ): Promise<string> {
    this.logger.log(`Generating complete report: ${reportType}`);

    // Build filters from options
    const filters = {
      ...(options.taskId && { taskId: options.taskId }),
      ...(options.priority && { priority: options.priority }),
      ...(options.owner && { owner: options.owner }),
      ...(options.mode && { mode: options.mode }),
    };

    // Generate report data
    const reportData = await this.generateReportData(
      reportType,
      options.startDate,
      options.endDate,
      Object.keys(filters).length > 0 ? filters : undefined,
    );

    // Render template
    return await this.renderReportTemplate(reportType, reportData);
  }

  /**
   * LEGACY: Main orchestration method - delegates to specialized services
   * Following SRP: This method only coordinates, doesn't implement business logic
   * @deprecated Use generateCompleteReport for new implementations
   */
  async generateReportData(
    reportType: ReportType,
    startDate?: Date,
    endDate?: Date,
    filters?: ReportFilters,
  ): Promise<ReportData> {
    this.logger.log(`Generating ${reportType} report data`);

    // Check if this is an individual task report (B005)
    if (this.isIndividualTaskReport(reportType)) {
      if (!filters?.taskId) {
        throw new Error(
          `Individual task report ${reportType} requires taskId filter`,
        );
      }
      return this.generateIndividualTaskReportData(reportType, filters.taskId);
    }

    const whereClause = this.buildWhereClause(startDate, endDate, filters);

    // Get base metrics (always required for aggregate reports)
    const baseMetrics = await this.getBaseMetrics(whereClause);

    // Get enhanced metrics based on report type using Strategy Pattern
    const strategy = this.strategyFactory.getStrategy(reportType);
    const metricsConfig = strategy.getRequiredMetrics(reportType);
    const enhancedMetrics = await this.getEnhancedMetrics(
      reportType,
      whereClause,
      startDate,
      endDate,
      metricsConfig,
    );

    // Combine all metrics
    const allMetrics: ReportMetrics = {
      ...baseMetrics,
      ...enhancedMetrics,
    };

    // Transform aggregate report data using rich metrics transformer
    const transformedAggregateData = this.transformAggregateReportData(
      reportType,
      baseMetrics,
      enhancedMetrics,
    );

    // Generate charts and recommendations using both chart services for enhanced visualization
    const [charts, enhancedCharts, recommendations] = await Promise.all([
      this.chartGeneration.generateChartData(
        baseMetrics.tasks,
        baseMetrics.delegations,
        baseMetrics.codeReviews,
        reportType,
        enhancedMetrics,
      ),
      this.generateEnhancedChartData(reportType, allMetrics),
      this.recommendationEngine.generateRecommendations(
        baseMetrics.tasks,
        baseMetrics.delegations,
        baseMetrics.codeReviews,
        baseMetrics.performance,
        enhancedMetrics,
      ),
    ]);

    const reportData: ReportData = {
      title: this.getReportTitle(reportType),
      generatedAt: new Date(),
      dateRange: startDate && endDate ? { startDate, endDate } : undefined,
      filters,
      metrics: allMetrics,
      charts: { ...charts, ...enhancedCharts },
      recommendations,
      // Add transformed aggregate data for template rendering
      ...transformedAggregateData,
    };

    // Add enhanced insights to the report data
    const enhancedInsights =
      this.enhancedInsightsGenerator.generateEnhancedInsights(
        reportType,
        reportData,
      );

    // Generate dynamic content using ContentGeneratorService
    const dynamicContent = this.generateDynamicContent(reportType, reportData);

    // Generate schema-driven insights for enhanced analysis
    const schemaInsights = await this.generateSchemaInsights(reportType, {
      ...reportData,
      enhancedInsights,
      dynamicContent,
    });

    return {
      ...reportData,
      enhancedInsights: [
        ...(enhancedInsights || []),
        ...(schemaInsights || []),
      ],
      dynamicContent,
    };
  }

  /**
   * Individual task report generation (B005)
   * Following SRP: Specialized method for task-specific reports
   */
  async generateIndividualTaskReportData(
    reportType: ReportType,
    taskId: string,
  ): Promise<ReportData> {
    this.logger.log(
      `Generating individual task report ${reportType} for task ${taskId}`,
    );

    // Get task-specific metrics based on report type
    const taskMetrics = await this.getIndividualTaskMetrics(reportType, taskId);

    // Transform metrics into template-expected structure using rich data transformer
    const transformedData = this.transformIndividualTaskDataWithRichMetrics(
      reportType,
      taskMetrics,
    );

    // Generate task-specific charts and recommendations
    const [charts, recommendations] = await Promise.all([
      this.chartGeneration.generateTaskSpecificChartData(
        reportType,
        taskMetrics,
      ),
      this.recommendationEngine.generateTaskSpecificRecommendations(
        reportType,
        taskMetrics,
      ),
    ]);

    const reportData: ReportData = {
      title: this.getTaskReportTitle(reportType, taskId),
      generatedAt: new Date(),
      taskId,
      metrics: { taskSpecific: taskMetrics },
      charts,
      recommendations,
      // Add transformed data for template rendering
      ...transformedData,
    };

    // Generate dynamic content for individual task reports
    const dynamicContent = this.generateDynamicContent(reportType, reportData);

    // Generate schema-driven insights for individual task reports
    const schemaInsights = await this.generateSchemaInsights(reportType, {
      ...reportData,
      dynamicContent,
    });

    return {
      ...reportData,
      dynamicContent,
      enhancedInsights: schemaInsights,
    };
  }

  /**
   * Template rendering - delegates to specialized service
   */
  async renderReportTemplate(
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
      return this.reportTemplate.renderReportTemplate(reportType, data);
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
  private generateDynamicContent(
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
  private async generateSchemaInsights(
    reportType: ReportType,
    data: ReportData,
  ): Promise<import('./interfaces/report-data.interface').EnhancedInsight[]> {
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

  // Private orchestration methods
  private async getBaseMetrics(whereClause: WhereClause): Promise<{
    tasks: import('./interfaces/metrics.interface').TaskMetrics;
    delegations: import('./interfaces/metrics.interface').DelegationMetrics;
    codeReviews: import('./interfaces/metrics.interface').CodeReviewMetrics;
    performance: import('./interfaces/metrics.interface').PerformanceMetrics;
  }> {
    const [tasks, delegations, codeReviews, performance] = await Promise.all([
      this.metricsCalculator.getTaskMetrics(whereClause),
      this.metricsCalculator.getDelegationMetrics(whereClause),
      this.metricsCalculator.getCodeReviewMetrics(whereClause),
      this.metricsCalculator.getPerformanceMetrics(whereClause),
    ]);

    return { tasks, delegations, codeReviews, performance };
  }

  private async getEnhancedMetrics(
    reportType: ReportType,
    whereClause: WhereClause,
    startDate?: Date,
    endDate?: Date,
    metricsConfig?: {
      includeImplementationPlans: boolean;
      includeCodeReviewInsights: boolean;
      includeDelegationFlow: boolean;
      includeTimeSeries: boolean;
      includeBenchmarks: boolean;
    },
  ) {
    const enhancedMetrics: Partial<ReportMetrics> = {};

    // Use strategy configuration instead of hardcoded methods
    const config = metricsConfig || this.getDefaultMetricsConfig(reportType);

    // Implementation Plan Analytics
    if (config.includeImplementationPlans) {
      enhancedMetrics.implementationPlans =
        await this.metricsCalculator.getImplementationPlanMetrics(whereClause);
    }

    // Code Review Insights
    if (config.includeCodeReviewInsights) {
      enhancedMetrics.codeReviewInsights =
        await this.metricsCalculator.getCodeReviewInsights(whereClause);
    }

    // Delegation Flow Analysis
    if (config.includeDelegationFlow) {
      enhancedMetrics.delegationFlow =
        await this.metricsCalculator.getDelegationFlowMetrics(whereClause);
    }

    // Time Series Analysis
    if (config.includeTimeSeries) {
      enhancedMetrics.timeSeriesAnalysis =
        await this.timeSeriesAnalysis.getTimeSeriesMetrics(
          whereClause,
          startDate,
          endDate,
        );
    }

    // Performance Benchmarks
    if (config.includeBenchmarks) {
      enhancedMetrics.performanceBenchmarks =
        await this.performanceBenchmark.getPerformanceBenchmarks(
          whereClause,
          startDate,
          endDate,
        );
    }

    return enhancedMetrics;
  }

  // Fallback method for backward compatibility
  private getDefaultMetricsConfig(reportType: ReportType) {
    try {
      const strategy = this.strategyFactory.getStrategy(reportType);
      return strategy.getRequiredMetrics(reportType);
    } catch {
      // Fallback to legacy logic if strategy not found
      return {
        includeImplementationPlans: [
          'implementation_plan_analytics',
          'comprehensive',
        ].includes(reportType),
        includeCodeReviewInsights: [
          'code_review_insights',
          'comprehensive',
        ].includes(reportType),
        includeDelegationFlow: [
          'delegation_flow_analysis',
          'comprehensive',
        ].includes(reportType),
        includeTimeSeries: ['performance_dashboard', 'comprehensive'].includes(
          reportType,
        ),
        includeBenchmarks: ['performance_dashboard', 'comprehensive'].includes(
          reportType,
        ),
      };
    }
  }

  // Utility methods
  private buildWhereClause(
    startDate?: Date,
    endDate?: Date,
    filters?: ReportFilters,
  ): WhereClause {
    return {
      ...(startDate &&
        endDate && {
          creationDate: {
            gte: startDate,
            lte: endDate,
          },
        }),
      ...(filters?.owner && { owner: filters.owner }),
      ...(filters?.mode && { currentMode: filters.mode }),
      ...(filters?.priority && { priority: filters.priority }),
    };
  }

  private getReportTitle(reportType: ReportType): string {
    try {
      const strategy = this.strategyFactory.getStrategy(reportType);
      return strategy.getReportTitle(reportType);
    } catch {
      // Fallback for unknown report types
      return `${reportType} Report`;
    }
  }

  // Individual task report helper methods (B005)
  private isIndividualTaskReport(reportType: ReportType): boolean {
    const individualTaskReports: ReportType[] = [
      'task_progress_health',
      'implementation_execution',
      'code_review_quality',
      'delegation_flow_analysis_task',
      'research_documentation',
      'communication_collaboration',
    ];
    return individualTaskReports.includes(reportType);
  }

  private async getIndividualTaskMetrics(
    reportType: ReportType,
    taskId: string,
  ): Promise<any> {
    switch (reportType) {
      case 'task_progress_health':
        return this.metricsCalculator.getTaskProgressHealthMetrics(taskId);
      case 'implementation_execution':
        return this.metricsCalculator.getImplementationExecutionMetrics(taskId);
      case 'code_review_quality':
        return this.metricsCalculator.getCodeReviewQualityMetrics(taskId);
      case 'delegation_flow_analysis_task':
        return this.metricsCalculator.getTaskDelegationFlowMetrics(taskId);
      case 'research_documentation':
        return this.metricsCalculator.getResearchDocumentationMetrics(taskId);
      case 'communication_collaboration':
        return this.metricsCalculator.getCommunicationCollaborationMetrics(
          taskId,
        );
      default:
        throw new Error(
          `Unsupported individual task report type: ${reportType}`,
        );
    }
  }

  private getTaskReportTitle(reportType: ReportType, taskId: string): string {
    const baseTitle = this.getReportTitle(reportType);
    return `${baseTitle} - ${taskId}`;
  }

  /**
   * Transform aggregate report data using rich metrics transformer
   * Replaces basic metrics passing with structured template-ready data
   */
  private transformAggregateReportData(
    reportType: ReportType,
    baseMetrics: any,
    enhancedMetrics: any,
  ): any {
    switch (reportType) {
      case 'task_summary':
        return ReportDataTransformer.transformTaskSummaryData(
          baseMetrics.tasks,
          baseMetrics.delegations,
          baseMetrics.codeReviews,
          baseMetrics.performance,
        );
      case 'delegation_analytics':
        return ReportDataTransformer.transformDelegationAnalyticsData(
          baseMetrics.delegations,
          enhancedMetrics.delegationFlow,
        );
      case 'implementation_plan_analytics':
        return ReportDataTransformer.transformImplementationPlanAnalyticsData(
          enhancedMetrics.implementationPlans,
        );
      case 'code_review_insights':
        return ReportDataTransformer.transformCodeReviewInsightsData(
          enhancedMetrics.codeReviewInsights,
        );
      case 'performance_dashboard':
      case 'comprehensive':
      case 'delegation_flow_analysis':
        // For now, return empty object - these need custom transformers
        return {};
      default:
        return {};
    }
  }

  /**
   * Transform individual task metrics into template-expected structure
   * Converts flat metrics into nested objects expected by Handlebars templates
   */
  /**
   * Transform individual task data using rich metrics transformer
   * Replaces hardcoded placeholder transformations with rich data utilization
   */
  private transformIndividualTaskDataWithRichMetrics(
    reportType: ReportType,
    taskMetrics: any,
  ): any {
    switch (reportType) {
      case 'task_progress_health':
        return ReportDataTransformer.transformTaskProgressHealthData(
          taskMetrics,
        );
      case 'implementation_execution':
        return ReportDataTransformer.transformImplementationExecutionData(
          taskMetrics,
        );
      case 'code_review_quality':
        return ReportDataTransformer.transformCodeReviewQualityData(
          taskMetrics,
        );
      case 'delegation_flow_analysis_task':
        return ReportDataTransformer.transformTaskDelegationFlowData(
          taskMetrics,
        );
      case 'research_documentation':
        return ReportDataTransformer.transformResearchDocumentationData(
          taskMetrics,
        );
      case 'communication_collaboration':
        return ReportDataTransformer.transformCommunicationCollaborationData(
          taskMetrics,
        );
      default:
        return {};
    }
  }

  // Old placeholder transformation methods removed - replaced by ReportDataTransformer

  /**
   * Generate enhanced chart data using ChartFactoryService
   * Integrates the sophisticated 2,532-line ChartFactoryService for advanced visualizations
   */
  private generateEnhancedChartData(
    reportType: ReportType,
    metrics: ReportMetrics,
  ): any {
    try {
      // Use ChartFactoryService for advanced chart generation
      return this.chartFactory.createCharts(
        reportType,
        {
          taskMetrics: metrics.tasks,
          delegationMetrics: metrics.delegations,
          codeReviewMetrics: metrics.codeReviews,
        },
        metrics,
      );
    } catch (error) {
      this.logger.warn(`Failed to generate enhanced charts: ${error.message}`);
      return {};
    }
  }

  /**
   * Generate optimized report path using ReportPathGeneratorService
   * Provides intelligent file organization and naming
   */
  generateOptimizedReportPath(options: {
    reportType: ReportType;
    outputFormat: string;
    taskId?: string;
    startDate?: Date;
    endDate?: Date;
    filters?: ReportFilters;
    basePath?: string;
  }): { filename: string; folderPath: string; fullPath: string } {
    return this.reportPathGenerator.generateReportPath({
      reportType: options.reportType,
      outputFormat: options.outputFormat,
      taskId: options.taskId,
      startDate: options.startDate,
      endDate: options.endDate,
      filters: options.filters,
      basePath: options.basePath,
    });
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
      return this.reportTemplate.renderReportTemplate(reportType, enhancedData);
    } catch (error) {
      this.logger.warn(
        `Failed to generate enhanced template: ${error.message}`,
      );
      // Fallback to standard template service
      return this.reportTemplate.renderReportTemplate(reportType, data);
    }
  }
}
