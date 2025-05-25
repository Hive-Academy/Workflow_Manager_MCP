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
import { ChartGenerationRefactoredService } from './chart-generation-refactored.service';

/**
 * Legacy Chart Generation Service - Delegates to Refactored Implementation
 * Maintains backward compatibility while using SOLID principles internally
 *
 * @deprecated Use ChartGenerationRefactoredService directly for new implementations
 */
@Injectable()
export class ChartGenerationService implements IChartGenerationService {
  private readonly logger = new Logger(ChartGenerationService.name);

  constructor(
    private readonly refactoredService: ChartGenerationRefactoredService,
  ) {}

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
    this.logger.warn(
      'Using deprecated ChartGenerationService. Consider migrating to ChartGenerationRefactoredService.',
    );

    return this.refactoredService.generateChartData(
      taskMetrics,
      delegationMetrics,
      codeReviewMetrics,
      reportType,
      additionalMetrics,
    );
  }

  // Legacy method delegates for backward compatibility
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
    return this.refactoredService.generateTrendChart(data, title, options);
  }

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
    return this.refactoredService.generateCorrelationChart(
      xData,
      yData,
      xLabel,
      yLabel,
      title,
      options,
    );
  }

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
    return this.refactoredService.generateHeatmap(data, title, options);
  }

  generateQualityRadarChart(
    data: { metric: string; value: number; benchmark?: number }[],
    title: string,
    options?: {
      showBenchmark?: boolean;
      maxValue?: number;
    },
  ): ChartData {
    return this.refactoredService.generateRadarChart(data, title, options);
  }

  /**
   * Generate task-specific charts for individual task reports (B005)
   * Delegates to refactored service implementation
   */
  generateTaskSpecificChartData(
    reportType: ReportType,
    taskMetrics: any,
  ): ChartData[] {
    this.logger.warn(
      'Using deprecated ChartGenerationService for task-specific charts. Consider migrating to ChartGenerationRefactoredService.',
    );

    return this.refactoredService.generateTaskSpecificChartData(
      reportType,
      taskMetrics,
    );
  }
}
