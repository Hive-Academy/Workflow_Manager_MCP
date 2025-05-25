// src/task-workflow/domains/reporting/interfaces/metrics.interface.ts

export interface TaskMetrics {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  notStartedTasks: number;
  completionRate: number;
  avgCompletionTimeHours: number;
  priorityDistribution: PriorityDistribution[];
  tasksByOwner: OwnerDistribution[];
}

export interface DelegationMetrics {
  totalDelegations: number;
  successfulDelegations: number;
  failedDelegations: number;
  avgRedelegationCount: number;
  maxRedelegationCount: number;
  modeTransitions: ModeTransition[];
  topFailureReasons: FailureReason[];
}

export interface CodeReviewMetrics {
  totalReviews: number;
  approvedReviews: number;
  approvedWithReservationsReviews: number;
  needsChangesReviews: number;
  approvalRate: number;
  avgReviewTimeHours: number;
}

export interface PerformanceMetrics {
  implementationEfficiency: number;
  avgSubtasksPerTask: number;
  mostActiveMode: string | null;
  leastActiveMode: string | null;
  timeToFirstDelegation: number;
}

export interface ImplementationPlanMetrics {
  totalPlans: number;
  completedPlans: number;
  avgBatchesPerPlan: number;
  avgSubtasksPerBatch: number;
  batchCompletionRate: number;
  estimationAccuracy: number;
  planEfficiencyScore: number;
  batchAnalysis: BatchAnalysis[];
  bottleneckBatches: string[];
  topPerformingBatches: string[];
}

export interface CodeReviewInsights {
  totalReviews: number;
  approvalRate: number;
  avgReviewCycleDays: number;
  reworkRate: number;
  reviewEfficiencyScore: number;
  approvalTrends: ApprovalTrends;
  commonIssuePatterns: IssuePattern[];
  reviewerPerformance: ReviewerPerformance[];
  acceptanceCriteriaSuccess: number;
}

export interface DelegationFlowMetrics {
  totalFlows: number;
  avgFlowDuration: number;
  successRate: number;
  redelegationRate: number;
  flowEfficiencyScore: number;
  roleTransitionAnalysis: RoleTransitionAnalysis[];
  bottleneckRoles: string[];
  fastestPaths: string[];
  problemPatterns: ProblemPattern[];
}

// Supporting interfaces
export interface PriorityDistribution {
  priority: string | null;
  count: number;
}

export interface OwnerDistribution {
  owner: string | null;
  count: number;
}

export interface ModeTransition {
  fromMode: string;
  toMode: string;
  count: number;
}

export interface FailureReason {
  reason: string | null;
  count: number;
}

export interface BatchAnalysis {
  batchId: string;
  totalSubtasks: number;
  completedSubtasks: number;
  completionRate: number;
  avgEstimatedDuration: string;
  actualAvgDuration: number;
  estimationAccuracy: number;
}

export interface ApprovalTrends {
  approved: number;
  approvedWithReservations: number;
  needsChanges: number;
}

export interface IssuePattern {
  pattern: string;
  frequency: number;
}

export interface ReviewerPerformance {
  reviewer: string;
  avgCycleDays: number;
  approvalRate: number;
}

export interface RoleTransitionAnalysis {
  transition: string;
  count: number;
  avgDuration: number;
  successRate: number;
}

export interface ProblemPattern {
  pattern: string;
  frequency: number;
}
