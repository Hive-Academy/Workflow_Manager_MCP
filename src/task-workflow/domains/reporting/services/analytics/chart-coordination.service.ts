/**
 * Chart Coordination Service
 *
 * Extracted from the oversized 794-line report-generator.service.ts
 * Coordinates between multiple chart services to generate comprehensive visualizations.
 *
 * ENHANCED FOR B005 CRITICAL INTEGRATION:
 * - Improved data validation and error handling
 * - Better integration with refactored metrics services
 * - Enhanced chart generation pipeline
 * - Comprehensive data flow optimization
 *
 * Addresses codebase analysis findings:
 * - Complex interdependencies between services
 * - Underutilized chart services
 * - Large service classes (794+ lines)
 */

import { Injectable, Logger } from '@nestjs/common';
import { ReportType } from '../../interfaces/service-contracts.interface';
import { ReportMetrics } from '../../interfaces/report-data.interface';
import { ChartGenerationService, ChartFactoryService } from '../index';

@Injectable()
export class ChartCoordinationService {
  private readonly logger = new Logger(ChartCoordinationService.name);

  constructor(
    private readonly chartGeneration: ChartGenerationService,
    private readonly chartFactory: ChartFactoryService,
  ) {}

  /**
   * Generate comprehensive chart data using both chart services
   * ENHANCED: Better error handling and data validation
   */
  async generateAllCharts(
    reportType: ReportType,
    baseMetrics: {
      tasks: any;
      delegations: any;
      codeReviews: any;
      performance: any;
    },
    enhancedMetrics: any,
  ): Promise<any> {
    this.logger.debug(`Generating charts for ${reportType}`);

    try {
      // Validate input data before chart generation
      this.validateMetricsData(baseMetrics, enhancedMetrics);

      // Generate charts using both services for enhanced visualization
      const standardCharts = await this.generateStandardCharts(
        reportType,
        baseMetrics,
        enhancedMetrics,
      );
      const enhancedCharts = this.generateEnhancedChartData(reportType, {
        ...baseMetrics,
        ...enhancedMetrics,
      });

      // Merge and validate chart results
      const allCharts = { ...standardCharts, ...enhancedCharts };

      this.logger.debug(
        `Generated ${Object.keys(allCharts).length} charts for ${reportType}`,
      );
      return allCharts;
    } catch (error) {
      this.logger.error(
        `Failed to generate charts for ${reportType}:`,
        error.stack,
      );
      // Return empty charts object to prevent cascade failures
      return {};
    }
  }

  /**
   * Generate standard charts with improved error handling
   * ENHANCED: Better integration with ChartGenerationService
   */
  private generateStandardCharts(
    reportType: ReportType,
    baseMetrics: any,
    enhancedMetrics: any,
  ): any {
    try {
      return this.chartGeneration.generateChartData(
        baseMetrics.tasks,
        baseMetrics.delegations,
        baseMetrics.codeReviews,
        reportType,
        enhancedMetrics,
      );
    } catch (error) {
      this.logger.warn(
        `Standard chart generation failed for ${reportType}: ${error.message}`,
      );
      return {};
    }
  }

  /**
   * Generate enhanced chart data using chart factory
   * ENHANCED: Better data extraction and error handling
   */
  private generateEnhancedChartData(
    reportType: ReportType,
    metrics: ReportMetrics,
  ): any {
    this.logger.debug(`Generating enhanced charts for ${reportType}`);

    try {
      // Use chart factory for advanced visualizations
      const chartConfigs = this.getChartConfigsForReportType(reportType);

      return chartConfigs.reduce((charts, config) => {
        try {
          const chartData = this.extractDataForChart(metrics, config.dataKey);

          // Only generate chart if we have valid data
          if (this.isValidChartData(chartData)) {
            const chart = this.chartFactory.createCharts(
              config.type as ReportType,
              chartData,
              config.options,
            );
            (charts as Record<string, any>)[config.name] = chart;
          } else {
            this.logger.debug(`Skipping chart ${config.name} - no valid data`);
          }
        } catch (error) {
          this.logger.warn(
            `Failed to generate chart ${config.name}: ${error.message}`,
          );
        }
        return charts;
      }, {});
    } catch (error) {
      this.logger.error(
        `Enhanced chart generation failed for ${reportType}:`,
        error.stack,
      );
      return {};
    }
  }

  /**
   * Get chart configurations based on report type
   * ENHANCED: More comprehensive chart configurations
   */
  private getChartConfigsForReportType(reportType: ReportType): Array<{
    name: string;
    type: string;
    dataKey: string;
    options: any;
  }> {
    const baseConfigs = [
      {
        name: 'taskStatusDistribution',
        type: 'pie',
        dataKey: 'tasks.statusDistribution',
        options: { title: 'Task Status Distribution', responsive: true },
      },
      {
        name: 'delegationFlow',
        type: 'sankey',
        dataKey: 'delegations.flowData',
        options: { title: 'Delegation Flow', responsive: true },
      },
    ];

    // Add report-specific charts with enhanced configurations
    switch (reportType) {
      case 'performance_dashboard':
        return [
          ...baseConfigs,
          {
            name: 'performanceTrend',
            type: 'line',
            dataKey: 'performance.trends',
            options: {
              title: 'Performance Trends',
              responsive: true,
              scales: { y: { beginAtZero: true } },
            },
          },
          {
            name: 'timeSeriesAnalysis',
            type: 'line',
            dataKey: 'timeSeriesAnalysis.trends',
            options: {
              title: 'Time Series Analysis',
              responsive: true,
              tension: 0.4,
            },
          },
        ];
      case 'delegation_analytics':
        return [
          ...baseConfigs,
          {
            name: 'delegationEfficiency',
            type: 'bar',
            dataKey: 'delegations.efficiency',
            options: {
              title: 'Delegation Efficiency',
              responsive: true,
              scales: { y: { beginAtZero: true, max: 100 } },
            },
          },
          {
            name: 'delegationFlowAnalysis',
            type: 'network',
            dataKey: 'delegationFlow.networkData',
            options: {
              title: 'Delegation Flow Network',
              responsive: true,
            },
          },
        ];
      case 'code_review_insights':
        return [
          ...baseConfigs,
          {
            name: 'codeReviewMetrics',
            type: 'bar',
            dataKey: 'codeReviewInsights.metrics',
            options: {
              title: 'Code Review Metrics',
              responsive: true,
            },
          },
        ];
      case 'implementation_plan_analytics':
        return [
          ...baseConfigs,
          {
            name: 'implementationProgress',
            type: 'progress',
            dataKey: 'implementationPlans.progress',
            options: {
              title: 'Implementation Progress',
              responsive: true,
            },
          },
        ];
      default:
        return baseConfigs;
    }
  }

  /**
   * Extract data for specific chart from metrics
   * ENHANCED: Better data extraction with validation
   */
  private extractDataForChart(metrics: ReportMetrics, dataKey: string): any {
    try {
      const keys = dataKey.split('.');
      let data = metrics;

      for (const key of keys) {
        if (!data || typeof data !== 'object') {
          this.logger.debug(
            `Data extraction failed at key: ${key} for path: ${dataKey}`,
          );
          return null;
        }
        data = (data as Record<string, any>)[key];
      }

      return data || null;
    } catch (error) {
      this.logger.warn(
        `Failed to extract data for key ${dataKey}:`,
        error.message,
      );
      return null;
    }
  }

  /**
   * Validate metrics data before chart generation
   * NEW: Data validation for better error handling
   */
  private validateMetricsData(baseMetrics: any, _enhancedMetrics: any): void {
    if (!baseMetrics) {
      throw new Error('Base metrics are required for chart generation');
    }

    const requiredBaseMetrics = [
      'tasks',
      'delegations',
      'codeReviews',
      'performance',
    ];
    for (const metric of requiredBaseMetrics) {
      if (!baseMetrics[metric]) {
        this.logger.warn(`Missing base metric: ${metric}`);
      }
    }

    this.logger.debug('Metrics data validation completed');
  }

  /**
   * Check if chart data is valid for visualization
   * NEW: Data validation for chart generation
   */
  private isValidChartData(data: any): boolean {
    if (!data) return false;

    // Check for arrays with data
    if (Array.isArray(data)) {
      return data.length > 0;
    }

    // Check for objects with properties
    if (typeof data === 'object') {
      return Object.keys(data).length > 0;
    }

    // Check for primitive values
    return data !== null && data !== undefined;
  }

  /**
   * Get chart generation statistics
   * NEW: Monitoring and debugging support
   */
  getChartGenerationStats(reportType: ReportType): {
    supportedCharts: string[];
    chartCount: number;
    hasEnhancedCharts: boolean;
  } {
    const configs = this.getChartConfigsForReportType(reportType);

    return {
      supportedCharts: configs.map((config) => config.name),
      chartCount: configs.length,
      hasEnhancedCharts: configs.some(
        (config) => config.type !== 'pie' && config.type !== 'bar',
      ),
    };
  }
}
