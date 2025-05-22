import { Test, TestingModule } from '@nestjs/testing';
import { TaskCommentService } from './task-comment.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

const mockPrismaService = {
  task: { findUnique: jest.fn() }, // For checking task existence
  subtask: { findUnique: jest.fn() }, // For checking subtask existence
  comment: { create: jest.fn() },
};

describe('TaskCommentService', () => {
  let service: TaskCommentService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskCommentService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TaskCommentService>(TaskCommentService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('addTaskNote', () => {
    const params = { taskId: 'CMT-001', note: 'Test comment', mode: 'tester' };
    const mockTask = { taskId: params.taskId };
    const mockCreatedComment = { id: 1, ...params };

    it('should create and return a comment for a task', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);
      mockPrismaService.comment.create.mockResolvedValue(mockCreatedComment);

      const result = await service.addTaskNote(params);

      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { taskId: params.taskId },
        select: { taskId: true },
      });
      expect(prisma.comment.create).toHaveBeenCalledWith({
        data: {
          taskId: params.taskId,
          content: params.note,
          mode: params.mode,
          subtaskId: undefined,
        },
      });
      expect(result).toEqual(mockCreatedComment);
    });

    it('should create comment linked to subtask if subtaskId is provided and valid', async () => {
      const paramsWithSubtask = { ...params, subtaskId: 12 };
      const mockSubtask = { id: 12, taskId: params.taskId };
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);
      mockPrismaService.subtask.findUnique.mockResolvedValue(mockSubtask);
      mockPrismaService.comment.create.mockResolvedValue({
        ...mockCreatedComment,
        subtaskId: 12,
      });

      await service.addTaskNote(paramsWithSubtask);
      expect(prisma.subtask.findUnique).toHaveBeenCalledWith({
        where: { id: 12, taskId: params.taskId },
        select: { id: true },
      });
      expect(prisma.comment.create).toHaveBeenCalledWith(
        expect.objectContaining({ subtaskId: 12 }),
      );
    });

    it('should throw NotFoundException if task does not exist', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(null);
      await expect(service.addTaskNote(params)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if subtask does not exist for given subtaskId', async () => {
      const paramsWithSubtask = { ...params, subtaskId: 12 };
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);
      mockPrismaService.subtask.findUnique.mockResolvedValue(null); // Subtask not found
      await expect(service.addTaskNote(paramsWithSubtask)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      mockPrismaService.task.findUnique.mockResolvedValue(mockTask);
      mockPrismaService.comment.create.mockRejectedValue(new Error('DB Error'));
      await expect(service.addTaskNote(params)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('createCommentForStatusUpdate', () => {
    const data = {
      taskId: 'CMT-UPD-001',
      notes: 'Status update note',
      currentTaskMode: 'developer',
      paramsMode: undefined,
    };
    const mockCreatedComment = {
      id: 2,
      taskId: data.taskId,
      content: data.notes,
      mode: 'developer',
    };

    it('should create a comment using currentTaskMode if paramsMode is not set', async () => {
      mockPrismaService.comment.create.mockResolvedValue(mockCreatedComment);
      const result = await service.createCommentForStatusUpdate(data);
      expect(prisma.comment.create).toHaveBeenCalledWith({
        data: { taskId: data.taskId, content: data.notes, mode: 'developer' },
      });
      expect(result).toEqual(mockCreatedComment);
    });

    it('should prioritize paramsMode for comment mode if available', async () => {
      const dataWithParamsMode = { ...data, paramsMode: 'architect' };
      mockPrismaService.comment.create.mockResolvedValue({
        ...mockCreatedComment,
        mode: 'architect',
      });
      await service.createCommentForStatusUpdate(dataWithParamsMode);
      expect(prisma.comment.create).toHaveBeenCalledWith(
        expect.objectContaining({ mode: 'architect' }),
      );
    });

    it('should use "system" mode if no other mode is determined', async () => {
      const dataNoModes = {
        taskId: 'CMT-SYS-001',
        notes: 'System note',
        currentTaskMode: null,
        paramsMode: null,
      };
      mockPrismaService.comment.create.mockResolvedValue({
        ...mockCreatedComment,
        mode: 'system',
      });
      await service.createCommentForStatusUpdate(dataNoModes);
      expect(prisma.comment.create).toHaveBeenCalledWith(
        expect.objectContaining({ mode: 'system' }),
      );
    });

    it('should throw InternalServerErrorException on error', async () => {
      mockPrismaService.comment.create.mockRejectedValue(new Error('DB Error'));
      await expect(service.createCommentForStatusUpdate(data)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
