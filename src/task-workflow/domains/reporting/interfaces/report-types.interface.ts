// src/task-workflow/domains/reporting/interfaces/report-types.interface.ts

/**
 * Report Type Definitions with Discriminated Unions
 *
 * Provides type-safe handling of different report categories
 * following TypeScript best practices for discriminated unions
 */

/**
 * Aggregate Report Types
 *
 * Reports that analyze data across multiple tasks and provide
 * aggregate analytics, trends, and insights
 */
export type AggregateReportType =
  | 'task_summary'
  | 'delegation_analytics'
  | 'performance_dashboard'
  | 'comprehensive'
  | 'implementation_plan_analytics'
  | 'code_review_insights'
  | 'delegation_flow_analysis';

/**
 * Individual Task Report Types
 *
 * Reports that focus on specific individual tasks and provide
 * detailed analysis of single task performance and metrics
 */
export type IndividualTaskReportType =
  | 'task_progress_health'
  | 'implementation_execution'
  | 'code_review_quality'
  | 'delegation_flow_analysis_task'
  | 'research_documentation'
  | 'communication_collaboration';

/**
 * Complete Report Type Union
 *
 * Union of all possible report types for comprehensive type safety
 */
export type ReportType = AggregateReportType | IndividualTaskReportType;

/**
 * Report Category Enum
 *
 * Categorizes reports for service routing and processing
 */
export enum ReportCategory {
  AGGREGATE = 'aggregate',
  INDIVIDUAL_TASK = 'individual_task',
}

/**
 * Report Type Metadata Interface
 *
 * Provides metadata about each report type for enhanced type safety
 * and runtime validation
 */
export interface ReportTypeMetadata {
  type: ReportType;
  category: ReportCategory;
  displayName: string;
  description: string;
  requiresTaskId: boolean;
  supportedFilters: string[];
  estimatedGenerationTime: string;
}

/**
 * Report Type Registry
 *
 * Comprehensive metadata for all report types
 * Enables runtime validation and service routing
 */
export const REPORT_TYPE_REGISTRY: Record<ReportType, ReportTypeMetadata> = {
  // Aggregate Report Types
  task_summary: {
    type: 'task_summary',
    category: ReportCategory.AGGREGATE,
    displayName: 'Task Summary Report',
    description:
      'Overview of task completion rates, status distribution, and basic metrics',
    requiresTaskId: false,
    supportedFilters: ['startDate', 'endDate', 'priority', 'owner', 'mode'],
    estimatedGenerationTime: '30-60 seconds',
  },
  delegation_analytics: {
    type: 'delegation_analytics',
    category: ReportCategory.AGGREGATE,
    displayName: 'Delegation Analytics Report',
    description:
      'Deep dive into delegation patterns, handoff efficiency, and role performance',
    requiresTaskId: false,
    supportedFilters: [
      'startDate',
      'endDate',
      'fromRole',
      'toRole',
      'priority',
    ],
    estimatedGenerationTime: '45-90 seconds',
  },
  performance_dashboard: {
    type: 'performance_dashboard',
    category: ReportCategory.AGGREGATE,
    displayName: 'Performance Dashboard',
    description: 'Real-time performance metrics with trending and benchmarks',
    requiresTaskId: false,
    supportedFilters: ['startDate', 'endDate', 'priority', 'owner', 'mode'],
    estimatedGenerationTime: '60-120 seconds',
  },
  comprehensive: {
    type: 'comprehensive',
    category: ReportCategory.AGGREGATE,
    displayName: 'Comprehensive Analysis Report',
    description:
      'Complete analysis combining all report types with executive summary',
    requiresTaskId: false,
    supportedFilters: ['startDate', 'endDate', 'priority', 'owner'],
    estimatedGenerationTime: '120-300 seconds',
  },
  implementation_plan_analytics: {
    type: 'implementation_plan_analytics',
    category: ReportCategory.AGGREGATE,
    displayName: 'Implementation Plan Analytics',
    description:
      'Analysis of implementation plan quality, subtask breakdown, and execution patterns',
    requiresTaskId: false,
    supportedFilters: ['startDate', 'endDate', 'createdBy', 'priority'],
    estimatedGenerationTime: '45-90 seconds',
  },
  code_review_insights: {
    type: 'code_review_insights',
    category: ReportCategory.AGGREGATE,
    displayName: 'Code Review Insights',
    description:
      'Code review approval rates, common issues, and quality trends',
    requiresTaskId: false,
    supportedFilters: ['startDate', 'endDate', 'status', 'priority'],
    estimatedGenerationTime: '30-60 seconds',
  },
  delegation_flow_analysis: {
    type: 'delegation_flow_analysis',
    category: ReportCategory.AGGREGATE,
    displayName: 'Delegation Flow Analysis',
    description:
      'Detailed workflow analysis showing delegation paths and bottlenecks',
    requiresTaskId: false,
    supportedFilters: ['startDate', 'endDate', 'fromRole', 'toRole'],
    estimatedGenerationTime: '60-120 seconds',
  },

  // Individual Task Report Types
  task_progress_health: {
    type: 'task_progress_health',
    category: ReportCategory.INDIVIDUAL_TASK,
    displayName: 'Task Progress Health',
    description: 'Individual task progress and health analysis',
    requiresTaskId: true,
    supportedFilters: ['taskId'],
    estimatedGenerationTime: '15-30 seconds',
  },
  implementation_execution: {
    type: 'implementation_execution',
    category: ReportCategory.INDIVIDUAL_TASK,
    displayName: 'Implementation Execution Analysis',
    description: 'Task implementation execution analysis',
    requiresTaskId: true,
    supportedFilters: ['taskId'],
    estimatedGenerationTime: '20-45 seconds',
  },
  code_review_quality: {
    type: 'code_review_quality',
    category: ReportCategory.INDIVIDUAL_TASK,
    displayName: 'Code Review Quality',
    description: 'Task-specific code review quality metrics',
    requiresTaskId: true,
    supportedFilters: ['taskId'],
    estimatedGenerationTime: '15-30 seconds',
  },
  delegation_flow_analysis_task: {
    type: 'delegation_flow_analysis_task',
    category: ReportCategory.INDIVIDUAL_TASK,
    displayName: 'Task Delegation Flow Analysis',
    description: 'Individual task delegation flow analysis',
    requiresTaskId: true,
    supportedFilters: ['taskId'],
    estimatedGenerationTime: '20-40 seconds',
  },
  research_documentation: {
    type: 'research_documentation',
    category: ReportCategory.INDIVIDUAL_TASK,
    displayName: 'Research Documentation Quality',
    description: 'Task research and documentation quality',
    requiresTaskId: true,
    supportedFilters: ['taskId'],
    estimatedGenerationTime: '15-30 seconds',
  },
  communication_collaboration: {
    type: 'communication_collaboration',
    category: ReportCategory.INDIVIDUAL_TASK,
    displayName: 'Communication & Collaboration',
    description: 'Task communication and collaboration metrics',
    requiresTaskId: true,
    supportedFilters: ['taskId'],
    estimatedGenerationTime: '20-35 seconds',
  },
};

/**
 * Type Guards for Report Type Validation
 *
 * Provides runtime type checking for report types
 */
export function isAggregateReportType(
  type: ReportType,
): type is AggregateReportType {
  return REPORT_TYPE_REGISTRY[type].category === ReportCategory.AGGREGATE;
}

export function isIndividualTaskReportType(
  type: ReportType,
): type is IndividualTaskReportType {
  return REPORT_TYPE_REGISTRY[type].category === ReportCategory.INDIVIDUAL_TASK;
}

export function isValidReportType(type: string): type is ReportType {
  return type in REPORT_TYPE_REGISTRY;
}

export function requiresTaskId(type: ReportType): boolean {
  return REPORT_TYPE_REGISTRY[type].requiresTaskId;
}

/**
 * Report Type Utilities
 *
 * Helper functions for working with report types
 */
export class ReportTypeUtils {
  /**
   * Get all aggregate report types
   */
  static getAggregateTypes(): AggregateReportType[] {
    return Object.keys(REPORT_TYPE_REGISTRY)
      .filter((type) => isAggregateReportType(type as ReportType))
      .map((type) => type as AggregateReportType);
  }

  /**
   * Get all individual task report types
   */
  static getIndividualTaskTypes(): IndividualTaskReportType[] {
    return Object.keys(REPORT_TYPE_REGISTRY)
      .filter((type) => isIndividualTaskReportType(type as ReportType))
      .map((type) => type as IndividualTaskReportType);
  }

  /**
   * Get report metadata by type
   */
  static getMetadata(type: ReportType): ReportTypeMetadata {
    return REPORT_TYPE_REGISTRY[type];
  }

  /**
   * Validate report type and filters
   */
  static validateReportRequest(
    type: string,
    filters?: Record<string, any>,
  ): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Validate report type
    if (!isValidReportType(type)) {
      errors.push(`Invalid report type: ${type}`);
      return { isValid: false, errors };
    }

    const metadata = REPORT_TYPE_REGISTRY[type];

    // Validate taskId requirement
    if (metadata.requiresTaskId && (!filters || !filters.taskId)) {
      errors.push(`Report type ${type} requires taskId filter`);
    }

    // Validate supported filters
    if (filters) {
      const unsupportedFilters = Object.keys(filters).filter(
        (filter) => !metadata.supportedFilters.includes(filter),
      );

      if (unsupportedFilters.length > 0) {
        errors.push(
          `Unsupported filters for ${type}: ${unsupportedFilters.join(', ')}`,
        );
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
