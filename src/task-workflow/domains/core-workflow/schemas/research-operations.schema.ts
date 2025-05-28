import { z } from 'zod';

// Research Operations Schema - Research reports and communication
export const ResearchOperationsSchema = z.object({
  operation: z.enum([
    'create_research',
    'update_research',
    'get_research',
    'add_comment',
    'get_comments',
  ]),

  taskId: z.string(),

  // For research operations
  researchData: z
    .object({
      findings: z.string(),
      recommendations: z.string().optional(),
      investigationSummary: z.string().optional(),
      technologyOptions: z.array(z.string()).optional(),
      implementationApproaches: z.array(z.string()).optional(),
      riskAssessment: z.string().optional(),
      resourceRequirements: z.string().optional(),
      researchedBy: z.string(),
    })
    .optional(),

  // For comment operations
  commentData: z
    .object({
      content: z.string(),
      author: z.string(),
      contextType: z
        .enum(['general', 'technical', 'business', 'clarification'])
        .default('general'),
    })
    .optional(),

  // For querying
  includeComments: z.boolean().default(true),
  commentType: z
    .enum(['general', 'technical', 'business', 'clarification'])
    .optional(),
});

export type ResearchOperationsInput = z.infer<typeof ResearchOperationsSchema>;
