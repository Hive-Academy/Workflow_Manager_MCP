import { z } from 'zod';

export const ShorthandCommandSchema = z.object({
  command: z
    .string()
    .describe(
      'Shorthand command (e.g., "note(CR: Review started)" or "status(INP, AR: Planning started)").',
    ),
  taskId: z.string().describe('The ID of the task to apply the command to.'),
});
