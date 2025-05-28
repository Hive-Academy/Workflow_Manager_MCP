import { z } from 'zod';

// Base schema for all operations
const BaseTaskOperationsSchema = z.object({
  operation: z.enum(['create', 'update', 'get', 'list']),

  // For create/update operations
  taskData: z
    .object({
      taskId: z.string().optional(),
      name: z.string().optional(),
      status: z
        .enum([
          'not-started',
          'in-progress',
          'needs-review',
          'completed',
          'needs-changes',
          'paused',
          'cancelled',
        ])
        .optional(),
      priority: z.enum(['Low', 'Medium', 'High', 'Critical']).optional(),
      dependencies: z.array(z.string()).optional(),
      gitBranch: z.string().optional(),
    })
    .optional(),

  // For task description
  description: z
    .object({
      description: z.string().optional(),
      businessRequirements: z.string().optional(),
      technicalRequirements: z.string().optional(),
      acceptanceCriteria: z.array(z.string()).optional(),
    })
    .optional(),

  // For codebase analysis
  codebaseAnalysis: z
    .object({
      architectureFindings: z.any().optional(),
      problemsIdentified: z.any().optional(),
      implementationContext: z.any().optional(),
      integrationPoints: z.any().optional(),
      qualityAssessment: z.any().optional(),
      filesCovered: z.array(z.string()).optional(),
      technologyStack: z.any().optional(),
      analyzedBy: z.string().optional(),
    })
    .optional(),

  // For filtering/querying
  status: z.string().optional(),
  priority: z.string().optional(),
  includeDescription: z.boolean().default(true),
  includeAnalysis: z.boolean().default(false),
});

// Discriminated union for operations that need taskId vs those that don't
export const TaskOperationsSchema = z.discriminatedUnion('operation', [
  // Operations that require taskId
  BaseTaskOperationsSchema.extend({
    operation: z.literal('get'),
    taskId: z.string(),
  }),
  BaseTaskOperationsSchema.extend({
    operation: z.literal('update'),
    taskId: z.string(),
  }),
  // Operations that don't require taskId
  BaseTaskOperationsSchema.extend({
    operation: z.literal('create'),
    taskId: z.string().optional(),
  }),
  BaseTaskOperationsSchema.extend({
    operation: z.literal('list'),
    taskId: z.string().optional(),
  }),
]);

export type TaskOperationsInput = z.infer<typeof TaskOperationsSchema>;
