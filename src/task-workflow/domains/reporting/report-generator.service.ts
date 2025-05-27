// src/task-workflow/domains/reporting/report-generator.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { ReportType } from './interfaces/service-contracts.interface';
import {
  ReportData,
  ReportFilters,
  EnhancedInsight,
} from './interfaces/report-data.interface';

// Refactored Services - All business logic delegated to these
import { ReportDataAccessService } from './services/data/report-data-access.service';
import { ChartCoordinationService } from './services/analytics/chart-coordination.service';
import { TemplateRenderingService } from './services/rendering/template-rendering.service';
import { MetricsCoordinationService } from './services/coordination/metrics-coordination.service';
import { RecommendationEngineService } from './services/analytics/recommendation-engine.service';

// Infrastructure Services
import { ReportPathGeneratorService } from './services/infrastructure/report-path-generator.service';

/**
 * Report Generator Service - THIN ORCHESTRATOR
 *
 * REFACTORED: Simplified to be a thin orchestrator following SOLID principles
 *
 * SOLID PRINCIPLES APPLIED:
 * - SRP: Single responsibility - orchestrates report generation workflow
 * - OCP: Open for extension via service implementations
 * - LSP: Services are substitutable via interfaces
 * - ISP: Clients depend only on interfaces they use
 * - DIP: Depends on abstractions, not concrete implementations
 *
 * ARCHITECTURE: All business logic extracted to focused services:
 * - ReportDataAccessService: Data retrieval and filtering
 * - MetricsCoordinationService: Enhanced metrics coordination
 * - ChartCoordinationService: Chart generation coordination
 * - TemplateRenderingService: Template rendering and coordination
 * - ReportPathGeneratorService: Path generation utilities
 */
@Injectable()
export class ReportGeneratorService {
  private readonly logger = new Logger(ReportGeneratorService.name);

  constructor(
    // Core Orchestration Services
    private readonly dataAccess: ReportDataAccessService,
    private readonly metricsCoordination: MetricsCoordinationService,
    private readonly chartCoordination: ChartCoordinationService,
    private readonly templateRendering: TemplateRenderingService,
    private readonly recommendationEngine: RecommendationEngineService,

    // Infrastructure Services
    private readonly reportPathGenerator: ReportPathGeneratorService,
  ) {}

  /**
   * MAIN PUBLIC API: Generate complete report with data and template rendering
   * This is the preferred method for all report generation
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

    try {
      // Step 1: Generate report data using orchestrated services
      const reportData = await this.generateReportData(
        reportType,
        options.startDate,
        options.endDate,
        this.buildFiltersFromOptions(options),
      );

      // Step 2: Render template using TemplateRenderingService
      return await this.templateRendering.renderReportTemplateWithCoordination(
        reportType,
        reportData,
      );
    } catch (error) {
      this.logger.error(
        `Failed to generate complete report ${reportType}:`,
        error.stack,
      );
      throw new Error(`Report generation failed: ${error.message}`);
    }
  }

  /**
   * ORCHESTRATION METHOD: Generate report data by coordinating services
   * Delegates all business logic to specialized services
   */
  async generateReportData(
    reportType: ReportType,
    startDate?: Date,
    endDate?: Date,
    filters?: ReportFilters,
  ): Promise<ReportData> {
    this.logger.log(`Orchestrating ${reportType} report data generation`);

    try {
      // Delegate individual task report handling to ReportDataAccessService
      if (this.dataAccess.isIndividualTaskReport(reportType)) {
        if (!filters?.taskId) {
          throw new Error(
            `Individual task report ${reportType} requires taskId filter`,
          );
        }
        return this.generateIndividualTaskReportData(
          reportType,
          filters.taskId,
        );
      }

      // Delegate aggregate report generation to coordinated services
      return this.generateAggregateReportData(
        reportType,
        startDate,
        endDate,
        filters,
      );
    } catch (error) {
      this.logger.error(
        `Failed to orchestrate report data for ${reportType}:`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * PRIVATE ORCHESTRATION: Generate aggregate report data
   * Coordinates multiple services to build comprehensive report data
   */
  private async generateAggregateReportData(
    reportType: ReportType,
    startDate?: Date,
    endDate?: Date,
    filters?: ReportFilters,
  ): Promise<ReportData> {
    // Special handling for task_summary - use typed interface with proper chart integration
    if (reportType === 'task_summary') {
      const whereClause = this.dataAccess.buildWhereClause(
        startDate,
        endDate,
        filters,
      );

      // Get base metrics for chart generation
      const baseMetrics = await this.dataAccess.getBaseMetrics(whereClause);

      // Get task summary data (without chart generation)
      const taskSummaryData = await this.dataAccess.getTaskSummaryDataLegacy(
        startDate,
        endDate,
        filters,
      );

      // Generate charts using ChartCoordinationService (PROPER INTEGRATION!)
      const charts = await this.chartCoordination.generateAllCharts(
        reportType,
        baseMetrics,
        {}, // No enhanced metrics needed for task summary
      );

      // Convert TaskSummaryReportData to ReportData format
      return {
        ...taskSummaryData,
        dateRange: startDate && endDate ? { startDate, endDate } : undefined,
        charts, // Use actual chart services!
        recommendations: [], // TODO: Add recommendations for task summary
      } as ReportData;
    }

    // Step 1: Build where clause using ReportDataAccessService
    const whereClause = this.dataAccess.buildWhereClause(
      startDate,
      endDate,
      filters,
    );

    // Step 2: Get base metrics using ReportDataAccessService
    const baseMetrics = await this.dataAccess.getBaseMetrics(whereClause);

    // Step 3: Get enhanced metrics using MetricsCoordinationService
    const enhancedMetrics = await this.metricsCoordination.getEnhancedMetrics(
      reportType,
      whereClause,
      startDate,
      endDate,
    );

    // Step 4: Generate charts using ChartCoordinationService
    const charts = await this.chartCoordination.generateAllCharts(
      reportType,
      baseMetrics,
      enhancedMetrics,
    );

    // Step 5: Generate recommendations using RecommendationEngineService
    const recommendations = this.recommendationEngine.generateRecommendations(
      baseMetrics.tasks,
      baseMetrics.delegations,
      baseMetrics.codeReviews,
      baseMetrics.performance,
      enhancedMetrics,
    );

    // Step 6: Assemble final report data
    return {
      title: this.getReportTitle(reportType),
      generatedAt: new Date(),
      dateRange: startDate && endDate ? { startDate, endDate } : undefined,
      filters,
      metrics: {
        ...baseMetrics,
        ...enhancedMetrics,
      },
      charts,
      recommendations,
    };
  }

  /**
   * INDIVIDUAL TASK REPORT: Generate individual task report data
   * Delegates to ReportDataAccessService for task-specific metrics
   */
  private async generateIndividualTaskReportData(
    reportType: ReportType,
    taskId: string,
  ): Promise<ReportData> {
    this.logger.log(
      `Generating individual task report: ${reportType} for ${taskId}`,
    );

    // Get task-specific metrics using data access service
    const taskMetrics = await this.dataAccess.getIndividualTaskMetrics(
      reportType,
      taskId,
    );

    // For individual task reports, create minimal structure
    const reportData: ReportData = {
      title: this.getTaskReportTitle(reportType, taskId),
      generatedAt: new Date(),
      taskId,
      metrics: { taskSpecific: taskMetrics },
      charts: [], // Individual task reports typically don't need charts
      recommendations:
        this.recommendationEngine.generateTaskSpecificRecommendations(
          taskId,
          taskMetrics,
        ),
    };

    return reportData;
  }

  /**
   * TEMPLATE RENDERING: Delegate to TemplateRenderingService
   */
  async renderReportTemplate(
    reportType: ReportType,
    data: ReportData,
    customizations?: any,
  ): Promise<string> {
    return this.templateRendering.renderReportTemplateWithCoordination(
      reportType,
      data,
      customizations,
    );
  }

  /**
   * INSIGHTS GENERATION: Delegate to TemplateRenderingService
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
    return this.templateRendering.generateInsightsWithSmartResponse(
      reportType,
      reportData,
      filePath,
    );
  }

  /**
   * SMART SUMMARY: Delegate to TemplateRenderingService
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
    return this.templateRendering.generateSmartSummary(
      reportType,
      reportData,
      filePath,
      maxTokens,
    );
  }

  /**
   * ENHANCED TEMPLATE: Delegate to TemplateRenderingService
   */
  async generateEnhancedTemplate(
    reportType: ReportType,
    data: ReportData,
    customizations?: any,
  ): Promise<string> {
    return this.templateRendering.generateEnhancedTemplate(
      reportType,
      data,
      customizations,
    );
  }

  /**
   * PATH GENERATION: Delegate to ReportPathGeneratorService
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
    return this.reportPathGenerator.generateReportPath(options);
  }

  /**
   * UTILITY METHODS: Simple orchestration helpers
   */
  private buildFiltersFromOptions(options: {
    taskId?: string;
    priority?: string;
    owner?: string;
    mode?: string;
  }): ReportFilters | undefined {
    const filters: ReportFilters = {};

    if (options.taskId) filters.taskId = options.taskId;
    if (options.priority) filters.priority = options.priority;
    if (options.owner) filters.owner = options.owner;
    if (options.mode) filters.mode = options.mode;

    return Object.keys(filters).length > 0 ? filters : undefined;
  }

  private getReportTitle(reportType: ReportType): string {
    const titles: Record<ReportType, string> = {
      task_summary: 'Task Summary Report',
      delegation_analytics: 'Delegation Analytics Report',
      performance_dashboard: 'Performance Dashboard Report',
      comprehensive: 'Comprehensive Workflow Report',
      implementation_plan_analytics: 'Implementation Plan Analytics Report',
      code_review_insights: 'Code Review Insights Report',
      delegation_flow_analysis: 'Delegation Flow Analysis Report',
      task_progress_health: 'Task Progress Health Report',
      implementation_execution: 'Implementation Execution Report',
      code_review_quality: 'Code Review Quality Report',
      delegation_flow_analysis_task: 'Task Delegation Flow Analysis Report',
      research_documentation: 'Research Documentation Report',
      communication_collaboration: 'Communication Collaboration Report',
    };

    return titles[reportType] || `${reportType} Report`;
  }

  private getTaskReportTitle(reportType: ReportType, taskId: string): string {
    const baseTitle = this.getReportTitle(reportType);
    return `${baseTitle} - ${taskId}`;
  }
}
