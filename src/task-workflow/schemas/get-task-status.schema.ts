import { z } from 'zod';

export const GetTaskStatusSchema = z.object({
  taskId: z.string().describe('The ID of the task to get status for.'),
  taskName: z
    .string()
    .optional()
    .describe(
      'The name of the task (optional, used for folder structure if ID is not full path)',
    ),
});
