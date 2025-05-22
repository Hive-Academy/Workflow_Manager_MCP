import { Injectable, NotFoundException } from '@nestjs/common';

import { CompletionReport, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCompletionReportInput,
  UpdateCompletionReportInput,
} from './schemas/completion-report.schema';

@Injectable()
export class CompletionReportService {
  constructor(private readonly prisma: PrismaService) {}

  async createCompletionReport(
    data: CreateCompletionReportInput,
  ): Promise<CompletionReport> {
    const task = await this.prisma.task.findUnique({
      where: { taskId: data.taskId },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID "${data.taskId}" not found.`);
    }

    const reportCreateInput: Prisma.CompletionReportCreateInput = {
      task: { connect: { taskId: data.taskId } },
      summary: data.summary,
      delegationSummary: data.delegationSummary,
      filesModified:
        data.filesModified !== undefined
          ? (data.filesModified as Prisma.InputJsonValue) // Use InputJsonValue if available
          : Prisma.JsonNullValueInput.JsonNull, // Use JsonNullValueInput.JsonNull
      acceptanceCriteriaVerification:
        data.acceptanceCriteriaVerification !== undefined
          ? (data.acceptanceCriteriaVerification as Prisma.InputJsonValue)
          : Prisma.JsonNullValueInput.JsonNull,
    };

    const report = await this.prisma.completionReport.create({
      data: reportCreateInput,
    });
    return report as unknown as CompletionReport;
  }

  async getCompletionReport(id: string): Promise<CompletionReport | null> {
    const reportId = parseInt(id, 10);
    if (isNaN(reportId)) {
      throw new NotFoundException(
        `Invalid report ID format: "${id}". Must be an integer.`,
      );
    }
    const report = await this.prisma.completionReport.findUnique({
      where: { id: reportId },
    });
    if (!report) {
      return null;
    }
    return report as unknown as CompletionReport;
  }

  async getCompletionReportsByTaskId(
    taskId: string,
  ): Promise<CompletionReport[]> {
    const reports = await this.prisma.completionReport.findMany({
      where: { taskId },
    });
    return reports as unknown as CompletionReport[];
  }

  async updateCompletionReport(
    id: string,
    data: UpdateCompletionReportInput,
  ): Promise<CompletionReport> {
    const reportId = parseInt(id, 10);
    if (isNaN(reportId)) {
      throw new NotFoundException(
        `Invalid report ID format: "${id}". Must be an integer.`,
      );
    }

    const existingReport = await this.prisma.completionReport.findUnique({
      where: { id: reportId },
    });
    if (!existingReport) {
      throw new NotFoundException(
        `CompletionReport with ID "${reportId}" not found.`,
      );
    }

    const reportUpdateInput: Prisma.CompletionReportUpdateInput = {
      summary: data.summary,
      delegationSummary: data.delegationSummary,
      filesModified:
        data.filesModified !== undefined
          ? (data.filesModified as Prisma.InputJsonValue) // Use InputJsonValue if available
          : undefined,
      acceptanceCriteriaVerification:
        data.acceptanceCriteriaVerification !== undefined
          ? (data.acceptanceCriteriaVerification as Prisma.InputJsonValue)
          : undefined,
    };

    const report = await this.prisma.completionReport.update({
      where: { id: reportId },
      data: reportUpdateInput,
    });
    return report as unknown as CompletionReport;
  }

  async deleteCompletionReport(id: string): Promise<CompletionReport> {
    const reportId = parseInt(id, 10);
    if (isNaN(reportId)) {
      throw new NotFoundException(
        `Invalid report ID format: "${id}". Must be an integer.`,
      );
    }
    const existingReport = await this.prisma.completionReport.findUnique({
      where: { id: reportId },
    });
    if (!existingReport) {
      throw new NotFoundException(
        `CompletionReport with ID "${reportId}" not found for deletion.`,
      );
    }

    const report = await this.prisma.completionReport.delete({
      where: { id: reportId },
    });
    return report as unknown as CompletionReport;
  }
}
