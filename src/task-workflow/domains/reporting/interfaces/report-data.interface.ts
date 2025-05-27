// src/task-workflow/domains/reporting/interfaces/report-data.interface.ts

export interface ReportData {
  title: string;
  generatedAt: Date;
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  filters?: ReportFilters;
  taskId?: string; // For individual task reports (B005)
  metrics: ReportMetrics;
  charts: ChartData[];
  recommendations: string[];
  enhancedInsights?: EnhancedInsight[];
  dynamicContent?: {
    executiveSummary: string;
    keyInsights: string[];
    actionableRecommendations: string[];
    detailedAnalysis: string;
  };
}

export interface EnhancedInsight {
  type: string;
  category: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  priority: number; // 1-10, higher is more important
  confidence: number; // 0-1, confidence in the insight
  actionableSteps: string[];
  dataPoints: Record<string, any>;
}

export interface ReportFilters {
  owner?: string;
  mode?: string;
  priority?: string;
  taskId?: string; // For individual task reports (B005)
}

export interface ReportMetrics {
  // Standard aggregate metrics
  tasks?: import('./metrics.interface').TaskMetrics;
  delegations?: import('./metrics.interface').DelegationMetrics;
  codeReviews?: import('./metrics.interface').CodeReviewMetrics;
  performance?: import('./metrics.interface').PerformanceMetrics;
  timeSeriesAnalysis?: import('./time-series.interface').TimeSeriesMetrics;
  performanceBenchmarks?: import('./benchmarks.interface').PerformanceBenchmark;
  implementationPlans?: import('./metrics.interface').ImplementationPlanMetrics;
  codeReviewInsights?: import('./metrics.interface').CodeReviewInsights;
  delegationFlow?: import('./metrics.interface').DelegationFlowMetrics;

  // Individual task metrics (B005)
  taskSpecific?: any; // Will contain specific task metrics based on report type
}

export interface ChartData {
  type:
    | 'bar'
    | 'line'
    | 'pie'
    | 'doughnut'
    | 'scatter'
    | 'bubble'
    | 'radar'
    | 'polarArea';
  title: string;
  labels: string[];
  datasets: ChartDataset[];
  options?: ChartOptions;
  plugins?: ChartPlugin[];
}

export interface ChartDataset {
  label: string;
  data: number[] | ScatterDataPoint[] | BubbleDataPoint[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  pointRadius?: number | number[];
  pointBackgroundColor?: string | string[];
  pointBorderColor?: string | string[];
  tension?: number;
  fill?: boolean | string;
  trendlineLinear?: TrendlineConfig;
  showLine?: boolean;
  pointStyle?: string | string[];
  hoverBackgroundColor?: string | string[];
  hoverBorderColor?: string | string[];
}

export interface ScatterDataPoint {
  x: number;
  y: number;
}

export interface BubbleDataPoint {
  x: number;
  y: number;
  r: number;
}

export interface TrendlineConfig {
  style: string;
  lineStyle: string;
  width: number;
  color: string;
}

export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      position?: 'top' | 'bottom' | 'left' | 'right';
      display?: boolean;
    };
    tooltip?: {
      enabled?: boolean;
      mode?: string;
      intersect?: boolean;
      callbacks?: {
        label?: string;
        [key: string]: any;
      };
    };
    annotation?: {
      annotations?: AnnotationConfig[];
    };
  };
  scales?: {
    x?: ScaleConfig;
    y?: ScaleConfig;
    r?: ScaleConfig; // For radar charts
    [key: string]: ScaleConfig | undefined;
  };
  interaction?: {
    mode?: string;
    intersect?: boolean;
  };
}

export interface ScaleConfig {
  type?: string;
  display?: boolean;
  position?: string;
  title?: {
    display?: boolean;
    text?: string;
  };
  min?: number;
  max?: number;
  beginAtZero?: boolean;
  ticks?: {
    stepSize?: number;
    callback?: string;
  };
}

export interface AnnotationConfig {
  type: 'line' | 'box' | 'point';
  scaleID?: string;
  value?: number;
  borderColor?: string;
  borderWidth?: number;
  label?: {
    content?: string;
    enabled?: boolean;
    position?: string;
  };
}

export interface ChartPlugin {
  id: string;
  beforeInit?: string;
  afterDatasetsDraw?: string;
  beforeDraw?: string;
  afterDraw?: string;
}

// Advanced chart type specific interfaces
export interface HeatmapData {
  x: string | number;
  y: string | number;
  v: number; // value for color intensity
}

export interface CorrelationData {
  x: number;
  y: number;
  label?: string;
  correlation?: number;
}

export interface TrendAnalysisData {
  date: Date;
  value: number;
  trend?: number;
  prediction?: number;
}

// Re-export specific metric interfaces
export * from './metrics.interface';
export * from './time-series.interface';
export * from './benchmarks.interface';
