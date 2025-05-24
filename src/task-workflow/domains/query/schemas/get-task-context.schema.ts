import { z } from 'zod';

// ✅ ENHANCED: Get task context schema with slice type support
export const GetTaskContextSchema = z.object({
  taskId: z.string().describe('The ID of the task to get context for'),
  taskName: z
    .string()
    .optional()
    .describe('Optional task name for confirmation/disambiguation'),
  sliceType: z
    .enum([
      'FULL', // Complete task context
      'TD', // Task Description only
      'IP', // Implementation Plan only
      'RR', // Research Report only
      'CRD', // Code Review Report only
      'CP', // Completion Report only
      'SUBTASKS', // Subtasks only
      'COMMENTS', // Recent comments only
      'DELEGATIONS', // Delegation history only
      'STATUS', // Status and basic info only
    ])
    .optional()
    .default('FULL')
    .describe('Type of context slice to retrieve'),
  includeRelated: z
    .boolean()
    .optional()
    .default(true)
    .describe('Whether to include related data (subtasks, comments, etc.)'),
  maxComments: z
    .number()
    .int()
    .min(1)
    .max(50)
    .optional()
    .default(10)
    .describe('Maximum number of recent comments to include'),
  maxDelegations: z
    .number()
    .int()
    .min(1)
    .max(20)
    .optional()
    .default(5)
    .describe('Maximum number of recent delegations to include'),
});

export type GetTaskContextParams = z.infer<typeof GetTaskContextSchema>;

// ✅ ENHANCED: Task context response schema
export const TaskContextResponseSchema = z.object({
  taskId: z.string(),
  name: z.string(),
  status: z.string(),
  currentMode: z.string().nullable(),
  priority: z.string().nullable(),
  owner: z.string().nullable(),
  creationDate: z.date(),
  completionDate: z.date().nullable(),
  redelegationCount: z.number().int(),
  gitBranch: z.string().nullable(),

  // Optional slices based on sliceType
  taskDescription: z
    .object({
      description: z.string(),
      businessRequirements: z.string(),
      technicalRequirements: z.string(),
      acceptanceCriteria: z.any(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .optional(),

  implementationPlan: z
    .object({
      id: z.number().int(),
      overview: z.string(),
      approach: z.string(),
      technicalDecisions: z.string(),
      filesToModify: z.any(),
      createdAt: z.date(),
      updatedAt: z.date(),
      createdBy: z.string(),
      totalSubtasks: z.number().int(),
      completedSubtasks: z.number().int(),
    })
    .optional(),

  subtasks: z
    .array(
      z.object({
        id: z.number().int(),
        name: z.string(),
        description: z.string(),
        status: z.string(),
        assignedTo: z.string().nullable(),
        batchId: z.string().nullable(),
        batchTitle: z.string().nullable(),
        sequenceNumber: z.number().int(),
        startedAt: z.date().nullable(),
        completedAt: z.date().nullable(),
      }),
    )
    .optional(),

  recentComments: z
    .array(
      z.object({
        id: z.number().int(),
        mode: z.string(),
        content: z.string(),
        createdAt: z.date(),
      }),
    )
    .optional(),

  delegationHistory: z
    .array(
      z.object({
        id: z.number().int(),
        fromMode: z.string(),
        toMode: z.string(),
        delegationTimestamp: z.date(),
        completionTimestamp: z.date().nullable(),
        success: z.boolean().nullable(),
      }),
    )
    .optional(),

  researchReports: z
    .array(
      z.object({
        id: z.number().int(),
        title: z.string(),
        summary: z.string(),
        createdAt: z.date(),
      }),
    )
    .optional(),

  codeReviews: z
    .array(
      z.object({
        id: z.number().int(),
        status: z.string(),
        summary: z.string(),
        createdAt: z.date(),
      }),
    )
    .optional(),

  completionReport: z
    .object({
      id: z.number().int(),
      summary: z.string(),
      filesModified: z.any(),
      delegationSummary: z.string(),
      createdAt: z.date(),
    })
    .optional(),
});

export type TaskContextResponse = z.infer<typeof TaskContextResponseSchema>;
