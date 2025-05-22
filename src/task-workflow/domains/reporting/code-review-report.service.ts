import { Injectable, NotFoundException } from '@nestjs/common';
import { CodeReview } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCodeReviewReportInput,
  UpdateCodeReviewReportInput,
} from './schemas/code-review-report.schema';

@Injectable()
export class CodeReviewReportService {
  constructor(private readonly prisma: PrismaService) {}

  async createCodeReviewReport(
    data: CreateCodeReviewReportInput,
  ): Promise<CodeReview> {
    const { taskId, status, summary, findings, ...rest } = data;

    // Validate that the task exists
    const task = await this.prisma.task.findUnique({
      where: { taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }

    // Explicitly map fields from input DTO to Prisma model
    const createData: any = {
      status,
      summary,
      strengths: rest.commitSha || 'N/A',
      issues: findings ? JSON.stringify(findings) : '[]',
      acceptanceCriteriaVerification: {},
      manualTestingResults: 'N/A',
      task: {
        connect: { taskId },
      },
    };

    const report = await this.prisma.codeReview.create({
      data: createData,
      include: {
        task: true,
      },
    });
    return report;
  }

  async getCodeReviewReport(id: number): Promise<CodeReview | null> {
    const report = await this.prisma.codeReview.findUnique({
      where: { id },
      include: {
        task: true,
      },
    });
    if (!report) {
      throw new NotFoundException(`CodeReviewReport with ID ${id} not found.`);
    }
    return report;
  }

  async getCodeReviewReportsByTaskId(taskId: string): Promise<CodeReview[]> {
    const reports = await this.prisma.codeReview.findMany({
      where: { taskId },
      include: {
        task: true,
      },
    });
    return reports;
  }

  async updateCodeReviewReport(
    reportId: number,
    data: UpdateCodeReviewReportInput,
  ): Promise<CodeReview> {
    const { taskId, findings, ...updatePayload } = data;

    const mappedUpdateData: any = { ...updatePayload };
    if (findings) {
      mappedUpdateData.issues = JSON.stringify(findings);
    }

    const report = await this.prisma.codeReview.update({
      where: { id: reportId },
      data: mappedUpdateData,
      include: {
        task: true,
      },
    });
    return report;
  }

  async deleteCodeReviewReport(id: number): Promise<CodeReview> {
    // Optional: Check if report exists before attempting to delete
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
