import { z } from 'zod';

// Schema for individual Acceptance Criterion
const AcceptanceCriterionSchema = z.object({
  criterion: z
    .string()
    .min(1)
    .describe('A single acceptance criterion statement.'),
  // completed: z.boolean().optional().default(false).describe('Whether this criterion is met.'), // Future state tracking?
});

export const UpdateTaskDescriptionSchema = z.object({
  taskId: z
    .string()
    .describe('The ID of the task whose description is being updated.'),
  description: z
    .string()
    .optional()
    .describe('The main narrative description of the task.'),
  businessRequirements: z
    .string()
    .optional()
    .describe('Business requirements or goals.'),
  technicalRequirements: z
    .string()
    .optional()
    .describe('Technical requirements or constraints.'),
  acceptanceCriteria: z
    .array(AcceptanceCriterionSchema)
    .optional()
    .describe('List of acceptance criteria.'),
});
