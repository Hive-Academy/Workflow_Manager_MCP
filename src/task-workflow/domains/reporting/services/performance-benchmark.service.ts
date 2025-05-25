// src/task-workflow/domains/reporting/services/performance-benchmark.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { IPerformanceBenchmarkService } from '../interfaces/service-contracts.interface';
import { PerformanceBenchmark } from '../interfaces/benchmarks.interface';

type WhereClause = Record<string, any>;

/**
 * Performance Benchmark Service
 *
 * Responsible for generating performance benchmarks and comparisons
 * Following SRP: Only handles performance benchmark calculations
 */
@Injectable()
export class PerformanceBenchmarkService
  implements IPerformanceBenchmarkService
{
  private readonly logger = new Logger(PerformanceBenchmarkService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getPerformanceBenchmarks(
    whereClause: WhereClause,
    startDate?: Date,
    endDate?: Date,
  ): Promise<PerformanceBenchmark> {
    this.logger.log('Generating performance benchmarks');

    // Placeholder implementation - would contain actual benchmark logic
    const [teamBenchmarks, individualBenchmarks, periodComparisons] =
      await Promise.all([
        this.calculateTeamBenchmarks(whereClause),
        this.calculateIndividualBenchmarks(whereClause),
        this.calculatePeriodComparisons(whereClause, startDate, endDate),
      ]);

    const performanceRankings =
      this.generatePerformanceRankings(individualBenchmarks);
    const benchmarkInsights = this.generateBenchmarkInsights(
      teamBenchmarks,
      individualBenchmarks,
      periodComparisons,
    );

    return {
      teamBenchmarks,
      individualBenchmarks,
      periodComparisons,
      performanceRankings,
      benchmarkInsights,
    };
  }

  private async calculateTeamBenchmarks(_whereClause: WhereClause) {
    this.logger.debug('Calculating team benchmarks from database');

    // Get actual team metrics from database
    const [totalTasks, completedTasks, avgCompletionTime, qualityMetrics] =
      await Promise.all([
        this.prisma.task.count({ where: _whereClause }),
        this.prisma.task.count({
          where: { ..._whereClause, status: 'completed' },
        }),
        this.calculateTeamAvgCompletionTime(_whereClause),
        this.calculateTeamQualityMetrics(_whereClause),
      ]);

    const completionRate =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Industry benchmarks (these could be configurable or come from external data)
    const industryBenchmarks = {
      completionRate: 78,
      avgCompletionHours: 48,
      qualityScore: 85,
      velocityScore: 75,
    };

    return [
      {
        metric: 'Task Completion Rate',
        currentValue: Math.round(completionRate * 10) / 10,
        teamAverage: completionRate, // For now, same as current
        industryBenchmark: industryBenchmarks.completionRate,
        percentile: this.calculatePercentile(
          completionRate,
          industryBenchmarks.completionRate,
        ),
        trend:
          completionRate > industryBenchmarks.completionRate
            ? ('above' as const)
            : ('below' as const),
      },
      {
        metric: 'Average Completion Time (hours)',
        currentValue: Math.round(avgCompletionTime * 10) / 10,
        teamAverage: avgCompletionTime,
        industryBenchmark: industryBenchmarks.avgCompletionHours,
        percentile: this.calculatePercentile(
          avgCompletionTime,
          industryBenchmarks.avgCompletionHours,
          true,
        ), // Lower is better
        trend:
          avgCompletionTime < industryBenchmarks.avgCompletionHours
            ? ('above' as const)
            : ('below' as const),
      },
      {
        metric: 'Quality Score',
        currentValue: Math.round(qualityMetrics.qualityScore * 10) / 10,
        teamAverage: qualityMetrics.qualityScore,
        industryBenchmark: industryBenchmarks.qualityScore,
        percentile: this.calculatePercentile(
          qualityMetrics.qualityScore,
          industryBenchmarks.qualityScore,
        ),
        trend:
          qualityMetrics.qualityScore > industryBenchmarks.qualityScore
            ? ('above' as const)
            : ('below' as const),
      },
    ];
  }

  private async calculateIndividualBenchmarks(_whereClause: WhereClause) {
    this.logger.debug('Calculating individual benchmarks from database');

    // Get tasks by owner
    const tasksByOwner = await this.prisma.task.groupBy({
      by: ['owner'],
      _count: { _all: true },
      where: { ..._whereClause, owner: { not: null } },
    });

    const individualBenchmarks = [];

    for (const ownerGroup of tasksByOwner) {
      if (!ownerGroup.owner) continue;

      const ownerWhereClause = { ..._whereClause, owner: ownerGroup.owner };

      const [
        completedTasks,
        avgCompletionTime,
        qualityMetrics,
        delegationSuccess,
      ] = await Promise.all([
        this.prisma.task.count({
          where: { ...ownerWhereClause, status: 'completed' },
        }),
        this.calculateOwnerAvgCompletionTime(ownerWhereClause),
        this.calculateOwnerQualityMetrics(ownerWhereClause),
        this.calculateOwnerDelegationSuccess(ownerWhereClause),
      ]);

      const totalTasks = ownerGroup._count._all;
      const completionRate =
        totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      const velocityScore = this.calculateVelocityScore(
        totalTasks,
        avgCompletionTime,
      );
      const efficiencyRating =
        (completionRate +
          qualityMetrics.qualityScore +
          velocityScore +
          delegationSuccess) /
        4;

      individualBenchmarks.push({
        owner: ownerGroup.owner,
        metrics: {
          tasksCompleted: completedTasks,
          avgCompletionTime: Math.round(avgCompletionTime * 10) / 10,
          qualityScore: Math.round(qualityMetrics.qualityScore * 10) / 10,
          velocityScore: Math.round(velocityScore * 10) / 10,
          efficiencyRating: Math.round(efficiencyRating * 10) / 10,
        },
        ranking: 0, // Will be set after sorting
        percentileScore: this.calculatePercentile(efficiencyRating, 75), // 75 is baseline
        strengths: this.identifyStrengths(
          completionRate,
          qualityMetrics.qualityScore,
          velocityScore,
          delegationSuccess,
        ),
        improvementAreas: this.identifyImprovementAreas(
          completionRate,
          qualityMetrics.qualityScore,
          velocityScore,
          delegationSuccess,
        ),
      });
    }

    // Sort by efficiency rating and assign rankings
    individualBenchmarks.sort(
      (a, b) => b.metrics.efficiencyRating - a.metrics.efficiencyRating,
    );
    individualBenchmarks.forEach((benchmark, index) => {
      benchmark.ranking = index + 1;
    });

    return individualBenchmarks;
  }

  private async calculatePeriodComparisons(
    _whereClause: WhereClause,
    _startDate?: Date,
    _endDate?: Date,
  ) {
    this.logger.debug('Calculating period comparisons from database');

    let startDate = _startDate;
    let endDate = _endDate;

    if (!startDate || !endDate) {
      // If no date range provided, compare last 30 days vs previous 30 days
      endDate = new Date();
      startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const periodDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const previousStartDate = new Date(
      startDate.getTime() - periodDays * 24 * 60 * 60 * 1000,
    );
    const previousEndDate = startDate;

    const currentPeriodClause = {
      ..._whereClause,
      creationDate: { gte: startDate, lte: endDate },
    };

    const previousPeriodClause = {
      ..._whereClause,
      creationDate: { gte: previousStartDate, lte: previousEndDate },
    };

    const [currentMetrics, previousMetrics] = await Promise.all([
      this.calculatePeriodMetrics(currentPeriodClause),
      this.calculatePeriodMetrics(previousPeriodClause),
    ]);

    return [
      {
        metric: 'Completion Rate',
        currentPeriod: Math.round(currentMetrics.completionRate * 10) / 10,
        previousPeriod: Math.round(previousMetrics.completionRate * 10) / 10,
        changePercent: this.calculateChangePercent(
          currentMetrics.completionRate,
          previousMetrics.completionRate,
        ),
        trend:
          currentMetrics.completionRate > previousMetrics.completionRate
            ? ('improving' as const)
            : ('declining' as const),
        significance: this.calculateSignificance(
          currentMetrics.completionRate,
          previousMetrics.completionRate,
        ),
      },
      {
        metric: 'Average Completion Time',
        currentPeriod: Math.round(currentMetrics.avgCompletionTime * 10) / 10,
        previousPeriod: Math.round(previousMetrics.avgCompletionTime * 10) / 10,
        changePercent: this.calculateChangePercent(
          currentMetrics.avgCompletionTime,
          previousMetrics.avgCompletionTime,
        ),
        trend:
          currentMetrics.avgCompletionTime < previousMetrics.avgCompletionTime
            ? ('improving' as const)
            : ('declining' as const),
        significance: this.calculateSignificance(
          currentMetrics.avgCompletionTime,
          previousMetrics.avgCompletionTime,
        ),
      },
      {
        metric: 'Task Volume',
        currentPeriod: currentMetrics.totalTasks,
        previousPeriod: previousMetrics.totalTasks,
        changePercent: this.calculateChangePercent(
          currentMetrics.totalTasks,
          previousMetrics.totalTasks,
        ),
        trend:
          currentMetrics.totalTasks > previousMetrics.totalTasks
            ? ('improving' as const)
            : ('declining' as const),
        significance: this.calculateSignificance(
          currentMetrics.totalTasks,
          previousMetrics.totalTasks,
        ),
      },
    ];
  }

  private generatePerformanceRankings(individualBenchmarks: any[]) {
    const categories = [
      { name: 'Overall Performance', key: 'efficiencyRating' },
      { name: 'Task Completion', key: 'tasksCompleted' },
      { name: 'Quality Score', key: 'qualityScore' },
      { name: 'Velocity', key: 'velocityScore' },
    ];

    return categories.map((category) => ({
      category: category.name,
      rankings: individualBenchmarks
        .map((benchmark) => ({
          name: benchmark.owner,
          score: benchmark.metrics[category.key],
          rank: 0, // Will be calculated
        }))
        .sort((a, b) => b.score - a.score)
        .map((item, index) => ({ ...item, rank: index + 1 }))
        .slice(0, 10), // Top 10 only
    }));
  }

  private generateBenchmarkInsights(
    _teamBenchmarks: any[],
    _individualBenchmarks: any[],
    _periodComparisons: any[],
  ) {
    const insights = [];

    // Team performance insights
    const completionRateBenchmark = _teamBenchmarks.find(
      (b) => b.metric === 'Task Completion Rate',
    );
    if (completionRateBenchmark && completionRateBenchmark.trend === 'above') {
      insights.push({
        category: 'Team Performance',
        insight: `Team completion rate of ${completionRateBenchmark.currentValue}% exceeds industry benchmark of ${completionRateBenchmark.industryBenchmark}%`,
        recommendation:
          'Maintain current practices and document best practices for knowledge sharing',
        priority: 'low' as const,
        actionable: true,
      });
    } else if (
      completionRateBenchmark &&
      completionRateBenchmark.trend === 'below'
    ) {
      insights.push({
        category: 'Team Performance',
        insight: `Team completion rate of ${completionRateBenchmark.currentValue}% is below industry benchmark of ${completionRateBenchmark.industryBenchmark}%`,
        recommendation:
          'Review task estimation processes and identify bottlenecks in workflow',
        priority: 'high' as const,
        actionable: true,
      });
    }

    // Individual performance insights
    if (_individualBenchmarks.length > 0) {
      const topPerformer = _individualBenchmarks[0];
      const lowPerformer =
        _individualBenchmarks[_individualBenchmarks.length - 1];

      if (
        topPerformer.metrics.efficiencyRating -
          lowPerformer.metrics.efficiencyRating >
        30
      ) {
        insights.push({
          category: 'Team Balance',
          insight: `Significant performance gap between top performer (${topPerformer.owner}: ${topPerformer.metrics.efficiencyRating}) and lowest performer (${lowPerformer.owner}: ${lowPerformer.metrics.efficiencyRating})`,
          recommendation:
            'Consider mentoring programs or skill development initiatives',
          priority: 'medium' as const,
          actionable: true,
        });
      }
    }

    // Period comparison insights
    const improvingTrends = _periodComparisons.filter(
      (p) => p.trend === 'improving',
    ).length;
    const decliningTrends = _periodComparisons.filter(
      (p) => p.trend === 'declining',
    ).length;

    if (improvingTrends > decliningTrends) {
      insights.push({
        category: 'Trend Analysis',
        insight: `Team showing positive trends with ${improvingTrends} improving metrics vs ${decliningTrends} declining`,
        recommendation:
          'Continue current improvement initiatives and monitor progress',
        priority: 'low' as const,
        actionable: true,
      });
    } else if (decliningTrends > improvingTrends) {
      insights.push({
        category: 'Trend Analysis',
        insight: `Team showing concerning trends with ${decliningTrends} declining metrics vs ${improvingTrends} improving`,
        recommendation:
          'Investigate root causes and implement corrective actions',
        priority: 'high' as const,
        actionable: true,
      });
    }

    return insights;
  }

  // Helper methods for database calculations
  private async calculateTeamAvgCompletionTime(
    whereClause: WhereClause,
  ): Promise<number> {
    const completedTasks = await this.prisma.task.findMany({
      where: {
        ...whereClause,
        status: 'completed',
        completionDate: { not: null },
      },
      select: { creationDate: true, completionDate: true },
    });

    if (completedTasks.length === 0) return 0;

    const totalHours = completedTasks.reduce((sum, task) => {
      if (!task.completionDate) return sum;
      return (
        sum +
        (task.completionDate.getTime() - task.creationDate.getTime()) /
          (1000 * 60 * 60)
      );
    }, 0);

    return totalHours / completedTasks.length;
  }

  private async calculateTeamQualityMetrics(
    whereClause: WhereClause,
  ): Promise<{ qualityScore: number }> {
    try {
      // Quality score based on code review approvals
      const codeReviews = await this.prisma.codeReview.findMany({
        where: { task: whereClause },
        select: { status: true },
      });

      if (codeReviews.length === 0) return { qualityScore: 80 }; // Default baseline

      const approvedReviews = codeReviews.filter(
        (r) => r.status === 'APPROVED',
      ).length;
      const qualityScore = (approvedReviews / codeReviews.length) * 100;

      return { qualityScore };
    } catch (error) {
      this.logger.warn(
        'Could not calculate quality metrics, using default',
        error,
      );
      return { qualityScore: 80 };
    }
  }

  private async calculateOwnerAvgCompletionTime(
    whereClause: WhereClause,
  ): Promise<number> {
    return this.calculateTeamAvgCompletionTime(whereClause); // Same logic for individual
  }

  private async calculateOwnerQualityMetrics(
    whereClause: WhereClause,
  ): Promise<{ qualityScore: number }> {
    return this.calculateTeamQualityMetrics(whereClause); // Same logic for individual
  }

  private async calculateOwnerDelegationSuccess(
    whereClause: WhereClause,
  ): Promise<number> {
    try {
      const delegations = await this.prisma.delegationRecord.findMany({
        where: { task: whereClause },
      });

      if (delegations.length === 0) return 85; // Default baseline

      const successfulDelegations = delegations.filter(
        (d) => d.success === true,
      ).length;
      return (successfulDelegations / delegations.length) * 100;
    } catch (error) {
      this.logger.warn(
        'Could not calculate delegation success, using default',
        error,
      );
      return 85;
    }
  }

  private async calculatePeriodMetrics(whereClause: WhereClause): Promise<{
    totalTasks: number;
    completionRate: number;
    avgCompletionTime: number;
  }> {
    const [totalTasks, completedTasks, avgCompletionTime] = await Promise.all([
      this.prisma.task.count({ where: whereClause }),
      this.prisma.task.count({
        where: { ...whereClause, status: 'completed' },
      }),
      this.calculateTeamAvgCompletionTime(whereClause),
    ]);

    return {
      totalTasks,
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      avgCompletionTime,
    };
  }

  // Utility methods
  private calculatePercentile(
    value: number,
    baseline: number,
    lowerIsBetter = false,
  ): number {
    if (lowerIsBetter) {
      return value <= baseline
        ? 75 + ((baseline - value) / baseline) * 25
        : 75 - ((value - baseline) / baseline) * 25;
    }
    return value >= baseline
      ? 75 + ((value - baseline) / baseline) * 25
      : 75 - ((baseline - value) / baseline) * 25;
  }

  private calculateVelocityScore(
    totalTasks: number,
    avgCompletionTime: number,
  ): number {
    // Simple velocity calculation: tasks per day adjusted by completion time
    const tasksPerDay = totalTasks / 30; // Assuming 30-day period
    const timeFactor =
      avgCompletionTime > 0
        ? Math.min(100, (24 / avgCompletionTime) * 100)
        : 50;
    return Math.min(100, tasksPerDay * 10 + timeFactor) / 2;
  }

  private calculateChangePercent(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100 * 10) / 10;
  }

  private calculateSignificance(
    current: number,
    previous: number,
  ): 'low' | 'medium' | 'high' {
    const changePercent = Math.abs(
      this.calculateChangePercent(current, previous),
    );
    if (changePercent < 5) return 'low';
    if (changePercent < 15) return 'medium';
    return 'high';
  }

  private identifyStrengths(
    completionRate: number,
    qualityScore: number,
    velocityScore: number,
    delegationSuccess: number,
  ): string[] {
    const strengths = [];
    if (completionRate > 90) strengths.push('Excellent task completion rate');
    if (qualityScore > 90) strengths.push('High quality deliverables');
    if (velocityScore > 80) strengths.push('Strong velocity and efficiency');
    if (delegationSuccess > 85)
      strengths.push('Effective delegation and collaboration');

    return strengths.length > 0
      ? strengths
      : ['Consistent performance across metrics'];
  }

  private identifyImprovementAreas(
    completionRate: number,
    qualityScore: number,
    velocityScore: number,
    delegationSuccess: number,
  ): string[] {
    const areas = [];
    if (completionRate < 70)
      areas.push('Focus on improving task completion rate');
    if (qualityScore < 75) areas.push('Enhance quality assurance practices');
    if (velocityScore < 60)
      areas.push('Optimize workflow efficiency and velocity');
    if (delegationSuccess < 75)
      areas.push('Improve delegation and communication skills');

    return areas.length > 0
      ? areas
      : ['Minor optimizations in workflow processes'];
  }
}
