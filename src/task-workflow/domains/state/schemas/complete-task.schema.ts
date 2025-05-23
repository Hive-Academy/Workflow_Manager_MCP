import { z } from 'zod';
import { RoleCodeSchema } from 'src/task-workflow/types/token-refs.schema';

// ✅ FIXED: Complete task schema for multi-model operations
export const CompleteTaskSchema = z.object({
  taskId: z.string().describe('The ID of the task to complete'),
  mode: z.string().describe('The mode completing the task'),
  status: z
    .enum(['completed', 'rejected'])
    .describe('Whether the task was completed successfully or rejected'),
  notes: z
    .string()
    .optional()
    .describe('Additional notes about the completion'),
  completionData: z
    .object({
      summary: z.string().describe('Summary of what was accomplished'),
      filesModified: z
        .array(z.string())
        .optional()
        .describe('List of files that were modified'),
      acceptanceCriteriaVerification: z
        .any()
        .optional()
        .describe('Verification of acceptance criteria'),
    })
    .optional()
    .describe('Completion report data if task was completed successfully'),
  rejectionReason: z
    .string()
    .optional()
    .describe('Reason for rejection if task was rejected'),
});

export type CompleteTaskParams = z.infer<typeof CompleteTaskSchema>;

// ✅ FIXED: Task completion response
export const TaskCompletionResponseSchema = z.object({
  taskId: z.string(),
  previousStatus: z.string(),
  newStatus: z.string(),
  completedBy: z.string(),
  completedAt: z.date(),

  // Related updates
  completionReportCreated: z
    .boolean()
    .describe('Whether a completion report was created'),
  delegationRecordUpdated: z
    .boolean()
    .describe('Whether delegation record was updated'),
  workflowTransitionRecorded: z
    .boolean()
    .describe('Whether workflow transition was recorded'),

  // Summary data
  totalDuration: z
    .number()
    .optional()
    .describe('Total time from creation to completion (hours)'),
  totalTransitions: z
    .number()
    .int()
    .describe('Total number of workflow transitions'),
  finalRedelegationCount: z.number().int().describe('Final redelegation count'),
});

export type TaskCompletionResponse = z.infer<
  typeof TaskCompletionResponseSchema
>;
