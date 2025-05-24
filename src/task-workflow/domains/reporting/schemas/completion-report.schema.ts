import { z } from 'zod';

// ✅ FIXED: Removed UUID constraint - taskId is just a string in database
export const CreateCompletionReportInputSchema = z.object({
  taskId: z.string().describe('The task ID this completion report belongs to'),
  summary: z.string().min(1).describe('Summary of the completed task'),
  filesModified: z
    .any()
    .optional()
    .describe('JSON array of files that were modified'),
  delegationSummary: z
    .string()
    .min(1)
    .describe('Summary of delegation activities'),
  acceptanceCriteriaVerification: z
    .any()
    .optional()
    .describe('JSON verification of acceptance criteria'),
});

export type CreateCompletionReportInput = z.infer<
  typeof CreateCompletionReportInputSchema
>;

// ✅ FIXED: Schema exactly matching database structure
export const CompletionReportSchema = z.object({
  id: z.number().int().describe('Database auto-increment ID'),
  taskId: z.string(),
  summary: z.string(),
  filesModified: z.any().describe('JSON array of modified files'),
  delegationSummary: z.string(),
  acceptanceCriteriaVerification: z.any().describe('JSON verification data'),
  createdAt: z.date(),
});

export type CompletionReport = z.infer<typeof CompletionReportSchema>;

// ✅ FIXED: Update schema for completion reports
export const UpdateCompletionReportInputSchema = z
  .object({
    summary: z.string().min(1).optional(),
    filesModified: z.any().optional(),
    delegationSummary: z.string().min(1).optional(),
    acceptanceCriteriaVerification: z.any().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field to update must be provided.',
  });

export type UpdateCompletionReportInput = z.infer<
  typeof UpdateCompletionReportInputSchema
>;
