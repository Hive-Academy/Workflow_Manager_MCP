import { z } from 'zod';

export const ListTasksSchema = z.object({
  status: z
    .string()
    .optional()
    .describe(
      'Optional filter by task status (e.g., "In Progress", "Completed")',
    ),
  skip: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe('Optional number of tasks to skip (for pagination)'),
  take: z
    .number()
    .int()
    .min(1)
    .max(100) // Max 100 tasks per page to prevent abuse
    .optional()
    .describe('Optional number of tasks to take (for pagination, max 100)'),
});
