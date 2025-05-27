/**
 * Core Data Contracts for Consolidated Reporting Architecture
 *
 * These interfaces standardize data flow between services to address
 * the scattered data transformation issues identified in codebase analysis.
 *
 * Follows established patterns from existing interfaces while providing
 * clean contracts for the new 4-service architecture.
 */

import { ReportFilters, ChartData } from './report-data.interface';
import {
  TaskMetrics,
  DelegationMetrics,
  PerformanceMetrics,
} from './metrics.interface';

// ============================================================================
// DATA SERVICE CONTRACTS
// ============================================================================

/**
 * Standardized data request interface for DataService
 * Replaces scattered data access patterns across 23+ services
 */
export interface DataServiceRequest {
  reportType: ReportType;
  filters: ReportFilters;
  dateRange?: DateRange;
  taskId?: string; // For individual task reports
  includeCharts?: boolean;
  includeAnalytics?: boolean;
}

/**
 * Standardized data response from DataService
 * Ensures consistent data structure across all report types
 */
export interface DataServiceResponse {
  rawData: RawReportData;
  metadata: DataMetadata;
  validationStatus: ValidationStatus;
}

/**
 * Raw data structure from database queries
 * Standardizes data before transformation
 */
export interface RawReportData {
  tasks: any[];
  delegations: any[];
  subtasks: any[];
  codeReviews: any[];
  implementationPlans: any[];
  researchReports: any[];
  comments: any[];
  workflowTransitions: any[];
  codebaseAnalysis?: any[];
}

/**
 * Metadata about the data retrieval
 */
export interface DataMetadata {
  queryExecutionTime: number;
  recordCounts: Record<string, number>;
  dataFreshness: Date;
  cacheStatus?: 'hit' | 'miss' | 'disabled';
}

/**
 * Data validation status
 */
export interface ValidationStatus {
  isValid: boolean;
  warnings: string[];
  errors: string[];
  completeness: number; // 0-1 percentage
}

// ============================================================================
// CHART SERVICE CONTRACTS
// ============================================================================

/**
 * Chart generation request interface
 * Standardizes chart data preparation pipeline
 */
export interface ChartServiceRequest {
  reportType: ReportType;
  chartTypes: ChartType[];
  data: ProcessedReportData;
  options?: ChartGenerationOptions;
}

/**
 * Chart generation response
 * Ensures consistent chart data structure
 */
export interface ChartServiceResponse {
  charts: ChartData[];
  generationMetadata: ChartGenerationMetadata;
  errors: ChartGenerationError[];
}

/**
 * Chart generation options
 */
export interface ChartGenerationOptions {
  theme?: 'light' | 'dark' | 'auto';
  colorScheme?: string[];
  responsive?: boolean;
  includeInteractivity?: boolean;
  exportFormats?: ('png' | 'svg' | 'pdf')[];
}

/**
 * Chart generation metadata
 */
export interface ChartGenerationMetadata {
  generationTime: number;
  chartsGenerated: number;
  utilizationStatus: 'full' | 'partial' | 'minimal';
  performanceMetrics: {
    dataProcessingTime: number;
    renderingTime: number;
    totalTime: number;
  };
}

/**
 * Chart generation error tracking
 */
export interface ChartGenerationError {
  chartType: ChartType;
  error: string;
  severity: 'warning' | 'error' | 'critical';
  fallbackUsed?: boolean;
}

// ============================================================================
// TEMPLATE SERVICE CONTRACTS
// ============================================================================

/**
 * Template rendering request
 * Standardizes template data preparation
 */
export interface TemplateServiceRequest {
  reportType: ReportType;
  templateData: TemplateData;
  outputFormat: OutputFormat;
  renderingOptions?: TemplateRenderingOptions;
}

/**
 * Template rendering response
 */
export interface TemplateServiceResponse {
  renderedContent: string;
  metadata: TemplateRenderingMetadata;
  assets?: TemplateAssets;
}

/**
 * Template data structure
 * Combines processed data with charts for rendering
 */
export interface TemplateData {
  reportData: ProcessedReportData;
  charts: ChartData[];
  metadata: ReportMetadata;
  customContent?: Record<string, any>;
}

/**
 * Template rendering options
 */
export interface TemplateRenderingOptions {
  includeCharts?: boolean;
  chartEmbedding?: 'inline' | 'base64' | 'external';
  styling?: 'default' | 'minimal' | 'executive';
  pageOptions?: {
    format?: 'A4' | 'Letter' | 'Legal';
    orientation?: 'portrait' | 'landscape';
    margins?: PageMargins;
  };
}

/**
 * Template rendering metadata
 */
export interface TemplateRenderingMetadata {
  templateUsed: string;
  renderingTime: number;
  contentSize: number;
  assetsGenerated: number;
}

/**
 * Template assets (images, stylesheets, etc.)
 */
export interface TemplateAssets {
  images: AssetReference[];
  stylesheets: AssetReference[];
  scripts: AssetReference[];
}

// ============================================================================
// REPORT ORCHESTRATOR CONTRACTS
// ============================================================================

/**
 * Main report generation request
 * Entry point for all report generation
 */
export interface ReportGenerationRequest {
  reportType: ReportType;
  filters: ReportFilters;
  outputFormat: OutputFormat;
  options?: ReportGenerationOptions;
}

/**
 * Complete report generation response
 */
export interface ReportGenerationResponse {
  success: boolean;
  reportPath?: string;
  reportContent?: string;
  metadata: ReportGenerationMetadata;
  errors: ReportGenerationError[];
  performance: PerformanceMetrics;
}

/**
 * Report generation options
 */
export interface ReportGenerationOptions {
  includeCharts?: boolean;
  includeAnalytics?: boolean;
  cacheResults?: boolean;
  priority?: 'low' | 'normal' | 'high';
  timeout?: number;
}

/**
 * Report generation metadata
 */
export interface ReportGenerationMetadata {
  generationId: string;
  startTime: Date;
  endTime: Date;
  totalDuration: number;
  serviceMetrics: {
    dataService: ServiceMetrics;
    chartService: ServiceMetrics;
    templateService: ServiceMetrics;
  };
}

/**
 * Service performance metrics
 */
export interface ServiceMetrics {
  executionTime: number;
  memoryUsage: number;
  cacheHitRate?: number;
  errorCount: number;
}

// ============================================================================
// SHARED DATA STRUCTURES
// ============================================================================

/**
 * Processed report data after transformation
 * Standardized structure for all report types
 */
export interface ProcessedReportData {
  summary: ReportSummary;
  metrics: StandardizedMetrics;
  insights: ReportInsight[];
  recommendations: string[];
  trends: TrendAnalysis[];
}

/**
 * Report summary information
 */
export interface ReportSummary {
  title: string;
  description: string;
  keyFindings: string[];
  executiveSummary: string;
  period: DateRange;
}

/**
 * Standardized metrics across all report types
 */
export interface StandardizedMetrics {
  primary: Record<string, number>;
  secondary: Record<string, number>;
  percentages: Record<string, number>;
  trends: Record<string, TrendValue>;
}

/**
 * Report insights with confidence scoring
 */
export interface ReportInsight {
  type: InsightType;
  title: string;
  description: string;
  confidence: number; // 0-1
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  dataPoints: Record<string, any>;
}

/**
 * Trend analysis data
 */
export interface TrendAnalysis {
  metric: string;
  direction: 'up' | 'down' | 'stable';
  magnitude: number;
  significance: 'low' | 'medium' | 'high';
  timeframe: string;
}

/**
 * Trend value with direction
 */
export interface TrendValue {
  current: number;
  previous: number;
  change: number;
  changePercent: number;
  direction: 'up' | 'down' | 'stable';
}

// ============================================================================
// ENUMS AND TYPES
// ============================================================================

export type ReportType =
  | 'task_summary'
  | 'delegation_analytics'
  | 'performance_dashboard'
  | 'comprehensive'
  | 'implementation_plan_analytics'
  | 'code_review_insights'
  | 'delegation_flow_analysis'
  | 'task_progress_health'
  | 'implementation_execution'
  | 'code_review_quality'
  | 'delegation_flow_analysis_task'
  | 'research_documentation'
  | 'communication_collaboration';

export type ChartType =
  | 'bar'
  | 'line'
  | 'pie'
  | 'doughnut'
  | 'scatter'
  | 'bubble'
  | 'radar'
  | 'polarArea'
  | 'heatmap'
  | 'correlation'
  | 'trend';

export type OutputFormat = 'pdf' | 'html' | 'png' | 'jpeg';

export type InsightType =
  | 'performance'
  | 'quality'
  | 'efficiency'
  | 'bottleneck'
  | 'opportunity'
  | 'risk';

// ============================================================================
// UTILITY INTERFACES
// ============================================================================

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface PageMargins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface AssetReference {
  type: string;
  path: string;
  size: number;
  checksum?: string;
}

export interface ReportMetadata {
  generatedAt: Date;
  generatedBy: string;
  version: string;
  filters: ReportFilters;
  dataRange: DateRange;
}

export interface ReportGenerationError {
  service: 'data' | 'chart' | 'template' | 'orchestrator';
  code: string;
  message: string;
  severity: 'warning' | 'error' | 'critical';
  timestamp: Date;
  context?: Record<string, any>;
}
