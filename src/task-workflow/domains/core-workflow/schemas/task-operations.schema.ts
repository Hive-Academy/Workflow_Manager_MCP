import { z } from 'zod';

// Task Operations Schema - Clear, focused parameters for task management
export const TaskOperationsSchema = z.object({
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
  taskId: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  includeDescription: z.boolean().default(true),
  includeAnalysis: z.boolean().default(false),
});

export type TaskOperationsInput = z.infer<typeof TaskOperationsSchema>;
