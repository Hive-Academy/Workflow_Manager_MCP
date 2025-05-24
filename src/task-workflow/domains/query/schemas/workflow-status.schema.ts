import { z } from 'zod';

// ✅ FIXED: Workflow status schema aligned with WorkflowTransition model
export const WorkflowStatusSchema = z.object({
  taskId: z.string().describe('The ID of the task to get workflow status for'),
  includeHistory: z
    .boolean()
    .optional()
    .default(true)
    .describe('Whether to include transition history'),
  maxTransitions: z
    .number()
    .int()
    .min(1)
    .max(50)
    .optional()
    .default(20)
    .describe('Maximum number of transitions to return'),
});

export type WorkflowStatusParams = z.infer<typeof WorkflowStatusSchema>;

// ✅ FIXED: Response schema matching WorkflowTransition database structure
export const WorkflowStatusResponseSchema = z.object({
  taskId: z.string(),
  currentMode: z.string().nullable(),
  status: z.string(),

  // Current workflow state
  currentWorkflowStep: z
    .object({
      mode: z.string(),
      enteredAt: z.date().optional(),
      duration: z
        .number()
        .optional()
        .describe('Time in current step (minutes)'),
    })
    .optional(),

  // Transition history
  workflowTransitions: z
    .array(
      z.object({
        id: z.number().int(),
        fromMode: z.string(),
        toMode: z.string(),
        transitionTimestamp: z.date(),
        reason: z.string().nullable(),
      }),
    )
    .optional(),

  // Workflow metrics
  totalTransitions: z.number().int(),
  averageStepDuration: z
    .number()
    .optional()
    .describe('Average time per workflow step (minutes)'),
  longestStepDuration: z
    .number()
    .optional()
    .describe('Longest time in any step (minutes)'),
  workflowEfficiency: z
    .number()
    .optional()
    .describe('Workflow efficiency score (0-1)'),

  // Workflow path analysis
  workflowPath: z
    .array(z.string())
    .describe('Sequence of modes the task has been through'),
  expectedNextSteps: z
    .array(z.string())
    .optional()
    .describe('Possible next workflow steps'),
  workflowAnomalies: z
    .array(z.string())
    .optional()
    .describe('Detected workflow anomalies or issues'),
});

export type WorkflowStatusResponse = z.infer<
  typeof WorkflowStatusResponseSchema
>;
