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

// Individual Task Report Metrics (B005)
export interface TaskProgressHealthMetrics {
  taskId: string;
  taskName: string;
  status: string;
  currentMode: string;
  creationDate: Date;
  completionDate?: Date;
  totalDuration?: number;
  progressPercent: number;
  totalSubtasks: number;
  completedSubtasks: number;
  batchAnalysis: TaskBatchAnalysis[];
  redelegationCount: number;
  redelegationReasons: string[];
  qualityScore: number;
  healthIndicators: HealthIndicator[];
  bottlenecks: Bottleneck[];
  estimationAccuracy: number;
}

export interface ImplementationExecutionMetrics {
  taskId: string;
  implementationPlan: {
    id: number;
    overview: string;
    approach: string;
    technicalDecisions: string;
    totalBatches: number;
    completedBatches: number;
    batchCompletionRate: number;
  };
  batchExecution: BatchExecutionAnalysis[];
  subtaskPerformance: SubtaskPerformanceAnalysis[];
  technicalQuality: TechnicalQualityMetrics;
  integrationPoints: IntegrationPoint[];
  architecturalCompliance: ArchitecturalCompliance;
}

export interface CodeReviewQualityMetrics {
  taskId: string;
  codeReviews: TaskCodeReview[];
  overallApprovalRate: number;
  avgReviewCycleDays: number;
  reworkCycles: number;
  acceptanceCriteriaVerification: AcceptanceCriteriaVerification[];
  qualityTrends: QualityTrend[];
  issueCategories: IssueCategory[];
  reviewerFeedback: ReviewerFeedback[];
  testingCoverage: TestingCoverage;
}

export interface TaskDelegationFlowMetrics {
  taskId: string;
  delegationHistory: TaskDelegationRecord[];
  flowEfficiency: number;
  handoffQuality: HandoffQuality[];
  rolePerformance: TaskRolePerformance[];
  communicationPatterns: CommunicationPattern[];
  workflowBottlenecks: WorkflowBottleneck[];
  collaborationScore: number;
}

export interface ResearchDocumentationMetrics {
  taskId: string;
  researchReports: TaskResearchReport[];
  knowledgeCapture: KnowledgeCapture;
  researchImpact: ResearchImpact;
  documentationQuality: DocumentationQuality;
  knowledgeTransfer: KnowledgeTransfer[];
}

export interface CommunicationCollaborationMetrics {
  taskId: string;
  commentAnalysis: CommentAnalysis;
  crossModeInteraction: CrossModeInteraction[];
  informationFlow: InformationFlow;
  collaborationEffectiveness: CollaborationEffectiveness;
  communicationPatterns: TaskCommunicationPattern[];
}

// Supporting interfaces for individual task metrics
export interface TaskBatchAnalysis {
  batchId: string;
  batchTitle: string;
  totalSubtasks: number;
  completedSubtasks: number;
  completionRate: number;
  startDate?: Date;
  endDate?: Date;
  duration?: number;
  dependencies: string[];
  blockers: string[];
}

export interface HealthIndicator {
  indicator: string;
  status: 'healthy' | 'warning' | 'critical';
  value: number;
  threshold: number;
  description: string;
}

export interface Bottleneck {
  type: 'batch' | 'role' | 'dependency' | 'technical';
  description: string;
  impact: 'low' | 'medium' | 'high';
  duration: number;
  resolution?: string;
}

export interface BatchExecutionAnalysis {
  batchId: string;
  batchTitle: string;
  plannedSubtasks: number;
  actualSubtasks: number;
  estimatedDuration: string;
  actualDuration: number;
  qualityScore: number;
  technicalDebt: number;
  integrationIssues: string[];
}

export interface SubtaskPerformanceAnalysis {
  subtaskId: number;
  name: string;
  estimatedDuration: string;
  actualDuration: number;
  qualityScore: number;
  reworkCount: number;
  complexityScore: number;
}

export interface TechnicalQualityMetrics {
  codeQuality: number;
  testCoverage: number;
  architecturalCompliance: number;
  securityScore: number;
  performanceScore: number;
  maintainabilityScore: number;
}

export interface IntegrationPoint {
  component: string;
  type: 'api' | 'database' | 'service' | 'ui';
  complexity: 'low' | 'medium' | 'high';
  status: 'planned' | 'implemented' | 'tested' | 'deployed';
  issues: string[];
}

export interface ArchitecturalCompliance {
  solidPrinciples: SOLIDCompliance;
  designPatterns: DesignPatternUsage[];
  codeStandards: CodeStandardsCompliance;
  securityCompliance: SecurityCompliance;
}

export interface TaskCodeReview {
  id: number;
  status: string;
  createdAt: Date;
  completedAt?: Date;
  summary: string;
  strengths: string;
  issues: string;
  requiredChanges?: string;
  manualTestingResults: string;
}

export interface AcceptanceCriteriaVerification {
  criterion: string;
  verified: boolean;
  evidence: string;
  testingMethod: string;
}

export interface QualityTrend {
  date: Date;
  qualityScore: number;
  issueCount: number;
  testCoverage: number;
}

export interface IssueCategory {
  category: string;
  count: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  examples: string[];
}

export interface ReviewerFeedback {
  reviewer: string;
  feedback: string;
  category: string;
  actionable: boolean;
}

export interface TestingCoverage {
  unitTests: number;
  integrationTests: number;
  e2eTests: number;
  manualTesting: boolean;
  coveragePercent: number;
}

export interface TaskDelegationRecord {
  id: number;
  fromMode: string;
  toMode: string;
  delegationTimestamp: Date;
  completionTimestamp?: Date;
  success?: boolean;
  message: string;
  redelegationCount: number;
}

export interface HandoffQuality {
  fromMode: string;
  toMode: string;
  clarity: number;
  completeness: number;
  timeliness: number;
  overallScore: number;
}

export interface TaskRolePerformance {
  mode: string;
  timeSpent: number;
  efficiency: number;
  qualityOutput: number;
  collaborationScore: number;
}

export interface CommunicationPattern {
  pattern: string;
  frequency: number;
  effectiveness: number;
  participants: string[];
}

export interface WorkflowBottleneck {
  stage: string;
  duration: number;
  cause: string;
  impact: 'low' | 'medium' | 'high';
  resolution?: string;
}

export interface TaskResearchReport {
  id: number;
  title: string;
  summary: string;
  findings: string;
  recommendations: string;
  createdAt: Date;
  impact: 'low' | 'medium' | 'high';
}

export interface KnowledgeCapture {
  totalFindings: number;
  actionableInsights: number;
  knowledgeGaps: string[];
  expertiseAreas: string[];
  reusabilityScore: number;
}

export interface ResearchImpact {
  implementationInfluence: number;
  decisionSupport: number;
  riskMitigation: number;
  innovationScore: number;
}

export interface DocumentationQuality {
  completeness: number;
  clarity: number;
  accuracy: number;
  maintainability: number;
  overallScore: number;
}

export interface KnowledgeTransfer {
  recipient: string;
  knowledge: string;
  transferMethod: string;
  effectiveness: number;
}

export interface CommentAnalysis {
  totalComments: number;
  avgCommentsPerMode: number;
  communicationFrequency: number;
  responseTime: number;
  clarityScore: number;
}

export interface CrossModeInteraction {
  fromMode: string;
  toMode: string;
  interactionCount: number;
  avgResponseTime: number;
  effectivenessScore: number;
}

export interface InformationFlow {
  upstreamFlow: number;
  downstreamFlow: number;
  bidirectionalFlow: number;
  informationLoss: number;
  flowEfficiency: number;
}

export interface CollaborationEffectiveness {
  teamworkScore: number;
  knowledgeSharing: number;
  conflictResolution: number;
  decisionMaking: number;
  overallEffectiveness: number;
}

export interface TaskCommunicationPattern {
  pattern: string;
  frequency: number;
  participants: string[];
  effectiveness: number;
  outcome: string;
}

export interface SOLIDCompliance {
  singleResponsibility: number;
  openClosed: number;
  liskovSubstitution: number;
  interfaceSegregation: number;
  dependencyInversion: number;
  overallScore: number;
}

export interface DesignPatternUsage {
  pattern: string;
  usage: 'correct' | 'incorrect' | 'missing';
  impact: 'positive' | 'neutral' | 'negative';
  recommendation: string;
}

export interface CodeStandardsCompliance {
  namingConventions: number;
  codeStructure: number;
  documentation: number;
  errorHandling: number;
  overallScore: number;
}

export interface SecurityCompliance {
  inputValidation: number;
  authentication: number;
  authorization: number;
  dataProtection: number;
  overallScore: number;
}
