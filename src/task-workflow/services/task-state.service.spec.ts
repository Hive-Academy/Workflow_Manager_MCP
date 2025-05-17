/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { TaskStateService } from './task-state.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import {
  UpdateTaskStatusSchema,
  GetTaskStatusSchema,
  DelegateTaskSchema,
  CompleteTaskSchema,
} from '../schemas';
import { z } from 'zod';

const mockPrismaService = {
  task: {
    update: jest.fn(),
    findUnique: jest.fn(),
  },
  // No other models needed for TaskStateService mocks
};

describe('TaskStateService', () => {
  let service: TaskStateService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskStateService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TaskStateService>(TaskStateService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('updateTaskStatus', () => {
    const params: z.infer<typeof UpdateTaskStatusSchema> = {
      taskId: 'STATE-001',
      status: 'In Progress',
      currentMode: 'architect',
    };

    it('should update task status and return updated task', async () => {
      const mockTask = {
        taskId: 'STATE-001',
        name: 'Test Task',
        status: 'In Progress',
        currentMode: 'architect',
      };
      mockPrismaService.task.update.mockResolvedValue(mockTask);

      const result = await service.updateTaskStatus(params);
      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { taskId: params.taskId },
        data: { status: params.status, currentMode: params.currentMode },
      });
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task does not exist (P2025)', async () => {
      mockPrismaService.task.update.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: 'test',
        }),
      );
      await expect(service.updateTaskStatus(params)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      mockPrismaService.task.update.mockRejectedValue(
        new Error('Database error'),
      );
      await expect(service.updateTaskStatus(params)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getTaskStatus', () => {
    const params: z.infer<typeof GetTaskStatusSchema> = {
      taskId: 'STATE-002',
    };

    it('should return task status with latest comment', async () => {
      const mockTaskWithComment = {
        taskId: 'STATE-002',
        name: 'Test Task',
        status: 'In Progress',
        currentMode: 'architect',
        creationDate: new Date(),
        completionDate: null,
        comments: [
          {
            content: 'Latest note content',
            createdAt: new Date(),
          },
        ],
      };

      mockPrismaService.task.findUnique.mockResolvedValue(mockTaskWithComment);

      const result = await service.getTaskStatus(params);
      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { taskId: params.taskId },
        select: {
          taskId: true,
          name: true,
          status: true,
          currentMode: true,
          creationDate: true,
          completionDate: true,
          comments: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
              content: true,
              createdAt: true,
            },
          },
        },
      });

      expect(result).toEqual({
        taskId: mockTaskWithComment.taskId,
        name: mockTaskWithComment.name,
        status: mockTaskWithComment.status,
        currentMode: mockTaskWithComment.currentMode,
        creationDate: mockTaskWithComment.creationDate,
        completionDate: mockTaskWithComment.completionDate,
        latestNote: mockTaskWithComment.comments[0].content,
      });
    });

    it('should return task status with null latestNote when no comments exist', async () => {
      const mockTaskWithoutComment = {
        taskId: 'STATE-002',
        name: 'Test Task',
        status: 'In Progress',
        currentMode: 'architect',
        creationDate: new Date(),
        completionDate: null,
        comments: [],
      };

      mockPrismaService.task.findUnique.mockResolvedValue(
        mockTaskWithoutComment,
      );

      const result = await service.getTaskStatus(params);

      expect(result).toEqual({
        taskId: mockTaskWithoutComment.taskId,
        name: mockTaskWithoutComment.name,
        status: mockTaskWithoutComment.status,
        currentMode: mockTaskWithoutComment.currentMode,
        creationDate: mockTaskWithoutComment.creationDate,
        completionDate: mockTaskWithoutComment.completionDate,
        latestNote: null,
      });
    });

    it('should throw NotFoundException if task is not found', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(null);

      await expect(service.getTaskStatus(params)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException for database errors', async () => {
      mockPrismaService.task.findUnique.mockRejectedValue(
        new Error('Database error'),
      );

      await expect(service.getTaskStatus(params)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('delegateTask', () => {
    const params: z.infer<typeof DelegateTaskSchema> = {
      taskId: 'DELEGATE-001',
      fromMode: 'boomerang',
      toMode: 'architect',
      message: 'Please plan implementation',
    };

    it('should update task currentMode and return delegation details', async () => {
      const mockTask = {
        taskId: 'DELEGATE-001',
        name: 'Test Delegation Task',
        status: 'In Progress',
        currentMode: 'architect', // Updated to toMode
      };
      mockPrismaService.task.update.mockResolvedValue(mockTask);

      const result = await service.delegateTask(params);
      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { taskId: params.taskId },
        data: { currentMode: params.toMode },
        select: {
          taskId: true,
          name: true,
          status: true,
          currentMode: true,
        },
      });

      expect(result).toEqual({
        taskId: mockTask.taskId,
        name: mockTask.name,
        status: mockTask.status,
        currentMode: mockTask.currentMode,
        fromMode: params.fromMode,
        toMode: params.toMode,
        delegationMessage: params.message,
      });
    });

    it('should handle delegation without a message', async () => {
      const paramsWithoutMessage = {
        ...params,
        message: undefined,
      };
      const mockTask = {
        taskId: 'DELEGATE-001',
        name: 'Test Delegation Task',
        status: 'In Progress',
        currentMode: 'architect',
      };
      mockPrismaService.task.update.mockResolvedValue(mockTask);

      const result = await service.delegateTask(paramsWithoutMessage);

      expect(result.delegationMessage).toBeNull();
    });

    it('should throw NotFoundException if task does not exist (P2025)', async () => {
      mockPrismaService.task.update.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: 'test',
        }),
      );
      await expect(service.delegateTask(params)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      mockPrismaService.task.update.mockRejectedValue(
        new Error('Database error'),
      );
      await expect(service.delegateTask(params)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('completeTask', () => {
    const params: z.infer<typeof CompleteTaskSchema> = {
      taskId: 'COMPLETE-001',
      mode: 'architect',
      status: 'completed',
      notes: 'Implementation completed successfully.',
    };

    const mockTask = {
      taskId: 'COMPLETE-001',
      name: 'Test Completion Task',
      status: 'In Progress',
      currentMode: 'architect',
      completionDate: null,
    };

    it('should update task status to Completed and set completionDate when status is completed', async () => {
      // Mock task exists
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);

      // Mock task update result
      const mockUpdatedTask = {
        ...mockTask,
        status: 'Completed',
        completionDate: new Date(),
      };
      mockPrismaService.task.update.mockResolvedValue(mockUpdatedTask);

      const result = await service.completeTask(params);

      // Check task status was found first
      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { taskId: params.taskId },
        select: {
          taskId: true,
          name: true,
          status: true,
          currentMode: true,
          completionDate: true,
        },
      });

      // Check task was updated with correct data
      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { taskId: params.taskId },
        data: {
          status: 'Completed',
          completionDate: expect.any(Date),
        },
        select: {
          taskId: true,
          name: true,
          status: true,
          currentMode: true,
          creationDate: true,
          completionDate: true,
        },
      });

      // Check returned result has expected data
      expect(result).toEqual({
        taskId: mockUpdatedTask.taskId,
        name: mockUpdatedTask.name,
        status: mockUpdatedTask.status,
        currentMode: mockUpdatedTask.currentMode,
        mode: params.mode,
        completionDate: mockUpdatedTask.completionDate,
        completionStatus: params.status,
      });
    });

    it('should update task status to Rejected when status is rejected', async () => {
      const rejectParams = {
        ...params,
        status: 'rejected' as const,
        notes: 'Implementation does not meet requirements.',
      };

      // Mock task exists
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);

      // Mock task update result
      const mockRejectedTask = {
        ...mockTask,
        status: 'Rejected',
        completionDate: null, // Should remain null for rejected tasks
      };
      mockPrismaService.task.update.mockResolvedValue(mockRejectedTask);

      const result = await service.completeTask(rejectParams);

      // Check task update data doesn't include completion date
      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { taskId: rejectParams.taskId },
        data: {
          status: 'Rejected',
        },
        select: expect.anything(),
      });

      expect(result.status).toBe('Rejected');
      expect(result.completionStatus).toBe('rejected');
      expect(result.completionDate).toBeNull();
    });

    it('should throw NotFoundException if task does not exist', async () => {
      // Mock task not found
      mockPrismaService.task.findUnique.mockResolvedValue(null);

      await expect(service.completeTask(params)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should handle Prisma P2025 error', async () => {
      // Mock task found in first step
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);

      // Mock Prisma error in update step
      mockPrismaService.task.update.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Not found', {
          code: 'P2025',
          clientVersion: 'test',
        }),
      );

      await expect(service.completeTask(params)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      // Mock task found in first step
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);

      // Mock generic error in update step
      mockPrismaService.task.update.mockRejectedValue(
        new Error('Database error'),
      );

      await expect(service.completeTask(params)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
