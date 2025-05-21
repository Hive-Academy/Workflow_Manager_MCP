import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { z } from 'zod';
import { PrismaService } from '../../prisma/prisma.service';
import {
  ContinueTaskSchema,
  GetTaskContextSchema,
  ListTasksSchema,
  TaskDashboardResponse,
  WorkflowMapSchema,
  WorkflowStatusSchema,
} from '../schemas';

@Injectable()
export class TaskQueryService {
  constructor(private readonly prisma: PrismaService) {  async getWorkflowMap(params: z.infer<typeof WorkflowMapSchema>) {
    // Mermaid nodes and roles as in the legacy tool
    const modes = [
      { id: 'boomerang-mode', name: '🪃 Boomerang', description: 'Task Intake, Analysis, Final Verification' },
      { id: 'researcher-expert-mode', name: '🔬 Researcher', description: 'In-depth Research (Optional)' },
      { id: 'architect-mode', name: '🏛️ Architect', description: 'Implementation Planning, Subtask Definition' },
      { id: 'senior-developer-mode', name: '👨‍💻 Senior Developer', description: 'Subtask Implementation & Testing' },
      { id: 'code-review-mode', name: '🔍 Code Review', description: 'Quality Assurance, Verification' },
    ];
    let currentModeVal: string | null = null;
    if (params.taskId) {
      // Try to fetch the task and get its currentMode
      try {
        const task = await this.prisma.task.findUnique({
          where: { taskId: params.taskId },
          select: { currentMode: true },
        });
        currentModeVal = task?.currentMode || null;
      } catch (err) {
        // Log and continue with no highlight
        console.warn(`WorkflowMap: Could not get state for task ${params.taskId}: ${err instanceof Error ? err.message : String(err)}`);
        async getWorkflowStatus(params: z.infer<typeof WorkflowStatusSchema>) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { taskId: params.taskId },
        include: {
          comments: {
            orderBy: { createdAt: 'desc' },
            take: 3,
            select: { content: true, createdAt: true },
          },
          delegations: true, // If delegations is a relation, otherwise fetch as needed
        },
      });
      if (!task) {
        throw new NotFoundException(`Task with ID '${params.taskId}' not found.`);
      }
      let workflow = `# 📝 Workflow Status for: ${task.name || params.taskId} (ID: ${task.taskId})\n\n`;
      workflow += `**Status**: ${task.status || 'N/A'}\n`;
      workflow += `**Current Owner**: ${task.currentMode || 'N/A'}\n`;
      workflow += `**Progress**: ${task.progress !== undefined ? (task.progress * 100).toFixed(0) + '%' : 'N/A'}\n`;
      workflow += `**Last Updated**: ${task.updatedAt ? new Date(task.updatedAt).toLocaleString() : 'N/A'}\n`;
      if (task.comments && task.comments.length > 0) {
        workflow += "\n## Recent Notes:\n";
        task.comments.forEach((note: any) => {
          workflow += `- **[${new Date(note.createdAt).toLocaleString()}]**: ${note.content}\n`;
        });
      }
      if (task.delegations && task.delegations.length > 0) {
        workflow += "\n## Delegation History:\n";
        task.delegations.slice(-3).forEach((del: any) => {
          workflow += `- ${new Date(del.timestamp).toLocaleString()}: ${del.from} -> ${del.to} - Msg: ${del.message ? del.message.substring(0,100) + (del.message.length > 100 ? '...':'') : 'N/A'}\n`;
        });
      }
      return { content: [{ type: 'text' as const, text: workflow }] };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error(`Error in TaskQueryService.getWorkflowStatus for ${params.taskId}:`, error);
      throw new InternalServerErrorException(`Could not fetch workflow status for task '${params.taskId}'.`);
    }
  }
}
    }
    let mapText = '# 🗺️ Workflow Map\n\n';
    mapText += '```mermaid\ngraph TD\n';
    mapText += '    A[User Request] --> B(🪃 Boomerang Initial);\n';
    mapText += '    B -->|Needs Research?| C{Decision Point};\n';
    mapText += '    C -- Yes --> D(🔬 Researcher);\n';
    mapText += '    D --> B_Feeds_Research(🪃 Boomerang Integrates Research);\n';
    mapText += '    C -- No / Research Done --> E(🏛️ Architect);\n';
    mapText += '    B_Feeds_Research --> E;\n';
    mapText += '    E --> F(👨‍💻 Senior Developer Subtasks);\n';
    mapText += '    F --> G{All Subtasks Done?};\n';
    mapText += '    G -- No --> F;\n';
    mapText += '    G -- Yes --> H(🏛️ Architect Verifies);\n';
    mapText += '    H --> I(🔍 Code Review);\n';
    mapText += '    I --> J{Review Approved?};\n';
    mapText += '    J -- No --> H;\n';
    mapText += '    J -- Yes --> K(🪃 Boomerang Final Verification);\n';
    mapText += '    K --> L[Deliver to User];\n\n';
    modes.forEach(mode => {
      let nodeIdToStyle = '';
      if (mode.id === 'boomerang-mode') {
        if (currentModeVal === mode.id) {
          mapText += '    style B fill:#00D1B2,stroke:#333,stroke-width:2px\n';
          mapText += '    style B_Feeds_Research fill:#00D1B2,stroke:#333,stroke-width:2px\n';
          mapText += '    style K fill:#00D1B2,stroke:#333,stroke-width:2px\n';
        }
      } else {
        if (mode.id === 'researcher-expert-mode') nodeIdToStyle = 'D';
        else if (mode.id === 'architect-mode') nodeIdToStyle = 'E';
        else if (mode.id === 'senior-developer-mode') nodeIdToStyle = 'F';
        else if (mode.id === 'code-review-mode') nodeIdToStyle = 'I';
        if (nodeIdToStyle && mode.id === currentModeVal) {
          mapText += `    style ${nodeIdToStyle} fill:#00D1B2,stroke:#333,stroke-width:2px\n`;
        }
      }
    });
    mapText += '```\n';
    mapText += '\n## Roles & Focus\n';
    modes.forEach(mode => {
      mapText += `### ${mode.name} ${mode.id === currentModeVal ? '(Current Focus)' : ''}\n- ${mode.description}\n`;
    });
    return { content: [{ type: 'text' as const, text: mapText }] };
  }
}

  async getTaskContext(params: z.infer<typeof GetTaskContextSchema>) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { taskId: params.taskId },
        include: {
          taskDescription: true,
          implementationPlans: true,
          // Potentially include other relations here as needed for full context
        },
      });

      if (!task) {
        throw new NotFoundException(
          `Task with ID '${params.taskId}' not found.`,
        );
      }
      return task; // Return the raw task object with relations
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error(
        `Error in TaskQueryService.getTaskContext for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Could not fetch context for task '${params.taskId}'.`,
      );
    }
  }

  async listTasks(params: z.infer<typeof ListTasksSchema>) {
    try {
      const { status, skip, take } = params;
      const whereClause: Prisma.TaskWhereInput = {};
      if (status) whereClause.status = status;

      const effectiveTake = take || 50;
      const effectiveSkip = skip || undefined;

      const tasks = await this.prisma.task.findMany({
        where: whereClause,
        skip: effectiveSkip,
        take: effectiveTake,
        orderBy: { creationDate: 'desc' },
        select: {
          taskId: true,
          name: true,
          status: true,
          currentMode: true,
          creationDate: true,
          completionDate: true,
          priority: true,
        },
      });

      const totalTasks = await this.prisma.task.count({ where: whereClause });

      return {
        tasks,
        totalTasks,
        currentPage:
          effectiveSkip && effectiveTake
            ? Math.floor(effectiveSkip / effectiveTake) + 1
            : 1,
        pageSize: effectiveTake,
        totalPages: Math.ceil(totalTasks / effectiveTake),
      }; // Return structured list data
    } catch (error) {
      console.error('Error in TaskQueryService.listTasks:', error);
      throw new InternalServerErrorException('Could not list tasks.');
    }
  }

  async continueTask(params: z.infer<typeof ContinueTaskSchema>) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { taskId: params.taskId },
        include: {
          taskDescription: {
            select: {
              description: true,
              acceptanceCriteria: true,
            },
          },
          comments: {
            orderBy: { createdAt: 'desc' },
            take: 5, // Get last 5 comments
            select: {
              mode: true,
              content: true,
              createdAt: true,
            },
          },
        },
      });

      if (!task) {
        throw new NotFoundException(
          `Task with ID '${params.taskId}' not found for continuation.`,
        );
      }

      // Structure the response for continuation
      return {
        taskId: task.taskId,
        name: task.name,
        status: task.status,
        currentMode: task.currentMode,
        description: task.taskDescription?.description,
        acceptanceCriteria: task.taskDescription?.acceptanceCriteria,
        recentNotes: task.comments,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error(
        `Error in TaskQueryService.continueTask for ${params.taskId}:`,
        error,
      );
      throw new InternalServerErrorException(
        `Could not fetch continuation context for task '${params.taskId}'.`,
      );
    }
  }

  async getTaskDashboardData(): /* params: z.infer<typeof TaskDashboardParamsSchema> // No params for now */
  Promise<TaskDashboardResponse> {
    try {
      const totalTasks = await this.prisma.task.count();

      const statuses = await this.prisma.task.groupBy({
        by: ['status'],
        _count: {
          status: true,
        },
      });

      const modes = await this.prisma.task.groupBy({
        by: ['currentMode'],
        _count: {
          currentMode: true,
        },
        where: {
          currentMode: {
            not: null, // Only count tasks that have a mode assigned
          },
        },
      });

      const tasksByStatus: Record<string, number> = {};
      for (const group of statuses) {
        tasksByStatus[group.status] = group._count.status;
      }

      const tasksByMode: Record<string, number> = {};
      for (const group of modes) {
        if (group.currentMode) {
          // Ensure currentMode is not null
          tasksByMode[group.currentMode] = group._count.currentMode;
        }
      }

      return {
        totalTasks,
        tasksByStatus,
        tasksByMode,
      };
    } catch (error) {
      console.error('Error in TaskQueryService.getTaskDashboardData:', error);
      throw new InternalServerErrorException(
        'Could not fetch task dashboard data.',
      );
    }
  }
}
