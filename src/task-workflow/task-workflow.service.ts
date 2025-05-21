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
  GetCurrentModeForTaskSchema,
  GetTaskContextSchema,
  GetTaskStatusSchema,
  ListTasksSchema,
  UpdateTaskStatusSchema,
  ContinueTaskSchema,
  TaskDashboardParamsSchema,
  WorkflowMapSchema,
  TransitionRoleSchema,
  WorkflowStatusSchema,
  ProcessCommandSchema,
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

  @Tool({
    name: 'get_current_mode_for_task',
    description: 'Gets the current mode/role that owns a specific task.',
    parameters: GetCurrentModeForTaskSchema,
  })
  async getCurrentModeForTask(
    params: z.infer<typeof GetCurrentModeForTaskSchema>,
  ) {
    try {
      const result = await this.taskStateService.getCurrentModeForTask(params);
      return {
        content: [
          {
            type: 'text',
            text: `Current mode for task '${params.taskId}' is '${result.currentMode}'.`,
          },
          {
            type: 'json',
            json: result,
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
        `Facade Error in getCurrentModeForTask for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Facade: Could not get current mode for task '${params.taskId}'.`,
      );
    }
  }

  @Tool({
    name: 'continue_task',
    description:
      'Retrieves context for continuing a task, including status and recent notes.',
    parameters: ContinueTaskSchema,
  })
  async continueTask(params: z.infer<typeof ContinueTaskSchema>) {
    try {
      const taskContext = await this.taskQueryService.continueTask(params);
      return {
        content: [
          {
            type: 'text',
            text: `Context for continuing task '${params.taskId}' retrieved. Status: ${taskContext.status}, Mode: ${taskContext.currentMode}.`,
          },
          {
            type: 'json',
            json: taskContext,
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
        `Facade Error in continueTask for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Facade: Could not get continuation context for task '${params.taskId}'.`,
      );
    }
  }

  @Tool({
    name: 'task_dashboard',
    description:
      'Provides a summary of all current tasks, aggregated by status and mode.',
    parameters: TaskDashboardParamsSchema,
  })
  async taskDashboard(/* params: z.infer<typeof TaskDashboardParamsSchema> */) {
    // No params used yet
    try {
      const dashboardData = await this.taskQueryService.getTaskDashboardData();
      return {
        content: [
          {
            type: 'text',
            text: `Dashboard: ${dashboardData.totalTasks} total tasks. Status breakdown: ${JSON.stringify(dashboardData.tasksByStatus)}. Mode breakdown: ${JSON.stringify(dashboardData.tasksByMode)}`,
          },
          {
            type: 'json',
            json: dashboardData,
          },
        ],
      };
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      console.error('Facade Error in taskDashboard:', error);
      throw new InternalServerErrorException(
        'Facade: Could not fetch dashboard data.',
      );
    }
  }

  @Tool({
    name: 'workflow_map',
    description:
      'Displays a Mermaid diagram of the workflow, optionally highlighting the current task\'s mode.',
    parameters: WorkflowMapSchema,
  })
  async workflowMap(params: z.infer<typeof WorkflowMapSchema>) {
    try {
      return await this.taskQueryService.getWorkflowMap(params);
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      console.error('Facade Error in workflowMap:', error);
      throw new InternalServerErrorException(
        'Facade: Could not generate workflow map.',
      );
    }
  }
  @Tool({
    name: 'transition_role',
    description: 'Transitions a task between different roles/modes in the workflow.',
    parameters: TransitionRoleSchema,
  })
  async transitionRole(params: z.infer<typeof TransitionRoleSchema>) {
    try {
      const result = await this.taskStateService.transitionRole(params);
      // Format the response as in the legacy tool
      const fromEmoji = '';
      const toEmoji = '';
      const displayTaskName = result.name || params.taskId;
      const textContent = `# ✈️ Role Transition: ${fromEmoji} ${params.fromRole.replace('-role','')} -> ${toEmoji} ${params.toRole.replace('-role','')}
\nTask '${displayTaskName}' (ID: ${result.taskId}) has transitioned from **${params.fromRole.replace('-role','')}** to **${params.toRole.replace('-role','')}**.\n\n${params.summary ? `## Summary from ${params.fromRole.replace('-role','')}:
${params.summary}
\n` : ''}The task is now with ${toEmoji} ${params.toRole.replace('-role','')}. The new role should now take over.`;
      return {
        content: [
          {
            type: 'text',
            text: textContent,
          },
          {
            type: 'json',
            json: result,
          },
        ],
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }
      console.error('Facade Error in transitionRole:', error);
      throw new InternalServerErrorException('Facade: Could not transition role.');
    }
  }
  @Tool({
    name: 'workflow_status',
    description: 'Gets the detailed workflow status for a specific task.',
    parameters: WorkflowStatusSchema,
  })
  async workflowStatus(params: z.infer<typeof WorkflowStatusSchema>) {
    try {
      return await this.taskQueryService.getWorkflowStatus(params);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }
      console.error('Facade Error in workflowStatus:', error);
      throw new InternalServerErrorException('Facade: Could not get workflow status.');
    }
  }
  @Tool({
    name: 'process_command',
    description: 'Processes slash commands for workflow management.',
    parameters: ProcessCommandSchema,
  })
  async processCommand(params: z.infer<typeof ProcessCommandSchema>) {
    const { command_string } = params;
    if (!command_string.startsWith('/')) {
      return { content: [{ type: 'text', text: 'Invalid command format. Commands must start with /' }] };
    }
    const parts = command_string.substring(1).split(' ');
    const command = parts[0].toLowerCase();
    const cmdArgs = parts.slice(1);
    try {
      switch (command) {
        case 'next-role':
          // Example: /next-role TSK-001
          if (cmdArgs.length < 1) return { content: [{ type: 'text', text: 'Usage: /next-role [task-id]' }] };
          // You may want to implement next-role logic or call transitionRole
          return { content: [{ type: 'text', text: 'Not implemented: next-role' }] };
        case 'role':
          // Example: /role architect TSK-002
          if (cmdArgs.length < 2) return { content: [{ type: 'text', text: 'Usage: /role [role-name] [task-id]' }] };
          return await this.transitionRole({
            taskId: cmdArgs[1],
            fromRole: 'unknown', // You may want to fetch the current role
            toRole: cmdArgs[0] + '-role',
            summary: `Manual transition to ${cmdArgs[0]}-role`,
          });
        case 'workflow-status':
          // Example: /workflow-status TSK-003
          if (cmdArgs.length < 1) return { content: [{ type: 'text', text: 'Usage: /workflow-status [task-id]' }] };
          return await this.workflowStatus({ taskId: cmdArgs[0] });
        case 'research':
          // Example: /research topic TSK-004
          return { content: [{ type: 'text', text: 'Not implemented: research' }] };
        default:
          return { content: [{ type: 'text', text: `Unknown command: ${command}. Available commands: /next-role, /role, /workflow-status, /research` }] };
      }
    } catch (error) {
      return { content: [{ type: 'text', text: `Error processing command: ${error instanceof Error ? error.message : String(error)}` }] };
    }
  }
  // Other tool methods (those not yet refactored into specialized services) would remain here for now.
}
