/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/task-workflow/domains/reporting/services/time-series-analysis.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import {
  ITimeSeriesAnalysisService,
  WhereClause,
} from '../../interfaces/service-contracts.interface';
import {
  TimeSeriesMetrics,
  WeeklyTrend,
  MonthlyTrend,
  PerformanceTrend,
  HistoricalPattern,
  SeasonalPattern,
  TrendInsight,
} from '../../interfaces/time-series.interface';

/**
 * Specialized service for time-series analysis and trending
 * Follows SRP: Single responsibility for time-based analytics
 */
@Injectable()
export class TimeSeriesAnalysisService implements ITimeSeriesAnalysisService {
  private readonly logger = new Logger(TimeSeriesAnalysisService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getTimeSeriesMetrics(
    whereClause: WhereClause,
    startDate?: Date,
    endDate?: Date,
  ): Promise<TimeSeriesMetrics> {
    // Define date range - if not provided, use last 3 months
    const end = endDate || new Date();
    const start =
      startDate || new Date(end.getTime() - 90 * 24 * 60 * 60 * 1000);

    // Get all tasks, delegations, and code reviews in the timeframe
    const [tasks, delegations, codeReviews] = await Promise.all([
      this.fetchTasksInTimeframe(whereClause, start, end),
      this.fetchDelegationsInTimeframe(whereClause, start, end),
      this.fetchCodeReviewsInTimeframe(whereClause, start, end),
    ]);

    const weeklyTrends = this.generateWeeklyTrends(
      tasks,
      delegations,
      codeReviews,
      start,
      end,
    );
    const monthlyTrends = this.generateMonthlyTrends(
      tasks,
      delegations,
      codeReviews,
      start,
      end,
    );
    const performanceTrends = this.generatePerformanceTrends(
      tasks,
      delegations,
      codeReviews,
    );
    const historicalPatterns = this.analyzeHistoricalPatterns(
      tasks,
      delegations,
      codeReviews,
    );
    const seasonalAnalysis = this.analyzeSeasonalPatterns(
      tasks,
      delegations,
      codeReviews,
    );
    const trendInsights = this.generateTrendInsights(
      weeklyTrends,
      monthlyTrends,
      performanceTrends,
    );

    return {
      weeklyTrends,
      monthlyTrends,
      performanceTrends,
      historicalPatterns,
      seasonalAnalysis,
      trendInsights,
    };
  }

  private async fetchTasksInTimeframe(
    whereClause: WhereClause,
    start: Date,
    end: Date,
  ): Promise<any[]> {
    return this.prisma.task.findMany({
      where: {
        ...whereClause,
        creationDate: { gte: start, lte: end },
      },
      select: {
        taskId: true,
        creationDate: true,
        completionDate: true,
        status: true,
        owner: true,
        priority: true,
      },
    });
  }

  private async fetchDelegationsInTimeframe(
    whereClause: WhereClause,
    start: Date,
    end: Date,
  ): Promise<any[]> {
    return this.prisma.delegationRecord.findMany({
      where: {
        delegationTimestamp: { gte: start, lte: end },
        task: whereClause,
      },
      select: {
        id: true,
        delegationTimestamp: true,
        completionTimestamp: true,
        success: true,
        fromMode: true,
        toMode: true,
      },
    });
  }

  private fetchCodeReviewsInTimeframe(
    whereClause: WhereClause,
    start: Date,
    end: Date,
  ): Promise<any[]> {
    return this.prisma.codeReview.findMany({
      where: {
        createdAt: { gte: start, lte: end },
        task: whereClause,
      },
      select: {
        id: true,
        createdAt: true,
        status: true,
      },
    });
  }

  private generateWeeklyTrends(
    tasks: any[],
    delegations: any[],
    codeReviews: any[],
    start: Date,
    end: Date,
  ): WeeklyTrend[] {
    const trends: WeeklyTrend[] = [];
    const current = new Date(start);

    while (current <= end) {
      const weekStart = new Date(current);
      const weekEnd = new Date(current.getTime() + 7 * 24 * 60 * 60 * 1000);

      const weekTasks = this.filterByDateRange(
        tasks,
        'creationDate',
        weekStart,
        weekEnd,
      );
      const weekCompletedTasks = this.filterCompletedTasksByDateRange(
        tasks,
        weekStart,
        weekEnd,
      );
      const weekDelegations = this.filterByDateRange(
        delegations,
        'delegationTimestamp',
        weekStart,
        weekEnd,
      );
      const weekCodeReviews = this.filterByDateRange(
        codeReviews,
        'createdAt',
        weekStart,
        weekEnd,
      );

      const avgCompletionTime =
        this.calculateAverageCompletionTime(weekCompletedTasks);
      const weeklyEfficiency =
        weekTasks.length > 0
          ? (weekCompletedTasks.length / weekTasks.length) * 100
          : 0;

      trends.push({
        weekStart,
        weekEnd,
        tasksCreated: weekTasks.length,
        tasksCompleted: weekCompletedTasks.length,
        avgCompletionTimeHours: avgCompletionTime,
        delegationVolume: weekDelegations.length,
        codeReviewsCompleted: weekCodeReviews.length,
        weeklyEfficiency,
      });

      current.setDate(current.getDate() + 7);
    }

    return trends;
  }

  private generateMonthlyTrends(
    tasks: any[],
    delegations: any[],
    _codeReviews: any[],
    start: Date,
    end: Date,
  ): MonthlyTrend[] {
    const trends: MonthlyTrend[] = [];
    const current = new Date(start.getFullYear(), start.getMonth(), 1);

    while (current <= end) {
      const monthStart = new Date(current);
      const monthEnd = new Date(
        current.getFullYear(),
        current.getMonth() + 1,
        0,
      );

      const monthTasks = this.filterByDateRange(
        tasks,
        'creationDate',
        monthStart,
        monthEnd,
      );
      const monthCompletedTasks = this.filterCompletedTasksByDateRange(
        tasks,
        monthStart,
        monthEnd,
      );
      const monthDelegations = this.filterByDateRange(
        delegations,
        'delegationTimestamp',
        monthStart,
        monthEnd,
      );

      const avgCompletionTime =
        this.calculateAverageCompletionTime(monthCompletedTasks);
      const monthlyEfficiency =
        monthTasks.length > 0
          ? (monthCompletedTasks.length / monthTasks.length) * 100
          : 0;

      const successfulDelegations = monthDelegations.filter(
        (d) => d.success === true,
      ).length;
      const delegationSuccessRate =
        monthDelegations.length > 0
          ? (successfulDelegations / monthDelegations.length) * 100
          : 0;

      const qualityScore = (monthlyEfficiency + delegationSuccessRate) / 2;

      trends.push({
        month: monthStart.toLocaleString('default', { month: 'long' }),
        year: monthStart.getFullYear(),
        tasksCreated: monthTasks.length,
        tasksCompleted: monthCompletedTasks.length,
        avgCompletionTimeHours: avgCompletionTime,
        monthlyEfficiency,
        qualityScore,
        delegationSuccessRate,
      });

      current.setMonth(current.getMonth() + 1);
    }

    return trends;
  }

  private generatePerformanceTrends(
    tasks: any[],
    delegations: any[],
    _codeReviews: any[],
  ): PerformanceTrend[] {
    const trends: PerformanceTrend[] = [];
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    const currentYear = new Date().getFullYear();

    quarters.forEach((quarter, index) => {
      const quarterStart = new Date(currentYear, index * 3, 1);
      const quarterEnd = new Date(currentYear, (index + 1) * 3, 0);

      const quarterTasks = this.filterByDateRange(
        tasks,
        'creationDate',
        quarterStart,
        quarterEnd,
      );
      const quarterCompleted = quarterTasks.filter((t) => t.completionDate);
      const quarterDelegations = this.filterByDateRange(
        delegations,
        'delegationTimestamp',
        quarterStart,
        quarterEnd,
      );

      const completionRate =
        quarterTasks.length > 0
          ? (quarterCompleted.length / quarterTasks.length) * 100
          : 0;

      const successfulDelegations = quarterDelegations.filter(
        (d) => d.success === true,
      ).length;
      const qualityScore =
        quarterDelegations.length > 0
          ? (successfulDelegations / quarterDelegations.length) * 100
          : 0;

      const velocityScore = quarterTasks.length;
      const efficiency = (completionRate + qualityScore) / 2;

      const trendDirection: 'improving' | 'declining' | 'stable' =
        efficiency > 75
          ? 'improving'
          : efficiency < 50
            ? 'declining'
            : 'stable';

      trends.push({
        period: `${quarter} ${currentYear}`,
        completionRate,
        qualityScore,
        velocityScore,
        efficiency,
        trendDirection,
      });
    });

    return trends;
  }

  private analyzeHistoricalPatterns(
    tasks: any[],
    delegations: any[],
    _codeReviews: any[],
  ): HistoricalPattern[] {
    const patterns: HistoricalPattern[] = [];

    // Analyze completion time patterns
    const completedTasks = tasks.filter((t) => t.completionDate);
    if (completedTasks.length > 0) {
      const avgCompletionHours =
        this.calculateAverageCompletionTime(completedTasks);

      patterns.push({
        pattern: 'Task Completion Time',
        frequency: completedTasks.length,
        period: 'Historical',
        impact:
          avgCompletionHours < 48
            ? 'positive'
            : avgCompletionHours > 168
              ? 'negative'
              : 'neutral',
        recommendation:
          avgCompletionHours > 168
            ? 'Consider breaking down large tasks into smaller subtasks'
            : 'Maintain current task sizing approach',
      });
    }

    // Analyze delegation patterns
    const redelegations = delegations.filter((d) => d.redelegationCount > 0);
    if (delegations.length > 0) {
      patterns.push({
        pattern: 'Delegation Success',
        frequency: delegations.length - redelegations.length,
        period: 'Historical',
        impact:
          redelegations.length / delegations.length < 0.2
            ? 'positive'
            : 'negative',
        recommendation:
          redelegations.length / delegations.length > 0.3
            ? 'Review delegation criteria and role readiness'
            : 'Continue current delegation strategy',
      });
    }

    return patterns;
  }

  private analyzeSeasonalPatterns(
    tasks: any[],
    _delegations: any[],
    _codeReviews: any[],
  ): SeasonalPattern[] {
    const patterns: SeasonalPattern[] = [];

    // Analyze day of week patterns
    const dayOfWeekCounts = this.aggregateByDayOfWeek(tasks);
    Object.entries(dayOfWeekCounts).forEach(([day, count]) => {
      const averageValue = count / Math.max(1, tasks.length / 7);
      patterns.push({
        dayOfWeek: day,
        metric: 'Task Creation',
        averageValue,
        trend:
          averageValue > 1.2 ? 'peak' : averageValue < 0.8 ? 'low' : 'average',
      });
    });

    // Analyze month patterns
    const monthCounts = this.aggregateByMonth(tasks);
    Object.entries(monthCounts).forEach(([month, count]) => {
      const averageValue = count / Math.max(1, tasks.length / 12);
      patterns.push({
        monthOfYear: month,
        metric: 'Task Volume',
        averageValue,
        trend:
          averageValue > 1.2 ? 'peak' : averageValue < 0.8 ? 'low' : 'average',
      });
    });

    return patterns;
  }

  private generateTrendInsights(
    weeklyTrends: WeeklyTrend[],
    monthlyTrends: MonthlyTrend[],
    _performanceTrends: PerformanceTrend[],
  ): TrendInsight[] {
    const insights: TrendInsight[] = [];

    // Weekly efficiency trend
    if (weeklyTrends.length >= 2) {
      const currentWeek = weeklyTrends[weeklyTrends.length - 1];
      const previousWeek = weeklyTrends[weeklyTrends.length - 2];
      const changePercent =
        previousWeek.weeklyEfficiency > 0
          ? ((currentWeek.weeklyEfficiency - previousWeek.weeklyEfficiency) /
              previousWeek.weeklyEfficiency) *
            100
          : 0;

      insights.push({
        metric: 'Weekly Efficiency',
        currentValue: currentWeek.weeklyEfficiency,
        previousValue: previousWeek.weeklyEfficiency,
        changePercent,
        trend:
          changePercent > 5
            ? 'improving'
            : changePercent < -5
              ? 'declining'
              : 'stable',
        insight: `Weekly efficiency ${changePercent > 0 ? 'increased' : 'decreased'} by ${Math.abs(changePercent).toFixed(1)}%`,
        actionable: Math.abs(changePercent) > 10,
      });
    }

    // Monthly completion trend
    if (monthlyTrends.length >= 2) {
      const currentMonth = monthlyTrends[monthlyTrends.length - 1];
      const previousMonth = monthlyTrends[monthlyTrends.length - 2];
      const changePercent =
        previousMonth.tasksCompleted > 0
          ? ((currentMonth.tasksCompleted - previousMonth.tasksCompleted) /
              previousMonth.tasksCompleted) *
            100
          : 0;

      insights.push({
        metric: 'Task Completion Volume',
        currentValue: currentMonth.tasksCompleted,
        previousValue: previousMonth.tasksCompleted,
        changePercent,
        trend:
          changePercent > 5
            ? 'improving'
            : changePercent < -5
              ? 'declining'
              : 'stable',
        insight: `Task completion volume ${changePercent > 0 ? 'increased' : 'decreased'} by ${Math.abs(changePercent).toFixed(1)}%`,
        actionable: changePercent < -20,
      });
    }

    return insights;
  }

  // Helper methods following DRY principle
  private filterByDateRange(
    items: any[],
    dateField: string,
    start: Date,
    end: Date,
  ): any[] {
    return items.filter((item) => {
      const dateValue = item?.[dateField];
      if (!dateValue) return false;

      const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
      return date >= start && date < end;
    });
  }

  private filterCompletedTasksByDateRange(
    tasks: any[],
    start: Date,
    end: Date,
  ): any[] {
    return tasks.filter((task) => {
      const completionDate = task?.completionDate;
      if (!completionDate) return false;

      const date =
        completionDate instanceof Date
          ? completionDate
          : new Date(completionDate);
      return date >= start && date < end;
    });
  }

  private calculateAverageCompletionTime(tasks: any[]): number {
    if (tasks.length === 0) return 0;

    const totalTime = tasks.reduce((sum, task) => {
      if (!task.completionDate || !task.creationDate) return sum;
      const completionTime =
        task.completionDate instanceof Date
          ? task.completionDate.getTime()
          : new Date(task.completionDate).getTime();
      const creationTime =
        task.creationDate instanceof Date
          ? task.creationDate.getTime()
          : new Date(task.creationDate).getTime();
      return sum + (completionTime - creationTime) / (1000 * 60 * 60);
    }, 0);

    return totalTime / tasks.length;
  }

  private aggregateByDayOfWeek(tasks: any[]): Record<string, number> {
    const result: Record<string, number> = {};

    tasks.forEach((task) => {
      if (!task.creationDate) return;

      const date =
        task.creationDate instanceof Date
          ? task.creationDate
          : new Date(task.creationDate);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      result[dayName] = (result[dayName] || 0) + 1;
    });

    return result;
  }

  private aggregateByMonth(tasks: any[]): Record<string, number> {
    const result: Record<string, number> = {};

    tasks.forEach((task) => {
      if (!task.creationDate) return;

      const date =
        task.creationDate instanceof Date
          ? task.creationDate
          : new Date(task.creationDate);
      const monthName = date.toLocaleDateString('en-US', { month: 'long' });
      result[monthName] = (result[monthName] || 0) + 1;
    });

    return result;
  }
}
