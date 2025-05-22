import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, TaskDescription } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaskDescriptionInput } from './schemas/update-task-description.schema';

@Injectable()
export class TaskDescriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async updateTaskDescription(
    params: UpdateTaskDescriptionInput,
  ): Promise<TaskDescription> {
    const {
      taskId: rawTaskId,
      description,
      businessRequirements,
      technicalRequirements,
      acceptanceCriteria,
    } = params;

    const taskId = String(rawTaskId); // Ensure taskId is a string

    try {
      // 1. Ensure the TaskDescription exists, as we are doing a strict update.
      //    findUniqueOrThrow would simplify this if your Prisma version supports it well for this use case.
      const existingTaskDescription =
        await this.prisma.taskDescription.findUnique({
          where: { taskId },
        });

      if (!existingTaskDescription) {
        throw new NotFoundException(
          `TaskDescription for Task ID '${taskId}' not found. Cannot update.`,
        );
      }

      // 2. Construct the update payload for Prisma
      const updateData: Prisma.TaskDescriptionUpdateInput = {};

      // Only include fields in the update payload if they were actually provided in the params
      if ('description' in params) {
        updateData.description = description as string;
      }
      if ('businessRequirements' in params) {
        // If the field is in params, use its value (which could be null if Zod schema allows)
        updateData.businessRequirements = businessRequirements as string;
      }
      if ('technicalRequirements' in params) {
        updateData.technicalRequirements = technicalRequirements as string;
      }
      if ('acceptanceCriteria' in params) {
        updateData.acceptanceCriteria = acceptanceCriteria
          ? (acceptanceCriteria as Prisma.JsonArray) // Cast if it's string[] and DB is Json
          : Prisma.JsonNull; // Explicitly set to null if input was null/empty and DB is Json
      }

      // Filter out any keys that ended up with an undefined value,
      // though explicit checks above should handle most cases.
      const finalUpdateData = Object.entries(updateData).reduce(
        (acc, [key, value]) => {
          if (value !== undefined) {
            acc[key as keyof Prisma.TaskDescriptionUpdateInput] = value as any;
          }
          return acc;
        },
        {} as Prisma.TaskDescriptionUpdateInput,
      );

      if (Object.keys(finalUpdateData).length === 0) {
        // No actual fields were provided for update (e.g., empty params or only undefined values)
        return existingTaskDescription; // Return existing as no update is performed
      }

      // 3. Perform the update
      return await this.prisma.taskDescription.update({
        where: { taskId },
        data: finalUpdateData,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(
        `Error in TaskDescriptionService.updateTaskDescription for task ${taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Could not update task description for task ID '${taskId}'. Error: ${(error as Error).message}`,
      );
    }
  }

  async getTaskDescription(rawTaskId: string): Promise<TaskDescription | null> {
    const taskId = String(rawTaskId);
    try {
      const taskDescription = await this.prisma.taskDescription.findUnique({
        where: { taskId },
      });

      if (!taskDescription) {
        return null;
      }
      return taskDescription;
    } catch (error) {
      console.error(
        `Error in TaskDescriptionService.getTaskDescription for task ${taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Could not retrieve task description for task ID '${taskId}'. Error: ${(error as Error).message}`,
      );
    }
  }
}
