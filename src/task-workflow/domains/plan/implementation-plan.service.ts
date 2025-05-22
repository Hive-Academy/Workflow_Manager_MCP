import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { Prisma, Subtask as PrismaSubtaskType } from 'generated/prisma';
import { ImplementationPlanStorage } from './schemas/implementation-plan.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImplementationPlanInput } from './schemas/implementation-plan.schema';
import {
  AddSubtaskToBatchParams,
  SubtaskInput,
} from './schemas/add-subtask-to-batch.schema';
import { Subtask } from './schemas/subtask.schema';
import { UpdateSubtaskStatusParams } from './schemas/update-subtask-status.schema';
import { CheckBatchStatusParams } from './schemas/check-batch-status.schema';

@Injectable()
export class ImplementationPlanService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdatePlan(
    taskId: string,
    planInput: ImplementationPlanInput,
  ): Promise<ImplementationPlanStorage> {
    const taskExists = await this.prisma.task.findUnique({ where: { taskId } });
    if (!taskExists) {
      throw new NotFoundException(`Task with ID '${taskId}' not found.`);
    }

    const prismaSubtasksToCreate: Prisma.SubtaskCreateWithoutPlanInput[] = [];
    const inputSubtaskBatchMapping: Array<
      SubtaskInput & {
        _batchData: { id: string; title: string };
        sequence: number;
      }
    > = [];
    let currentSequence = 0;

    for (const batch of planInput.batches) {
      for (const stInput of batch.subtasks) {
        currentSequence++;
        prismaSubtasksToCreate.push({
          name: stInput.title || 'Untitled Subtask',
          description: stInput.description || '',
          status: stInput.status || 'NS',
          sequenceNumber: currentSequence,
          assignedTo: stInput.assignedTo,
          estimatedDuration: stInput.estimatedHours?.toString(),
          task: { connect: { taskId: taskId } },
          batchId: batch.id,
          batchTitle: batch.title,
        });
        inputSubtaskBatchMapping.push({
          ...stInput,
          _batchData: { id: batch.id, title: batch.title },
          sequence: currentSequence,
        });
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

    const finalZodSubtasks: Subtask[] = createdPlanFromDb.subtasks.map(
      (dbSubtask) => {
        const originalInputSubtask = inputSubtaskBatchMapping.find(
          (ism) => ism.sequence === dbSubtask.sequenceNumber,
        );
        return {
          id: dbSubtask.id.toString(),
          title: dbSubtask.name,
          description: dbSubtask.description,
          status: dbSubtask.status as any,
          assignedTo: dbSubtask.assignedTo as any,
          _batchInfo:
            dbSubtask.batchId && dbSubtask.batchTitle
              ? { id: dbSubtask.batchId, title: dbSubtask.batchTitle }
              : undefined,
          sequenceNumber: dbSubtask.sequenceNumber,
          estimatedHours: originalInputSubtask?.estimatedHours,
          dependencies: originalInputSubtask?.dependencies || [],
          acceptanceCriteria: originalInputSubtask?.acceptanceCriteria || [],
          relatedDocs: originalInputSubtask?.relatedDocs || [],
          notes: originalInputSubtask?.notes || [],
          actualHours: undefined,
        };
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
      status: 'NS',
      subtasks: finalZodSubtasks,
      generalNotes: planInput.generalNotes,
      linkedTd: planInput.linkedTd,
      createdAt: createdPlanFromDb.createdAt,
      updatedAt: createdPlanFromDb.updatedAt,
      createdBy: createdPlanFromDb.createdBy,
    };
  }

  async getPlan(taskId: string): Promise<ImplementationPlanStorage | null> {
    const planFromDb = await this.prisma.implementationPlan.findFirst({
      where: { taskId },
      include: { subtasks: { orderBy: { sequenceNumber: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });

    if (!planFromDb) return null;

    const mappedZodSubtasks: Subtask[] = planFromDb.subtasks.map(
      (dbSubtask) => ({
        id: dbSubtask.id.toString(),
        title: dbSubtask.name,
        description: dbSubtask.description,
        status: dbSubtask.status as any,
        assignedTo: dbSubtask.assignedTo as any,
        dependencies: [],
        acceptanceCriteria: [],
        estimatedHours: dbSubtask.estimatedDuration
          ? parseFloat(dbSubtask.estimatedDuration)
          : undefined,
        actualHours: undefined,
        relatedDocs: [],
        notes: [],
        _batchInfo:
          dbSubtask.batchId && dbSubtask.batchTitle
            ? { id: dbSubtask.batchId, title: dbSubtask.batchTitle }
            : undefined,
        sequenceNumber: dbSubtask.sequenceNumber,
      }),
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
      status: 'NS',
      subtasks: mappedZodSubtasks,
      generalNotes: [],
      linkedTd: undefined,
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

    const createdDbSubtask = await this.prisma.subtask.create({
      data: {
        name: subtaskData.title || 'Untitled Subtask',
        description: subtaskData.description || '',
        status: subtaskData.status || 'NS',
        sequenceNumber: newSequenceNumber,
        assignedTo: subtaskData.assignedTo,
        estimatedDuration: subtaskData.estimatedHours?.toString(),
        plan: { connect: { id: planFromDb.id } },
        task: { connect: { taskId: taskId } },
        batchId: batchId,
        batchTitle: subtaskData._batchInfo?.title || batchId,
      },
    });

    const batchTitle = subtaskData._batchInfo?.title || batchId;

    return {
      id: createdDbSubtask.id.toString(),
      title: createdDbSubtask.name,
      description: createdDbSubtask.description,
      status: createdDbSubtask.status as any,
      assignedTo: createdDbSubtask.assignedTo as any,
      _batchInfo: { id: batchId, title: batchTitle },
      sequenceNumber: createdDbSubtask.sequenceNumber,
      estimatedHours: subtaskData.estimatedHours,
      dependencies: subtaskData.dependencies || [],
      acceptanceCriteria: subtaskData.acceptanceCriteria || [],
      relatedDocs: subtaskData.relatedDocs || [],
      notes: subtaskData.notes || [],
      actualHours: undefined,
    };
  }

  async updateSubtaskStatus(
    params: UpdateSubtaskStatusParams,
  ): Promise<PrismaSubtaskType & { planStatusUpdated?: boolean }> {
    const { taskId, subtaskPrismaId, newStatus } = params;

    const subtask = await this.prisma.subtask.findUnique({
      where: { id: subtaskPrismaId },
      include: { plan: true },
    });

    if (!subtask) {
      throw new NotFoundException(
        `Subtask with Prisma ID '${subtaskPrismaId}' not found.`,
      );
    }
    if (!subtask.plan || subtask.plan.taskId !== taskId) {
      throw new BadRequestException(
        `Subtask '${subtaskPrismaId}' does not belong to task '${taskId}' or its plan is missing.`,
      );
    }

    const updatedSubtask = await this.prisma.subtask.update({
      where: { id: subtaskPrismaId },
      data: { status: newStatus },
    });

    const planId = subtask.planId;
    let planStatusUpdated = false;
    if (planId) {
      const allSubtasksForPlan = await this.prisma.subtask.findMany({
        where: { planId },
      });

      const allComplete = allSubtasksForPlan.every(
        (st) => st.status === 'COM' || st.status === 'completed',
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
      if (subtask.status === 'COM' || subtask.status === 'completed') {
        completedCount++;
      } else {
        pendingSubtasks.push({
          id: subtask.id.toString(),
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
}
