import { Test, TestingModule } from '@nestjs/testing';
import { TaskCrudService } from './task-crud.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';

const mockPrismaService = {
  task: {
    create: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
    // No need for other model mocks here if TaskCrudService only interacts with Task and its direct cascade deletions
  },
  comment: { deleteMany: jest.fn() }, // For cascading delete logic test
  commit: { deleteMany: jest.fn() },
  delegationRecord: { deleteMany: jest.fn() },
  subtask: { deleteMany: jest.fn() },
  implementationPlan: { deleteMany: jest.fn() },
  taskDescription: { deleteMany: jest.fn() },
  codeReview: { deleteMany: jest.fn() },
  completionReport: { deleteMany: jest.fn() },
  researchReport: { deleteMany: jest.fn() },
  workflowTransition: { deleteMany: jest.fn() },
  $transaction: jest.fn(),
};

describe('TaskCrudService', () => {
  let service: TaskCrudService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskCrudService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TaskCrudService>(TaskCrudService);
    prisma = module.get<PrismaService>(PrismaService); // For verifying prisma calls
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    const params = {
      taskId: 'CRUD-001',
      taskName: 'CRUD Test Task',
      description: 'Desc',
    };
    const expectedDbTask = {
      ...params,
      id: 'uuid',
      status: 'Not Started',
      currentMode: 'boomerang',
    };

    it('should create and return a task', async () => {
      mockPrismaService.task.create.mockResolvedValue(expectedDbTask);
      const result = await service.createTask(params);
      expect(prisma.task.create).toHaveBeenCalledWith({
        data: {
          taskId: params.taskId,
          name: params.taskName,
          status: 'Not Started',
          currentMode: 'boomerang',
        },
      });
      expect(result).toEqual(expectedDbTask);
    });

    it('should throw ConflictException on Prisma P2002 error', async () => {
      mockPrismaService.task.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('', {
          code: 'P2002',
          clientVersion: 'test',
        }),
      );
      await expect(service.createTask(params)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      mockPrismaService.task.create.mockRejectedValue(
        new Error('Other DB Error'),
      );
      await expect(service.createTask(params)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('deleteTask', () => {
    const params = { taskId: 'CRUD-DEL-001' };

    it('should successfully delete task and related data via transaction', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue({
        taskId: params.taskId,
      }); // Task exists
      mockPrismaService.$transaction.mockImplementation(async (callback) =>
        callback(mockPrismaService),
      );

      await service.deleteTask(params);

      expect(mockPrismaService.task.findUnique).toHaveBeenCalledWith({
        where: { taskId: params.taskId },
        select: { taskId: true },
      });
      expect(mockPrismaService.$transaction).toHaveBeenCalledTimes(1);
      // Check if main entity delete was called within transaction logic
      expect(mockPrismaService.task.delete).toHaveBeenCalledWith({
        where: { taskId: params.taskId },
      });
      // Optionally check a few related deletes
      expect(mockPrismaService.comment.deleteMany).toHaveBeenCalledWith({
        where: { taskId: params.taskId },
      });
    });

    it('should throw NotFoundException if task to delete is not found', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(null); // Task does not exist
      await expect(service.deleteTask(params)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.$transaction).not.toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException if transaction fails', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue({
        taskId: params.taskId,
      });
      mockPrismaService.$transaction.mockRejectedValue(
        new Error('Transaction Failure'),
      );
      await expect(service.deleteTask(params)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
