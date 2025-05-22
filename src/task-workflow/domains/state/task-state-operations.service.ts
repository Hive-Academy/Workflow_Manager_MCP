import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';
import { TaskCommentService } from '../interaction/task-comment.service';
import { ContextManagementService } from '../query/context-management.service';
import { TaskQueryService } from '../query/task-query.service';
import { CompleteTaskSchema } from './schemas/complete-task.schema';
import { DelegateTaskSchema } from './schemas/delegate-task.schema';
import { UpdateTaskStatusSchema } from './schemas/update-task-status.schema';
import { TaskStateService } from './task-state.service';
import { RoleTransitionSchema } from './schemas/role-transition.schema';

@Injectable()
export class TaskStateOperationsService {
  constructor(
    private readonly taskStateService: TaskStateService,
    private readonly taskCommentService: TaskCommentService,
    private readonly contextManagementService: ContextManagementService,
    private readonly taskQueryService: TaskQueryService,
  ) {}

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
        `TaskStateOperationsService Error in updateTaskStatus for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskStateOperationsService: Could not update status for task '${params.taskId}'.`,
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

      if (params.message) {
        await this.taskCommentService.addTaskNote({
          taskId: params.taskId,
          note: `Delegation from ${params.fromMode} to ${params.toMode}: ${params.message}`,
          mode: params.fromMode,
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
        `TaskStateOperationsService Error in delegateTask for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskStateOperationsService: Could not delegate task '${params.taskId}'.`,
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

      if (params.notes) {
        await this.taskCommentService.addTaskNote({
          taskId: params.taskId,
          note: `Task ${params.status === 'completed' ? 'completed' : 'rejected'} by ${params.mode}: ${params.notes}`,
          mode: params.mode,
        });
      }

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
        `TaskStateOperationsService Error in completeTask for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskStateOperationsService: Could not complete task '${params.taskId}'.`,
      );
    }
  }

  @Tool({
    name: 'handle_role_transition',
    description:
      'Handles the transition of a task between different roles/modes.',
    parameters: RoleTransitionSchema,
  })
  async handleRoleTransition(
    params: z.infer<typeof RoleTransitionSchema>,
  ): Promise<any> {
    try {
      const { roleId, taskId, fromRole, focus, refs, contextHash } = params;

      const taskState = await this.taskStateService.getTaskStatus({ taskId });
      if (!taskState) {
        throw new NotFoundException(
          `Task with ID ${taskId} not found for role transition.`,
        );
      }

      // Fetch full context using the injected TaskQueryService (business layer)
      // This assumes taskQueryService.getTaskContext returns the necessary data structure.
      // If the MCP-formatted response from TaskQueryOperationsService.getTaskContext tool is needed,
      // then TaskQueryOperationsService would need to be injected and its tool method called.
      // For now, sticking to the pattern of MCP services calling business services.
      const fullContext = await this.taskQueryService.getTaskContext({
        taskId,
      });
      if (!fullContext || !fullContext.task) {
        throw new NotFoundException(
          `Task full context not found via TaskQueryService for ID: ${taskId}`,
        );
      }
      // Simplified context for hashing and diffing, similar to original facade's getTaskContext
      const simplifiedCurrentContext: any = {
        taskId: fullContext.task.taskId,
        name: fullContext.task.name,
        status: fullContext.task.status,
        currentMode: fullContext.task.currentMode,
        creationDate: fullContext.task.creationDate,
        completionDate: fullContext.task.completionDate,
      };
      if (fullContext.taskDescription) {
        simplifiedCurrentContext.description =
          fullContext.taskDescription.description;
        simplifiedCurrentContext.acceptanceCriteria =
          fullContext.taskDescription.acceptanceCriteria;
      }
      if (fullContext.currentImplementationPlan) {
        simplifiedCurrentContext.implementationPlanSummary = {
          id: fullContext.currentImplementationPlan.id,
          totalSubtasks:
            fullContext.currentImplementationPlan.subtasks?.length || 0,
          completedSubtasks:
            fullContext.currentImplementationPlan.subtasks?.filter(
              (st: any) => st.status === 'completed' || st.status === 'COM',
            ).length || 0,
        };
      }
      if (fullContext.recentComments && fullContext.recentComments.length > 0) {
        simplifiedCurrentContext.recentComments = fullContext.recentComments
          .slice(0, 5)
          .map((comment: any) => ({
            mode: comment.mode,
            content:
              comment.content.substring(0, 100) +
              (comment.content.length > 100 ? '...' : ''),
            createdAt: comment.createdAt,
          }));
      }

      const currentContextHash = this.contextManagementService.hashContext(
        simplifiedCurrentContext,
      );

      let contextDiff = null;
      if (contextHash && contextHash !== currentContextHash) {
        const oldContext =
          this.contextManagementService.getContextByHash(contextHash);
        contextDiff = oldContext
          ? this.contextManagementService.diffContext(
              oldContext,
              simplifiedCurrentContext,
            )
          : { __isNew: true, ...simplifiedCurrentContext };
      }
      this.contextManagementService.cacheContext(simplifiedCurrentContext);

      if (taskState.status !== roleId) {
        // taskState.status is the task's actual status, roleId is the target mode.
        const actualCurrentMode = (
          await this.taskStateService.getCurrentModeForTask({ taskId })
        ).currentMode;
        if (actualCurrentMode !== roleId) {
          await this.taskStateService.updateTaskStatus({
            taskId,
            status: taskState.status, // Preserve existing status
            currentMode: roleId, // Update currentMode to the new roleId
          });
        }
      }

      const transitionNote = `Role transition: ${fromRole || 'N/A'} -> ${roleId}. Focus: ${focus}. Refs: ${refs ? refs.join(', ') : 'none'}`;
      await this.taskCommentService.addTaskNote({
        taskId,
        note: transitionNote,
        mode: 'system',
      });

      const taskName = simplifiedCurrentContext.name || taskId;

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
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }
      console.error(
        `TaskStateOperationsService Error in handleRoleTransition for task ${params.taskId} to role ${params.roleId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskStateOperationsService: Could not handle role transition for task '${params.taskId}'. Error: ${(error as Error).message}`,
      );
    }
  }
}
