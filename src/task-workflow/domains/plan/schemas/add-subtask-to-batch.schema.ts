import { z } from 'zod';
import { SubtaskSchema, BatchInfoSchema } from './subtask.schema';

// Input schema for creating a subtask
export const SubtaskInputSchema = SubtaskSchema.pick({
  // Pick fields that are settable during input
  title: true,
  description: true,
  status: true,
  assignedTo: true,
  dependencies: true,
  acceptanceCriteria: true,
  estimatedHours: true,
  relatedDocs: true,
  notes: true,
  sequenceNumber: true, // Allow setting sequence if needed, or it can be auto-calculated
})
  .extend({
    _batchInfo: BatchInfoSchema.optional(), // Add optional _batchInfo for input context
  })
  .partial(); // Make all fields optional as not all are required for creation, or rely on defaults

export type SubtaskInput = z.infer<typeof SubtaskInputSchema>;

export const AddSubtaskToBatchSchema = z.object({
  taskId: z.string().describe('The ID of the parent task.'),
  batchId: z.string().describe('The ID of the batch to add the subtask to.'),
  // subtask field should now use the refined SubtaskInputSchema
  subtask: SubtaskInputSchema.required().describe(
    'The details of the subtask to create.',
  ),
});

export type AddSubtaskToBatchParams = z.infer<typeof AddSubtaskToBatchSchema>;
