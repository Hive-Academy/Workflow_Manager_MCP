/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/task-workflow/domains/reporting/services/chart-factory.service.ts

import { Injectable } from '@nestjs/common';
import { ChartData } from '../../interfaces/report-data.interface';
import { ReportType } from '../../interfaces/service-contracts.interface';
import { BaseChartGenerator } from './base-chart.generator';
import { AdvancedChartGenerator } from './advanced-chart.generator';
import { SpecializedChartGenerator } from './specialized-chart.generator';
import { Logger } from '@nestjs/common';

/**
 * Consolidated Chart Factory Service using Strategy Pattern
 * Integrates chart generation, calculation utilities, and factory patterns
 * Follows SOLID principles:
 * - SRP: Single responsibility for chart creation and calculations
 * - OCP: Open for extension through generator strategies
 * - LSP: Substitutable implementations through interfaces
 * - ISP: Segregated interfaces for different chart types
 * - DIP: Depends on abstractions (generators)
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
   * Generate specific advanced chart types with integrated calculations
   */
  generateTrendChart(
    data: { date: Date; value: number }[],
    title: string,
    options?: any,
  ): ChartData {
    // Enhanced with prediction capabilities using integrated calculations
    const values = data.map((d) => d.value);
    const trendLine = this.calculateLinearRegression(values);

    let enhancedOptions = { ...options };
    if (options?.showPrediction && options?.predictionPeriods) {
      const predictions = this.generatePredictionData(
        trendLine,
        options.predictionPeriods,
      );
      const lastDate = data[data.length - 1]?.date || new Date();
      const predictionLabels = this.generatePredictionLabels(
        lastDate,
        options.predictionPeriods,
      );

      enhancedOptions = {
        ...enhancedOptions,
        predictions,
        predictionLabels,
        trendLine,
      };
    }

    return this.advancedChartGenerator.generateTrendLineChart(
      data,
      title,
      enhancedOptions,
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
    // Enhanced with correlation coefficient calculation
    const correlation = this.calculateCorrelation(xData, yData);
    const trendLine = options?.showTrendLine
      ? this.calculateScatterTrendLine(xData, yData)
      : null;

    const enhancedOptions = {
      ...options,
      correlation,
      trendLine,
    };

    return this.advancedChartGenerator.generateCorrelationChart(
      xData,
      yData,
      xLabel,
      yLabel,
      title,
      enhancedOptions,
    );
  }

  generateHeatmap(
    data: { x: string; y: string; value: number }[],
    title: string,
    options?: any,
  ): ChartData {
    // Enhanced with intelligent color generation
    const values = data.map((d) => d.value);
    const colors = this.generateHeatmapColors(
      values,
      options?.minValue || Math.min(...values),
      options?.maxValue || Math.max(...values),
      options?.colorScheme || 'viridis',
    );

    const enhancedOptions = {
      ...options,
      colors,
    };

    return this.advancedChartGenerator.generateQualityHeatmap(
      data,
      title,
      enhancedOptions,
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

  // ===== INTEGRATED CALCULATION UTILITIES =====
  // Consolidated from ChartCalculationService for unified functionality

  /**
   * Calculate linear regression for trend analysis
   */
  calculateLinearRegression(values: number[]): number[] {
    const n = values.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * values[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return x.map((xi) => slope * xi + intercept);
  }

  /**
   * Calculate correlation coefficient between two datasets
   */
  calculateCorrelation(x: number[], y: number[]): number {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumYY = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
      (n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY),
    );

    return denominator === 0 ? 0 : numerator / denominator;
  }

  /**
   * Generate color gradient for data visualization
   */
  generateColorGradient(
    values: number[],
    startColor: string,
    endColor: string,
  ): string[] {
    if (!values || values.length === 0) {
      return ['#000000'];
    }

    const validValues = values.filter(
      (v) => !isNaN(v) && v !== null && v !== undefined,
    );
    if (validValues.length === 0) {
      return values.map(() => '#000000');
    }

    const min = Math.min(...validValues);
    const max = Math.max(...validValues);

    if (max === min) {
      return values.map(() => startColor || '#000000');
    }

    return values.map((value) => {
      if (isNaN(value) || value === null || value === undefined) {
        return '#000000';
      }

      const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
      return this.interpolateColor(startColor, endColor, ratio);
    });
  }

  /**
   * Interpolate between two colors
   */
  interpolateColor(color1: string, color2: string, ratio: number): string {
    if (!color1 || typeof color1 !== 'string') {
      color1 = '#000000';
    }
    if (!color2 || typeof color2 !== 'string') {
      color2 = '#ffffff';
    }

    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');

    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);

    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);

    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  /**
   * Generate prediction data for trend analysis
   */
  generatePredictionData(trendData: number[], periods: number): number[] {
    const lastTrend = trendData[trendData.length - 1];
    const secondLastTrend = trendData[trendData.length - 2];
    const slope = lastTrend - secondLastTrend;

    return Array.from(
      { length: periods },
      (_, i) => lastTrend + slope * (i + 1),
    );
  }

  /**
   * Generate prediction labels for future time periods
   */
  generatePredictionLabels(lastDate: Date, periods: number): string[] {
    const labels: string[] = [];
    for (let i = 1; i <= periods; i++) {
      const futureDate = new Date(lastDate);
      futureDate.setDate(futureDate.getDate() + i * 7);
      labels.push(
        futureDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
      );
    }
    return labels;
  }

  /**
   * Calculate scatter plot trend line
   */
  calculateScatterTrendLine(
    x: number[],
    y: number[],
  ): { x: number; y: number }[] {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const minX = Math.min(...x);
    const maxX = Math.max(...x);

    return [
      { x: minX, y: slope * minX + intercept },
      { x: maxX, y: slope * maxX + intercept },
    ];
  }

  /**
   * Generate heatmap colors based on scheme
   */
  generateHeatmapColors(
    values: number[],
    min: number,
    max: number,
    scheme: 'red-green' | 'blue-yellow' | 'viridis',
  ): string[] {
    const colorMaps = {
      'red-green': ['#ef4444', '#fbbf24', '#10b981'],
      'blue-yellow': ['#3b82f6', '#06b6d4', '#fbbf24'],
      viridis: ['#440154', '#31688e', '#35b779', '#fde725'],
    };

    const colors = colorMaps[scheme] || colorMaps.viridis;

    return values.map((value) => {
      const ratio = (value - min) / (max - min);
      const colorIndex = Math.floor(ratio * (colors.length - 1));
      return colors[Math.max(0, Math.min(colorIndex, colors.length - 1))];
    });
  }

  // ===== EXISTING METHODS CONTINUE =====

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

    // Generate trend analysis for time series data with enhanced calculations
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
          metric: 'Efficiency',
          value: additionalMetrics.delegationFlow.efficiency || 0,
          benchmark: 85,
        },
        {
          metric: 'Speed',
          value: additionalMetrics.delegationFlow.averageTime || 0,
          benchmark: 75,
        },
        {
          metric: 'Success Rate',
          value: additionalMetrics.delegationFlow.successRate || 0,
          benchmark: 90,
        },
        {
          metric: 'Quality',
          value: additionalMetrics.delegationFlow.qualityScore || 0,
          benchmark: 80,
        },
      ];

      charts.push(
        this.generateRadarChart(
          radarData,
          'Delegation Flow Performance Radar',
          {
            showBenchmark: true,
            maxValue: 100,
          },
        ),
      );
    }

    return charts;
  }

  private generateComprehensiveAdvancedCharts(
    additionalMetrics: any,
  ): ChartData[] {
    const charts: ChartData[] = [];

    // Combine performance and delegation charts for comprehensive view
    charts.push(...this.generatePerformanceAdvancedCharts(additionalMetrics));
    charts.push(...this.generateDelegationAdvancedCharts(additionalMetrics));

    // Add correlation analysis between different metrics
    if (
      additionalMetrics.timeSeriesAnalysis &&
      additionalMetrics.delegationFlow
    ) {
      const efficiencyData =
        additionalMetrics.timeSeriesAnalysis.weeklyTrends?.map(
          (w: any) => w.weeklyEfficiency,
        ) || [];
      const delegationData =
        additionalMetrics.timeSeriesAnalysis.weeklyTrends?.map(
          (w: any) => w.delegationCount,
        ) || [];

      if (efficiencyData.length > 0 && delegationData.length > 0) {
        charts.push(
          this.generateCorrelationChart(
            efficiencyData,
            delegationData,
            'Weekly Efficiency',
            'Delegation Count',
            'Efficiency vs Delegation Correlation',
            {
              showTrendLine: true,
              colorByValue: true,
            },
          ),
        );
      }
    }

    return charts;
  }

  createTaskSpecificCharts(
    reportType: ReportType,
    taskMetrics: any,
  ): ChartData[] {
    const charts: ChartData[] = [];

    switch (reportType) {
      case 'task_progress_health':
        charts.push(...this.createProgressHealthCharts(taskMetrics));
        break;
      case 'implementation_execution':
        charts.push(...this.createImplementationCharts(taskMetrics));
        break;
      case 'code_review_quality':
        charts.push(...this.createCodeReviewCharts(taskMetrics));
        break;
      case 'delegation_flow_analysis_task':
        charts.push(...this.createDelegationFlowCharts(taskMetrics));
        break;
      case 'research_documentation':
        charts.push(...this.createResearchCharts(taskMetrics));
        break;
      case 'communication_collaboration':
        charts.push(...this.createCommunicationCharts(taskMetrics));
        break;
    }

    return charts;
  }

  private createProgressHealthCharts(metrics: any): ChartData[] {
    const charts: ChartData[] = [];

    // Progress timeline chart
    if (metrics.progressTimeline) {
      charts.push({
        type: 'line',
        title: 'Task Progress Timeline',
        labels: metrics.progressTimeline.map((p: any) => p.date),
        datasets: [
          {
            label: 'Progress %',
            data: metrics.progressTimeline.map((p: any) => p.progress),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
          },
        ],
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        },
      });
    }

    // Health indicators radar
    if (metrics.healthIndicators) {
      const radarData = Object.entries(metrics.healthIndicators).map(
        ([key, value]: [string, any]) => ({
          metric: key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase()),
          value: typeof value === 'number' ? value : 0,
        }),
      );

      charts.push(
        this.generateRadarChart(radarData, 'Task Health Indicators', {
          maxValue: 100,
        }),
      );
    }

    return charts;
  }

  private createImplementationCharts(metrics: any): ChartData[] {
    const charts: ChartData[] = [];

    // Implementation progress by batch
    if (metrics.batchProgress) {
      charts.push({
        type: 'bar',
        title: 'Implementation Progress by Batch',
        labels: metrics.batchProgress.map((b: any) => b.batchId),
        datasets: [
          {
            label: 'Completed Subtasks',
            data: metrics.batchProgress.map((b: any) => b.completed),
            backgroundColor: '#10b981',
          },
          {
            label: 'Total Subtasks',
            data: metrics.batchProgress.map((b: any) => b.total),
            backgroundColor: '#e5e7eb',
          },
        ],
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return charts;
  }

  private createCodeReviewCharts(metrics: any): ChartData[] {
    const charts: ChartData[] = [];

    // Code review quality metrics
    if (metrics.qualityMetrics) {
      const qualityData = Object.entries(metrics.qualityMetrics).map(
        ([key, value]: [string, any]) => ({
          metric: key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase()),
          value: typeof value === 'number' ? value : 0,
          benchmark: 85, // Standard benchmark
        }),
      );

      charts.push(
        this.generateRadarChart(qualityData, 'Code Review Quality Metrics', {
          showBenchmark: true,
          maxValue: 100,
        }),
      );
    }

    return charts;
  }

  private createDelegationFlowCharts(metrics: any): ChartData[] {
    const charts: ChartData[] = [];

    // Delegation flow visualization (using bar chart as fallback for sankey)
    if (metrics.delegationFlow && metrics.delegationFlow.flowSteps) {
      charts.push({
        type: 'bar',
        title: 'Task Delegation Flow',
        labels: metrics.delegationFlow.flowSteps.map((step: any) => step.role),
        datasets: [
          {
            label: 'Processing Time (hours)',
            data: metrics.delegationFlow.flowSteps.map(
              (step: any) => step.duration || 0,
            ),
            backgroundColor: '#3b82f6',
          },
        ],
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return charts;
  }

  private createResearchCharts(metrics: any): ChartData[] {
    const charts: ChartData[] = [];

    // Research coverage analysis
    if (metrics.researchCoverage) {
      charts.push({
        type: 'doughnut',
        title: 'Research Coverage Analysis',
        labels: Object.keys(metrics.researchCoverage),
        datasets: [
          {
            label: 'Coverage',
            data: Object.values(metrics.researchCoverage).map((value) =>
              Number(value),
            ),
            backgroundColor: [
              '#3b82f6',
              '#10b981',
              '#f59e0b',
              '#ef4444',
              '#8b5cf6',
            ],
          },
        ],
        options: {
          responsive: true,
        },
      });
    }

    return charts;
  }

  private createCommunicationCharts(metrics: any): ChartData[] {
    const charts: ChartData[] = [];

    // Communication frequency timeline
    if (metrics.communicationTimeline) {
      charts.push({
        type: 'line',
        title: 'Communication Frequency Timeline',
        labels: metrics.communicationTimeline.map((c: any) => c.date),
        datasets: [
          {
            label: 'Messages',
            data: metrics.communicationTimeline.map((c: any) => c.count),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          },
        ],
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return charts;
  }
}
