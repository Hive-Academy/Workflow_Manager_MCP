/**
 * Specialized Template Data Service (Coordinator)
 *
 * Coordinator service that delegates to focused specialized services.
 * This service maintains the original interface while distributing
 * responsibilities to smaller, focused services.
 *
 * This service coordinates:
 * - Comprehensive executive reports
 * - Implementation plan analytics
 * - Code review insights
 * - Delegation flow analysis
 */

import { Injectable, Logger } from '@nestjs/common';
import { ReportFilters } from '../../interfaces/report-data.interface';
import {
  CodeReviewInsightsDataService,
  CodeReviewInsightsTemplateData,
} from '../../interfaces/templates/code-review-insights-template.interface';
import {
  ComprehensiveDataService,
  ComprehensiveTemplateData,
} from '../../interfaces/templates/comprehensive-template.interface';
import {
  DelegationFlowAnalysisDataService,
  DelegationFlowAnalysisTemplateData,
} from '../../interfaces/templates/delegation-flow-analysis-template.interface';
import { ImplementationPlanAnalyticsDataService } from '../../interfaces/templates/implementation-plan-analytics-template.interface';
import { AdvancedAnalyticsService } from '../analytics/advanced-analytics.service';
import { PerformanceBenchmarkService } from '../analytics/performance-benchmark.service';
import { TimeSeriesAnalysisService } from '../analytics/time-series-analysis.service';
import { CodeReviewDelegationTemplateDataService } from './code-review-delegation-template-data.service';
import { ComprehensiveTemplateDataService } from './comprehensive-template-data.service';
import { ImplementationPlanTemplateDataService } from './implementation-plan-template-data.service';
import { IndividualTaskTemplateDataService } from './individual-task-template-data.service';
import { ReportDataAccessService } from './report-data-access.service';

@Injectable()
export class SpecializedTemplateDataService
  implements
    ComprehensiveDataService,
    ImplementationPlanAnalyticsDataService,
    CodeReviewInsightsDataService,
    DelegationFlowAnalysisDataService
{
  private readonly logger = new Logger(SpecializedTemplateDataService.name);

  constructor(
    private readonly comprehensiveService: ComprehensiveTemplateDataService,
    private readonly implementationPlanService: ImplementationPlanTemplateDataService,
    private readonly codeReviewDelegationService: CodeReviewDelegationTemplateDataService,
    private readonly individualTaskService: IndividualTaskTemplateDataService,
    private readonly advancedAnalytics: AdvancedAnalyticsService,
    private readonly timeSeriesAnalysis: TimeSeriesAnalysisService,
    private readonly performanceBenchmark: PerformanceBenchmarkService,
    private readonly reportDataAccess: ReportDataAccessService,
  ) {}

  /**
   * Get comprehensive analytics data combining all report types
   * Delegates to ComprehensiveTemplateDataService
   */
  async getComprehensiveData(
    startDate: Date,
    endDate: Date,
    filters?: Record<string, string>,
  ): Promise<ComprehensiveTemplateData> {
    this.logger.debug('Delegating comprehensive analytics data generation');
    return this.comprehensiveService.getComprehensiveData(
      startDate,
      endDate,
      filters,
    );
  }

  /**
   * Get implementation plan analytics with rich insights
   * Combines advanced analytics with implementation-specific metrics
   */
  async getImplementationPlanAnalyticsData(
    startDate: Date,
    endDate: Date,
    filters: Record<string, string>,
  ): Promise<any> {
    this.logger.debug(
      'Generating implementation plan analytics with rich insights',
    );

    const whereClause = this.reportDataAccess.buildWhereClause(
      startDate,
      endDate,
      filters as ReportFilters,
    );

    // GET RICH ANALYTICS DATA
    const [
      implementationPlanData,
      advancedMetrics,
      timeSeriesData,
      benchmarkData,
    ] = await Promise.all([
      this.implementationPlanService.getImplementationPlanAnalyticsData(
        startDate,
        endDate,
        filters,
      ),
      this.advancedAnalytics.getImplementationPlanMetrics(whereClause),
      this.timeSeriesAnalysis.getTimeSeriesMetrics(
        whereClause,
        startDate,
        endDate,
      ),
      this.performanceBenchmark.getPerformanceBenchmarks(
        whereClause,
        startDate,
        endDate,
      ),
    ]);

    // ENHANCE with rich analytics
    return {
      ...implementationPlanData,
      // Add rich analytics insights
      advancedInsights: {
        planEfficiency: advancedMetrics.planEfficiencyScore || 0,
        estimationAccuracy: advancedMetrics.estimationAccuracy || 0,
        batchCompletionRate: advancedMetrics.batchCompletionRate || 0,
        avgBatchesPerPlan: advancedMetrics.avgBatchesPerPlan || 0,
      },
      trends: {
        weeklyTrends: timeSeriesData.weeklyTrends || [],
        performanceTrends: timeSeriesData.performanceTrends || [],
        historicalPatterns: timeSeriesData.historicalPatterns || [],
      },
      benchmarks: {
        teamBenchmarks: benchmarkData.teamBenchmarks || [],
        performanceRankings: benchmarkData.performanceRankings || [],
        benchmarkInsights: benchmarkData.benchmarkInsights || [],
      },
      generatedAt: new Date(),
    };
  }

  /**
   * Get code review insights data
   * Delegates to CodeReviewDelegationTemplateDataService
   */
  async getCodeReviewInsightsData(
    startDate: Date,
    endDate: Date,
    filters?: Record<string, string>,
  ): Promise<CodeReviewInsightsTemplateData> {
    this.logger.debug('Delegating code review insights data generation');
    return this.codeReviewDelegationService.getCodeReviewInsightsData(
      startDate,
      endDate,
      filters,
    );
  }

  /**
   * Get delegation flow analysis data
   * Delegates to CodeReviewDelegationTemplateDataService
   */
  async getDelegationFlowAnalysisData(
    startDate: Date,
    endDate: Date,
    filters?: Record<string, string>,
  ): Promise<DelegationFlowAnalysisTemplateData> {
    this.logger.debug('Delegating delegation flow analysis data generation');
    return this.codeReviewDelegationService.getDelegationFlowAnalysisData(
      startDate,
      endDate,
      filters,
    );
  }
}
