/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { TaskWorkflowService } from './task-workflow.service';
import {
  TaskCrudService,
  TaskQueryService,
  TaskStateService,
  TaskCommentService,
  TaskDescriptionService,
} from './services'; // Import real services to be mocked
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CompleteTaskSchema,
  DelegateTaskSchema,
  GetCurrentModeForTaskSchema,
} from './schemas';
import { z } from 'zod';

// Mocks for the specialized services
const mockTaskCrudService = {
  createTask: jest.fn(),
  deleteTask: jest.fn(),
};
const mockTaskQueryService = {
  getTaskContext: jest.fn(),
  listTasks: jest.fn(),
  continueTask: jest.fn(),
  getTaskDashboardData: jest.fn(),
};
const mockTaskStateService = {
  updateTaskStatus: jest.fn(),
  getTaskStatus: jest.fn(),
  delegateTask: jest.fn(),
  completeTask: jest.fn(),
  getCurrentModeForTask: jest.fn(),
};
const mockTaskCommentService = {
  addTaskNote: jest.fn(),
  createCommentForStatusUpdate: jest.fn(),
};
const mockTaskDescriptionService = {
  updateTaskDescription: jest.fn(),
};

describe('TaskWorkflowService (Facade)', () => {
  let service: TaskWorkflowService;
  let taskCrudService: TaskCrudService;
  let taskQueryService: TaskQueryService;
  let taskStateService: TaskStateService;
  let taskCommentService: TaskCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskWorkflowService, // The Facade service itself
        { provide: TaskCrudService, useValue: mockTaskCrudService },
        { provide: TaskQueryService, useValue: mockTaskQueryService },
        { provide: TaskStateService, useValue: mockTaskStateService },
        { provide: TaskCommentService, useValue: mockTaskCommentService },
        {
          provide: TaskDescriptionService,
          useValue: mockTaskDescriptionService,
        },
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    service = module.get<TaskWorkflowService>(TaskWorkflowService);
    taskCrudService = module.get<TaskCrudService>(TaskCrudService);
    taskQueryService = module.get<TaskQueryService>(TaskQueryService);
    taskStateService = module.get<TaskStateService>(TaskStateService);
    taskCommentService = module.get<TaskCommentService>(TaskCommentService);

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- createTask Tests ---
  describe('createTask', () => {
    const createTaskParams = {
      taskId: 'TSK-F-001',
      taskName: 'Facade Test',
      description: 'Facade Desc',
    };
    const mockNewTaskFromService = {
      taskId: 'TSK-F-001',
      name: 'Facade Test',
      status: 'Not Started',
      currentMode: 'boomerang',
    }; // as returned by TaskCrudService

    it('should call taskCrudService.createTask and return formatted MCP response', async () => {
      mockTaskCrudService.createTask.mockResolvedValue(mockNewTaskFromService);

      const result = await service.createTask(createTaskParams);

      expect(taskCrudService.createTask).toHaveBeenCalledWith(createTaskParams);
      expect(result.content[0].text).toContain(
        `Task '${mockNewTaskFromService.name}' (ID: ${mockNewTaskFromService.taskId}) created successfully`,
      );
      expect(result.content[0].text).toContain('Description provided: Yes');
    });

    it('should propagate ConflictException from taskCrudService', async () => {
      mockTaskCrudService.createTask.mockRejectedValue(
        new ConflictException('Already exists.'),
      );
      await expect(service.createTask(createTaskParams)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should wrap other errors from taskCrudService in InternalServerErrorException', async () => {
      mockTaskCrudService.createTask.mockRejectedValue(
        new Error('Some CRONCH error'),
      );
      await expect(service.createTask(createTaskParams)).rejects.toThrow(
        new InternalServerErrorException(
          `Facade: Could not create task '${createTaskParams.taskId}'.`,
        ),
      );
    });
  });

  // --- getTaskContext Tests ---
  describe('getTaskContext', () => {
    const params = { taskId: 'TSK-F-CTX-001' };
    const mockTaskDataFromService = {
      taskId: params.taskId,
      name: 'Context Task',
      status: 'Pending',
      currentMode: 'test',
    };

    it('should call taskQueryService.getTaskContext and return formatted MCP response', async () => {
      mockTaskQueryService.getTaskContext.mockResolvedValue(
        mockTaskDataFromService,
      );
      const result = await service.getTaskContext(params);
      expect(taskQueryService.getTaskContext).toHaveBeenCalledWith(params);
      expect(result.content[1].json).toEqual(mockTaskDataFromService);
      expect(result.content[0].text).toContain(
        `Found task: ID=${mockTaskDataFromService.taskId}`,
      );
    });

    it('should propagate NotFoundException from taskQueryService', async () => {
      mockTaskQueryService.getTaskContext.mockRejectedValue(
        new NotFoundException(),
      );
      await expect(service.getTaskContext(params)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // --- updateTaskStatus Tests ---
  describe('updateTaskStatus', () => {
    const params = { taskId: 'TSK-F-UPD-001', status: 'In Progress' };
    const mockUpdatedTaskFromService = {
      taskId: params.taskId,
      name: 'Updated Task',
      status: 'In Progress',
      currentMode: 'dev',
    };

    it('should call taskStateService.updateTaskStatus and format MCP response (no notes)', async () => {
      mockTaskStateService.updateTaskStatus.mockResolvedValue(
        mockUpdatedTaskFromService,
      );
      const result = await service.updateTaskStatus(params);
      expect(taskStateService.updateTaskStatus).toHaveBeenCalledWith(params);
      expect(
        taskCommentService.createCommentForStatusUpdate,
      ).not.toHaveBeenCalled();
      expect(result.content[0].text).toContain(
        `status updated to '${mockUpdatedTaskFromService.status}'`,
      );
      expect(result.content[1].json).toEqual(mockUpdatedTaskFromService);
    });

    it('should also call taskCommentService.createCommentForStatusUpdate if notes are provided', async () => {
      const paramsWithNotes = {
        ...params,
        notes: 'Important update notes',
        currentMode: 'testing',
      };
      const taskAfterStateUpdate = {
        ...mockUpdatedTaskFromService,
        currentMode: 'testing',
      };
      mockTaskStateService.updateTaskStatus.mockResolvedValue(
        taskAfterStateUpdate,
      );
      mockTaskCommentService.createCommentForStatusUpdate.mockResolvedValue({
        id: 1,
        content: paramsWithNotes.notes,
      } as any);

      await service.updateTaskStatus(paramsWithNotes);
      expect(taskStateService.updateTaskStatus).toHaveBeenCalledWith(
        paramsWithNotes,
      );
      expect(
        taskCommentService.createCommentForStatusUpdate,
      ).toHaveBeenCalledWith({
        taskId: paramsWithNotes.taskId,
        notes: paramsWithNotes.notes,
        currentTaskMode: taskAfterStateUpdate.currentMode,
        paramsMode: paramsWithNotes.currentMode,
      });
    });
  });

  // --- listTasks Tests ---
  describe('listTasks', () => {
    const params = { status: 'Completed' };
    const mockListDataFromService = {
      tasks: [{ id: 1, name: 'Listed Task' }],
      totalTasks: 1,
      currentPage: 1,
      pageSize: 50,
      totalPages: 1,
    };

    it('should call taskQueryService.listTasks and return formatted MCP response', async () => {
      mockTaskQueryService.listTasks.mockResolvedValue(mockListDataFromService);
      const result = await service.listTasks(params);
      expect(taskQueryService.listTasks).toHaveBeenCalledWith(params);
      expect(result.content[1].json).toEqual(mockListDataFromService);
      expect(result.content[0].text).toContain(
        `Found ${mockListDataFromService.tasks.length} tasks`,
      );
    });
  });

  // --- deleteTask Tests ---
  describe('deleteTask', () => {
    const params = { taskId: 'TSK-F-DEL-001' };

    it('should call taskCrudService.deleteTask and return success message', async () => {
      mockTaskCrudService.deleteTask.mockResolvedValue(undefined); // deleteTask in service might not return anything
      const result = await service.deleteTask(params);
      expect(taskCrudService.deleteTask).toHaveBeenCalledWith(params);
      expect(result.content[0].text).toContain(
        `Task '${params.taskId}' and all its associated data deleted successfully`,
      );
    });

    it('should propagate NotFoundException from taskCrudService', async () => {
      mockTaskCrudService.deleteTask.mockRejectedValue(new NotFoundException());
      await expect(service.deleteTask(params)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // --- addTaskNote Tests ---
  describe('addTaskNote', () => {
    const params = {
      taskId: 'TSK-F-NOTE-001',
      note: 'A new note',
      mode: 'test-mode',
    };
    const mockCreatedCommentFromService = {
      id: 123,
      taskId: params.taskId,
      content: params.note,
      mode: params.mode,
    };

    it('should call taskCommentService.addTaskNote and return formatted MCP response', async () => {
      mockTaskCommentService.addTaskNote.mockResolvedValue(
        mockCreatedCommentFromService as any,
      );
      const result = await service.addTaskNote(params);
      expect(taskCommentService.addTaskNote).toHaveBeenCalledWith(params);
      expect(result.content[1].json).toEqual(mockCreatedCommentFromService);
      expect(result.content[0].text).toContain(
        `Note added successfully to task '${params.taskId}'. Comment ID: ${mockCreatedCommentFromService.id}`,
      );
    });

    it('should propagate NotFoundException from taskCommentService', async () => {
      mockTaskCommentService.addTaskNote.mockRejectedValue(
        new NotFoundException(),
      );
      await expect(service.addTaskNote(params)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delegateTask', () => {
    const params: z.infer<typeof DelegateTaskSchema> = {
      taskId: 'TSK-F-DEL-001',
      fromMode: 'boomerang',
      toMode: 'architect',
      message: 'Please implement this feature',
    };

    const mockDelegatedTask = {
      taskId: 'TSK-F-DEL-001',
      name: 'Test Task',
      status: 'In Progress',
      currentMode: 'architect',
      fromMode: 'boomerang',
      toMode: 'architect',
      delegationMessage: 'Please implement this feature',
    };

    it('should call taskStateService.delegateTask and optionally taskCommentService.addTaskNote', async () => {
      mockTaskStateService.delegateTask.mockResolvedValue(mockDelegatedTask);
      mockTaskCommentService.addTaskNote.mockResolvedValue({ id: 123 });

      const result = await service.delegateTask(params);

      expect(taskStateService.delegateTask).toHaveBeenCalledWith(params);
      expect(taskCommentService.addTaskNote).toHaveBeenCalledWith({
        taskId: params.taskId,
        note: `Delegation from ${params.fromMode} to ${params.toMode}: ${params.message}`,
        mode: params.fromMode,
      });

      expect(result.content[0].text).toContain('with message');
      expect(result.content[1].json).toEqual(mockDelegatedTask);
    });

    it('should not create a comment if no message is provided', async () => {
      const paramsWithoutMessage = { ...params, message: undefined };
      const mockTaskWithoutMessage = {
        ...mockDelegatedTask,
        delegationMessage: null,
      };

      mockTaskStateService.delegateTask.mockResolvedValue(
        mockTaskWithoutMessage,
      );

      await service.delegateTask(paramsWithoutMessage);

      expect(taskCommentService.addTaskNote).not.toHaveBeenCalled();
    });

    it('should handle NotFoundExceptions from taskStateService', async () => {
      mockTaskStateService.delegateTask.mockRejectedValue(
        new NotFoundException(`Task with ID '${params.taskId}' not found.`),
      );

      await expect(service.delegateTask(params)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should wrap unexpected errors in InternalServerErrorException', async () => {
      mockTaskStateService.delegateTask.mockRejectedValue(
        new Error('Unexpected error'),
      );

      await expect(service.delegateTask(params)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('completeTask', () => {
    const params: z.infer<typeof CompleteTaskSchema> = {
      taskId: 'TSK-F-COMP-001',
      mode: 'code-review',
      status: 'completed',
      notes: 'All acceptance criteria met',
    };

    const mockCompletedTask = {
      taskId: 'TSK-F-COMP-001',
      name: 'Test Task',
      status: 'Completed',
      currentMode: 'code-review',
      mode: 'code-review',
      completionDate: new Date(),
      completionStatus: 'completed',
    };

    it('should call taskStateService.completeTask and taskCommentService.addTaskNote with notes', async () => {
      mockTaskStateService.completeTask.mockResolvedValue(mockCompletedTask);
      mockTaskCommentService.addTaskNote.mockResolvedValue({ id: 123 });

      const result = await service.completeTask(params);

      expect(taskStateService.completeTask).toHaveBeenCalledWith(params);
      expect(taskCommentService.addTaskNote).toHaveBeenCalledWith({
        taskId: params.taskId,
        note: `Task completed by ${params.mode}: ${params.notes}`,
        mode: params.mode,
      });

      expect(result.content[0].text).toContain('successfully completed');
      expect(result.content[0].text).toContain('with notes');
      expect(result.content[1].json).toEqual(mockCompletedTask);
    });

    it('should not create a comment if no notes are provided', async () => {
      const paramsWithoutNotes = {
        ...params,
        notes: undefined,
      };

      mockTaskStateService.completeTask.mockResolvedValue({
        ...mockCompletedTask,
      });

      await service.completeTask(paramsWithoutNotes);

      expect(taskCommentService.addTaskNote).not.toHaveBeenCalled();
    });

    it('should use rejected message for rejected tasks', async () => {
      const rejectParams = {
        ...params,
        status: 'rejected' as const,
        notes: 'Missing acceptance criteria',
      };

      const mockRejectedTask = {
        ...mockCompletedTask,
        status: 'Rejected',
        completionDate: null,
        completionStatus: 'rejected',
      };

      mockTaskStateService.completeTask.mockResolvedValue(mockRejectedTask);
      mockTaskCommentService.addTaskNote.mockResolvedValue({ id: 124 });

      const result = await service.completeTask(rejectParams);

      expect(taskCommentService.addTaskNote).toHaveBeenCalledWith({
        taskId: rejectParams.taskId,
        note: `Task rejected by ${rejectParams.mode}: ${rejectParams.notes}`,
        mode: rejectParams.mode,
      });

      expect(result.content[0].text).toContain('rejected');
      expect(result.content[1].json).toEqual(mockRejectedTask);
    });

    it('should handle NotFoundException from taskStateService', async () => {
      mockTaskStateService.completeTask.mockRejectedValue(
        new NotFoundException(`Task with ID '${params.taskId}' not found.`),
      );

      await expect(service.completeTask(params)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should wrap other errors in InternalServerErrorException', async () => {
      mockTaskStateService.completeTask.mockRejectedValue(
        new Error('Unexpected error'),
      );

      await expect(service.completeTask(params)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getCurrentModeForTask', () => {
    const params: z.infer<typeof GetCurrentModeForTaskSchema> = {
      taskId: 'TSK-F-MODE-001',
    };

    const mockTaskModeInfo = {
      taskId: 'TSK-F-MODE-001',
      name: 'Mode Query Test Task',
      currentMode: 'architect',
    };

    it('should call taskStateService.getCurrentModeForTask and format response', async () => {
      mockTaskStateService.getCurrentModeForTask.mockResolvedValue(
        mockTaskModeInfo,
      );

      const result = await service.getCurrentModeForTask(params);

      expect(taskStateService.getCurrentModeForTask).toHaveBeenCalledWith(
        params,
      );
      expect(result.content[0].text).toContain(
        `is currently owned by ${mockTaskModeInfo.currentMode}`,
      );
      expect(result.content[1].json).toEqual(mockTaskModeInfo);
    });

    it('should handle tasks with no current mode', async () => {
      const mockTaskWithoutMode = {
        ...mockTaskModeInfo,
        currentMode: null,
      };
      mockTaskStateService.getCurrentModeForTask.mockResolvedValue(
        mockTaskWithoutMode,
      );

      const result = await service.getCurrentModeForTask(params);

      expect(result.content[0].text).toContain('owned by no one');
    });

    it('should handle NotFoundException from taskStateService', async () => {
      mockTaskStateService.getCurrentModeForTask.mockRejectedValue(
        new NotFoundException(`Task with ID '${params.taskId}' not found.`),
      );

      await expect(service.getCurrentModeForTask(params)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should wrap other errors in InternalServerErrorException', async () => {
      mockTaskStateService.getCurrentModeForTask.mockRejectedValue(
        new Error('Unexpected error'),
      );

      await expect(service.getCurrentModeForTask(params)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('continueTask', () => {
    const taskId = 'TSK-WF-CONT';
    const mockContinueContext = {
      taskId,
      name: 'Workflow Continue Task',
      status: 'in-progress',
      currentMode: 'developer-mode',
      description: 'This is a task to be continued via workflow.',
      acceptanceCriteria: ['ACWF1'],
      recentNotes: [
        { mode: 'system', content: 'Note 1', createdAt: new Date() },
      ],
    };

    it('should call taskQueryService.continueTask and return formatted context', async () => {
      mockTaskQueryService.continueTask.mockResolvedValue(mockContinueContext);

      const result = await service.continueTask({ taskId });

      expect(mockTaskQueryService.continueTask).toHaveBeenCalledWith({
        taskId,
      });
      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: `Context for continuing task '${taskId}' retrieved. Status: ${mockContinueContext.status}, Mode: ${mockContinueContext.currentMode}.`,
          },
          {
            type: 'json',
            json: mockContinueContext,
          },
        ],
      });
    });

    it('should re-throw NotFoundException from taskQueryService', async () => {
      const error = new NotFoundException(`Task '${taskId}' not found.`);
      mockTaskQueryService.continueTask.mockRejectedValue(error);

      await expect(service.continueTask({ taskId })).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.continueTask({ taskId })).rejects.toThrow(
        error.message,
      );
    });

    it('should re-throw InternalServerErrorException from taskQueryService', async () => {
      const error = new InternalServerErrorException('DB error on continue');
      mockTaskQueryService.continueTask.mockRejectedValue(error);

      await expect(service.continueTask({ taskId })).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.continueTask({ taskId })).rejects.toThrow(
        error.message,
      );
    });

    it('should throw InternalServerErrorException for unexpected errors', async () => {
      const error = new Error('Some unexpected error');
      mockTaskQueryService.continueTask.mockRejectedValue(error);

      await expect(service.continueTask({ taskId })).rejects.toThrow(
        InternalServerErrorException,
      );
      // Check for the specific facade error message
      await expect(service.continueTask({ taskId })).rejects.toThrow(
        `Facade: Could not get continuation context for task '${taskId}'.`,
      );
    });
  });

  describe('taskDashboard', () => {
    const mockDashboardData = {
      totalTasks: 5,
      tasksByStatus: { InProgress: 2, Completed: 3 },
      tasksByMode: { architect: 1, developer: 4 },
    };

    it('should call taskQueryService.getTaskDashboardData and return formatted MCP response', async () => {
      mockTaskQueryService.getTaskDashboardData.mockResolvedValue(
        mockDashboardData,
      );
      const result = await service.taskDashboard();
      expect(taskQueryService.getTaskDashboardData).toHaveBeenCalled();
      expect(result.content[1].json).toEqual(mockDashboardData);
      expect(result.content[0].text).toContain('Dashboard: 5 total tasks');
      expect(result.content[0].text).toContain('Status breakdown');
      expect(result.content[0].text).toContain('Mode breakdown');
    });

    it('should throw InternalServerErrorException if service throws', async () => {
      mockTaskQueryService.getTaskDashboardData.mockRejectedValue(
        new InternalServerErrorException('DB error'),
      );
      await expect(service.taskDashboard()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  // describe('processCommand', () => { ... });
});
