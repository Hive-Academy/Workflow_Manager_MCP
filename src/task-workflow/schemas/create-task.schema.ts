import { z } from 'zod';

export const CreateTaskSchema = z.object({
  taskId: z.string().describe('The unique ID for the new task (e.g., TSK-001)'),
  taskName: z
    .string()
    .describe(
      'The descriptive name of the new task (e.g., Implement Feature X)',
    ),
  description: z
    .string()
    .optional()
    .describe(
      'A more detailed description of what the task entails (to be used by Boomerang for TaskDescription)',
    ),
});
