import { z } from 'zod';

export const GetTaskContextSchema = z.object({
  taskId: z
    .string()
    .describe('The ID of the task to get context for (e.g., TSK-001)'),
  taskName: z
    .string()
    .optional()
    .describe(
      'The name of the task (optional, used to help locate if taskId is ambiguous or for confirmation)',
    ),
});
