import { z } from 'zod';

// ✅ FIXED: Process command schema for workflow command handling
export const ProcessCommandSchema = z.object({
  command_string: z.string().describe('The full command string to process (e.g., "/next-role TSK-001")'),
});

export type ProcessCommandParams = z.infer<typeof ProcessCommandSchema>;

// ✅ FIXED: Command processing response
export const CommandProcessingResponseSchema = z.object({
  command: z.string().describe('The original command that was processed'),
  commandType: z.string().describe('Type of command that was recognized'),
  success: z.boolean().describe('Whether the command was executed successfully'),
  result: z.any().optional().describe('Result of command execution'),
  errorMessage: z.string().optional().describe('Error message if command failed'),
  
  // Command execution details
  executionTime: z.number().optional().describe('Command execution time in milliseconds'),
  affectedTasks: z.array(z.string()).optional().describe('Task IDs that were affected'),
  nextSuggestedActions: z.array(z.string()).optional().describe('Suggested next actions'),
});

export type CommandProcessingResponse = z.infer<typeof CommandProcessingResponseSchema>;