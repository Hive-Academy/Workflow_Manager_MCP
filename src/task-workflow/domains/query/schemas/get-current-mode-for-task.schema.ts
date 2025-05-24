import { z } from 'zod';

// ✅ FIXED: Get current mode schema aligned with Task.currentMode field
export const GetCurrentModeForTaskSchema = z.object({
  taskId: z.string().describe('The ID of the task to check current mode for'),
});

export type GetCurrentModeForTaskParams = z.infer<
  typeof GetCurrentModeForTaskSchema
>;

// ✅ FIXED: Response schema for current mode query
export const CurrentModeResponseSchema = z.object({
  taskId: z.string(),
  currentMode: z
    .string()
    .nullable()
    .describe('Current mode from Task.currentMode field'),
  status: z.string().describe('Current task status'),

  // Mode context
  modeEnteredAt: z
    .date()
    .optional()
    .describe('When current mode was entered (from WorkflowTransition)'),
  modeDuration: z
    .number()
    .optional()
    .describe('Time in current mode (minutes)'),

  // Workflow info
  previousMode: z.string().optional().describe('Previous mode before current'),
  expectedNextModes: z
    .array(z.string())
    .optional()
    .describe('Possible next modes in workflow'),
  modeTransitionHistory: z
    .array(
      z.object({
        fromMode: z.string(),
        toMode: z.string(),
        transitionTimestamp: z.date(),
      }),
    )
    .optional()
    .describe('Recent mode transitions'),

  // Current mode status
  isValidMode: z
    .boolean()
    .describe('Whether current mode is valid for task status'),
  modeWarnings: z
    .array(z.string())
    .optional()
    .describe('Any warnings about current mode'),
});

export type CurrentModeResponse = z.infer<typeof CurrentModeResponseSchema>;
