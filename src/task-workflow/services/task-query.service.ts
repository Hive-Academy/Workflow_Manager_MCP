import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { z } from 'zod';
import { GetTaskContextSchema, ListTasksSchema } from '../schemas';

@Injectable()
export class TaskQueryService {
  constructor(private readonly prisma: PrismaService) {}

  async getTaskContext(params: z.infer<typeof GetTaskContextSchema>) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { taskId: params.taskId },
        include: {
          taskDescription: true,
          implementationPlans: true,
          // Potentially include other relations here as needed for full context
        },
      });

      if (!task) {
        throw new NotFoundException(
          `Task with ID '${params.taskId}' not found.`,
        );
      }
      return task; // Return the raw task object with relations
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error(
        `Error in TaskQueryService.getTaskContext for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Could not fetch context for task '${params.taskId}'.`,
      );
    }
  }

  async listTasks(params: z.infer<typeof ListTasksSchema>) {
    try {
      const { status, skip, take } = params;
      const whereClause: Prisma.TaskWhereInput = {};
      if (status) whereClause.status = status;

      const effectiveTake = take || 50;
      const effectiveSkip = skip || undefined;

      const tasks = await this.prisma.task.findMany({
        where: whereClause,
        skip: effectiveSkip,
        take: effectiveTake,
        orderBy: { creationDate: 'desc' },
        select: {
          taskId: true,
          name: true,
          status: true,
          currentMode: true,
          creationDate: true,
          completionDate: true,
          priority: true,
        },
      });

      const totalTasks = await this.prisma.task.count({ where: whereClause });

      return {
        tasks,
        totalTasks,
        currentPage:
          effectiveSkip && effectiveTake
            ? Math.floor(effectiveSkip / effectiveTake) + 1
            : 1,
        pageSize: effectiveTake,
        totalPages: Math.ceil(totalTasks / effectiveTake),
      }; // Return structured list data
    } catch (error) {
      console.error('Error in TaskQueryService.listTasks:', error);
      throw new InternalServerErrorException('Could not list tasks.');
    }
  }
}
