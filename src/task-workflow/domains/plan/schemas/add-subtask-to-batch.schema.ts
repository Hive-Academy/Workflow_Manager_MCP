import { z } from 'zod';
import { CreateSubtaskInputSchema } from './subtask.schema';

// ✅ FIXED: Schema aligned with database subtask structure
export const AddSubtaskToBatchSchema = z.object({
  taskId: z.string().describe('The ID of the parent task'),
  planId: z.number().int().describe('The ID of the implementation plan'),
  batchId: z.string().describe('The ID of the batch to add the subtask to'),
  batchTitle: z.string().describe('The title of the batch'),
  subtask: CreateSubtaskInputSchema.omit({
    taskId: true,
    planId: true,
    batchId: true,
    batchTitle: true,
  }).describe('The details of the subtask to create'),
});

export type AddSubtaskToBatchParams = z.infer<typeof AddSubtaskToBatchSchema>;

// ✅ FIXED: Simplified subtask creation within batch context
export const BatchSubtaskInputSchema = z.object({
  name: z.string().describe('Name/title of the subtask'),
  description: z.string().describe('Detailed description of the subtask'),
  sequenceNumber: z.number().int().describe('Sequence number within the batch'),
  assignedTo: z.string().optional().describe('Role assigned to this subtask'),
  estimatedDuration: z.string().optional().describe('Estimated duration'),
  status: z
    .string()
    .default('NS')
    .describe('Initial status (defaults to Not Started)'),
});

export type BatchSubtaskInput = z.infer<typeof BatchSubtaskInputSchema>;
