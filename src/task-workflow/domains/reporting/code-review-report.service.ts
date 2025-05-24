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
    } = data;

    // Validate that the task exists
    const task = await this.prisma.task.findUnique({
      where: { taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }

    // Map fields directly to database schema - no legacy field conversion needed
    const createData = {
      taskId,
      status,
      summary,
      strengths,
      issues,
      acceptanceCriteriaVerification: acceptanceCriteriaVerification || {},
      manualTestingResults,
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
      // reportId is already a number from the schema
      const id = reportId;

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
    } = data;

    // reportId is now correctly typed as number from schema
    const id = reportId;

    // Check if report exists
    const existingReport = await this.prisma.codeReview.findUnique({
      where: { id },
    });
    if (!existingReport) {
      throw new NotFoundException(`CodeReviewReport with ID ${id} not found.`);
    }

    // Build update data - direct field mapping without legacy conversion
    const updateData: Partial<{
      status: string;
      summary: string;
      strengths: string;
      issues: string;
      acceptanceCriteriaVerification: any;
      manualTestingResults: string;
      requiredChanges: string;
    }> = {};

    if (status !== undefined) updateData.status = status;
    if (summary !== undefined) updateData.summary = summary;
    if (strengths !== undefined) updateData.strengths = strengths;
    if (issues !== undefined) updateData.issues = issues;
    if (acceptanceCriteriaVerification !== undefined)
      updateData.acceptanceCriteriaVerification =
        acceptanceCriteriaVerification;
    if (manualTestingResults !== undefined)
      updateData.manualTestingResults = manualTestingResults;
    if (requiredChanges !== undefined)
      updateData.requiredChanges = requiredChanges;

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
