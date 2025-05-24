import { z } from 'zod';
import { WorkflowRoleSchema } from 'src/task-workflow/types/token-refs.schema';

// ✅ FIXED: Input schema for delegating tasks (maps to DelegationRecord model)
export const DelegateTaskSchema = z.object({
  taskId: z.string().describe('The ID of the task to delegate'),
  fromMode: WorkflowRoleSchema.describe('The mode delegating the task'),
  toMode: WorkflowRoleSchema.describe('The mode receiving the delegation'),
  message: z.string().min(1).describe('Delegation message or context'),
  subtaskId: z
    .number()
    .int()
    .optional()
    .describe('Optional subtask ID if delegating specific subtask'),
});

export type DelegateTaskParams = z.infer<typeof DelegateTaskSchema>;

// ✅ FIXED: Response schema matching DelegationRecord database structure
export const DelegationRecordResponseSchema = z.object({
  id: z.number().int().describe('Database auto-increment ID'),
  taskId: z.string(),
  subtaskId: z.number().int().optional(),
  fromMode: z.string(),
  toMode: z.string(),
  delegationTimestamp: z.date().describe('When delegation was made'),
  completionTimestamp: z
    .date()
    .optional()
    .describe('When delegation was completed'),
  success: z.boolean().optional().describe('Whether delegation was successful'),
  rejectionReason: z
    .string()
    .optional()
    .describe('Reason if delegation was rejected'),
  redelegationCount: z
    .number()
    .int()
    .describe('Number of times this was redelegated'),
});

export type DelegationRecordResponse = z.infer<
  typeof DelegationRecordResponseSchema
>;

// ✅ FIXED: Complete delegation schema
export const CompleteDelegationSchema = z.object({
  delegationId: z
    .number()
    .int()
    .describe('Database ID of the delegation record'),
  success: z.boolean().describe('Whether the delegation was successful'),
  rejectionReason: z
    .string()
    .optional()
    .describe('Reason for rejection if unsuccessful'),
});

export type CompleteDelegationParams = z.infer<typeof CompleteDelegationSchema>;
