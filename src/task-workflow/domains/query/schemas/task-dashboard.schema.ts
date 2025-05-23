import { z } from 'zod';

// ✅ FIXED: Task dashboard schema for aggregated task overview
export const TaskDashboardSchema = z.object({
  includeCompleted: z.boolean().optional().default(false).describe('Whether to include completed tasks'),
  includeArchived: z.boolean().optional().default(false).describe('Whether to include archived tasks'),
  timeframe: z.enum(['today', 'week', 'month', 'all']).optional().default('all').describe('Time frame for dashboard data'),
});

export type TaskDashboardParams = z.infer<typeof TaskDashboardSchema>;

// ✅ FIXED: Dashboard response with comprehensive metrics
export const TaskDashboardResponseSchema = z.object({
  // Summary statistics
  totalTasks: z.number().int(),
  activeTasks: z.number().int(),
  completedTasks: z.number().int(),
  blockedTasks: z.number().int(),
  
  // Status breakdown
  tasksByStatus: z.record(z.number().int()).describe('Count of tasks by status'),
  tasksByMode: z.record(z.number().int()).describe('Count of tasks by current mode'),
  tasksByPriority: z.record(z.number().int()).describe('Count of tasks by priority'),
  
  // Workflow metrics
  averageTaskDuration: z.number().optional().describe('Average task completion time in hours'),
  averageRedelegations: z.number().optional().describe('Average number of redelegations per task'),
  workflowEfficiency: z.number().optional().describe('Overall workflow efficiency score (0-1)'),
  
  // Recent activity
  recentTasks: z.array(z.object({
    taskId: z.string(),
    name: z.string(),
    status: z.string(),
    currentMode: z.string().nullable(),
    lastUpdated: z.date(),
    priority: z.string().nullable(),
  })).describe('Recently updated tasks'),
  
  // Current bottlenecks
  bottlenecks: z.array(z.object({
    mode: z.string(),
    taskCount: z.number().int(),
    averageWaitTime: z.number().describe('Average wait time in hours'),
    oldestTask: z.string().optional().describe('ID of oldest waiting task'),
  })).describe('Current workflow bottlenecks'),
  
  // Alerts and warnings
  alerts: z.array(z.object({
    type: z.string(),
    message: z.string(),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    taskId: z.string().optional(),
  })).describe('System alerts and warnings'),
  
  // Dashboard metadata
  generatedAt: z.date(),
  dataFreshness: z.number().describe('Data freshness in minutes'),
  nextRefreshAt: z.date().optional(),
});

export type TaskDashboardResponse = z.infer<typeof TaskDashboardResponseSchema>;