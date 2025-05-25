import { z } from 'zod';

/**
 * Universal Mutation Schema - Leverages Prisma's full mutation capabilities
 * Replaces 20+ individual create/update/delete tools with one powerful tool
 */

// Operation types
export const MutationOperationSchema = z.enum([
  'create',
  'update',
  'upsert',
  'delete',
  'createMany',
  'updateMany',
  'deleteMany',
]);

// Entity types (same as query, matching Prisma model names)
export const EntityTypeSchema = z.enum([
  'task',
  'taskDescription',
  'implementationPlan',
  'subtask',
  'researchReport',
  'codeReviewReport', // Maps to CodeReview model
  'completionReport',
  'comment',
  'delegation', // Maps to DelegationRecord model
  'workflowTransition',
]);

// Data payload for mutations
export const DataPayloadSchema = z
  .record(z.any())
  .describe('Data payload for the mutation - follows Prisma data structure');

// Where conditions for updates/deletes
export const WhereConditionSchema = z
  .record(z.any())
  .describe('Prisma where conditions for identifying records to update/delete');

// Connect/disconnect for relations
export const RelationOperationSchema = z.object({
  connect: z
    .record(z.any())
    .optional()
    .describe('Connect to existing related records'),
  disconnect: z
    .record(z.any())
    .optional()
    .describe('Disconnect from related records'),
  create: z
    .record(z.any())
    .optional()
    .describe('Create and connect new related records'),
  update: z
    .record(z.any())
    .optional()
    .describe('Update connected related records'),
  delete: z
    .record(z.any())
    .optional()
    .describe('Delete connected related records'),
});

export const UniversalMutationSchema = z.object({
  operation: MutationOperationSchema.describe('The type of mutation operation'),

  entity: EntityTypeSchema.describe('The entity type to mutate'),

  data: DataPayloadSchema.optional().describe(
    'Data for create/update operations. Examples:\n' +
      '- { name: "New Task", status: "not-started", priority: "High" }\n' +
      '- { status: "completed", completedAt: "2024-01-15T10:00:00Z" }\n' +
      '- { taskDescription: { create: { description: "..." } } }',
  ),

  where: WhereConditionSchema.optional().describe(
    'Where conditions for update/delete operations. Examples:\n' +
      '- { id: "TSK-001" }\n' +
      '- { status: "not-started", createdAt: { lt: "2024-01-01" } }\n' +
      '- { AND: [{ status: "completed" }, { priority: "Low" }] }',
  ),

  include: z
    .record(z.any())
    .optional()
    .describe('Include related data in the response'),

  select: z
    .record(z.any())
    .optional()
    .describe('Select specific fields to return'),

  // Transaction support
  transaction: z
    .object({
      id: z
        .string()
        .optional()
        .describe('Transaction ID for grouping operations'),
      isolationLevel: z
        .enum([
          'ReadUncommitted',
          'ReadCommitted',
          'RepeatableRead',
          'Serializable',
        ])
        .optional(),
      timeout: z
        .number()
        .optional()
        .describe('Transaction timeout in milliseconds'),
    })
    .optional()
    .describe('Transaction control options'),

  // Batch operations
  batch: z
    .object({
      operations: z.array(
        z.object({
          operation: MutationOperationSchema,
          entity: EntityTypeSchema,
          data: DataPayloadSchema.optional(),
          where: WhereConditionSchema.optional(),
        }),
      ),
      continueOnError: z
        .boolean()
        .optional()
        .default(false)
        .describe('Continue batch if individual operations fail'),
    })
    .optional()
    .describe('Batch operation configuration'),

  // Validation and constraints
  validate: z
    .object({
      businessRules: z
        .boolean()
        .optional()
        .default(true)
        .describe('Apply business rule validation'),
      referentialIntegrity: z
        .boolean()
        .optional()
        .default(true)
        .describe('Check referential integrity'),
      customValidators: z
        .array(z.string())
        .optional()
        .describe('Custom validator names to apply'),
    })
    .optional()
    .describe('Validation options'),

  // Audit and tracking
  audit: z
    .object({
      userId: z.string().optional().describe('User performing the operation'),
      reason: z.string().optional().describe('Reason for the change'),
      metadata: z
        .record(z.any())
        .optional()
        .describe('Additional audit metadata'),
    })
    .optional()
    .describe('Audit trail information'),

  // Performance options
  performance: z
    .object({
      skipTriggers: z
        .boolean()
        .optional()
        .describe('Skip database triggers for performance'),
      bulkMode: z
        .boolean()
        .optional()
        .describe('Use bulk operations when possible'),
      timeout: z
        .number()
        .max(60000)
        .optional()
        .default(30000)
        .describe('Operation timeout'),
    })
    .optional()
    .describe('Performance optimization options'),

  // Response control
  response: z
    .object({
      format: z
        .enum(['full', 'summary', 'minimal', 'id-only'])
        .optional()
        .default('full'),
      includeAffectedCount: z
        .boolean()
        .optional()
        .default(true)
        .describe('Include count of affected records'),
      includeValidationErrors: z
        .boolean()
        .optional()
        .default(true)
        .describe('Include validation error details'),
    })
    .optional()
    .describe('Response formatting options'),
});

export type UniversalMutationInput = z.infer<typeof UniversalMutationSchema>;

/**
 * Example Usage:
 *
 * // Create a new task with description
 * {
 *   operation: "create",
 *   entity: "task",
 *   data: {
 *     id: "TSK-005",
 *     name: "New Feature",
 *     status: "not-started",
 *     priority: "High",
 *     taskDescription: {
 *       create: {
 *         description: "Implement new feature...",
 *         businessRequirements: "...",
 *         technicalRequirements: "..."
 *       }
 *     }
 *   },
 *   include: { taskDescription: true }
 * }
 *
 * // Update task status
 * {
 *   operation: "update",
 *   entity: "task",
 *   where: { id: "TSK-001" },
 *   data: {
 *     status: "completed",
 *     completedAt: "2024-01-15T10:00:00Z"
 *   }
 * }
 *
 * // Batch create subtasks
 * {
 *   operation: "createMany",
 *   entity: "subtask",
 *   data: [
 *     { name: "Subtask 1", implementationPlanId: 1, sequenceNumber: 1 },
 *     { name: "Subtask 2", implementationPlanId: 1, sequenceNumber: 2 }
 *   ]
 * }
 *
 * // Transaction example
 * {
 *   operation: "update",
 *   entity: "task",
 *   where: { id: "TSK-001" },
 *   data: { status: "completed" },
 *   transaction: { id: "completion-tx-001" },
 *   audit: {
 *     userId: "architect",
 *     reason: "Task completed successfully"
 *   }
 * }
 */
