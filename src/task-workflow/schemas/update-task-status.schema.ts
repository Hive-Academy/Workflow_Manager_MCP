import { z } from 'zod';
import { TOKEN_MAPS } from './token-refs.schema';

// Helper for preprocessing status
const preprocessStatus = (val: unknown) => {
  if (typeof val === 'string') {
    return TOKEN_MAPS.status[val as keyof typeof TOKEN_MAPS.status] || val;
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

export const UpdateTaskStatusSchema = z.object({
  taskId: z.string().describe('The ID of the task to update.'),
  status: z
    .preprocess(preprocessStatus, z.string())
    .describe(
      'The new status for the task (can be shorthand like INP or full like in-progress).',
    ),
  currentMode: z
    .preprocess(preprocessRole, z.string())
    .optional()
    .describe(
      'The new current mode/owner of the task (can be shorthand like 🏛️AR or full like architect).',
    ),
  notes: z
    .string()
    .optional()
    .describe('Additional notes about the status update.'),
});
