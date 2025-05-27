import { z } from 'zod';

/**
 * Universal Mutation Schema - Simplified for Gemini compatibility
 */

// Mutation Operation Types
export const MutationOperationSchema = z
  .enum([
    'create',
    'update',
    'upsert',
    'delete',
    'createMany',
    'updateMany',
    'deleteMany',
  ])
  .describe('Type of mutation operation');

// Entity Types
export const EntityTypeSchema = z
  .enum([
    'task',
    'taskDescription',
    'implementationPlan',
    'subtask',
    'researchReport',
    'codeReviewReport',
    'completionReport',
    'comment',
    'delegation',
    'workflowTransition',
    'codebaseAnalysis',
  ])
  .describe('Entity type to modify (task, subtask, etc.)');

// Data Payload - Simplified
export const DataPayloadSchema = z
  .record(z.any())
  .describe('Data for create/update operations');

// Where Condition - Simplified
export const WhereConditionSchema = z
  .record(z.any())
  .describe('Filter conditions for update/delete operations');

// Batch Operations - Simplified
export const BatchOperationSchema = z.object({
  operations: z
    .array(
      z.object({
        operation: MutationOperationSchema,
        entity: EntityTypeSchema,
        data: DataPayloadSchema.optional(),
        where: WhereConditionSchema.optional(),
      }),
    )
    .describe('Operations to execute in batch'),
  continueOnError: z
    .boolean()
    .default(false)
    .describe('Continue if operations fail'),
});

// Transaction - Simplified
export const TransactionSchema = z.object({
  id: z.string().optional().describe('Transaction ID'),
  timeout: z
    .number()
    .optional()
    .describe('Transaction timeout in milliseconds'),
  isolationLevel: z
    .enum([
      'ReadUncommitted',
      'ReadCommitted',
      'RepeatableRead',
      'Serializable',
    ])
    .optional()
    .describe('Transaction isolation level'),
});

// Response Format - Simplified
export const ResponseFormatSchema = z.object({
  format: z
    .enum(['full', 'summary', 'minimal', 'id-only'])
    .default('full')
    .describe('Response format level'),
  includeAffectedCount: z
    .boolean()
    .default(true)
    .describe('Include count of affected records'),
  includeValidationErrors: z
    .boolean()
    .default(true)
    .describe('Include validation error details'),
});

// Validation Schema - Added
export const ValidationSchema = z
  .object({
    businessRules: z
      .boolean()
      .default(true)
      .describe('Apply business rule validation'),
    referentialIntegrity: z
      .boolean()
      .default(true)
      .describe('Check referential integrity'),
    customValidators: z
      .array(z.string())
      .optional()
      .describe('Custom validator names to apply'),
  })
  .describe('Validation options');

// Performance Schema - Added
export const PerformanceSchema = z
  .object({
    timeout: z.number().max(60000).default(30000).describe('Operation timeout'),
    bulkMode: z
      .boolean()
      .optional()
      .describe('Use bulk operations when possible'),
    skipTriggers: z
      .boolean()
      .optional()
      .describe('Skip database triggers for performance'),
  })
  .describe('Performance optimization options');

// Audit Schema - Added
export const AuditSchema = z
  .object({
    userId: z.string().optional().describe('User performing the operation'),
    reason: z.string().optional().describe('Reason for the change'),
    metadata: z
      .record(z.any())
      .optional()
      .describe('Additional audit metadata'),
  })
  .describe('Audit trail information');

// Main Universal Mutation Schema - Updated with validate and audit
export const UniversalMutationSchema = z
  .object({
    operation: MutationOperationSchema.describe(
      'The type of mutation operation',
    ),
    entity: EntityTypeSchema.describe('The entity type to mutate'),
    data: DataPayloadSchema.optional().describe(
      'Data for create/update operations',
    ),
    where: WhereConditionSchema.optional().describe(
      'Conditions for update/delete operations',
    ),
    include: z
      .record(z.any())
      .optional()
      .describe('Related entities to include in response'),
    select: z
      .record(z.any())
      .optional()
      .describe('Fields to select in response'),
    batch: BatchOperationSchema.optional(),
    transaction: TransactionSchema.optional(),
    response: ResponseFormatSchema.optional(),
    validate: ValidationSchema.optional().describe('Validation options'),
    performance: PerformanceSchema.optional().describe(
      'Performance optimization options',
    ),
    audit: AuditSchema.optional().describe('Audit trail information'),
  })
  .describe('Universal Mutation tool parameters');

export type UniversalMutationInput = z.infer<typeof UniversalMutationSchema>;
