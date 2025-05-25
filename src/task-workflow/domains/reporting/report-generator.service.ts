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
import { EnhancedInsightsGeneratorService } from './services/enhanced-insights-generator.service';
import { MetricsCalculatorService } from './services/metrics-calculator.service';
import { TimeSeriesAnalysisService } from './services/time-series-analysis.service';
import { PerformanceBenchmarkService } from './services/performance-benchmark.service';
import { ChartGenerationRefactoredService } from './services/chart-generation-refactored.service';
import { RecommendationEngineService } from './services/recommendation-engine.service';
import { ReportTemplateService } from './services/report-template.service';
import { ContentGeneratorService } from './services/content-generator.service';

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
    private readonly metricsCalculator: MetricsCalculatorService,
    private readonly timeSeriesAnalysis: TimeSeriesAnalysisService,
    private readonly performanceBenchmark: PerformanceBenchmarkService,
    private readonly chartGeneration: ChartGenerationRefactoredService,
    private readonly recommendationEngine: RecommendationEngineService,
    private readonly reportTemplate: ReportTemplateService,
    private readonly enhancedInsightsGenerator: EnhancedInsightsGeneratorService,
    private readonly contentGenerator: ContentGeneratorService,
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

    const reportData: ReportData = {
      title: this.getReportTitle(reportType),
      generatedAt: new Date(),
      dateRange: startDate && endDate ? { startDate, endDate } : undefined,
      filters,
      metrics: allMetrics,
      charts,
      recommendations,
    };

    // Add enhanced insights to the report data
    const enhancedInsights =
      this.enhancedInsightsGenerator.generateEnhancedInsights(
        reportType,
        reportData,
      );

    // Generate dynamic content using ContentGeneratorService
    const dynamicContent = this.generateDynamicContent(reportType, reportData);

    return {
      ...reportData,
      enhancedInsights,
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
    };

    // Generate dynamic content for individual task reports
    const dynamicContent = this.generateDynamicContent(reportType, reportData);

    return {
      ...reportData,
      dynamicContent,
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

  /**
   * Generate enhanced insights with smart MCP response
   * Used by MCP operations service for token-efficient responses
   */
  async generateInsightsWithSmartResponse(
    reportType: ReportType,
    reportData: ReportData,
    filePath: string,
  ): Promise<{
    insights: import('./services/enhanced-insights-generator.service').EnhancedInsight[];
    smartResponse: {
      summary: string;
      keyInsights: string[];
      actionableRecommendations: string[];
      tokenCount: number;
    };
  }> {
    return this.enhancedInsightsGenerator.generateInsightsWithSmartResponse(
      reportType,
      reportData,
      filePath,
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
      // Individual Task Report Types (B005)
      task_progress_health: 'Task Progress Health Report',
      implementation_execution: 'Implementation Execution Report',
      code_review_quality: 'Code Review Quality Report',
      delegation_flow_analysis_task: 'Task Delegation Flow Analysis Report',
      research_documentation: 'Research Documentation Report',
      communication_collaboration: 'Communication Collaboration Report',
    };
    return titles[reportType] || 'Workflow Report';
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
}
