import { z } from 'zod';
import { BatchResponseSchema, CreateBatchInputSchema } from './batch.schema';
import { SubtaskSchema } from './subtask.schema';
import { TaskStatusSchema } from 'src/task-workflow/types/token-refs.schema';

// ✅ FIXED: Database representation schema (what comes from Prisma)
export const ImplementationPlanDatabaseSchema = z.object({
  id: z.number().int().describe('Database auto-increment ID from Prisma'),
  taskId: z
    .string()
    .describe('The ID of the task this implementation plan belongs to'),
  overview: z.string().describe('Overview of the plan'),
  approach: z.string().describe('Approach details'),
  technicalDecisions: z.string().describe('Technical decisions made'),
  filesToModify: z
    .any()
    .describe('JSON array of files to modify (stored as Json in DB)'),
  createdAt: z.date().describe('Creation timestamp'),
  updatedAt: z.date().describe('Last update timestamp'),
  createdBy: z.string().describe('User/role who created the plan'),

  // Relations (from Prisma)
  subtasks: z
    .array(SubtaskSchema)
    .optional()
    .describe('Related subtasks from database'),
});

export type ImplementationPlanDatabase = z.infer<
  typeof ImplementationPlanDatabaseSchema
>;

// ✅ FIXED: Input schema for creating implementation plans
export const CreateImplementationPlanInputSchema = z.object({
  taskId: z
    .string()
    .describe('The ID of the task this implementation plan belongs to'),
  overview: z.string().describe('Overview of the plan'),
  approach: z.string().describe('Approach details'),
  technicalDecisions: z.string().describe('Technical decisions made'),
  filesToModify: z
    .array(z.string())
    .optional()
    .describe('List of files expected to be modified'),
  createdBy: z.string().describe('User/role creating the plan'),
  batches: z
    .array(CreateBatchInputSchema)
    .optional()
    .describe('Initial batches for the plan'),
});

export type CreateImplementationPlanInput = z.infer<
  typeof CreateImplementationPlanInputSchema
>;

// ✅ FIXED: Response schema for implementation plans
export const ImplementationPlanResponseSchema = z.object({
  id: z.number().int().describe('Database ID'),
  taskId: z
    .string()
    .describe('The ID of the task this implementation plan belongs to'),
  overview: z.string(),
  approach: z.string(),
  technicalDecisions: z.string(),
  filesToModify: z.any().describe('JSON array of files to modify'),
  createdAt: z.date().describe('Creation timestamp'),
  updatedAt: z.date().describe('Last update timestamp'),
  createdBy: z.string().describe('User/role who created the plan'),

  // Computed fields
  status: TaskStatusSchema.describe('Overall status derived from subtasks'),
  totalSubtasks: z.number().int().describe('Total number of subtasks'),
  completedSubtasks: z.number().int().describe('Number of completed subtasks'),

  // Related data
  subtasks: z.array(SubtaskSchema).describe('All subtasks in this plan'),
  batches: z
    .array(BatchResponseSchema)
    .optional()
    .describe('Organized batches of subtasks'),
});

export type ImplementationPlanResponse = z.infer<
  typeof ImplementationPlanResponseSchema
>;

// ✅ FIXED: Update schema for implementation plans
export const UpdateImplementationPlanInputSchema = z
  .object({
    overview: z.string().optional(),
    approach: z.string().optional(),
    technicalDecisions: z.string().optional(),
    filesToModify: z.array(z.string()).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field to update must be provided.',
  });

export type UpdateImplementationPlanInput = z.infer<
  typeof UpdateImplementationPlanInputSchema
>;

// ✅ FIXED: Get schema for retrieving implementation plans
export const GetImplementationPlanInputSchema = z
  .object({
    planId: z.number().int().optional().describe('Database ID of the plan'),
    taskId: z.string().optional().describe('Task ID to find plans for'),
  })
  .refine((data) => data.planId || data.taskId, {
    message: 'Either planId or taskId must be provided.',
  });

export type GetImplementationPlanInput = z.infer<
  typeof GetImplementationPlanInputSchema
>;
