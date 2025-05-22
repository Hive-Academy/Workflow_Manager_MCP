import { z } from 'zod';
import { SubtaskSchema } from './subtask.schema';
import { StatusCodeSchema } from 'src/task-workflow/types/token-refs.schema';

export const BatchSchema = z.object({
  id: z.string().describe('Unique identifier for the batch (e.g., B001).'),
  title: z.string().describe('A concise title or focus area for the batch.'),
  description: z
    .string()
    .optional()
    .describe('A brief description of the overall goal of this batch.'),
  subtasks: z
    .array(SubtaskSchema)
    .describe('An array of subtasks included in this batch.'),
  status: StatusCodeSchema.default('NS').describe(
    'Overall status of the batch. Can be derived from subtask statuses.',
  ),
  dependsOn: z
    .array(z.string())
    .optional()
    .describe('An array of batch IDs that this batch depends on.'),
});

export type Batch = z.infer<typeof BatchSchema>;
