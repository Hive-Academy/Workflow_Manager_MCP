import { z } from 'zod';

export const ContinueTaskSchema = z.object({
  taskId: z.string().describe('The ID of the task to continue.'),
  newStatus: z
    .string()
    .optional()
    .describe(
      "Optional new status for the task (e.g., 'In Progress'). If not provided, implies resumption without explicit status change, or defaults to a standard resumption status.",
    ),
  assignToMode: z
    .string()
    .optional()
    .describe(
      'Optional mode/role to assign or confirm ownership of the task as it is continued.',
    ),
  notes: z
    .string()
    .optional()
    .describe(
      'Optional notes detailing the reason for continuation or work resumed.',
    ),
});

export type ContinueTaskParams = z.infer<typeof ContinueTaskSchema>;
