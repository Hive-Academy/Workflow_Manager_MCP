import { z } from 'zod';

/**
 * Universal Query Schema - Leverages Prisma's full filtering capabilities
 * Replaces 15+ individual query tools with one powerful, flexible tool
 *
 * 🎯 COMPLETE ENTITY REFERENCE:
 * This schema provides access to all 10 core entities with full field specifications,
 * relationship mappings, and practical examples for efficient agent usage.
 */

// ===== BASIC FILTER TYPES =====

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
    mode: z.enum(['default', 'insensitive']).optional(), // for case-insensitive
    not: z.lazy(() => StringFilterSchema).optional(),
  })
  .describe(
    'Filter for string fields. Allows various operations like equals, contains, startsWith, etc. Includes case-insensitive mode.',
  );

export const DateTimeFilterSchema: z.ZodType = z
  .object({
    equals: z.string().datetime().optional(), // ISO 8601 date-time string
    in: z.array(z.string().datetime()).optional(),
    notIn: z.array(z.string().datetime()).optional(),
    lt: z.string().datetime().optional(),
    lte: z.string().datetime().optional(),
    gt: z.string().datetime().optional(),
    gte: z.string().datetime().optional(),
    not: z.lazy(() => DateTimeFilterSchema).optional(),
  })
  .describe('Filter for DateTime fields. Expects ISO 8601 date-time strings.');

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
  .describe('Filter for Integer fields.');

export const BooleanFilterSchema: z.ZodType = z
  .object({
    equals: z.boolean().optional(),
    not: z.lazy(() => BooleanFilterSchema).optional(),
  })
  .describe('Filter for Boolean fields.');

export const JsonFilterSchema: z.ZodType = z
  .object({
    // Prisma JSON filters can be complex: equals, path, string_contains, etc.
    // For AI, a simpler approach might be needed or allow raw JSON for `equals`.
    equals: z.any().optional().describe('Exact match for a JSON value.'),
    // More specific JSON path queries could be added if essential for AI.
    // path: z.array(z.string()).optional(),
    // string_contains: z.string().optional(), // Example for specific JSON ops
    not: z.any().optional(),
  })
  .describe(
    'Filter for JSON fields. For complex JSON path queries, direct Prisma syntax might be necessary if this simplified version is insufficient.',
  );

// ===== ENTITY TYPE DEFINITIONS =====

/**
 * Base entity types that can be queried (matching Prisma model names)
 *
 *  ENTITY-TO-MODEL MAPPING:
 * - 'task' → Task (main task entity)
 * - 'taskDescription' → TaskDescription (detailed task specifications)
 * - 'implementationPlan' → ImplementationPlan (technical implementation plans)
 * - 'subtask' → Subtask (granular work items within implementation plans)
 * - 'researchReport' → ResearchReport (research findings and recommendations)
 * - 'codeReviewReport' → CodeReview (code quality assessments)
 * - 'completionReport' → CompletionReport (task completion summaries)
 * - 'comment' → Comment (notes and communications)
 * - 'delegation' → DelegationRecord (role transition tracking)
 * - 'workflowTransition' → WorkflowTransition (workflow state changes)
 */
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

// Forward-declare schema variables. These will be assigned the result of builder functions.
// If assigned once, they can be const. The z.lazy calls within entityShapeDefinitions handle recursion.
const TaskWhereInputSchema: z.ZodTypeAny = z.lazy(() =>
  buildWhereInputSchema('task'),
);
const TaskDescriptionWhereInputSchema: z.ZodTypeAny = z.lazy(() =>
  buildWhereInputSchema('taskDescription'),
);
const ImplementationPlanWhereInputSchema: z.ZodTypeAny = z.lazy(() =>
  buildWhereInputSchema('implementationPlan'),
);
const SubtaskWhereInputSchema: z.ZodTypeAny = z.lazy(() =>
  buildWhereInputSchema('subtask'),
);
const ResearchReportWhereInputSchema: z.ZodTypeAny = z.lazy(() =>
  buildWhereInputSchema('researchReport'),
);
const CodeReviewWhereInputSchema: z.ZodTypeAny = z.lazy(() =>
  buildWhereInputSchema('codeReviewReport'),
);
const CompletionReportWhereInputSchema: z.ZodTypeAny = z.lazy(() =>
  buildWhereInputSchema('completionReport'),
);
const CommentWhereInputSchema: z.ZodTypeAny = z.lazy(() =>
  buildWhereInputSchema('comment'),
);
const DelegationRecordWhereInputSchema: z.ZodTypeAny = z.lazy(() =>
  buildWhereInputSchema('delegation'),
);
const WorkflowTransitionWhereInputSchema: z.ZodTypeAny = z.lazy(() =>
  buildWhereInputSchema('workflowTransition'),
);

const ImplementationPlanListRelationFilterSchema: z.ZodTypeAny = z.lazy(() =>
  buildListRelationFilterSchema(ImplementationPlanWhereInputSchema),
);
const SubtaskListRelationFilterSchema: z.ZodTypeAny = z.lazy(() =>
  buildListRelationFilterSchema(SubtaskWhereInputSchema),
);
const DelegationRecordListRelationFilterSchema: z.ZodTypeAny = z.lazy(() =>
  buildListRelationFilterSchema(DelegationRecordWhereInputSchema),
);
const ResearchReportListRelationFilterSchema: z.ZodTypeAny = z.lazy(() =>
  buildListRelationFilterSchema(ResearchReportWhereInputSchema),
);
const CodeReviewListRelationFilterSchema: z.ZodTypeAny = z.lazy(() =>
  buildListRelationFilterSchema(CodeReviewWhereInputSchema),
);
const CompletionReportListRelationFilterSchema: z.ZodTypeAny = z.lazy(() =>
  buildListRelationFilterSchema(CompletionReportWhereInputSchema),
);
const CommentListRelationFilterSchema: z.ZodTypeAny = z.lazy(() =>
  buildListRelationFilterSchema(CommentWhereInputSchema),
);
const WorkflowTransitionListRelationFilterSchema: z.ZodTypeAny = z.lazy(() =>
  buildListRelationFilterSchema(WorkflowTransitionWhereInputSchema),
);

const entityShapeDefinitions: Record<string, Record<string, z.ZodTypeAny>> = {
  task: {
    taskId: StringFilterSchema,
    name: StringFilterSchema,
    status: StringFilterSchema,
    creationDate: DateTimeFilterSchema,
    completionDate: DateTimeFilterSchema.nullable().optional(),
    owner: StringFilterSchema.nullable().optional(),
    currentMode: StringFilterSchema.nullable().optional(),
    priority: StringFilterSchema.nullable().optional(),
    dependencies: JsonFilterSchema.nullable().optional(),
    redelegationCount: IntFilterSchema,
    gitBranch: StringFilterSchema.nullable().optional(),
    taskDescription: z.lazy(() => TaskDescriptionWhereInputSchema).optional(),
    implementationPlans: z
      .lazy(() => ImplementationPlanListRelationFilterSchema)
      .optional(),
    subtasks: z.lazy(() => SubtaskListRelationFilterSchema).optional(),
    delegationRecords: z
      .lazy(() => DelegationRecordListRelationFilterSchema)
      .optional(),
    researchReports: z
      .lazy(() => ResearchReportListRelationFilterSchema)
      .optional(),
    codeReviews: z.lazy(() => CodeReviewListRelationFilterSchema).optional(),
    completionReports: z
      .lazy(() => CompletionReportListRelationFilterSchema)
      .optional(),
    comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
    workflowTransitions: z
      .lazy(() => WorkflowTransitionListRelationFilterSchema)
      .optional(),
  },
  taskDescription: {
    taskId: StringFilterSchema,
    description: StringFilterSchema,
    businessRequirements: StringFilterSchema,
    technicalRequirements: StringFilterSchema,
    acceptanceCriteria: JsonFilterSchema,
    createdAt: DateTimeFilterSchema,
    updatedAt: DateTimeFilterSchema,
    task: z.lazy(() => TaskWhereInputSchema).optional(),
  },
  implementationPlan: {
    id: IntFilterSchema,
    taskId: StringFilterSchema,
    overview: StringFilterSchema,
    approach: StringFilterSchema,
    technicalDecisions: StringFilterSchema,
    filesToModify: JsonFilterSchema,
    createdAt: DateTimeFilterSchema,
    updatedAt: DateTimeFilterSchema,
    createdBy: StringFilterSchema,
    task: z.lazy(() => TaskWhereInputSchema).optional(),
    subtasks: z.lazy(() => SubtaskListRelationFilterSchema).optional(),
  },
  subtask: {
    id: IntFilterSchema,
    taskId: StringFilterSchema,
    planId: IntFilterSchema,
    name: StringFilterSchema,
    description: StringFilterSchema,
    sequenceNumber: IntFilterSchema,
    status: StringFilterSchema,
    assignedTo: StringFilterSchema.nullable().optional(),
    estimatedDuration: StringFilterSchema.nullable().optional(),
    startedAt: DateTimeFilterSchema.nullable().optional(),
    completedAt: DateTimeFilterSchema.nullable().optional(),
    batchId: StringFilterSchema.nullable().optional(),
    batchTitle: StringFilterSchema.nullable().optional(),
    task: z.lazy(() => TaskWhereInputSchema).optional(),
    plan: z.lazy(() => ImplementationPlanWhereInputSchema).optional(),
    delegationRecords: z
      .lazy(() => DelegationRecordListRelationFilterSchema)
      .optional(),
    comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  },
  researchReport: {
    id: IntFilterSchema,
    taskId: StringFilterSchema,
    title: StringFilterSchema,
    summary: StringFilterSchema,
    findings: StringFilterSchema,
    recommendations: StringFilterSchema,
    references: JsonFilterSchema,
    createdAt: DateTimeFilterSchema,
    updatedAt: DateTimeFilterSchema,
    task: z.lazy(() => TaskWhereInputSchema).optional(),
  },
  codeReviewReport: {
    id: IntFilterSchema,
    taskId: StringFilterSchema,
    status: StringFilterSchema,
    summary: StringFilterSchema,
    strengths: StringFilterSchema,
    issues: StringFilterSchema,
    acceptanceCriteriaVerification: JsonFilterSchema,
    manualTestingResults: StringFilterSchema,
    requiredChanges: StringFilterSchema.nullable().optional(),
    createdAt: DateTimeFilterSchema,
    updatedAt: DateTimeFilterSchema,
    task: z.lazy(() => TaskWhereInputSchema).optional(),
  },
  completionReport: {
    id: IntFilterSchema,
    taskId: StringFilterSchema,
    summary: StringFilterSchema,
    filesModified: JsonFilterSchema,
    delegationSummary: StringFilterSchema,
    acceptanceCriteriaVerification: JsonFilterSchema,
    createdAt: DateTimeFilterSchema,
    task: z.lazy(() => TaskWhereInputSchema).optional(),
  },
  comment: {
    id: IntFilterSchema,
    taskId: StringFilterSchema,
    subtaskId: IntFilterSchema.nullable().optional(),
    mode: StringFilterSchema,
    content: StringFilterSchema,
    createdAt: DateTimeFilterSchema,
    task: z.lazy(() => TaskWhereInputSchema).optional(),
    subtask: z.lazy(() => SubtaskWhereInputSchema).optional(),
  },
  delegation: {
    id: IntFilterSchema,
    taskId: StringFilterSchema,
    subtaskId: IntFilterSchema.nullable().optional(),
    fromMode: StringFilterSchema,
    toMode: StringFilterSchema,
    delegationTimestamp: DateTimeFilterSchema,
    completionTimestamp: DateTimeFilterSchema.nullable().optional(),
    success: BooleanFilterSchema.nullable().optional(),
    rejectionReason: StringFilterSchema.nullable().optional(),
    redelegationCount: IntFilterSchema,
    task: z.lazy(() => TaskWhereInputSchema).optional(),
    subtask: z.lazy(() => SubtaskWhereInputSchema).optional(),
  },
  workflowTransition: {
    id: IntFilterSchema,
    taskId: StringFilterSchema,
    fromMode: StringFilterSchema,
    toMode: StringFilterSchema,
    transitionTimestamp: DateTimeFilterSchema,
    reason: StringFilterSchema.nullable().optional(),
    task: z.lazy(() => TaskWhereInputSchema).optional(),
  },
};

function buildWhereInputSchema(
  entityName: keyof typeof entityShapeDefinitions,
): z.ZodObject<any> {
  const fields = entityShapeDefinitions[entityName];
  const shape: Record<string, z.ZodTypeAny> = { ...fields };
  shape.AND = z
    .array(z.lazy(() => buildWhereInputSchema(entityName)))
    .optional();
  shape.OR = z
    .array(z.lazy(() => buildWhereInputSchema(entityName)))
    .optional();
  shape.NOT = z.lazy(() => buildWhereInputSchema(entityName)).optional();
  return z.object(shape).describe(`WhereInput for ${entityName}`);
}

function buildListRelationFilterSchema(
  relatedWhereSchema: z.ZodTypeAny,
): z.ZodObject<any> {
  return z.object({
    some: relatedWhereSchema.optional(),
    every: relatedWhereSchema.optional(),
    none: relatedWhereSchema.optional(),
  });
}

export const WhereConditionSchema = z
  .record(z.string(), z.any())
  .optional()
  .describe(
    `PRISMA WHERE CONDITIONS - This is an object used to specify filtering conditions.
The structure of this object MUST align with the fields and relationships of the 'entity' you select for your query.

Key-value pairs represent field conditions. For example: { name: "My Task" }
Nested objects are used for specific filter operations: { name: { contains: "API" } }

Supported logical operators (case-sensitive):
- AND: Takes an array of condition objects. All must be true. Example: { AND: [{ status: "active" }, { priority: "High" }] }
- OR: Takes an array of condition objects. At least one must be true. Example: { OR: [{ owner: "Alice" }, { owner: "Bob" }] }
- NOT: Takes a single condition object to negate. Example: { NOT: { status: "archived" } }

Filtering on related records (relationships):
- To-one relations: Directly nest conditions. Example: { taskDescription: { acceptanceCriteria: { contains: "user login" } } }
- To-many relations (e.g., lists of subtasks, comments): Use 'some', 'every', or 'none'.
    - { some: { field: "value" } }: At least one related record matches.
    - { every: { field: "value" } }: All related records match.
    - { none: { field: "value" } }: No related records match.
Example for a Task with ImplementationPlans: { implementationPlans: { some: { createdBy: { equals: "architect" }, approach: { contains: "microservices" } } } }

Full Example for a 'task' entity:
{
  "AND": [
    { "status": { "equals": "completed" } },
    { "priority": { "in": ["High", "Critical"] } }
  ],
  "NOT": { "owner": { "equals": "system_user" } },
  "implementationPlans": {
    "some": {
      "createdBy": { "equals": "architect" },
      "technicalDecisions": { "contains": "TypeScript" }
    }
  },
  "comments": { "none": { "mode": { "equals": "internal_note" } } }
}`,
  );

const selectArgs: Record<string, z.ZodTypeAny> = {};
const includeArgs: Record<string, z.ZodTypeAny> = {};

function getRelatedEntityName(
  _parentEntity: keyof typeof entityShapeDefinitions,
  relationFieldName: string,
): keyof typeof entityShapeDefinitions | null {
  // This mapping needs to be very robust and accurate according to your Prisma schema
  // This is a highly simplified example
  if (relationFieldName === 'task') return 'task';
  if (relationFieldName === 'taskDescription') return 'taskDescription';
  if (relationFieldName === 'implementationPlans') return 'implementationPlan';
  if (relationFieldName === 'subtasks') return 'subtask';
  if (relationFieldName === 'plan') return 'implementationPlan';
  if (relationFieldName === 'comments') return 'comment';
  if (relationFieldName === 'delegationRecords') return 'delegation';
  // ... add all other direct relation mappings ...
  return null;
}

Object.keys(entityShapeDefinitions).forEach((entityNameKey) => {
  const entityName = entityNameKey; // Correctly cast string key
  const fields = entityShapeDefinitions[entityName];
  const currentSelectShape: Record<string, z.ZodTypeAny> = {};
  const currentIncludeShape: Record<string, z.ZodTypeAny> = {};

  for (const fieldName in fields) {
    currentSelectShape[fieldName] = z.boolean().optional();
    const relatedEntityKey = getRelatedEntityName(entityName, fieldName);
    if (relatedEntityKey) {
      currentIncludeShape[fieldName] = z
        .union([
          z.boolean(),
          z
            .object({
              select: z.lazy(() => selectArgs[relatedEntityKey]).optional(),
              include: z.lazy(() => includeArgs[relatedEntityKey]).optional(),
              where: WhereConditionSchema,
              orderBy: z.lazy(() => OrderBySchema).optional(),
              take: z.number().int().optional(),
              skip: z.number().int().optional(),
              cursor: WhereConditionSchema,
            })
            .passthrough(),
        ])
        .optional();
      currentSelectShape[fieldName] = z
        .union([
          z.boolean(),
          z.object({ select: z.lazy(() => selectArgs[relatedEntityKey]) }),
        ])
        .optional();
    } else {
      currentIncludeShape[fieldName] = z.boolean().optional();
    }
  }
  selectArgs[entityName] = z
    .object(currentSelectShape)
    .describe(`Select fields for ${entityName}`);
  includeArgs[entityName] = z
    .object(currentIncludeShape)
    .describe(`Include relations for ${entityName}`);
});

export const IncludeSelectSchema = z
  .record(z.string(), z.any())
  .optional()
  .describe(
    `PRISMA INCLUDE/SELECT - Object to specify included relations and selected fields.

The structure MUST match the relations of the 'entity' chosen for the query.

Keys are relation names. Value can be 'true' to include, or an object for further options like { select: { field: true }, include: { nestedRelation: true }, where: { ... }, orderBy: ..., take: ..., skip: ... }.

Example for Task: { taskDescription: true, implementationPlans: { include: { subtasks: { select: { name: true } } } } }`,
  );

export const OrderBySchema = z
  .record(z.enum(['asc', 'desc']))
  .describe(
    'PRISMA ORDER_BY - Specify sort order for results.\n' +
      'Example: { creationDate: "desc", name: "asc" }',
  );

export const PaginationSchema = z
  .object({
    skip: z.number().int().optional().describe('Number of records to skip.'),
    take: z.number().int().optional().describe('Number of records to take.'),
    cursor: z
      .record(z.any())
      .optional()
      .describe(
        'Cursor for pagination (usually a unique field like { id: ... } or { taskId: ... }). Its structure must match a unique where condition for the entity.',
      ),
  })
  .describe('Pagination options: skip, take, cursor.');

export const AggregationOperationSchema = z.enum([
  '_count',
  '_avg',
  '_sum',
  '_min',
  '_max',
]);

export const AggregationFieldSelectionSchema = z.record(z.boolean());

export const AggregationInputSchema = z
  .object({
    by: z
      .array(z.string())
      .optional()
      .describe('Fields to group by (for groupBy aggregations).'),
    _count: AggregationFieldSelectionSchema.optional().describe(
      'Count records or specific fields.',
    ),
    _avg: AggregationFieldSelectionSchema.optional().describe(
      'Average of numeric fields.',
    ),
    _sum: AggregationFieldSelectionSchema.optional().describe(
      'Sum of numeric fields.',
    ),
    _min: AggregationFieldSelectionSchema.optional().describe(
      'Minimum of fields.',
    ),
    _max: AggregationFieldSelectionSchema.optional().describe(
      'Maximum of fields.',
    ),
    having: z
      .lazy(() => WhereConditionSchema)
      .optional()
      .describe('Filter groups after aggregation (similar to SQL HAVING).'),
  })
  .describe(
    'PRISMA AGGREGATIONS - Perform aggregate operations like count, sum, avg, min, max. Can also group by fields.\n' +
      'Example for counting all tasks: { _count: { _all: true } }\n' +
      'Example for averaging task redelegationCount: { _avg: { redelegationCount: true } }\n' +
      'Example for counting tasks grouped by status: { by: ["status"], _count: { status: true } }',
  );

export const UniversalQuerySchema = z
  .object({
    entity: EntityTypeSchema.describe(
      'The type of entity to query. This determines the available fields and relations for filtering, including, and selecting.',
    ),
    where: WhereConditionSchema.optional().describe(
      "Filtering conditions, structured according to the selected 'entity'. See WhereConditionSchema for details.",
    ),
    include: IncludeSelectSchema,
    select: z
      .record(z.string(), z.boolean())
      .optional()
      .describe(
        `PRISMA SELECT - Object to specify which fields of the current entity to return. 
Keys are field names, values are 'true'. If 'select' is used, only specified fields are returned. 
Typically, use nested 'select' within 'include' for selecting fields from related entities. 
Example for top-level entity: { name: true, status: true }`,
      ),
    orderBy: z.union([OrderBySchema, z.array(OrderBySchema)]).optional(),
    distinct: z.array(z.string()).optional(),
    pagination: PaginationSchema.optional(),
    aggregation: AggregationInputSchema.optional(),
    format: z.enum(['full', 'summary', 'ids']).optional(),
    explain: z.boolean().optional(),
  })
  .describe(
    'Universal Query tool using Prisma-like filtering, inclusion, selection, ordering, pagination, and aggregation.',
  );

export type UniversalQueryInput = z.infer<typeof UniversalQuerySchema>;

// The descriptions for fields and schemas are critical for the AI to understand how to use them.
// The more examples and clear explanations in `.describe()`, the better.

// Example of a fully typed task "where" input if we were to use it directly (conceptual)
/*
export const TaskWhereInputExplicitSchema = z.object({
  AND: z.array(z.lazy(() => TaskWhereInputExplicitSchema)).optional(),
  OR: z.array(z.lazy(() => TaskWhereInputExplicitSchema)).optional(),
  NOT: z.lazy(() => TaskWhereInputExplicitSchema).optional(),
  taskId: StringFilterSchema.optional(),
  name: StringFilterSchema.optional(),
  status: StringFilterSchema.optional(), // Could be z.enum for specific statuses
  creationDate: DateTimeFilterSchema.optional(),
  completionDate: DateTimeFilterSchema.optional().nullable(),
  owner: StringFilterSchema.optional().nullable(),
  currentMode: StringFilterSchema.optional().nullable(), // Could be z.enum for modes
  priority: StringFilterSchema.optional().nullable(),   // Could be z.enum for priorities
  dependencies: JsonFilterSchema.optional().nullable(),
  redelegationCount: IntFilterSchema.optional(),
  gitBranch: StringFilterSchema.optional().nullable(),

  // Relations
  taskDescription: z.lazy(() => TaskDescriptionWhereInputSchema).optional(), // Assuming TaskDescriptionWhereInputSchema is defined
  implementationPlans: z.lazy(() => ImplementationPlanListRelationFilterSchema).optional(), // Assuming ...ListRelationFilterSchema is defined
  // ... other relations
});
*/

// NOTE: The generation of schemas is complex. The `getRelatedEntityName` and the logic for constructing
// `selectArgs` and `includeArgs` are crucial and need to be robust and accurately reflect your Prisma schema relations.
// The use of z.lazy() is essential for handling mutual recursion between these schemas.
// The `select` field in UniversalQuerySchema has a complex lazy union; this part is tricky to get right
// for full type safety and AI model compatibility.
