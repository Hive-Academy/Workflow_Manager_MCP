import { z } from 'zod';

/**
 * Workflow Operations Schema - Simplified for Gemini compatibility
 */

// Workflow Operation Types
export const WorkflowOperationSchema = z
  .enum([
    'delegate',
    'complete',
    'transition',
    'escalate',
    'reassign',
    'pause',
    'resume',
    'cancel',
  ])
  .describe('Type of workflow operation');

// Workflow Roles
export const WorkflowRoleSchema = z
  .enum([
    'boomerang',
    'researcher',
    'architect',
    'senior-developer',
    'code-review',
  ])
  .describe('Workflow role (boomerang, researcher, etc.)');

// Task Status Values
export const TaskStatusSchema = z
  .enum([
    'not-started',
    'in-progress',
    'needs-review',
    'completed',
    'needs-changes',
    'paused',
    'cancelled',
  ])
  .describe('Task status value');

// Completion Data - Simplified
export const CompletionDataSchema = z.object({
  summary: z.string().describe('Work accomplishment summary'),
  evidence: z.record(z.any()).optional().describe('Supporting evidence'),
  filesModified: z.array(z.string()).optional().describe('Files changed'),
  acceptanceCriteriaVerification: z
    .record(z.any())
    .optional()
    .describe('Verification results'),
});

// Rejection Data - Simplified
export const RejectionDataSchema = z.object({
  reason: z.string().describe('Rejection/escalation reason'),
  severity: z
    .enum(['low', 'medium', 'high', 'critical'])
    .optional()
    .describe('Issue severity'),
  requiredChanges: z.string().optional().describe('Required modifications'),
  blockers: z.array(z.string()).optional().describe('Blocking issues'),
});

// Constraints Schema - Added
export const ConstraintsSchema = z
  .object({
    forceTransition: z
      .boolean()
      .default(false)
      .describe('Force workflow transition even if validation fails'),
    allowSkipValidation: z
      .boolean()
      .default(false)
      .describe('Allow skipping standard validation checks'),
    createAuditTrail: z
      .boolean()
      .default(true)
      .describe('Generate audit trail entry for the operation'),
    notifyStakeholders: z
      .boolean()
      .default(true)
      .describe('Send notifications to relevant stakeholders'),
  })
  .describe('Workflow operation constraints and validation controls');

// Batch Operations - Simplified
export const BatchOperationsSchema = z.object({
  taskIds: z.array(z.string()).describe('Task IDs for batch operation'),
  parallelExecution: z.boolean().default(false).describe('Execute in parallel'),
  continueOnError: z
    .boolean()
    .default(false)
    .describe('Continue if operations fail'),
});

// Conditions - Simplified
export const ConditionsSchema = z.object({
  requiredRole: WorkflowRoleSchema.optional().describe('Required current role'),
  requiredStatus: TaskStatusSchema.optional().describe(
    'Required current status',
  ),
  customConditions: z
    .array(z.string())
    .optional()
    .describe('Custom conditions'),
});

// Scheduling Schema - Added
export const SchedulingSchema = z
  .object({
    deadline: z
      .string()
      .optional()
      .describe('ISO date deadline for the operation'),
    estimatedDuration: z
      .string()
      .optional()
      .describe('Time estimate for operation'),
    priority: z
      .enum(['low', 'medium', 'high', 'urgent'])
      .optional()
      .describe('Operation priority level'),
    scheduleFor: z
      .string()
      .optional()
      .describe('ISO date to schedule operation for'),
  })
  .describe('Timing and scheduling information');

// Main Workflow Operations Schema - Updated with constraints
export const WorkflowOperationsSchema = z
  .object({
    operation: WorkflowOperationSchema.describe(
      'The workflow operation to perform',
    ),
    taskId: z.string().describe('Task ID to operate on'),
    fromRole: WorkflowRoleSchema.optional().describe(
      'Source role (current owner)',
    ),
    toRole: WorkflowRoleSchema.optional().describe(
      'Target role for delegation',
    ),
    newStatus: TaskStatusSchema.optional().describe(
      'Target status for transition',
    ),
    message: z.string().optional().describe('Operation context or reason'),
    completionData: CompletionDataSchema.optional().describe(
      'Data for completion operations',
    ),
    rejectionData: RejectionDataSchema.optional().describe(
      'Data for rejection/escalation',
    ),
    constraints: ConstraintsSchema.optional().describe(
      'Operation constraints and validation controls',
    ),
    scheduling: SchedulingSchema.optional().describe(
      'Timing and deadline information',
    ),
    batch: BatchOperationsSchema.optional().describe(
      'Batch workflow operations',
    ),
    conditions: ConditionsSchema.optional().describe('Operation conditions'),
    metadata: z
      .record(z.any())
      .optional()
      .describe('Additional operation metadata'),
  })
  .describe('Workflow Operations tool parameters');

export type WorkflowOperationsInput = z.infer<typeof WorkflowOperationsSchema>;
