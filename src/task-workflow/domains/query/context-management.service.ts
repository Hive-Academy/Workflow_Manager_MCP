import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { createHash } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContextManagementService {
  private readonly logger = new Logger(ContextManagementService.name);

  // In-memory cache for efficient reuse
  private contextCache: Map<string, any> = new Map();

  // Performance metrics cache
  private performanceMetrics: Map<
    string,
    { queryTime: number; cacheHit: boolean; timestamp: Date }
  > = new Map();

  constructor(private readonly prisma: PrismaService) {}

  // Generate hash for context object
  hashContext(context: any): string {
    return createHash('sha256').update(JSON.stringify(context)).digest('hex');
  }

  // 🚀 OPTIMIZATION: New async hash method for consistency
  generateHash(context: any): string {
    return this.hashContext(context);
  }

  // Store context in cache with hash key
  cacheContext(context: any): string {
    const hash = this.hashContext(context);
    this.contextCache.set(hash, context);
    return hash;
  }

  // 🚀 OPTIMIZATION: Advanced caching methods for slice-specific contexts
  getCachedContext(
    cacheKey: string,
  ): { data: any; hash: string; timestamp: Date } | null {
    const cached: any = this.contextCache.get(cacheKey);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return cached;
  }

  setCachedContext(
    cacheKey: string,
    contextData: { data: any; hash: string; timestamp: Date },
  ): void {
    this.contextCache.set(cacheKey, contextData);
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

  // Enhanced getContextSlice with performance monitoring and minimal data returns
  async getContextSlice(taskId: string, sliceType: string): Promise<any> {
    const startTime = performance.now();
    const cacheKey = `${taskId}:${sliceType}`;

    // Check cache first for non-dynamic slices
    const cached = this.contextCache.get(cacheKey);
    if (cached && !this.isVolatileSlice(sliceType)) {
      const queryTime = performance.now() - startTime;
      this.recordPerformanceMetric(cacheKey, queryTime, true);
      this.logger.debug(`Cache hit for ${sliceType} slice of task ${taskId}`);
      return cached;
    }

    let data;
    try {
      switch (sliceType.toUpperCase()) {
        case 'STATUS':
          data = await this.prisma.task.findUnique({
            where: { taskId },
            select: {
              taskId: true,
              name: true,
              status: true,
              currentMode: true,
              priority: true,
              creationDate: true,
              completionDate: true,
              redelegationCount: true,
            },
          });
          if (!data)
            throw new NotFoundException(
              `Task with ID ${taskId} not found for STATUS slice.`,
            );
          break;

        case 'TD':
          data = await this.prisma.taskDescription.findUnique({
            where: { taskId },
            select: {
              description: true,
              businessRequirements: true,
              technicalRequirements: true,
              acceptanceCriteria: true,
              createdAt: true,
              updatedAt: true,
            },
          });
          if (!data)
            throw new NotFoundException(
              `TaskDescription for Task ID ${taskId} not found for TD slice.`,
            );
          break;

        case 'IP':
          data = await this.prisma.implementationPlan.findFirst({
            where: { taskId },
            orderBy: { updatedAt: 'desc' },
            select: {
              id: true,
              overview: true,
              approach: true,
              technicalDecisions: true,
              filesToModify: true,
              createdAt: true,
              updatedAt: true,
              createdBy: true,
              _count: {
                select: { subtasks: true },
              },
              subtasks: {
                select: {
                  status: true,
                },
              },
            },
          });
          if (!data)
            throw new NotFoundException(
              `ImplementationPlan for Task ID ${taskId} not found for IP slice.`,
            );

          // Transform to include computed fields for token efficiency
          {
            const transformedIP = {
              ...data,
              totalSubtasks: data._count.subtasks,
              completedSubtasks: data.subtasks.filter(
                (s) => s.status === 'completed',
              ).length,
            };
            const { _count, subtasks, ...rest } = transformedIP;
            data = rest;
          }
          break;

        case 'RR':
          data = await this.prisma.researchReport.findFirst({
            where: { taskId },
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              title: true,
              summary: true,
              findings: true,
              recommendations: true,
              createdAt: true,
            },
          });
          if (!data)
            throw new NotFoundException(
              `ResearchReport for Task ID ${taskId} not found for RR slice.`,
            );
          break;

        case 'CRD':
          data = await this.prisma.codeReview.findFirst({
            where: { taskId },
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              status: true,
              summary: true,
              strengths: true,
              issues: true,
              acceptanceCriteriaVerification: true,
              manualTestingResults: true,
              requiredChanges: true,
              createdAt: true,
            },
          });
          if (!data)
            throw new NotFoundException(
              `CodeReview for Task ID ${taskId} not found for CRD slice.`,
            );
          break;

        case 'CP':
          data = await this.prisma.completionReport.findFirst({
            where: { taskId },
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              summary: true,
              filesModified: true,
              delegationSummary: true,
              createdAt: true,
            },
          });
          if (!data)
            throw new NotFoundException(
              `CompletionReport for Task ID ${taskId} not found for CP slice.`,
            );
          break;

        case 'AC':
          data = await this.prisma.taskDescription.findUnique({
            where: { taskId },
            select: { acceptanceCriteria: true },
          });
          if (!data)
            throw new NotFoundException(
              `TaskDescription for Task ID ${taskId} not found for AC slice.`,
            );
          data = data.acceptanceCriteria;
          break;

        case 'SUBTASKS':
          data = await this.prisma.implementationPlan.findFirst({
            where: { taskId },
            orderBy: { updatedAt: 'desc' },
            select: {
              subtasks: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  status: true,
                  assignedTo: true,
                  batchId: true,
                  batchTitle: true,
                  sequenceNumber: true,
                  startedAt: true,
                  completedAt: true,
                },
                orderBy: { sequenceNumber: 'asc' },
              },
            },
          });
          if (!data)
            throw new NotFoundException(
              `ImplementationPlan for Task ID ${taskId} not found for SUBTASKS slice.`,
            );
          data = data.subtasks;
          break;

        case 'COMMENTS':
          data = await this.prisma.comment.findMany({
            where: { taskId },
            select: {
              id: true,
              mode: true,
              content: true,
              createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
          });
          break;

        case 'DELEGATIONS':
          data = await this.prisma.delegationRecord.findMany({
            where: { taskId },
            select: {
              id: true,
              fromMode: true,
              toMode: true,
              delegationTimestamp: true,
              completionTimestamp: true,
              success: true,
            },
            orderBy: { delegationTimestamp: 'desc' },
            take: 5,
          });
          break;

        case 'FULL_TASK':
          data = await this.prisma.task.findUnique({
            where: { taskId },
          });
          if (!data)
            throw new NotFoundException(
              `Task with ID ${taskId} not found for FULL_TASK slice.`,
            );
          break;

        default:
          if (sliceType.toUpperCase().startsWith('IP_BATCH:')) {
            const parts = sliceType.split(':');
            if (parts.length !== 2 || !parts[1]) {
              throw new BadRequestException(
                'Invalid IP_BATCH slice format. Expected IP_BATCH:<batchId>',
              );
            }
            const requestedBatchId = parts[1];
            data = await this.prisma.implementationPlan.findFirst({
              where: { taskId },
              orderBy: { updatedAt: 'desc' },
              select: {
                subtasks: {
                  where: { batchId: requestedBatchId },
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    status: true,
                    assignedTo: true,
                    batchId: true,
                    batchTitle: true,
                    sequenceNumber: true,
                    startedAt: true,
                    completedAt: true,
                  },
                  orderBy: { sequenceNumber: 'asc' },
                },
              },
            });
            if (!data) {
              throw new NotFoundException(
                `ImplementationPlan for Task ID ${taskId} not found for IP_BATCH slice.`,
              );
            }
            data = data.subtasks;
          } else {
            throw new NotFoundException(
              `Unknown context slice type: ${sliceType}`,
            );
          }
          break;
      }

      // Cache non-volatile slices
      if (!this.isVolatileSlice(sliceType)) {
        this.contextCache.set(cacheKey, data);
      }

      const queryTime = performance.now() - startTime;
      this.recordPerformanceMetric(cacheKey, queryTime, false);

      if (queryTime > 100) {
        // Log slow queries
        this.logger.warn(
          `Slow query detected for ${sliceType} slice of task ${taskId}: ${queryTime.toFixed(2)}ms`,
        );
      }

      return data;
    } catch (error) {
      this.logger.error(
        `Error retrieving ${sliceType} slice for task ${taskId}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  // Determine if a slice type is volatile (changes frequently)
  private isVolatileSlice(sliceType: string): boolean {
    const volatileSlices = ['STATUS', 'COMMENTS', 'DELEGATIONS'];
    return (
      volatileSlices.includes(sliceType.toUpperCase()) ||
      sliceType.toUpperCase().startsWith('IP_BATCH:')
    );
  }

  // Record performance metrics
  private recordPerformanceMetric(
    cacheKey: string,
    queryTime: number,
    cacheHit: boolean,
  ): void {
    this.performanceMetrics.set(cacheKey, {
      queryTime,
      cacheHit,
      timestamp: new Date(),
    });

    // Clean up old metrics (keep last 1000 entries)
    if (this.performanceMetrics.size > 1000) {
      const keys = Array.from(this.performanceMetrics.keys());
      keys.slice(0, 100).forEach((key) => this.performanceMetrics.delete(key));
    }
  }

  // Get performance statistics
  getPerformanceStats(): any {
    const metrics = Array.from(this.performanceMetrics.values());
    const totalQueries = metrics.length;
    const cacheHits = metrics.filter((m) => m.cacheHit).length;
    const avgQueryTime =
      metrics.reduce((sum, m) => sum + m.queryTime, 0) / totalQueries;

    return {
      totalQueries,
      cacheHitRate: totalQueries > 0 ? (cacheHits / totalQueries) * 100 : 0,
      averageQueryTime: avgQueryTime,
      cacheSize: this.contextCache.size,
    };
  }

  // Clear cache (useful for testing or memory management)
  clearCache(): void {
    this.contextCache.clear();
    this.performanceMetrics.clear();
    this.logger.log('Context cache cleared');
  }
}
