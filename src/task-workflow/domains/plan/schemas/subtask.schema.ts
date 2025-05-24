import { z } from 'zod';
import {
  TaskStatusSchema,
  WorkflowRoleSchema,
} from 'src/task-workflow/types/token-refs.schema';

// ✅ FIXED: Core subtask schema aligned with database structure
export const SubtaskSchema = z.object({
  // Database fields - properly aligned with Prisma model
  id: z.number().int().describe('Auto-increment primary key from database'),
  taskId: z.string().describe('ID of the parent task'),
  planId: z.number().int().describe('Foreign key to ImplementationPlan'),
  name: z.string().describe('Name/title of the subtask'),
  description: z
    .string()
    .describe('A detailed description of what the subtask entails'),
  sequenceNumber: z
    .number()
    .int()
    .describe('Sequence number for ordering within a plan'),
  status: z.string().describe('Current status of the subtask'),
  assignedTo: z.string().optional().describe('Role assigned to this subtask'),
  estimatedDuration: z
    .string()
    .optional()
    .describe('Estimated duration to complete the subtask'),
  startedAt: z.date().optional().describe('Timestamp when subtask was started'),
  completedAt: z
    .date()
    .optional()
    .describe('Timestamp when subtask was completed'),
  batchId: z
    .string()
    .optional()
    .describe('ID of the batch this subtask belongs to'),
  batchTitle: z
    .string()
    .optional()
    .describe('Title of the batch this subtask belongs to'),
});

export type Subtask = z.infer<typeof SubtaskSchema>;

// ✅ FIXED: Input schema for creating subtasks
export const CreateSubtaskInputSchema = z.object({
  taskId: z.string().describe('ID of the parent task'),
  planId: z
    .number()
    .int()
    .describe('Foreign key to ImplementationPlan - REQUIRED'),
  name: z.string().describe('Name/title of the subtask'),
  description: z
    .string()
    .describe('A detailed description of what the subtask entails'),
  sequenceNumber: z.number().int().describe('Sequence number for ordering'),
  status: TaskStatusSchema.default('not-started').describe(
    'Current status of the subtask',
  ),
  assignedTo: WorkflowRoleSchema.optional().describe(
    'The role assigned to this subtask',
  ),
  estimatedDuration: z
    .string()
    .optional()
    .describe('Estimated duration (e.g., "2 hours", "1 day")'),
  batchId: z
    .string()
    .optional()
    .describe('ID of the batch this subtask belongs to'),
  batchTitle: z
    .string()
    .optional()
    .describe('Title of the batch this subtask belongs to'),
});

export type CreateSubtaskInput = z.infer<typeof CreateSubtaskInputSchema>;

// ✅ FIXED: Update schema for subtasks
export const UpdateSubtaskInputSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    sequenceNumber: z.number().int().optional(),
    status: TaskStatusSchema.optional(),
    assignedTo: WorkflowRoleSchema.optional(),
    estimatedDuration: z.string().optional(),
    startedAt: z.date().optional(),
    completedAt: z.date().optional(),
    batchId: z.string().optional(),
    batchTitle: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field to update must be provided.',
  });

export type UpdateSubtaskInput = z.infer<typeof UpdateSubtaskInputSchema>;

// ✅ FIXED: Get schema for retrieving subtasks
export const GetSubtaskInputSchema = z
  .object({
    subtaskId: z
      .number()
      .int()
      .optional()
      .describe('Database ID of the subtask'),
    taskId: z.string().optional().describe('Task ID to find subtasks for'),
    planId: z
      .number()
      .int()
      .optional()
      .describe('Plan ID to find subtasks for'),
    batchId: z.string().optional().describe('Batch ID to find subtasks for'),
  })
  .refine(
    (data) => data.subtaskId || data.taskId || data.planId || data.batchId,
    {
      message: 'At least one identifier must be provided.',
    },
  );

export type GetSubtaskInput = z.infer<typeof GetSubtaskInputSchema>;
