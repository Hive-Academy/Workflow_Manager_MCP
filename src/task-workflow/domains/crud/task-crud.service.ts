import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';
import { CreateTaskSchema } from './schemas/create-task.schema';
import { DeleteTaskSchema } from './schemas/delete-task.schema';
// Assuming schemas are in a parent/sibling dir

@Injectable()
export class TaskCrudService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(params: z.infer<typeof CreateTaskSchema>) {
    try {
      // Check if any TaskDescription fields are provided
      const hasTaskDescriptionData =
        params.description ||
        params.businessRequirements ||
        params.technicalRequirements ||
        params.acceptanceCriteria;

      // Use transaction to ensure consistency between Task and TaskDescription creation
      const result = await this.prisma.$transaction(async (tx) => {
        // Create the main Task record
        const newTask = await tx.task.create({
          data: {
            taskId: params.taskId,
            name: params.taskName,
            status: 'Not Started',
            currentMode: 'boomerang',
          },
        });

        // Create TaskDescription if any description fields are provided
        if (hasTaskDescriptionData) {
          await tx.taskDescription.create({
            data: {
              taskId: params.taskId,
              description: params.description || 'To be defined',
              businessRequirements:
                params.businessRequirements || 'To be defined',
              technicalRequirements:
                params.technicalRequirements || 'To be defined',
              acceptanceCriteria: params.acceptanceCriteria || [],
            },
          });
        }

        return newTask;
      });

      return result;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Task with ID '${params.taskId}' already exists.`,
        );
      }
      console.error(
        `Error creating task ${params.taskId} in TaskCrudService:`,
        error,
      );
      throw new InternalServerErrorException(
        `Could not create task '${params.taskId}'. ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async deleteTask(params: z.infer<typeof DeleteTaskSchema>) {
    const { taskId } = params;
    // Initial existence check (optional here, could be in TaskWorkflowService facade)
    const taskExists = await this.prisma.task.findUnique({
      where: { taskId },
      select: { taskId: true },
    });
    if (!taskExists) {
      throw new NotFoundException(
        `Task with ID '${taskId}' not found for deletion.`,
      );
    }

    // Transactional deletion logic (as previously in TaskWorkflowService)
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.comment.deleteMany({ where: { taskId } });
        await tx.delegationRecord.deleteMany({ where: { taskId } });
        await tx.subtask.deleteMany({ where: { taskId } });
        await tx.implementationPlan.deleteMany({ where: { taskId } });
        await tx.taskDescription.deleteMany({ where: { taskId } });
        await tx.codeReview.deleteMany({ where: { taskId } });
        await tx.completionReport.deleteMany({ where: { taskId } });
        await tx.researchReport.deleteMany({ where: { taskId } });
        await tx.workflowTransition.deleteMany({ where: { taskId } });
        await tx.task.delete({ where: { taskId } });
      });
    } catch (error) {
      console.error(
        `Error in $transaction while deleting task ${taskId}:`,
        error,
      );
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown transactional error';
      throw new InternalServerErrorException(
        `Transaction failed while deleting task '${taskId}'. Reason: ${errorMessage}`,
      );
    }
  }
}
