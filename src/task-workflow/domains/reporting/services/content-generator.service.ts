// src/task-workflow/domains/reporting/services/content-generator.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { ReportData } from '../interfaces/report-data.interface';
import { ReportType } from '../interfaces/service-contracts.interface';

/**
 * Content Generator Service
 *
 * Follows Single Responsibility Principle (SRP):
 * - Only responsible for generating meaningful content sections
 * - Transforms raw metrics into human-readable insights
 */
@Injectable()
export class ContentGeneratorService {
  private readonly logger = new Logger(ContentGeneratorService.name);

  /**
   * Generate executive summary for any report type
   */
  generateExecutiveSummary(reportType: ReportType, data: ReportData): string {
    const metrics = data.metrics;

    if (data.taskId) {
      // Individual task report summary
      return this.generateTaskSummary(data);
    }

    // Aggregate report summary
    const totalTasks = metrics.tasks?.totalTasks || 0;
    const completionRate = metrics.tasks?.completionRate || 0;
    const totalDelegations = metrics.delegations?.totalDelegations || 0;
    const approvalRate = metrics.codeReviews?.approvalRate || 0;

    return `
      This ${this.getReportTypeDisplayName(reportType)} covers ${totalTasks} tasks with a ${completionRate.toFixed(1)}% completion rate.
      The workflow processed ${totalDelegations} delegations with a ${approvalRate.toFixed(1)}% code review approval rate.
      ${this.generatePerformanceInsight(metrics)}
    `.trim();
  }

  /**
   * Generate key insights section
   */
  generateKeyInsights(_reportType: ReportType, data: ReportData): string[] {
    const insights: string[] = [];
    const metrics = data.metrics;

    if (data.taskId) {
      return this.generateTaskInsights(data);
    }

    // Task completion insights
    if (metrics.tasks) {
      const {
        completedTasks,
        inProgressTasks,
        notStartedTasks,
        avgCompletionTimeHours,
      } = metrics.tasks;
      insights.push(
        `Task Distribution: ${completedTasks} completed, ${inProgressTasks} in progress, ${notStartedTasks} not started`,
      );

      if (avgCompletionTimeHours > 0) {
        insights.push(
          `Average completion time: ${avgCompletionTimeHours.toFixed(1)} hours`,
        );
      }
    }

    // Delegation insights
    if (metrics.delegations) {
      const { successfulDelegations, failedDelegations, avgRedelegationCount } =
        metrics.delegations;
      const successRate =
        (successfulDelegations / (successfulDelegations + failedDelegations)) *
          100 || 0;
      insights.push(
        `Delegation success rate: ${successRate.toFixed(1)}% (${successfulDelegations} successful, ${failedDelegations} failed)`,
      );

      if (avgRedelegationCount > 1) {
        insights.push(
          `Average redelegation count: ${avgRedelegationCount.toFixed(1)} (indicates potential workflow friction)`,
        );
      }
    }

    // Code review insights
    if (metrics.codeReviews) {
      const { approvedReviews, needsChangesReviews, avgReviewTimeHours } =
        metrics.codeReviews;
      insights.push(
        `Code review outcomes: ${approvedReviews} approved, ${needsChangesReviews} need changes`,
      );

      if (avgReviewTimeHours > 0) {
        insights.push(
          `Average review time: ${avgReviewTimeHours.toFixed(1)} hours`,
        );
      }
    }

    return insights;
  }

  /**
   * Generate actionable recommendations
   */
  generateActionableRecommendations(
    _reportType: ReportType,
    data: ReportData,
  ): string[] {
    const recommendations: string[] = [];
    const metrics = data.metrics;

    if (data.taskId) {
      return this.generateTaskRecommendations(data);
    }

    // Performance-based recommendations
    if (
      metrics.tasks?.completionRate !== undefined &&
      metrics.tasks.completionRate < 70
    ) {
      recommendations.push(
        'Focus on improving task completion rate - consider breaking down complex tasks into smaller subtasks',
      );
    }

    if (
      metrics.delegations?.avgRedelegationCount !== undefined &&
      metrics.delegations.avgRedelegationCount > 2
    ) {
      recommendations.push(
        'High redelegation count detected - review delegation criteria and role responsibilities',
      );
    }

    if (
      metrics.codeReviews?.approvalRate !== undefined &&
      metrics.codeReviews.approvalRate < 80
    ) {
      recommendations.push(
        'Code review approval rate is low - consider implementing pre-review quality checks',
      );
    }

    if (
      metrics.performance?.timeToFirstDelegation !== undefined &&
      metrics.performance.timeToFirstDelegation > 24
    ) {
      recommendations.push(
        'Long time to first delegation - streamline initial task analysis and delegation process',
      );
    }

    // Add enhanced insights recommendations if available
    if (data.enhancedInsights) {
      const highPriorityInsights = data.enhancedInsights
        .filter((insight) => insight.priority >= 7 && insight.impact === 'high')
        .slice(0, 3);

      highPriorityInsights.forEach((insight) => {
        recommendations.push(...insight.actionableSteps);
      });
    }

    return recommendations;
  }

  /**
   * Generate detailed analysis section
   */
  generateDetailedAnalysis(_reportType: ReportType, data: ReportData): string {
    const metrics = data.metrics;

    if (data.taskId) {
      return this.generateTaskDetailedAnalysis(data);
    }

    let analysis = '';

    // Task analysis
    if (metrics.tasks) {
      analysis += this.generateTaskAnalysis(metrics.tasks);
    }

    // Delegation analysis
    if (metrics.delegations) {
      analysis += this.generateDelegationAnalysis(metrics.delegations);
    }

    // Code review analysis
    if (metrics.codeReviews) {
      analysis += this.generateCodeReviewAnalysis(metrics.codeReviews);
    }

    // Implementation plan analysis
    if (metrics.implementationPlans) {
      analysis += this.generateImplementationPlanAnalysis(
        metrics.implementationPlans,
      );
    }

    return analysis;
  }

  private generateTaskSummary(data: ReportData): string {
    const taskMetrics = data.metrics.taskSpecific;
    if (!taskMetrics) return 'Task summary not available';

    return `
      Task "${taskMetrics.taskName || data.taskId}" is currently ${taskMetrics.status || 'unknown'} 
      with ${taskMetrics.progressPercent || 0}% completion.
      ${taskMetrics.totalSubtasks ? `Progress: ${taskMetrics.completedSubtasks || 0}/${taskMetrics.totalSubtasks} subtasks completed.` : ''}
    `.trim();
  }

  private generateTaskInsights(data: ReportData): string[] {
    const insights: string[] = [];
    const taskMetrics = data.metrics.taskSpecific;

    if (!taskMetrics) return ['Task insights not available'];

    if (taskMetrics.redelegationCount > 2) {
      insights.push(
        `High redelegation count (${taskMetrics.redelegationCount}) indicates potential complexity or unclear requirements`,
      );
    }

    if (taskMetrics.qualityScore < 70) {
      insights.push(
        `Quality score (${taskMetrics.qualityScore}%) is below target - review implementation approach`,
      );
    }

    if (taskMetrics.estimationAccuracy < 80) {
      insights.push(
        `Estimation accuracy (${taskMetrics.estimationAccuracy}%) suggests need for better planning`,
      );
    }

    return insights;
  }

  private generateTaskRecommendations(data: ReportData): string[] {
    const recommendations: string[] = [];
    const taskMetrics = data.metrics.taskSpecific;

    if (!taskMetrics) return ['Task recommendations not available'];

    if (taskMetrics.bottlenecks?.length > 0) {
      recommendations.push(
        'Address identified bottlenecks to improve task flow',
      );
    }

    if (
      taskMetrics.healthIndicators?.some((h: any) => h.status === 'critical')
    ) {
      recommendations.push(
        'Critical health indicators detected - immediate attention required',
      );
    }

    return recommendations;
  }

  private generateTaskDetailedAnalysis(data: ReportData): string {
    const taskMetrics = data.metrics.taskSpecific;
    if (!taskMetrics) return 'Detailed analysis not available';

    return `
      <h3>Task Progress Analysis</h3>
      <p>Current Status: ${taskMetrics.status}</p>
      <p>Progress: ${taskMetrics.progressPercent}% complete</p>
      ${taskMetrics.batchAnalysis ? this.generateBatchAnalysis(taskMetrics.batchAnalysis) : ''}
    `;
  }

  private generateBatchAnalysis(batches: any[]): string {
    if (!batches || batches.length === 0) return '';

    return `
      <h4>Batch Analysis</h4>
      <ul>
        ${batches
          .map(
            (batch) => `
          <li>${batch.batchTitle}: ${batch.completionRate}% complete (${batch.completedSubtasks}/${batch.totalSubtasks} subtasks)</li>
        `,
          )
          .join('')}
      </ul>
    `;
  }

  private generateTaskAnalysis(taskMetrics: any): string {
    return `
      <h3>Task Performance Analysis</h3>
      <p>Total Tasks: ${taskMetrics.totalTasks}</p>
      <p>Completion Rate: ${taskMetrics.completionRate.toFixed(1)}%</p>
      <p>Average Completion Time: ${taskMetrics.avgCompletionTimeHours.toFixed(1)} hours</p>
    `;
  }

  private generateDelegationAnalysis(delegationMetrics: any): string {
    return `
      <h3>Delegation Flow Analysis</h3>
      <p>Total Delegations: ${delegationMetrics.totalDelegations}</p>
      <p>Success Rate: ${((delegationMetrics.successfulDelegations / delegationMetrics.totalDelegations) * 100).toFixed(1)}%</p>
      <p>Average Redelegation Count: ${delegationMetrics.avgRedelegationCount.toFixed(1)}</p>
    `;
  }

  private generateCodeReviewAnalysis(codeReviewMetrics: any): string {
    return `
      <h3>Code Review Quality Analysis</h3>
      <p>Total Reviews: ${codeReviewMetrics.totalReviews}</p>
      <p>Approval Rate: ${codeReviewMetrics.approvalRate.toFixed(1)}%</p>
      <p>Average Review Time: ${codeReviewMetrics.avgReviewTimeHours.toFixed(1)} hours</p>
    `;
  }

  private generateImplementationPlanAnalysis(planMetrics: any): string {
    return `
      <h3>Implementation Plan Analysis</h3>
      <p>Total Plans: ${planMetrics.totalPlans}</p>
      <p>Completion Rate: ${planMetrics.batchCompletionRate.toFixed(1)}%</p>
      <p>Average Batches per Plan: ${planMetrics.avgBatchesPerPlan.toFixed(1)}</p>
      <p>Estimation Accuracy: ${planMetrics.estimationAccuracy.toFixed(1)}%</p>
    `;
  }

  private generatePerformanceInsight(metrics: any): string {
    if (!metrics.performance) return '';

    const efficiency = metrics.performance.implementationEfficiency || 0;
    if (efficiency > 80)
      return 'Performance is excellent with high implementation efficiency.';
    if (efficiency > 60)
      return 'Performance is good but has room for improvement.';
    return 'Performance needs attention to improve efficiency.';
  }

  private getReportTypeDisplayName(reportType: ReportType): string {
    const displayNames: Record<ReportType, string> = {
      task_summary: 'Task Summary Report',
      delegation_analytics: 'Delegation Analytics Report',
      performance_dashboard: 'Performance Dashboard',
      comprehensive: 'Comprehensive Analysis',
      implementation_plan_analytics: 'Implementation Plan Analytics',
      code_review_insights: 'Code Review Insights',
      delegation_flow_analysis: 'Delegation Flow Analysis',
      task_progress_health: 'Task Progress Health Report',
      implementation_execution: 'Implementation Execution Report',
      code_review_quality: 'Code Review Quality Report',
      delegation_flow_analysis_task: 'Task Delegation Flow Analysis',
      research_documentation: 'Research Documentation Report',
      communication_collaboration: 'Communication Collaboration Report',
    };

    return displayNames[reportType] || 'Report';
  }
}
