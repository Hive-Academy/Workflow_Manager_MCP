// src/task-workflow/domains/reporting/strategies/aggregate-report.strategy.ts

import { Injectable } from '@nestjs/common';
import { IReportStrategy } from './report-strategy.interface';
import { ReportType } from '../interfaces/service-contracts.interface';

/**
 * Aggregate Report Strategy
 *
 * Handles configuration for aggregate reports (7 types)
 * Extracted from ReportGeneratorService to follow SRP
 */
@Injectable()
export class AggregateReportStrategy implements IReportStrategy {
  private readonly aggregateTypes: ReportType[] = [
    'task_summary',
    'delegation_analytics',
    'performance_dashboard',
    'comprehensive',
    'implementation_plan_analytics',
    'code_review_insights',
    'delegation_flow_analysis',
  ];

  canHandle(reportType: ReportType): boolean {
    return this.aggregateTypes.includes(reportType);
  }

  getReportTitle(reportType: ReportType): string {
    const titles: Record<ReportType, string> = {
      task_summary: 'Task Summary Report',
      delegation_analytics: 'Delegation Analytics Report',
      performance_dashboard: 'Performance Dashboard',
      comprehensive: 'Comprehensive Analysis Report',
      implementation_plan_analytics: 'Implementation Plan Analytics',
      code_review_insights: 'Code Review Insights',
      delegation_flow_analysis: 'Delegation Flow Analysis',
      // Individual task types (not handled by this strategy)
      task_progress_health: '',
      implementation_execution: '',
      code_review_quality: '',
      delegation_flow_analysis_task: '',
      research_documentation: '',
      communication_collaboration: '',
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
    // Configuration extracted from existing ReportGeneratorService logic
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
        'delegation_analytics',
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
