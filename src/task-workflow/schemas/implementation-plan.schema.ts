import { z } from 'zod';
import { BatchSchema } from './batch.schema';
import { SubtaskSchema } from './subtask.schema';
import { DocumentRefSchema, StatusCodeSchema } from './token-refs.schema';

// Represents the structure of the ImplementationPlan as it might be stored
// or retrieved, where subtasks are directly associated with the plan
// but contain _batchInfo for logical grouping.
export const ImplementationPlanStorageSchema = z.object({
  id: z
    .number()
    .optional()
    .describe('Numeric ID from the database, if applicable.'),
  taskId: z
    .string()
    .describe('The ID of the task this implementation plan belongs to.'),
  title: z
    .string()
    .optional()
    .describe('Overall title for the implementation plan.'),
  overview: z
    .string()
    .optional()
    .describe('Overview of the plan, from Prisma model.'),
  approach: z
    .string()
    .optional()
    .describe('Approach details, from Prisma model.'),
  technicalDecisions: z
    .string()
    .optional()
    .describe('Technical decisions, from Prisma model.'),
  filesToModify: z
    .array(z.string())
    .optional()
    .describe('JSON array of files to modify, from Prisma model.'),
  version: z
    .string()
    .default('1.0.0')
    .describe('Version of the implementation plan.'),
  status: StatusCodeSchema.default('NS').describe(
    'Overall status of the implementation plan.',
  ),
  subtasks: z
    .array(SubtaskSchema)
    .describe('An array of subtasks. Each subtask contains _batchInfo.'),
  generalNotes: z
    .array(z.string())
    .optional()
    .describe(
      'General notes or comments about the implementation plan as a whole.',
    ),
  linkedTd: DocumentRefSchema.optional().describe(
    'Reference to the main Task Description document (TD).',
  ),
  createdAt: z.date().optional().describe('Creation timestamp from DB.'),
  updatedAt: z.date().optional().describe('Last update timestamp from DB.'),
  createdBy: z.string().optional().describe('User/role who created the plan.'),
});

export type ImplementationPlanStorage = z.infer<
  typeof ImplementationPlanStorageSchema
>;

// Input schema for creating/updating an implementation plan using batches
export const ImplementationPlanInputSchema = z.object({
  title: z
    .string()
    .optional()
    .describe(
      'Overall title for the implementation plan, derived from the task if not provided.',
    ),
  overview: z.string().optional().describe('Overview of the plan.'),
  approach: z.string().optional().describe('Approach details.'),
  technicalDecisions: z
    .string()
    .optional()
    .describe('Technical decisions made.'),
  filesToModify: z
    .array(z.string())
    .optional()
    .describe('List of files expected to be modified.'),
  batches: z
    .array(BatchSchema)
    .describe('An array of batches that make up this implementation plan.'),
  generalNotes: z
    .array(z.string())
    .optional()
    .describe(
      'General notes or comments about the implementation plan as a whole.',
    ),
  linkedTd: DocumentRefSchema.optional().describe(
    'Reference to the main Task Description document (TD).',
  ),
  createdBy: z.string().optional().describe('User/role creating the plan.'),
});

export type ImplementationPlanInput = z.infer<
  typeof ImplementationPlanInputSchema
>;
