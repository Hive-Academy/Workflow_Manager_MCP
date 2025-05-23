import { z } from 'zod';

// ✅ FIXED: Shorthand command schema for quick workflow commands
export const ShorthandCommandSchema = z.object({
  command: z.string().describe('The shorthand command (e.g., "next", "status", "delegate")'),
  taskId: z.string().optional().describe('Optional task ID for command context'),
  parameters: z.array(z.string()).optional().describe('Additional command parameters'),
});

export type ShorthandCommandParams = z.infer<typeof ShorthandCommandSchema>;

// ✅ FIXED: Shorthand command response
export const ShorthandCommandResponseSchema = z.object({
  command: z.string(),
  expandedCommand: z.string().describe('The full command that the shorthand was expanded to'),
  executed: z.boolean().describe('Whether the command was immediately executed'),
  result: z.any().optional().describe('Command execution result'),
  
  // Available shortcuts
  availableShorthands: z.array(z.object({
    shorthand: z.string(),
    fullCommand: z.string(),
    description: z.string(),
  })).optional().describe('Other available shorthand commands'),
});

export type ShorthandCommandResponse = z.infer<typeof ShorthandCommandResponseSchema>;