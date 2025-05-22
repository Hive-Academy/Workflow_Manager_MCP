import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { z } from 'zod';
import {
  UpdateTaskStatusSchema,
  GetTaskStatusSchema,
  DelegateTaskSchema,
  CompleteTaskSchema,
  GetCurrentModeForTaskSchema,
  ContinueTaskSchema,
  RoleTransitionSchema,
} from '../schemas';

@Injectable()
export class TaskStateService {
  constructor(private readonly prisma: PrismaService) {}

  async transitionRole(params: z.infer<typeof RoleTransitionSchema>) {
    try {
      const taskId = params.taskId;
      const toRole = params.roleId;
      const fromRole = params.fromRole || 'system';

      // Update the task's currentMode and status, and log the delegation
      const updateData: Prisma.TaskUpdateInput = {
        currentMode: toRole,
        workflowTransitions: {
          create: {
            fromMode: fromRole,
            toMode: toRole,
            transitionTimestamp: new Date(),
          },
        },
      };

      const task = await this.prisma.task.update({
        where: { taskId },
        data: updateData,
        include: {
          workflowTransitions: {
            orderBy: { transitionTimestamp: 'desc' },
            take: 1,
          },
        },
      });

      return {
        task,
        latestTransition: task.workflowTransitions[0],
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Task ${params.taskId} not found`);
        }
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to transition role: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('Failed to transition role');
    }
  }

  async updateTaskStatus(params: z.infer<typeof UpdateTaskStatusSchema>) {
    try {
      const task = await this.prisma.task.update({
        where: { taskId: params.taskId },
        data: {
          status: params.status,
          comments: params.notes
            ? {
                create: {
                  mode: 'system',
                  content: params.notes,
                  createdAt: new Date(),
                },
              }
            : undefined,
        },
      });

      return task;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Task ${params.taskId} not found`);
        }
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to update task status: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('Failed to update task status');
    }
  }

  async getTaskStatus(params: z.infer<typeof GetTaskStatusSchema>) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { taskId: params.taskId },
        include: {
          comments: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
        },
      });

      if (!task) {
        throw new NotFoundException(`Task ${params.taskId} not found`);
      }

      return {
        status: task.status,
        recentComments: task.comments,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to get task status: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('Failed to get task status');
    }
  }

  async delegateTask(params: z.infer<typeof DelegateTaskSchema>) {
    try {
      const task = await this.prisma.task.update({
        where: { taskId: params.taskId },
        data: {
          currentMode: params.toMode,
          delegationRecords: {
            create: {
              fromMode: params.fromMode,
              toMode: params.toMode,
              delegationTimestamp: new Date(),
            },
          },
        },
        include: {
          delegationRecords: {
            orderBy: { delegationTimestamp: 'desc' },
            take: 1,
          },
        },
      });

      return {
        task,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Task ${params.taskId} not found`);
        }
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to delegate task: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('Failed to delegate task');
    }
  }

  async completeTask(params: z.infer<typeof CompleteTaskSchema>) {
    try {
      const task = await this.prisma.task.update({
        where: { taskId: params.taskId },
        data: {
          status: params.status,
        },
      });

      return {
        task,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Task ${params.taskId} not found`);
        }
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to complete task: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('Failed to complete task');
    }
  }

  async getCurrentModeForTask(
    params: z.infer<typeof GetCurrentModeForTaskSchema>,
  ) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { taskId: params.taskId },
        select: {
          currentMode: true,
        },
      });

      if (!task) {
        throw new NotFoundException(`Task ${params.taskId} not found`);
      }

      return {
        currentMode: task.currentMode,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to get current mode: ${error.message}`,
        );
      }
      throw new InternalServerErrorException('Failed to get current mode');
    }
  }

  async continueTask(params: z.infer<typeof ContinueTaskSchema>) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { taskId: params.taskId },
        select: { status: true, currentMode: true },
      });

      if (!task) {
        throw new NotFoundException(
          `Task with ID '${params.taskId}' not found for continuation.`,
        );
      }

      const dataToUpdate: Prisma.TaskUpdateInput = {};

      if (params.newStatus) {
        dataToUpdate.status = params.newStatus;
      } else if (task.status === 'Blocked' || task.status === 'Paused') {
        dataToUpdate.status = 'In Progress';
      }

      if (params.assignToMode) {
        dataToUpdate.currentMode = params.assignToMode;
      }

      if (Object.keys(dataToUpdate).length === 0) {
        // Return current task state if no updates were made to status or mode
        // Use findUniqueOrThrow to ensure a task is returned or an error is thrown
        return this.prisma.task.findUniqueOrThrow({
          where: { taskId: params.taskId },
          select: { taskId: true, name: true, status: true, currentMode: true },
        });
      }

      const updatedTask = await this.prisma.task.update({
        where: { taskId: params.taskId },
        data: dataToUpdate,
        select: {
          taskId: true,
          name: true,
          status: true,
          currentMode: true,
        },
      });
      return updatedTask;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Task with ID '${params.taskId}' not found during update for continuation (Prisma P2025).`,
        );
      }
      console.error(
        `Error in TaskStateService.continueTask for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Could not continue task '${params.taskId}'.`,
      );
    }
  }
}
