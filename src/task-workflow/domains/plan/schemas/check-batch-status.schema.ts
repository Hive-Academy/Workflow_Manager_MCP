import { z } from 'zod';
import { TaskStatusSchema } from 'src/task-workflow/types/token-refs.schema';

// ✅ FIXED: Input schema for checking batch status
export const CheckBatchStatusSchema = z.object({
  taskId: z.string().describe('The ID of the task to which the batch belongs'),
  batchId: z.string().describe('The ID of the batch to check the status for'),
  planId: z
    .number()
    .int()
    .optional()
    .describe('Optional: The specific ID of the implementation plan to check'),
});

export type CheckBatchStatusParams = z.infer<typeof CheckBatchStatusSchema>;

// ✅ FIXED: Response schema for batch status queries
export const BatchStatusResponseSchema = z.object({
  batchId: z.string(),
  batchTitle: z.string().optional(),
  taskId: z.string(),
  planId: z.number().int(),
  status: TaskStatusSchema.describe(
    'Overall batch status derived from subtasks',
  ),
  totalSubtasks: z.number().int().describe('Total number of subtasks in batch'),
  completedSubtasks: z.number().int().describe('Number of completed subtasks'),
  inProgressSubtasks: z
    .number()
    .int()
    .describe('Number of in-progress subtasks'),
  notStartedSubtasks: z
    .number()
    .int()
    .describe('Number of not-started subtasks'),
  progressPercentage: z
    .number()
    .min(0)
    .max(100)
    .describe('Completion percentage'),
  lastUpdated: z.date().optional().describe('Last update timestamp'),
  subtaskSummary: z
    .array(
      z.object({
        id: z.number().int(),
        name: z.string(),
        status: z.string(),
        assignedTo: z.string().optional(),
      }),
    )
    .describe('Summary of all subtasks in batch'),
});

export type BatchStatusResponse = z.infer<typeof BatchStatusResponseSchema>;
