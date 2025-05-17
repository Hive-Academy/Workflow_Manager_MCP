import { Test, TestingModule } from '@nestjs/testing';
import { TaskQueryService } from './task-query.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

const mockPrismaService = {
  task: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
  // No other models needed for TaskQueryService mocks
};

describe('TaskQueryService', () => {
  let service: TaskQueryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskQueryService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TaskQueryService>(TaskQueryService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('getTaskContext', () => {
    const params = { taskId: 'QUERY-CTX-001' };
    const mockTaskData = {
      taskId: params.taskId,
      name: 'Context Task',
      taskDescription: {},
      implementationPlans: [],
    };

    it('should return task data if found', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(mockTaskData);
      const result = await service.getTaskContext(params);
      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { taskId: params.taskId },
        include: { taskDescription: true, implementationPlans: true },
      });
      expect(result).toEqual(mockTaskData);
    });

    it('should throw NotFoundException if task not found', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(null);
      await expect(service.getTaskContext(params)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      mockPrismaService.task.findUnique.mockRejectedValue(
        new Error('DB Error'),
      );
      await expect(service.getTaskContext(params)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('listTasks', () => {
    const mockTasksArray = [{ taskId: 'Q-LIST-001', name: 'Listed Task' }];
    const mockTotalCount = 1;

    it('should list tasks with default pagination and no filters', async () => {
      mockPrismaService.task.findMany.mockResolvedValue(mockTasksArray);
      mockPrismaService.task.count.mockResolvedValue(mockTotalCount);

      const result = await service.listTasks({});

      expect(prisma.task.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {},
          take: 50,
          orderBy: { creationDate: 'desc' },
        }),
      );
      expect(prisma.task.count).toHaveBeenCalledWith({ where: {} });
      expect(result.tasks).toEqual(mockTasksArray);
      expect(result.totalTasks).toBe(mockTotalCount);
    });

    it('should list tasks with status filter', async () => {
      const params = { status: 'Completed' };
      mockPrismaService.task.findMany.mockResolvedValue(mockTasksArray);
      mockPrismaService.task.count.mockResolvedValue(mockTotalCount);

      await service.listTasks(params);
      expect(prisma.task.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: 'Completed' },
        }),
      );
      expect(prisma.task.count).toHaveBeenCalledWith({
        where: { status: 'Completed' },
      });
    });

    it('should handle custom pagination (skip and take)', async () => {
      const params = { skip: 10, take: 20 };
      mockPrismaService.task.findMany.mockResolvedValue(mockTasksArray);
      mockPrismaService.task.count.mockResolvedValue(mockTotalCount);

      await service.listTasks(params);
      expect(prisma.task.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 10,
          take: 20,
        }),
      );
    });

    it('should throw InternalServerErrorException on error', async () => {
      mockPrismaService.task.findMany.mockRejectedValue(new Error('DB Error'));
      await expect(service.listTasks({})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
