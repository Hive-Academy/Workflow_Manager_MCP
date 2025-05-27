// src/task-workflow/domains/reporting/services/chart-generation-refactored.service.ts

import { Injectable, Logger } from '@nestjs/common';
import {
  IChartGenerationService,
  ReportType,
} from '../../interfaces/service-contracts.interface';
import {
  TaskMetrics,
  DelegationMetrics,
  CodeReviewMetrics,
  ImplementationPlanMetrics,
  CodeReviewInsights,
  DelegationFlowMetrics,
} from '../../interfaces/metrics.interface';
import { TimeSeriesMetrics } from '../../interfaces/time-series.interface';
import { PerformanceBenchmark } from '../../interfaces/benchmarks.interface';
import { ChartData } from '../../interfaces/report-data.interface';
import { ChartFactoryService } from './chart-factory.service';

/**
 * Refactored Chart Generation Service
 * Follows SOLID principles:
 * - SRP: Single responsibility for coordinating chart generation
 * - OCP: Open for extension through factory pattern
 * - LSP: Substitutable with original interface
 * - ISP: Uses specific interfaces for different chart types
 * - DIP: Depends on abstractions (ChartFactoryService)
 */
@Injectable()
export class ChartGenerationService implements IChartGenerationService {
  private readonly logger = new Logger(ChartGenerationService.name);

  constructor(private readonly chartFactory: ChartFactoryService) {}

  /**
   * Main entry point for chart generation
   * Delegates to specialized factory service
   */
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
    this.logger.log(`Generating charts for report type: ${reportType}`);

    try {
      const baseData = {
        taskMetrics,
        delegationMetrics,
        codeReviewMetrics,
      };

      const charts = this.chartFactory.createCharts(
        reportType,
        baseData,
        additionalMetrics,
      );

      this.logger.log(`Generated ${charts.length} charts successfully`);
      return charts;
    } catch (error) {
      this.logger.error(
        `Error generating charts: ${error.message}`,
        error.stack,
      );
      throw new Error(`Chart generation failed: ${error.message}`);
    }
  }

  /**
   * Generate specific chart types (public API for advanced usage)
   */
  generateTrendChart(
    data: { date: Date; value: number }[],
    title: string,
    options?: {
      showPrediction?: boolean;
      predictionPeriods?: number;
      trendColor?: string;
      dataColor?: string;
    },
  ): ChartData {
    try {
      const chart = this.chartFactory.generateTrendChart(data, title, options);
      return chart;
    } catch (error) {
      this.logger.error(
        `Error generating trend chart: ${error.message}`,
        error.stack,
      );
      throw new Error(`Trend chart generation failed: ${error.message}`);
    }
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
    try {
      const chart = this.chartFactory.generateCorrelationChart(
        xData,
        yData,
        xLabel,
        yLabel,
        title,
        options,
      );
      return chart;
    } catch (error) {
      this.logger.error(
        `Error generating correlation chart: ${error.message}`,
        error.stack,
      );
      throw new Error(`Correlation chart generation failed: ${error.message}`);
    }
  }

  generateHeatmap(
    data: { x: string; y: string; value: number }[],
    title: string,
    options?: {
      colorScheme?: 'red-green' | 'blue-yellow' | 'viridis';
      showValues?: boolean;
      minValue?: number;
      maxValue?: number;
    },
  ): ChartData {
    try {
      const chart = this.chartFactory.generateHeatmap(data, title, options);
      return chart;
    } catch (error) {
      this.logger.error(
        `Error generating heatmap: ${error.message}`,
        error.stack,
      );
      throw new Error(`Heatmap generation failed: ${error.message}`);
    }
  }

  generateRadarChart(
    data: { metric: string; value: number; benchmark?: number }[],
    title: string,
    options?: {
      showBenchmark?: boolean;
      maxValue?: number;
    },
  ): ChartData {
    try {
      const chart = this.chartFactory.generateRadarChart(data, title, options);
      return chart;
    } catch (error) {
      this.logger.error(
        `Error generating radar chart: ${error.message}`,
        error.stack,
      );
      throw new Error(`Radar chart generation failed: ${error.message}`);
    }
  }

  /**
   * Generate task-specific charts for individual task reports (B005)
   * Handles the 6 individual task report types with specialized visualizations
   */
  generateTaskSpecificChartData(
    reportType: ReportType,
    taskMetrics: any,
  ): ChartData[] {
    this.logger.log(`Generating task-specific charts for type: ${reportType}`);

    try {
      const charts = this.chartFactory.createTaskSpecificCharts(
        reportType,
        taskMetrics,
      );

      this.logger.log(
        `Generated ${charts.length} task-specific charts successfully`,
      );
      return charts;
    } catch (error) {
      this.logger.error(
        `Error generating task-specific charts: ${error.message}`,
        error.stack,
      );
      throw new Error(
        `Task-specific chart generation failed: ${error.message}`,
      );
    }
  }
}
