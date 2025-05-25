import { z } from 'zod';
import { TaskStatusSchema } from 'src/task-workflow/types/token-refs.schema';

// Individual subtask update schema
const SubtaskUpdateSchema = z.object({
  subtaskId: z
    .number()
    .int()
    .positive()
    .describe(
      'The database ID of the subtask to update (from Subtask.id field). NOT the display ID like ST-001. Use the numeric database ID shown in tool responses as "DB ID: X".',
    ),
  newStatus: TaskStatusSchema.describe('The new status for the subtask.'),
  notes: z
    .string()
    .optional()
    .describe('Optional notes about the status update.'),
});

export const UpdateSubtaskStatusSchema = z
  .object({
    taskId: z.string().describe('The ID of the parent task.'),
    // Support either single subtask update (backward compatible) or batch updates
    subtaskId: z
      .number()
      .int()
      .positive()
      .optional()
      .describe(
        'The database ID of the subtask to update (from Subtask.id field). NOT the display ID like ST-001. Use the numeric database ID shown in tool responses as "DB ID: X". Use this for single subtask updates.',
      ),
    newStatus: TaskStatusSchema.optional().describe(
      'The new status for the subtask (when updating single subtask).',
    ),
    notes: z
      .string()
      .optional()
      .describe(
        'Optional notes about the status update (when updating single subtask).',
      ),
    // Batch update support
    subtasks: z
      .array(SubtaskUpdateSchema)
      .optional()
      .describe(
        'Array of subtask updates for batch operations. Use this instead of subtaskId/newStatus for multiple updates.',
      ),
    mode: z.string().optional().describe('The mode/role making this update.'), // For logging/attribution
  })
  .refine(
    (data) => {
      // Either single subtask update OR batch update, but not both
      const hasSingleUpdate =
        data.subtaskId !== undefined && data.newStatus !== undefined;
      const hasBatchUpdate =
        data.subtasks !== undefined && data.subtasks.length > 0;
      return hasSingleUpdate !== hasBatchUpdate; // XOR: exactly one should be true
    },
    {
      message:
        'Either provide subtaskId+newStatus for single update OR subtasks array for batch update, but not both.',
    },
  );

export type UpdateSubtaskStatusParams = z.infer<
  typeof UpdateSubtaskStatusSchema
>;
