import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateResearchReportInput,
  ResearchReport,
  UpdateResearchReportInput,
} from '../schemas/research-report.schema';
import { Prisma } from 'generated/prisma';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class ResearchReportService {
  constructor(private readonly prisma: PrismaService) {}

  private parseReportId(reportIdString: string): number {
    const reportIdNum = parseInt(reportIdString, 10);
    if (isNaN(reportIdNum)) {
      throw new BadRequestException(
        'Invalid report ID format. Must be a number.',
      );
    }
    return reportIdNum;
  }

  async createResearchReport(
    data: CreateResearchReportInput,
  ): Promise<ResearchReport> {
    try {
      const reportData: Prisma.ResearchReportCreateInput = {
        task: { connect: { taskId: data.taskId } },
        title: data.title,
        summary: data.summary,
        findings: data.findings,
        recommendations: data.recommendations as string,
        references: data.references
          ? (data.references as Prisma.InputJsonValue)
          : Prisma.JsonNull,
      };

      const report = await this.prisma.researchReport.create({
        data: reportData,
      });
      return report as unknown as ResearchReport;
    } catch (error) {
      console.error('Error creating research report:', error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException(
            `Task with ID '${data.taskId}' not found or other relation error.`,
          );
        }
      }
      throw new InternalServerErrorException(
        'Could not create research report.',
      );
    }
  }

  async getResearchReportById(
    reportIdString: string,
  ): Promise<ResearchReport | null> {
    const reportId = this.parseReportId(reportIdString);
    try {
      const report = await this.prisma.researchReport.findUnique({
        where: { id: reportId },
      });
      if (!report) {
        return null;
      }
      return report as unknown as ResearchReport;
    } catch (error) {
      console.error(
        `Error fetching research report with ID '${reportIdString}':`,
        error,
      );
      throw new InternalServerErrorException(
        'Could not retrieve research report.',
      );
    }
  }

  async getResearchReportsByTaskId(taskId: string): Promise<ResearchReport[]> {
    try {
      const reports = await this.prisma.researchReport.findMany({
        where: { taskId },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return reports as unknown as ResearchReport[];
    } catch (error) {
      console.error(
        `Error fetching research reports for task ID '${taskId}':`,
        error,
      );
      throw new InternalServerErrorException(
        'Could not retrieve research reports for the task.',
      );
    }
  }

  async updateResearchReport(
    reportIdString: string,
    data: UpdateResearchReportInput,
  ): Promise<ResearchReport> {
    const reportId = this.parseReportId(reportIdString);
    const { reportId: _, ...updateData } = data;

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('No data provided for update.');
    }

    const dataToUpdate: Prisma.ResearchReportUpdateInput = {
      updatedAt: new Date(),
    };

    if (updateData.title !== undefined) dataToUpdate.title = updateData.title;
    if (updateData.summary !== undefined)
      dataToUpdate.summary = updateData.summary;
    if (updateData.findings !== undefined)
      dataToUpdate.findings = updateData.findings;

    if (Object.prototype.hasOwnProperty.call(updateData, 'recommendations')) {
      dataToUpdate.recommendations =
        updateData.recommendations === undefined
          ? ''
          : updateData.recommendations;
    }

    if (Object.prototype.hasOwnProperty.call(updateData, 'references')) {
      dataToUpdate.references = updateData.references
        ? (updateData.references as Prisma.InputJsonValue)
        : Prisma.JsonNull;
    }

    const updateKeys = Object.keys(dataToUpdate);
    if (
      updateKeys.length <= 1 &&
      !updateKeys.some((key) => key !== 'updatedAt')
    ) {
      throw new BadRequestException('No updatable fields provided.');
    }

    try {
      const updatedReport = await this.prisma.researchReport.update({
        where: { id: reportId },
        data: dataToUpdate,
      });
      return updatedReport as unknown as ResearchReport;
    } catch (error) {
      console.error(
        `Error updating research report with ID '${reportIdString}':`,
        error,
      );
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Research report with ID '${reportIdString}' not found.`,
        );
      }
      throw new InternalServerErrorException(
        'Could not update research report.',
      );
    }
  }

  // Potentially add deleteResearchReport if needed
}
