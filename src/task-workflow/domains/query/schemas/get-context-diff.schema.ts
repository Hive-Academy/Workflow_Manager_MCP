import { z } from 'zod';
import { DocumentRefSchema } from 'src/task-workflow/types/token-refs.schema'; // Import for sliceType

export const GetContextDiffSchema = z.object({
  taskId: z
    .string()
    .describe('The ID of the task to get context difference for.'),
  lastContextHash: z
    .string()
    .describe('Hash of the last context seen by the client.'),
  sliceType: DocumentRefSchema.optional().describe(
    'Optional type of context slice to fetch (e.g., STATUS, AC, SUBTASKS). Uses DocumentRefSchema for consistency though not all refs are slices.',
  ),
});
