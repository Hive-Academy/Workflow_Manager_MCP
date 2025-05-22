import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { createHash } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
// import { Task, TaskDescription, ImplementationPlan, Subtask } from '@prisma/client'; // Removed unused imports

@Injectable()
export class ContextManagementService {
  // In-memory cache for efficient reuse
  private contextCache: Map<string, any> = new Map();

  constructor(private readonly prisma: PrismaService) {}

  // Generate hash for context object
  hashContext(context: any): string {
    return createHash('sha256').update(JSON.stringify(context)).digest('hex');
  }

  // Store context in cache with hash key
  cacheContext(context: any): string {
    const hash = this.hashContext(context);
    this.contextCache.set(hash, context);
    return hash;
  }

  // Retrieve context by hash
  getContextByHash(hash: string): any {
    return this.contextCache.get(hash);
  }

  // Calculate difference between two contexts
  diffContext(oldContext: any, newContext: any): any {
    if (!oldContext) return { __isNew: true, ...newContext };

    const diff: any = {};
    let changed = false;

    for (const key in newContext) {
      if (typeof newContext[key] === 'function') continue;

      if (
        !(key in oldContext) ||
        JSON.stringify(oldContext[key]) !== JSON.stringify(newContext[key])
      ) {
        diff[key] = newContext[key];
        changed = true;
      }
    }

    const removed: string[] = [];
    for (const key in oldContext) {
      if (!(key in newContext) && typeof oldContext[key] !== 'function') {
        removed.push(key);
        changed = true;
      }
    }

    if (removed.length > 0) {
      diff.__removed = removed;
    }

    return changed ? diff : { __noChanges: true };
  }

  // Get a specific slice of context
  async getContextSlice(taskId: string, sliceType: string): Promise<any> {
    let data;
    switch (sliceType.toUpperCase()) {
      case 'STATUS':
        data = await this.prisma.task.findUnique({
          where: { taskId },
          select: {
            taskId: true,
            name: true,
            status: true,
            currentMode: true,
            creationDate: true,
            completionDate: true,
          },
        });
        if (!data)
          throw new NotFoundException(
            `Task with ID ${taskId} not found for STATUS slice.`,
          );
        return data;

      case 'AC':
        data = await this.prisma.taskDescription.findUnique({
          where: { taskId },
          select: { acceptanceCriteria: true },
        });
        if (!data)
          throw new NotFoundException(
            `TaskDescription for Task ID ${taskId} not found for AC slice.`,
          );
        return data.acceptanceCriteria;

      case 'SUBTASKS': // Get all subtasks for the latest plan
        data = await this.prisma.implementationPlan.findFirst({
          where: { taskId },
          orderBy: { updatedAt: 'desc' },
          include: { subtasks: { orderBy: { sequenceNumber: 'asc' } } },
        });
        if (!data)
          throw new NotFoundException(
            `ImplementationPlan for Task ID ${taskId} not found for SUBTASKS slice.`,
          );
        return data.subtasks;

      case 'FULL_TASK':
        data = await this.prisma.task.findUnique({
          where: { taskId },
        });
        if (!data)
          throw new NotFoundException(
            `Task with ID ${taskId} not found for FULL_TASK slice.`,
          );
        return data;

      // case 'IP_BATCH:<batchId>': // This will be handled by the default case logic now

      default:
        if (sliceType.toUpperCase().startsWith('IP_BATCH:')) {
          const parts = sliceType.split(':');
          if (parts.length !== 2 || !parts[1]) {
            throw new BadRequestException( // Changed from NotFoundException to BadRequestException for invalid format
              'Invalid IP_BATCH slice format. Expected IP_BATCH:<batchId>',
            );
          }
          const requestedBatchId = parts[1];
          data = await this.prisma.implementationPlan.findFirst({
            where: { taskId },
            orderBy: { updatedAt: 'desc' }, // Get the latest plan
            include: {
              subtasks: {
                where: { batchId: requestedBatchId }, // Filter subtasks by batchId
                orderBy: { sequenceNumber: 'asc' }, // Keep them ordered
              },
            },
          });
          if (!data) {
            // This means the ImplementationPlan itself was not found
            throw new NotFoundException(
              `ImplementationPlan for Task ID ${taskId} not found for IP_BATCH slice.`,
            );
          }
          // If the plan exists, data.subtasks will be an array (possibly empty if batchId didn't match any subtasks)
          return data.subtasks;
        }
        // Original default for unknown slice types
        throw new NotFoundException(`Unknown context slice type: ${sliceType}`);
    }
  }
}
