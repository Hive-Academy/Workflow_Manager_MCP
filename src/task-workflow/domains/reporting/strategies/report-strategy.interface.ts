// src/task-workflow/domains/reporting/strategies/report-strategy.interface.ts

import { ReportType } from '../interfaces/service-contracts.interface';

/**
 * Simple Strategy Interface for Report Generation
 *
 * Extracts only the report-type-specific logic from ReportGeneratorService
 * while keeping all existing infrastructure intact
 */
export interface IReportStrategy {
  /**
   * Check if this strategy handles the given report type
   */
  canHandle(reportType: ReportType): boolean;

  /**
   * Get the report title for this type
   */
  getReportTitle(reportType: ReportType): string;

  /**
   * Determine which enhanced metrics to include
   */
  getRequiredMetrics(reportType: ReportType): {
    includeImplementationPlans: boolean;
    includeCodeReviewInsights: boolean;
    includeDelegationFlow: boolean;
    includeTimeSeries: boolean;
    includeBenchmarks: boolean;
  };
}
