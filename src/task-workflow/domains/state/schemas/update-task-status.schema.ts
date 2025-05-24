import { z } from 'zod';
import {
  TaskStatusSchema,
  WorkflowRoleSchema,
} from 'src/task-workflow/types/token-refs.schema';

// ✅ ENHANCED: Update task status schema with proper preprocessing
export const UpdateTaskStatusSchema = z.object({
  taskId: z.string().describe('The ID of the task to update'),
  status: TaskStatusSchema.describe('The new status for the task'),
  currentMode: WorkflowRoleSchema.optional().describe(
    'The new current mode/owner of the task',
  ),
  notes: z
    .string()
    .optional()
    .describe('Additional notes about the status update'),
  priority: z
    .string()
    .optional()
    .describe('Updated priority (Low, Medium, High, Critical)'),
  owner: z.string().optional().describe('Updated task owner'),
  completionDate: z
    .date()
    .optional()
    .describe('Completion date if status is completed'),
});

export type UpdateTaskStatusParams = z.infer<typeof UpdateTaskStatusSchema>;

// ✅ ENHANCED: Task status update response
export const TaskStatusUpdateResponseSchema = z.object({
  taskId: z.string(),
  previousStatus: z.string(),
  newStatus: z.string(),
  previousMode: z.string().nullable(),
  newMode: z.string().nullable(),
  updatedAt: z.date(),

  // Related updates
  workflowTransitionCreated: z
    .boolean()
    .describe('Whether a workflow transition was recorded'),
  delegationRecordUpdated: z
    .boolean()
    .describe('Whether any delegation records were updated'),
  completionReportTriggered: z
    .boolean()
    .describe('Whether completion report creation was triggered'),

  // Status change analysis
  validTransition: z
    .boolean()
    .describe('Whether the status change follows valid patterns'),
  statusWarnings: z
    .array(z.string())
    .optional()
    .describe('Any warnings about the status change'),
  nextPossibleStatuses: z
    .array(z.string())
    .optional()
    .describe('Possible next status values'),
});

export type TaskStatusUpdateResponse = z.infer<
  typeof TaskStatusUpdateResponseSchema
>;
