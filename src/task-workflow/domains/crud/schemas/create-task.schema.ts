import { z } from 'zod';

export const CreateTaskSchema = z.object({
  taskId: z.string().describe('The unique ID for the new task (e.g., TSK-001)'),
  taskName: z
    .string()
    .describe(
      'The descriptive name of the new task (e.g., Implement Feature X)',
    ),
  description: z
    .string()
    .optional()
    .describe(
      'A more detailed description of what the task entails (core description for TaskDescription)',
    ),
  businessRequirements: z
    .string()
    .optional()
    .describe(
      'Detailed business requirements, objectives, and context for the task',
    ),
  technicalRequirements: z
    .string()
    .optional()
    .describe(
      'Specific technical requirements, constraints, or considerations',
    ),
  acceptanceCriteria: z
    .array(z.string().min(1, 'Acceptance criterion cannot be empty.'))
    .optional()
    .describe(
      'List of acceptance criteria that define when the task is considered complete',
    ),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
