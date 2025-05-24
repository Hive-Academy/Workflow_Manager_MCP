import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

export interface PerformanceMetric {
  timestamp: Date;
  operation: string;
  taskId?: string;
  sliceType?: string;
  originalSize?: number;
  optimizedSize?: number;
  compressionRatio?: number;
  responseTime: number;
  cacheHit: boolean;
  tokensaved: number;
  memoryUsage?: number;
}

export interface OptimizationStats {
  totalRequests: number;
  totalTokensSaved: number;
  averageCompressionRatio: number;
  cacheHitRate: number;
  averageResponseTime: number;
  topPerformingSlices: Array<{ sliceType: string; avgCompression: number }>;
}

@Injectable()
export class PerformanceAnalyticsService {
  private readonly logger = new Logger(PerformanceAnalyticsService.name);
  private readonly metricsFilePath = join(
    process.cwd(),
    'logs',
    'mcp-performance-metrics.jsonl',
  );
  private readonly analyticsFilePath = join(
    process.cwd(),
    'logs',
    'mcp-analytics-summary.json',
  );

  // In-memory buffer for batch writing (avoid file I/O on every operation)
  private metricsBuffer: PerformanceMetric[] = [];
  private readonly maxBufferSize = 100;

  constructor() {
    this.ensureLogDirectory();

    // Flush buffer every 30 seconds
    setInterval(() => {
      this.flushMetricsBuffer();
    }, 30000);
  }

  // 🚀 ST-009: Performance monitoring and analytics
  async recordPerformanceMetric(metric: PerformanceMetric): Promise<void> {
    try {
      // Add to buffer instead of immediate file write
      this.metricsBuffer.push({
        ...metric,
        timestamp: new Date(),
        memoryUsage: process.memoryUsage().heapUsed,
      });

      // Flush if buffer is full
      if (this.metricsBuffer.length >= this.maxBufferSize) {
        await this.flushMetricsBuffer();
      }
    } catch (error) {
      // Log to NestJS logger (file-based) instead of console
      this.logger.error(
        `Failed to record performance metric: ${error.message}`,
      );
    }
  }

  // 🚀 ST-010: Error handling standardization
  async recordOptimizationSuccess(
    operation: string,
    taskId: string,
    sliceType: string,
    originalSize: number,
    optimizedSize: number,
    responseTime: number,
    cacheHit: boolean = false,
  ): Promise<void> {
    const compressionRatio = Math.round(
      (1 - optimizedSize / originalSize) * 100,
    );
    const tokensSaved = originalSize - optimizedSize;

    await this.recordPerformanceMetric({
      timestamp: new Date(),
      operation,
      taskId,
      sliceType,
      originalSize,
      optimizedSize,
      compressionRatio,
      responseTime,
      cacheHit,
      tokensaved: tokensSaved,
    });
  }

  // Generate analytics summary
  async generateAnalyticsSummary(): Promise<OptimizationStats> {
    try {
      const metrics = await this.loadMetricsFromFile();

      if (metrics.length === 0) {
        return {
          totalRequests: 0,
          totalTokensSaved: 0,
          averageCompressionRatio: 0,
          cacheHitRate: 0,
          averageResponseTime: 0,
          topPerformingSlices: [],
        };
      }

      const totalRequests = metrics.length;
      const totalTokensSaved = metrics.reduce(
        (sum, m) => sum + (m.tokensaved || 0),
        0,
      );
      const avgCompressionRatio =
        metrics.reduce((sum, m) => sum + (m.compressionRatio || 0), 0) /
        totalRequests;
      const cacheHits = metrics.filter((m) => m.cacheHit).length;
      const avgResponseTime =
        metrics.reduce((sum, m) => sum + m.responseTime, 0) / totalRequests;

      // Calculate top performing slices
      const slicePerformance = new Map<
        string,
        { totalCompression: number; count: number }
      >();
      metrics.forEach((m) => {
        if (m.sliceType && m.compressionRatio) {
          const existing = slicePerformance.get(m.sliceType) || {
            totalCompression: 0,
            count: 0,
          };
          slicePerformance.set(m.sliceType, {
            totalCompression: existing.totalCompression + m.compressionRatio,
            count: existing.count + 1,
          });
        }
      });

      const topPerformingSlices = Array.from(slicePerformance.entries())
        .map(([sliceType, stats]) => ({
          sliceType,
          avgCompression: stats.totalCompression / stats.count,
        }))
        .sort((a, b) => b.avgCompression - a.avgCompression)
        .slice(0, 5);

      const summary: OptimizationStats = {
        totalRequests,
        totalTokensSaved,
        averageCompressionRatio: Math.round(avgCompressionRatio),
        cacheHitRate: Math.round((cacheHits / totalRequests) * 100),
        averageResponseTime: Math.round(avgResponseTime),
        topPerformingSlices,
      };

      // Save summary to file
      await this.saveAnalyticsSummary(summary);

      return summary;
    } catch (error) {
      this.logger.error(
        `Failed to generate analytics summary: ${error.message}`,
      );
      throw error;
    }
  }

  // Private helper methods
  private async ensureLogDirectory(): Promise<void> {
    try {
      const logDir = join(process.cwd(), 'logs');
      await fs.mkdir(logDir, { recursive: true });
    } catch (error) {
      this.logger.error(`Failed to create logs directory: ${error.message}`);
    }
  }

  private async flushMetricsBuffer(): Promise<void> {
    if (this.metricsBuffer.length === 0) return;

    try {
      const metricsToFlush = [...this.metricsBuffer];
      this.metricsBuffer = []; // Clear buffer immediately

      // Write as JSONL (JSON Lines) for efficient streaming
      const jsonlData =
        metricsToFlush.map((metric) => JSON.stringify(metric)).join('\n') +
        '\n';

      await fs.appendFile(this.metricsFilePath, jsonlData);

      this.logger.debug(
        `Flushed ${metricsToFlush.length} performance metrics to file`,
      );
    } catch (error) {
      this.logger.error(`Failed to flush metrics buffer: ${error.message}`);
      // Re-add failed metrics to buffer for retry
      this.metricsBuffer.unshift(...this.metricsBuffer);
    }
  }

  private async loadMetricsFromFile(): Promise<PerformanceMetric[]> {
    try {
      const data = await fs.readFile(this.metricsFilePath, 'utf-8');
      return data
        .trim()
        .split('\n')
        .filter((line) => line.trim())
        .map((line) => JSON.parse(line) as PerformanceMetric);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return []; // File doesn't exist yet
      }
      throw error;
    }
  }

  private async saveAnalyticsSummary(
    summary: OptimizationStats,
  ): Promise<void> {
    try {
      const data = {
        generatedAt: new Date().toISOString(),
        summary,
        performanceTargets: {
          tokenReductionTarget: '25%',
          performanceImprovementTarget: '30%',
          cacheHitRateTarget: '60%',
        },
        achievements: {
          tokenReductionAchieved: `${summary.averageCompressionRatio}%`,
          cacheEfficiency: `${summary.cacheHitRate}%`,
          totalTokensSaved: summary.totalTokensSaved,
        },
      };

      await fs.writeFile(this.analyticsFilePath, JSON.stringify(data, null, 2));
      this.logger.log(`Analytics summary saved to ${this.analyticsFilePath}`);
    } catch (error) {
      this.logger.error(`Failed to save analytics summary: ${error.message}`);
    }
  }

  // Method to get live performance stats
  async getLivePerformanceStats(): Promise<any> {
    const summary = await this.generateAnalyticsSummary();
    const recentMetrics = this.metricsBuffer.slice(-10); // Last 10 in buffer

    return {
      ...summary,
      recentActivity: recentMetrics.length,
      bufferSize: this.metricsBuffer.length,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime(),
    };
  }

  // Cleanup old metrics (call periodically)
  async cleanupOldMetrics(daysToKeep: number = 30): Promise<void> {
    try {
      const metrics = await this.loadMetricsFromFile();
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      const filteredMetrics = metrics.filter(
        (m) => new Date(m.timestamp) > cutoffDate,
      );

      // Rewrite file with filtered data
      const jsonlData =
        filteredMetrics.map((metric) => JSON.stringify(metric)).join('\n') +
        '\n';
      await fs.writeFile(this.metricsFilePath, jsonlData);

      this.logger.log(
        `Cleaned up ${metrics.length - filteredMetrics.length} old metrics`,
      );
    } catch (error) {
      this.logger.error(`Failed to cleanup old metrics: ${error.message}`);
    }
  }
}
