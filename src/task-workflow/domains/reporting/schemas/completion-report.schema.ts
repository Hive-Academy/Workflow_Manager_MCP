import { z } from 'zod';

export const CreateCompletionReportInputSchema = z.object({
  taskId: z.string().uuid(),
  summary: z.string().min(1),
  filesModified: z.any().optional(),
  delegationSummary: z.string().min(1),
  acceptanceCriteriaVerification: z.any().optional(),
});

export type CreateCompletionReportInput = z.infer<
  typeof CreateCompletionReportInputSchema
>;

export const CompletionReportSchema = CreateCompletionReportInputSchema.extend({
  id: z.number().int(),
  createdAt: z.date(),
});

export type CompletionReport = z.infer<typeof CompletionReportSchema>;

export const UpdateCompletionReportInputSchema = z.object({
  summary: z.string().min(1).optional(),
  filesModified: z.any().optional(),
  delegationSummary: z.string().min(1).optional(),
  acceptanceCriteriaVerification: z.any().optional(),
});

export type UpdateCompletionReportInput = z.infer<
  typeof UpdateCompletionReportInputSchema
>;
