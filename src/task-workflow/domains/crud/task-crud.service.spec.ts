/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Test, TestingModule } from '@nestjs/testing';
import { TaskCrudService } from './task-crud.service';

import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

const mockPrismaService = {
  task: {
    create: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
    // No need for other model mocks here if TaskCrudService only interacts with Task and its direct cascade deletions
  },
  taskDescription: {
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
  comment: { deleteMany: jest.fn() }, // For cascading delete logic test
  commit: { deleteMany: jest.fn() },
  delegationRecord: { deleteMany: jest.fn() },
  subtask: { deleteMany: jest.fn() },
  implementationPlan: { deleteMany: jest.fn() },
  codeReview: { deleteMany: jest.fn() },
  completionReport: { deleteMany: jest.fn() },
  researchReport: { deleteMany: jest.fn() },
  workflowTransition: { deleteMany: jest.fn() },
  $transaction: jest.fn(),
};

describe('TaskCrudService', () => {
  let service: TaskCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskCrudService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TaskCrudService>(TaskCrudService);
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    const basicParams = {
      taskId: 'CRUD-001',
      taskName: 'CRUD Test Task',
    };

    const paramsWithDescription = {
      taskId: 'CRUD-002',
      taskName: 'CRUD Test Task with Description',
      description: 'Test description',
      businessRequirements: 'Test business requirements',
      technicalRequirements: 'Test technical requirements',
      acceptanceCriteria: ['Criterion 1', 'Criterion 2'],
    };

    const expectedDbTask = {
      taskId: 'CRUD-001',
      name: 'CRUD Test Task',
      status: 'Not Started',
      currentMode: 'boomerang',
    };

    beforeEach(() => {
      // Mock transaction to execute callback immediately
      mockPrismaService.$transaction.mockImplementation((callback) =>
        callback(mockPrismaService),
      );
    });

    it('should create task without TaskDescription when no description fields provided', async () => {
      mockPrismaService.task.create.mockResolvedValue(expectedDbTask);

      const result = await service.createTask(basicParams);

      expect(mockPrismaService.$transaction).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.task.create).toHaveBeenCalledWith({
        data: {
          taskId: basicParams.taskId,
          name: basicParams.taskName,
          status: 'Not Started',
          currentMode: 'boomerang',
        },
      });
      expect(mockPrismaService.taskDescription.create).not.toHaveBeenCalled();
      expect(result).toEqual(expectedDbTask);
    });

    it('should create task with TaskDescription when description fields provided', async () => {
      const expectedTaskWithDesc = {
        taskId: 'CRUD-002',
        name: 'CRUD Test Task with Description',
        status: 'Not Started',
        currentMode: 'boomerang',
      };

      mockPrismaService.task.create.mockResolvedValue(expectedTaskWithDesc);

      const result = await service.createTask(paramsWithDescription);

      expect(mockPrismaService.$transaction).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.task.create).toHaveBeenCalledWith({
        data: {
          taskId: paramsWithDescription.taskId,
          name: paramsWithDescription.taskName,
          status: 'Not Started',
          currentMode: 'boomerang',
        },
      });
      expect(mockPrismaService.taskDescription.create).toHaveBeenCalledWith({
        data: {
          taskId: paramsWithDescription.taskId,
          description: paramsWithDescription.description,
          businessRequirements: paramsWithDescription.businessRequirements,
          technicalRequirements: paramsWithDescription.technicalRequirements,
          acceptanceCriteria: paramsWithDescription.acceptanceCriteria,
        },
      });
      expect(result).toEqual(expectedTaskWithDesc);
    });

    it('should create TaskDescription with defaults for missing fields', async () => {
      const paramsWithPartialDesc = {
        taskId: 'CRUD-003',
        taskName: 'Partial Description Task',
        description: 'Only description provided',
      };

      const expectedTask = {
        taskId: 'CRUD-003',
        name: 'Partial Description Task',
        status: 'Not Started',
        currentMode: 'boomerang',
      };

      mockPrismaService.task.create.mockResolvedValue(expectedTask);

      const result = await service.createTask(paramsWithPartialDesc);

      expect(mockPrismaService.taskDescription.create).toHaveBeenCalledWith({
        data: {
          taskId: paramsWithPartialDesc.taskId,
          description: paramsWithPartialDesc.description,
          businessRequirements: 'To be defined',
          technicalRequirements: 'To be defined',
          acceptanceCriteria: [],
        },
      });
      expect(result).toEqual(expectedTask);
    });

    it('should throw ConflictException on Prisma P2002 error', async () => {
      mockPrismaService.$transaction.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('', {
          code: 'P2002',
          clientVersion: 'test',
        }),
      );
      await expect(service.createTask(basicParams)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      mockPrismaService.$transaction.mockRejectedValue(
        new Error('Other DB Error'),
      );
      await expect(service.createTask(basicParams)).rejects.toThrow(
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
      mockPrismaService.$transaction.mockImplementation((callback) =>
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
