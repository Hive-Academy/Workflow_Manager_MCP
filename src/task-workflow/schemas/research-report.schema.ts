import { z } from 'zod';
// import { TaskIdSchema } from './task.schema'; // Assuming TaskIdSchema exists for relation

export const ResearchReportSchema = z.object({
  id: z
    .number()
    .int()
    .describe('Unique identifier for the research report (DB generated)'),
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
    .describe(
      'The full content of the research findings, likely in Markdown format',
    ),
  recommendations: z
    .string()
    .optional()
    .describe('Recommendations based on the research'),
  references: z
    .array(
      z.object({
        description: z
          .string()
          .optional()
          .describe('Description of the reference'),
        url: z
          .string()
          .url()
          .optional()
          .describe('URL of the reference, if applicable'),
        citation: z.string().optional().describe('Formal citation string'),
      }),
    )
    .optional()
    .describe('A list of references or sources used in the research'),
  createdAt: z.date().describe('Timestamp of when the report was created'),
  updatedAt: z.date().describe('Timestamp of when the report was last updated'),
});

export type ResearchReport = z.infer<typeof ResearchReportSchema>;

export const CreateResearchReportInputSchema = ResearchReportSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  taskId: z.string().describe('ID of the task to associate the report with.'),
});

export type CreateResearchReportInput = z.infer<
  typeof CreateResearchReportInputSchema
>;

export const GetResearchReportInputSchema = z
  .object({
    reportId: z
      .string()
      .optional()
      .describe(
        'The ID (string UUID or number string) of the specific research report to retrieve.',
      ),
    taskId: z
      .string()
      .optional()
      .describe('The ID of the task to retrieve reports for.'),
  })
  .refine((data) => data.reportId || data.taskId, {
    message: 'Either reportId or taskId must be provided.',
  });

export type GetResearchReportInput = z.infer<
  typeof GetResearchReportInputSchema
>;

export const UpdateResearchReportInputSchema = ResearchReportSchema.omit({
  id: true,
  taskId: true,
  createdAt: true,
  updatedAt: true,
})
  .partial()
  .extend({
    reportId: z
      .string()
      .describe('ID (string UUID or number string) of the report to update'),
  })
  .refine(
    (data) => Object.keys(data).filter((k) => k !== 'reportId').length > 0,
    {
      message: 'At least one field to update must be provided.',
    },
  );

export type UpdateResearchReportInput = z.infer<
  typeof UpdateResearchReportInputSchema
>;
