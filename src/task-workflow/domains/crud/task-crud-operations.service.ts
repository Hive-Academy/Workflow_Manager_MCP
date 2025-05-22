import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';
import { CreateTaskSchema } from './schemas/create-task.schema';
import { DeleteTaskSchema } from './schemas/delete-task.schema';
import { UpdateTaskDescriptionSchema } from './schemas/update-task-description.schema';
import {
  SearchTasksInputSchema,
  PaginatedTaskSummary,
} from './schemas/search-tasks.schema';

import { TaskCrudService } from './task-crud.service';
import { TaskDescriptionService } from './task-description.service';
import { TaskQueryService } from '../query/task-query.service';

import { TaskDescription } from 'generated/prisma';

@Injectable()
export class TaskCrudOperationsService {
  constructor(
    private readonly taskCrudService: TaskCrudService,
    private readonly taskDescriptionService: TaskDescriptionService,
    private readonly taskQueryService: TaskQueryService,
  ) {}

  @Tool({
    name: 'create_task',
    description: 'Creates a new core task entry in the workflow system.',
    parameters: CreateTaskSchema,
  })
  async createTask(params: z.infer<typeof CreateTaskSchema>): Promise<any> {
    try {
      const newTask = await this.taskCrudService.createTask(params);
      return {
        content: [
          {
            type: 'text',
            text: `Task '${newTask.name}' (ID: ${newTask.taskId}) created successfully with status '${newTask.status}'. Description provided: ${params.description ? 'Yes' : 'No'}`,
          },
        ],
      };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }
      const taskIdString = String(params.taskId);
      console.error(
        `TaskCrudOperationsService Error in createTask for ${taskIdString}:`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskCrudOperationsService: Could not create task '${taskIdString}'. Error: ${(error as Error).message}`,
      );
    }
  }

  @Tool({
    name: 'update_task_description',
    description:
      'Updates the description, requirements, or acceptance criteria of a task.',
    parameters: UpdateTaskDescriptionSchema,
  })
  async updateTaskDescription(
    params: z.infer<typeof UpdateTaskDescriptionSchema>,
  ): Promise<any> {
    try {
      const updatedDescription: TaskDescription =
        await this.taskDescriptionService.updateTaskDescription(params);
      return {
        content: [
          {
            type: 'text',
            text: `Task description for ID '${updatedDescription.taskId}' updated successfully.`,
          },
          {
            type: 'json',
            json: { ...updatedDescription },
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
      const taskIdString = String(params.taskId);
      console.error(
        `TaskCrudOperationsService Error in updateTaskDescription for ${taskIdString}:`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskCrudOperationsService: Could not update task description for '${taskIdString}'. Error: ${(error as Error).message}`,
      );
    }
  }

  @Tool({
    name: 'delete_task',
    description:
      'Deletes a task and all its associated data from the database.',
    parameters: DeleteTaskSchema,
  })
  async deleteTask(params: z.infer<typeof DeleteTaskSchema>) {
    try {
      await this.taskCrudService.deleteTask(params);
      return {
        content: [
          {
            type: 'text',
            text: `Task '${String(params.taskId)}' and all its associated data deleted successfully.`,
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
      const taskIdString = String(params.taskId);
      console.error(`Facade Error in deleteTask for ${taskIdString}:`, error);
      throw new InternalServerErrorException(
        `Facade: Could not delete task '${taskIdString}'.`,
      );
    }
  }

  @Tool({
    name: 'search_tasks',
    description:
      'Searches and filters tasks with pagination based on various criteria.',
    parameters: SearchTasksInputSchema,
  })
  async searchTasksTool(
    params: z.infer<typeof SearchTasksInputSchema>,
  ): Promise<any> {
    try {
      const result: PaginatedTaskSummary =
        await this.taskQueryService.searchTasks(params);
      return {
        content: [
          {
            type: 'json',
            json: result,
          },
        ],
      };
    } catch (error) {
      console.error(
        `TaskCrudOperationsService Error in searchTasksTool:`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskCrudOperationsService: Could not search tasks. Error: ${(error as Error).message}`,
      );
    }
  }
}
