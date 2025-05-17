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
} from '../schemas';

@Injectable()
export class TaskStateService {
  constructor(private readonly prisma: PrismaService) {}

  async updateTaskStatus(params: z.infer<typeof UpdateTaskStatusSchema>) {
    // This service will only handle the status and currentMode update.
    // Comment creation will be handled by TaskCommentService, called from the facade.
    try {
      const dataToUpdate: Prisma.TaskUpdateInput = {
        status: params.status,
      };
      if (params.currentMode) {
        dataToUpdate.currentMode = params.currentMode;
      }

      const updatedTask = await this.prisma.task.update({
        where: { taskId: params.taskId },
        data: dataToUpdate,
      });

      // Prisma P2025 (Record to update not found) is usually thrown by Prisma if task doesn't exist.
      // Explicit check is less critical here if relying on Prisma for that, but can be added if desired.
      // if (!updatedTask) {
      //   throw new NotFoundException(`Task with ID '${params.taskId}' not found for update.`);
      // }

      return updatedTask;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Task with ID '${params.taskId}' not found for status update (Prisma P2025).`,
        );
      }
      console.error(
        `Error in TaskStateService.updateTaskStatus for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Could not update status for task '${params.taskId}'.`,
      );
    }
  }

  async getTaskStatus(params: z.infer<typeof GetTaskStatusSchema>) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { taskId: params.taskId },
        select: {
          taskId: true,
          name: true,
          status: true,
          currentMode: true,
          creationDate: true,
          completionDate: true,
          comments: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
              content: true,
              createdAt: true,
            },
          },
        },
      });

      if (!task) {
        throw new NotFoundException(
          `Task with ID '${params.taskId}' not found.`,
        );
      }

      // Extract the latest note if available
      const latestNote =
        task.comments.length > 0 ? task.comments[0].content : null;

      return {
        taskId: task.taskId,
        name: task.name,
        status: task.status,
        currentMode: task.currentMode,
        creationDate: task.creationDate,
        completionDate: task.completionDate,
        latestNote,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(
        `Error in TaskStateService.getTaskStatus for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Could not get status for task '${params.taskId}'.`,
      );
    }
  }

  async delegateTask(params: z.infer<typeof DelegateTaskSchema>) {
    try {
      // Update the task's currentMode to reflect the delegation
      const task = await this.prisma.task.update({
        where: { taskId: params.taskId },
        data: {
          currentMode: params.toMode,
          // Optionally, we could also update status here if needed
          // For example, if delegated to "code-review", status might change to "needs-review"
        },
        select: {
          taskId: true,
          name: true,
          status: true,
          currentMode: true,
        },
      });

      // Return the updated task info
      return {
        taskId: task.taskId,
        name: task.name,
        status: task.status,
        currentMode: task.currentMode,
        fromMode: params.fromMode,
        toMode: params.toMode,
        delegationMessage: params.message || null,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Task with ID '${params.taskId}' not found for delegation (Prisma P2025).`,
        );
      }
      console.error(
        `Error in TaskStateService.delegateTask for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Could not delegate task '${params.taskId}' from '${params.fromMode}' to '${params.toMode}'.`,
      );
    }
  }

  async completeTask(params: z.infer<typeof CompleteTaskSchema>) {
    try {
      // Get the current task to check its current state
      const task = await this.prisma.task.findUnique({
        where: { taskId: params.taskId },
        select: {
          taskId: true,
          name: true,
          status: true,
          currentMode: true,
          completionDate: true,
        },
      });

      if (!task) {
        throw new NotFoundException(
          `Task with ID '${params.taskId}' not found.`,
        );
      }

      // Build the data to update
      const dataToUpdate: Prisma.TaskUpdateInput = {
        // Update the status
        status: params.status === 'completed' ? 'Completed' : 'Rejected',
      };

      // If completing the task, set the completionDate
      if (params.status === 'completed') {
        dataToUpdate.completionDate = new Date();
      }

      // Update the task with the new status and potentially completionDate
      const updatedTask = await this.prisma.task.update({
        where: { taskId: params.taskId },
        data: dataToUpdate,
        select: {
          taskId: true,
          name: true,
          status: true,
          currentMode: true,
          creationDate: true,
          completionDate: true,
        },
      });

      return {
        taskId: updatedTask.taskId,
        name: updatedTask.name,
        status: updatedTask.status,
        currentMode: updatedTask.currentMode,
        mode: params.mode,
        completionDate: updatedTask.completionDate,
        completionStatus: params.status,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Task with ID '${params.taskId}' not found for completion (Prisma P2025).`,
        );
      }
      console.error(
        `Error in TaskStateService.completeTask for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Could not complete task '${params.taskId}' with status '${params.status}'.`,
      );
    }
  }

  async getCurrentModeForTask(
    params: z.infer<typeof GetCurrentModeForTaskSchema>,
  ) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { taskId: params.taskId },
        select: {
          taskId: true,
          name: true,
          currentMode: true,
        },
      });

      if (!task) {
        throw new NotFoundException(
          `Task with ID '${params.taskId}' not found.`,
        );
      }

      return {
        taskId: task.taskId,
        name: task.name,
        currentMode: task.currentMode,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(
        `Error in TaskStateService.getCurrentModeForTask for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Could not get current mode for task '${params.taskId}'.`,
      );
    }
  }
}
