import { z } from 'zod';

export const CompleteTaskSchema = z.object({
  taskId: z.string().describe('The ID of the task to complete.'),
  mode: z.string().describe('The mode completing the task.'),
  status: z
    .enum(['completed', 'rejected'])
    .describe('Whether the task was completed successfully or rejected.'),
  notes: z
    .string()
    .optional()
    .describe('Additional notes about the completion.'),
  taskName: z
    .string()
    .optional()
    .describe('The name of the task.'),
}); 