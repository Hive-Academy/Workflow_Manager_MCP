// src/task-workflow/domains/reporting/services/generators/specialized-chart.generator.ts

import { Injectable } from '@nestjs/common';
import { IChartGenerator } from '../../interfaces/chart-generator.interface';
import { ChartData } from '../../interfaces/report-data.interface';
import {
  ImplementationPlanMetrics,
  CodeReviewInsights,
  DelegationFlowMetrics,
} from '../../interfaces/metrics.interface';
import { TimeSeriesMetrics } from '../../interfaces/time-series.interface';
import { PerformanceBenchmark } from '../../interfaces/benchmarks.interface';

/**
 * Specialized chart generator for domain-specific metrics
 * Follows Single Responsibility Principle (SRP) - handles specialized business charts
 */
@Injectable()
export class SpecializedChartGenerator implements IChartGenerator {
  generateCharts(data: any): ChartData[] {
    const charts: ChartData[] = [];

    if (data.implementationPlans) {
      charts.push(
        ...this.generateImplementationPlanCharts(data.implementationPlans),
      );
    }

    if (data.codeReviewInsights) {
      charts.push(
        ...this.generateCodeReviewInsightsCharts(data.codeReviewInsights),
      );
    }

    if (data.delegationFlow) {
      charts.push(...this.generateDelegationFlowCharts(data.delegationFlow));
    }

    if (data.timeSeriesAnalysis) {
      charts.push(...this.generateTimeSeriesCharts(data.timeSeriesAnalysis));
    }

    if (data.performanceBenchmarks) {
      charts.push(...this.generateBenchmarkCharts(data.performanceBenchmarks));
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
