import {
  BadRequestException,
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
  ContinueTaskSchema,
  DelegateTaskSchema,
  GetContextDiffSchema,
  GetCurrentModeForTaskSchema,
  GetTaskContextSchema,
  GetTaskStatusSchema,
  RoleTransitionSchema as HandleRoleTransitionInputSchema,
  ListTasksSchema,
  ProcessCommandSchema,
  ShorthandCommandSchema,
  TaskDashboardParamsSchema,
  TOKEN_MAPS,
  UpdateTaskStatusSchema,
  WorkflowMapSchema,
  WorkflowStatusSchema,
} from './schemas';
import {
  ContextManagementService,
  ProcessCommandService,
  ShorthandParserService,
  TaskCommentService,
  TaskQueryService,
  TaskStateService,
} from './services';

@Injectable()
export class TaskWorkflowService {
  // This is now a Facade
  constructor(
    private readonly taskQueryService: TaskQueryService,
    private readonly taskStateService: TaskStateService,
    private readonly taskCommentService: TaskCommentService,
    private readonly processCommandService: ProcessCommandService,
    private readonly contextManagementService: ContextManagementService,
    private readonly shorthandParserService: ShorthandParserService,
  ) {}

  @Tool({
    name: 'get_task_context',
    description:
      'Retrieves the context for a given task, including its description, implementation plan, and current state from the database.',
    parameters: GetTaskContextSchema,
  })
  async getTaskContext(params: z.infer<typeof GetTaskContextSchema>) {
    try {
      const fullContext = await this.taskQueryService.getTaskContext(params);

      if (!fullContext || !fullContext.task) {
        // This case should ideally be handled by taskQueryService throwing a NotFoundException
        // but as a safeguard in the facade:
        throw new NotFoundException(
          `Task context not found for ID: ${params.taskId}`,
        );
      }

      const {
        task,
        taskDescription,
        currentImplementationPlan,
        // latestDelegation, // Example of omitting for brevity
        // latestResearchReport,
        // latestCodeReview,
        // latestCompletionReport,
        recentComments,
      } = fullContext;

      // Prepare a simplified JSON response
      const simplifiedContext: any = {
        taskId: task.taskId,
        name: task.name,
        status: task.status,
        currentMode: task.currentMode,
        creationDate: task.creationDate,
        completionDate: task.completionDate,
      };

      if (taskDescription) {
        simplifiedContext.description = taskDescription.description;
        simplifiedContext.acceptanceCriteria =
          taskDescription.acceptanceCriteria;
      }

      if (currentImplementationPlan) {
        simplifiedContext.implementationPlanSummary = {
          id: currentImplementationPlan.id,
          totalSubtasks: currentImplementationPlan.subtasks?.length || 0,
          completedSubtasks:
            currentImplementationPlan.subtasks?.filter(
              (st: any) => st.status === 'completed' || st.status === 'COM',
            ).length || 0,
        };
      }

      if (recentComments && recentComments.length > 0) {
        // Take top 3-5 comments, and only essential fields
        simplifiedContext.recentComments = recentComments
          .slice(0, 5) // Take max 5
          .map((comment: any) => ({
            mode: comment.mode,
            content:
              comment.content.substring(0, 100) +
              (comment.content.length > 100 ? '...' : ''), // Truncate long comments
            createdAt: comment.createdAt,
          }));
      }

      // Other fields like latestDelegation, latestResearchReport etc. are intentionally omitted for brevity
      // to keep the general context lean. Specific tools can be used to fetch those details if needed.

      return {
        content: [
          {
            type: 'json',
            json: simplifiedContext,
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
        `Facade: Could not get context for task '${params.taskId}'. Error: ${(error as Error).message}`,
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
  async listTasks() {
    try {
      const listData = await this.taskQueryService.listTasks();
      return {
        content: [
          {
            type: 'text',
            text: `Found ${listData.length} tasks matching criteria.`,
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
            text: `Task has status '${taskStatus.status}'.`,
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
            text: `Task '${delegatedTask.task.name}' (ID: ${delegatedTask.task.taskId}) delegated from '${params.fromMode}' to '${params.toMode}'${params.message ? ' with message' : ''}.`,
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
            text: `Task '${completedTask.task.name}' (ID: ${completedTask.task.taskId}) has been ${statusText} by ${params.mode}${params.notes ? ' with notes' : ''}.`,
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
            text: `Context for continuing task '${taskContext.task?.taskId}' retrieved.`,
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
  async taskDashboard() {
    // No params used yet
    try {
      const dashboardData = await this.taskQueryService.getTaskDashboard();
      return {
        content: [
          {
            type: 'text',
            text: `Dashboard: ${dashboardData.totalTasks} total tasks. Status breakdown: ${JSON.stringify(dashboardData.tasksByStatus)}. Mode breakdown: ${JSON.stringify(dashboardData.tasksByMode)}`,
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
      "Displays a Mermaid diagram of the workflow, optionally highlighting the current task's mode.",
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
    name: 'handle_role_transition',
    description:
      'Handles role transition with token-efficient context management, updating task mode and logging.',
    parameters: HandleRoleTransitionInputSchema,
  })
  async handleRoleTransition(
    params: z.infer<typeof HandleRoleTransitionInputSchema>,
  ): Promise<any> {
    try {
      const { roleId, taskId, fromRole, focus, refs, contextHash } = params;

      // 1. Get current task state (especially currentMode)
      const taskState = await this.taskStateService.getTaskStatus({ taskId });
      if (!taskState) {
        throw new NotFoundException(
          `Task with ID ${taskId} not found for role transition.`,
        );
      }

      // 2. Fetch full context for diffing and caching (simplified version for now)
      const fullContextResponse = await this.getTaskContext({ taskId });
      const currentContextData =
        fullContextResponse.content[0].type === 'json'
          ? fullContextResponse.content[0].json
          : {};
      const currentContextHash =
        this.contextManagementService.hashContext(currentContextData);

      let contextDiff = null;
      if (contextHash && contextHash !== currentContextHash) {
        const oldContext =
          this.contextManagementService.getContextByHash(contextHash);
        contextDiff = oldContext
          ? this.contextManagementService.diffContext(
              oldContext,
              currentContextData,
            )
          : { __isNew: true, ...currentContextData };
      }
      this.contextManagementService.cacheContext(currentContextData);

      // 3. Update task's current mode if different from roleId
      if (taskState.status !== roleId) {
        const actualCurrentMode = (
          await this.taskStateService.getCurrentModeForTask({ taskId })
        ).currentMode;
        if (actualCurrentMode !== roleId) {
          await this.taskStateService.updateTaskStatus({
            taskId,
            status: taskState.status,
            currentMode: roleId,
          });
        }
      }

      // 4. Add a note for the transition
      const transitionNote = `Role transition: ${fromRole || 'N/A'} -> ${roleId}. Focus: ${focus}. Refs: ${refs ? refs.join(', ') : 'none'}`;
      await this.taskCommentService.addTaskNote({
        taskId,
        note: transitionNote,
        mode: 'system',
      });

      const taskName = currentContextData.name || taskId;

      return {
        content: [
          {
            type: 'text',
            text: `Transitioned to role ${roleId} for task '${taskName}'. Focus: ${focus}. Context hash: ${currentContextHash}.`,
          },
          {
            type: 'json',
            json: {
              role: roleId,
              task: {
                id: taskId,
                name: taskName,
                status: taskState.status,
                currentMode: roleId,
              },
              focus,
              refs: refs || [],
              contextHash: currentContextHash,
              contextChanged: !!contextDiff,
              changes: contextDiff,
            },
          },
        ],
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error(
        `Facade Error in handleRoleTransition for task ${params.taskId} to role ${params.roleId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Facade: Could not handle role transition for task '${params.taskId}'. Error: ${(error as Error).message}`,
      );
    }
  }

  @Tool({
    name: 'workflow_status',
    description: 'Gets the detailed workflow status for a specific task.',
    parameters: WorkflowStatusSchema,
  })
  async workflowStatus(params: z.infer<typeof WorkflowStatusSchema>) {
    try {
      const textData = await this.taskQueryService.getWorkflowStatus(params);
      return {
        content: [
          {
            type: 'text',
            text: textData,
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
      console.error('Facade Error in workflowStatus:', error);
      throw new InternalServerErrorException(
        'Facade: Could not get workflow status.',
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
    return await this.processCommandService.processCommand(params);
  }

  @Tool({
    name: 'get_context_diff',
    description:
      'Gets only what has changed in the task context since last retrieval, or a specific slice of context.',
    parameters: GetContextDiffSchema,
  })
  async getContextDiff(params: z.infer<typeof GetContextDiffSchema>) {
    try {
      const { taskId, lastContextHash, sliceType } = params;

      let currentContextData;
      let contextIdentifier = sliceType || 'full';

      if (sliceType) {
        const mappedSliceType = TOKEN_MAPS.document[sliceType] || sliceType;
        currentContextData =
          await this.contextManagementService.getContextSlice(
            taskId,
            mappedSliceType,
          );
        contextIdentifier = mappedSliceType;
      } else {
        const fullContextResponse = await this.getTaskContext({ taskId });
        currentContextData =
          fullContextResponse.content[0].type === 'json'
            ? fullContextResponse.content[0].json
            : {};
      }

      const currentHash =
        this.contextManagementService.hashContext(currentContextData);

      if (lastContextHash === currentHash) {
        return {
          content: [
            {
              type: 'text',
              text: `No changes to ${contextIdentifier} context for task ${taskId} since last retrieval.`,
            },
            {
              type: 'json',
              json: {
                unchanged: true,
                contextHash: currentHash,
                contextType: contextIdentifier,
              },
            },
          ],
        };
      }

      const oldContextData =
        this.contextManagementService.getContextByHash(lastContextHash);
      const diff = this.contextManagementService.diffContext(
        oldContextData,
        currentContextData,
      );

      this.contextManagementService.cacheContext(currentContextData);

      return {
        content: [
          {
            type: 'text',
            text: `${contextIdentifier} context for task ${taskId} updated.`,
          },
          {
            type: 'json',
            json: {
              contextHash: currentHash,
              contextType: contextIdentifier,
              changes: diff,
            },
          },
        ],
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(
        `Facade Error in getContextDiff for ${params.taskId}, sliceType ${params.sliceType}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Facade: Could not get context diff for task '${params.taskId}'. Error: ${(error as Error).message}`,
      );
    }
  }

  @Tool({
    name: 'shorthand_command',
    description:
      'Executes a shorthand command for more token-efficient operations.',
    parameters: ShorthandCommandSchema,
  })
  async executeShorthandCommand(
    params: z.infer<typeof ShorthandCommandSchema>,
  ): Promise<any> {
    try {
      const { taskId, command } = params;
      return await this.shorthandParserService.parseAndExecute(taskId, command);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      console.error(
        `Facade Error in executeShorthandCommand for task ${params.taskId}, command '${params.command}':`,
        error,
      );
      throw new InternalServerErrorException(
        `Facade: Could not execute shorthand command '${params.command}' for task '${params.taskId}'. Error: ${(error as Error).message}`,
      );
    }
  }
}
