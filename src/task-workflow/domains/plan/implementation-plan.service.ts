import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma, Subtask as PrismaSubtaskType } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

import { AddSubtaskToBatchParams } from './schemas/add-subtask-to-batch.schema';
import { CheckBatchStatusParams } from './schemas/check-batch-status.schema';
import {
  CreateImplementationPlanInput,
  ImplementationPlanResponse,
} from './schemas/implementation-plan.schema';
import { CreateSubtaskInput, Subtask } from './schemas/subtask.schema';
import { UpdateSubtaskStatusParams } from './schemas/update-subtask-status.schema';

@Injectable()
export class ImplementationPlanService {
  constructor(private readonly prisma: PrismaService) {}

  // Helper method to convert database subtask to API response format
  private mapDbSubtaskToResponse(dbSubtask: PrismaSubtaskType): Subtask {
    // Database stores full names, return as-is
    const statusCode = dbSubtask.status;
    const roleCode = dbSubtask.assignedTo;

    return {
      id: dbSubtask.id,
      taskId: dbSubtask.taskId,
      planId: dbSubtask.planId,
      name: dbSubtask.name,
      description: dbSubtask.description,
      sequenceNumber: dbSubtask.sequenceNumber,
      status: statusCode,
      assignedTo: roleCode || undefined,
      estimatedDuration: dbSubtask.estimatedDuration || undefined,
      startedAt: dbSubtask.startedAt || undefined,
      completedAt: dbSubtask.completedAt || undefined,
      batchId: dbSubtask.batchId || undefined,
      batchTitle: dbSubtask.batchTitle || undefined,
    };
  }

  // Helper method to convert input to database format
  private mapInputToDbData(
    input: CreateSubtaskInput,
    batchId?: string,
    batchTitle?: string,
  ) {
    // Use status directly since database is clean
    const statusFull = input.status || 'not-started';

    // Use role directly since database is clean
    const assignedToFull = input.assignedTo;

    return {
      name: input.name,
      description: input.description,
      status: statusFull,
      sequenceNumber: input.sequenceNumber || 0,
      assignedTo: assignedToFull,
      estimatedDuration: input.estimatedDuration,
      batchId: batchId || input.batchId,
      batchTitle: batchTitle || input.batchTitle,
    };
  }

  // Helper to calculate actual hours from timestamps
  private calculateActualHours(
    startedAt?: Date | null,
    completedAt?: Date | null,
  ): number | undefined {
    if (!startedAt || !completedAt) return undefined;
    const diffMs = completedAt.getTime() - startedAt.getTime();
    return diffMs / (1000 * 60 * 60); // Convert to hours
  }

  async createOrUpdatePlan(
    taskId: string,
    planInput: CreateImplementationPlanInput,
  ): Promise<ImplementationPlanResponse> {
    const taskExists = await this.prisma.task.findUnique({ where: { taskId } });
    if (!taskExists) {
      throw new NotFoundException(`Task with ID '${taskId}' not found.`);
    }

    const prismaSubtasksToCreate: Prisma.SubtaskCreateWithoutPlanInput[] = [];
    let currentSequence = 0;

    // Process all batches and their subtasks
    if (planInput.batches) {
      for (const batch of planInput.batches) {
        // Create subtasks for this batch
        for (const subtaskInput of batch.subtasks) {
          currentSequence++;

          // Create a complete subtask input with batch information
          const completeSubtaskInput: CreateSubtaskInput = {
            taskId: taskId,
            planId: 0, // Will be set when creating the plan
            name: subtaskInput.name,
            description: subtaskInput.description,
            sequenceNumber: subtaskInput.sequenceNumber || currentSequence,
            status: subtaskInput.status || 'not-started',
            assignedTo: subtaskInput.assignedTo,
            estimatedDuration: subtaskInput.estimatedDuration,
            batchId: batch.id,
            batchTitle: batch.title,
          };

          const dbData = this.mapInputToDbData(
            completeSubtaskInput,
            batch.id,
            batch.title,
          );

          const fullDbData: Prisma.SubtaskCreateWithoutPlanInput = {
            ...dbData,
            sequenceNumber: currentSequence,
            task: { connect: { taskId: taskId } },
          };

          prismaSubtasksToCreate.push(fullDbData);
        }
      }
    }

    const planData: Prisma.ImplementationPlanCreateInput = {
      task: { connect: { taskId: taskId } },
      overview: planInput.overview || '',
      approach: planInput.approach || '',
      technicalDecisions: planInput.technicalDecisions || '',
      filesToModify: planInput.filesToModify || [],
      createdBy: planInput.createdBy || 'system',
      subtasks: { create: prismaSubtasksToCreate },
    };

    const createdPlanFromDb = await this.prisma.implementationPlan.create({
      data: planData,
      include: { subtasks: { orderBy: { sequenceNumber: 'asc' } } },
    });

    // Convert database result to API response format
    const responseSubtasks: Subtask[] = createdPlanFromDb.subtasks.map(
      (dbSubtask) => this.mapDbSubtaskToResponse(dbSubtask),
    );

    // Calculate computed fields
    const totalSubtasks = responseSubtasks.length;
    const completedSubtasks = responseSubtasks.filter(
      (s) => s.status === 'completed',
    ).length;

    // Group subtasks into batches for response
    const batches = await this.getBatchesForTask(taskId);

    return {
      id: createdPlanFromDb.id,
      taskId: createdPlanFromDb.taskId,
      overview: createdPlanFromDb.overview,
      approach: createdPlanFromDb.approach,
      technicalDecisions: createdPlanFromDb.technicalDecisions,
      filesToModify: createdPlanFromDb.filesToModify as string[],
      status:
        completedSubtasks === totalSubtasks && totalSubtasks > 0
          ? 'completed'
          : 'not-started',
      subtasks: responseSubtasks,
      totalSubtasks,
      completedSubtasks,
      batches: batches.map((batch) => ({
        id: batch.batchId,
        title: batch.batchTitle,
        subtaskCount: batch.totalSubtasks,
        completedSubtasks: batch.completedSubtasks,
        status: batch.isComplete ? 'completed' : 'in-progress',
        subtasks: responseSubtasks.filter((s) => s.batchId === batch.batchId),
      })),
      createdAt: createdPlanFromDb.createdAt,
      updatedAt: createdPlanFromDb.updatedAt,
      createdBy: createdPlanFromDb.createdBy,
    };
  }

  async getPlan(taskId: string): Promise<ImplementationPlanResponse | null> {
    const planFromDb = await this.prisma.implementationPlan.findFirst({
      where: { taskId },
      include: { subtasks: { orderBy: { sequenceNumber: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });

    if (!planFromDb) return null;

    // Convert all subtasks to response format
    const responseSubtasks: Subtask[] = planFromDb.subtasks.map((dbSubtask) => {
      return this.mapDbSubtaskToResponse(dbSubtask);
    });

    // Calculate computed fields
    const totalSubtasks = responseSubtasks.length;
    const completedSubtasks = responseSubtasks.filter(
      (s) => s.status === 'completed',
    ).length;

    // Group subtasks into batches for response
    const batches = await this.getBatchesForTask(taskId);

    return {
      id: planFromDb.id,
      taskId: planFromDb.taskId,
      overview: planFromDb.overview,
      approach: planFromDb.approach,
      technicalDecisions: planFromDb.technicalDecisions,
      filesToModify: planFromDb.filesToModify as string[],
      status:
        completedSubtasks === totalSubtasks && totalSubtasks > 0
          ? 'completed'
          : 'not-started',
      subtasks: responseSubtasks,
      totalSubtasks,
      completedSubtasks,
      batches: batches.map((batch) => ({
        id: batch.batchId,
        title: batch.batchTitle,
        subtaskCount: batch.totalSubtasks,
        completedSubtasks: batch.completedSubtasks,
        status: batch.isComplete ? 'completed' : 'in-progress',
        subtasks: responseSubtasks.filter((s) => s.batchId === batch.batchId),
      })),
      createdAt: planFromDb.createdAt,
      updatedAt: planFromDb.updatedAt,
      createdBy: planFromDb.createdBy,
    };
  }

  async addSubtaskToBatch(params: AddSubtaskToBatchParams): Promise<Subtask> {
    const { taskId, batchId, subtask: subtaskData } = params;

    const planFromDb = await this.prisma.implementationPlan.findFirst({
      where: { taskId },
      orderBy: { createdAt: 'desc' },
    });

    if (!planFromDb) {
      throw new NotFoundException(
        `Implementation plan for task '${taskId}' not found.`,
      );
    }

    const currentSubtaskCount = await this.prisma.subtask.count({
      where: { planId: planFromDb.id },
    });
    const newSequenceNumber = currentSubtaskCount + 1;

    // Create the subtask data with required fields
    const subtaskInput: CreateSubtaskInput = {
      taskId: taskId,
      planId: planFromDb.id,
      name: subtaskData.name,
      description: subtaskData.description,
      sequenceNumber: newSequenceNumber,
      status: subtaskData.status,
      assignedTo: subtaskData.assignedTo,
      estimatedDuration: subtaskData.estimatedDuration,
      batchId: batchId,
      batchTitle: batchId, // Use batchId as default title
    };

    const dbData = this.mapInputToDbData(subtaskInput, batchId, batchId);

    const createData: Prisma.SubtaskCreateInput = {
      ...dbData,
      sequenceNumber: newSequenceNumber,
      plan: { connect: { id: planFromDb.id } },
      task: { connect: { taskId: taskId } },
    };

    const createdDbSubtask = await this.prisma.subtask.create({
      data: createData,
    });

    return this.mapDbSubtaskToResponse(createdDbSubtask);
  }

  async updateSubtaskStatus(params: UpdateSubtaskStatusParams): Promise<
    PrismaSubtaskType & {
      planStatusUpdated?: boolean;
      batchStatusUpdated?: boolean;
    }
  > {
    // Handle batch updates
    if (params.subtasks && params.subtasks.length > 0) {
      return this.updateSubtasksBatch(params);
    }

    // Handle single subtask update (backward compatible)
    if (!params.subtaskId || !params.newStatus) {
      throw new BadRequestException(
        'Either provide subtaskId+newStatus for single update OR subtasks array for batch update.',
      );
    }

    const { taskId, subtaskId, newStatus } = params;

    // ✅ OPTIMIZED: Single query with selective includes
    const subtask = await this.prisma.subtask.findUnique({
      where: { id: subtaskId },
      select: {
        id: true,
        taskId: true,
        planId: true,
        name: true,
        status: true,
        startedAt: true,
        completedAt: true,
        batchId: true,
        plan: {
          select: {
            id: true,
            taskId: true,
          },
        },
      },
    });

    if (!subtask) {
      throw new NotFoundException(`Subtask with ID '${subtaskId}' not found.`);
    }
    if (!subtask.plan || subtask.plan.taskId !== taskId) {
      throw new BadRequestException(
        `Subtask '${subtaskId}' does not belong to task '${taskId}'.`,
      );
    }

    const statusFull = newStatus;

    const updateData: Prisma.SubtaskUpdateInput = {
      status: statusFull,
    };

    // Efficient timestamp handling
    if (statusFull === 'in-progress' && !subtask.startedAt) {
      updateData.startedAt = new Date();
    } else if (statusFull === 'completed') {
      updateData.completedAt = new Date();
      if (!subtask.startedAt) {
        updateData.startedAt = new Date();
      }
    }

    const updatedSubtask = await this.prisma.subtask.update({
      where: { id: subtaskId },
      data: updateData,
    });

    // ✅ OPTIMIZED: Efficient batch and plan status checking
    let planStatusUpdated = false;
    let batchStatusUpdated = false;

    if (statusFull === 'completed') {
      // Check batch completion if subtask is in a batch
      if (subtask.batchId) {
        const batchStats = await this.prisma.subtask.aggregate({
          where: {
            task: { taskId },
            batchId: subtask.batchId,
          },
          _count: {
            id: true,
          },
        });

        const completedInBatch = await this.prisma.subtask.count({
          where: {
            task: { taskId },
            batchId: subtask.batchId,
            status: 'completed',
          },
        });

        batchStatusUpdated = completedInBatch === batchStats._count.id;
      }

      // Check plan completion efficiently
      const planStats = await this.prisma.subtask.aggregate({
        where: { planId: subtask.planId },
        _count: { id: true },
      });

      const completedInPlan = await this.prisma.subtask.count({
        where: {
          planId: subtask.planId,
          status: 'completed',
        },
      });

      planStatusUpdated = completedInPlan === planStats._count.id;
    }

    return {
      ...updatedSubtask,
      planStatusUpdated,
      batchStatusUpdated,
    };
  }

  private async updateSubtasksBatch(params: UpdateSubtaskStatusParams): Promise<
    PrismaSubtaskType & {
      planStatusUpdated?: boolean;
      batchStatusUpdated?: boolean;
      batchUpdateCount?: number;
    }
  > {
    const { taskId, subtasks } = params;

    if (!subtasks || subtasks.length === 0) {
      throw new BadRequestException(
        'Subtasks array cannot be empty for batch update.',
      );
    }

    // Validate all subtasks belong to the task
    const subtaskIds = subtasks.map((s) => s.subtaskId);
    const existingSubtasks = await this.prisma.subtask.findMany({
      where: {
        id: { in: subtaskIds },
        task: { taskId },
      },
      select: {
        id: true,
        taskId: true,
        planId: true,
        name: true,
        status: true,
        startedAt: true,
        completedAt: true,
        batchId: true,
      },
    });

    if (existingSubtasks.length !== subtasks.length) {
      const foundIds = existingSubtasks.map((s) => s.id);
      const missingIds = subtaskIds.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(
        `Subtasks not found or don't belong to task '${taskId}': ${missingIds.join(', ')}`,
      );
    }

    // Process batch updates in transaction
    const results = await this.prisma.$transaction(async (tx) => {
      const updatePromises = subtasks.map(async (subtaskUpdate) => {
        const existingSubtask = existingSubtasks.find(
          (s) => s.id === subtaskUpdate.subtaskId,
        );
        if (!existingSubtask) return null;

        const updateData: Prisma.SubtaskUpdateInput = {
          status: subtaskUpdate.newStatus,
        };

        // Handle timestamps for status changes
        if (
          subtaskUpdate.newStatus === 'in-progress' &&
          !existingSubtask.startedAt
        ) {
          updateData.startedAt = new Date();
        } else if (subtaskUpdate.newStatus === 'completed') {
          updateData.completedAt = new Date();
          if (!existingSubtask.startedAt) {
            updateData.startedAt = new Date();
          }
        }

        return tx.subtask.update({
          where: { id: subtaskUpdate.subtaskId },
          data: updateData,
        });
      });

      return Promise.all(updatePromises);
    });

    const validResults = results.filter((r) => r !== null);

    // Check for batch and plan completion status after batch update
    let planStatusUpdated = false;
    let batchStatusUpdated = false;

    if (validResults.length > 0) {
      // Get unique plan IDs and batch IDs affected
      const planIds = [...new Set(existingSubtasks.map((s) => s.planId))];
      const batchIds = [
        ...new Set(existingSubtasks.map((s) => s.batchId).filter(Boolean)),
      ];

      // Check plan completion for affected plans
      for (const planId of planIds) {
        const planStats = await this.prisma.subtask.aggregate({
          where: { planId },
          _count: { id: true },
        });

        const completedInPlan = await this.prisma.subtask.count({
          where: {
            planId,
            status: 'completed',
          },
        });

        if (completedInPlan === planStats._count.id) {
          planStatusUpdated = true;
        }
      }

      // Check batch completion for affected batches
      for (const batchId of batchIds) {
        const batchStats = await this.prisma.subtask.aggregate({
          where: {
            task: { taskId },
            batchId,
          },
          _count: { id: true },
        });

        const completedInBatch = await this.prisma.subtask.count({
          where: {
            task: { taskId },
            batchId,
            status: 'completed',
          },
        });

        if (completedInBatch === batchStats._count.id) {
          batchStatusUpdated = true;
        }
      }
    }

    // Return the first updated subtask with batch metadata
    const firstUpdated = validResults[0];
    return {
      ...firstUpdated,
      planStatusUpdated,
      batchStatusUpdated,
      batchUpdateCount: validResults.length,
    };
  }

  async checkBatchStatus(params: CheckBatchStatusParams): Promise<{
    batchId: string;
    isComplete: boolean;
    totalSubtasksInBatch: number;
    completedSubtasksInBatch: number;
    pendingSubtasks: Array<{
      id: string;
      displayId: string;
      title: string;
      status: string;
    }>;
    efficiency?: number;
    averageCompletionTime?: number;
  }> {
    const { taskId, batchId } = params;

    // ✅ OPTIMIZED: Efficient query with selective includes and aggregation
    const batchSubtasks = await this.prisma.subtask.findMany({
      where: {
        task: { taskId },
        batchId,
      },
      select: {
        id: true,
        name: true,
        status: true,
        sequenceNumber: true,
        startedAt: true,
        completedAt: true,
        batchId: true,
      },
      orderBy: { sequenceNumber: 'asc' },
    });

    if (!batchSubtasks || batchSubtasks.length === 0) {
      throw new BadRequestException(
        `No subtasks found for batch ID '${batchId}' in task '${taskId}'.`,
      );
    }

    let completedCount = 0;
    let totalCompletionTime = 0;
    const pendingSubtasks: Array<{
      id: string;
      displayId: string;
      title: string;
      status: string;
    }> = [];

    for (const subtask of batchSubtasks) {
      if (subtask.status === 'completed') {
        completedCount++;
        // Calculate completion time if both timestamps exist
        if (subtask.startedAt && subtask.completedAt) {
          totalCompletionTime +=
            subtask.completedAt.getTime() - subtask.startedAt.getTime();
        }
      } else {
        pendingSubtasks.push({
          id: subtask.id.toString(), // Database ID for tools
          displayId: `ST-${String(subtask.sequenceNumber).padStart(3, '0')}`, // Display ID for users
          title: subtask.name,
          status: subtask.status,
        });
      }
    }

    const isComplete = completedCount === batchSubtasks.length;
    const efficiency =
      batchSubtasks.length > 0 ? completedCount / batchSubtasks.length : 0;
    const averageCompletionTime =
      completedCount > 0
        ? Math.round(
            (totalCompletionTime / completedCount / (1000 * 60 * 60)) * 10,
          ) / 10 // Hours
        : undefined;

    return {
      batchId,
      isComplete,
      totalSubtasksInBatch: batchSubtasks.length,
      completedSubtasksInBatch: completedCount,
      pendingSubtasks,
      efficiency,
      averageCompletionTime,
    };
  }

  // ✅ NEW: Advanced batch management capabilities
  async getBatchesForTask(taskId: string): Promise<
    Array<{
      batchId: string;
      batchTitle: string;
      totalSubtasks: number;
      completedSubtasks: number;
      isComplete: boolean;
      efficiency: number;
    }>
  > {
    const batches = await this.prisma.subtask.groupBy({
      by: ['batchId', 'batchTitle'],
      where: {
        task: { taskId },
        batchId: { not: null },
      },
      _count: {
        id: true,
      },
    });

    const results = [];
    for (const batch of batches) {
      if (batch.batchId) {
        const completedCount = await this.prisma.subtask.count({
          where: {
            task: { taskId },
            batchId: batch.batchId,
            status: 'completed',
          },
        });

        results.push({
          batchId: batch.batchId,
          batchTitle: batch.batchTitle || batch.batchId,
          totalSubtasks: batch._count.id,
          completedSubtasks: completedCount,
          isComplete: completedCount === batch._count.id,
          efficiency:
            batch._count.id > 0 ? completedCount / batch._count.id : 0,
        });
      }
    }

    return results;
  }
}
