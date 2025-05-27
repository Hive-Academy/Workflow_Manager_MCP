// src/task-workflow/domains/reporting/interfaces/chart-generator.interface.ts

import { ChartData } from './report-data.interface';

/**
 * Base interface for all chart generators
 * Follows Interface Segregation Principle (ISP)
 */
export interface IChartGenerator {
  generateCharts(data: any): ChartData[];
}

/**
 * Specific chart generator interfaces
 */
export interface IBaseChartGenerator extends IChartGenerator {
  generateCharts(data: {
    taskMetrics: any;
    delegationMetrics: any;
    codeReviewMetrics: any;
  }): ChartData[];
}

export interface ITrendChartGenerator extends IChartGenerator {
  generateTrendLineChart(
    data: { date: Date; value: number }[],
    title: string,
    options?: {
      showPrediction?: boolean;
      predictionPeriods?: number;
      trendColor?: string;
      dataColor?: string;
    },
  ): ChartData;
}

export interface ICorrelationChartGenerator extends IChartGenerator {
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
  ): ChartData;
}

export interface IHeatmapChartGenerator extends IChartGenerator {
  generateQualityHeatmap(
    data: { x: string; y: string; value: number }[],
    title: string,
    options?: {
      colorScheme?: 'red-green' | 'blue-yellow' | 'viridis';
      showValues?: boolean;
      minValue?: number;
      maxValue?: number;
    },
  ): ChartData;
}

export interface IRadarChartGenerator extends IChartGenerator {
  generateQualityRadarChart(
    data: { metric: string; value: number; benchmark?: number }[],
    title: string,
    options?: {
      showBenchmark?: boolean;
      maxValue?: number;
    },
  ): ChartData;
}

/**
 * Chart calculation utilities interface
 * Follows Single Responsibility Principle (SRP)
 */
export interface IChartCalculationService {
  calculateLinearRegression(values: number[]): number[];
  calculateCorrelation(x: number[], y: number[]): number;
  generateColorGradient(
    values: number[],
    startColor: string,
    endColor: string,
  ): string[];
  interpolateColor(color1: string, color2: string, ratio: number): string;
  normalizeValue(
    value: number,
    min: number,
    max: number,
    newMin: number,
    newMax: number,
  ): number;
}
