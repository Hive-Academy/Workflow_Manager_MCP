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
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const SearchTasksInputSchema = z.object({
  query: z
    .string()
    .optional()
    .describe(
      'A general query string to search across task name, description, etc.',
    ),
  status: z
    .union([StatusCodeSchema, z.string()])
    .optional()
    .describe('Filter by task status (shorthand or full name).'),
  mode: z
    .union([RoleCodeSchema, z.string()])
    .optional()
    .describe('Filter by task currentMode (shorthand or full name).'),
  owner: z.string().optional().describe('Filter by task owner.'),
  priority: z
    .string()
    .optional()
    .describe('Filter by task priority (e.g., Low, Medium, High, Critical).'),
  page: z
    .number()
    .int()
    .positive()
    .optional()
    .default(1)
    .describe('Page number for pagination.'),
  pageSize: z
    .number()
    .int()
    .positive()
    .optional()
    .default(10)
    .describe('Number of tasks per page.'),
  sortBy: TaskSortBySchema.optional()
    .default('creationDate')
    .describe('Field to sort tasks by.'),
  sortOrder: SortOrderSchema.optional()
    .default('desc')
    .describe('Sort order (asc or desc).'),
  taskId: z.string().optional().describe('Filter by a specific task ID.'), // Added taskId filter
});

export type SearchTasksInput = z.infer<typeof SearchTasksInputSchema>;

// Defines the summary fields to be returned for each task
export const TaskSummarySchema = z.object({
  taskId: z.string(),
  name: z.string(),
  status: z.string(),
  currentMode: z.string().nullable(),
  priority: z.string().nullable(),
  creationDate: z.date(),
  completionDate: z.date().nullable(),
  owner: z.string().nullable(),
  // Add other summary fields as needed, e.g., number of subtasks, last updated, etc.
});

export type TaskSummary = z.infer<typeof TaskSummarySchema>;

export const PaginatedTaskSummarySchema = z.object({
  tasks: z.array(TaskSummarySchema),
  totalTasks: z.number().int(),
  currentPage: z.number().int(),
  pageSize: z.number().int(),
  totalPages: z.number().int(),
});

export type PaginatedTaskSummary = z.infer<typeof PaginatedTaskSummarySchema>;
