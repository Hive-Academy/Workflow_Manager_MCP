import { z } from 'zod';
import { StatusCodeSchema, RoleCodeSchema } from 'src/task-workflow/types/token-refs.schema';

// ✅ ENHANCED: List tasks schema with comprehensive filtering
export const ListTasksSchema = z.object({
  // Basic filters
  status: z.union([StatusCodeSchema, z.string()]).optional().describe('Filter by task status (shorthand or full name)'),
  currentMode: z.union([RoleCodeSchema, z.string()]).optional().describe('Filter by current mode (shorthand or full name)'),
  owner: z.string().optional().describe('Filter by task owner'),
  priority: z.string().optional().describe('Filter by priority (Low, Medium, High, Critical)'),
  
  // Date filters
  createdAfter: z.date().optional().describe('Tasks created after this date'),
  createdBefore: z.date().optional().describe('Tasks created before this date'),
  completedAfter: z.date().optional().describe('Tasks completed after this date'),
  completedBefore: z.date().optional().describe('Tasks completed before this date'),
  
  // Pagination
  skip: z.number().int().min(0).optional().describe('Number of tasks to skip (for pagination)'),
  take: z.number().int().min(1).max(100).optional().describe('Number of tasks to take (max 100)'),
  
  // Sorting
  orderBy: z.enum(['creationDate', 'completionDate', 'name', 'status', 'priority']).optional().default('creationDate'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  
  // Additional filters
  includeCompleted: z.boolean().optional().default(true).describe('Whether to include completed tasks'),
  includeArchived: z.boolean().optional().default(false).describe('Whether to include archived tasks'),
});

export type ListTasksParams = z.infer<typeof ListTasksSchema>;

// ✅ ENHANCED: Response schema for list tasks
export const ListTasksResponseSchema = z.object({
  tasks: z.array(z.object({
    taskId: z.string(),
    name: z.string(),
    status: z.string(),
    currentMode: z.string().nullable(),
    priority: z.string().nullable(),
    owner: z.string().nullable(),
    creationDate: z.date(),
    completionDate: z.date().nullable(),
    redelegationCount: z.number().int(),
    gitBranch: z.string().nullable(),
  })),
  totalCount: z.number().int().describe('Total number of tasks matching filters'),
  filteredCount: z.number().int().describe('Number of tasks returned'),
  hasMore: z.boolean().describe('Whether there are more tasks available'),
  nextSkip: z.number().int().optional().describe('Skip value for next page'),
});

export type ListTasksResponse = z.infer<typeof ListTasksResponseSchema>;