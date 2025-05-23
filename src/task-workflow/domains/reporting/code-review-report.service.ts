import { Injectable, NotFoundException } from '@nestjs/common';
import { CodeReview } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCodeReviewReportInput,
  UpdateCodeReviewReportInput,
  GetCodeReviewReportInput,
} from './schemas/code-review-report.schema';

@Injectable()
export class CodeReviewReportService {
  constructor(private readonly prisma: PrismaService) {}

  async createCodeReviewReport(
    data: CreateCodeReviewReportInput,
  ): Promise<CodeReview> {
    const {
      taskId,
      status,
      summary,
      strengths,
      issues,
      acceptanceCriteriaVerification,
      manualTestingResults,
      requiredChanges,
      // Legacy fields - convert to appropriate database fields
      findings,
      reviewer,
      commitSha,
      ...rest
    } = data;

    // Validate that the task exists
    const task = await this.prisma.task.findUnique({
      where: { taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }

    // Convert legacy findings array to issues string if provided
    let issuesString = issues || '';
    if (findings && findings.length > 0) {
      const findingsText = findings
        .map(
          (f) =>
            `${f.severity}: ${f.comment}${f.filePath ? ` (${f.filePath}${f.lineNumber ? `:${f.lineNumber}` : ''})` : ''}`,
        )
        .join('\n');
      issuesString = issuesString
        ? `${issuesString}\n\n--- Legacy Findings ---\n${findingsText}`
        : findingsText;
    }

    // Map fields to actual database schema
    const createData = {
      taskId,
      status,
      summary,
      strengths:
        strengths ||
        (reviewer ? `Reviewed by: ${reviewer}` : 'No specific strengths noted'),
      issues: issuesString || 'No issues identified',
      acceptanceCriteriaVerification: acceptanceCriteriaVerification || {},
      manualTestingResults:
        manualTestingResults || 'Manual testing not documented',
      requiredChanges: requiredChanges || null,
    };

    const report = await this.prisma.codeReview.create({
      data: createData,
      include: {
        task: true,
      },
    });
    return report;
  }

  async getCodeReviewReport(
    input: GetCodeReviewReportInput,
  ): Promise<CodeReview | CodeReview[]> {
    const { reportId, taskId } = input;

    if (reportId) {
      // Convert string ID to number
      const id = parseInt(reportId, 10);
      if (isNaN(id)) {
        throw new NotFoundException(`Invalid report ID: ${reportId}`);
      }

      const report = await this.prisma.codeReview.findUnique({
        where: { id },
        include: {
          task: true,
        },
      });

      if (!report) {
        throw new NotFoundException(
          `CodeReviewReport with ID ${id} not found.`,
        );
      }
      return report;
    }

    if (taskId) {
      const reports = await this.prisma.codeReview.findMany({
        where: { taskId },
        include: {
          task: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      return reports;
    }

    throw new Error('Either reportId or taskId must be provided');
  }

  async getCodeReviewReportsByTaskId(taskId: string): Promise<CodeReview[]> {
    const reports = await this.prisma.codeReview.findMany({
      where: { taskId },
      include: {
        task: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return reports;
  }

  async updateCodeReviewReport(
    data: UpdateCodeReviewReportInput,
  ): Promise<CodeReview> {
    const {
      reportId,
      status,
      summary,
      strengths,
      issues,
      acceptanceCriteriaVerification,
      manualTestingResults,
      requiredChanges,
      // Legacy fields
      findings,
      reviewer,
      commitSha,
      ...rest
    } = data;

    // Convert string ID to number
    const id = parseInt(reportId, 10);
    if (isNaN(id)) {
      throw new NotFoundException(`Invalid report ID: ${reportId}`);
    }

    // Check if report exists
    const existingReport = await this.prisma.codeReview.findUnique({
      where: { id },
    });
    if (!existingReport) {
      throw new NotFoundException(`CodeReviewReport with ID ${id} not found.`);
    }

    // Build update data
    const updateData: any = {};

    if (status !== undefined) updateData.status = status;
    if (summary !== undefined) updateData.summary = summary;
    if (strengths !== undefined) updateData.strengths = strengths;
    if (acceptanceCriteriaVerification !== undefined)
      updateData.acceptanceCriteriaVerification =
        acceptanceCriteriaVerification;
    if (manualTestingResults !== undefined)
      updateData.manualTestingResults = manualTestingResults;
    if (requiredChanges !== undefined)
      updateData.requiredChanges = requiredChanges;

    // Handle issues field
    if (issues !== undefined) {
      updateData.issues = issues;
    } else if (findings && findings.length > 0) {
      // Convert legacy findings to issues string
      const findingsText = findings
        .map(
          (f) =>
            `${f.severity}: ${f.comment}${f.filePath ? ` (${f.filePath}${f.lineNumber ? `:${f.lineNumber}` : ''})` : ''}`,
        )
        .join('\n');
      updateData.issues = findingsText;
    }

    const report = await this.prisma.codeReview.update({
      where: { id },
      data: updateData,
      include: {
        task: true,
      },
    });
    return report;
  }

  async deleteCodeReviewReport(id: number): Promise<CodeReview> {
    // Check if report exists before attempting to delete
    const existingReport = await this.prisma.codeReview.findUnique({
      where: { id },
    });
    if (!existingReport) {
      throw new NotFoundException(`CodeReviewReport with ID ${id} not found.`);
    }

    const report = await this.prisma.codeReview.delete({
      where: { id },
    });
    return report;
  }
}
