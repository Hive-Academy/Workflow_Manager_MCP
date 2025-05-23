import { z } from 'zod';
import { StatusCodeSchema } from 'src/task-workflow/types/token-refs.schema'; // Correctly import StatusCodeSchema

export const UpdateSubtaskStatusSchema = z.object({
  taskId: z.string().describe('The ID of the parent task.'),
  subtaskId: z
    .number()
    .int()
    .positive()
    .describe(
      'The database ID of the subtask to update (from Subtask.id field).',
    ),
  newStatus: StatusCodeSchema.describe('The new status for the subtask.'), // Use StatusCodeSchema
  notes: z
    .string()
    .optional()
    .describe('Optional notes about the status update.'),
  mode: z.string().optional().describe('The mode/role making this update.'), // For logging/attribution
});

export type UpdateSubtaskStatusParams = z.infer<
  typeof UpdateSubtaskStatusSchema
>;
