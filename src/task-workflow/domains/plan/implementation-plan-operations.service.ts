import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';
import { ImplementationPlanService } from './implementation-plan.service';
import { TaskCommentService } from '../interaction/task-comment.service';
import { TaskQueryService } from '../query/task-query.service';
import { AddSubtaskToBatchSchema } from './schemas/add-subtask-to-batch.schema';
import { UpdateSubtaskStatusSchema } from './schemas/update-subtask-status.schema';
import { CheckBatchStatusSchema } from './schemas/check-batch-status.schema';
import { CreateImplementationPlanInputSchema } from './schemas/implementation-plan.schema';

const CreateImplementationPlanToolParamsSchema = z.object({
  taskId: z
    .string()
    .describe('The ID of the task for which to create the plan.'),
  plan: CreateImplementationPlanInputSchema.describe(`Complete implementation plan object that includes:

REQUIRED FIELDS:
- taskId: string - ID of the task this plan belongs to
- overview: string - High-level summary of implementation goals and approach
- approach: string - Detailed technical approach describing methodology and steps
- technicalDecisions: string - Key technical decisions, architecture choices, and rationale
- createdBy: string - Role creating the plan (e.g., "🏛️AR" for architect)

OPTIONAL FIELDS:
- filesToModify: string[] - List of file paths expected to be modified
- batches: Batch[] - Organized work batches containing subtasks

BATCH STRUCTURE (if included):
{
  id: string,              // Unique batch ID (e.g., "B001", "B002")
  title: string,           // Clear, descriptive title for this batch
  description?: string,    // Optional detailed description of batch goals
  dependsOn?: string[],    // Array of batch IDs that must complete first
  subtasks: [{             // Array of subtasks in this batch
    name: string,          // Clear, actionable subtask name
    description: string,   // Detailed description of what needs to be done
    sequenceNumber: number, // Order within batch (1, 2, 3, etc.)
    status?: string,       // Status code: "NS"=not-started (default), "INP"=in-progress, "COM"=completed
    assignedTo?: string,   // Role assignment: "👨‍💻SD"=senior-developer, "🏛️AR"=architect, etc.
    estimatedDuration?: string // Human-readable estimate ("2 hours", "1 day", "30 minutes")
  }]
}

EXAMPLE STRUCTURE:
{
  taskId: "TSK-001",
  overview: "Implement user authentication system with JWT tokens",
  approach: "Create auth service using NestJS guards and JWT strategy",
  technicalDecisions: "Using passport-jwt for validation, bcrypt for hashing",
  createdBy: "🏛️AR",
  filesToModify: ["src/auth/auth.service.ts", "src/users/users.service.ts"],
  batches: [{
    id: "B001",
    title: "Core Authentication",
    subtasks: [{
      name: "Create Auth Service",
      description: "Implement authentication service with login/logout",
      sequenceNumber: 1,
      status: "NS",
      assignedTo: "👨‍💻SD"
    }]
  }]
}`),
});

@Injectable()
export class ImplementationPlanOperationsService {
  constructor(
    private readonly implementationPlanService: ImplementationPlanService,
    private readonly taskCommentService: TaskCommentService,
    private readonly taskQueryService: TaskQueryService,
  ) {}

  @Tool({
    name: 'create_implementation_plan',
    description:
      'Creates or updates the implementation plan for a given task, organizing subtasks into batches.',
    parameters: CreateImplementationPlanToolParamsSchema,
  })
  async createImplementationPlan(
    params: z.infer<typeof CreateImplementationPlanToolParamsSchema>,
  ): Promise<any> {
    try {
      const { taskId, plan } = params;
      const taskContextResponse = await this.taskQueryService.getTaskContext({
        taskId,
        sliceType: 'STATUS',
        optimizationLevel: 'MINIMAL',
        includeRelated: false,
        maxComments: 0,
        maxDelegations: 0,
      });
      if (!taskContextResponse || !taskContextResponse.name) {
        throw new NotFoundException(
          `Task with ID ${taskId} not found or context is invalid.`,
        );
      }
      const taskName = taskContextResponse.name;
      const createdPlan =
        await this.implementationPlanService.createOrUpdatePlan(taskId, plan);
      const numberOfBatches = plan.batches?.length || 0;
      const totalSubtasks = createdPlan.subtasks.length;
      return {
        content: [
          {
            type: 'text',
            text: `Implementation plan for task '${taskName}' (ID: ${taskId}) has been successfully created/updated with ${numberOfBatches} batch(es) and ${totalSubtasks} total subtasks.`,
          },
          {
            type: 'text',
            text: JSON.stringify(
              {
                taskId: createdPlan.taskId,
                planId: createdPlan.id,
                status: createdPlan.status,
                totalBatches: numberOfBatches,
                totalSubtasks: totalSubtasks,
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
        `Facade Error in createImplementationPlan for task ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Facade: Could not create/update implementation plan for task '${params.taskId}'. Error: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  @Tool({
    name: 'add_subtask_to_batch',
    description:
      'Adds a new subtask to a specified batch within an existing implementation plan.',
    parameters: AddSubtaskToBatchSchema,
  })
  async addSubtaskToBatch(params: z.infer<typeof AddSubtaskToBatchSchema>) {
    try {
      const newSubtask =
        await this.implementationPlanService.addSubtaskToBatch(params);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(newSubtask, null, 2),
          },
          {
            type: 'text',
            text: `Subtask '${newSubtask.name}' (ID: ${newSubtask.id}) added to batch '${params.batchId}' for task '${params.taskId}'.`,
          },
        ],
      };
    } catch (error) {
      this.handleFacadeError(error, 'addSubtaskToBatch', {
        taskId: params.taskId,
        batchId: params.batchId,
      });
    }
  }

  @Tool({
    name: 'update_subtask_status',
    description:
      'Updates the status of a specific subtask or multiple subtasks within an implementation plan. For single updates, provide subtaskId+newStatus. For batch updates, provide subtasks array.',
    parameters: UpdateSubtaskStatusSchema,
  })
  async updateSubtaskStatus(params: z.infer<typeof UpdateSubtaskStatusSchema>) {
    try {
      const result =
        await this.implementationPlanService.updateSubtaskStatus(params);
      const { planStatusUpdated, batchStatusUpdated, ...updatedSubtask } =
        result;
      const batchUpdateCount = (result as any).batchUpdateCount;

      let responseText: string;

      // Handle batch operation response
      if (batchUpdateCount && batchUpdateCount > 1) {
        responseText = `Batch update completed: ${batchUpdateCount} subtasks updated.`;
        if (batchStatusUpdated) {
          responseText += ` One or more batches completed.`;
        }
        if (planStatusUpdated) {
          responseText += ` Implementation Plan is now complete.`;
        }
      } else {
        // Handle single subtask response (backward compatible)
        responseText = `Subtask '${updatedSubtask.name}' (Database ID: ${updatedSubtask.id}) status updated to '${updatedSubtask.status}'.`;
        if (params.notes) {
          responseText += ` Provided notes: "${params.notes}" (Note: not directly stored on subtask via this tool, use add_note_to_subtask).`;
        }
        if (planStatusUpdated) {
          responseText += ` All subtasks for the plan are now complete. The Implementation Plan may be considered complete.`;
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(updatedSubtask, null, 2),
          },
          {
            type: 'text',
            text: responseText,
          },
        ],
      };
    } catch (error) {
      this.handleFacadeError(error, 'updateSubtaskStatus', {
        taskId: params.taskId,
        subtaskId: params.subtaskId, // Use correct field name
      });
    }
  }

  @Tool({
    name: 'check_batch_status',
    description:
      'Checks if all subtasks within a specified batch of an implementation plan are complete. Logs a note if the batch is complete.',
    parameters: CheckBatchStatusSchema,
  })
  async checkBatchStatus(params: z.infer<typeof CheckBatchStatusSchema>) {
    const contextIdentifier = `batch-status-${params.batchId}`;
    try {
      const batchStatus =
        await this.implementationPlanService.checkBatchStatus(params);
      let message = `Batch '${batchStatus.batchId}' for task '${params.taskId}': ${batchStatus.completedSubtasksInBatch}/${batchStatus.totalSubtasksInBatch} subtasks complete.`;
      if (batchStatus.isComplete) {
        message = `All ${batchStatus.totalSubtasksInBatch} subtasks in batch '${batchStatus.batchId}' for task '${params.taskId}' are complete.`;
        try {
          const taskContext = await this.taskQueryService.getTaskContext({
            taskId: params.taskId,
            sliceType: 'STATUS',
            optimizationLevel: 'MINIMAL',
            includeRelated: false,
            maxComments: 0,
            maxDelegations: 0,
          });
          const modeForNote = taskContext?.currentMode || 'system';
          await this.taskCommentService.addTaskNote({
            taskId: params.taskId,
            note: `System: Batch '${batchStatus.batchId}' reported as complete by check_batch_status tool. All ${batchStatus.totalSubtasksInBatch} subtasks finished.`,
            mode: modeForNote,
          });
        } catch (noteError) {
          console.error(
            `Failed to add completion note for batch ${batchStatus.batchId}, task ${params.taskId}:`,
            noteError,
          );
        }
      } else {
        message += ` Pending subtasks: ${batchStatus.pendingSubtasks.map((st) => `${st.displayId} (DB ID: ${st.id}) - ${st.title}`).join(', ')}`;
      }
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(batchStatus),
          },
          {
            type: 'text',
            text: message,
          },
        ],
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          content: [
            {
              type: 'text',
              text: `No data found for ${contextIdentifier} for task ${params.taskId}. Batch or plan may not exist. Message: ${error instanceof Error ? error.message : String(error)}`,
            },
            {
              type: 'text',
              text: JSON.stringify({
                notFound: true,
                error: true,
                message: error instanceof Error ? error.message : String(error),
                contextHash: null,
                contextType: contextIdentifier,
                taskId: params.taskId,
                batchId: params.batchId,
              }),
            },
          ],
        };
      } else if (
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }
      console.error(
        `Facade Error in checkBatchStatus for task ${params.taskId}, batch ${params.batchId}:`,
        error,
      );
      return {
        content: [
          {
            type: 'text',
            text: `An internal error occurred while checking ${contextIdentifier} for task ${params.taskId}.`,
          },
          {
            type: 'text',
            text: JSON.stringify({
              error: true,
              message: error instanceof Error ? error.message : String(error),
              contextType: contextIdentifier,
              taskId: params.taskId,
              batchId: params.batchId,
            }),
          },
        ],
      };
    }
  }

  private handleFacadeError(
    error: any,
    arg1: string,
    arg2: { taskId: string; batchId?: string; subtaskId?: number },
  ) {
    if (
      error instanceof NotFoundException ||
      error instanceof BadRequestException ||
      error instanceof InternalServerErrorException
    ) {
      throw error;
    }
    console.error(
      `Facade Error in ${arg1} for task ${arg2.taskId}${arg2.batchId ? `, batch ${arg2.batchId}` : ''}${arg2.subtaskId ? `, subtask ${arg2.subtaskId}` : ''}:`,
      error,
    );
    throw new InternalServerErrorException(
      `Facade: Could not ${arg1}. Error: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
