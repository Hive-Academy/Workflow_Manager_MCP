import { z } from 'zod';

export const CheckBatchStatusSchema = z.object({
  taskId: z.string().describe('The ID of the task to which the batch belongs.'),
  batchId: z.string().describe('The ID of the batch to check the status for.'),
  // planId: z.number().int().optional().describe('Optional: The specific ID of the implementation plan to check. Defaults to the latest if not provided.'),
});

export type CheckBatchStatusParams = z.infer<typeof CheckBatchStatusSchema>;
