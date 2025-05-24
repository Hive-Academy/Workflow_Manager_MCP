import { z } from 'zod';
import { WorkflowRoleSchema } from 'src/task-workflow/types/token-refs.schema';

// ✅ FIXED: Role transition schema aligned with WorkflowTransition model
export const RoleTransitionSchema = z.object({
  taskId: z.string().describe('The ID of the task being transitioned'),
  fromRole: WorkflowRoleSchema.describe('The role transitioning from'),
  toRole: WorkflowRoleSchema.describe('The role transitioning to'),
  summary: z
    .string()
    .optional()
    .describe('Summary of work completed by the fromRole'),
  reason: z.string().optional().describe('Reason for the transition'),
  taskName: z
    .string()
    .optional()
    .describe('Optional task name for verification'),
});

export type RoleTransitionParams = z.infer<typeof RoleTransitionSchema>;

// ✅ FIXED: Response schema matching WorkflowTransition database structure
export const RoleTransitionResponseSchema = z.object({
  transitionId: z
    .number()
    .int()
    .describe('Database ID of the workflow transition record'),
  taskId: z.string(),
  fromMode: z.string(),
  toMode: z.string(),
  transitionTimestamp: z.date(),
  reason: z.string().nullable(),

  // Task state updates
  taskUpdated: z.boolean().describe('Whether task currentMode was updated'),
  previousMode: z.string().nullable(),
  newMode: z.string(),

  // Transition analysis
  transitionValid: z
    .boolean()
    .describe('Whether the transition follows valid workflow patterns'),
  transitionWarnings: z
    .array(z.string())
    .optional()
    .describe('Any warnings about the transition'),
  estimatedDuration: z
    .number()
    .optional()
    .describe('Estimated time for this workflow step (minutes)'),
});

export type RoleTransitionResponse = z.infer<
  typeof RoleTransitionResponseSchema
>;
