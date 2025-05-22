import { z } from 'zod';
export const ProcessCommandSchema = z.object({
  command_string: z
    .string()
    .describe('The full command string, e.g., "/next-role TSK-001"'),
});
export type ProcessCommandParams = z.infer<typeof ProcessCommandSchema>;
