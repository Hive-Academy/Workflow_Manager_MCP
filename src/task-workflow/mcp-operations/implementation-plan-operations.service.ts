import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';
import {
  ImplementationPlanInputSchema,
  AddSubtaskToBatchSchema,
  UpdateSubtaskStatusSchema as UpdateSubtaskStatusToolSchema,
  CheckBatchStatusSchema,
} from '../schemas'; // Assuming schemas are now one level up if this service is in a subfolder
import {
  ImplementationPlanService,
  TaskCommentService,
  TaskQueryService,
} from '../services'; // Domain services are also one level up

// Define the schema for CreateImplementationPlanToolParams if not already globally available
// For now, let's assume it's defined elsewhere or we redefine it if necessary.
// Re-defining for clarity if not using a shared schema definition accessible here:
const CreateImplementationPlanToolParamsSchema = z.object({
  taskId: z
    .string()
    .describe('The ID of the task for which to create the plan.'),
  plan: ImplementationPlanInputSchema.describe(
    'The implementation plan details.',
  ),
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
      });
      if (!taskContextResponse || !taskContextResponse.task) {
        throw new NotFoundException(
          `Task with ID ${taskId} not found or context is invalid.`,
        );
      }
      const taskName = taskContextResponse.task.name;
      const createdPlan =
        await this.implementationPlanService.createOrUpdatePlan(taskId, plan);
      const numberOfBatches = plan.batches.length;
      const totalSubtasks = createdPlan.subtasks.length;
      return {
        content: [
          {
            type: 'text',
            text: `Implementation plan version ${createdPlan.version} for task '${taskName}' (ID: ${taskId}) has been successfully created/updated with ${numberOfBatches} batch(es) and ${totalSubtasks} total subtasks.`,
          },
          {
            type: 'json',
            json: {
              taskId: createdPlan.taskId,
              planTitle: createdPlan.title,
              version: createdPlan.version,
              status: createdPlan.status,
              totalBatches: numberOfBatches,
              totalSubtasks: totalSubtasks,
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
        `Facade Error in createImplementationPlan for task ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Facade: Could not create/update implementation plan for task '${params.taskId}'. Error: ${(error as Error).message}`,
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
            type: 'json',
            json: newSubtask,
          },
          {
            type: 'text',
            text: `Subtask '${newSubtask.title}' (ID: ${newSubtask.id}) added to batch '${params.batchId}' for task '${params.taskId}'.`,
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
      'Updates the status of a specific subtask within an implementation plan.',
    parameters: UpdateSubtaskStatusToolSchema,
  })
  async updateSubtaskStatus(
    params: z.infer<typeof UpdateSubtaskStatusToolSchema>,
  ) {
    try {
      const result =
        await this.implementationPlanService.updateSubtaskStatus(params);
      const { planStatusUpdated, ...updatedSubtask } = result;
      let responseText = `Subtask '${updatedSubtask.name}' (Prisma ID: ${updatedSubtask.id}) status updated to '${updatedSubtask.status}'.`;
      if (params.notes) {
        responseText += ` Provided notes: "${params.notes}" (Note: not directly stored on subtask via this tool, use add_note_to_subtask).`;
      }
      if (planStatusUpdated) {
        responseText += ` All subtasks for the plan are now complete. The Implementation Plan may be considered complete.`;
      }
      return {
        content: [
          {
            type: 'json',
            json: updatedSubtask,
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
        subtaskPrismaId: params.subtaskPrismaId,
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
    try {
      const batchStatus =
        await this.implementationPlanService.checkBatchStatus(params);
      let message = `Batch '${batchStatus.batchId}' for task '${params.taskId}': ${batchStatus.completedSubtasksInBatch}/${batchStatus.totalSubtasksInBatch} subtasks complete.`;
      if (batchStatus.isComplete) {
        message = `All ${batchStatus.totalSubtasksInBatch} subtasks in batch '${batchStatus.batchId}' for task '${params.taskId}' are complete.`;
        try {
          const taskContext = await this.taskQueryService.getTaskContext({
            taskId: params.taskId,
          });
          const modeForNote = taskContext?.task?.currentMode || 'system';
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
        message += ` Pending subtasks: ${batchStatus.pendingSubtasks.map((st) => st.title).join(', ')}`;
      }
      return {
        content: [
          {
            type: 'json',
            json: batchStatus,
          },
          {
            type: 'text',
            text: message,
          },
        ],
      };
    } catch (error) {
      this.handleFacadeError(error, 'check batch status', {
        taskId: params.taskId,
        batchId: params.batchId,
      });
    }
  }

  private handleFacadeError(
    error: any,
    arg1: string,
    arg2: { taskId: string; batchId?: string; subtaskPrismaId?: number },
  ) {
    if (
      error instanceof NotFoundException ||
      error instanceof BadRequestException ||
      error instanceof InternalServerErrorException
    ) {
      throw error;
    }
    console.error(
      `Facade Error in ${arg1} for task ${arg2.taskId}${arg2.batchId ? `, batch ${arg2.batchId}` : ''}:`,
      error,
    );
    throw new InternalServerErrorException(
      `Facade: Could not ${arg1}. Error: ${(error as Error).message}`,
    );
  }
}
