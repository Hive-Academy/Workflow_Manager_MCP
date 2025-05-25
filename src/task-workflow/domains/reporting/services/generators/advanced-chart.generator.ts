// src/task-workflow/domains/reporting/services/generators/advanced-chart.generator.ts

import { Injectable } from '@nestjs/common';
import {
  ITrendChartGenerator,
  ICorrelationChartGenerator,
  IHeatmapChartGenerator,
  IRadarChartGenerator,
} from '../../interfaces/chart-generator.interface';
import { ChartData } from '../../interfaces/report-data.interface';
import { ChartCalculationService } from '../chart-calculation.service';

/**
 * Advanced chart generator for complex visualizations
 * Follows Single Responsibility Principle (SRP) and Dependency Inversion Principle (DIP)
 */
@Injectable()
export class AdvancedChartGenerator
  implements
    ITrendChartGenerator,
    ICorrelationChartGenerator,
    IHeatmapChartGenerator,
    IRadarChartGenerator
{
  constructor(private readonly calculationService: ChartCalculationService) {}

  generateCharts(_data: any): ChartData[] {
    // This method can be used for batch generation of advanced charts
    // Implementation depends on the specific data structure
    return [];
  }

  /**
   * Generate advanced trend line charts with linear regression
   * Implements trend analysis for time-series data with prediction capabilities
   */
  generateTrendLineChart(
    data: { date: Date; value: number }[],
    title: string,
    options?: {
      showPrediction?: boolean;
      predictionPeriods?: number;
      trendColor?: string;
      dataColor?: string;
    },
  ): ChartData {
    const sortedData = data.sort((a, b) => a.date.getTime() - b.date.getTime());
    const labels = sortedData.map((d) =>
      d.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    );
    const values = sortedData.map((d) => d.value);

    // Calculate linear regression for trend line
    const trendData = this.calculationService.calculateLinearRegression(values);

    const datasets: any[] = [
      {
        label: 'Actual Values',
        data: values,
        borderColor: options?.dataColor || '#3b82f6',
        backgroundColor: options?.dataColor || '#3b82f6',
        fill: false,
        tension: 0.1,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Trend Line',
        data: trendData,
        borderColor: options?.trendColor || '#ef4444',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
        tension: 0,
      },
    ];

    // Add prediction data if requested
    if (options?.showPrediction && options?.predictionPeriods) {
      const predictionData = this.calculationService.generatePredictionData(
        trendData,
        options.predictionPeriods,
      );
      const predictionLabels = this.calculationService.generatePredictionLabels(
        sortedData[sortedData.length - 1].date,
        options.predictionPeriods,
      );

      datasets.push({
        label: 'Prediction',
        data: [...Array(values.length).fill(null), ...predictionData],
        borderColor: '#f59e0b',
        backgroundColor: 'transparent',
        borderDash: [10, 5],
        fill: false,
        pointRadius: 0,
        tension: 0,
      });

      labels.push(...predictionLabels);
    }

    return {
      type: 'line',
      title,
      labels,
      datasets,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Time Period',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Value',
            },
          },
        },
        interaction: {
          mode: 'nearest',
          intersect: false,
        },
      },
    };
  }

  /**
   * Generate correlation scatter plot with trend line
   * Shows relationship between two metrics with correlation coefficient
   */
  generateCorrelationChart(
    xData: number[],
    yData: number[],
    xLabel: string,
    yLabel: string,
    title: string,
    options?: {
      showTrendLine?: boolean;
      pointLabels?: string[];
      colorByValue?: boolean;
    },
  ): ChartData {
    if (xData.length !== yData.length) {
      throw new Error('X and Y data arrays must have the same length');
    }

    const scatterData = xData.map((x, i) => ({ x, y: yData[i] }));
    const correlation = this.calculationService.calculateCorrelation(
      xData,
      yData,
    );

    const datasets: any[] = [
      {
        label: `${yLabel} vs ${xLabel} (r=${correlation.toFixed(3)})`,
        data: scatterData,
        backgroundColor: options?.colorByValue
          ? this.calculationService.generateColorGradient(
              yData,
              '#3b82f6',
              '#ef4444',
            )
          : '#3b82f6',
        borderColor: '#1e40af',
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: false,
      },
    ];

    // Add trend line if requested
    if (options?.showTrendLine) {
      const trendLine = this.calculationService.calculateScatterTrendLine(
        xData,
        yData,
      );
      datasets.push({
        label: 'Trend Line',
        data: trendLine,
        borderColor: '#ef4444',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
        showLine: true,
        tension: 0,
      });
    }

    return {
      type: 'scatter',
      title: `${title} (Correlation: ${correlation.toFixed(3)})`,
      labels: [],
      datasets,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: `function(context) {
                const point = context.parsed;
                const index = context.dataIndex;
                const label = ${JSON.stringify(options?.pointLabels || [])};
                const pointLabel = label[index] || '';
                return pointLabel + ': (' + point.x + ', ' + point.y + ')';
              }`,
            },
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: xLabel,
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: yLabel,
            },
          },
        },
      },
    };
  }

  /**
   * Generate quality heatmap using matrix visualization
   * Shows quality metrics across different dimensions
   */
  generateQualityHeatmap(
    data: { x: string; y: string; value: number }[],
    title: string,
    options?: {
      colorScheme?: 'red-green' | 'blue-yellow' | 'viridis';
      showValues?: boolean;
      minValue?: number;
      maxValue?: number;
    },
  ): ChartData {
    // Get unique x and y values
    const xLabels = [...new Set(data.map((d) => d.x))].sort();
    const yLabels = [...new Set(data.map((d) => d.y))].sort();

    // Create matrix data for heatmap
    const matrixData: number[][] = [];
    const flatData: number[] = [];

    yLabels.forEach((yLabel, yIndex) => {
      matrixData[yIndex] = [];
      xLabels.forEach((xLabel, xIndex) => {
        const point = data.find((d) => d.x === xLabel && d.y === yLabel);
        const value = point ? point.value : 0;
        matrixData[yIndex][xIndex] = value;
        flatData.push(value);
      });
    });

    const minValue = options?.minValue ?? Math.min(...flatData);
    const maxValue = options?.maxValue ?? Math.max(...flatData);

    // Generate colors based on values
    const colors = this.calculationService.generateHeatmapColors(
      flatData,
      minValue,
      maxValue,
      options?.colorScheme || 'red-green',
    );

    // Convert matrix to bubble chart format (Chart.js doesn't have native heatmap)
    const bubbleData: any[] = [];

    yLabels.forEach((yLabel, yIndex) => {
      xLabels.forEach((xLabel, xIndex) => {
        const value = matrixData[yIndex][xIndex];
        const normalizedSize = this.calculationService.normalizeValue(
          value,
          minValue,
          maxValue,
          5,
          20,
        );

        bubbleData.push({
          x: xIndex,
          y: yIndex,
          r: normalizedSize,
          value: value,
          xLabel: xLabel,
          yLabel: yLabel,
        });
      });
    });

    return {
      type: 'bubble',
      title,
      labels: xLabels,
      datasets: [
        {
          label: 'Quality Metrics',
          data: bubbleData,
          backgroundColor: colors,
          borderColor: colors.map((color) =>
            this.calculationService.darkenColor(color, 0.2),
          ),
          borderWidth: 1,
        },
      ],
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: `function(context) {
                const point = context.raw;
                return point.yLabel + ' × ' + point.xLabel + ': ' + point.value.toFixed(2);
              }`,
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            min: -0.5,
            max: xLabels.length - 0.5,
            ticks: {
              stepSize: 1,
              callback: `function(value) {
                const labels = ${JSON.stringify(xLabels)};
                return labels[value] || '';
              }`,
            },
            title: {
              display: true,
              text: 'Categories',
            },
          },
          y: {
            type: 'linear',
            min: -0.5,
            max: yLabels.length - 0.5,
            ticks: {
              stepSize: 1,
              callback: `function(value) {
                const labels = ${JSON.stringify(yLabels)};
                return labels[value] || '';
              }`,
            },
            title: {
              display: true,
              text: 'Metrics',
            },
          },
        },
      },
    };
  }

  /**
   * Generate radar chart for multi-dimensional quality analysis
   */
  generateQualityRadarChart(
    data: { metric: string; value: number; benchmark?: number }[],
    title: string,
    options?: {
      showBenchmark?: boolean;
      maxValue?: number;
    },
  ): ChartData {
    const labels = data.map((d) => d.metric);
    const values = data.map((d) => d.value);
    const maxValue = options?.maxValue || Math.max(...values) * 1.2;

    const datasets: any[] = [
      {
        label: 'Current Performance',
        data: values,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#1e40af',
        pointRadius: 4,
      },
    ];

    // Add benchmark data if available
    if (options?.showBenchmark && data.some((d) => d.benchmark !== undefined)) {
      const benchmarkValues = data.map((d) => d.benchmark || 0);
      datasets.push({
        label: 'Benchmark',
        data: benchmarkValues,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderColor: '#ef4444',
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#dc2626',
        pointRadius: 3,
      });
    }

    return {
      type: 'radar',
      title,
      labels,
      datasets,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            max: maxValue,
            ticks: {
              stepSize: maxValue / 5,
            },
          },
        },
      },
    };
  }
}
