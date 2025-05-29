import { Injectable, Logger } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  QueryReportsSchema,
  QueryReportsInput,
} from './schemas/query-reports.schema';

/**
 * Query Reports Service
 *
 * Pre-configured report queries for all report types with evidence relationships.
 */
@Injectable()
export class QueryReportsService {
  private readonly logger = new Logger(QueryReportsService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Tool({
    name: 'query_reports',
    description: `
Pre-configured report queries for all report types with evidence relationships.

**Report Types:**
- research: Research findings and recommendations
- code_review: Quality assessments and approval status
- completion: Task completion summaries and verification

**Modes:**
- summary: Key fields only (status, ratings, authors)
- detailed: Complete report content (default)
- evidence_focused: Reports + supporting evidence/comments

**Examples:**
- All reports: { taskId: "TSK-001", reportTypes: ["research", "code_review", "completion"] }
- Code review only: { taskId: "TSK-001", reportTypes: ["code_review"], mode: "detailed" }
- Evidence focused: { taskId: "TSK-001", mode: "evidence_focused", includeComments: true }
`,
    parameters: QueryReportsSchema,
  })
  async queryReports(input: QueryReportsInput): Promise<any> {
    try {
      const {
        taskId,
        reportTypes,
        mode,
        includeComments,
        includeEvidence,
        reviewStatus,
        researchedBy,
        reviewedBy,
      } = input;

      const reports: any = {};

      // Research reports
      if (reportTypes.includes('research')) {
        const researchWhere: any = { taskId };
        if (researchedBy) researchWhere.researchedBy = researchedBy;

        if (mode === 'summary') {
          reports.research = await this.prisma.researchReport.findMany({
            where: researchWhere,
            select: {
              taskId: true,
              findings: true,
              createdAt: true,
            },
          });
        } else {
          const researchInclude: any = {};
          if (includeComments && mode === 'evidence_focused') {
            // Note: comments are not directly related to research, get separately
          }

          reports.research = await this.prisma.researchReport.findMany({
            where: researchWhere,
            include: researchInclude,
          });
        }
      }

      // Code review reports
      if (reportTypes.includes('code_review')) {
        const reviewWhere: any = { taskId };
        if (reviewStatus) reviewWhere.status = reviewStatus;
        if (reviewedBy) reviewWhere.reviewedBy = reviewedBy;

        if (mode === 'summary') {
          reports.codeReview = await this.prisma.codeReview.findMany({
            where: reviewWhere,
            select: {
              taskId: true,
              status: true,
              summary: true,
              createdAt: true,
            },
          });
        } else {
          reports.codeReview = await this.prisma.codeReview.findMany({
            where: reviewWhere,
          });
        }
      }

      // Completion reports
      if (reportTypes.includes('completion')) {
        if (mode === 'summary') {
          reports.completion = await this.prisma.completionReport.findMany({
            where: { taskId },
            select: {
              taskId: true,
              summary: true,
              createdAt: true,
            },
          });
        } else {
          reports.completion = await this.prisma.completionReport.findMany({
            where: { taskId },
          });
        }
      }

      // Evidence gathering for evidence_focused mode
      if (mode === 'evidence_focused' && includeEvidence) {
        reports.evidence = {
          delegations: await this.prisma.delegationRecord.findMany({
            where: { taskId },
            orderBy: { delegationTimestamp: 'desc' },
          }),
          transitions: await this.prisma.workflowTransition.findMany({
            where: { taskId },
            orderBy: { transitionTimestamp: 'desc' },
          }),
        };

        if (includeComments) {
          reports.evidence.comments = await this.prisma.comment.findMany({
            where: { taskId },
            orderBy: { createdAt: 'desc' },
          });
        }
      }

      // Summary stats
      const summary = {
        taskId,
        reportTypes: reportTypes.filter(
          (type) =>
            reports[type === 'code_review' ? 'codeReview' : type]?.length > 0,
        ),
        mode,
        totals: {
          research: reports.research?.length || 0,
          codeReview: reports.codeReview?.length || 0,
          completion: reports.completion?.length || 0,
        },
      };

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                data: { summary, reports },
                metadata: { taskId, mode, reportTypes },
              },
              null,
              2,
            ),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: false,
                error: { message: error.message, code: 'QUERY_REPORTS_FAILED' },
              },
              null,
              2,
            ),
          },
        ],
      };
    }
  }
}
