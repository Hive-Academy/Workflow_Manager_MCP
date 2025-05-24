import { z } from 'zod';

export const CodeReviewStatusSchema = z.enum([
  'APPROVED',
  'APPROVED_WITH_RESERVATIONS',
  'NEEDS_CHANGES',
]);

// ✅ FIXED: Input schema aligned with actual database fields
export const CreateCodeReviewReportInputSchema = z.object({
  taskId: z.string().describe('The task ID this review belongs to'),
  status: CodeReviewStatusSchema,
  summary: z.string().min(1).describe('Summary of the code review'),
  strengths: z.string().describe('Positive aspects of the implementation'),
  issues: z.string().describe('Issues or problems identified'),
  acceptanceCriteriaVerification: z
    .any()
    .describe('JSON verification of acceptance criteria'),
  manualTestingResults: z.string().describe('Results from manual testing'),
  requiredChanges: z
    .string()
    .optional()
    .describe('Changes that must be made if status is NEEDS_CHANGES'),
});

export type CreateCodeReviewReportInput = z.infer<
  typeof CreateCodeReviewReportInputSchema
>;

// ✅ FIXED: Output schema exactly matching database structure
export const CodeReviewReportSchema = z.object({
  id: z.number().int().describe('Database auto-increment ID'),
  taskId: z.string(),
  status: CodeReviewStatusSchema,
  summary: z.string(),
  strengths: z.string(),
  issues: z.string(),
  acceptanceCriteriaVerification: z.any().describe('JSON verification data'),
  manualTestingResults: z.string(),
  requiredChanges: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CodeReviewReport = z.infer<typeof CodeReviewReportSchema>;

// ✅ FIXED: Update schema using database ID structure
export const UpdateCodeReviewReportInputSchema = z
  .object({
    reportId: z.number().int().describe('Database ID of the report to update'),
    status: CodeReviewStatusSchema.optional(),
    summary: z.string().min(1).optional(),
    strengths: z.string().optional(),
    issues: z.string().optional(),
    acceptanceCriteriaVerification: z.any().optional(),
    manualTestingResults: z.string().optional(),
    requiredChanges: z.string().optional(),
  })
  .refine(
    (data) => {
      // Ensure reportId is always provided and at least one update field exists
      const { reportId, ...updateFields } = data;
      return reportId && Object.keys(updateFields).length > 0;
    },
    {
      message:
        'reportId is required and at least one field to update must be provided.',
    },
  );

export type UpdateCodeReviewReportInput = z.infer<
  typeof UpdateCodeReviewReportInputSchema
>;

// ✅ FIXED: Get schema for retrieving reports
export const GetCodeReviewReportInputSchema = z
  .object({
    reportId: z.number().int().optional().describe('Database ID of the report'),
    taskId: z.string().optional().describe('Task ID to find reports for'),
  })
  .refine((data) => data.reportId || data.taskId, {
    message: 'Either reportId or taskId must be provided.',
  });

export type GetCodeReviewReportInput = z.infer<
  typeof GetCodeReviewReportInputSchema
>;
