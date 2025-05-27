import { Injectable, Logger } from '@nestjs/common';
import {
  ReportType,
  WhereClause,
} from '../../interfaces/service-contracts.interface';
import { ReportMetrics } from '../../interfaces/report-data.interface';

// Import the services that handle individual metric types
import { MetricsCalculatorService } from '../data/metrics-calculator.service';
import { CoreMetricsService } from '../data/core-metrics.service';
import { TimeSeriesAnalysisService } from '../analytics/time-series-analysis.service';
import { PerformanceBenchmarkService } from '../analytics/performance-benchmark.service';
import { ReportStrategyFactory } from '../../strategies/report-strategy.factory';

/**
 * Metrics Coordination Service
 *
 * Follows SRP: Single responsibility for coordinating different metric types
 * Follows OCP: Open for extension via new metric types
 * Follows DIP: Depends on abstractions, not concrete implementations
 *
 * Extracts enhanced metrics coordination logic from ReportGeneratorService
 */
@Injectable()
export class MetricsCoordinationService {
  private readonly logger = new Logger(MetricsCoordinationService.name);

  constructor(
    private readonly metricsCalculator: MetricsCalculatorService,
    private readonly coreMetrics: CoreMetricsService,
    private readonly timeSeriesAnalysis: TimeSeriesAnalysisService,
    private readonly performanceBenchmark: PerformanceBenchmarkService,
    private readonly strategyFactory: ReportStrategyFactory,
  ) {}

  /**
   * Get enhanced metrics based on report type and configuration
   * Extracted from ReportGeneratorService.getEnhancedMetrics()
   */
  async getEnhancedMetrics(
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
  ): Promise<Partial<ReportMetrics>> {
    this.logger.log(`Coordinating enhanced metrics for ${reportType}`);

    const enhancedMetrics: Partial<ReportMetrics> = {};

    // Use strategy configuration instead of hardcoded methods
    const config = metricsConfig || this.getDefaultMetricsConfig(reportType);

    try {
      // Implementation Plan Analytics
      if (config.includeImplementationPlans) {
        enhancedMetrics.implementationPlans =
          await this.metricsCalculator.getImplementationPlanMetrics(
            whereClause,
          );
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

      this.logger.log(
        `Enhanced metrics coordination completed for ${reportType}`,
      );
      return enhancedMetrics;
    } catch (error) {
      this.logger.error(
        `Failed to coordinate enhanced metrics for ${reportType}:`,
        error.stack,
      );
      // Return empty metrics on error to prevent cascade failures
      return {};
    }
  }

  /**
   * Get default metrics configuration for a report type
   * Extracted from ReportGeneratorService.getDefaultMetricsConfig()
   */
  private getDefaultMetricsConfig(reportType: ReportType): {
    includeImplementationPlans: boolean;
    includeCodeReviewInsights: boolean;
    includeDelegationFlow: boolean;
    includeTimeSeries: boolean;
    includeBenchmarks: boolean;
  } {
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

  /**
   * Get metrics configuration for a specific report type
   * Allows external customization of metrics inclusion
   */
  getMetricsConfigForReportType(reportType: ReportType): {
    includeImplementationPlans: boolean;
    includeCodeReviewInsights: boolean;
    includeDelegationFlow: boolean;
    includeTimeSeries: boolean;
    includeBenchmarks: boolean;
  } {
    return this.getDefaultMetricsConfig(reportType);
  }

  /**
   * Validate metrics configuration
   * Ensures configuration is valid before processing
   */
  validateMetricsConfig(config: {
    includeImplementationPlans: boolean;
    includeCodeReviewInsights: boolean;
    includeDelegationFlow: boolean;
    includeTimeSeries: boolean;
    includeBenchmarks: boolean;
  }): boolean {
    // At least one metric type should be included
    return (
      config.includeImplementationPlans ||
      config.includeCodeReviewInsights ||
      config.includeDelegationFlow ||
      config.includeTimeSeries ||
      config.includeBenchmarks
    );
  }
}
