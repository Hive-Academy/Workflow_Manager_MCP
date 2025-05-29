import { Injectable, Logger } from '@nestjs/common';
import { ReportType } from '../../interfaces/service-contracts.interface';
import {
  IBaseReportGenerator,
  ReportFilters,
  ReportGenerationResult,
} from './base-report-generator.interface';

// Import all simplified generators (using data services as glue layer)
import { PerformanceDashboardGeneratorService } from './performance-dashboard-generator.service';
import { TaskProgressHealthGeneratorService } from './task-progress-health-generator.service';
import { TaskSummaryGeneratorService } from './task-summary-generator.service';

/**
 * Report Generator Factory
 *
 * Routes report generation requests to the appropriate focused generator.
 * Each generator knows exactly which data and analytics services to combine
 * for its specific report type.
 *
 * This follows the Factory Pattern and Single Responsibility Principle:
 * - Each generator has one job: generate one specific report type
 * - Factory has one job: route to the right generator
 * - No complex orchestration or bloated services
 */
@Injectable()
export class ReportGeneratorFactoryService {
  private readonly logger = new Logger(ReportGeneratorFactoryService.name);
  private readonly generators = new Map<ReportType, IBaseReportGenerator>();

  constructor(
    // Register all generators
    private readonly performanceDashboardGenerator: PerformanceDashboardGeneratorService,
    private readonly taskProgressHealthGenerator: TaskProgressHealthGeneratorService,
    private readonly taskSummaryGenerator: TaskSummaryGeneratorService,
    // TODO: Add other generators as we create them
  ) {
    this.registerGenerators();
  }

  private registerGenerators(): void {
    // Register each generator with its report type
    this.generators.set(
      'performance_dashboard',
      this.performanceDashboardGenerator,
    );
    this.generators.set(
      'task_progress_health',
      this.taskProgressHealthGenerator,
    );
    this.generators.set('task_summary', this.taskSummaryGenerator);

    // TODO: Register other generators
    // this.generators.set('delegation_analytics', this.delegationAnalyticsGenerator);
    // this.generators.set('code_review_insights', this.codeReviewInsightsGenerator);
    // etc.

    this.logger.log(`Registered ${this.generators.size} report generators`);
  }

  /**
   * Generate a report using the appropriate focused generator
   */
  async generateReport(
    reportType: ReportType,
    filters: ReportFilters,
  ): Promise<ReportGenerationResult> {
    this.logger.log(`Generating report: ${reportType}`);

    const generator = this.generators.get(reportType);
    if (!generator) {
      throw new Error(`No generator found for report type: ${reportType}`);
    }

    try {
      return await generator.generateReport(filters);
    } catch (error) {
      this.logger.error(`Failed to generate ${reportType} report`, error);
      throw error;
    }
  }

  /**
   * Get all supported report types
   */
  getSupportedReportTypes(): ReportType[] {
    return Array.from(this.generators.keys());
  }

  /**
   * Check if a report type is supported
   */
  isReportTypeSupported(reportType: ReportType): boolean {
    return this.generators.has(reportType);
  }

  /**
   * Get generator for a specific report type (for testing/debugging)
   */
  getGenerator(reportType: ReportType): IBaseReportGenerator | undefined {
    return this.generators.get(reportType);
  }
}
