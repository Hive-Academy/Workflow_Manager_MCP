import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { Prisma, Subtask as PrismaSubtaskType } from 'generated/prisma';
import {
  ImplementationPlanStorage,
  ImplementationPlanResponse,
  ImplementationPlanDatabaseSchema,
} from './schemas/implementation-plan.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImplementationPlanInput } from './schemas/implementation-plan.schema';
import {
  AddSubtaskToBatchParams,
  SubtaskInputLegacy,
} from './schemas/add-subtask-to-batch.schema';
import {
  SubtaskResponse,
  SubtaskLegacy,
  SubtaskInput,
} from './schemas/subtask.schema';
import { UpdateSubtaskStatusParams } from './schemas/update-subtask-status.schema';
import { CheckBatchStatusParams } from './schemas/check-batch-status.schema';
import { TOKEN_MAPS } from 'src/task-workflow/types/token-refs.schema';

@Injectable()
export class ImplementationPlanService {
  constructor(private readonly prisma: PrismaService) {}

  // Helper method to convert database subtask to API response format
  private mapDbSubtaskToResponse(
    dbSubtask: PrismaSubtaskType,
    originalInput?: SubtaskInput,
    logicalIdCounter?: number,
  ): SubtaskResponse {
    // Generate logical ID if not provided
    const logicalId =
      originalInput?.id ||
      `ST-${String(logicalIdCounter || dbSubtask.sequenceNumber).padStart(3, '0')}`;

    // Convert status from DB format to schema format
    const statusCode =
      Object.entries(TOKEN_MAPS.status).find(
        ([code, fullName]) => fullName === dbSubtask.status,
      )?.[0] || dbSubtask.status;

    // Convert assignedTo from DB format to schema format
    const roleCode =
      Object.entries(TOKEN_MAPS.role).find(
        ([code, fullName]) => fullName === dbSubtask.assignedTo,
      )?.[0] || dbSubtask.assignedTo;

    return {
      id: logicalId,
      databaseId: dbSubtask.id, // Use correct field name from Prisma
      title: dbSubtask.name,
      description: dbSubtask.description,
      status: statusCode as any,
      assignedTo: roleCode as any,
      dependencies: originalInput?.dependencies || [],
      acceptanceCriteria: originalInput?.acceptanceCriteria || [],
      estimatedHours: dbSubtask.estimatedDuration
        ? parseFloat(dbSubtask.estimatedDuration)
        : originalInput?.estimatedHours,
      actualHours: this.calculateActualHours(
        dbSubtask.startedAt,
        dbSubtask.completedAt,
      ),
      relatedDocs: originalInput?.relatedDocs || [],
      notes: originalInput?.notes || [],
      sequenceNumber: dbSubtask.sequenceNumber,
      _batchInfo:
        dbSubtask.batchId && dbSubtask.batchTitle
          ? {
              id: dbSubtask.batchId,
              title: dbSubtask.batchTitle,
            }
          : undefined,
      startedAt: dbSubtask.startedAt || undefined, // Convert null to undefined
      completedAt: dbSubtask.completedAt || undefined, // Convert null to undefined
    };
  }

  // Helper method to convert input to database format
  private mapInputToDbData(
    input: SubtaskInput,
    batchId?: string,
    batchTitle?: string,
  ) {
    // Convert status from schema format to DB format
    const statusFull =
      TOKEN_MAPS.status[input.status as keyof typeof TOKEN_MAPS.status] ||
      input.status ||
      'not-started';

    // Convert assignedTo from schema format to DB format
    const assignedToFull = input.assignedTo
      ? TOKEN_MAPS.role[input.assignedTo as keyof typeof TOKEN_MAPS.role] ||
        input.assignedTo
      : undefined;

    return {
      name: input.title,
      description: input.description,
      status: statusFull,
      sequenceNumber: input.sequenceNumber || 0, // Will be set properly in creation
      assignedTo: assignedToFull,
      estimatedDuration: input.estimatedHours?.toString(),
      batchId: batchId || input._batchInfo?.id,
      batchTitle: batchTitle || input._batchInfo?.title,
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
    planInput: ImplementationPlanInput,
  ): Promise<ImplementationPlanResponse> {
    const taskExists = await this.prisma.task.findUnique({ where: { taskId } });
    if (!taskExists) {
      throw new NotFoundException(`Task with ID '${taskId}' not found.`);
    }

    const prismaSubtasksToCreate: Prisma.SubtaskCreateWithoutPlanInput[] = [];
    const inputSubtaskMapping: Map<number, SubtaskInput> = new Map();
    let currentSequence = 0;

    // Process all batches and their subtasks
    for (const batch of planInput.batches) {
      for (const stInput of batch.subtasks) {
        currentSequence++;

        // Store the mapping for later reference
        inputSubtaskMapping.set(currentSequence, stInput);

        const dbData = this.mapInputToDbData(stInput, batch.id, batch.title);

        const fullDbData: Prisma.SubtaskCreateWithoutPlanInput = {
          ...dbData,
          sequenceNumber: currentSequence,
          task: { connect: { taskId: taskId } },
        };

        prismaSubtasksToCreate.push(fullDbData);
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
    const responseSubtasks: SubtaskResponse[] = createdPlanFromDb.subtasks.map(
      (dbSubtask) => {
        const originalInput = inputSubtaskMapping.get(dbSubtask.sequenceNumber);
        return this.mapDbSubtaskToResponse(
          dbSubtask,
          originalInput,
          dbSubtask.sequenceNumber,
        );
      },
    );

    return {
      id: createdPlanFromDb.id,
      taskId: createdPlanFromDb.taskId,
      title:
        planInput.title ||
        taskExists.name ||
        `Implementation Plan for ${taskId}`,
      overview: createdPlanFromDb.overview,
      approach: createdPlanFromDb.approach,
      technicalDecisions: createdPlanFromDb.technicalDecisions,
      filesToModify: createdPlanFromDb.filesToModify as string[],
      version: '1.0.0',
      status: 'NS' as any,
      subtasks: responseSubtasks,
      generalNotes: planInput.generalNotes,
      linkedTd: planInput.linkedTd,
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
    const responseSubtasks: SubtaskResponse[] = planFromDb.subtasks.map(
      (dbSubtask) => {
        return this.mapDbSubtaskToResponse(
          dbSubtask,
          undefined,
          dbSubtask.sequenceNumber,
        );
      },
    );

    return {
      id: planFromDb.id,
      taskId: planFromDb.taskId,
      title: planFromDb.overview || `Plan for ${planFromDb.taskId}`,
      overview: planFromDb.overview,
      approach: planFromDb.approach,
      technicalDecisions: planFromDb.technicalDecisions,
      filesToModify: planFromDb.filesToModify as string[],
      version: '1.0.0',
      status: 'NS' as any,
      subtasks: responseSubtasks,
      generalNotes: [],
      linkedTd: undefined,
      createdAt: planFromDb.createdAt,
      updatedAt: planFromDb.updatedAt,
      createdBy: planFromDb.createdBy,
    };
  }

  async addSubtaskToBatch(
    params: AddSubtaskToBatchParams,
  ): Promise<SubtaskResponse> {
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

    const dbData = this.mapInputToDbData(
      subtaskData,
      batchId,
      subtaskData._batchInfo?.title || batchId,
    );

    const createData: Prisma.SubtaskCreateInput = {
      ...dbData,
      sequenceNumber: newSequenceNumber,
      plan: { connect: { id: planFromDb.id } },
      task: { connect: { taskId: taskId } },
    };

    const createdDbSubtask = await this.prisma.subtask.create({
      data: createData,
    });

    return this.mapDbSubtaskToResponse(
      createdDbSubtask,
      subtaskData,
      newSequenceNumber,
    );
  }

  async updateSubtaskStatus(
    params: UpdateSubtaskStatusParams,
  ): Promise<PrismaSubtaskType & { planStatusUpdated?: boolean }> {
    const { taskId, subtaskId, newStatus } = params; // Use subtaskId instead of subtaskPrismaId

    const subtask = await this.prisma.subtask.findUnique({
      where: { id: subtaskId }, // Use correct field name
      include: { plan: true },
    });

    if (!subtask) {
      throw new NotFoundException(`Subtask with ID '${subtaskId}' not found.`);
    }
    if (!subtask.plan || subtask.plan.taskId !== taskId) {
      throw new BadRequestException(
        `Subtask '${subtaskId}' does not belong to task '${taskId}' or its plan is missing.`,
      );
    }

    // Convert status from schema format to DB format
    const statusFull =
      TOKEN_MAPS.status[newStatus as keyof typeof TOKEN_MAPS.status] ||
      newStatus;

    const updateData: Prisma.SubtaskUpdateInput = {
      status: statusFull,
    };

    // Set timestamps based on status
    if (statusFull === 'in-progress' && !subtask.startedAt) {
      updateData.startedAt = new Date();
    } else if (statusFull === 'completed') {
      updateData.completedAt = new Date();
      if (!subtask.startedAt) {
        updateData.startedAt = new Date(); // Auto-set started if not already set
      }
    }

    const updatedSubtask = await this.prisma.subtask.update({
      where: { id: subtaskId }, // Use correct field name
      data: updateData,
    });

    // Check if batch/plan is complete
    const planId = subtask.planId;
    let planStatusUpdated = false;
    if (planId) {
      const allSubtasksForPlan = await this.prisma.subtask.findMany({
        where: { planId },
      });

      const allComplete = allSubtasksForPlan.every(
        (st) => st.status === 'completed',
      );

      if (allComplete) {
        planStatusUpdated = true;
      }
    }

    return { ...updatedSubtask, planStatusUpdated };
  }

  async checkBatchStatus(params: CheckBatchStatusParams): Promise<{
    batchId: string;
    isComplete: boolean;
    totalSubtasksInBatch: number;
    completedSubtasksInBatch: number;
    pendingSubtasks: Array<{ id: string; title: string; status: string }>;
  }> {
    const { taskId, batchId } = params;

    const planFromDb = await this.prisma.implementationPlan.findFirst({
      where: { taskId },
      include: {
        subtasks: {
          where: { batchId },
          orderBy: { sequenceNumber: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!planFromDb) {
      throw new NotFoundException(
        `Implementation plan for task '${taskId}' not found.`,
      );
    }

    if (!planFromDb.subtasks || planFromDb.subtasks.length === 0) {
      throw new BadRequestException(
        `No subtasks found for batch ID '${batchId}' in the latest plan for task '${taskId}'.`,
      );
    }

    const subtasksInBatch = planFromDb.subtasks;
    let completedCount = 0;
    const pendingSubtasks: Array<{
      id: string;
      title: string;
      status: string;
    }> = [];

    for (const subtask of subtasksInBatch) {
      if (subtask.status === 'completed') {
        completedCount++;
      } else {
        pendingSubtasks.push({
          id: `ST-${String(subtask.sequenceNumber).padStart(3, '0')}`, // Return logical ID
          title: subtask.name,
          status: subtask.status,
        });
      }
    }

    const isComplete = completedCount === subtasksInBatch.length;

    return {
      batchId,
      isComplete,
      totalSubtasksInBatch: subtasksInBatch.length,
      completedSubtasksInBatch: completedCount,
      pendingSubtasks,
    };
  }

  // Legacy method for backward compatibility
  async getPlanLegacy(
    taskId: string,
  ): Promise<ImplementationPlanStorage | null> {
    const response = await this.getPlan(taskId);
    if (!response) return null;

    // Return the response as-is since ImplementationPlanStorage expects SubtaskResponse
    return {
      id: response.id,
      taskId: response.taskId,
      title: response.title,
      overview: response.overview,
      approach: response.approach,
      technicalDecisions: response.technicalDecisions,
      filesToModify: response.filesToModify,
      version: response.version,
      status: response.status,
      subtasks: response.subtasks, // These already include databaseId
      generalNotes: response.generalNotes,
      linkedTd: response.linkedTd,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      createdBy: response.createdBy,
    };
  }
}
