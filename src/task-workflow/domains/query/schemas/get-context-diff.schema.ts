import { z } from 'zod';

// ✅ FIXED: Get context diff schema for efficient context updates
export const GetContextDiffSchema = z.object({
  taskId: z.string().describe('The ID of the task to get context diff for'),
  lastContextHash: z.string().describe('Hash of the last known context state'),
  sliceType: z
    .enum([
      'TD', // Task Description
      'IP', // Implementation Plan
      'RR', // Research Report
      'CRD', // Code Review Report
      'CP', // Completion Report
      'SUBTASKS', // Subtasks
      'COMMENTS', // Comments
      'DELEGATIONS', // Delegation history
      'WORKFLOW', // Workflow transitions
    ])
    .describe('Type of context slice to check for changes'),
});

export type GetContextDiffParams = z.infer<typeof GetContextDiffSchema>;

// ✅ FIXED: Context diff response schema
export const ContextDiffResponseSchema = z.object({
  taskId: z.string(),
  sliceType: z.string(),
  hasChanges: z.boolean().describe('Whether the context slice has changed'),
  currentContextHash: z.string().describe('Current hash of the context slice'),
  lastKnownHash: z.string().describe('The hash that was provided in request'),

  // Change details (only if hasChanges = true)
  changes: z
    .object({
      added: z.any().optional().describe('New data that was added'),
      modified: z.any().optional().describe('Data that was modified'),
      removed: z.any().optional().describe('Data that was removed'),
      changeCount: z.number().int().describe('Total number of changes'),
      lastModified: z.date().describe('When the last change occurred'),
    })
    .optional(),

  // Full context (only if hasChanges = true and requested)
  updatedContext: z.any().optional().describe('Full updated context slice'),

  // Metadata
  contextSize: z.number().int().describe('Size of context slice in bytes'),
  contextAge: z.number().describe('Age of context in minutes'),
  compressionRatio: z
    .number()
    .optional()
    .describe('Compression ratio achieved'),
});

export type ContextDiffResponse = z.infer<typeof ContextDiffResponseSchema>;
