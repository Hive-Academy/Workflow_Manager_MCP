import { z } from 'zod';

// ✅ FIXED: Continue task schema for resuming task work
export const ContinueTaskSchema = z.object({
  taskId: z.string().describe('The ID of the task to continue'),
});

export type ContinueTaskParams = z.infer<typeof ContinueTaskSchema>;

// ✅ FIXED: Continue task response with current context
export const ContinueTaskResponseSchema = z.object({
  taskId: z.string(),
  taskName: z.string(),
  currentStatus: z.string(),
  currentMode: z.string().nullable(),

  // Context for continuation
  lastActivity: z
    .object({
      type: z
        .string()
        .describe('Type of last activity (delegation, status update, etc.)'),
      timestamp: z.date(),
      description: z.string(),
    })
    .optional(),

  // Work context
  pendingWork: z
    .array(
      z.object({
        type: z.string().describe('Type of pending work'),
        description: z.string(),
        priority: z.string().optional(),
      }),
    )
    .optional(),

  // Current state summary
  implementationProgress: z
    .object({
      totalSubtasks: z.number().int(),
      completedSubtasks: z.number().int(),
      inProgressSubtasks: z.number().int(),
      currentBatch: z.string().optional(),
    })
    .optional(),

  // Next steps recommendation
  recommendedActions: z
    .array(z.string())
    .optional()
    .describe('Suggested next actions'),
  blockers: z
    .array(z.string())
    .optional()
    .describe('Current blockers or issues'),

  // Workflow context
  expectedNextMode: z
    .string()
    .optional()
    .describe('Expected next workflow mode'),
  workflowStage: z
    .string()
    .optional()
    .describe('Current stage in overall workflow'),
});

export type ContinueTaskResponse = z.infer<typeof ContinueTaskResponseSchema>;
