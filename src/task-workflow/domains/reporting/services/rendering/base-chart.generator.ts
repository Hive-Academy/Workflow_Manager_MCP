// src/task-workflow/domains/reporting/services/generators/base-chart.generator.ts

import { Injectable } from '@nestjs/common';
import { IBaseChartGenerator } from '../../interfaces/chart-generator.interface';
import { ChartData } from '../../interfaces/report-data.interface';
import {
  TaskMetrics,
  DelegationMetrics,
  CodeReviewMetrics,
} from '../../interfaces/metrics.interface';

/**
 * Base chart generator for standard metrics
 * Follows Single Responsibility Principle (SRP) - handles only basic chart generation
 */
@Injectable()
export class BaseChartGenerator implements IBaseChartGenerator {
  generateCharts(data: {
    taskMetrics: TaskMetrics;
    delegationMetrics: DelegationMetrics;
    codeReviewMetrics: CodeReviewMetrics;
  }): ChartData[] {
    const charts: (ChartData | null)[] = [];

    charts.push(
      this.generateTaskStatusChart(data.taskMetrics),
      this.generatePriorityDistributionChart(data.taskMetrics),
      this.generateDelegationFlowChart(data.delegationMetrics),
      this.generateCodeReviewOutcomesChart(data.codeReviewMetrics),
    );

    return charts.filter((chart): chart is ChartData => chart !== null);
  }

  private generateTaskStatusChart(taskMetrics: TaskMetrics): ChartData {
    return {
      type: 'pie',
      title: 'Task Status Distribution',
      labels: ['Completed', 'In Progress', 'Not Started'],
      datasets: [
        {
          label: 'Tasks',
          data: [
            taskMetrics.completedTasks,
            taskMetrics.inProgressTasks,
            taskMetrics.notStartedTasks,
          ],
          backgroundColor: ['#4ade80', '#fbbf24', '#f87171'],
        },
      ],
    };
  }

  private generatePriorityDistributionChart(
    taskMetrics: TaskMetrics,
  ): ChartData | null {
    if (taskMetrics.priorityDistribution.length === 0) {
      return null;
    }

    return {
      type: 'bar',
      title: 'Task Priority Distribution',
      labels: taskMetrics.priorityDistribution.map(
        (p) => p.priority || 'Unknown',
      ),
      datasets: [
        {
          label: 'Count',
          data: taskMetrics.priorityDistribution.map((p) => p.count),
          backgroundColor: '#3b82f6',
        },
      ],
    };
  }

  private generateDelegationFlowChart(
    delegationMetrics: DelegationMetrics,
  ): ChartData | null {
    if (delegationMetrics.modeTransitions.length === 0) {
      return null;
    }

    return {
      type: 'bar',
      title: 'Role Transition Frequency',
      labels: delegationMetrics.modeTransitions.map(
        (t) => `${t.fromMode} → ${t.toMode}`,
      ),
      datasets: [
        {
          label: 'Transitions',
          data: delegationMetrics.modeTransitions.map((t) => t.count),
          backgroundColor: '#8b5cf6',
        },
      ],
    };
  }

  private generateCodeReviewOutcomesChart(
    codeReviewMetrics: CodeReviewMetrics,
  ): ChartData {
    return {
      type: 'doughnut',
      title: 'Code Review Outcomes',
      labels: ['Approved', 'Approved with Reservations', 'Needs Changes'],
      datasets: [
        {
          label: 'Reviews',
          data: [
            codeReviewMetrics.approvedReviews,
            codeReviewMetrics.approvedWithReservationsReviews,
            codeReviewMetrics.needsChangesReviews,
          ],
          backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        },
      ],
    };
  }
}
