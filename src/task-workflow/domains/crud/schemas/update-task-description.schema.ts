import { z } from 'zod';

export const UpdateTaskDescriptionSchema = z
  .object({
    taskId: z.string().describe('The ID of the task to update.'),
    description: z
      .string()
      .min(1, 'Description cannot be empty.')
      .optional()
      .describe('The new core description of the task.'),
    businessRequirements: z
      .string()
      .optional()
      .describe(
        'The new detailed business requirements, objectives, and context.',
      ),
    technicalRequirements: z
      .string()
      .optional()
      .describe(
        'The new specific technical requirements, constraints, or considerations.',
      ),
    acceptanceCriteria: z
      .array(z.string().min(1, 'Acceptance criterion cannot be empty.'))
      .min(1, 'At least one acceptance criterion is required if provided.')
      .optional()
      .describe('The new list of acceptance criteria for the task.'),
  })
  .refine(
    (data) =>
      data.description !== undefined ||
      data.businessRequirements !== undefined ||
      data.technicalRequirements !== undefined ||
      data.acceptanceCriteria !== undefined,
    {
      message:
        'At least one field (description, businessRequirements, technicalRequirements, or acceptanceCriteria) must be provided for an update.',
    },
  )
  .describe(
    'Schema for updating various descriptive fields of a task. At least one modifiable field must be provided.',
  );

export type UpdateTaskDescriptionInput = z.infer<
  typeof UpdateTaskDescriptionSchema
>;
