import { z } from 'zod';

export const WorkflowMapSchema = z.object({
  taskId: z.string().optional().describe('Optional Task ID to highlight its current mode in the map'),
});

export type WorkflowMapParams = z.infer<typeof WorkflowMapSchema>;
