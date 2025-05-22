import { z } from 'zod';
export const WorkflowStatusSchema = z.object({
  taskId: z.string().describe('The ID of the task to get workflow status for'),
});
export type WorkflowStatusParams = z.infer<typeof WorkflowStatusSchema>;
