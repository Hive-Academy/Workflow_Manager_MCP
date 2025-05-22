import { z } from 'zod';
import { TOKEN_MAPS } from 'src/task-workflow/types/token-refs.schema';

// Helper for preprocessing status
const preprocessStatus = (val: unknown) => {
  if (typeof val === 'string') {
    const mapped = TOKEN_MAPS.status[val as keyof typeof TOKEN_MAPS.status];
    if (mapped) return mapped;
    // Allow specific values 'completed' or 'rejected' if not found in map (for direct use)
    if (val === 'completed' || val === 'rejected') return val;
  }
  return val;
};

// Helper for preprocessing role/mode
const preprocessRole = (val: unknown) => {
  if (typeof val === 'string') {
    return TOKEN_MAPS.role[val as keyof typeof TOKEN_MAPS.role] || val;
  }
  return val;
};

export const CompleteTaskSchema = z.object({
  taskId: z.string().describe('The ID of the task to complete.'),
  mode: z
    .preprocess(preprocessRole, z.string())
    .describe(
      'The mode completing the task (can be shorthand like 🏛️AR or full like architect).',
    ),
  status: z
    .preprocess(preprocessStatus, z.enum(['completed', 'rejected']))
    .describe('Whether the task was completed (COM) successfully or rejected.'),
  notes: z
    .string()
    .optional()
    .describe('Additional notes about the completion.'),
  taskName: z.string().optional().describe('The name of the task.'),
});
