import { z } from 'zod';

export const GetCurrentModeForTaskSchema = z.object({
  taskId: z
    .string()
    .describe('The ID of the task to get the current mode for.'),
});

export type GetCurrentModeForTaskParams = z.infer<
  typeof GetCurrentModeForTaskSchema
>;
