import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';
import { ContinueTaskSchema } from '../query/schemas/continue-task.schema';
import { GetCurrentModeForTaskSchema } from '../query/schemas/get-current-mode-for-task.schema';
import { GetTaskStatusSchema } from '../query/schemas/get-task-status.schema';
import { CompleteTaskSchema } from './schemas/complete-task.schema';
import { DelegateTaskSchema } from './schemas/delegate-task.schema';
import { RoleTransitionSchema } from './schemas/role-transition.schema';
import { UpdateTaskStatusSchema } from './schemas/update-task-status.schema';

@Injectable()
export class TaskStateService {
  constructor(private readonly prisma: PrismaService) {}

  async transitionRole(params: z.infer<typeof RoleTransitionSchema>) {
    try {
      const taskId = params.taskId;
      const toRole = params.toRole;
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
      // Get current task to track changes
      const currentTask = await this.prisma.task.findUnique({
        where: { taskId: params.taskId },
        select: {
          taskId: true,
          status: true,
          currentMode: true,
          priority: true,
          owner: true,
          completionDate: true,
        },
      });

      if (!currentTask) {
        throw new NotFoundException(`Task ${params.taskId} not found`);
      }

      // Build update data with all provided fields
      const updateData: any = {
        status: params.status,
      };

      // Update currentMode if provided
      if (params.currentMode) {
        updateData.currentMode = params.currentMode;
      }

      // Update priority if provided
      if (params.priority) {
        updateData.priority = params.priority;
      }

      // Update owner if provided
      if (params.owner) {
        updateData.owner = params.owner;
      }

      // Handle completion date - set automatically if status is completed, or use provided date
      if (params.status === 'completed') {
        updateData.completionDate = params.completionDate || new Date();
      } else if (params.completionDate) {
        updateData.completionDate = params.completionDate;
      }

      // Create workflow transition if mode changed
      if (
        params.currentMode &&
        params.currentMode !== currentTask.currentMode
      ) {
        updateData.workflowTransitions = {
          create: {
            fromMode: currentTask.currentMode || 'system',
            toMode: params.currentMode,
            transitionTimestamp: new Date(),
          },
        };
      }

      // Add comment if notes provided
      if (params.notes) {
        updateData.comments = {
          create: {
            mode: params.currentMode || currentTask.currentMode || 'system',
            content: params.notes,
            createdAt: new Date(),
          },
        };
      }

      const task = await this.prisma.task.update({
        where: { taskId: params.taskId },
        data: updateData,
        include: {
          workflowTransitions: {
            orderBy: { transitionTimestamp: 'desc' },
            take: 1,
          },
          comments: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
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

      // Auto-resume blocked or paused tasks
      if (task.status === 'Blocked' || task.status === 'Paused') {
        dataToUpdate.status = 'In Progress';
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
