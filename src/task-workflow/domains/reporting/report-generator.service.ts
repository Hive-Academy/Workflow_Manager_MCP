// src/task-workflow/domains/reporting/report-generator.service.ts

import { Injectable, Logger, Inject } from '@nestjs/common';
import {
  ReportType,
  WhereClause,
  IMetricsCalculatorService,
  ITimeSeriesAnalysisService,
  IPerformanceBenchmarkService,
  IChartGenerationService,
  IRecommendationEngineService,
  IReportTemplateService,
} from './interfaces/service-contracts.interface';
import {
  ReportData,
  ReportFilters,
  ReportMetrics,
} from './interfaces/report-data.interface';

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
 * Refactored from 1,761-line God Class to focused ~150-line orchestrator
 */
@Injectable()
export class ReportGeneratorService {
  private readonly logger = new Logger(ReportGeneratorService.name);

  constructor(
    @Inject('IMetricsCalculatorService')
    private readonly metricsCalculator: IMetricsCalculatorService,
    @Inject('ITimeSeriesAnalysisService')
    private readonly timeSeriesAnalysis: ITimeSeriesAnalysisService,
    @Inject('IPerformanceBenchmarkService')
    private readonly performanceBenchmark: IPerformanceBenchmarkService,
    @Inject('IChartGenerationService')
    private readonly chartGeneration: IChartGenerationService,
    @Inject('IRecommendationEngineService')
    private readonly recommendationEngine: IRecommendationEngineService,
    @Inject('IReportTemplateService')
    private readonly reportTemplate: IReportTemplateService,
  ) {}

  /**
   * Main orchestration method - delegates to specialized services
   * Following SRP: This method only coordinates, doesn't implement business logic
   */
  async generateReportData(
    reportType: ReportType,
    startDate?: Date,
    endDate?: Date,
    filters?: ReportFilters,
  ): Promise<ReportData> {
    this.logger.log(`Generating ${reportType} report data`);

    const whereClause = this.buildWhereClause(startDate, endDate, filters);

    // Get base metrics (always required)
    const baseMetrics = await this.getBaseMetrics(whereClause);

    // Get enhanced metrics based on report type (OCP in action)
    const enhancedMetrics = await this.getEnhancedMetrics(
      reportType,
      whereClause,
      startDate,
      endDate,
    );

    // Combine all metrics
    const allMetrics: ReportMetrics = {
      ...baseMetrics,
      ...enhancedMetrics,
    };

    // Generate charts and recommendations
    const [charts, recommendations] = await Promise.all([
      this.chartGeneration.generateChartData(
        baseMetrics.tasks,
        baseMetrics.delegations,
        baseMetrics.codeReviews,
        reportType,
        enhancedMetrics,
      ),
      this.recommendationEngine.generateRecommendations(
        baseMetrics.tasks,
        baseMetrics.delegations,
        baseMetrics.codeReviews,
        baseMetrics.performance,
        enhancedMetrics,
      ),
    ]);

    return {
      title: this.getReportTitle(reportType),
      generatedAt: new Date(),
      dateRange: startDate && endDate ? { startDate, endDate } : undefined,
      filters,
      metrics: allMetrics,
      charts,
      recommendations,
    };
  }

  /**
   * Template rendering - delegates to specialized service
   */
  async renderReportTemplate(
    reportType: ReportType,
    data: ReportData,
  ): Promise<string> {
    return this.reportTemplate.renderReportTemplate(reportType, data);
  }

  /**
   * File management - delegates to specialized service
   */
  async saveTemporaryFile(
    content: string,
    extension: string = 'html',
  ): Promise<string> {
    return this.reportTemplate.saveTemporaryFile(content, extension);
  }

  async cleanupTemporaryFile(filepath: string): Promise<void> {
    return this.reportTemplate.cleanupTemporaryFile(filepath);
  }

  // Private orchestration methods
  private async getBaseMetrics(whereClause: WhereClause) {
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
  ) {
    const enhancedMetrics: Partial<ReportMetrics> = {};

    // Implementation Plan Analytics
    if (this.shouldIncludeImplementationPlans(reportType)) {
      enhancedMetrics.implementationPlans =
        await this.metricsCalculator.getImplementationPlanMetrics(whereClause);
    }

    // Code Review Insights
    if (this.shouldIncludeCodeReviewInsights(reportType)) {
      enhancedMetrics.codeReviewInsights =
        await this.metricsCalculator.getCodeReviewInsights(whereClause);
    }

    // Delegation Flow Analysis
    if (this.shouldIncludeDelegationFlow(reportType)) {
      enhancedMetrics.delegationFlow =
        await this.metricsCalculator.getDelegationFlowMetrics(whereClause);
    }

    // Time Series Analysis
    if (this.shouldIncludeTimeSeries(reportType)) {
      enhancedMetrics.timeSeriesAnalysis =
        await this.timeSeriesAnalysis.getTimeSeriesMetrics(
          whereClause,
          startDate,
          endDate,
        );
    }

    // Performance Benchmarks
    if (this.shouldIncludeBenchmarks(reportType)) {
      enhancedMetrics.performanceBenchmarks =
        await this.performanceBenchmark.getPerformanceBenchmarks(
          whereClause,
          startDate,
          endDate,
        );
    }

    return enhancedMetrics;
  }

  // Strategy pattern for determining what metrics to include (OCP principle)
  private shouldIncludeImplementationPlans(reportType: ReportType): boolean {
    return (
      reportType === 'implementation_plan_analytics' ||
      reportType === 'comprehensive'
    );
  }

  private shouldIncludeCodeReviewInsights(reportType: ReportType): boolean {
    return (
      reportType === 'code_review_insights' || reportType === 'comprehensive'
    );
  }

  private shouldIncludeDelegationFlow(reportType: ReportType): boolean {
    return (
      reportType === 'delegation_flow_analysis' ||
      reportType === 'comprehensive'
    );
  }

  private shouldIncludeTimeSeries(reportType: ReportType): boolean {
    return (
      reportType === 'performance_dashboard' || reportType === 'comprehensive'
    );
  }

  private shouldIncludeBenchmarks(reportType: ReportType): boolean {
    return (
      reportType === 'performance_dashboard' || reportType === 'comprehensive'
    );
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
    const titles: Record<ReportType, string> = {
      task_summary: 'Task Summary Report',
      delegation_analytics: 'Delegation Analytics Report',
      performance_dashboard: 'Performance Dashboard Report',
      comprehensive: 'Comprehensive Workflow Report',
      implementation_plan_analytics: 'Implementation Plan Analytics Report',
      code_review_insights: 'Code Review Insights Report',
      delegation_flow_analysis: 'Delegation Flow Analysis Report',
    };
    return titles[reportType] || 'Workflow Report';
  }
}
