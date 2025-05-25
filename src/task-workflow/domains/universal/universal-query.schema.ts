import { z } from 'zod';

/**
 * Universal Query Schema - Leverages Prisma's full filtering capabilities
 * Replaces 15+ individual query tools with one powerful, flexible tool
 */

// Base entity types that can be queried (matching Prisma model names)
export const EntityTypeSchema = z.enum([
  'task',
  'taskDescription',
  'implementationPlan',
  'subtask',
  'researchReport',
  'codeReviewReport', // Maps to CodeReview model
  'completionReport',
  'comment',
  'delegation', // Maps to DelegationRecord model
  'workflowTransition',
]);

// Prisma-style where conditions
export const WhereConditionSchema = z
  .record(z.any())
  .describe(
    'Prisma where conditions - supports all Prisma operators (equals, contains, in, gte, lte, etc.)',
  );

// Prisma-style include/select
export const IncludeSelectSchema = z
  .record(z.any())
  .describe(
    'Prisma include/select - specify related data to include or specific fields to select',
  );

// Prisma-style orderBy
export const OrderBySchema = z
  .record(z.enum(['asc', 'desc']))
  .describe('Prisma orderBy - specify sorting criteria');

// Pagination options
export const PaginationSchema = z.object({
  skip: z.number().optional().describe('Number of records to skip'),
  take: z
    .number()
    .max(1000)
    .optional()
    .describe('Number of records to take (max 1000)'),
  cursor: z.record(z.any()).optional().describe('Cursor-based pagination'),
});

// Aggregation options
export const AggregationSchema = z.object({
  count: z.boolean().optional().describe('Include count'),
  sum: z.record(z.boolean()).optional().describe('Sum specific numeric fields'),
  avg: z
    .record(z.boolean())
    .optional()
    .describe('Average specific numeric fields'),
  min: z.record(z.boolean()).optional().describe('Minimum values'),
  max: z.record(z.boolean()).optional().describe('Maximum values'),
  groupBy: z.array(z.string()).optional().describe('Group by specific fields'),
});

export const UniversalQuerySchema = z.object({
  entity: EntityTypeSchema.describe('The entity type to query'),

  where: WhereConditionSchema.optional().describe(
    'Prisma where conditions. Examples:\n' +
      '- { status: "in-progress" }\n' +
      '- { createdAt: { gte: "2024-01-01" } }\n' +
      '- { name: { contains: "test" } }\n' +
      '- { AND: [{ status: "completed" }, { priority: "High" }] }',
  ),

  include: IncludeSelectSchema.optional().describe(
    'Prisma include - specify related data to include. Examples:\n' +
      '- { taskDescription: true }\n' +
      '- { implementationPlans: { include: { subtasks: true } } }\n' +
      '- { comments: { orderBy: { createdAt: "desc" }, take: 10 } }',
  ),

  select: IncludeSelectSchema.optional().describe(
    'Prisma select - specify exact fields to return. Examples:\n' +
      '- { id: true, name: true, status: true }\n' +
      '- { task: { select: { id: true, name: true } } }',
  ),

  orderBy: OrderBySchema.optional().describe(
    'Prisma orderBy - specify sorting. Examples:\n' +
      '- { createdAt: "desc" }\n' +
      '- { priority: "asc", createdAt: "desc" }',
  ),

  pagination: PaginationSchema.optional().describe('Pagination options'),

  aggregation: AggregationSchema.optional().describe('Aggregation operations'),

  distinct: z
    .array(z.string())
    .optional()
    .describe('Return distinct values for specified fields'),

  // Performance and optimization
  timeout: z
    .number()
    .max(30000)
    .optional()
    .default(10000)
    .describe('Query timeout in milliseconds'),

  // Response formatting
  format: z
    .enum(['full', 'summary', 'minimal'])
    .optional()
    .default('full')
    .describe('Response format level'),

  // Debugging and development
  explain: z
    .boolean()
    .optional()
    .describe('Include query execution plan for debugging'),

  // Cache control
  cache: z
    .object({
      ttl: z.number().optional().describe('Cache TTL in seconds'),
      key: z.string().optional().describe('Custom cache key'),
    })
    .optional()
    .describe('Cache control options'),
});

export type UniversalQueryInput = z.infer<typeof UniversalQuerySchema>;

/**
 * Example Usage:
 *
 * // Get all in-progress tasks with their implementation plans
 * {
 *   entity: "task",
 *   where: { status: "in-progress" },
 *   include: {
 *     implementationPlans: {
 *       include: { subtasks: true }
 *     }
 *   },
 *   orderBy: { createdAt: "desc" }
 * }
 *
 * // Get task summary with counts
 * {
 *   entity: "task",
 *   aggregation: {
 *     count: true,
 *     groupBy: ["status", "priority"]
 *   }
 * }
 *
 * // Search tasks by name
 * {
 *   entity: "task",
 *   where: {
 *     name: { contains: "reporting" }
 *   },
 *   select: { id: true, name: true, status: true },
 *   pagination: { take: 20 }
 * }
 */
