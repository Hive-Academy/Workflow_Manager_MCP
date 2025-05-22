import { z } from 'zod';
import {
  StatusCodeSchema,
  RoleCodeSchema,
  DocumentRefSchema,
} from 'src/task-workflow/types/token-refs.schema';

export const BatchInfoSchema = z
  .object({
    id: z.string().describe('ID of the batch this subtask belongs to.'),
    title: z.string().describe('Title of the batch this subtask belongs to.'),
  })
  .optional()
  .describe(
    'Information about the batch this subtask is part of (logical grouping).',
  );

export const SubtaskSchema = z.object({
  id: z.string().describe('Unique identifier for the subtask (e.g., ST-001).'),
  title: z.string().describe('A concise title for the subtask.'),
  description: z
    .string()
    .describe('A detailed description of what the subtask entails.'),
  status: StatusCodeSchema.default('NS').describe(
    'Current status of the subtask.',
  ),
  assignedTo: RoleCodeSchema.optional().describe(
    'The role code of the developer assigned to this subtask (typically 👨‍💻SD).',
  ),
  dependencies: z
    .array(z.string())
    .optional()
    .describe('An array of subtask IDs that this subtask depends on.'),
  acceptanceCriteria: z
    .array(z.string())
    .optional()
    .describe('A list of acceptance criteria specific to this subtask.'),
  estimatedHours: z
    .number()
    .optional()
    .describe('Estimated hours to complete the subtask.'),
  actualHours: z
    .number()
    .optional()
    .describe('Actual hours spent on the subtask.'),
  relatedDocs: z
    .array(DocumentRefSchema)
    .optional()
    .describe(
      'References to related documents (e.g., specific sections of IP or TD).',
    ),
  notes: z
    .array(z.string())
    .optional()
    .describe('Additional notes or comments related to the subtask.'),
  _batchInfo: BatchInfoSchema,
  sequenceNumber: z
    .number()
    .optional()
    .describe('Sequence number for ordering within a plan/batch.'),
});

export type Subtask = z.infer<typeof SubtaskSchema>;
