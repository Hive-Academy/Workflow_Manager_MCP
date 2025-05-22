import { z } from 'zod';

export const TaskDashboardParamsSchema = z
  .object({
    // Add any filter parameters if needed in the future, e.g.:
    // statusFilter: z.string().optional(),
    // modeFilter: z.string().optional(),
    // For now, no specific parameters for a general dashboard overview
    randomString: z
      .string()
      .optional()
      .describe(
        'Dummy parameter for no-parameter tools if required by MCP client',
      ),
  })
  .strict();

export const TaskDashboardResponseSchema = z.object({
  totalTasks: z.number(),
  tasksByStatus: z.record(z.string(), z.number()), // e.g., { "Not Started": 10, "In Progress": 5 }
  tasksByMode: z.record(z.string(), z.number()), // e.g., { "architect-mode": 2, "developer-mode": 3 }
  // We could add more specific lists later, e.g., overdueTasks, highPriorityTasks
  // For now, keeping it to aggregate counts.
});

export type TaskDashboardParams = z.infer<typeof TaskDashboardParamsSchema>;
export type TaskDashboardResponse = z.infer<typeof TaskDashboardResponseSchema>;
