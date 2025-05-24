import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { z } from 'zod';
import { AddTaskNoteSchema } from './schemas/add-task-note.schema';

@Injectable()
export class TaskCommentService {
  constructor(private readonly prisma: PrismaService) {}

  // Corresponds to the dedicated add_task_note tool
  async addTaskNote(params: z.infer<typeof AddTaskNoteSchema>) {
    const { taskId, subtaskId, note, mode } = params;
    try {
      // Basic Task existence check (can be more robust or handled by facade)
      const task = await this.prisma.task.findUnique({
        where: { taskId },
        select: { taskId: true },
      });
      if (!task)
        throw new NotFoundException(
          `Task with ID '${taskId}' not found for adding note.`,
        );

      if (subtaskId) {
        const subtask = await this.prisma.subtask.findUnique({
          where: { id: subtaskId, taskId: taskId },
          select: { id: true },
        });
        if (!subtask)
          throw new NotFoundException(
            `Subtask ID ${subtaskId} not found for task '${taskId}'.`,
          );
      }

      return this.prisma.comment.create({
        data: {
          taskId,
          content: note,
          mode,
          subtaskId: subtaskId ?? undefined,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error(
        `Error in TaskCommentService.addTaskNote for task ${taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Could not add note to task '${taskId}'.`,
      );
    }
  }

  // This method would be called by the TaskWorkflowService facade during updateTaskStatus
  async createCommentForStatusUpdate(data: {
    taskId: string;
    notes: string;
    currentTaskMode?: string | null; // Mode of the task after update
    paramsMode?: string | null; // Mode from the original params, if any
  }) {
    const { taskId, notes, currentTaskMode, paramsMode } = data;
    try {
      // Basic Task existence check (can be more robust or handled by facade)
      // Not strictly needed if updateTaskStatus in TaskStateService already confirmed task existence.
      // const task = await this.prisma.task.findUnique({ where: { taskId }, select: { taskId: true } });
      // if (!task) throw new NotFoundException(`Task '${taskId}' not found for adding status update note.`);

      const commentMode = paramsMode || currentTaskMode || 'system';
      return this.prisma.comment.create({
        data: { taskId, content: notes, mode: commentMode },
      });
    } catch (error) {
      console.error(
        `Error creating comment during status update for task ${taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Could not create comment during status update for task '${taskId}'.`,
      );
    }
  }
}
