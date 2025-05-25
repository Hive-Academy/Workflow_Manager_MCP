// src/task-workflow/domains/reporting/services/chart-generation.service.ts

import { Injectable, Logger } from '@nestjs/common';
import {
  IChartGenerationService,
  ReportType,
} from '../interfaces/service-contracts.interface';
import {
  TaskMetrics,
  DelegationMetrics,
  CodeReviewMetrics,
  ImplementationPlanMetrics,
  CodeReviewInsights,
  DelegationFlowMetrics,
} from '../interfaces/metrics.interface';
import { TimeSeriesMetrics } from '../interfaces/time-series.interface';
import { PerformanceBenchmark } from '../interfaces/benchmarks.interface';
import { ChartData } from '../interfaces/report-data.interface';

/**
 * Specialized service for chart generation
 * Follows SRP: Single responsibility for creating chart data
 */
@Injectable()
export class ChartGenerationService implements IChartGenerationService {
  private readonly logger = new Logger(ChartGenerationService.name);

  generateChartData(
    taskMetrics: TaskMetrics,
    delegationMetrics: DelegationMetrics,
    codeReviewMetrics: CodeReviewMetrics,
    reportType: ReportType,
    additionalMetrics?: {
      implementationPlans?: ImplementationPlanMetrics;
      codeReviewInsights?: CodeReviewInsights;
      delegationFlow?: DelegationFlowMetrics;
      timeSeriesAnalysis?: TimeSeriesMetrics;
      performanceBenchmarks?: PerformanceBenchmark;
    },
  ): ChartData[] {
    const charts: ChartData[] = [];

    // Base charts (always included)
    charts.push(
      ...this.generateBaseCharts(
        taskMetrics,
        delegationMetrics,
        codeReviewMetrics,
      ),
    );

    // Report-specific charts
    if (additionalMetrics) {
      charts.push(
        ...this.generateEnhancedCharts(reportType, additionalMetrics),
      );
    }

    return charts;
  }

  private generateBaseCharts(
    taskMetrics: TaskMetrics,
    delegationMetrics: DelegationMetrics,
    codeReviewMetrics: CodeReviewMetrics,
  ): ChartData[] {
    const charts: ChartData[] = [];

    // Task status distribution (pie chart)
    charts.push({
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
    });

    // Priority distribution
    if (taskMetrics.priorityDistribution.length > 0) {
      charts.push({
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
      });
    }

    // Delegation flow chart
    if (delegationMetrics.modeTransitions.length > 0) {
      charts.push({
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
      });
    }

    // Code review status distribution
    charts.push({
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
    });

    return charts;
  }

  private generateEnhancedCharts(
    _reportType: ReportType,
    additionalMetrics: {
      implementationPlans?: ImplementationPlanMetrics;
      codeReviewInsights?: CodeReviewInsights;
      delegationFlow?: DelegationFlowMetrics;
      timeSeriesAnalysis?: TimeSeriesMetrics;
      performanceBenchmarks?: PerformanceBenchmark;
    },
  ): ChartData[] {
    const charts: ChartData[] = [];

    // Implementation Plan Analytics Charts
    if (additionalMetrics.implementationPlans) {
      charts.push(
        ...this.generateImplementationPlanCharts(
          additionalMetrics.implementationPlans,
        ),
      );
    }

    // Code Review Insights Charts
    if (additionalMetrics.codeReviewInsights) {
      charts.push(
        ...this.generateCodeReviewInsightsCharts(
          additionalMetrics.codeReviewInsights,
        ),
      );
    }

    // Delegation Flow Analytics Charts
    if (additionalMetrics.delegationFlow) {
      charts.push(
        ...this.generateDelegationFlowCharts(additionalMetrics.delegationFlow),
      );
    }

    // Time Series Charts
    if (additionalMetrics.timeSeriesAnalysis) {
      charts.push(
        ...this.generateTimeSeriesCharts(additionalMetrics.timeSeriesAnalysis),
      );
    }

    // Performance Benchmark Charts
    if (additionalMetrics.performanceBenchmarks) {
      charts.push(
        ...this.generateBenchmarkCharts(
          additionalMetrics.performanceBenchmarks,
        ),
      );
    }

    return charts;
  }

  private generateImplementationPlanCharts(
    metrics: ImplementationPlanMetrics,
  ): ChartData[] {
    const charts: ChartData[] = [];

    // Batch completion rates
    if (metrics.batchAnalysis.length > 0) {
      charts.push({
        type: 'bar',
        title: 'Batch Completion Rates',
        labels: metrics.batchAnalysis.map((b) => b.batchId),
        datasets: [
          {
            label: 'Completion %',
            data: metrics.batchAnalysis.map((b) => b.completionRate),
            backgroundColor: '#06b6d4',
          },
        ],
      });

      // Estimation accuracy
      charts.push({
        type: 'line',
        title: 'Estimation Accuracy by Batch',
        labels: metrics.batchAnalysis.map((b) => b.batchId),
        datasets: [
          {
            label: 'Accuracy %',
            data: metrics.batchAnalysis.map((b) => b.estimationAccuracy),
            borderColor: '#8b5cf6',
          },
        ],
      });
    }

    return charts;
  }

  private generateCodeReviewInsightsCharts(
    insights: CodeReviewInsights,
  ): ChartData[] {
    const charts: ChartData[] = [];

    // Review efficiency metrics
    charts.push({
      type: 'bar',
      title: 'Review Efficiency Metrics',
      labels: [
        'Approval Rate',
        'Review Efficiency Score',
        'Acceptance Criteria Success',
      ],
      datasets: [
        {
          label: 'Percentage',
          data: [
            insights.approvalRate,
            insights.reviewEfficiencyScore,
            insights.acceptanceCriteriaSuccess,
          ],
          backgroundColor: ['#10b981', '#3b82f6', '#8b5cf6'],
        },
      ],
    });

    // Common issue patterns
    if (insights.commonIssuePatterns.length > 0) {
      charts.push({
        type: 'bar',
        title: 'Common Review Issues',
        labels: insights.commonIssuePatterns.map((p) => p.pattern),
        datasets: [
          {
            label: 'Frequency',
            data: insights.commonIssuePatterns.map((p) => p.frequency),
            backgroundColor: '#f59e0b',
          },
        ],
      });
    }

    return charts;
  }

  private generateDelegationFlowCharts(
    flowMetrics: DelegationFlowMetrics,
  ): ChartData[] {
    const charts: ChartData[] = [];

    // Role transition success rates
    if (flowMetrics.roleTransitionAnalysis.length > 0) {
      charts.push({
        type: 'bar',
        title: 'Role Transition Success Rates',
        labels: flowMetrics.roleTransitionAnalysis
          .slice(0, 5)
          .map((t) => t.transition),
        datasets: [
          {
            label: 'Success Rate %',
            data: flowMetrics.roleTransitionAnalysis
              .slice(0, 5)
              .map((t) => t.successRate),
            backgroundColor: '#10b981',
          },
        ],
      });
    }

    // Flow efficiency metrics
    charts.push({
      type: 'doughnut',
      title: 'Delegation Flow Health',
      labels: [
        'Success Rate',
        'Efficiency Score',
        'Redelegation Rate (Inverted)',
      ],
      datasets: [
        {
          label: 'Metrics',
          data: [
            flowMetrics.successRate,
            flowMetrics.flowEfficiencyScore,
            100 - flowMetrics.redelegationRate, // Invert for positive representation
          ],
          backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
        },
      ],
    });

    return charts;
  }

  private generateTimeSeriesCharts(
    timeSeriesMetrics: TimeSeriesMetrics,
  ): ChartData[] {
    const charts: ChartData[] = [];

    // Weekly trends
    if (timeSeriesMetrics.weeklyTrends.length > 0) {
      charts.push({
        type: 'line',
        title: 'Weekly Efficiency Trends',
        labels: timeSeriesMetrics.weeklyTrends.map((w) =>
          w.weekStart.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
        ),
        datasets: [
          {
            label: 'Weekly Efficiency %',
            data: timeSeriesMetrics.weeklyTrends.map((w) => w.weeklyEfficiency),
            borderColor: '#3b82f6',
          },
        ],
      });
    }

    // Monthly trends
    if (timeSeriesMetrics.monthlyTrends.length > 0) {
      charts.push({
        type: 'bar',
        title: 'Monthly Task Completion',
        labels: timeSeriesMetrics.monthlyTrends.map(
          (m) => `${m.month} ${m.year}`,
        ),
        datasets: [
          {
            label: 'Tasks Completed',
            data: timeSeriesMetrics.monthlyTrends.map((m) => m.tasksCompleted),
            backgroundColor: '#10b981',
          },
        ],
      });
    }

    return charts;
  }

  private generateBenchmarkCharts(
    benchmarks: PerformanceBenchmark,
  ): ChartData[] {
    const charts: ChartData[] = [];

    // Team benchmarks
    if (benchmarks.teamBenchmarks.length > 0) {
      charts.push({
        type: 'bar',
        title: 'Team Performance vs Benchmarks',
        labels: benchmarks.teamBenchmarks.map((b) => b.metric),
        datasets: [
          {
            label: 'Current Value',
            data: benchmarks.teamBenchmarks.map((b) => b.currentValue),
            backgroundColor: '#3b82f6',
          },
          {
            label: 'Team Average',
            data: benchmarks.teamBenchmarks.map((b) => b.teamAverage),
            backgroundColor: '#8b5cf6',
          },
        ],
      });
    }

    // Performance rankings
    if (benchmarks.performanceRankings.length > 0) {
      const topRankings = benchmarks.performanceRankings[0]; // Take first category
      charts.push({
        type: 'bar',
        title: `${topRankings.category} Rankings`,
        labels: topRankings.rankings.slice(0, 10).map((r) => r.name),
        datasets: [
          {
            label: 'Score',
            data: topRankings.rankings.slice(0, 10).map((r) => r.score),
            backgroundColor: '#f59e0b',
          },
        ],
      });
    }

    return charts;
  }
}
