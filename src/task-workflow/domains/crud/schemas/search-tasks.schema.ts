import {
  RoleCodeSchema,
  StatusCodeSchema,
} from 'src/task-workflow/types/token-refs.schema';
import { z } from 'zod';

export const TaskSortBySchema = z.enum([
  'name',
  'status',
  'creationDate',
  'completionDate',
  'priority',
  'currentMode',
  'redelegationCount',
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

// ✅ ENHANCED: Advanced search capabilities matching database fields
export const SearchTasksInputSchema = z.object({
  query: z
    .string()
    .optional()
    .describe(
      'General query string to search across task name, description, etc.',
    ),
  status: z
    .union([StatusCodeSchema, z.string()])
    .optional()
    .describe('Filter by task status (shorthand or full name)'),
  mode: z
    .union([RoleCodeSchema, z.string()])
    .optional()
    .describe('Filter by task currentMode (shorthand or full name)'),
  owner: z.string().optional().describe('Filter by task owner'),
  priority: z
    .string()
    .optional()
    .describe('Filter by task priority (Low, Medium, High, Critical)'),

  // ✅ ADDED: Date range searches mentioned in audit
  createdAfter: z
    .date()
    .optional()
    .describe('Filter tasks created after this date'),
  createdBefore: z
    .date()
    .optional()
    .describe('Filter tasks created before this date'),
  completedAfter: z
    .date()
    .optional()
    .describe('Filter tasks completed after this date'),
  completedBefore: z
    .date()
    .optional()
    .describe('Filter tasks completed before this date'),

  // ✅ ADDED: Additional database field searches
  redelegationCountMin: z
    .number()
    .int()
    .optional()
    .describe('Filter tasks with minimum redelegation count'),
  redelegationCountMax: z
    .number()
    .int()
    .optional()
    .describe('Filter tasks with maximum redelegation count'),
  gitBranch: z.string().optional().describe('Filter by Git branch name'),
  hasCompletionDate: z
    .boolean()
    .optional()
    .describe('Filter by whether task has completion date'),

  // Pagination and sorting
  page: z
    .number()
    .int()
    .positive()
    .optional()
    .default(1)
    .describe('Page number for pagination'),
  pageSize: z
    .number()
    .int()
    .positive()
    .optional()
    .default(10)
    .describe('Number of tasks per page'),
  sortBy: TaskSortBySchema.optional()
    .default('creationDate')
    .describe('Field to sort tasks by'),
  sortOrder: SortOrderSchema.optional()
    .default('desc')
    .describe('Sort order (asc or desc)'),

  // Specific filters
  taskId: z.string().optional().describe('Filter by a specific task ID'),
  taskIds: z
    .array(z.string())
    .optional()
    .describe('Filter by multiple task IDs'),
});

export type SearchTasksInput = z.infer<typeof SearchTasksInputSchema>;

// ✅ ENHANCED: Task summary matching database structure
export const TaskSummarySchema = z.object({
  taskId: z.string(),
  name: z.string(),
  status: z.string(),
  currentMode: z.string().nullable(),
  priority: z.string().nullable(),
  creationDate: z.date(),
  completionDate: z.date().nullable(),
  owner: z.string().nullable(),
  redelegationCount: z.number().int(),
  gitBranch: z.string().nullable(),

  // ✅ ADDED: Computed summary fields
  hasDescription: z.boolean().describe('Whether task has a description'),
  subtaskCount: z.number().int().optional().describe('Number of subtasks'),
  completedSubtasks: z
    .number()
    .int()
    .optional()
    .describe('Number of completed subtasks'),
  lastUpdated: z.date().optional().describe('Most recent update timestamp'),
});

export type TaskSummary = z.infer<typeof TaskSummarySchema>;

// ✅ ENHANCED: Paginated response with metadata
export const PaginatedTaskSummarySchema = z.object({
  tasks: z.array(TaskSummarySchema),
  totalTasks: z.number().int(),
  currentPage: z.number().int(),
  pageSize: z.number().int(),
  totalPages: z.number().int(),

  // ✅ ADDED: Search metadata
  searchQuery: z.string().optional().describe('The original search query'),
  appliedFilters: z
    .record(z.any())
    .optional()
    .describe('Filters that were applied'),
  searchDuration: z
    .number()
    .optional()
    .describe('Search execution time in milliseconds'),
});

export type PaginatedTaskSummary = z.infer<typeof PaginatedTaskSummarySchema>;
