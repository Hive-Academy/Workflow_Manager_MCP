import { z } from 'zod';

// ✅ FIXED: Research report schema aligned with database structure
export const ResearchReportSchema = z.object({
  id: z.number().int().describe('Database auto-increment ID'),
  taskId: z
    .string()
    .describe('The ID of the task this report is associated with'),
  title: z.string().min(1).describe('Title of the research report'),
  summary: z
    .string()
    .min(1)
    .describe('A concise summary of the research findings'),
  findings: z
    .string()
    .min(1)
    .describe('The full content of the research findings'),
  recommendations: z.string().describe('Recommendations based on the research'),
  references: z
    .any()
    .describe('JSON array of references (stored as Json in DB)'),
  createdAt: z.date().describe('Timestamp of when the report was created'),
  updatedAt: z.date().describe('Timestamp of when the report was last updated'),
});

export type ResearchReport = z.infer<typeof ResearchReportSchema>;

// ✅ FIXED: Input schema for creating research reports
export const CreateResearchReportInputSchema = z.object({
  taskId: z.string().describe('ID of the task to associate the report with'),
  title: z.string().min(1).describe('Title of the research report'),
  summary: z.string().min(1).describe('Summary of the research findings'),
  findings: z.string().min(1).describe('Full research findings content'),
  recommendations: z.string().describe('Recommendations based on research'),
  references: z.any().optional().describe('JSON array of references/sources'),
});

export type CreateResearchReportInput = z.infer<
  typeof CreateResearchReportInputSchema
>;

// ✅ FIXED: Get schema using proper ID handling
export const GetResearchReportInputSchema = z
  .object({
    reportId: z
      .number()
      .int()
      .optional()
      .describe('Database ID of the specific research report'),
    taskId: z.string().optional().describe('Task ID to retrieve reports for'),
  })
  .refine((data) => data.reportId || data.taskId, {
    message: 'Either reportId or taskId must be provided.',
  });

export type GetResearchReportInput = z.infer<
  typeof GetResearchReportInputSchema
>;

// ✅ FIXED: Update schema for research reports
export const UpdateResearchReportInputSchema = z
  .object({
    title: z.string().min(1).optional(),
    summary: z.string().min(1).optional(),
    findings: z.string().min(1).optional(),
    recommendations: z.string().optional(),
    references: z.any().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field to update must be provided.',
  });

export type UpdateResearchReportInput = z.infer<
  typeof UpdateResearchReportInputSchema
>;
