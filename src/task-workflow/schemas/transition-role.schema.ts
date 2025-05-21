import { z } from 'zod';
export const TransitionRoleSchema = z.object({
  taskId: z.string().describe('The ID of the task being transitioned'),
  taskName: z.string().optional().describe('The name of the task (optional)'),
  fromRole: z.string().describe('The role transitioning from'),
  toRole: z.string().describe('The role transitioning to'),
  summary: z
    .string()
    .optional()
    .describe('Summary of work completed by the fromRole'),
});
export type TransitionRoleParams = z.infer<typeof TransitionRoleSchema>;
