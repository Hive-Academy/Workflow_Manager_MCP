import { z } from 'zod';

// ✅ FIXED: Schema aligned with TaskDescription database model
export const UpdateTaskDescriptionSchema = z
  .object({
    taskId: z.string().describe('The ID of the task to update'),
    description: z.string().min(1).optional().describe('Updated description'),
    businessRequirements: z
      .string()
      .optional()
      .describe('Updated business requirements'),
    technicalRequirements: z
      .string()
      .optional()
      .describe('Updated technical requirements'),
    acceptanceCriteria: z
      .any()
      .optional()
      .describe('Updated acceptance criteria (JSON array)'),
  })
  .refine(
    (data) => Object.keys(data).filter((k) => k !== 'taskId').length > 0,
    { message: 'At least one field to update must be provided.' },
  );

export type UpdateTaskDescriptionParams = z.infer<
  typeof UpdateTaskDescriptionSchema
>;

// ✅ FIXED: Response schema matching TaskDescription database structure
export const TaskDescriptionResponseSchema = z.object({
  taskId: z.string().describe('Primary key matching task ID'),
  description: z.string(),
  businessRequirements: z.string(),
  technicalRequirements: z.string(),
  acceptanceCriteria: z.any().describe('JSON array of acceptance criteria'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TaskDescriptionResponse = z.infer<
  typeof TaskDescriptionResponseSchema
>;
