// src/task-workflow/domains/reporting/strategies/individual-task-report.strategy.ts

import { Injectable } from '@nestjs/common';
import { IReportStrategy } from './report-strategy.interface';
import { ReportType } from '../interfaces/service-contracts.interface';

/**
 * Individual Task Report Strategy
 *
 * Handles configuration for individual task reports (6 types)
 * Extracted from ReportGeneratorService to follow SRP
 */
@Injectable()
export class IndividualTaskReportStrategy implements IReportStrategy {
  private readonly individualTypes: ReportType[] = [
    'task_progress_health',
    'implementation_execution',
    'code_review_quality',
    'delegation_flow_analysis_task',
    'research_documentation',
    'communication_collaboration',
  ];

  canHandle(reportType: ReportType): boolean {
    return this.individualTypes.includes(reportType);
  }

  getReportTitle(reportType: ReportType): string {
    const titles: Record<ReportType, string> = {
      task_progress_health: 'Task Progress Health Report',
      implementation_execution: 'Implementation Execution Report',
      code_review_quality: 'Code Review Quality Report',
      delegation_flow_analysis_task: 'Task Delegation Flow Analysis',
      research_documentation: 'Research Documentation Report',
      communication_collaboration: 'Communication & Collaboration Report',
      // Aggregate types (not handled by this strategy)
      task_summary: '',
      delegation_analytics: '',
      performance_dashboard: '',
      comprehensive: '',
      implementation_plan_analytics: '',
      code_review_insights: '',
      delegation_flow_analysis: '',
    };

    return titles[reportType] || `${reportType} Report`;
  }

  getRequiredMetrics(reportType: ReportType): {
    includeImplementationPlans: boolean;
    includeCodeReviewInsights: boolean;
    includeDelegationFlow: boolean;
    includeTimeSeries: boolean;
    includeBenchmarks: boolean;
  } {
    // Individual task reports have simpler metric requirements
    return {
      includeImplementationPlans: ['implementation_execution'].includes(
        reportType,
      ),
      includeCodeReviewInsights: ['code_review_quality'].includes(reportType),
      includeDelegationFlow: ['delegation_flow_analysis_task'].includes(
        reportType,
      ),
      includeTimeSeries: false, // Individual tasks don't need time series
      includeBenchmarks: false, // Individual tasks don't need benchmarks
    };
  }
}
