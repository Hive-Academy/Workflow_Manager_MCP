import { z } from 'zod';

/**
 * Workflow Operations Schema - Specialized workflow state management
 * Handles complex workflow transitions, delegations, and role-based operations
 */

export const WorkflowOperationSchema = z.enum([
  'delegate',
  'complete',
  'transition',
  'escalate',
  'reassign',
  'pause',
  'resume',
  'cancel',
]);

export const WorkflowRoleSchema = z.enum([
  'boomerang',
  'researcher',
  'architect',
  'senior-developer',
  'code-review',
]);

export const TaskStatusSchema = z.enum([
  'not-started',
  'in-progress',
  'needs-review',
  'completed',
  'needs-changes',
  'paused',
  'cancelled',
]);

export const WorkflowOperationsSchema = z.object({
  operation: WorkflowOperationSchema.describe(
    'The workflow operation to perform',
  ),

  taskId: z.string().describe('The task ID to operate on'),

  // Role and delegation management
  fromRole: WorkflowRoleSchema.optional().describe(
    'Role performing the operation',
  ),
  toRole: WorkflowRoleSchema.optional().describe(
    'Target role for delegation/transition',
  ),

  // Status management
  newStatus: TaskStatusSchema.optional().describe('New status to set'),

  // Operation context
  message: z
    .string()
    .optional()
    .describe('Message or reason for the operation'),
  metadata: z
    .record(z.any())
    .optional()
    .describe('Additional operation metadata'),

  // Completion data
  completionData: z
    .object({
      summary: z.string().describe('Summary of completed work'),
      filesModified: z
        .array(z.string())
        .optional()
        .describe('List of modified files'),
      acceptanceCriteriaVerification: z
        .record(z.any())
        .optional()
        .describe('Verification of acceptance criteria'),
      evidence: z.record(z.any()).optional().describe('Evidence of completion'),
    })
    .optional()
    .describe('Data for completion operations'),

  // Rejection/escalation data
  rejectionData: z
    .object({
      reason: z.string().describe('Reason for rejection'),
      requiredChanges: z.string().optional().describe('Required changes'),
      severity: z
        .enum(['low', 'medium', 'high', 'critical'])
        .optional()
        .describe('Issue severity'),
      blockers: z.array(z.string()).optional().describe('Blocking issues'),
    })
    .optional()
    .describe('Data for rejection/escalation operations'),

  // Workflow constraints
  constraints: z
    .object({
      allowSkipValidation: z
        .boolean()
        .optional()
        .default(false)
        .describe('Allow skipping validation'),
      forceTransition: z
        .boolean()
        .optional()
        .default(false)
        .describe('Force transition even if invalid'),
      notifyStakeholders: z
        .boolean()
        .optional()
        .default(true)
        .describe('Notify relevant stakeholders'),
      createAuditTrail: z
        .boolean()
        .optional()
        .default(true)
        .describe('Create audit trail entry'),
    })
    .optional()
    .describe('Workflow operation constraints'),

  // Scheduling and timing
  scheduling: z
    .object({
      scheduleFor: z
        .string()
        .optional()
        .describe('ISO date to schedule operation for'),
      deadline: z
        .string()
        .optional()
        .describe('ISO date deadline for operation'),
      priority: z
        .enum(['low', 'medium', 'high', 'urgent'])
        .optional()
        .describe('Operation priority'),
      estimatedDuration: z
        .string()
        .optional()
        .describe('Estimated duration for operation'),
    })
    .optional()
    .describe('Scheduling information'),

  // Batch workflow operations
  batch: z
    .object({
      taskIds: z
        .array(z.string())
        .describe('Multiple task IDs for batch operations'),
      continueOnError: z
        .boolean()
        .optional()
        .default(false)
        .describe('Continue batch if individual operations fail'),
      parallelExecution: z
        .boolean()
        .optional()
        .default(false)
        .describe('Execute operations in parallel'),
    })
    .optional()
    .describe('Batch operation configuration'),

  // Conditional operations
  conditions: z
    .object({
      requiredStatus: TaskStatusSchema.optional().describe(
        'Required current status for operation',
      ),
      requiredRole: WorkflowRoleSchema.optional().describe(
        'Required current role for operation',
      ),
      customConditions: z
        .array(z.string())
        .optional()
        .describe('Custom condition checks to perform'),
    })
    .optional()
    .describe('Conditions that must be met for operation'),
});

export type WorkflowOperationsInput = z.infer<typeof WorkflowOperationsSchema>;

/**
 * Example Usage:
 *
 * // Delegate task from architect to senior developer
 * {
 *   operation: "delegate",
 *   taskId: "TSK-001",
 *   fromRole: "architect",
 *   toRole: "senior-developer",
 *   message: "Implementation plan ready. Please implement batch B001.",
 *   metadata: { batchId: "B001", priority: "high" }
 * }
 *
 * // Complete task with evidence
 * {
 *   operation: "complete",
 *   taskId: "TSK-001",
 *   fromRole: "senior-developer",
 *   newStatus: "completed",
 *   completionData: {
 *     summary: "All features implemented and tested",
 *     filesModified: ["src/feature.ts", "tests/feature.test.ts"],
 *     acceptanceCriteriaVerification: { "AC1": true, "AC2": true }
 *   }
 * }
 *
 * // Escalate with rejection
 * {
 *   operation: "escalate",
 *   taskId: "TSK-001",
 *   fromRole: "code-review",
 *   toRole: "architect",
 *   newStatus: "needs-changes",
 *   rejectionData: {
 *     reason: "Security vulnerabilities found",
 *     requiredChanges: "Fix input validation and add authentication",
 *     severity: "high",
 *     blockers: ["SEC-001", "SEC-002"]
 *   }
 * }
 *
 * // Batch delegation
 * {
 *   operation: "delegate",
 *   fromRole: "boomerang",
 *   toRole: "researcher",
 *   batch: {
 *     taskIds: ["TSK-001", "TSK-002", "TSK-003"],
 *     continueOnError: true
 *   },
 *   message: "Research required for these tasks"
 * }
 */
