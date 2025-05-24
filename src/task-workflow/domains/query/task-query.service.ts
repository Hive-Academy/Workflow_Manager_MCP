import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Task } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkflowMode, WorkflowTransitionView } from 'src/task-workflow/types';

import { PrismaErrorHandlerService } from 'src/task-workflow/utils/prisma-error.handler';
import { z } from 'zod';
import {
  SearchTasksInput,
  PaginatedTaskSummary,
  TaskSummary,
} from '../crud/schemas/search-tasks.schema';
import { ContinueTaskSchema } from './schemas/continue-task.schema';
import {
  GetTaskContextSchema,
  TaskContextResponse,
} from './schemas/get-task-context.schema';
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

  // Standardized error response helper for consistent contextHash metadata
  private createNotFoundResponse(
    contextType: string,
    identifier: string,
    identifierType: 'taskId' | 'reportId' = 'taskId',
  ): never {
    const response = {
      notFound: true,
      contextHash: null,
      contextType,
      [identifierType]: identifier,
    };

    throw new NotFoundException({
      message: `${contextType} not found for ${identifierType} ${identifier}`,
      metadata: response,
    });
  }

  // Enhanced error handler with contextHash support
  private handleQueryError(
    error: unknown,
    contextType: string,
    taskId: string,
  ): never {
    if (error instanceof NotFoundException) {
      // Re-throw with enhanced metadata if not already enhanced
      if (typeof error.getResponse() === 'string') {
        this.createNotFoundResponse(contextType, taskId);
      }
      throw error;
    }

    // Handle Prisma errors with proper context
    this.errorHandler.handlePrismaError(error, taskId);
  }

  async getTaskContext(
    params: z.infer<typeof GetTaskContextSchema>,
  ): Promise<Partial<TaskContextResponse>> {
    try {
      const {
        taskId,
        sliceType = 'FULL',
        optimizationLevel: _optimizationLevel = 'SUMMARY', // Extracted for operations service, not used in data retrieval
        includeRelated = true,
        maxComments = 10,
        maxDelegations = 5,
      } = params;

      // Base task query - always needed
      const baseIncludes: Prisma.TaskInclude = {};

      // Optimize includes based on slice type
      switch (sliceType) {
        case 'STATUS':
          // Minimal data for status-only requests
          break;

        case 'TD':
          baseIncludes.taskDescription = true;
          break;

        case 'IP':
          baseIncludes.implementationPlans = {
            include: {
              subtasks: includeRelated,
            },
            orderBy: { createdAt: 'desc' },
            take: 1,
          };
          break;

        case 'RR':
          baseIncludes.researchReports = {
            orderBy: { createdAt: 'desc' },
            take: 1,
          };
          break;

        case 'CRD':
          baseIncludes.codeReviews = {
            orderBy: { createdAt: 'desc' },
            take: 1,
          };
          break;

        case 'CP':
          baseIncludes.completionReports = {
            orderBy: { createdAt: 'desc' },
            take: 1,
          };
          break;

        case 'SUBTASKS':
          baseIncludes.implementationPlans = {
            include: {
              subtasks: {
                orderBy: { sequenceNumber: 'asc' },
              },
            },
            orderBy: { createdAt: 'desc' },
            take: 1,
          };
          break;

        case 'COMMENTS':
          baseIncludes.comments = {
            orderBy: { createdAt: 'desc' },
            take: maxComments,
          };
          break;

        case 'DELEGATIONS':
          baseIncludes.delegationRecords = {
            orderBy: { delegationTimestamp: 'desc' },
            take: maxDelegations,
          };
          break;

        case 'FULL':
        default:
          // Full context with optimized limits
          baseIncludes.taskDescription = true;
          baseIncludes.implementationPlans = {
            include: {
              subtasks: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 1,
          };
          baseIncludes.delegationRecords = {
            orderBy: { delegationTimestamp: 'desc' },
            take: maxDelegations,
          };
          baseIncludes.researchReports = {
            orderBy: { createdAt: 'desc' },
            take: 1,
          };
          baseIncludes.codeReviews = {
            orderBy: { createdAt: 'desc' },
            take: 1,
          };
          baseIncludes.completionReports = {
            orderBy: { createdAt: 'desc' },
            take: 1,
          };
          baseIncludes.comments = {
            orderBy: { createdAt: 'desc' },
            take: maxComments,
          };
          break;
      }

      const task = await this.prisma.task.findUnique({
        where: { taskId },
        include: baseIncludes,
      });

      if (!task) {
        this.createNotFoundResponse(
          `task-context-${sliceType.toLowerCase()}`,
          taskId,
        );
      }

      // Build optimized response based on slice type
      const response: Partial<TaskContextResponse> = {
        taskId: task.taskId,
        name: task.name,
        status: task.status,
        currentMode: task.currentMode,
        priority: task.priority,
        owner: task.owner,
        creationDate: task.creationDate,
        completionDate: task.completionDate,
        redelegationCount: task.redelegationCount || 0,
        gitBranch: task.gitBranch,
      };

      // Add slice-specific data
      if (sliceType === 'TD' || sliceType === 'FULL') {
        response.taskDescription = task.taskDescription || undefined;
      }

      if (
        sliceType === 'IP' ||
        sliceType === 'SUBTASKS' ||
        sliceType === 'FULL'
      ) {
        const planWithSubtasks = task.implementationPlans?.[0] as any;
        if (planWithSubtasks) {
          response.implementationPlan = {
            id: planWithSubtasks.id,
            overview: planWithSubtasks.overview,
            approach: planWithSubtasks.approach,
            technicalDecisions: planWithSubtasks.technicalDecisions,
            filesToModify: planWithSubtasks.filesToModify,
            createdAt: planWithSubtasks.createdAt,
            updatedAt: planWithSubtasks.updatedAt,
            createdBy: planWithSubtasks.createdBy,
            totalSubtasks: planWithSubtasks.subtasks?.length || 0,
            completedSubtasks:
              planWithSubtasks.subtasks?.filter(
                (s: any) => s.status === 'completed',
              ).length || 0,
          };

          if (sliceType === 'SUBTASKS' || sliceType === 'FULL') {
            response.subtasks = planWithSubtasks.subtasks?.map(
              (subtask: any) => ({
                id: subtask.id,
                name: subtask.name,
                description: subtask.description,
                status: subtask.status,
                assignedTo: subtask.assignedTo,
                batchId: subtask.batchId,
                batchTitle: subtask.batchTitle,
                sequenceNumber: subtask.sequenceNumber,
                startedAt: subtask.startedAt,
                completedAt: subtask.completedAt,
              }),
            );
          }
        }
      }

      if (sliceType === 'RR' || sliceType === 'FULL') {
        response.researchReports = (task as any).researchReports?.map(
          (report: any) => ({
            id: report.id,
            title: report.title,
            summary: report.summary,
            createdAt: report.createdAt,
          }),
        );
      }

      if (sliceType === 'CRD' || sliceType === 'FULL') {
        response.codeReviews = (task as any).codeReviews?.map(
          (review: any) => ({
            id: review.id,
            status: review.status,
            summary: review.summary,
            createdAt: review.createdAt,
          }),
        );
      }

      if (sliceType === 'CP' || sliceType === 'FULL') {
        const completionReport = (task as any).completionReports?.[0];
        if (completionReport) {
          response.completionReport = {
            id: completionReport.id,
            summary: completionReport.summary,
            filesModified: completionReport.filesModified,
            delegationSummary: completionReport.delegationSummary,
            createdAt: completionReport.createdAt,
          };
        }
      }

      if (sliceType === 'COMMENTS' || sliceType === 'FULL') {
        response.recentComments = (task as any).comments?.map(
          (comment: any) => ({
            id: comment.id,
            mode: comment.mode,
            content: comment.content,
            createdAt: comment.createdAt,
          }),
        );
      }

      if (sliceType === 'DELEGATIONS' || sliceType === 'FULL') {
        response.delegationHistory = (task as any).delegationRecords?.map(
          (delegation: any) => ({
            id: delegation.id,
            fromMode: delegation.fromMode,
            toMode: delegation.toMode,
            delegationTimestamp: delegation.delegationTimestamp,
            completionTimestamp: delegation.completionTimestamp,
            success: delegation.success,
          }),
        );
      }

      return response;
    } catch (error) {
      this.handleQueryError(
        error,
        `task-context-${params.sliceType || 'full'}`,
        params.taskId,
      );
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

      const tasksByStatus: Record<string, number> = {
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

      // Calculate priority distribution
      const tasksByPriority: Record<string, number> = {};
      tasks.forEach((t) => {
        const priority = t.priority || 'none';
        tasksByPriority[priority] = (tasksByPriority[priority] || 0) + 1;
      });

      // Calculate derived metrics
      const activeTasks = tasks.filter((t) =>
        [
          'not-started',
          'in-progress',
          'needs-review',
          'needs-changes',
        ].includes(t.status),
      ).length;
      const completedTasks = tasks.filter(
        (t) => t.status === 'completed',
      ).length;
      const blockedTasks = tasks.filter((t) => t.status === 'blocked').length;

      // Calculate average completion time for completed tasks
      const completedTasksWithDates = tasks.filter(
        (t) => t.status === 'completed' && t.completionDate && t.creationDate,
      );
      const avgTaskDurationMs =
        completedTasksWithDates.length > 0
          ? completedTasksWithDates.reduce(
              (sum, t) =>
                sum + (t.completionDate!.getTime() - t.creationDate.getTime()),
              0,
            ) / completedTasksWithDates.length
          : undefined;

      // Recent tasks (last 10 updated)
      const recentTasks = tasks.slice(0, 10).map((t) => ({
        taskId: t.taskId,
        name: t.name,
        status: t.status,
        currentMode: t.currentMode,
        lastUpdated: t.creationDate,
        priority: t.priority,
      }));

      // Identify bottlenecks (modes with multiple in-progress tasks)
      const modesWithTasks = Object.entries(tasksByMode).filter(
        ([_, count]) => count > 1,
      );
      const bottlenecks = modesWithTasks.map(([mode, taskCount]) => ({
        mode,
        taskCount,
        averageWaitTime: 24, // Default estimate
        oldestTask: tasks.find((t) => t.currentMode === mode)?.taskId,
      }));

      // Generate alerts for high-priority or overdue tasks
      const alerts = [];
      const highPriorityTasks = tasks.filter(
        (t) => t.priority === 'high' && t.status !== 'completed',
      );
      if (highPriorityTasks.length > 0) {
        alerts.push({
          type: 'high-priority',
          message: `${highPriorityTasks.length} high-priority tasks need attention`,
          severity: 'high' as const,
        });
      }

      const generatedAt = new Date();
      return {
        totalTasks: tasks.length,
        activeTasks,
        completedTasks,
        blockedTasks,
        tasksByStatus,
        tasksByMode,
        tasksByPriority,
        averageTaskDuration: avgTaskDurationMs
          ? Math.round((avgTaskDurationMs / (1000 * 60 * 60)) * 10) / 10
          : undefined,
        averageRedelegations:
          tasks.length > 0
            ? tasks.reduce((sum, t) => sum + (t.redelegationCount || 0), 0) /
              tasks.length
            : undefined,
        workflowEfficiency:
          completedTasks > 0 ? completedTasks / tasks.length : undefined,
        recentTasks,
        bottlenecks,
        alerts,
        generatedAt,
        dataFreshness: 0, // Real-time data
        nextRefreshAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
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

    const status = rawStatus;
    const mode = rawMode;

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
      include: {
        taskDescription: true,
        implementationPlans: {
          include: {
            subtasks: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    const totalTasks = await this.prisma.task.count({ where });

    const taskSummaries: TaskSummary[] = tasks.map((task: any) => ({
      taskId: task.taskId,
      name: task.name,
      status: task.status,
      currentMode: task.currentMode,
      priority: task.priority,
      creationDate: task.creationDate,
      completionDate: task.completionDate,
      owner: task.owner,
      redelegationCount: task.redelegationCount || 0,
      gitBranch: task.gitBranch,
      hasDescription: !!task.taskDescription,
      subtaskCount: task.implementationPlans?.[0]?.subtasks?.length || 0,
      completedSubtasks:
        task.implementationPlans?.[0]?.subtasks?.filter(
          (s: any) => s.status === 'completed',
        ).length || 0,
      lastUpdated: task.creationDate,
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
