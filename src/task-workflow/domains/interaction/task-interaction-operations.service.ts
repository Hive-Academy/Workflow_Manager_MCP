import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';
import { AddTaskNoteSchema } from './schemas/add-task-note.schema';
import { TaskCommentService } from './task-comment.service';

@Injectable()
export class TaskInteractionOperationsService {
  constructor(private readonly taskCommentService: TaskCommentService) {}

  // Tools will be migrated here
  @Tool({
    name: 'add_task_note',
    description:
      'Adds a note (comment) to a specified task, optionally linking it to a subtask.',
    parameters: AddTaskNoteSchema,
  })
  async addTaskNote(params: z.infer<typeof AddTaskNoteSchema>) {
    try {
      const createdComment = await this.taskCommentService.addTaskNote(params);
      return {
        content: [
          {
            type: 'text',
            text: `Note added successfully to task '${params.taskId}'. Comment ID: ${createdComment.id}`,
          },
        ],
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }
      console.error(
        `TaskInteractionOperationsService Error in addTaskNote for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskInteractionOperationsService: Could not add note to task '${params.taskId}'.`,
      );
    }
  }
}
