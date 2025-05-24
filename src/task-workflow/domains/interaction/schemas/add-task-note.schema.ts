import { z } from 'zod';

// ✅ FIXED: Input schema for adding task notes (maps to Comment model)
export const AddTaskNoteSchema = z.object({
  taskId: z.string().describe('The ID of the task to add a note to'),
  note: z
    .string()
    .min(1)
    .describe('The content of the note to add (maps to content field in DB)'),
  mode: z.string().min(1).describe('The mode/role adding the note'),
  subtaskId: z
    .number()
    .int()
    .positive()
    .optional()
    .describe(
      'Optional database ID of the subtask this note pertains to (NOT display ID like ST-001)',
    ),
});

export type AddTaskNoteParams = z.infer<typeof AddTaskNoteSchema>;

// ✅ FIXED: Response schema matching Comment database structure
export const TaskNoteResponseSchema = z.object({
  id: z.number().int().describe('Database auto-increment ID'),
  taskId: z.string(),
  subtaskId: z.number().int().optional(),
  mode: z.string(),
  content: z.string().describe('The note content'),
  createdAt: z.date().describe('When the note was created'),
});

export type TaskNoteResponse = z.infer<typeof TaskNoteResponseSchema>;

// ✅ FIXED: Get schema for retrieving task notes
export const GetTaskNotesSchema = z
  .object({
    taskId: z.string().optional(),
    subtaskId: z.number().int().optional(),
    mode: z.string().optional(),
  })
  .refine((data) => data.taskId || data.subtaskId, {
    message: 'Either taskId or subtaskId must be provided.',
  });

export type GetTaskNotesParams = z.infer<typeof GetTaskNotesSchema>;
