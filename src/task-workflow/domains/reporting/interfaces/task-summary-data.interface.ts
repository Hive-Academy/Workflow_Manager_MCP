/**
 * Task Summary Report Data Interface
 *
 * This interface defines the exact data structure expected by the task-summary.hbs template.
 * Based on template analysis of all {{}} variables used in the template.
 */

export interface TaskSummaryReportData {
  // Basic report metadata
  title: string;
  generatedAt: Date;

  // Date range for the report
  dateRange: {
    start: string;
    end: string;
  };

  // Applied filters (optional)
  filters?: Record<string, any>;

  // Core metrics displayed in the cards
  metrics: {
    totalTasks: number;
    totalTasksChange?: number; // Percentage change vs last period

    completedTasks: number;
    completionRate: number; // Percentage

    inProgressTasks: number;
    avgTimeInProgress?: string; // Human readable duration

    highPriorityTasks: number;
    overdueHighPriority?: number;
  };

  // Chart data for visualizations
  chartData: {
    statusLabels: string[];
    statusData: number[];
    priorityLabels: string[];
    priorityData: number[];
  };

  // Task list (optional - shown if present)
  tasks?: TaskSummaryItem[];

  // Insights section (optional)
  insights?: TaskInsight[];
}

export interface TaskSummaryItem {
  taskId: string;
  name: string;
  status:
    | 'completed'
    | 'in-progress'
    | 'not-started'
    | 'needs-review'
    | 'needs-changes';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  owner: string;
  creationDate: Date;
}

export interface TaskInsight {
  title: string;
  description: string;
  recommendation?: string;
}
