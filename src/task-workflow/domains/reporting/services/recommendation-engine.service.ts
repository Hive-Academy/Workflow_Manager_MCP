import { Injectable } from '@nestjs/common';
import { IRecommendationEngineService } from '../interfaces/service-contracts.interface';
import {
  TaskMetrics,
  DelegationMetrics,
  CodeReviewMetrics,
  PerformanceMetrics,
  ImplementationPlanMetrics,
  CodeReviewInsights,
  DelegationFlowMetrics,
} from '../interfaces/metrics.interface';
import { TimeSeriesMetrics } from '../interfaces/time-series.interface';
import { PerformanceBenchmark } from '../interfaces/benchmarks.interface';

@Injectable()
export class RecommendationEngineService
  implements IRecommendationEngineService
{
  generateRecommendations(
    taskMetrics: TaskMetrics,
    delegationMetrics: DelegationMetrics,
    codeReviewMetrics: CodeReviewMetrics,
    performanceMetrics: PerformanceMetrics,
    additionalMetrics?: {
      implementationPlans?: ImplementationPlanMetrics;
      codeReviewInsights?: CodeReviewInsights;
      delegationFlow?: DelegationFlowMetrics;
      timeSeriesAnalysis?: TimeSeriesMetrics;
      performanceBenchmarks?: PerformanceBenchmark;
    },
  ): string[] {
    const recommendations: string[] = [];

    // Task completion recommendations
    if (taskMetrics.totalTasks > 0) {
      const completionRate =
        (taskMetrics.completedTasks / taskMetrics.totalTasks) * 100;

      if (completionRate < 70) {
        recommendations.push(
          'Consider reviewing task complexity and breaking down large tasks into smaller subtasks.',
        );
      } else if (completionRate > 90) {
        recommendations.push(
          'Excellent task completion rate! Consider taking on more challenging projects.',
        );
      }
    }

    // Delegation recommendations
    if (delegationMetrics.totalDelegations > 0) {
      const successRate =
        (delegationMetrics.successfulDelegations /
          delegationMetrics.totalDelegations) *
        100;

      if (successRate < 80) {
        recommendations.push(
          'Improve delegation success by providing clearer task descriptions and requirements.',
        );
      }
    }

    // Code review recommendations
    if (codeReviewMetrics.totalReviews > 0) {
      const approvalRate =
        (codeReviewMetrics.approvedReviews / codeReviewMetrics.totalReviews) *
        100;

      if (approvalRate < 75) {
        recommendations.push(
          'Focus on code quality improvements to increase first-pass approval rates.',
        );
      }
    }

    // Performance recommendations
    if (performanceMetrics.timeToFirstDelegation > 0) {
      if (performanceMetrics.timeToFirstDelegation > 24) {
        // More than 24 hours
        recommendations.push(
          'Consider delegating tasks more quickly to improve overall workflow efficiency.',
        );
      }
    }

    if (performanceMetrics.implementationEfficiency < 70) {
      recommendations.push(
        'Focus on improving implementation efficiency through better planning or resource allocation.',
      );
    }

    // Additional metrics recommendations
    if (
      additionalMetrics?.implementationPlans &&
      additionalMetrics.implementationPlans.totalPlans > 0
    ) {
      const planCompletionRate =
        (additionalMetrics.implementationPlans.completedPlans /
          additionalMetrics.implementationPlans.totalPlans) *
        100;
      if (planCompletionRate < 80) {
        recommendations.push(
          'Review implementation planning process to improve plan completion rates.',
        );
      }
    }

    // Default recommendation if no data
    if (recommendations.length === 0) {
      recommendations.push(
        'Continue with current workflow patterns. More data needed for specific recommendations.',
      );
    }

    return recommendations;
  }

  generateTaskSpecificRecommendations(
    _taskId: string,
    _taskMetrics: any,
  ): string[] {
    // Simplified implementation for task-specific recommendations
    return [
      'Continue monitoring task progress and address any bottlenecks.',
      'Ensure all acceptance criteria are clearly defined and tracked.',
      'Maintain regular communication between roles during delegation.',
    ];
  }
}
