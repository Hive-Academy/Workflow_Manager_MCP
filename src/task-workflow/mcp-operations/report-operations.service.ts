import { Injectable } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest'; // Assuming @Tool decorator is available
import { ResearchReportService } from '../services/research-report.service';
import {
  CreateResearchReportInput,
  CreateResearchReportInputSchema,
  GetResearchReportInput,
  GetResearchReportInputSchema,
  ResearchReport,
  UpdateResearchReportInput,
  UpdateResearchReportInputSchema,
} from '../schemas/research-report.schema';
import { ZodSchema, z } from 'zod';
import { CodeReviewReportService } from '../services/code-review-report.service';
import {
  CreateCodeReviewReportInput,
  CreateCodeReviewReportInputSchema,
  CodeReviewReport,
  UpdateCodeReviewReportInputSchema,
} from '../schemas/code-review-report.schema';
import { CompletionReportService } from '../services/completion-report.service';
import {
  CreateCompletionReportInput,
  CreateCompletionReportInputSchema,
  CompletionReport,
  UpdateCompletionReportInputSchema,
} from '../schemas/completion-report.schema';
import { CodeReview as PrismaCodeReview } from '../../../generated/prisma'; // Import Prisma model type

// Define complex input schemas separately for clarity and to avoid inline issues
const GetCodeReviewReportInputSchema = z
  .object({
    reportId: z.string().uuid().optional(),
    taskId: z.string().optional(),
  })
  .refine((data) => data.reportId || data.taskId, {
    message: 'Either reportId or taskId must be provided',
  });

const UpdateCodeReviewReportToolInputSchema =
  UpdateCodeReviewReportInputSchema.extend({
    reportId: z.string().uuid(),
  });

// Define complex input schemas for CompletionReport tools
const GetCompletionReportInputSchema = z
  .object({
    reportId: z.string().uuid().optional(),
    taskId: z.string().optional(),
  })
  .refine((data) => data.reportId || data.taskId, {
    message: 'Either reportId or taskId must be provided',
  });

const UpdateCompletionReportToolInputSchema =
  UpdateCompletionReportInputSchema.extend({
    reportId: z.string().uuid(),
  });

// Helper function to map Prisma CodeReview model to Zod CodeReviewReport schema type
function mapPrismaCodeReviewToZod(
  prismaReport: PrismaCodeReview | null,
): CodeReviewReport | null {
  if (!prismaReport) {
    return null;
  }
  return {
    id: String(prismaReport.id),
    taskId: prismaReport.taskId,
    reviewer: 'N/A', // Placeholder, as Prisma model doesn't have this
    status: prismaReport.status as CodeReviewReport['status'], // Assumes alignment
    summary: prismaReport.summary,
    findings: [], // Placeholder: Prisma model has 'issues: string', Zod schema expects structured findings.
    // Proper reconciliation needed for actual findings data.
    commitSha: undefined, // Placeholder, as Prisma model doesn't have this
    createdAt: prismaReport.createdAt,
    updatedAt: prismaReport.updatedAt,
  };
}

@Injectable()
export class ReportOperationsService {
  constructor(
    private readonly researchReportService: ResearchReportService,
    private readonly codeReviewReportService: CodeReviewReportService,
    private readonly completionReportService: CompletionReportService,
  ) {}

  @Tool({
    name: 'create_research_report',
    description: 'Creates a new research report for a given task.',
    parameters:
      CreateResearchReportInputSchema as ZodSchema<CreateResearchReportInput>,
  })
  async createResearchReport(
    input: CreateResearchReportInput,
  ): Promise<ResearchReport> {
    return this.researchReportService.createResearchReport(input);
  }

  @Tool({
    name: 'get_research_report',
    description:
      'Retrieves one or more research reports based on report ID or task ID.',
    parameters:
      GetResearchReportInputSchema as ZodSchema<GetResearchReportInput>,
    // Output schema handling might need refinement for union types if not already supported
  })
  async getResearchReport(
    input: GetResearchReportInput,
  ): Promise<ResearchReport | ResearchReport[] | null> {
    if (input.reportId) {
      return this.researchReportService.getResearchReportById(input.reportId);
    }
    if (input.taskId) {
      return this.researchReportService.getResearchReportsByTaskId(
        input.taskId,
      );
    }
    throw new Error(
      'Either reportId or taskId must be provided to get_research_report.',
    );
  }

  @Tool({
    name: 'update_research_report',
    description: 'Updates an existing research report.',
    parameters:
      UpdateResearchReportInputSchema as ZodSchema<UpdateResearchReportInput>,
  })
  async updateResearchReport(
    input: UpdateResearchReportInput,
  ): Promise<ResearchReport> {
    const { reportId } = input;
    if (typeof reportId !== 'string') {
      throw new Error(
        'reportId must be a string and included in the input for updateResearchReport',
      );
    }
    return this.researchReportService.updateResearchReport(reportId, input);
  }

  // --- CodeReviewReport Tools ---

  @Tool({
    name: 'create_code_review_report',
    description: 'Creates a new code review report for a given task.',
    parameters:
      CreateCodeReviewReportInputSchema as ZodSchema<CreateCodeReviewReportInput>,
  })
  async createCodeReviewReport(
    input: CreateCodeReviewReportInput,
  ): Promise<CodeReviewReport | null> {
    const prismaReport =
      await this.codeReviewReportService.createCodeReviewReport(input);
    return mapPrismaCodeReviewToZod(prismaReport);
  }

  @Tool({
    name: 'get_code_review_report',
    description:
      'Retrieves a code review report by its ID or all reports for a specific task ID.',
    parameters: GetCodeReviewReportInputSchema as ZodSchema<
      z.infer<typeof GetCodeReviewReportInputSchema>
    >,
  })
  async getCodeReviewReport(
    input: z.infer<typeof GetCodeReviewReportInputSchema>,
  ): Promise<CodeReviewReport | CodeReviewReport[] | null> {
    if (input.reportId) {
      const reportIdNum = parseInt(input.reportId, 10);
      if (isNaN(reportIdNum)) {
        throw new Error('Invalid reportId format for get_code_review_report.');
      }
      const prismaReport =
        await this.codeReviewReportService.getCodeReviewReport(reportIdNum);
      return mapPrismaCodeReviewToZod(prismaReport);
    }
    if (input.taskId) {
      const prismaReports =
        await this.codeReviewReportService.getCodeReviewReportsByTaskId(
          input.taskId,
        );
      return prismaReports
        .map(mapPrismaCodeReviewToZod)
        .filter((r) => r !== null);
    }
    throw new Error(
      'Either reportId or taskId must be provided for get_code_review_report.',
    );
  }

  @Tool({
    name: 'update_code_review_report',
    description: 'Updates an existing code review report.',
    parameters: UpdateCodeReviewReportToolInputSchema as ZodSchema<
      z.infer<typeof UpdateCodeReviewReportToolInputSchema>
    >,
  })
  async updateCodeReviewReport(
    input: z.infer<typeof UpdateCodeReviewReportToolInputSchema>,
  ): Promise<CodeReviewReport | null> {
    const reportIdNum = parseInt(input.reportId, 10);
    if (isNaN(reportIdNum)) {
      throw new Error('Invalid reportId format for update_code_review_report.');
    }
    // The service expects (id: number, data: UpdateCodeReviewReportInput)
    // The 'input' here includes reportId, which should not be part of the 'data' payload for update
    const { reportId, ...updateData } = input;
    const prismaReport =
      await this.codeReviewReportService.updateCodeReviewReport(
        reportIdNum,
        updateData as CreateCodeReviewReportInput,
      );
    return mapPrismaCodeReviewToZod(prismaReport);
  }

  // --- CompletionReport Tools ---

  @Tool({
    name: 'create_completion_report',
    description: 'Creates a new completion report for a given task.',
    parameters:
      CreateCompletionReportInputSchema as ZodSchema<CreateCompletionReportInput>,
  })
  async createCompletionReport(
    input: CreateCompletionReportInput,
  ): Promise<CompletionReport> {
    return this.completionReportService.createCompletionReport(input);
  }

  @Tool({
    name: 'get_completion_report',
    description:
      'Retrieves a completion report by its ID or all reports for a specific task ID.',
    parameters: GetCompletionReportInputSchema as ZodSchema<
      z.infer<typeof GetCompletionReportInputSchema>
    >,
  })
  async getCompletionReport(
    input: z.infer<typeof GetCompletionReportInputSchema>,
  ): Promise<CompletionReport | CompletionReport[] | null> {
    if (input.reportId) {
      return this.completionReportService.getCompletionReport(input.reportId);
    }
    if (input.taskId) {
      return this.completionReportService.getCompletionReportsByTaskId(
        input.taskId,
      );
    }
    throw new Error(
      'Either reportId or taskId must be provided for get_completion_report.',
    );
  }

  @Tool({
    name: 'update_completion_report',
    description: 'Updates an existing completion report.',
    parameters: UpdateCompletionReportToolInputSchema as ZodSchema<
      z.infer<typeof UpdateCompletionReportToolInputSchema>
    >,
  })
  async updateCompletionReport(
    input: z.infer<typeof UpdateCompletionReportToolInputSchema>,
  ): Promise<CompletionReport> {
    const { reportId } = input;
    return this.completionReportService.updateCompletionReport(reportId, input);
  }
}
