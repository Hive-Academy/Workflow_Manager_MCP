// src/task-workflow/domains/reporting/interfaces/service-contracts.interface.ts

import {
  TaskMetrics,
  DelegationMetrics,
  CodeReviewMetrics,
  PerformanceMetrics,
  ImplementationPlanMetrics,
  CodeReviewInsights,
  DelegationFlowMetrics,
} from './metrics.interface';
import { TimeSeriesMetrics } from './time-series.interface';
import { PerformanceBenchmark } from './benchmarks.interface';
import { ChartData } from './report-data.interface';

export type ReportType =
  | 'task_summary'
  | 'delegation_analytics'
  | 'performance_dashboard'
  | 'comprehensive'
  | 'implementation_plan_analytics'
  | 'code_review_insights'
  | 'delegation_flow_analysis';

export interface WhereClause {
  creationDate?: {
    gte?: Date;
    lte?: Date;
  };
  owner?: string;
  currentMode?: string;
  priority?: string;
  [key: string]: any;
}

/**
 * Service contract for calculating core metrics
 * Single Responsibility: Calculate specific metric types
 */
export interface IMetricsCalculatorService {
  getTaskMetrics(whereClause: WhereClause): Promise<TaskMetrics>;
  getDelegationMetrics(whereClause: WhereClause): Promise<DelegationMetrics>;
  getCodeReviewMetrics(whereClause: WhereClause): Promise<CodeReviewMetrics>;
  getPerformanceMetrics(whereClause: WhereClause): Promise<PerformanceMetrics>;
  getImplementationPlanMetrics(
    whereClause: WhereClause,
  ): Promise<ImplementationPlanMetrics>;
  getCodeReviewInsights(whereClause: WhereClause): Promise<CodeReviewInsights>;
  getDelegationFlowMetrics(
    whereClause: WhereClause,
  ): Promise<DelegationFlowMetrics>;
}

/**
 * Service contract for time-series analysis
 * Single Responsibility: Time-based trending and patterns
 */
export interface ITimeSeriesAnalysisService {
  getTimeSeriesMetrics(
    whereClause: WhereClause,
    startDate?: Date,
    endDate?: Date,
  ): Promise<TimeSeriesMetrics>;
}

/**
 * Service contract for performance benchmarking
 * Single Responsibility: Comparative analysis and benchmarking
 */
export interface IPerformanceBenchmarkService {
  getPerformanceBenchmarks(
    whereClause: WhereClause,
    startDate?: Date,
    endDate?: Date,
  ): Promise<PerformanceBenchmark>;
}

/**
 * Service contract for chart generation
 * Single Responsibility: Chart data creation
 */
export interface IChartGenerationService {
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
  ): ChartData[];
}

/**
 * Service contract for recommendations
 * Single Responsibility: Generate insights and recommendations
 */
export interface IRecommendationEngineService {
  generateRecommendations(
    taskMetrics: TaskMetrics,
    delegationMetrics: DelegationMetrics,
    codeReviewMetrics: CodeReviewMetrics,
    performanceMetrics: PerformanceMetrics,
    additionalMetrics?: {
      implementationPlans?: ImplementationPlanMetrics;
      codeReviewInsights?: CodeReviewInsights;
      delegationFlow?: DelegationFlowMetrics;
      timeSeriesAnalysis?: TimeSeriesMetrics;
      performanceBenchmarks?: PerformanceBenchmark;
    },
  ): string[];
}

/**
 * Service contract for template rendering
 * Single Responsibility: Template rendering and file management
 */
export interface IReportTemplateService {
  renderReportTemplate(reportType: ReportType, data: any): Promise<string>;

  saveTemporaryFile(content: string, extension?: string): Promise<string>;

  cleanupTemporaryFile(filepath: string): Promise<void>;
}
