import { z } from 'zod';
import { CreateSubtaskInputSchema, SubtaskSchema } from './subtask.schema';
import { TaskStatusSchema } from 'src/task-workflow/types/token-refs.schema';

// ✅ FIXED: Batch schema aligned with database storage approach
// Note: Batches are logical groupings stored via batchId/batchTitle fields in Subtask table
export const BatchSchema = z.object({
  id: z.string().describe('Unique identifier for the batch (e.g., B001)'),
  title: z.string().describe('A concise title or focus area for the batch'),
  description: z
    .string()
    .optional()
    .describe('A brief description of the overall goal of this batch'),
  subtasks: z
    .array(SubtaskSchema)
    .describe('An array of subtasks included in this batch'),
  status: TaskStatusSchema.default('not-started').describe(
    'Overall status of the batch derived from subtask statuses',
  ),
  dependsOn: z
    .array(z.string())
    .optional()
    .describe('An array of batch IDs that this batch depends on'),
});

export type Batch = z.infer<typeof BatchSchema>;

// ✅ FIXED: Input schema for creating batches with subtasks
export const CreateBatchInputSchema = z.object({
  id: z.string().describe('Unique identifier for the batch'),
  title: z.string().describe('Title for the batch'),
  description: z.string().optional().describe('Description of the batch goals'),
  dependsOn: z
    .array(z.string())
    .optional()
    .describe('Dependencies on other batches'),
  subtasks: z
    .array(
      CreateSubtaskInputSchema.omit({
        taskId: true,
        planId: true,
        batchId: true,
        batchTitle: true,
      }),
    )
    .describe('Subtasks to be created in this batch'),
});

export type CreateBatchInput = z.infer<typeof CreateBatchInputSchema>;

// ✅ FIXED: Response schema for batch queries
export const BatchResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  subtaskCount: z.number().int().describe('Total number of subtasks in batch'),
  completedSubtasks: z.number().int().describe('Number of completed subtasks'),
  status: TaskStatusSchema.describe(
    'Derived status based on subtask completion',
  ),
  dependsOn: z.array(z.string()).optional(),
  subtasks: z.array(SubtaskSchema).describe('All subtasks in this batch'),
});

export type BatchResponse = z.infer<typeof BatchResponseSchema>;
