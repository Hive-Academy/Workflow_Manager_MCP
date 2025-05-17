import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
// PrismaService is no longer directly used by the facade for most operations
// import { PrismaService } from '../prisma/prisma.service';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';
// Prisma types might still be needed for some specific error handling or complex scenarios, evaluate per method
import {
  AddTaskNoteSchema,
  CompleteTaskSchema,
  CreateTaskSchema,
  DeleteTaskSchema,
  DelegateTaskSchema,
  GetTaskContextSchema,
  GetTaskStatusSchema,
  ListTasksSchema,
  UpdateTaskStatusSchema,
} from './schemas';
import {
  TaskCommentService,
  TaskCrudService,
  TaskQueryService,
  TaskStateService,
} from './services';

@Injectable()
export class TaskWorkflowService {
  // This is now a Facade
  constructor(
    // Remove direct PrismaService injection if all DB logic is in specialized services
    // private readonly prisma: PrismaService,
    private readonly taskCrudService: TaskCrudService,
    private readonly taskQueryService: TaskQueryService,
    private readonly taskStateService: TaskStateService,
    private readonly taskCommentService: TaskCommentService,
  ) {}

  @Tool({
    name: 'create_task',
    description: 'Creates a new core task entry in the workflow system.',
    parameters: CreateTaskSchema,
  })
  async createTask(params: z.infer<typeof CreateTaskSchema>) {
    try {
      // Delegate to TaskCrudService
      const newTask = await this.taskCrudService.createTask(params);
      // Format MCP response
      return {
        content: [
          {
            type: 'text',
            text: `Task '${newTask.name}' (ID: ${newTask.taskId}) created successfully with status '${newTask.status}'. Description provided: ${params.description ? 'Yes' : 'No'}`,
          },
        ],
      };
    } catch (error) {
      // Handle errors thrown by the service, re-throw as MCP-appropriate exceptions if needed
      // Or, let NestJS default exception filters handle them if they are standard (NotFound, Conflict, etc.)
      if (
        error instanceof ConflictException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }
      // Fallback for unexpected errors from the service layer
      console.error(`Facade Error in createTask for ${params.taskId}:`, error);
      throw new InternalServerErrorException(
        `Facade: Could not create task '${params.taskId}'.`,
      );
    }
  }

  @Tool({
    name: 'get_task_context',
    description:
      'Retrieves the context for a given task, including its description, implementation plan, and current state from the database.',
    parameters: GetTaskContextSchema,
  })
  async getTaskContext(params: z.infer<typeof GetTaskContextSchema>) {
    try {
      const task = await this.taskQueryService.getTaskContext(params);
      return {
        content: [
          {
            type: 'text',
            text: `Found task: ID=${task.taskId}, Name=${task.name}, Status=${task.status}, Mode=${task.currentMode}. Description and Plans included if they exist.`,
          },
          {
            type: 'json',
            json: task,
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
        `Facade Error in getTaskContext for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Facade: Could not get context for task '${params.taskId}'.`,
      );
    }
  }

  @Tool({
    name: 'update_task_status',
    description:
      'Updates the status, current mode, and optionally adds notes for a specific task.',
    parameters: UpdateTaskStatusSchema,
  })
  async updateTaskStatus(params: z.infer<typeof UpdateTaskStatusSchema>) {
    try {
      const updatedTask = await this.taskStateService.updateTaskStatus(params);

      if (params.notes) {
        await this.taskCommentService.createCommentForStatusUpdate({
          taskId: params.taskId,
          notes: params.notes,
          currentTaskMode: updatedTask.currentMode,
          paramsMode: params.currentMode,
        });
      }

      let responseText = `Task '${updatedTask.name}' (ID: ${updatedTask.taskId}) status updated to '${updatedTask.status}'.`;
      if (params.currentMode) {
        responseText += ` Current mode set to '${updatedTask.currentMode}'.`;
      }
      if (params.notes) {
        responseText += ` Notes: ${params.notes}`;
      }

      return {
        content: [
          {
            type: 'text',
            text: responseText,
          },
          {
            type: 'json',
            json: updatedTask,
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
        `Facade Error in updateTaskStatus for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Facade: Could not update status for task '${params.taskId}'.`,
      );
    }
  }

  @Tool({
    name: 'list_tasks',
    description:
      'Lists tasks from the database, with optional filtering by status and pagination.',
    parameters: ListTasksSchema,
  })
  async listTasks(params: z.infer<typeof ListTasksSchema>) {
    try {
      const listData = await this.taskQueryService.listTasks(params);
      return {
        content: [
          {
            type: 'text',
            text: `Found ${listData.tasks.length} tasks out of ${listData.totalTasks} total matching criteria.`,
          },
          {
            type: 'json',
            json: listData,
          },
        ],
      };
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      console.error('Facade Error in listTasks:', error);
      throw new InternalServerErrorException('Facade: Could not list tasks.');
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
      await this.taskCrudService.deleteTask(params); // deleteTask in service might not return anything or just a boolean
      return {
        content: [
          {
            type: 'text',
            text: `Task '${params.taskId}' and all its associated data deleted successfully.`,
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
      console.error(`Facade Error in deleteTask for ${params.taskId}:`, error);
      throw new InternalServerErrorException(
        `Facade: Could not delete task '${params.taskId}'.`,
      );
    }
  }

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
          {
            type: 'json',
            json: createdComment,
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
      console.error(`Facade Error in addTaskNote for ${params.taskId}:`, error);
      throw new InternalServerErrorException(
        `Facade: Could not add note to task '${params.taskId}'.`,
      );
    }
  }

  @Tool({
    name: 'get_task_status',
    description: 'Retrieves the current status of a task from the database.',
    parameters: GetTaskStatusSchema,
  })
  async getTaskStatus(params: z.infer<typeof GetTaskStatusSchema>) {
    try {
      const taskStatus = await this.taskStateService.getTaskStatus(params);

      return {
        content: [
          {
            type: 'text',
            text: `Task '${taskStatus.name}' (ID: ${taskStatus.taskId}) has status '${taskStatus.status}' and is currently owned by ${taskStatus.currentMode || 'no one'}.`,
          },
          {
            type: 'json',
            json: taskStatus,
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
        `Facade Error in getTaskStatus for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Facade: Could not get status for task '${params.taskId}'.`,
      );
    }
  }

  @Tool({
    name: 'delegate_task',
    description:
      'Delegates a task from one mode/role to another, updating its ownership and status.',
    parameters: DelegateTaskSchema,
  })
  async delegateTask(params: z.infer<typeof DelegateTaskSchema>) {
    try {
      const delegatedTask = await this.taskStateService.delegateTask(params);

      // If a message is provided, add it as a note
      if (params.message) {
        await this.taskCommentService.addTaskNote({
          taskId: params.taskId,
          note: `Delegation from ${params.fromMode} to ${params.toMode}: ${params.message}`,
          mode: params.fromMode, // The note is attributed to the delegating mode
        });
      }

      return {
        content: [
          {
            type: 'text',
            text: `Task '${delegatedTask.name}' (ID: ${delegatedTask.taskId}) delegated from '${params.fromMode}' to '${params.toMode}'${params.message ? ' with message' : ''}.`,
          },
          {
            type: 'json',
            json: delegatedTask,
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
        `Facade Error in delegateTask for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Facade: Could not delegate task '${params.taskId}'.`,
      );
    }
  }

  @Tool({
    name: 'complete_task',
    description:
      'Marks a task as completed or rejected by a mode, potentially returning it to the delegator.',
    parameters: CompleteTaskSchema,
  })
  async completeTask(params: z.infer<typeof CompleteTaskSchema>) {
    try {
      const completedTask = await this.taskStateService.completeTask(params);

      // If notes are provided, add them as a comment
      if (params.notes) {
        await this.taskCommentService.addTaskNote({
          taskId: params.taskId,
          note: `Task ${params.status === 'completed' ? 'completed' : 'rejected'} by ${params.mode}: ${params.notes}`,
          mode: params.mode,
        });
      }

      // Format for display whether task was completed or rejected
      const statusText =
        params.status === 'completed' ? 'successfully completed' : 'rejected';

      return {
        content: [
          {
            type: 'text',
            text: `Task '${completedTask.name}' (ID: ${completedTask.taskId}) has been ${statusText} by ${params.mode}${params.notes ? ' with notes' : ''}.`,
          },
          {
            type: 'json',
            json: completedTask,
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
        `Facade Error in completeTask for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Facade: Could not complete task '${params.taskId}'.`,
      );
    }
  }
  // Other tool methods (those not yet refactored into specialized services) would remain here for now.
}
