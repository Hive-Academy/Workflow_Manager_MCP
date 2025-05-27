// src/task-workflow/domains/reporting/services/content-generator.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { ReportData } from '../../interfaces/report-data.interface';
import { ReportType } from '../../interfaces/service-contracts.interface';

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

    // Generate rich executive summary using the same data our transformer uses
    const progressPercent = taskMetrics.progressPercent || 0;
    const completedSubtasks = taskMetrics.completedSubtasks || 0;
    const totalSubtasks = taskMetrics.totalSubtasks || 0;
    const qualityScore = taskMetrics.qualityScore || 0;
    const redelegationCount = taskMetrics.redelegationCount || 0;

    const summary = `
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">${progressPercent}%</div>
            <div class="text-sm text-blue-800">Progress Complete</div>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-green-600">${completedSubtasks}/${totalSubtasks}</div>
            <div class="text-sm text-green-800">Subtasks Completed</div>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <div class="text-2xl font-bold text-purple-600">${qualityScore}%</div>
            <div class="text-sm text-purple-800">Quality Score</div>
          </div>
        </div>
        
        <div class="prose prose-gray max-w-none">
          <p><strong>Task "${taskMetrics.taskName || data.taskId}"</strong> is currently <span class="font-semibold text-blue-600">${taskMetrics.status || 'unknown'}</span> with ${progressPercent}% completion.</p>
          
          ${totalSubtasks > 0 ? `<p>Implementation progress shows <strong>${completedSubtasks} of ${totalSubtasks} subtasks completed</strong>, indicating ${progressPercent >= 80 ? 'excellent' : progressPercent >= 60 ? 'good' : 'moderate'} progress toward completion.</p>` : ''}
          
          ${qualityScore > 0 ? `<p>Quality assessment shows a <strong>${qualityScore}% quality score</strong>, ${qualityScore >= 80 ? 'meeting high standards' : qualityScore >= 60 ? 'meeting acceptable standards' : 'requiring attention to improve quality'}.</p>` : ''}
          
          ${redelegationCount > 0 ? `<p>Workflow analysis indicates <strong>${redelegationCount} redelegation${redelegationCount > 1 ? 's' : ''}</strong>, ${redelegationCount > 2 ? 'suggesting complexity or unclear requirements that may need attention' : 'showing normal workflow progression'}.</p>` : ''}
        </div>
      </div>
    `;

    return summary.trim();
  }

  private generateTaskInsights(data: ReportData): string[] {
    const insights: string[] = [];
    const taskMetrics = data.metrics.taskSpecific;

    if (!taskMetrics) return ['Task insights not available'];

    // Progress insights
    const progressPercent = taskMetrics.progressPercent || 0;
    if (progressPercent >= 80) {
      insights.push(
        `🎯 Excellent progress: ${progressPercent}% completion indicates task is nearing successful delivery`,
      );
    } else if (progressPercent >= 60) {
      insights.push(
        `📈 Good momentum: ${progressPercent}% completion shows steady progress toward completion`,
      );
    } else if (progressPercent > 0) {
      insights.push(
        `🚀 Early stage: ${progressPercent}% completion - task is actively progressing`,
      );
    }

    // Quality insights
    const qualityScore = taskMetrics.qualityScore || 0;
    if (qualityScore >= 80) {
      insights.push(
        `✅ High quality: ${qualityScore}% quality score demonstrates excellent implementation standards`,
      );
    } else if (qualityScore >= 60) {
      insights.push(
        `⚠️ Quality attention: ${qualityScore}% quality score suggests room for improvement`,
      );
    } else if (qualityScore > 0) {
      insights.push(
        `🔧 Quality focus needed: ${qualityScore}% quality score requires immediate attention`,
      );
    }

    // Workflow insights
    const redelegationCount = taskMetrics.redelegationCount || 0;
    if (redelegationCount === 0) {
      insights.push(
        `🎯 Smooth workflow: No redelegations indicates clear requirements and effective execution`,
      );
    } else if (redelegationCount <= 2) {
      insights.push(
        `📋 Normal workflow: ${redelegationCount} redelegation${redelegationCount > 1 ? 's' : ''} shows typical iterative refinement`,
      );
    } else {
      insights.push(
        `🔄 Complex workflow: ${redelegationCount} redelegations suggests complexity or evolving requirements`,
      );
    }

    // Batch analysis insights
    if (taskMetrics.batchAnalysis && taskMetrics.batchAnalysis.length > 0) {
      const completedBatches = taskMetrics.batchAnalysis.filter(
        (b: any) => b.completionRate >= 100,
      ).length;
      const totalBatches = taskMetrics.batchAnalysis.length;
      insights.push(
        `📦 Implementation structure: ${completedBatches}/${totalBatches} batches completed, showing organized development approach`,
      );
    }

    // Health indicators insights
    if (
      taskMetrics.healthIndicators &&
      taskMetrics.healthIndicators.length > 0
    ) {
      const criticalIndicators = taskMetrics.healthIndicators.filter(
        (h: any) => h.status === 'critical',
      ).length;
      const healthyIndicators = taskMetrics.healthIndicators.filter(
        (h: any) => h.status === 'healthy',
      ).length;

      if (criticalIndicators > 0) {
        insights.push(
          `🚨 Health alert: ${criticalIndicators} critical indicator${criticalIndicators > 1 ? 's' : ''} require immediate attention`,
        );
      } else if (healthyIndicators === taskMetrics.healthIndicators.length) {
        insights.push(
          `💚 Excellent health: All ${healthyIndicators} health indicators are in optimal state`,
        );
      }
    }

    return insights.length > 0
      ? insights
      : ['📊 Task analysis complete - monitoring progress and quality metrics'];
  }

  private generateTaskRecommendations(data: ReportData): string[] {
    const recommendations: string[] = [];
    const taskMetrics = data.metrics.taskSpecific;

    if (!taskMetrics) return ['Task recommendations not available'];

    const progressPercent = taskMetrics.progressPercent || 0;
    const qualityScore = taskMetrics.qualityScore || 0;
    const redelegationCount = taskMetrics.redelegationCount || 0;

    // Progress-based recommendations
    if (progressPercent >= 80) {
      recommendations.push(
        '🎯 Prepare for completion: Focus on final quality checks and acceptance criteria verification',
      );
      recommendations.push(
        '📋 Documentation review: Ensure all implementation details are properly documented',
      );
    } else if (progressPercent >= 60) {
      recommendations.push(
        '⚡ Maintain momentum: Continue current implementation approach while monitoring quality metrics',
      );
      recommendations.push(
        '🔍 Mid-point review: Assess if any adjustments needed for remaining work',
      );
    } else if (progressPercent > 0) {
      recommendations.push(
        '🚀 Accelerate progress: Consider breaking down remaining work into smaller, manageable chunks',
      );
      recommendations.push(
        '👥 Resource check: Ensure adequate resources and clear requirements for continued progress',
      );
    } else {
      recommendations.push(
        '🎬 Initiate progress: Begin implementation with clear first steps and success criteria',
      );
    }

    // Quality-based recommendations
    if (qualityScore < 70 && qualityScore > 0) {
      recommendations.push(
        '🔧 Quality improvement: Implement code review processes and quality gates',
      );
      recommendations.push(
        '📚 Standards review: Ensure implementation follows established coding standards and best practices',
      );
    } else if (qualityScore >= 80) {
      recommendations.push(
        '✅ Maintain excellence: Continue current quality practices as they are producing excellent results',
      );
    }

    // Workflow-based recommendations
    if (redelegationCount > 2) {
      recommendations.push(
        '🔄 Workflow optimization: Review delegation criteria and role responsibilities to reduce redelegations',
      );
      recommendations.push(
        '📝 Requirements clarity: Ensure task requirements and acceptance criteria are clearly defined',
      );
    } else if (redelegationCount === 0 && progressPercent > 50) {
      recommendations.push(
        '🎯 Smooth execution: Current workflow is optimal - maintain current approach',
      );
    }

    // Health indicators recommendations
    if (
      taskMetrics.healthIndicators?.some((h: any) => h.status === 'critical')
    ) {
      recommendations.push(
        '🚨 Critical attention: Address critical health indicators immediately to prevent task failure',
      );
    }

    // Bottleneck recommendations
    if (taskMetrics.bottlenecks?.length > 0) {
      recommendations.push(
        '🚧 Remove blockers: Address identified bottlenecks to improve task flow and delivery timeline',
      );
    }

    // Batch-specific recommendations
    if (taskMetrics.batchAnalysis && taskMetrics.batchAnalysis.length > 0) {
      const incompleteBatches = taskMetrics.batchAnalysis.filter(
        (b: any) => b.completionRate < 100,
      );
      if (incompleteBatches.length > 0) {
        recommendations.push(
          `📦 Focus on batches: Complete ${incompleteBatches.length} remaining batch${incompleteBatches.length > 1 ? 'es' : ''} for systematic progress`,
        );
      }
    }

    return recommendations.length > 0
      ? recommendations
      : [
          '📊 Continue monitoring: Task is progressing well with current approach',
        ];
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
