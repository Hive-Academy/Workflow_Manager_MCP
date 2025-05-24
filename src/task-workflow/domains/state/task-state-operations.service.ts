import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';
import { TaskStatus } from 'src/task-workflow/types/token-refs.schema';
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

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                taskId: updatedTask.taskId,
                name: updatedTask.name,
                status: updatedTask.status,
                currentMode: updatedTask.currentMode,
                priority: updatedTask.priority,
                owner: updatedTask.owner,
                completionDate: updatedTask.completionDate,

                // Include transition and comment data if available
                workflowTransition:
                  updatedTask.workflowTransitions?.[0] || null,
                recentComment: updatedTask.comments?.[0] || null,

                // Include update details
                updateDetails: {
                  fieldsUpdated: {
                    status: true,
                    currentMode: !!params.currentMode,
                    priority: !!params.priority,
                    owner: !!params.owner,
                    completionDate:
                      !!params.completionDate || params.status === 'completed',
                    notes: !!params.notes,
                  },
                  timestamp: new Date().toISOString(),
                  updatedBy: params.currentMode || 'system',
                },
              },
              null,
              2,
            ),
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
            text: JSON.stringify(
              {
                taskId: delegatedTask.task.taskId,
                taskName: delegatedTask.task.name,
                status: delegatedTask.task.status,
                fromMode: params.fromMode,
                toMode: params.toMode,
                currentMode: delegatedTask.task.currentMode,
                message: params.message || null,
                subtaskId: params.subtaskId || null,

                // Delegation metadata
                delegationData: {
                  delegated: true,
                  timestamp: new Date().toISOString(),
                  redelegationCount:
                    delegatedTask.task.delegationRecords?.[0]
                      ?.redelegationCount || 0,
                  messageAdded: !!params.message,
                },
              },
              null,
              2,
            ),
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

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                taskId: completedTask.task.taskId,
                taskName: completedTask.task.name,
                status: completedTask.task.status,
                completionStatus: params.status,
                completedBy: params.mode,
                notes: params.notes || null,
                rejectionReason: params.rejectionReason || null,

                // Completion metadata
                completionData: {
                  timestamp: new Date().toISOString(),
                  completionData: params.completionData || null,
                  hasNotes: !!params.notes,
                  wasRejected: params.status === 'rejected',
                },
              },
              null,
              2,
            ),
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
      const { taskId, fromRole, toRole, summary, reason } = params;

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
        sliceType: 'FULL',
        optimizationLevel: 'FULL',
        includeRelated: true,
        maxComments: 5,
        maxDelegations: 10,
      });
      if (!fullContext || !fullContext.taskId) {
        throw new NotFoundException(
          `Task full context not found via TaskQueryService for ID: ${taskId}`,
        );
      }
      // Simplified context for hashing and diffing, similar to original facade's getTaskContext
      const simplifiedCurrentContext: any = {
        taskId: fullContext.taskId,
        name: fullContext.name,
        status: fullContext.status,
        currentMode: fullContext.currentMode,
        creationDate: fullContext.creationDate,
        completionDate: fullContext.completionDate,
      };
      if (fullContext.taskDescription) {
        simplifiedCurrentContext.description =
          fullContext.taskDescription.description;
        simplifiedCurrentContext.acceptanceCriteria =
          fullContext.taskDescription.acceptanceCriteria;
      }
      if (fullContext.implementationPlan) {
        simplifiedCurrentContext.implementationPlanSummary = {
          id: fullContext.implementationPlan.id,
          totalSubtasks: fullContext.implementationPlan.totalSubtasks || 0,
          completedSubtasks:
            fullContext.implementationPlan.completedSubtasks || 0,
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

      // Cache context for future reference
      this.contextManagementService.cacheContext(simplifiedCurrentContext);

      // Update task's current mode to the target role
      const actualCurrentMode = (
        await this.taskStateService.getCurrentModeForTask({ taskId })
      ).currentMode;
      if (actualCurrentMode !== toRole) {
        await this.taskStateService.updateTaskStatus({
          taskId,
          status: taskState.status as TaskStatus, // Preserve existing status
          currentMode: toRole, // Update currentMode to the new toRole
        });
      }

      const transitionNote = `Role transition: ${fromRole || 'N/A'} -> ${toRole}. ${summary ? `Summary: ${summary}. ` : ''}${reason ? `Reason: ${reason}.` : ''}`;
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
            text: `Transitioned to role ${toRole} for task '${taskName}'. ${summary ? `Summary: ${summary}` : ''}`,
          },
          {
            type: 'text',
            text: JSON.stringify(
              {
                role: toRole,
                task: {
                  id: taskId,
                  name: taskName,
                  status: taskState.status as TaskStatus,
                  currentMode: toRole,
                },
                fromRole,
                toRole,
                summary,
                reason,
                contextHash: currentContextHash,
              },
              null,
              2,
            ),
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
        `TaskStateOperationsService Error in handleRoleTransition for task ${params.taskId} to role ${params.toRole}:`,
        error,
      );
      throw new InternalServerErrorException(
        `TaskStateOperationsService: Could not handle role transition for task '${params.taskId}'. Error: ${(error as Error).message}`,
      );
    }
  }
}
