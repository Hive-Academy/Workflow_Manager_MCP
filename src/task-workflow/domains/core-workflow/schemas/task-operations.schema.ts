import { z } from 'zod';

// Task Operations Schema - Task lifecycle management with clear operations
export const TaskOperationsSchema = z
  .object({
    operation: z.enum(['create', 'update', 'get', 'list']),

    // Required for get and update operations
    taskId: z.string().optional(),

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
    includeDescription: z.boolean().optional(),
    includeAnalysis: z.boolean().optional(),
  })
  .refine(
    (data) => {
      // Validate that get and update operations have taskId
      if (
        (data.operation === 'get' || data.operation === 'update') &&
        !data.taskId
      ) {
        return false;
      }
      return true;
    },
    {
      message: "taskId is required for 'get' and 'update' operations",
      path: ['taskId'],
    },
  );

export type TaskOperationsInput = z.infer<typeof TaskOperationsSchema>;
