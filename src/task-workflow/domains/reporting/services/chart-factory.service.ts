// src/task-workflow/domains/reporting/services/chart-factory.service.ts

import { Injectable } from '@nestjs/common';
import { ChartData } from '../interfaces/report-data.interface';
import { ReportType } from '../interfaces/service-contracts.interface';
import { BaseChartGenerator } from './generators/base-chart.generator';
import { AdvancedChartGenerator } from './generators/advanced-chart.generator';
import { SpecializedChartGenerator } from './generators/specialized-chart.generator';

/**
 * Chart factory service using Strategy Pattern
 * Follows Open/Closed Principle (OCP) - open for extension, closed for modification
 * Follows Dependency Inversion Principle (DIP) - depends on abstractions
 */
@Injectable()
export class ChartFactoryService {
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
}
