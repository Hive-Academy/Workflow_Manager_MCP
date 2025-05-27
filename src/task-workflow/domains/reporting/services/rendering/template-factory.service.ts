// src/task-workflow/domains/reporting/services/template-factory.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { ReportType } from '../../interfaces/service-contracts.interface';

/**
 * Template Factory Service
 *
 * Follows Single Responsibility Principle (SRP):
 * - Only responsible for creating appropriate templates for different report types
 * - Delegates actual template content to separate template classes
 */
@Injectable()
export class TemplateFactoryService {
  private readonly logger = new Logger(TemplateFactoryService.name);

  /**
   * Get the appropriate template path for a report type
   */
  getTemplatePath(reportType: ReportType): string {
    const templateMap: Record<ReportType, string> = {
      // Aggregate Analytics Reports
      task_summary: 'task-summary.hbs',
      delegation_analytics: 'delegation-analytics.hbs',
      performance_dashboard: 'performance-dashboard.hbs',
      comprehensive: 'comprehensive.hbs',

      // Specialized Insights
      implementation_plan_analytics: 'implementation-plan-analytics.hbs',
      code_review_insights: 'code-review-insights.hbs',
      delegation_flow_analysis: 'delegation-flow-analysis.hbs',

      // Individual Task Reports (B005)
      task_progress_health: 'task-progress-health.hbs',
      implementation_execution: 'implementation-execution.hbs',
      code_review_quality: 'code-review-quality.hbs',
      delegation_flow_analysis_task: 'delegation-flow-analysis.hbs',
      research_documentation: 'research-documentation.hbs',
      communication_collaboration: 'communication-collaboration.hbs',
    };

    return templateMap[reportType] || 'default.hbs';
  }

  /**
   * Determine if a report type should include charts
   */
  shouldIncludeCharts(reportType: ReportType): boolean {
    const chartEnabledReports: ReportType[] = [
      'performance_dashboard',
      'delegation_analytics',
      'comprehensive',
      'implementation_plan_analytics',
      'code_review_insights',
    ];

    return chartEnabledReports.includes(reportType);
  }

  /**
   * Get chart size configuration for different report types
   */
  getChartConfiguration(reportType: ReportType): {
    width: number;
    height: number;
    maxCharts: number;
  } {
    const configurations: Record<
      string,
      { width: number; height: number; maxCharts: number }
    > = {
      performance_dashboard: { width: 400, height: 200, maxCharts: 4 },
      delegation_analytics: { width: 350, height: 180, maxCharts: 3 },
      comprehensive: { width: 300, height: 150, maxCharts: 6 },
      implementation_plan_analytics: { width: 400, height: 200, maxCharts: 3 },
      code_review_insights: { width: 350, height: 180, maxCharts: 3 },
      default: { width: 300, height: 150, maxCharts: 2 },
    };

    return configurations[reportType] || configurations.default;
  }

  /**
   * Get content priority for different report types
   * Higher priority = more detailed content, lower priority = more concise
   */
  getContentPriority(reportType: ReportType): 'high' | 'medium' | 'low' {
    const highDetailReports: ReportType[] = [
      'comprehensive',
      'task_progress_health',
      'implementation_execution',
    ];

    const mediumDetailReports: ReportType[] = [
      'delegation_analytics',
      'code_review_insights',
      'implementation_plan_analytics',
    ];

    if (highDetailReports.includes(reportType)) return 'high';
    if (mediumDetailReports.includes(reportType)) return 'medium';
    return 'low';
  }
}
