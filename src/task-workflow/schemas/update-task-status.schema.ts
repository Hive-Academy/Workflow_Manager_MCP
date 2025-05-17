import { z } from 'zod';

export const UpdateTaskStatusSchema = z.object({
  taskId: z.string().describe('The ID of the task to update.'),
  status: z.string().describe('The new status for the task.'), // Consider z.enum([...]) if statuses are fixed
  currentMode: z
    .string()
    .optional()
    .describe('The new current mode/owner of the task.'),
  notes: z
    .string()
    .optional()
    .describe('Additional notes about the status update.'),
});
