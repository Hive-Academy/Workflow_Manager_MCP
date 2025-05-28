import { ReportType } from '../../interfaces/service-contracts.interface';

export interface ReportFilters {
  startDate?: Date;
  endDate?: Date;
  taskId?: string;
  owner?: string;
  mode?: string;
  priority?: string;
}

export interface ReportGenerationResult {
  htmlContent: string;
  reportData: any;
  metadata: {
    reportType: ReportType;
    generatedAt: Date;
    filters: ReportFilters;
    dataSourcesUsed: string[];
    analyticsApplied: string[];
  };
}

/**
 * Base Report Generator Interface
 *
 * Each report type has its own generator that:
 * 1. Knows which data services to use
 * 2. Knows which analytics services to apply
 * 3. Combines them with the appropriate template
 * 4. Returns a complete report
 */
export interface IBaseReportGenerator {
  /**
   * Generate a complete report with data + analytics + template
   */
  generateReport(filters: ReportFilters): Promise<ReportGenerationResult>;

  /**
   * Get the report type this generator handles
   */
  getReportType(): ReportType;

  /**
   * Validate that the required filters are provided
   */
  validateFilters(filters: ReportFilters): void;
}
