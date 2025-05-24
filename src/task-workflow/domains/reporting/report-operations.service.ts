import { Injectable, NotFoundException } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest'; // Assuming @Tool decorator is available
import { CodeReview, CompletionReport, ResearchReport } from 'generated/prisma';

import { ZodSchema, z } from 'zod';
import { CodeReviewReportService } from './code-review-report.service';
import { CompletionReportService } from './completion-report.service';
import { ResearchReportService } from './research-report.service';
import {
  CreateCodeReviewReportInput,
  CreateCodeReviewReportInputSchema,
  UpdateCodeReviewReportInput,
  UpdateCodeReviewReportInputSchema,
  GetCodeReviewReportInput,
  GetCodeReviewReportInputSchema,
} from './schemas/code-review-report.schema';
import {
  CreateCompletionReportInput,
  CreateCompletionReportInputSchema,
} from './schemas/completion-report.schema';
import {
  CreateResearchReportInput,
  CreateResearchReportInputSchema,
  GetResearchReportInput,
  GetResearchReportInputSchema,
} from './schemas/research-report.schema';

// FIXED: Use the corrected schemas from the schema file
// No need to redefine - import from schema file directly

// Define complex input schemas for CompletionReport tools
const GetCompletionReportInputSchema = z
  .object({
    reportId: z
      .number()
      .int()
      .describe('Database ID of the completion report')
      .optional(),
    taskId: z.string().optional(),
  })
  .refine((data) => data.reportId || data.taskId, {
    message: 'Either reportId or taskId must be provided',
  });

const UpdateCompletionReportToolInputSchema = z
  .object({
    reportId: z
      .number()
      .int()
      .describe('Database ID of the completion report to update'),
    summary: z.string().min(1).optional(),
    filesModified: z.any().optional(),
    delegationSummary: z.string().min(1).optional(),
    acceptanceCriteriaVerification: z.any().optional(),
  })
  .refine(
    (data) => {
      const { reportId, ...updateFields } = data;
      return reportId && Object.keys(updateFields).length > 0;
    },
    {
      message:
        'reportId is required and at least one field to update must be provided.',
    },
  );

// ✅ FIXED: Enhanced research report update schema with reportId
const UpdateResearchReportToolInputSchema = z
  .object({
    reportId: z.number().int().describe('Database ID of the report to update'),
    title: z.string().min(1).optional(),
    summary: z.string().min(1).optional(),
    findings: z.string().min(1).optional(),
    recommendations: z.string().optional(),
    references: z.any().optional(),
  })
  .refine(
    (data) => {
      const { reportId, ...updateFields } = data;
      return reportId && Object.keys(updateFields).length > 0;
    },
    {
      message:
        'reportId is required and at least one field to update must be provided.',
    },
  );

// FIXED: No longer needed - schema is now aligned with database
// Return Prisma model directly as it matches the corrected schema

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
  async getResearchReport(input: GetResearchReportInput): Promise<any> {
    const contextIdentifier = 'research-report';
    let reportData: ResearchReport | ResearchReport[] | null = null;

    if (input.reportId) {
      reportData = await this.researchReportService.getResearchReportById(
        input.reportId,
      );
      if (!reportData) {
        return {
          content: [
            {
              type: 'text',
              text: `No ${contextIdentifier} found for reportId ${input.reportId}.`,
            },
            {
              type: 'text',
              text: JSON.stringify({
                notFound: true,
                contextHash: null,
                contextType: contextIdentifier,
                reportId: input.reportId,
              }),
            },
          ],
        };
      }
    } else if (input.taskId) {
      reportData = await this.researchReportService.getResearchReportsByTaskId(
        input.taskId,
      );
      if (
        !reportData ||
        (Array.isArray(reportData) && reportData.length === 0)
      ) {
        return {
          content: [
            {
              type: 'text',
              text: `No ${contextIdentifier}s found for taskId ${input.taskId}.`,
            },
            {
              type: 'text',
              text: JSON.stringify({
                notFound: true, // Or empty: true for arrays
                contextHash: null,
                contextType: contextIdentifier,
                taskId: input.taskId,
              }),
            },
          ],
        };
      }
    } else {
      // This case should ideally be prevented by schema validation (Zod refine)
      // but if it occurs, return a standardized error response.
      return {
        content: [
          {
            type: 'text',
            text: `Error: Either reportId or taskId must be provided to get_research_report.`,
          },
          {
            type: 'text',
            text: JSON.stringify({
              error: true,
              message: 'Either reportId or taskId must be provided.',
              contextType: contextIdentifier,
            }),
          },
        ],
      };
    }

    // If reportData is found and not empty, return it in the old format for now
    // Or, ideally, it should also be wrapped if MCP requires all tool outputs to be `content: [...]`
    // For ST-004, the focus is on the "not found" case.
    // The successful return path would be standardized later if needed project-wide.
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(reportData, null, 2),
        },
      ],
    };
  }

  @Tool({
    name: 'update_research_report',
    description: 'Updates an existing research report.',
    parameters: UpdateResearchReportToolInputSchema as ZodSchema<
      z.infer<typeof UpdateResearchReportToolInputSchema>
    >,
  })
  async updateResearchReport(
    input: z.infer<typeof UpdateResearchReportToolInputSchema>,
  ): Promise<ResearchReport> {
    const { reportId, ...updateData } = input;
    return this.researchReportService.updateResearchReport(
      reportId,
      updateData,
    );
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
  ): Promise<CodeReview> {
    // FIXED: Return Prisma model directly - schema is now aligned
    return await this.codeReviewReportService.createCodeReviewReport(input);
  }

  @Tool({
    name: 'get_code_review_report',
    description:
      'Retrieves a code review report by its ID or all reports for a specific task ID.',
    parameters:
      GetCodeReviewReportInputSchema as ZodSchema<GetCodeReviewReportInput>,
  })
  async getCodeReviewReport(input: GetCodeReviewReportInput): Promise<any> {
    const contextIdentifier = 'code-review-report';
    let reportData: CodeReview | CodeReview[] | null = null;

    try {
      const result =
        await this.codeReviewReportService.getCodeReviewReport(input);
      reportData = result;

      // Handle empty array case for taskId queries
      if (Array.isArray(reportData) && reportData.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `No ${contextIdentifier}s found for taskId ${input.taskId}.`,
            },
            {
              type: 'text',
              text: JSON.stringify({
                notFound: true,
                contextHash: null,
                contextType: contextIdentifier,
                taskId: input.taskId,
              }),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(reportData, null, 2),
          },
        ],
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        const identifier = input.reportId || input.taskId;
        const identifierType = input.reportId ? 'reportId' : 'taskId';

        return {
          content: [
            {
              type: 'text',
              text: `No ${contextIdentifier} found for ${identifierType} ${identifier}.`,
            },
            {
              type: 'text',
              text: JSON.stringify({
                notFound: true,
                contextHash: null,
                contextType: contextIdentifier,
                [identifierType]: identifier,
              }),
            },
          ],
        };
      }
      throw error;
    }
  }

  @Tool({
    name: 'update_code_review_report',
    description: 'Updates an existing code review report.',
    parameters:
      UpdateCodeReviewReportInputSchema as ZodSchema<UpdateCodeReviewReportInput>,
  })
  async updateCodeReviewReport(
    input: UpdateCodeReviewReportInput,
  ): Promise<CodeReview> {
    // FIXED: Use the updated service method that handles input properly
    return await this.codeReviewReportService.updateCodeReviewReport(input);
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
  ): Promise<any> {
    const contextIdentifier = 'completion-report';
    let reportData: CompletionReport | CompletionReport[] | null = null;

    if (input.reportId) {
      reportData = await this.completionReportService.getCompletionReport(
        input.reportId,
      );
      if (!reportData) {
        return {
          content: [
            {
              type: 'text',
              text: `No ${contextIdentifier} found for reportId ${input.reportId}.`,
            },
            {
              type: 'text',
              text: JSON.stringify({
                notFound: true,
                contextHash: null,
                contextType: contextIdentifier,
                reportId: input.reportId,
              }),
            },
          ],
        };
      }
    } else if (input.taskId) {
      reportData =
        await this.completionReportService.getCompletionReportsByTaskId(
          input.taskId,
        );
      if (
        !reportData ||
        (Array.isArray(reportData) && reportData.length === 0)
      ) {
        return {
          content: [
            {
              type: 'text',
              text: `No ${contextIdentifier}s found for taskId ${input.taskId}.`,
            },
            {
              type: 'text',
              text: JSON.stringify({
                notFound: true, // or empty: true
                contextHash: null,
                contextType: contextIdentifier,
                taskId: input.taskId,
              }),
            },
          ],
        };
      }
    } else {
      return {
        content: [
          {
            type: 'text',
            text: `Error: Either reportId or taskId must be provided for ${contextIdentifier}.`,
          },
          {
            type: 'text',
            text: JSON.stringify({
              error: true,
              message: 'Either reportId or taskId must be provided.',
              contextType: contextIdentifier,
            }),
          },
        ],
      };
    }
    // Successful return, wrapped
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(reportData, null, 2),
        },
      ],
    };
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
