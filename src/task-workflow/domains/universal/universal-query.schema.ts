/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from 'zod';

/**
 * Universal Query Schema - Simplified for Gemini compatibility
 */

// Entity Types
export const EntityTypeSchema = z
  .enum([
    'task',
    'taskDescription',
    'implementationPlan',
    'subtask',
    'researchReport',
    'codeReviewReport',
    'completionReport',
    'comment',
    'delegation',
    'workflowTransition',
    'codebaseAnalysis',
  ])
  .describe('Entity type to query (task, subtask, etc.)');

// Basic Filter Types - Simplified
export const StringFilterSchema: z.ZodType = z
  .object({
    equals: z.string().optional(),
    in: z.array(z.string()).optional(),
    notIn: z.array(z.string()).optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.enum(['default', 'insensitive']).optional(),
    not: z.lazy(() => StringFilterSchema).optional(),
  })
  .describe('Filter for string fields');

export const DateTimeFilterSchema: z.ZodType = z
  .object({
    equals: z.string().datetime().optional(),
    in: z.array(z.string().datetime()).optional(),
    notIn: z.array(z.string().datetime()).optional(),
    lt: z.string().datetime().optional(),
    lte: z.string().datetime().optional(),
    gt: z.string().datetime().optional(),
    gte: z.string().datetime().optional(),
    not: z.lazy(() => DateTimeFilterSchema).optional(),
  })
  .describe('Filter for DateTime fields');

export const IntFilterSchema: z.ZodType = z
  .object({
    equals: z.number().int().optional(),
    in: z.array(z.number().int()).optional(),
    notIn: z.array(z.number().int()).optional(),
    lt: z.number().int().optional(),
    lte: z.number().int().optional(),
    gt: z.number().int().optional(),
    gte: z.number().int().optional(),
    not: z.lazy(() => IntFilterSchema).optional(),
  })
  .describe('Filter for Integer fields');

export const BooleanFilterSchema: z.ZodType = z
  .object({
    equals: z.boolean().optional(),
    not: z.lazy(() => BooleanFilterSchema).optional(),
  })
  .describe('Filter for Boolean fields');

export const JsonFilterSchema: z.ZodType = z
  .object({
    equals: z.any().optional(),
    not: z.any().optional(),
  })
  .describe('Filter for JSON fields');

// Where Condition - Simplified
export const WhereConditionSchema: z.ZodType = z
  .record(z.any())
  .optional()
  .describe(
    'Prisma where conditions for filtering. Example: { status: "in-progress" }',
  );

// Include/Select - Simplified
export const IncludeSelectSchema: z.ZodType = z
  .record(z.any())
  .optional()
  .describe('Related entities to include. Example: { subtasks: true }');

// Order By - Simplified
export const OrderBySchema: z.ZodType = z
  .record(z.enum(['asc', 'desc']))
  .describe('Sorting parameters. Example: { creationDate: "desc" }');

// Pagination - Simplified
export const PaginationSchema: z.ZodType = z
  .object({
    skip: z.number().int().optional().describe('Number of records to skip'),
    take: z.number().int().optional().describe('Number of records to take'),
    cursor: z.record(z.any()).optional().describe('Cursor for pagination'),
  })
  .describe('Pagination options');

// Aggregation - Simplified
export const AggregationInputSchema: z.ZodType = z
  .object({
    by: z.array(z.string()).optional().describe('Fields to group by'),
    _count: z
      .record(z.boolean())
      .optional()
      .describe('Count records or fields'),
    _avg: z
      .record(z.boolean())
      .optional()
      .describe('Average of numeric fields'),
    _sum: z.record(z.boolean()).optional().describe('Sum of numeric fields'),
    _min: z.record(z.boolean()).optional().describe('Minimum of fields'),
    _max: z.record(z.boolean()).optional().describe('Maximum of fields'),
    having: z
      .lazy(() => WhereConditionSchema)
      .optional()
      .describe('Filter after aggregation'),
  })
  .describe('Aggregation operations');

// Main Universal Query Schema - Simplified
export const UniversalQuerySchema: z.ZodType = z
  .object({
    entity: EntityTypeSchema.describe(
      'Entity type to query (task, subtask, etc.)',
    ),
    where: WhereConditionSchema,
    include: IncludeSelectSchema,
    select: z.record(z.boolean()).optional().describe('Fields to select'),
    orderBy: z.union([OrderBySchema, z.array(OrderBySchema)]).optional(),
    distinct: z.array(z.string()).optional(),
    pagination: PaginationSchema.optional(),
    aggregation: AggregationInputSchema.optional(),
    format: z.enum(['full', 'summary', 'ids']).optional(),
    explain: z.boolean().optional(),
  })
  .describe('Universal Query tool parameters');

export type UniversalQueryInput = z.infer<typeof UniversalQuerySchema>;
