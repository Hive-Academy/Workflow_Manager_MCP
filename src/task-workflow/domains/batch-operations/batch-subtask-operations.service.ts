import { Injectable, Logger } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  BatchSubtaskOperationsSchema,
  BatchSubtaskOperationsInput,
} from './schemas/batch-subtask-operations.schema';

/**
 * Batch Subtask Operations Service
 *
 * Focused service for bulk subtask management by batchId.
 * Provides efficient operations for managing entire batches of subtasks.
 */
@Injectable()
export class BatchSubtaskOperationsService {
  private readonly logger = new Logger(BatchSubtaskOperationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Tool({
    name: 'batch_subtask_operations',
    description: `
Bulk subtask management by batchId with efficient operations.

**Operations:**
- get_batch_subtasks: Retrieve all subtasks for a batch
- update_batch_status: Update status of all subtasks in a batch
- create_batch_subtasks: Create multiple subtasks for a batch
- delete_batch_subtasks: Remove all subtasks from a batch
- get_batch_summary: Get batch progress summary and statistics
- complete_batch: Mark entire batch as completed with evidence

**Key Features:**
- Bulk operations for efficiency (update entire batches at once)
- Batch progress tracking and summary statistics
- Sequential subtask numbering within batches
- Batch completion with evidence tracking
- Status filtering and query optimization

**Examples:**
- Get batch: { operation: "get_batch_subtasks", taskId: "TSK-001", batchId: "B001" }
- Update all: { operation: "update_batch_status", taskId: "TSK-001", batchId: "B001", newStatus: "completed" }
- Create batch: { operation: "create_batch_subtasks", taskId: "TSK-001", batchId: "B001", subtasks: [...] }
- Complete: { operation: "complete_batch", taskId: "TSK-001", batchId: "B001", completionData: {...} }
`,
    parameters: BatchSubtaskOperationsSchema,
  })
  async executeBatchSubtaskOperation(
    input: BatchSubtaskOperationsInput,
  ): Promise<any> {
    const startTime = performance.now();

    try {
      this.logger.debug(`Batch Subtask Operation: ${input.operation}`, {
        taskId: input.taskId,
        batchId: input.batchId,
      });

      let result: any;

      switch (input.operation) {
        case 'get_batch_subtasks':
          result = await this.getBatchSubtasks(input);
          break;
        case 'update_batch_status':
          result = await this.updateBatchStatus(input);
          break;
        case 'create_batch_subtasks':
          result = await this.createBatchSubtasks(input);
          break;
        case 'delete_batch_subtasks':
          result = await this.deleteBatchSubtasks(input);
          break;
        case 'get_batch_summary':
          result = await this.getBatchSummary(input);
          break;
        case 'complete_batch':
          result = await this.completeBatch(input);
          break;
        default:
          throw new Error(`Unknown operation: ${String(input.operation)}`);
      }

      const responseTime = performance.now() - startTime;

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                data: result,
                metadata: {
                  operation: input.operation,
                  taskId: input.taskId,
                  batchId: input.batchId,
                  responseTime: Math.round(responseTime),
                },
              },
              null,
              2,
            ),
          },
        ],
      } as const;
    } catch (error: any) {
      this.logger.error(`Batch subtask operation failed:`, error);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: false,
                error: {
                  message: error.message,
                  code: 'BATCH_SUBTASK_OPERATION_FAILED',
                  operation: input.operation,
                },
              },
              null,
              2,
            ),
          },
        ],
      };
    }
  }

  private async getBatchSubtasks(
    input: BatchSubtaskOperationsInput,
  ): Promise<any> {
    const { taskId, batchId, statusFilter, includeCompleted } = input;

    const whereClause: any = {
      taskId,
      batchId,
    };

    if (statusFilter) {
      whereClause.status = statusFilter;
    } else if (!includeCompleted) {
      whereClause.status = {
        not: 'completed',
      };
    }

    const subtasks = await this.prisma.subtask.findMany({
      where: whereClause,
      orderBy: { sequenceNumber: 'asc' },
    });

    return {
      subtasks,
      total: subtasks.length,
      statusBreakdown: this.calculateStatusBreakdown(subtasks),
    };
  }

  private async updateBatchStatus(
    input: BatchSubtaskOperationsInput,
  ): Promise<any> {
    const { taskId, batchId, newStatus } = input;

    if (!newStatus) {
      throw new Error('New status is required for batch status update');
    }

    const updateResult = await this.prisma.subtask.updateMany({
      where: {
        taskId,
        batchId,
      },
      data: {
        status: newStatus,
        ...(newStatus === 'completed' && {
          completedAt: new Date(),
        }),
      },
    });

    const updatedSubtasks = await this.prisma.subtask.findMany({
      where: {
        taskId,
        batchId,
      },
      orderBy: { sequenceNumber: 'asc' },
    });

    return {
      updatedCount: updateResult.count,
      newStatus,
      subtasks: updatedSubtasks,
      statusBreakdown: this.calculateStatusBreakdown(updatedSubtasks),
    };
  }

  private async createBatchSubtasks(
    input: BatchSubtaskOperationsInput,
  ): Promise<any> {
    const { taskId, batchId, subtasks } = input;

    if (!subtasks || subtasks.length === 0) {
      throw new Error('Subtasks array is required for batch creation');
    }

    // Get the implementation plan for this task
    const implementationPlan = await this.prisma.implementationPlan.findFirst({
      where: { taskId },
    });

    if (!implementationPlan) {
      throw new Error(`Implementation plan not found for task ${taskId}`);
    }

    // Prepare subtask data with required fields
    const subtaskData = subtasks.map((subtask, index) => ({
      taskId,
      planId: implementationPlan.id,
      batchId,
      name: subtask.name,
      description: subtask.description,
      sequenceNumber: subtask.sequenceNumber || index + 1,
      status: subtask.status || 'not-started',
      estimatedDuration: subtask.estimatedDuration,
    }));

    const createdSubtasks = await this.prisma.subtask.createMany({
      data: subtaskData,
    });

    const allSubtasks = await this.prisma.subtask.findMany({
      where: {
        taskId,
        batchId,
      },
      orderBy: { sequenceNumber: 'asc' },
    });

    return {
      created: createdSubtasks.count,
      subtasks: allSubtasks,
      statusBreakdown: this.calculateStatusBreakdown(allSubtasks),
    };
  }

  private async deleteBatchSubtasks(
    input: BatchSubtaskOperationsInput,
  ): Promise<any> {
    const { taskId, batchId } = input;

    const deleteResult = await this.prisma.subtask.deleteMany({
      where: {
        taskId,
        batchId,
      },
    });

    return {
      deletedCount: deleteResult.count,
      batchId,
      taskId,
    };
  }

  private async getBatchSummary(
    input: BatchSubtaskOperationsInput,
  ): Promise<any> {
    const { taskId, batchId } = input;

    const subtasks = await this.prisma.subtask.findMany({
      where: {
        taskId,
        batchId,
      },
      orderBy: { sequenceNumber: 'asc' },
    });

    if (subtasks.length === 0) {
      return {
        batchId,
        taskId,
        isEmpty: true,
        message: 'No subtasks found for this batch',
      };
    }

    const statusBreakdown = this.calculateStatusBreakdown(subtasks);
    const totalSubtasks = subtasks.length;
    const completedSubtasks = statusBreakdown.completed || 0;
    const progressPercentage = Math.round(
      (completedSubtasks / totalSubtasks) * 100,
    );

    return {
      batchId,
      taskId,
      totalSubtasks,
      completedSubtasks,
      progressPercentage,
      statusBreakdown,
      isComplete: completedSubtasks === totalSubtasks,
      nextSubtask: subtasks.find((s) => s.status !== 'completed'),
      subtasks,
    };
  }

  private async completeBatch(
    input: BatchSubtaskOperationsInput,
  ): Promise<any> {
    const { taskId, batchId, completionData } = input;

    if (!completionData) {
      throw new Error('Completion data is required for batch completion');
    }

    // Update all subtasks to completed status
    const updateResult = await this.prisma.subtask.updateMany({
      where: {
        taskId,
        batchId,
      },
      data: {
        status: 'completed',
        completedAt: new Date(),
      },
    });

    // Get the updated subtasks
    const completedSubtasks = await this.prisma.subtask.findMany({
      where: {
        taskId,
        batchId,
      },
      orderBy: { sequenceNumber: 'asc' },
    });

    return {
      batchId,
      taskId,
      completedCount: updateResult.count,
      completionSummary: completionData.summary,
      filesModified: completionData.filesModified || [],
      implementationNotes: completionData.implementationNotes,
      completedAt: new Date(),
      subtasks: completedSubtasks,
      statusBreakdown: this.calculateStatusBreakdown(completedSubtasks),
    };
  }

  private calculateStatusBreakdown(
    subtasks: { status: string }[],
  ): Record<string, number> {
    return subtasks.reduce<Record<string, number>>((breakdown, subtask) => {
      const status = subtask.status;
      breakdown[status] = (breakdown[status] || 0) + 1;
      return breakdown;
    }, {});
  }
}
