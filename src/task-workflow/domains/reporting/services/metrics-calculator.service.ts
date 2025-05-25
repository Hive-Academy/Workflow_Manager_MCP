/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/task-workflow/domains/reporting/services/metrics-calculator.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IMetricsCalculatorService } from '../interfaces/service-contracts.interface';
import {
  TaskMetrics,
  DelegationMetrics,
  CodeReviewMetrics,
  PerformanceMetrics,
  ImplementationPlanMetrics,
  CodeReviewInsights,
  DelegationFlowMetrics,
  PriorityDistribution,
  OwnerDistribution,
  ModeTransition,
  FailureReason,
  BatchAnalysis,
  IssuePattern,
  RoleTransitionAnalysis,
  ProblemPattern,
} from '../interfaces/metrics.interface';

type WhereClause = Record<string, any>;

/**
 * Specialized service for calculating workflow metrics
 * Follows SRP: Single responsibility for metric calculations
 */
@Injectable()
export class MetricsCalculatorService implements IMetricsCalculatorService {
  private readonly logger = new Logger(MetricsCalculatorService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getTaskMetrics(whereClause: WhereClause): Promise<TaskMetrics> {
    const [
      totalTasks,
      completedTasks,
      inProgressTasks,
      notStartedTasks,
      priorityDistribution,
      tasksByOwner,
      completedTasksWithDates,
    ] = await Promise.all([
      this.prisma.task.count({ where: whereClause }),
      this.prisma.task.count({
        where: { ...whereClause, status: 'Completed' },
      }),
      this.prisma.task.count({
        where: { ...whereClause, status: 'In Progress' },
      }),
      this.prisma.task.count({
        where: { ...whereClause, status: 'Not Started' },
      }),
      this.prisma.task.groupBy({
        by: ['priority'],
        _count: true,
        where: whereClause,
      }),
      this.prisma.task.groupBy({
        by: ['owner'],
        _count: true,
        where: whereClause,
      }),
      this.prisma.task.findMany({
        where: {
          ...whereClause,
          status: 'Completed',
          completionDate: { not: null },
        },
        select: {
          creationDate: true,
          completionDate: true,
        },
      }),
    ]);

    const avgCompletionTimeHours = this.calculateAverageCompletionTime(
      completedTasksWithDates,
    );

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      notStartedTasks,
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      avgCompletionTimeHours,
      priorityDistribution: this.mapPriorityDistribution(priorityDistribution),
      tasksByOwner: this.mapOwnerDistribution(tasksByOwner),
    };
  }

  async getDelegationMetrics(
    whereClause: WhereClause,
  ): Promise<DelegationMetrics> {
    const [delegations, modeTransitions, failureReasons, redelegationStats] =
      await Promise.all([
        this.prisma.delegationRecord.findMany({
          where: { task: whereClause },
        }),
        this.prisma.workflowTransition.groupBy({
          by: ['fromMode', 'toMode'],
          _count: true,
          where: { task: whereClause },
        }),
        this.prisma.delegationRecord.groupBy({
          by: ['rejectionReason'],
          _count: true,
          where: {
            task: whereClause,
            success: false,
            rejectionReason: { not: null },
          },
          orderBy: { _count: { rejectionReason: 'desc' } },
          take: 5,
        }),
        this.prisma.task.aggregate({
          _avg: { redelegationCount: true },
          _max: { redelegationCount: true },
          where: whereClause,
        }),
      ]);

    return {
      totalDelegations: delegations.length,
      successfulDelegations: delegations.filter((d) => d.success === true)
        .length,
      failedDelegations: delegations.filter((d) => d.success === false).length,
      avgRedelegationCount: redelegationStats._avg.redelegationCount || 0,
      maxRedelegationCount: redelegationStats._max.redelegationCount || 0,
      modeTransitions: this.mapModeTransitions(modeTransitions),
      topFailureReasons: this.mapFailureReasons(failureReasons),
    };
  }

  async getCodeReviewMetrics(
    whereClause: WhereClause,
  ): Promise<CodeReviewMetrics> {
    const reviews = await this.prisma.codeReview.findMany({
      where: { task: whereClause },
      select: {
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const totalReviews = reviews.length;
    const approvedReviews = reviews.filter(
      (r) => r.status === 'APPROVED',
    ).length;
    const approvedWithReservationsReviews = reviews.filter(
      (r) => r.status === 'APPROVED WITH RESERVATIONS',
    ).length;
    const needsChangesReviews = reviews.filter(
      (r) => r.status === 'NEEDS CHANGES',
    ).length;

    const avgReviewTimeHours = this.calculateAverageReviewTime(reviews);

    return {
      totalReviews,
      approvedReviews,
      approvedWithReservationsReviews,
      needsChangesReviews,
      approvalRate:
        totalReviews > 0 ? (approvedReviews / totalReviews) * 100 : 0,
      avgReviewTimeHours,
    };
  }

  async getPerformanceMetrics(
    whereClause: WhereClause,
  ): Promise<PerformanceMetrics> {
    const [tasks, delegations, subtasks] = await Promise.all([
      this.prisma.task.findMany({
        where: whereClause,
        include: {
          implementationPlans: {
            include: { subtasks: true },
          },
          delegationRecords: {
            orderBy: { delegationTimestamp: 'asc' },
            take: 1,
          },
        },
      }),
      this.prisma.delegationRecord.findMany({
        where: { task: whereClause },
      }),
      this.prisma.subtask.findMany({
        where: { task: whereClause },
      }),
    ]);

    const implementationEfficiency =
      this.calculateImplementationEfficiency(tasks);
    const avgSubtasksPerTask =
      tasks.length > 0 ? subtasks.length / tasks.length : 0;
    const { mostActiveMode, leastActiveMode } =
      this.calculateModeActivity(delegations);
    const timeToFirstDelegation = this.calculateTimeToFirstDelegation(tasks);

    return {
      implementationEfficiency,
      avgSubtasksPerTask,
      mostActiveMode,
      leastActiveMode,
      timeToFirstDelegation,
    };
  }

  async getImplementationPlanMetrics(
    whereClause: WhereClause,
  ): Promise<ImplementationPlanMetrics> {
    // Note: This implementation assumes certain Prisma schema relationships
    // May need adjustment based on actual schema structure
    try {
      const plans = await this.prisma.implementationPlan.findMany({
        where: { task: whereClause },
        include: {
          subtasks: true,
        },
      });

      const totalPlans = plans.length;
      const completedPlans = plans.filter((p) =>
        p.subtasks.every((s) => s.status === 'completed'),
      ).length;

      // Calculate batch analysis (simplified version)
      const batchAnalysis: BatchAnalysis[] = [];
      const allSubtasks = plans.flatMap((p) => p.subtasks);

      // Group subtasks by batchId
      const batchGroups = allSubtasks.reduce(
        (acc, subtask) => {
          const batchId = subtask.batchId || 'default';
          if (!acc[batchId]) acc[batchId] = [];
          acc[batchId].push(subtask);
          return acc;
        },
        {} as Record<string, any[]>,
      );

      Object.entries(batchGroups).forEach(([batchId, subtasks]) => {
        const completedSubtasks = subtasks.filter(
          (s) => s.status === 'completed',
        );
        batchAnalysis.push({
          batchId,
          totalSubtasks: subtasks.length,
          completedSubtasks: completedSubtasks.length,
          completionRate:
            subtasks.length > 0
              ? (completedSubtasks.length / subtasks.length) * 100
              : 0,
          avgEstimatedDuration: subtasks[0]?.estimatedDuration || 'N/A',
          actualAvgDuration: 0, // Would need actual tracking
          estimationAccuracy: 85, // Placeholder
        });
      });

      return {
        totalPlans,
        completedPlans,
        avgBatchesPerPlan:
          totalPlans > 0 ? Object.keys(batchGroups).length / totalPlans : 0,
        avgSubtasksPerBatch:
          batchAnalysis.length > 0
            ? batchAnalysis.reduce((sum, b) => sum + b.totalSubtasks, 0) /
              batchAnalysis.length
            : 0,
        batchCompletionRate:
          batchAnalysis.length > 0
            ? batchAnalysis.reduce((sum, b) => sum + b.completionRate, 0) /
              batchAnalysis.length
            : 0,
        estimationAccuracy: 85,
        planEfficiencyScore: 80,
        batchAnalysis,
        bottleneckBatches: batchAnalysis
          .filter((b) => b.completionRate < 50)
          .map((b) => b.batchId)
          .slice(0, 3),
        topPerformingBatches: batchAnalysis
          .filter((b) => b.completionRate > 90)
          .map((b) => b.batchId)
          .slice(0, 3),
      };
    } catch (error) {
      this.logger.warn(
        'Implementation plan metrics may need schema adjustments',
        error,
      );
      // Return default metrics if schema doesn't support this yet
      return this.getDefaultImplementationPlanMetrics();
    }
  }

  async getCodeReviewInsights(
    whereClause: WhereClause,
  ): Promise<CodeReviewInsights> {
    try {
      // Use the main codeReview table - adjust based on actual schema
      const reviews = await this.prisma.codeReview.findMany({
        where: { task: whereClause },
      });

      const totalReviews = reviews.length;
      const approved = reviews.filter(
        (r: any) => r.status === 'APPROVED',
      ).length;
      const approvedWithReservations = reviews.filter(
        (r: any) => r.status === 'APPROVED_WITH_RESERVATIONS',
      ).length;
      const needsChanges = reviews.filter(
        (r: any) => r.status === 'NEEDS_CHANGES',
      ).length;

      const approvalRate =
        totalReviews > 0 ? (approved / totalReviews) * 100 : 0;
      const reworkRate =
        totalReviews > 0 ? (needsChanges / totalReviews) * 100 : 0;

      const avgReviewCycleDays =
        reviews.length > 0
          ? reviews.reduce((sum: number, review: any) => {
              const cycleDays =
                (review.updatedAt.getTime() - review.createdAt.getTime()) /
                (1000 * 60 * 60 * 24);
              return sum + cycleDays;
            }, 0) / reviews.length
          : 0;

      const reviewEfficiencyScore = (approvalRate + (100 - reworkRate)) / 2;

      // Mock some common issue patterns
      const commonIssuePatterns: IssuePattern[] = [
        {
          pattern: 'Missing error handling',
          frequency: Math.floor(totalReviews * 0.3),
        },
        {
          pattern: 'Inadequate test coverage',
          frequency: Math.floor(totalReviews * 0.25),
        },
        {
          pattern: 'Code style violations',
          frequency: Math.floor(totalReviews * 0.2),
        },
      ];

      return {
        totalReviews,
        approvalRate,
        avgReviewCycleDays,
        reworkRate,
        reviewEfficiencyScore,
        approvalTrends: {
          approved,
          approvedWithReservations,
          needsChanges,
        },
        commonIssuePatterns,
        reviewerPerformance: [],
        acceptanceCriteriaSuccess: 85,
      };
    } catch (error) {
      this.logger.warn(
        'Code review insights may need schema adjustments',
        error,
      );
      return this.getDefaultCodeReviewInsights();
    }
  }

  async getDelegationFlowMetrics(
    whereClause: WhereClause,
  ): Promise<DelegationFlowMetrics> {
    const delegations = await this.prisma.delegationRecord.findMany({
      where: { task: whereClause },
      include: { task: true },
      orderBy: { delegationTimestamp: 'asc' },
    });

    const totalFlows = delegations.length;
    const successfulFlows = delegations.filter(
      (d) => d.success === true,
    ).length;
    const successRate =
      totalFlows > 0 ? (successfulFlows / totalFlows) * 100 : 0;

    const flowsWithDuration = delegations.filter(
      (d) => d.completionTimestamp && d.delegationTimestamp,
    );
    const avgFlowDuration =
      flowsWithDuration.length > 0
        ? flowsWithDuration.reduce((sum, d) => {
            const duration =
              (d.completionTimestamp!.getTime() -
                d.delegationTimestamp.getTime()) /
              (1000 * 60 * 60);
            return sum + duration;
          }, 0) / flowsWithDuration.length
        : 0;

    const redelegationRate =
      totalFlows > 0
        ? (delegations.filter((d) => (d as any).redelegationCount > 0).length /
            totalFlows) *
          100
        : 0;

    const flowEfficiencyScore =
      successRate * 0.5 +
      (100 - redelegationRate) * 0.3 +
      (avgFlowDuration > 0
        ? Math.max(0, 100 - (avgFlowDuration / 24) * 10) * 0.2
        : 0);

    // Analyze role transitions
    const transitionMap = new Map<
      string,
      {
        count: number;
        durations: number[];
        successes: number;
      }
    >();

    delegations.forEach((d) => {
      const transition = `${d.fromMode} → ${d.toMode}`;
      if (!transitionMap.has(transition)) {
        transitionMap.set(transition, {
          count: 0,
          durations: [],
          successes: 0,
        });
      }

      const data = transitionMap.get(transition)!;
      data.count++;
      if (d.success === true) data.successes++;

      if (d.completionTimestamp && d.delegationTimestamp) {
        const duration =
          (d.completionTimestamp.getTime() - d.delegationTimestamp.getTime()) /
          (1000 * 60 * 60);
        data.durations.push(duration);
      }
    });

    const roleTransitionAnalysis: RoleTransitionAnalysis[] = Array.from(
      transitionMap.entries(),
    )
      .map(([transition, data]) => ({
        transition,
        count: data.count,
        avgDuration:
          data.durations.length > 0
            ? data.durations.reduce((sum, d) => sum + d, 0) /
              data.durations.length
            : 0,
        successRate: data.count > 0 ? (data.successes / data.count) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Identify bottleneck roles
    const roleReceiveCount = new Map<
      string,
      { received: number; successes: number }
    >();
    delegations.forEach((d) => {
      if (!roleReceiveCount.has(d.toMode)) {
        roleReceiveCount.set(d.toMode, { received: 0, successes: 0 });
      }
      const data = roleReceiveCount.get(d.toMode)!;
      data.received++;
      if (d.success === true) data.successes++;
    });

    const bottleneckRoles = Array.from(roleReceiveCount.entries())
      .filter(
        ([, data]) => data.received > 2 && data.successes / data.received < 0.7,
      )
      .map(([role]) => role)
      .slice(0, 3);

    const fastestPaths = roleTransitionAnalysis
      .filter((t) => t.successRate > 80 && t.avgDuration > 0 && t.count > 1)
      .sort((a, b) => a.avgDuration - b.avgDuration)
      .slice(0, 3)
      .map((t) => t.transition);

    const problemPatterns = this.analyzeDelegationProblems(delegations);

    return {
      totalFlows,
      avgFlowDuration,
      successRate,
      redelegationRate,
      flowEfficiencyScore,
      roleTransitionAnalysis,
      bottleneckRoles,
      fastestPaths,
      problemPatterns,
    };
  }

  // Individual Task Metrics Methods (B005 - ST-017)
  async getTaskProgressHealthMetrics(
    taskId: string,
  ): Promise<
    import('../interfaces/metrics.interface').TaskProgressHealthMetrics
  > {
    const task = await this.prisma.task.findUnique({
      where: { taskId: taskId },
      include: {
        implementationPlans: {
          include: {
            subtasks: true,
          },
        },
        delegationRecords: {
          orderBy: { delegationTimestamp: 'desc' },
        },
        comments: true,
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

    // Group subtasks by batch
    const batchGroups = allSubtasks.reduce((groups: any, subtask: any) => {
      const batchId = subtask.batchId || 'default';
      if (!groups[batchId]) {
        groups[batchId] = {
          batchId,
          batchTitle: subtask.batchTitle || 'Default Batch',
          subtasks: [],
        };
      }
      groups[batchId].subtasks.push(subtask);
      return groups;
    }, {});

    const batchAnalysis = Object.values(batchGroups).map((batch: any) => ({
      batchId: batch.batchId,
      batchTitle: batch.batchTitle,
      totalSubtasks: batch.subtasks.length,
      completedSubtasks: batch.subtasks.filter(
        (st: any) => st.status === 'completed',
      ).length,
      completionRate:
        batch.subtasks.length > 0
          ? (batch.subtasks.filter((st: any) => st.status === 'completed')
              .length /
              batch.subtasks.length) *
            100
          : 0,
      startDate: batch.subtasks[0]?.startedAt,
      endDate: batch.subtasks[batch.subtasks.length - 1]?.completedAt,
      duration:
        batch.subtasks[0]?.startedAt &&
        batch.subtasks[batch.subtasks.length - 1]?.completedAt
          ? (batch.subtasks[batch.subtasks.length - 1].completedAt.getTime() -
              batch.subtasks[0].startedAt.getTime()) /
            (1000 * 60 * 60)
          : undefined,
      dependencies: [], // TODO: Implement dependency tracking
      blockers: [], // TODO: Implement blocker detection
    }));

    const redelegationReasons = task.delegationRecords
      .filter((dr) => dr.rejectionReason)
      .map((dr) => dr.rejectionReason!)
      .filter((reason, index, arr) => arr.indexOf(reason) === index);

    // Simplified implementations for ST-017 - will be enhanced in ST-018
    const healthIndicators = [
      {
        indicator: 'Progress',
        status:
          progressPercent > 80
            ? 'healthy'
            : progressPercent > 50
              ? 'warning'
              : 'critical',
        value: progressPercent,
        threshold: 80,
        description: `Task is ${progressPercent.toFixed(1)}% complete`,
      },
    ] as any[];

    const bottlenecks = [] as any[]; // TODO: Implement in ST-018

    const estimationAccuracy = 85; // TODO: Calculate based on actual vs estimated times

    const qualityScore = Math.max(0, 100 - (task.redelegationCount || 0) * 10);

    const totalDuration = task.completionDate
      ? (task.completionDate.getTime() - task.creationDate.getTime()) /
        (1000 * 60 * 60)
      : undefined;

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
  }

  async getImplementationExecutionMetrics(
    taskId: string,
  ): Promise<
    import('../interfaces/metrics.interface').ImplementationExecutionMetrics
  > {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: {
        implementationPlans: {
          include: {
            batches: {
              include: {
                subtasks: true,
              },
            },
          },
        },
      },
    });

    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    const implementationPlan = task.implementationPlans[0];
    if (!implementationPlan) {
      throw new Error(`No implementation plan found for task ${taskId}`);
    }

    const totalBatches = implementationPlan.batches.length;
    const completedBatches = implementationPlan.batches.filter((batch) =>
      batch.subtasks.every((st) => st.status === 'completed'),
    ).length;

    const batchExecution = implementationPlan.batches.map((batch) => {
      const plannedSubtasks = batch.subtasks.length;
      const actualSubtasks = batch.subtasks.length; // Same for now
      const qualityScore = this.calculateBatchQualityScore(batch);
      const technicalDebt = this.calculateTechnicalDebt(batch);

      return {
        batchId: batch.id,
        batchTitle: batch.title,
        plannedSubtasks,
        actualSubtasks,
        estimatedDuration: 'TBD', // TODO: Add estimation tracking
        actualDuration:
          (batch.updatedAt.getTime() - batch.createdAt.getTime()) /
          (1000 * 60 * 60),
        qualityScore,
        technicalDebt,
        integrationIssues: [], // TODO: Track integration issues
      };
    });

    const subtaskPerformance = implementationPlan.batches.flatMap((batch) =>
      batch.subtasks.map((subtask) => ({
        subtaskId: subtask.id,
        name: subtask.name,
        estimatedDuration: subtask.estimatedDuration || 'TBD',
        actualDuration:
          (subtask.updatedAt.getTime() - subtask.createdAt.getTime()) /
          (1000 * 60 * 60),
        qualityScore: this.calculateSubtaskQualityScore(subtask),
        reworkCount: 0, // TODO: Track rework
        complexityScore: this.calculateComplexityScore(subtask),
      })),
    );

    const technicalQuality = this.calculateTechnicalQualityMetrics(task);
    const integrationPoints = this.identifyIntegrationPoints(task);
    const architecturalCompliance =
      this.assessArchitecturalCompliance(implementationPlan);

    return {
      taskId: task.id,
      implementationPlan: {
        id: implementationPlan.id,
        overview: implementationPlan.overview,
        approach: implementationPlan.approach,
        technicalDecisions: implementationPlan.technicalDecisions,
        totalBatches,
        completedBatches,
        batchCompletionRate:
          totalBatches > 0 ? (completedBatches / totalBatches) * 100 : 0,
      },
      batchExecution,
      subtaskPerformance,
      technicalQuality,
      integrationPoints,
      architecturalCompliance,
    };
  }

  async getCodeReviewQualityMetrics(
    taskId: string,
  ): Promise<
    import('../interfaces/metrics.interface').CodeReviewQualityMetrics
  > {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: {
        codeReviews: true,
        taskDescription: true,
      },
    });

    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    const codeReviews = task.codeReviews.map((review) => ({
      id: review.id,
      status: review.status,
      createdAt: review.createdAt,
      completedAt: review.updatedAt,
      summary: review.summary,
      strengths: review.strengths,
      issues: review.issues,
      requiredChanges: review.requiredChanges,
      manualTestingResults: review.manualTestingResults,
    }));

    const totalReviews = codeReviews.length;
    const approvedReviews = codeReviews.filter(
      (r) => r.status === 'APPROVED',
    ).length;
    const overallApprovalRate =
      totalReviews > 0 ? (approvedReviews / totalReviews) * 100 : 0;

    const avgReviewCycleDays = this.calculateAvgReviewCycleDays(codeReviews);
    const reworkCycles = this.calculateReworkCycles(codeReviews);

    const acceptanceCriteriaVerification = this.verifyAcceptanceCriteria(task);
    const qualityTrends = this.calculateQualityTrends(codeReviews);
    const issueCategories = this.categorizeIssues(codeReviews);
    const reviewerFeedback = this.extractReviewerFeedback(codeReviews);
    const testingCoverage = this.assessTestingCoverage(task);

    return {
      taskId: task.id,
      codeReviews,
      overallApprovalRate,
      avgReviewCycleDays,
      reworkCycles,
      acceptanceCriteriaVerification,
      qualityTrends,
      issueCategories,
      reviewerFeedback,
      testingCoverage,
    };
  }

  async getTaskDelegationFlowMetrics(
    taskId: string,
  ): Promise<
    import('../interfaces/metrics.interface').TaskDelegationFlowMetrics
  > {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: {
        delegationRecords: {
          orderBy: { delegationTimestamp: 'asc' },
        },
        workflowTransitions: {
          orderBy: { transitionTimestamp: 'asc' },
        },
        comments: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    const delegationHistory = task.delegationRecords.map((record) => ({
      id: record.id,
      fromMode: record.fromMode,
      toMode: record.toMode,
      delegationTimestamp: record.delegationTimestamp,
      completionTimestamp: record.completionTimestamp,
      success: record.success,
      message: record.message,
      redelegationCount: record.redelegationCount || 0,
    }));

    const flowEfficiency = this.calculateFlowEfficiency(delegationHistory);
    const handoffQuality = this.assessHandoffQuality(delegationHistory);
    const rolePerformance = this.analyzeRolePerformance(
      delegationHistory,
      task.workflowTransitions,
    );
    const communicationPatterns = this.analyzeCommunicationPatterns(
      task.comments,
    );
    const workflowBottlenecks = this.identifyWorkflowBottlenecks(
      delegationHistory,
      task.workflowTransitions,
    );
    const collaborationScore = this.calculateCollaborationScore(
      delegationHistory,
      task.comments,
    );

    return {
      taskId: task.id,
      delegationHistory,
      flowEfficiency,
      handoffQuality,
      rolePerformance,
      communicationPatterns,
      workflowBottlenecks,
      collaborationScore,
    };
  }

  async getResearchDocumentationMetrics(
    taskId: string,
  ): Promise<
    import('../interfaces/metrics.interface').ResearchDocumentationMetrics
  > {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: {
        researchReports: true,
      },
    });

    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    const researchReports = task.researchReports.map((report) => ({
      id: report.id,
      title: report.title,
      summary: report.summary,
      findings: report.findings,
      recommendations: report.recommendations,
      createdAt: report.createdAt,
      impact: this.assessResearchImpact(report) as 'low' | 'medium' | 'high',
    }));

    const knowledgeCapture = this.analyzeKnowledgeCapture(researchReports);
    const researchImpact = this.calculateResearchImpact(researchReports);
    const documentationQuality =
      this.assessDocumentationQuality(researchReports);
    const knowledgeTransfer = this.analyzeKnowledgeTransfer(task);

    return {
      taskId: task.id,
      researchReports,
      knowledgeCapture,
      researchImpact,
      documentationQuality,
      knowledgeTransfer,
    };
  }

  async getCommunicationCollaborationMetrics(
    taskId: string,
  ): Promise<
    import('../interfaces/metrics.interface').CommunicationCollaborationMetrics
  > {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: {
        comments: {
          orderBy: { createdAt: 'asc' },
        },
        delegationRecords: true,
        workflowTransitions: true,
      },
    });

    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    const commentAnalysis = this.analyzeComments(task.comments);
    const crossModeInteraction = this.analyzeCrossModeInteraction(
      task.comments,
      task.delegationRecords,
    );
    const informationFlow = this.analyzeInformationFlow(
      task.comments,
      task.workflowTransitions,
    );
    const collaborationEffectiveness = this.assessCollaborationEffectiveness(
      task.comments,
      task.delegationRecords,
    );
    const communicationPatterns = this.identifyTaskCommunicationPatterns(
      task.comments,
    );

    return {
      taskId: task.id,
      commentAnalysis,
      crossModeInteraction,
      informationFlow,
      collaborationEffectiveness,
      communicationPatterns,
    };
  }

  // Private helper methods following DRY principle
  private calculateAverageCompletionTime(
    completedTasks: Array<{ creationDate: Date; completionDate: Date | null }>,
  ): number {
    if (completedTasks.length === 0) return 0;

    return (
      completedTasks.reduce((sum, task) => {
        if (!task.completionDate) return sum;
        const duration =
          task.completionDate.getTime() - task.creationDate.getTime();
        return sum + duration / (1000 * 60 * 60);
      }, 0) / completedTasks.length
    );
  }

  private calculateAverageReviewTime(
    reviews: Array<{ createdAt: Date; updatedAt: Date }>,
  ): number {
    if (reviews.length === 0) return 0;

    return (
      reviews.reduce((sum, review) => {
        const duration =
          review.updatedAt.getTime() - review.createdAt.getTime();
        return sum + duration / (1000 * 60 * 60);
      }, 0) / reviews.length
    );
  }

  private calculateImplementationEfficiency(tasks: any[]): number {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    return (completedTasks / tasks.length) * 100;
  }

  private calculateModeActivity(delegations: any[]): {
    mostActiveMode: string | null;
    leastActiveMode: string | null;
  } {
    const modeCounts = delegations.reduce(
      (acc, d) => {
        acc[d.toMode] = (acc[d.toMode] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    const sortedModes = Object.entries(modeCounts).sort(
      ([, a], [, b]) => (b as number) - (a as number),
    );

    return {
      mostActiveMode: sortedModes[0]?.[0] || null,
      leastActiveMode: sortedModes[sortedModes.length - 1]?.[0] || null,
    };
  }

  private calculateTimeToFirstDelegation(tasks: any[]): number {
    const tasksWithDelegations = tasks.filter(
      (t) => t.delegationRecords.length > 0,
    );
    if (tasksWithDelegations.length === 0) return 0;

    return (
      tasksWithDelegations.reduce((sum, task) => {
        const firstDelegation = task.delegationRecords[0];
        return (
          sum +
          (firstDelegation.delegationTimestamp.getTime() -
            task.creationDate.getTime()) /
            (1000 * 60 * 60)
        );
      }, 0) / tasksWithDelegations.length
    );
  }

  // Mapping methods following DRY principle
  private mapPriorityDistribution(data: any[]): PriorityDistribution[] {
    return data.map((p) => ({
      priority: p.priority,
      count: p._count,
    }));
  }

  private mapOwnerDistribution(data: any[]): OwnerDistribution[] {
    return data.map((o) => ({
      owner: o.owner,
      count: o._count,
    }));
  }

  private mapModeTransitions(data: any[]): ModeTransition[] {
    return data.map((t) => ({
      fromMode: t.fromMode,
      toMode: t.toMode,
      count: t._count,
    }));
  }

  private mapFailureReasons(data: any[]): FailureReason[] {
    return data.map((f) => ({
      reason: f.rejectionReason,
      count: f._count,
    }));
  }

  // Private helper methods
  private analyzeDelegationProblems(delegations: any[]): ProblemPattern[] {
    const problems: ProblemPattern[] = [];

    const highRedelegation = delegations.filter(
      (d) => (d.redelegationCount ?? 0) > 2,
    ).length;
    if (highRedelegation > 0) {
      problems.push({
        pattern: 'High Redelegation Count',
        frequency: highRedelegation,
      });
    }

    const failures = delegations.filter((d) => d.success === false).length;
    if (failures > 0) {
      problems.push({
        pattern: 'Delegation Failures',
        frequency: failures,
      });
    }

    const longDurations = delegations.filter((d) => {
      if (!d.completionTimestamp || !d.delegationTimestamp) return false;
      const duration =
        (d.completionTimestamp.getTime() - d.delegationTimestamp.getTime()) /
        (1000 * 60 * 60);
      return duration > 48;
    }).length;

    if (longDurations > 0) {
      problems.push({
        pattern: 'Long Processing Times',
        frequency: longDurations,
      });
    }

    return problems.sort((a, b) => (b.frequency || 0) - (a.frequency || 0));
  }

  private getDefaultImplementationPlanMetrics(): ImplementationPlanMetrics {
    return {
      totalPlans: 0,
      completedPlans: 0,
      avgBatchesPerPlan: 0,
      avgSubtasksPerBatch: 0,
      batchCompletionRate: 0,
      estimationAccuracy: 0,
      planEfficiencyScore: 0,
      batchAnalysis: [],
      bottleneckBatches: [],
      topPerformingBatches: [],
    };
  }

  private getDefaultCodeReviewInsights(): CodeReviewInsights {
    return {
      totalReviews: 0,
      approvalRate: 0,
      avgReviewCycleDays: 0,
      reworkRate: 0,
      reviewEfficiencyScore: 0,
      approvalTrends: {
        approved: 0,
        approvedWithReservations: 0,
        needsChanges: 0,
      },
      commonIssuePatterns: [],
      reviewerPerformance: [],
      acceptanceCriteriaSuccess: 0,
    };
  }

  // Helper methods for individual task metrics (B005 - ST-017)
  // These are simplified implementations that will be enhanced in ST-018
  private calculateBatchQualityScore(_batch: any): number {
    return 85; // TODO: Implement quality scoring algorithm
  }

  private calculateTechnicalDebt(_batch: any): number {
    return 15; // TODO: Implement technical debt calculation
  }

  private calculateSubtaskQualityScore(_subtask: any): number {
    return 90; // TODO: Implement subtask quality scoring
  }

  private calculateComplexityScore(_subtask: any): number {
    return 50; // TODO: Implement complexity scoring
  }

  private calculateTechnicalQualityMetrics(task: any): any {
    return {
      codeQuality: 85,
      testCoverage: 80,
      architecturalCompliance: 90,
      securityScore: 85,
      performanceScore: 80,
      maintainabilityScore: 85,
    };
  }

  private identifyIntegrationPoints(task: any): any[] {
    return []; // TODO: Implement integration point identification
  }

  private assessArchitecturalCompliance(plan: any): any {
    return {
      solidPrinciples: {
        singleResponsibility: 85,
        openClosed: 80,
        liskovSubstitution: 90,
        interfaceSegregation: 85,
        dependencyInversion: 80,
        overallScore: 84,
      },
      designPatterns: [],
      codeStandards: {
        namingConventions: 90,
        codeStructure: 85,
        documentation: 80,
        errorHandling: 85,
        overallScore: 85,
      },
      securityCompliance: {
        inputValidation: 85,
        authentication: 90,
        authorization: 85,
        dataProtection: 80,
        overallScore: 85,
      },
    };
  }

  private calculateAvgReviewCycleDays(reviews: any[]): number {
    if (reviews.length === 0) return 0;
    return (
      reviews.reduce((sum, review) => {
        const days =
          (review.completedAt.getTime() - review.createdAt.getTime()) /
          (1000 * 60 * 60 * 24);
        return sum + days;
      }, 0) / reviews.length
    );
  }

  private calculateReworkCycles(reviews: any[]): number {
    return reviews.filter((r) => r.status === 'NEEDS_CHANGES').length;
  }

  private verifyAcceptanceCriteria(task: any): any[] {
    return []; // TODO: Implement acceptance criteria verification
  }

  private calculateQualityTrends(reviews: any[]): any[] {
    return []; // TODO: Implement quality trend calculation
  }

  private categorizeIssues(reviews: any[]): any[] {
    return []; // TODO: Implement issue categorization
  }

  private extractReviewerFeedback(reviews: any[]): any[] {
    return []; // TODO: Implement feedback extraction
  }

  private assessTestingCoverage(task: any): any {
    return {
      unitTests: 80,
      integrationTests: 70,
      e2eTests: 60,
      manualTesting: true,
      coveragePercent: 75,
    };
  }

  private calculateFlowEfficiency(delegations: any[]): number {
    return 85; // TODO: Implement flow efficiency calculation
  }

  private assessHandoffQuality(delegations: any[]): any[] {
    return []; // TODO: Implement handoff quality assessment
  }

  private analyzeRolePerformance(
    delegations: any[],
    transitions: any[],
  ): any[] {
    return []; // TODO: Implement role performance analysis
  }

  private analyzeCommunicationPatterns(comments: any[]): any[] {
    return []; // TODO: Implement communication pattern analysis
  }

  private identifyWorkflowBottlenecks(
    delegations: any[],
    transitions: any[],
  ): any[] {
    return []; // TODO: Implement bottleneck identification
  }

  private calculateCollaborationScore(
    delegations: any[],
    comments: any[],
  ): number {
    return 80; // TODO: Implement collaboration scoring
  }

  private assessResearchImpact(report: any): string {
    return 'medium'; // TODO: Implement research impact assessment
  }

  private analyzeKnowledgeCapture(reports: any[]): any {
    return {
      totalFindings: reports.length,
      actionableInsights: Math.floor(reports.length * 0.8),
      knowledgeGaps: [],
      expertiseAreas: [],
      reusabilityScore: 75,
    };
  }

  private calculateResearchImpact(reports: any[]): any {
    return {
      implementationInfluence: 80,
      decisionSupport: 85,
      riskMitigation: 75,
      innovationScore: 70,
    };
  }

  private assessDocumentationQuality(reports: any[]): any {
    return {
      completeness: 85,
      clarity: 80,
      accuracy: 90,
      maintainability: 75,
      overallScore: 82,
    };
  }

  private analyzeKnowledgeTransfer(task: any): any[] {
    return []; // TODO: Implement knowledge transfer analysis
  }

  private analyzeComments(comments: any[]): any {
    return {
      totalComments: comments.length,
      avgCommentsPerMode: comments.length / 5, // Assuming 5 modes
      communicationFrequency: comments.length / 7, // Per week
      responseTime: 2, // Hours
      clarityScore: 80,
    };
  }

  private analyzeCrossModeInteraction(
    comments: any[],
    delegations: any[],
  ): any[] {
    return []; // TODO: Implement cross-mode interaction analysis
  }

  private analyzeInformationFlow(comments: any[], transitions: any[]): any {
    return {
      upstreamFlow: 80,
      downstreamFlow: 85,
      bidirectionalFlow: 75,
      informationLoss: 10,
      flowEfficiency: 82,
    };
  }

  private assessCollaborationEffectiveness(
    comments: any[],
    delegations: any[],
  ): any {
    return {
      teamworkScore: 85,
      knowledgeSharing: 80,
      conflictResolution: 90,
      decisionMaking: 85,
      overallEffectiveness: 85,
    };
  }

  private identifyTaskCommunicationPatterns(comments: any[]): any[] {
    return []; // TODO: Implement task communication pattern identification
  }
}
