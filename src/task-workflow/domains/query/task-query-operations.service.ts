import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { TOKEN_MAPS } from '../../types/token-refs.schema';
import { z } from 'zod';
import { TaskStateService } from '../state/task-state.service';
import { ContextManagementService } from './context-management.service';
import { ContinueTaskSchema } from './schemas/continue-task.schema';
import { GetContextDiffSchema } from './schemas/get-context-diff.schema';
import { GetCurrentModeForTaskSchema } from './schemas/get-current-mode-for-task.schema';
import { GetTaskContextSchema } from './schemas/get-task-context.schema';
import { GetTaskStatusSchema } from './schemas/get-task-status.schema';
import { ListTasksSchema } from './schemas/list-tasks.schema';
import { TaskDashboardParamsSchema } from './schemas/task-dashboard.schema';
import { WorkflowMapSchema } from './schemas/workflow-map.schema';
import { WorkflowStatusSchema } from './schemas/workflow-status.schema';
import { TaskQueryService } from './task-query.service';

@Injectable()
export class TaskQueryOperationsService {
  constructor(
    private readonly taskQueryService: TaskQueryService,
    private readonly contextManagementService: ContextManagementService,
    private readonly taskStateService: TaskStateService, // Added here, can be removed if not used by any tool in this service
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
        throw new NotFoundException(
          `Task context not found for ID: ${params.taskId}`,
        );
      }

      const {
        task,
        taskDescription,
        currentImplementationPlan,
        recentComments,
      } = fullContext;

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
        simplifiedContext.recentComments = recentComments
          .slice(0, 5)
          .map((comment: any) => ({
            mode: comment.mode,
            content:
              comment.content.substring(0, 100) +
              (comment.content.length > 100 ? '...' : ''),
            createdAt: comment.createdAt,
          }));
      }

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
        `TaskQueryOperationsService Error in getTaskContext for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskQueryOperationsService: Could not get context for task '${params.taskId}'. Error: ${(error as Error).message}`,
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
      console.error('TaskQueryOperationsService Error in listTasks:', error);
      throw new InternalServerErrorException(
        'TaskQueryOperationsService: Could not list tasks.',
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
      // Assuming taskStateService.getTaskStatus actually returns the status correctly and is suitable here.
      // The IP mentions TaskQueryOperationsService, but the original facade uses taskStateService.
      // For now, sticking to the original service call to maintain behavior, but this might need review by Architect.
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
        `TaskQueryOperationsService Error in getTaskStatus for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskQueryOperationsService: Could not get status for task '${params.taskId}'.`,
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
      // Original facade uses taskStateService for this.
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
        `TaskQueryOperationsService Error in getCurrentModeForTask for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskQueryOperationsService: Could not get current mode for task '${params.taskId}'.`,
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
      console.error(
        'TaskQueryOperationsService Error in taskDashboard:',
        error,
      );
      throw new InternalServerErrorException(
        'TaskQueryOperationsService: Could not fetch dashboard data.',
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
      if (
        error instanceof InternalServerErrorException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      console.error('TaskQueryOperationsService Error in workflowMap:', error);
      throw new InternalServerErrorException(
        'TaskQueryOperationsService: Could not generate workflow map.',
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
      console.error(
        'TaskQueryOperationsService Error in workflowStatus:',
        error,
      );
      throw new InternalServerErrorException(
        'TaskQueryOperationsService: Could not get workflow status.',
      );
    }
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
        `TaskQueryOperationsService Error in getContextDiff for ${params.taskId}, sliceType ${params.sliceType}:`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskQueryOperationsService: Could not get context diff for task '${params.taskId}'. Error: ${(error as Error).message}`,
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
      const taskContext: {
        task: any;
        taskDescription: any;
        currentImplementationPlan: any;
        latestDelegation: any;
        latestResearchReport: any;
        latestCodeReview: any;
        recentComments: any;
      } = await this.taskQueryService.continueTask(params);

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
        `TaskQueryOperationsService Error in continueTask for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskQueryOperationsService: Could not get continuation context for task '${params.taskId}'.`,
      );
    }
  }

  // Tools will be added here
}
