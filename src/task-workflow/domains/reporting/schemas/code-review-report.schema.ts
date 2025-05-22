import { z } from 'zod';

export const CodeReviewStatusSchema = z.enum([
  'APPROVED',
  'APPROVED_WITH_RESERVATIONS',
  'NEEDS_CHANGES',
  'PENDING_REVIEW',
]);

export const CodeReviewFindingSchema = z.object({
  id: z.string().uuid().optional(),
  filePath: z.string().optional(),
  lineNumber: z.number().optional(),
  comment: z.string(),
  severity: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO']),
});

export const CreateCodeReviewReportInputSchema = z.object({
  taskId: z.string().uuid(),
  reviewer: z.string().min(1),
  status: CodeReviewStatusSchema,
  summary: z.string().min(1),
  findings: z.array(CodeReviewFindingSchema).optional(),
  commitSha: z.string().optional(), // Relevant commit reviewed
});

export type CreateCodeReviewReportInput = z.infer<
  typeof CreateCodeReviewReportInputSchema
>;

export const CodeReviewReportSchema = CreateCodeReviewReportInputSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CodeReviewReport = z.infer<typeof CodeReviewReportSchema>;

export const UpdateCodeReviewReportInputSchema =
  CreateCodeReviewReportInputSchema.partial().extend({
    // No fields are strictly required for an update, but at least one should be present.
    // taskId cannot be updated.
  });

export type UpdateCodeReviewReportInput = z.infer<
  typeof UpdateCodeReviewReportInputSchema
>;
