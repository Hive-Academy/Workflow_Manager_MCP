import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';
import { ProcessCommandService } from './process-command.service';
import { AddTaskNoteSchema } from './schemas/add-task-note.schema';
import { ProcessCommandSchema } from './schemas/process-command.schema';
import { TaskCommentService } from './task-comment.service';

@Injectable()
export class TaskInteractionOperationsService {
  constructor(
    private readonly taskCommentService: TaskCommentService,
    private readonly processCommandService: ProcessCommandService,
  ) {}

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

  @Tool({
    name: 'process_command',
    description: 'Processes slash commands for workflow management.',
    parameters: ProcessCommandSchema,
  })
  async processCommand(
    params: z.infer<typeof ProcessCommandSchema>,
  ): Promise<any> {
    // This service method directly returns the result from the business service,
    // assuming it is already in the correct MCP response format or doesn't need one.
    try {
      return await this.processCommandService.processCommand(params);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }
      console.error(
        `TaskInteractionOperationsService Error in processCommand for command '${params.command_string}':`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskInteractionOperationsService: Could not process command '${params.command_string}'. Error: ${(error as Error).message}`,
      );
    }
  }
}
