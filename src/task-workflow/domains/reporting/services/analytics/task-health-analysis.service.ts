/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { TaskProgressHealthMetrics } from '../../interfaces/metrics.interface';

/**
 * Task Health Analysis Service
 *
 * Follows SRP: Single responsibility for individual task health analysis
 * Handles: Task progress health metrics, batch analysis, health indicators, bottleneck detection
 *
 * Extracted from MetricsCalculatorService to reduce complexity
 */
@Injectable()
export class TaskHealthAnalysisService {
  private readonly logger = new Logger(TaskHealthAnalysisService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getTaskProgressHealthMetrics(
    taskId: string,
  ): Promise<TaskProgressHealthMetrics> {
    try {
      const task = await this.prisma.task.findUnique({
        where: { taskId: taskId },
        include: {
          taskDescription: true,
          implementationPlans: {
            include: {
              subtasks: {
                include: {
                  comments: true,
                  delegationRecords: true,
                },
              },
            },
          },
          delegationRecords: {
            orderBy: { delegationTimestamp: 'desc' },
          },
          comments: true,
          researchReports: true,
          codeReviews: true,
          completionReports: true,
        },
      });

      if (!task) {
        throw new Error(`Task ${taskId} not found`);
      }

      const allSubtasks = task.implementationPlans.flatMap(
        (plan: any) => plan.subtasks,
      );
      const totalSubtasks = allSubtasks.length;
      const completedSubtasks = allSubtasks.filter(
        (st: any) => st.status === 'completed',
      ).length;

      const progressPercent =
        totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

      const totalDuration = task.completionDate
        ? (task.completionDate.getTime() - task.creationDate.getTime()) /
          (1000 * 60 * 60)
        : (Date.now() - task.creationDate.getTime()) / (1000 * 60 * 60);

      // Calculate rich batch analysis
      const batchAnalysis = this.calculateBatchAnalysis(
        task.implementationPlans,
      );

      // Calculate health indicators
      const healthIndicators = this.calculateHealthIndicators(
        task,
        progressPercent,
        totalDuration,
      );

      // Calculate bottlenecks
      const bottlenecks = this.calculateBottlenecks(task, allSubtasks);

      // Calculate estimation accuracy
      const estimationAccuracy = this.calculateEstimationAccuracy(allSubtasks);

      // Extract redelegation reasons
      const redelegationReasons = task.delegationRecords
        .filter((dr: any) => dr.rejectionReason)
        .map((dr: any) => dr.rejectionReason)
        .slice(0, 5);

      // Calculate quality score based on multiple factors
      const qualityScore = this.calculateQualityScore(
        task,
        progressPercent,
        estimationAccuracy,
      );

      return {
        taskId: task.taskId,
        taskName: task.name,
        status: task.status,
        currentMode: task.currentMode || '',
        creationDate: task.creationDate,
        completionDate: task.completionDate || undefined,
        totalDuration,
        progressPercent,
        totalSubtasks,
        completedSubtasks,
        batchAnalysis,
        redelegationCount: task.redelegationCount || 0,
        redelegationReasons,
        qualityScore,
        healthIndicators,
        bottlenecks,
        estimationAccuracy,
      };
    } catch (error) {
      this.logger.error(
        'Error calculating task progress health metrics',
        error,
      );
      throw error;
    }
  }

  // Simplified implementations for other individual task metrics
  getImplementationExecutionMetrics(_taskId: string): any {
    // Simplified implementation - returns basic structure
    return {
      taskId: _taskId,
      implementationPlan: {},
      batchExecution: [],
      subtaskPerformance: [],
      technicalQuality: {},
      integrationPoints: [],
      architecturalCompliance: {},
    };
  }

  getCodeReviewQualityMetrics(_taskId: string): any {
    return {
      taskId: _taskId,
      codeReviews: [],
      overallApprovalRate: 0,
      avgReviewCycleDays: 0,
      reworkCycles: 0,
      acceptanceCriteriaVerification: [],
      qualityTrends: [],
      issueCategories: [],
      reviewerFeedback: [],
      testingCoverage: {},
    };
  }

  getTaskDelegationFlowMetrics(_taskId: string): any {
    return {
      taskId: _taskId,
      delegationHistory: [],
      flowEfficiency: 0,
      handoffQuality: [],
      rolePerformance: [],
      communicationPatterns: [],
      workflowBottlenecks: [],
      collaborationScore: 0,
    };
  }

  getResearchDocumentationMetrics(_taskId: string): any {
    return {
      taskId: _taskId,
      researchReports: [],
      knowledgeCapture: {},
      researchImpact: {},
      documentationQuality: {},
      knowledgeTransfer: [],
    };
  }

  getCommunicationCollaborationMetrics(_taskId: string): any {
    return {
      taskId: _taskId,
      commentAnalysis: {},
      crossModeInteraction: [],
      informationFlow: {},
      collaborationEffectiveness: {},
      communicationPatterns: [],
    };
  }

  // Rich metrics calculation methods for TaskProgressHealthMetrics
  private calculateBatchAnalysis(implementationPlans: any[]): any[] {
    const batchAnalysis: any[] = [];

    implementationPlans.forEach((plan) => {
      const subtasksByBatch = plan.subtasks.reduce((acc: any, subtask: any) => {
        const batchId = subtask.batchId || 'default';
        if (!acc[batchId]) acc[batchId] = [];
        acc[batchId].push(subtask);
        return acc;
      }, {});

      Object.entries(subtasksByBatch).forEach(
        ([batchId, subtasks]: [string, any[]]) => {
          const completedSubtasks = subtasks.filter(
            (s) => s.status === 'completed',
          );
          const completionRate =
            subtasks.length > 0
              ? (completedSubtasks.length / subtasks.length) * 100
              : 0;

          batchAnalysis.push({
            batchId,
            batchTitle: subtasks[0]?.batchTitle || `Batch ${batchId}`,
            totalSubtasks: subtasks.length,
            completedSubtasks: completedSubtasks.length,
            completionRate,
            duration: this.calculateBatchDuration(subtasks),
            dependencies: this.extractBatchDependencies(subtasks),
            blockers: this.identifyBatchBlockers(subtasks),
          });
        },
      );
    });

    return batchAnalysis;
  }

  private calculateHealthIndicators(
    task: any,
    progressPercent: number,
    totalDuration: number,
  ): any[] {
    const indicators = [];

    // Progress indicator
    indicators.push({
      indicator: 'Progress Rate',
      status:
        progressPercent > 75
          ? 'healthy'
          : progressPercent > 50
            ? 'warning'
            : 'critical',
      value: `${Math.round(progressPercent)}%`,
      threshold: '75%',
      description: 'Task completion progress',
    });

    // Duration indicator
    const expectedDuration = 168; // 1 week in hours
    indicators.push({
      indicator: 'Duration',
      status:
        totalDuration < expectedDuration
          ? 'healthy'
          : totalDuration < expectedDuration * 1.5
            ? 'warning'
            : 'critical',
      value: `${Math.round(totalDuration)}h`,
      threshold: `${expectedDuration}h`,
      description: 'Time spent on task',
    });

    // Redelegation indicator
    const redelegationCount = task.redelegationCount || 0;
    indicators.push({
      indicator: 'Redelegations',
      status:
        redelegationCount === 0
          ? 'healthy'
          : redelegationCount < 3
            ? 'warning'
            : 'critical',
      value: redelegationCount.toString(),
      threshold: '2',
      description: 'Number of task redelegations',
    });

    return indicators;
  }

  private calculateBottlenecks(task: any, allSubtasks: any[]): any[] {
    const bottlenecks = [];

    // Check for stuck subtasks
    const stuckSubtasks = allSubtasks.filter(
      (st) =>
        st.status === 'in-progress' &&
        st.startedAt &&
        Date.now() - new Date(st.startedAt).getTime() > 48 * 60 * 60 * 1000, // 48 hours
    );

    if (stuckSubtasks.length > 0) {
      bottlenecks.push({
        type: 'Stuck Subtasks',
        description: `${stuckSubtasks.length} subtasks in progress for >48h`,
        impact: 'medium',
        duration: '48+ hours',
        resolution: 'Review subtask complexity and provide support',
      });
    }

    // Check for high redelegation
    if (task.redelegationCount > 2) {
      bottlenecks.push({
        type: 'High Redelegation',
        description: `Task redelegated ${task.redelegationCount} times`,
        impact: 'high',
        duration: 'Ongoing',
        resolution: 'Review role assignments and requirements clarity',
      });
    }

    return bottlenecks;
  }

  private calculateEstimationAccuracy(allSubtasks: any[]): number {
    const subtasksWithEstimates = allSubtasks.filter(
      (st) => st.estimatedDuration && st.startedAt && st.completedAt,
    );

    if (subtasksWithEstimates.length === 0) return 85; // Default

    const accuracyScores = subtasksWithEstimates.map((st) => {
      const estimated = this.parseDuration(st.estimatedDuration);
      const actual =
        (new Date(st.completedAt).getTime() -
          new Date(st.startedAt).getTime()) /
        (1000 * 60 * 60);

      if (estimated === 0) return 50;
      const ratio = Math.min(actual, estimated) / Math.max(actual, estimated);
      return ratio * 100;
    });

    return (
      accuracyScores.reduce((sum, score) => sum + score, 0) /
      accuracyScores.length
    );
  }

  private calculateQualityScore(
    task: any,
    progressPercent: number,
    estimationAccuracy: number,
  ): number {
    let score = 100;

    // Deduct for redelegations
    score -= (task.redelegationCount || 0) * 10;

    // Deduct for low progress if task is old
    const taskAgeHours =
      (Date.now() - task.creationDate.getTime()) / (1000 * 60 * 60);
    if (taskAgeHours > 168 && progressPercent < 50) {
      // 1 week old, <50% progress
      score -= 20;
    }

    // Deduct for poor estimation accuracy
    if (estimationAccuracy < 70) {
      score -= 15;
    }

    // Add bonus for good progress
    if (progressPercent > 80) {
      score += 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  // Helper methods for batch analysis
  private calculateBatchDuration(subtasks: any[]): string {
    const completedSubtasks = subtasks.filter(
      (st) => st.startedAt && st.completedAt,
    );
    if (completedSubtasks.length === 0) return 'N/A';

    const totalHours = completedSubtasks.reduce((sum, st) => {
      const duration =
        (new Date(st.completedAt).getTime() -
          new Date(st.startedAt).getTime()) /
        (1000 * 60 * 60);
      return sum + duration;
    }, 0);

    const avgHours = totalHours / completedSubtasks.length;
    return avgHours < 1
      ? `${Math.round(avgHours * 60)}m`
      : `${avgHours.toFixed(1)}h`;
  }

  private extractBatchDependencies(subtasks: any[]): string[] {
    // Extract dependencies from subtask descriptions or metadata
    return subtasks
      .filter((st) => st.description && st.description.includes('depends on'))
      .map((st) => `Subtask ${st.sequenceNumber}`)
      .slice(0, 3);
  }

  private identifyBatchBlockers(subtasks: any[]): string[] {
    const blockers = [];

    // Check for subtasks stuck in progress
    const stuckSubtasks = subtasks.filter(
      (st) =>
        st.status === 'in-progress' &&
        st.startedAt &&
        Date.now() - new Date(st.startedAt).getTime() > 24 * 60 * 60 * 1000,
    );

    if (stuckSubtasks.length > 0) {
      blockers.push(`${stuckSubtasks.length} subtasks stuck >24h`);
    }

    return blockers;
  }

  private parseDuration(duration: string): number {
    if (!duration) return 0;

    const match = duration.match(/(\d+)\s*(h|hour|hours|m|min|minutes)/i);
    if (!match) return 0;

    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();

    if (unit.startsWith('h')) return value;
    if (unit.startsWith('m')) return value / 60;

    return 0;
  }
}
