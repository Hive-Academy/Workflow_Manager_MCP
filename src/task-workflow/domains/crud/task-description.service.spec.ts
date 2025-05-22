import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TaskDescriptionService } from './task-description.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, TaskDescription } from 'generated/prisma';
import { Task } from 'generated/prisma';

describe('TaskDescriptionService', () => {
  let service: TaskDescriptionService;
  let prisma: PrismaService;

  const mockPrismaService = {
    task: {
      findUnique: jest.fn(),
    },
    taskDescription: {
      upsert: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskDescriptionService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TaskDescriptionService>(TaskDescriptionService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateTaskDescription', () => {
    const taskId = 'test-task-id';
    const input = {
      taskId,
      description: 'Test Description',
      acceptanceCriteria: { criterion1: 'value1' },
      content: 'Test Content',
    };
    const mockTask: Task = {
      taskId,
      name: 'Test Task',
      status: 'not-started',
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      currentMode: 'boomerang',
      version: 0,
    };
    const mockTaskDescription: TaskDescription = {
      taskId,
      description: input.description,
      acceptanceCriteria: input.acceptanceCriteria as Prisma.JsonValue,
      content: input.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should throw NotFoundException if task does not exist', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(null);
      await expect(service.updateTaskDescription(input)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.task.findUnique).toHaveBeenCalledWith({
        where: { id: taskId },
      });
    });

    it('should create/update with all fields provided', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);
      mockPrismaService.taskDescription.upsert.mockResolvedValue(
        mockTaskDescription,
      );

      const result = await service.updateTaskDescription(input);
      expect(result).toEqual(mockTaskDescription);
      expect(mockPrismaService.taskDescription.upsert).toHaveBeenCalledWith({
        where: { taskId },
        create: {
          task: { connect: { id: taskId } },
          description: input.description,
          acceptanceCriteria: input.acceptanceCriteria,
          content: input.content,
        },
        update: {
          description: input.description,
          acceptanceCriteria: input.acceptanceCriteria,
          content: input.content,
        },
      });
    });

    it('should handle undefined optional fields for create (set to null/JsonNull)', async () => {
      const inputUndefined: UpdateTaskDescriptionInputType = {
        taskId,
        description: 'Desc Only',
      };
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);
      mockPrismaService.taskDescription.upsert.mockResolvedValue({
        ...mockTaskDescription,
        description: 'Desc Only',
        acceptanceCriteria: Prisma.JsonNull,
        content: null,
      });

      await service.updateTaskDescription(inputUndefined);
      expect(mockPrismaService.taskDescription.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: {
            task: { connect: { id: taskId } },
            description: 'Desc Only',
            acceptanceCriteria: Prisma.JsonNull,
            content: null,
          },
        }),
      );
    });

    it('should handle undefined optional fields for update (omit from payload)', async () => {
      const inputUndefined: UpdateTaskDescriptionInputType = {
        taskId,
        description: 'Desc Update Only',
      };
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);
      mockPrismaService.taskDescription.upsert.mockResolvedValue({
        ...mockTaskDescription,
        description: 'Desc Update Only',
      });

      await service.updateTaskDescription(inputUndefined);
      expect(mockPrismaService.taskDescription.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          update: {
            description: 'Desc Update Only',
            // no other fields here
          },
        }),
      );
    });

    it('should update fields if explicitly provided (e.g. empty object/string)', async () => {
      const inputExplicitEmpty: UpdateTaskDescriptionInputType = {
        taskId,
        description: 'Explicit',
        acceptanceCriteria: {},
        content: '',
      };
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);
      mockPrismaService.taskDescription.upsert.mockResolvedValue({
        ...mockTaskDescription,
        description: 'Explicit',
        acceptanceCriteria: {},
        content: '',
      });

      await service.updateTaskDescription(inputExplicitEmpty);
      expect(mockPrismaService.taskDescription.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          update: {
            description: 'Explicit',
            acceptanceCriteria: {},
            content: '',
          },
        }),
      );
    });
  });
});
