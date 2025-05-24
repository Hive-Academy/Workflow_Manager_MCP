import { z } from 'zod';

export const DeleteTaskSchema = z.object({
  taskId: z.string().describe('The ID of the task to delete (e.g., TSK-001)'),
});
