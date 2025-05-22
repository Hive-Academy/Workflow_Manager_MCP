import { z } from 'zod';

export const AddTaskNoteSchema = z.object({
  taskId: z
    .string()
    .describe('The ID of the task to add a note to (e.g., TSK-001)'),
  note: z.string().min(1).describe('The content of the note to add.'),
  mode: z
    .string()
    .min(1)
    .describe(
      'The mode/role adding the note (e.g., "architect", "senior_developer")',
    ),
  subtaskId: z
    .number()
    .int()
    .optional()
    .describe(
      'Optional Prisma-generated numeric ID of the subtask this note pertains to.',
    ),
});
