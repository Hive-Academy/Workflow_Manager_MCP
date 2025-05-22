import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Task } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  WorkflowMode,
  WorkflowTransitionView,
  TaskStatus,
} from 'src/task-workflow/types';
import { TOKEN_MAPS } from 'src/task-workflow/types/token-refs.schema';
import { PrismaErrorHandlerService } from 'src/task-workflow/utils/prisma-error.handler';
import { z } from 'zod';
import {
  SearchTasksInput,
  PaginatedTaskSummary,
  TaskSummary,
} from '../crud/schemas/search-tasks.schema';
import { ContinueTaskSchema } from './schemas/continue-task.schema';
import { GetTaskContextSchema } from './schemas/get-task-context.schema';
import { TaskDashboardResponse } from './schemas/task-dashboard.schema';
import { WorkflowMapSchema } from './schemas/workflow-map.schema';
import { WorkflowStatusSchema } from './schemas/workflow-status.schema';

@Injectable()
export class TaskQueryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorHandler: PrismaErrorHandlerService,
  ) {}

  async getWorkflowMap(params: z.infer<typeof WorkflowMapSchema>) {
    const modes: WorkflowMode[] = [
      {
        id: 'boomerang-mode',
        name: '🪃 Boomerang',
        description: 'Task Intake, Analysis, Final Verification',
      },
      {
        id: 'researcher-mode',
        name: '🔬 Researcher',
        description: 'Research & Investigation',
      },
      {
        id: 'architect-mode',
        name: '🏛️ Architect',
        description: 'Technical Design & Planning',
      },
      {
        id: 'senior-developer-mode',
        name: '👨‍💻 Senior Developer',
        description: 'Implementation & Testing',
      },
      {
        id: 'code-review-mode',
        name: '🔍 Code Review',
        description: 'Quality Assurance & Verification',
      },
    ];
    const transitions: WorkflowTransitionView[] = [];
    if (params?.taskId) {
      try {
        const task = await this.prisma.task.findUnique({
          where: { taskId: params.taskId },
          include: {
            workflowTransitions: {
              orderBy: { transitionTimestamp: 'asc' },
            },
          },
        });

        if (!task) {
          throw new NotFoundException(`Task ${params.taskId} not found`);
        }

        transitions.push(
          ...task.workflowTransitions.map((t) => ({
            from: t.fromMode,
            to: t.toMode,
            timestamp: t.transitionTimestamp,
          })),
        );
      } catch (error) {
        this.errorHandler.handlePrismaError(error, params.taskId);
      }
    }

    return {
      modes,
      transitions,
    };
  }

  async getTaskContext(params: z.infer<typeof GetTaskContextSchema>) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { taskId: params.taskId },
        include: {
          taskDescription: true,
          implementationPlans: {
            include: {
              subtasks: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          delegationRecords: {
            orderBy: { delegationTimestamp: 'desc' },
            take: 1,
          },
          researchReports: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          codeReviews: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          completionReports: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          comments: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
        },
      });

      if (!task) {
        throw new NotFoundException(`Task ${params.taskId} not found`);
      }

      return {
        task,
        taskDescription: task.taskDescription,
        currentImplementationPlan: task.implementationPlans[0],
        latestDelegation: task.delegationRecords[0],
        latestResearchReport: task.researchReports[0],
        latestCodeReview: task.codeReviews[0],
        latestCompletionReport: task.completionReports[0],
        recentComments: task.comments,
      };
    } catch (error) {
      this.errorHandler.handlePrismaError(error, params.taskId);
    }
  }

  async listTasks(): Promise<Task[]> {
    try {
      const tasks = await this.prisma.task.findMany({
        include: {
          taskDescription: true,
          delegationRecords: {
            orderBy: { delegationTimestamp: 'desc' },
            take: 1,
          },
          comments: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
        orderBy: { creationDate: 'desc' },
      });

      return tasks;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        `Failed to list tasks: ${errorMessage}`,
      );
    }
  }

  async getTaskDashboard(): Promise<TaskDashboardResponse> {
    try {
      const tasks = await this.prisma.task.findMany({
        include: {
          taskDescription: true,
          delegationRecords: {
            orderBy: { delegationTimestamp: 'desc' },
            take: 1,
          },
          comments: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
        orderBy: { creationDate: 'desc' },
      });

      const tasksByStatus: Record<TaskStatus, number> = {
        'not-started': tasks.filter((t) => t.status === 'not-started').length,
        'in-progress': tasks.filter((t) => t.status === 'in-progress').length,
        'needs-review': tasks.filter((t) => t.status === 'needs-review').length,
        'needs-changes': tasks.filter((t) => t.status === 'needs-changes')
          .length,

        completed: tasks.filter((t) => t.status === 'completed').length,
        blocked: tasks.filter((t) => t.status === 'blocked').length,
        paused: tasks.filter((t) => t.status === 'paused').length,
      };

      const tasksByMode: Record<string, number> = {};
      tasks.forEach((t) => {
        if (t.currentMode) {
          tasksByMode[t.currentMode] = (tasksByMode[t.currentMode] || 0) + 1;
        }
      });

      return {
        tasksByStatus,
        tasksByMode,
        totalTasks: tasks.length,
      };
    } catch (error) {
      this.errorHandler.handlePrismaError(error, '');
    }
  }

  async getWorkflowStatus(params: z.infer<typeof WorkflowStatusSchema>) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { taskId: params.taskId },
        include: {
          workflowTransitions: {
            orderBy: { transitionTimestamp: 'asc' },
          },
          delegationRecords: {
            orderBy: { delegationTimestamp: 'desc' },
          },
          comments: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
        },
      });

      if (!task) {
        throw new NotFoundException(`Task ${params.taskId} not found`);
      }

      const data = {
        currentMode: task.currentMode,
        status: task.status,
        transitions: task.workflowTransitions,
        delegations: task.delegationRecords,
        recentComments: task.comments,
      };

      return `# Workflow Status for Task '${params.taskId}'

            ## Current State
            - Mode: ${data.currentMode || 'Not set'}
            - Status: ${data.status || 'Not set'}

            ## Recent Transitions
            ${
              data.transitions.length > 0
                ? data.transitions
                    .map(
                      (t) =>
                        `- ${t.fromMode} → ${t.toMode} (${new Date(t.transitionTimestamp).toLocaleString()})`,
                    )
                    .join('\n')
                : 'No transitions recorded'
            }

            ## Recent Delegations
            ${
              data.delegations.length > 0
                ? data.delegations
                    .map(
                      (d) =>
                        `- To: ${d.toMode} (${new Date(d.delegationTimestamp).toLocaleString()})`,
                    )
                    .join('\n')
                : 'No delegations recorded'
            }

            ## Recent Comments
            ${
              data.recentComments.length > 0
                ? data.recentComments
                    .map(
                      (c) =>
                        `- ${c.content} (${new Date(c.createdAt).toLocaleString()})`,
                    )
                    .join('\n')
                : 'No recent comments'
            }`;
    } catch (error) {
      this.errorHandler.handlePrismaError(error, params.taskId);
    }
  }

  async continueTask(params: z.infer<typeof ContinueTaskSchema>) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { taskId: params.taskId },
        include: {
          taskDescription: true,
          implementationPlans: {
            include: {
              subtasks: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          delegationRecords: {
            orderBy: { delegationTimestamp: 'desc' },
            take: 1,
          },
          researchReports: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          codeReviews: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          comments: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
        },
      });

      if (!task) {
        throw new NotFoundException(`Task ${params.taskId} not found`);
      }

      return {
        task,
        taskDescription: task.taskDescription,
        currentImplementationPlan: task.implementationPlans[0],
        latestDelegation: task.delegationRecords[0],
        latestResearchReport: task.researchReports[0],
        latestCodeReview: task.codeReviews[0],
        recentComments: task.comments,
      };
    } catch (error) {
      this.errorHandler.handlePrismaError(error, params.taskId);
    }
  }

  async searchTasks(input: SearchTasksInput): Promise<PaginatedTaskSummary> {
    const {
      query,
      status: rawStatus,
      mode: rawMode,
      owner,
      priority,
      page = 1,
      pageSize = 10,
      sortBy = 'creationDate',
      sortOrder = 'desc',
      taskId: specificTaskId,
    } = input;

    const status = rawStatus
      ? TOKEN_MAPS.status[rawStatus as keyof typeof TOKEN_MAPS.status] ||
        rawStatus
      : undefined;
    const mode = rawMode
      ? TOKEN_MAPS.role[rawMode as keyof typeof TOKEN_MAPS.role] || rawMode
      : undefined;

    const where: Prisma.TaskWhereInput = {};
    const orderBy: Prisma.TaskOrderByWithRelationInput = {};

    if (specificTaskId) {
      where.taskId = specificTaskId;
    } else {
      if (query) {
        where.OR = [
          { name: { contains: query } },
          { taskDescription: { description: { contains: query } } },
        ];
      }
      if (status) {
        where.status = status;
      }
      if (mode) {
        where.currentMode = mode;
      }
      if (owner) {
        where.owner = { contains: owner };
      }
      if (priority) {
        where.priority = priority;
      }
    }

    orderBy[sortBy] = sortOrder;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const tasks = await this.prisma.task.findMany({
      where,
      orderBy,
      skip,
      take,
    });

    const totalTasks = await this.prisma.task.count({ where });

    const taskSummaries: TaskSummary[] = tasks.map((task: Task) => ({
      taskId: task.taskId,
      name: task.name,
      status: task.status,
      currentMode: task.currentMode,
      priority: task.priority,
      creationDate: task.creationDate,
      completionDate: task.completionDate,
      owner: task.owner,
    }));

    return {
      tasks: taskSummaries,
      totalTasks,
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(totalTasks / pageSize),
    };
  }
}
