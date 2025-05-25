// src/task-workflow/domains/reporting/interfaces/report-data.interface.ts

export interface ReportData {
  title: string;
  generatedAt: Date;
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  filters?: ReportFilters;
  metrics: ReportMetrics;
  charts: ChartData[];
  recommendations: string[];
}

export interface ReportFilters {
  owner?: string;
  mode?: string;
  priority?: string;
}

export interface ReportMetrics {
  tasks: import('./metrics.interface').TaskMetrics;
  delegations: import('./metrics.interface').DelegationMetrics;
  codeReviews: import('./metrics.interface').CodeReviewMetrics;
  performance: import('./metrics.interface').PerformanceMetrics;
  timeSeriesAnalysis?: import('./time-series.interface').TimeSeriesMetrics;
  performanceBenchmarks?: import('./benchmarks.interface').PerformanceBenchmark;
  implementationPlans?: import('./metrics.interface').ImplementationPlanMetrics;
  codeReviewInsights?: import('./metrics.interface').CodeReviewInsights;
  delegationFlow?: import('./metrics.interface').DelegationFlowMetrics;
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'doughnut';
  title: string;
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
}

// Re-export specific metric interfaces
export * from './metrics.interface';
export * from './time-series.interface';
export * from './benchmarks.interface';
