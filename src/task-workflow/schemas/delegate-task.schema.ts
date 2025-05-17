import { z } from 'zod';

export const DelegateTaskSchema = z.object({
  taskId: z.string().describe('The ID of the task to delegate.'),
  fromMode: z.string().describe('The mode delegating the task.'),
  toMode: z.string().describe('The mode receiving the delegation.'),
  message: z
    .string()
    .optional()
    .describe('Additional delegation message or context.'),
  taskName: z
    .string()
    .optional()
    .describe(
      'The name of the task (used if taskId is new or just an ID part).',
    ),
});
