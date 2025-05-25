// src/task-workflow/domains/reporting/services/chart-factory.service.ts

import { Injectable } from '@nestjs/common';
import { ChartData } from '../interfaces/report-data.interface';
import { ReportType } from '../interfaces/service-contracts.interface';
import { BaseChartGenerator } from './generators/base-chart.generator';
import { AdvancedChartGenerator } from './generators/advanced-chart.generator';
import { SpecializedChartGenerator } from './generators/specialized-chart.generator';
import { Logger } from '@nestjs/common';

/**
 * Chart factory service using Strategy Pattern
 * Follows Open/Closed Principle (OCP) - open for extension, closed for modification
 * Follows Dependency Inversion Principle (DIP) - depends on abstractions
 */
@Injectable()
export class ChartFactoryService {
  private readonly logger = new Logger(ChartFactoryService.name);

  constructor(
    private readonly baseChartGenerator: BaseChartGenerator,
    private readonly advancedChartGenerator: AdvancedChartGenerator,
    private readonly specializedChartGenerator: SpecializedChartGenerator,
  ) {}

  /**
   * Create charts based on report type and data
   * Uses Strategy Pattern to select appropriate generators
   */
  createCharts(
    reportType: ReportType,
    baseData: {
      taskMetrics: any;
      delegationMetrics: any;
      codeReviewMetrics: any;
    },
    additionalMetrics?: any,
  ): ChartData[] {
    const charts: ChartData[] = [];

    // Always include base charts
    charts.push(...this.baseChartGenerator.generateCharts(baseData));

    // Add specialized charts based on available data
    if (additionalMetrics) {
      charts.push(
        ...this.specializedChartGenerator.generateCharts(additionalMetrics),
      );

      // Add advanced charts for specific report types
      if (this.shouldIncludeAdvancedCharts(reportType)) {
        charts.push(
          ...this.generateAdvancedChartsForType(reportType, additionalMetrics),
        );
      }
    }

    return charts;
  }

  /**
   * Generate specific advanced chart types
   */
  generateTrendChart(
    data: { date: Date; value: number }[],
    title: string,
    options?: any,
  ): ChartData {
    return this.advancedChartGenerator.generateTrendLineChart(
      data,
      title,
      options,
    );
  }

  generateCorrelationChart(
    xData: number[],
    yData: number[],
    xLabel: string,
    yLabel: string,
    title: string,
    options?: any,
  ): ChartData {
    return this.advancedChartGenerator.generateCorrelationChart(
      xData,
      yData,
      xLabel,
      yLabel,
      title,
      options,
    );
  }

  generateHeatmap(
    data: { x: string; y: string; value: number }[],
    title: string,
    options?: any,
  ): ChartData {
    return this.advancedChartGenerator.generateQualityHeatmap(
      data,
      title,
      options,
    );
  }

  generateRadarChart(
    data: { metric: string; value: number; benchmark?: number }[],
    title: string,
    options?: any,
  ): ChartData {
    return this.advancedChartGenerator.generateQualityRadarChart(
      data,
      title,
      options,
    );
  }

  /**
   * Determine if advanced charts should be included based on report type
   */
  private shouldIncludeAdvancedCharts(reportType: ReportType): boolean {
    const advancedReportTypes: ReportType[] = [
      'performance_dashboard',
      'comprehensive',
      'delegation_flow_analysis',
    ];
    return advancedReportTypes.includes(reportType);
  }

  /**
   * Generate advanced charts specific to report type
   */
  private generateAdvancedChartsForType(
    reportType: ReportType,
    additionalMetrics: any,
  ): ChartData[] {
    const charts: ChartData[] = [];

    switch (reportType) {
      case 'performance_dashboard':
        charts.push(
          ...this.generatePerformanceAdvancedCharts(additionalMetrics),
        );
        break;
      case 'delegation_flow_analysis':
        charts.push(
          ...this.generateDelegationAdvancedCharts(additionalMetrics),
        );
        break;
      case 'comprehensive':
        charts.push(
          ...this.generateComprehensiveAdvancedCharts(additionalMetrics),
        );
        break;
    }

    return charts;
  }

  private generatePerformanceAdvancedCharts(
    additionalMetrics: any,
  ): ChartData[] {
    const charts: ChartData[] = [];

    // Generate trend analysis for time series data
    if (additionalMetrics.timeSeriesAnalysis?.weeklyTrends) {
      const trendData = additionalMetrics.timeSeriesAnalysis.weeklyTrends.map(
        (w: any) => ({
          date: w.weekStart,
          value: w.weeklyEfficiency,
        }),
      );

      if (trendData.length > 2) {
        charts.push(
          this.generateTrendChart(
            trendData,
            'Weekly Efficiency Trend Analysis',
            {
              showPrediction: true,
              predictionPeriods: 3,
              trendColor: '#ef4444',
              dataColor: '#3b82f6',
            },
          ),
        );
      }
    }

    return charts;
  }

  private generateDelegationAdvancedCharts(
    additionalMetrics: any,
  ): ChartData[] {
    const charts: ChartData[] = [];

    // Generate radar chart for delegation flow metrics
    if (additionalMetrics.delegationFlow) {
      const radarData = [
        {
          metric: 'Success Rate',
          value: additionalMetrics.delegationFlow.successRate,
          benchmark: 85,
        },
        {
          metric: 'Efficiency Score',
          value: additionalMetrics.delegationFlow.flowEfficiencyScore,
          benchmark: 80,
        },
        {
          metric: 'Redelegation Rate (Inverted)',
          value: 100 - additionalMetrics.delegationFlow.redelegationRate,
          benchmark: 90,
        },
      ];

      charts.push(
        this.generateRadarChart(radarData, 'Delegation Flow Quality Analysis', {
          showBenchmark: true,
          maxValue: 100,
        }),
      );
    }

    return charts;
  }

  private generateComprehensiveAdvancedCharts(
    additionalMetrics: any,
  ): ChartData[] {
    const charts: ChartData[] = [];

    // Include all advanced chart types for comprehensive reports
    charts.push(
      ...this.generatePerformanceAdvancedCharts(additionalMetrics),
      ...this.generateDelegationAdvancedCharts(additionalMetrics),
    );

    // Add correlation analysis
    if (additionalMetrics.performanceBenchmarks?.teamBenchmarks) {
      const benchmarks = additionalMetrics.performanceBenchmarks.teamBenchmarks;
      if (benchmarks.length >= 2) {
        const xData = benchmarks.map((b: any) => b.currentValue as number);
        const yData = benchmarks.map((b: any) => b.teamAverage as number);
        const labels = benchmarks.map((b: any) => b.metric as string);

        charts.push(
          this.generateCorrelationChart(
            xData,
            yData,
            'Current Performance',
            'Team Average',
            'Performance vs Team Average Correlation',
            {
              showTrendLine: true,
              pointLabels: labels,
              colorByValue: true,
            },
          ),
        );
      }
    }

    // Add quality heatmap
    if (additionalMetrics.codeReviewInsights?.commonIssuePatterns) {
      const patterns = additionalMetrics.codeReviewInsights.commonIssuePatterns;
      if (patterns.length > 0) {
        const heatmapData = patterns.map((pattern: any) => ({
          x: pattern.pattern,
          y: 'Frequency',
          value: pattern.frequency,
        }));

        charts.push(
          this.generateHeatmap(
            heatmapData,
            'Code Review Issue Patterns Heatmap',
            {
              colorScheme: 'red-green' as const,
              showValues: true,
            },
          ),
        );
      }
    }

    return charts;
  }

  /**
   * Create task-specific charts for individual task reports (B005)
   * Follows KISS principle - simple delegation to specialized generators
   */
  createTaskSpecificCharts(
    reportType: ReportType,
    taskMetrics: any,
  ): ChartData[] {
    this.logger.log(`Creating task-specific charts for type: ${reportType}`);

    try {
      // Simple switch for different report types
      switch (reportType) {
        case 'task_progress_health':
          return this.createProgressHealthCharts(taskMetrics);
        case 'implementation_execution':
          return this.createImplementationCharts(taskMetrics);
        case 'code_review_quality':
          return this.createCodeReviewCharts(taskMetrics);
        case 'delegation_flow_analysis_task':
          return this.createDelegationFlowCharts(taskMetrics);
        case 'research_documentation':
          return this.createResearchCharts(taskMetrics);
        case 'communication_collaboration':
          return this.createCommunicationCharts(taskMetrics);
        default:
          this.logger.warn(`Unknown task report type: ${reportType}`);
          return [];
      }
    } catch (error) {
      this.logger.error(
        `Error creating task-specific charts: ${error.message}`,
        error.stack,
      );
      return [];
    }
  }

  /**
   * Simple progress health charts - follows KISS principle
   */
  private createProgressHealthCharts(metrics: any): ChartData[] {
    const charts: ChartData[] = [];

    // Simple progress donut chart
    if (metrics.completedSubtasks !== undefined && metrics.totalSubtasks) {
      charts.push({
        type: 'doughnut',
        title: `Task Progress - ${metrics.taskName || 'Task'}`,
        labels: ['Completed', 'Remaining'],
        datasets: [
          {
            label: 'Progress',
            data: [
              metrics.completedSubtasks,
              metrics.totalSubtasks - metrics.completedSubtasks,
            ],
            backgroundColor: ['#10b981', '#e5e7eb'],
            borderColor: ['#059669', '#d1d5db'],
            borderWidth: 2,
          },
        ],
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' },
          },
        },
      });
    }

    return charts;
  }

  /**
   * Simple implementation charts - follows KISS principle
   */
  private createImplementationCharts(metrics: any): ChartData[] {
    const charts: ChartData[] = [];

    // Simple batch progress chart
    if (metrics.implementationPlan?.totalBatches) {
      charts.push({
        type: 'doughnut',
        title: 'Implementation Progress',
        labels: ['Completed Batches', 'Remaining Batches'],
        datasets: [
          {
            label: 'Batches',
            data: [
              metrics.implementationPlan.completedBatches || 0,
              metrics.implementationPlan.totalBatches -
                (metrics.implementationPlan.completedBatches || 0),
            ],
            backgroundColor: ['#10b981', '#e5e7eb'],
            borderColor: ['#059669', '#d1d5db'],
            borderWidth: 2,
          },
        ],
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' },
          },
        },
      });
    }

    return charts;
  }

  /**
   * Simple code review charts - follows KISS principle
   */
  private createCodeReviewCharts(metrics: any): ChartData[] {
    const charts: ChartData[] = [];

    // Simple approval rate chart
    if (metrics.codeReviews?.length > 0) {
      const statusCounts: Record<string, number> = metrics.codeReviews.reduce(
        (acc: Record<string, number>, review: any) => {
          acc[review.status] = (acc[review.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      charts.push({
        type: 'pie',
        title: 'Code Review Status',
        labels: Object.keys(statusCounts),
        datasets: [
          {
            label: 'Reviews',
            data: Object.values(statusCounts),
            backgroundColor: ['#10b981', '#3b82f6', '#ef4444'],
            borderColor: '#ffffff',
            borderWidth: 2,
          },
        ],
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' },
          },
        },
      });
    }

    return charts;
  }

  /**
   * Simple delegation flow charts - follows KISS principle
   */
  private createDelegationFlowCharts(metrics: any): ChartData[] {
    const charts: ChartData[] = [];

    // Simple efficiency gauge
    if (metrics.flowEfficiency !== undefined) {
      charts.push({
        type: 'doughnut',
        title: 'Delegation Efficiency',
        labels: ['Efficiency', 'Inefficiency'],
        datasets: [
          {
            label: 'Efficiency',
            data: [
              metrics.flowEfficiency * 100,
              (1 - metrics.flowEfficiency) * 100,
            ],
            backgroundColor: [
              metrics.flowEfficiency >= 0.8 ? '#10b981' : '#f59e0b',
              '#e5e7eb',
            ],
            borderColor: ['#ffffff', '#d1d5db'],
            borderWidth: 2,
          },
        ],
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' },
          },
        },
      });
    }

    return charts;
  }

  /**
   * Simple research charts - follows KISS principle
   */
  private createResearchCharts(metrics: any): ChartData[] {
    const charts: ChartData[] = [];

    // Simple research impact chart
    if (metrics.researchImpact) {
      const impactData = [
        metrics.researchImpact.implementationInfluence || 0,
        metrics.researchImpact.decisionSupport || 0,
        metrics.researchImpact.riskMitigation || 0,
        metrics.researchImpact.innovationScore || 0,
      ];

      charts.push({
        type: 'radar',
        title: 'Research Impact',
        labels: [
          'Implementation',
          'Decision Support',
          'Risk Mitigation',
          'Innovation',
        ],
        datasets: [
          {
            label: 'Impact Score',
            data: impactData.map((v: number) => v * 100),
            backgroundColor: 'rgba(139, 69, 19, 0.2)',
            borderColor: '#8b4513',
            borderWidth: 2,
          },
        ],
        options: {
          responsive: true,
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
            },
          },
        },
      });
    }

    return charts;
  }

  /**
   * Simple communication charts - follows KISS principle
   */
  private createCommunicationCharts(metrics: any): ChartData[] {
    const charts: ChartData[] = [];

    // Simple communication quality chart
    if (metrics.commentAnalysis) {
      const commData = [
        metrics.commentAnalysis.communicationFrequency || 0,
        metrics.commentAnalysis.clarityScore || 0,
        Math.max(0, 100 - (metrics.commentAnalysis.responseTime || 0)),
      ];

      charts.push({
        type: 'radar',
        title: 'Communication Quality',
        labels: ['Frequency', 'Clarity', 'Response Time'],
        datasets: [
          {
            label: 'Score',
            data: commData,
            backgroundColor: 'rgba(168, 85, 247, 0.2)',
            borderColor: '#a855f7',
            borderWidth: 2,
          },
        ],
        options: {
          responsive: true,
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
            },
          },
        },
      });
    }

    return charts;
  }
}
