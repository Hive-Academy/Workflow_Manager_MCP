import { z } from 'zod';

/**
 * Universal Query Schema - Leverages Prisma's full filtering capabilities
 * Replaces 15+ individual query tools with one powerful, flexible tool
 *
 * 🎯 COMPLETE ENTITY REFERENCE:
 * This schema provides access to all 10 core entities with full field specifications,
 * relationship mappings, and practical examples for efficient agent usage.
 */

// ===== ENTITY TYPE DEFINITIONS =====

/**
 * Base entity types that can be queried (matching Prisma model names)
 *
 * 📋 ENTITY-TO-MODEL MAPPING:
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

// ===== FIELD SPECIFICATIONS BY ENTITY =====

/**
 * 📊 COMPLETE FIELD REFERENCE FOR ALL ENTITIES
 *
 * 🔹 TASK ENTITY FIELDS:
 * - taskId: String (Primary Key) - Unique task identifier (e.g., "TSK-001")
 * - name: String - Human-readable task name
 * - status: String - Current status ("not-started", "in-progress", "needs-review", "completed", "needs-changes", "paused", "cancelled")
 * - creationDate: DateTime - When task was created
 * - completionDate: DateTime? - When task was completed (nullable)
 * - owner: String? - Current task owner (nullable)
 * - currentMode: String? - Current workflow role ("boomerang", "researcher", "architect", "senior-developer", "code-review")
 * - priority: String? - Task priority ("Low", "Medium", "High", "Critical")
 * - dependencies: Json? - Array of dependent task IDs
 * - redelegationCount: Int - Number of times task has been redelegated
 * - gitBranch: String? - Associated Git branch name
 *
 * 🔹 TASK DESCRIPTION ENTITY FIELDS:
 * - taskId: String (Primary Key, Foreign Key) - Links to Task.taskId
 * - description: String - Detailed task description
 * - businessRequirements: String - Business context and requirements
 * - technicalRequirements: String - Technical specifications and constraints
 * - acceptanceCriteria: Json - Array of acceptance criteria strings
 * - createdAt: DateTime - Creation timestamp
 * - updatedAt: DateTime - Last update timestamp
 *
 * 🔹 IMPLEMENTATION PLAN ENTITY FIELDS:
 * - id: Int (Primary Key, Auto-increment) - Unique plan identifier
 * - taskId: String (Foreign Key) - Links to Task.taskId
 * - overview: String - High-level implementation summary
 * - approach: String - Technical approach and methodology
 * - technicalDecisions: String - Key architectural decisions
 * - filesToModify: Json - Array of file paths to be modified
 * - createdAt: DateTime - Creation timestamp
 * - updatedAt: DateTime - Last update timestamp
 * - createdBy: String - Role that created the plan
 *
 * 🔹 SUBTASK ENTITY FIELDS:
 * - id: Int (Primary Key, Auto-increment) - Unique subtask identifier
 * - taskId: String (Foreign Key) - Links to Task.taskId
 * - planId: Int (Foreign Key) - Links to ImplementationPlan.id
 * - name: String - Subtask name
 * - description: String - Detailed subtask description
 * - sequenceNumber: Int - Order within implementation plan
 * - status: String - Subtask status ("not-started", "in-progress", "completed")
 * - assignedTo: String? - Assigned role (nullable)
 * - estimatedDuration: String? - Estimated time to complete
 * - startedAt: DateTime? - When subtask was started
 * - completedAt: DateTime? - When subtask was completed
 * - batchId: String? - Batch identifier for grouping
 * - batchTitle: String? - Human-readable batch name
 *
 * 🔹 RESEARCH REPORT ENTITY FIELDS:
 * - id: Int (Primary Key, Auto-increment) - Unique report identifier
 * - taskId: String (Foreign Key) - Links to Task.taskId
 * - title: String - Report title
 * - summary: String - Executive summary
 * - findings: String - Detailed research findings
 * - recommendations: String - Actionable recommendations
 * - references: Json - Array of source references
 * - createdAt: DateTime - Creation timestamp
 * - updatedAt: DateTime - Last update timestamp
 *
 * 🔹 CODE REVIEW REPORT ENTITY FIELDS (CodeReview model):
 * - id: Int (Primary Key, Auto-increment) - Unique review identifier
 * - taskId: String (Foreign Key) - Links to Task.taskId
 * - status: String - Review status ("APPROVED", "APPROVED_WITH_RESERVATIONS", "NEEDS_CHANGES")
 * - summary: String - Overall review summary
 * - strengths: String - Code strengths identified
 * - issues: String - Issues and concerns found
 * - acceptanceCriteriaVerification: Json - Verification results
 * - manualTestingResults: String - Manual testing outcomes
 * - requiredChanges: String? - Specific changes needed (nullable)
 * - createdAt: DateTime - Creation timestamp
 * - updatedAt: DateTime - Last update timestamp
 *
 * 🔹 COMPLETION REPORT ENTITY FIELDS:
 * - id: Int (Primary Key, Auto-increment) - Unique completion identifier
 * - taskId: String (Foreign Key) - Links to Task.taskId
 * - summary: String - Completion summary
 * - filesModified: Json - Array of modified file paths
 * - delegationSummary: String - Workflow delegation summary
 * - acceptanceCriteriaVerification: Json - Final verification results
 * - createdAt: DateTime - Creation timestamp
 *
 * 🔹 COMMENT ENTITY FIELDS:
 * - id: Int (Primary Key, Auto-increment) - Unique comment identifier
 * - taskId: String (Foreign Key) - Links to Task.taskId
 * - subtaskId: Int? (Foreign Key) - Links to Subtask.id (nullable)
 * - mode: String - Role that created comment
 * - content: String - Comment content
 * - createdAt: DateTime - Creation timestamp
 *
 * 🔹 DELEGATION ENTITY FIELDS (DelegationRecord model):
 * - id: Int (Primary Key, Auto-increment) - Unique delegation identifier
 * - taskId: String (Foreign Key) - Links to Task.taskId
 * - subtaskId: Int? (Foreign Key) - Links to Subtask.id (nullable)
 * - fromMode: String - Source role
 * - toMode: String - Target role
 * - delegationTimestamp: DateTime - When delegation occurred
 * - completionTimestamp: DateTime? - When delegation completed (nullable)
 * - success: Boolean? - Whether delegation succeeded (nullable)
 * - rejectionReason: String? - Reason for rejection (nullable)
 * - redelegationCount: Int - Number of redelegations
 *
 * 🔹 WORKFLOW TRANSITION ENTITY FIELDS:
 * - id: Int (Primary Key, Auto-increment) - Unique transition identifier
 * - taskId: String (Foreign Key) - Links to Task.taskId
 * - fromMode: String - Previous workflow mode
 * - toMode: String - New workflow mode
 * - transitionTimestamp: DateTime - When transition occurred
 * - reason: String? - Reason for transition (nullable)
 */

// ===== RELATIONSHIP SPECIFICATIONS =====

/**
 * 🔗 COMPLETE RELATIONSHIP MAPPING
 *
 * 📋 TASK RELATIONSHIPS:
 * - taskDescription: TaskDescription? (One-to-One, optional)
 * - implementationPlans: ImplementationPlan[] (One-to-Many)
 * - subtasks: Subtask[] (One-to-Many)
 * - delegationRecords: DelegationRecord[] (One-to-Many)
 * - researchReports: ResearchReport[] (One-to-Many)
 * - codeReviews: CodeReview[] (One-to-Many)
 * - completionReports: CompletionReport[] (One-to-Many)
 * - comments: Comment[] (One-to-Many)
 * - workflowTransitions: WorkflowTransition[] (One-to-Many)
 *
 * 📋 IMPLEMENTATION PLAN RELATIONSHIPS:
 * - task: Task (Many-to-One, required)
 * - subtasks: Subtask[] (One-to-Many)
 *
 * 📋 SUBTASK RELATIONSHIPS:
 * - task: Task (Many-to-One, required)
 * - plan: ImplementationPlan (Many-to-One, required)
 * - delegationRecords: DelegationRecord[] (One-to-Many)
 * - comments: Comment[] (One-to-Many)
 *
 * 📋 ALL OTHER ENTITIES:
 * - task: Task (Many-to-One, required) - All reports, comments, etc. link to tasks
 * - subtask: Subtask? (Many-to-One, optional) - Comments and delegations can link to subtasks
 */

// Prisma-style where conditions with comprehensive operator support
export const WhereConditionSchema = z
  .record(z.any())
  .describe(
    '🔍 PRISMA WHERE CONDITIONS - Complete filtering capabilities:\n\n' +
      '📊 BASIC OPERATORS:\n' +
      '- equals: { status: "completed" }\n' +
      '- not: { status: { not: "cancelled" } }\n' +
      '- in: { priority: { in: ["High", "Critical"] } }\n' +
      '- notIn: { status: { notIn: ["cancelled", "paused"] } }\n\n' +
      '📊 STRING OPERATORS:\n' +
      '- contains: { name: { contains: "API" } }\n' +
      '- startsWith: { taskId: { startsWith: "TSK-" } }\n' +
      '- endsWith: { name: { endsWith: "service" } }\n' +
      '- mode: { name: { contains: "test", mode: "insensitive" } }\n\n' +
      '📊 NUMERIC/DATE OPERATORS:\n' +
      '- gt: { redelegationCount: { gt: 0 } }\n' +
      '- gte: { creationDate: { gte: "2024-01-01" } }\n' +
      '- lt: { completionDate: { lt: "2024-12-31" } }\n' +
      '- lte: { estimatedDuration: { lte: 60 } }\n\n' +
      '📊 NULL CHECKS:\n' +
      '- isNull: { completionDate: null }\n' +
      '- isNotNull: { owner: { not: null } }\n\n' +
      '📊 LOGICAL OPERATORS:\n' +
      '- AND: { AND: [{ status: "completed" }, { priority: "High" }] }\n' +
      '- OR: { OR: [{ status: "completed" }, { status: "in-progress" }] }\n' +
      '- NOT: { NOT: { status: "cancelled" } }\n\n' +
      '📊 RELATIONSHIP FILTERING:\n' +
      '- taskDescription: { taskDescription: { description: { contains: "API" } } }\n' +
      '- implementationPlans: { implementationPlans: { some: { createdBy: "architect" } } }\n' +
      '- subtasks: { subtasks: { every: { status: "completed" } } }\n' +
      '- comments: { comments: { none: { mode: "error" } } }',
  );

// Prisma-style include/select with comprehensive relationship examples
export const IncludeSelectSchema = z
  .record(z.any())
  .describe(
    '🔗 PRISMA INCLUDE/SELECT - Complete relationship access:\n\n' +
      '📋 BASIC INCLUDES:\n' +
      '- { taskDescription: true } - Include task description\n' +
      '- { implementationPlans: true } - Include all implementation plans\n' +
      '- { subtasks: true } - Include all subtasks\n' +
      '- { comments: true } - Include all comments\n\n' +
      '📋 NESTED INCLUDES:\n' +
      '- { implementationPlans: { include: { subtasks: true } } }\n' +
      '- { subtasks: { include: { comments: true, delegationRecords: true } } }\n' +
      '- { task: { include: { taskDescription: true, implementationPlans: true } } }\n\n' +
      '📋 FILTERED INCLUDES:\n' +
      '- { comments: { where: { mode: "architect" }, orderBy: { createdAt: "desc" } } }\n' +
      '- { subtasks: { where: { status: "completed" }, take: 10 } }\n' +
      '- { delegationRecords: { where: { success: true }, orderBy: { delegationTimestamp: "desc" } } }\n\n' +
      '📋 SELECT SPECIFIC FIELDS:\n' +
      '- { id: true, name: true, status: true } - Only these fields\n' +
      '- { task: { select: { taskId: true, name: true, status: true } } }\n' +
      '- { taskDescription: { select: { description: true, acceptanceCriteria: true } } }\n\n' +
      '📋 COMPLEX COMBINATIONS:\n' +
      '- { taskDescription: true, implementationPlans: { include: { subtasks: { where: { status: "completed" } } } }, comments: { take: 5, orderBy: { createdAt: "desc" } } }',
  );

// Prisma-style orderBy with multiple field support
export const OrderBySchema = z
  .record(z.enum(['asc', 'desc']))
  .describe(
    '📊 PRISMA ORDER BY - Complete sorting capabilities:\n\n' +
      '📋 SINGLE FIELD SORTING:\n' +
      '- { createdAt: "desc" } - Newest first\n' +
      '- { name: "asc" } - Alphabetical order\n' +
      '- { priority: "desc" } - High priority first\n' +
      '- { status: "asc" } - Status alphabetical\n\n' +
      '📋 MULTI-FIELD SORTING:\n' +
      '- { priority: "desc", createdAt: "desc" } - Priority first, then newest\n' +
      '- { status: "asc", name: "asc" } - Status then name\n' +
      '- { completionDate: "desc", redelegationCount: "asc" }\n\n' +
      '📋 RELATIONSHIP SORTING:\n' +
      '- { task: { createdAt: "desc" } } - Sort by related task creation\n' +
      '- { plan: { createdAt: "asc" } } - Sort by implementation plan creation',
  );

// Pagination options with cursor support
export const PaginationSchema = z.object({
  skip: z
    .number()
    .optional()
    .describe('Number of records to skip (offset-based pagination)'),
  take: z
    .number()
    .max(1000)
    .optional()
    .describe('Number of records to take (max 1000 for performance)'),
  cursor: z
    .record(z.any())
    .optional()
    .describe(
      'Cursor-based pagination for efficient large dataset traversal:\n' +
        '- { id: 123 } - Start after record with id 123\n' +
        '- { taskId: "TSK-005" } - Start after task TSK-005\n' +
        '- { createdAt: "2024-01-15T10:00:00Z" } - Start after specific timestamp',
    ),
});

// Aggregation options with grouping support
export const AggregationSchema = z.object({
  count: z.boolean().optional().describe('Include total count of records'),
  sum: z
    .record(z.boolean())
    .optional()
    .describe(
      'Sum specific numeric fields:\n' +
        '- { redelegationCount: true } - Total redelegations\n' +
        '- { estimatedDuration: true } - Total estimated time',
    ),
  avg: z
    .record(z.boolean())
    .optional()
    .describe(
      'Average specific numeric fields:\n' +
        '- { redelegationCount: true } - Average redelegations per task\n' +
        '- { estimatedDuration: true } - Average task duration',
    ),
  min: z
    .record(z.boolean())
    .optional()
    .describe(
      'Minimum values:\n' +
        '- { createdAt: true } - Earliest creation date\n' +
        '- { redelegationCount: true } - Minimum redelegations',
    ),
  max: z
    .record(z.boolean())
    .optional()
    .describe(
      'Maximum values:\n' +
        '- { completionDate: true } - Latest completion date\n' +
        '- { redelegationCount: true } - Maximum redelegations',
    ),
  groupBy: z
    .array(z.string())
    .optional()
    .describe(
      'Group by specific fields for analytics:\n' +
        '- ["status"] - Group by task status\n' +
        '- ["priority", "status"] - Group by priority and status\n' +
        '- ["currentMode"] - Group by workflow mode\n' +
        '- ["createdBy"] - Group by creator role',
    ),
});

export const UniversalQuerySchema = z.object({
  entity: EntityTypeSchema.describe('The entity type to query'),

  where: WhereConditionSchema.optional().describe(
    '🔍 PRISMA WHERE CONDITIONS - Powerful filtering with all operators:\n\n' +
      '📊 COMMON PATTERNS:\n' +
      '- { status: "in-progress" } - Tasks currently being worked on\n' +
      '- { createdAt: { gte: "2024-01-01" } } - Tasks created this year\n' +
      '- { name: { contains: "test" } } - Tasks with "test" in name\n' +
      '- { AND: [{ status: "completed" }, { priority: "High" }] } - Completed high-priority tasks\n' +
      '- { OR: [{ status: "completed" }, { status: "in-progress" }] } - Active or completed tasks\n' +
      '- { taskDescription: { acceptanceCriteria: { not: null } } } - Tasks with acceptance criteria\n' +
      '- { implementationPlans: { some: { createdBy: "architect" } } } - Tasks with architect plans\n' +
      '- { subtasks: { every: { status: "completed" } } } - Tasks with all subtasks complete\n' +
      '- { comments: { none: { mode: "error" } } } - Tasks without error comments\n\n' +
      '📊 ADVANCED FILTERING:\n' +
      '- { redelegationCount: { gt: 0 } } - Tasks that have been redelegated\n' +
      '- { completionDate: null } - Incomplete tasks\n' +
      '- { priority: { in: ["High", "Critical"] } } - High-priority tasks only\n' +
      '- { currentMode: { not: null } } - Tasks currently assigned to a role',
  ),

  include: IncludeSelectSchema.optional().describe(
    '🔗 PRISMA INCLUDE - Specify related data to include:\n\n' +
      '📋 ESSENTIAL INCLUDES:\n' +
      '- { taskDescription: true } - Include detailed task specifications\n' +
      '- { implementationPlans: { include: { subtasks: true } } } - Plans with subtasks\n' +
      '- { comments: { orderBy: { createdAt: "desc" }, take: 10 } } - Recent comments\n' +
      '- { delegationRecords: { orderBy: { delegationTimestamp: "desc" } } } - Delegation history\n\n' +
      '📋 COMPREHENSIVE CONTEXT:\n' +
      '- { taskDescription: true, implementationPlans: { include: { subtasks: true } }, researchReports: true, codeReviews: true, completionReports: true } - Full task context\n\n' +
      '📋 FILTERED RELATIONSHIPS:\n' +
      '- { subtasks: { where: { status: "completed" }, include: { comments: true } } } - Completed subtasks with comments\n' +
      '- { implementationPlans: { where: { createdBy: "architect" }, include: { subtasks: { where: { status: "in-progress" } } } } } - Architect plans with active subtasks',
  ),

  select: IncludeSelectSchema.optional().describe(
    '🎯 PRISMA SELECT - Specify exact fields to return for performance:\n\n' +
      '📋 BASIC SELECTION:\n' +
      '- { id: true, name: true, status: true } - Essential fields only\n' +
      '- { taskId: true, name: true, currentMode: true, priority: true } - Task overview\n\n' +
      '📋 RELATIONSHIP SELECTION:\n' +
      '- { task: { select: { taskId: true, name: true, status: true } } } - Related task basics\n' +
      '- { taskDescription: { select: { description: true, acceptanceCriteria: true } } } - Key description fields\n\n' +
      '📋 PERFORMANCE OPTIMIZATION:\n' +
      '- Use select instead of include when you only need specific fields\n' +
      '- Combine with where conditions to minimize data transfer\n' +
      '- Select only required fields for large datasets',
  ),

  orderBy: OrderBySchema.optional().describe(
    '📊 PRISMA ORDER BY - Specify sorting criteria:\n\n' +
      '📋 COMMON SORTING:\n' +
      '- { createdAt: "desc" } - Newest first (default for most queries)\n' +
      '- { priority: "desc", createdAt: "desc" } - High priority first, then newest\n' +
      '- { status: "asc", name: "asc" } - Status then alphabetical\n' +
      '- { completionDate: "desc" } - Recently completed first\n\n' +
      '📋 WORKFLOW SORTING:\n' +
      '- { redelegationCount: "desc" } - Most problematic tasks first\n' +
      '- { currentMode: "asc" } - Group by current workflow role',
  ),

  pagination: PaginationSchema.optional().describe(
    '📄 PAGINATION OPTIONS - Efficient data retrieval:\n\n' +
      '📋 OFFSET-BASED (Simple):\n' +
      '- { skip: 20, take: 10 } - Skip 20, take next 10 (page 3 of 10-item pages)\n\n' +
      '📋 CURSOR-BASED (Efficient for large datasets):\n' +
      '- { cursor: { id: 123 }, take: 10 } - Start after record 123, take 10\n' +
      '- { cursor: { createdAt: "2024-01-15T10:00:00Z" }, take: 20 } - Start after timestamp\n\n' +
      '📋 PERFORMANCE TIPS:\n' +
      '- Use cursor-based pagination for large datasets (>1000 records)\n' +
      '- Combine with orderBy for consistent results\n' +
      '- Limit take to 100 or less for optimal performance',
  ),

  aggregation: AggregationSchema.optional().describe(
    '📊 AGGREGATION OPERATIONS - Analytics and reporting:\n\n' +
      '📋 BASIC AGGREGATIONS:\n' +
      '- { count: true } - Total record count\n' +
      '- { count: true, groupBy: ["status"] } - Count by status\n' +
      '- { count: true, groupBy: ["priority", "status"] } - Count by priority and status\n\n' +
      '📋 NUMERIC AGGREGATIONS:\n' +
      '- { sum: { redelegationCount: true }, groupBy: ["currentMode"] } - Total redelegations by role\n' +
      '- { avg: { redelegationCount: true } } - Average redelegations per task\n' +
      '- { min: { createdAt: true }, max: { completionDate: true } } - Date range\n\n' +
      '📋 ANALYTICS EXAMPLES:\n' +
      '- Task status distribution: { count: true, groupBy: ["status"] }\n' +
      '- Priority breakdown: { count: true, groupBy: ["priority"] }\n' +
      '- Role workload: { count: true, groupBy: ["currentMode"] }\n' +
      '- Performance metrics: { avg: { redelegationCount: true }, groupBy: ["priority"] }',
  ),

  distinct: z
    .array(z.string())
    .optional()
    .describe(
      '🎯 DISTINCT VALUES - Get unique values for specific fields:\n\n' +
        '📋 COMMON USAGE:\n' +
        '- ["status"] - All unique status values\n' +
        '- ["currentMode"] - All active workflow roles\n' +
        '- ["priority"] - All priority levels in use\n' +
        '- ["createdBy"] - All roles that have created plans\n\n' +
        '📋 MULTI-FIELD DISTINCT:\n' +
        '- ["status", "priority"] - All unique status-priority combinations\n' +
        '- ["currentMode", "status"] - All unique role-status combinations',
    ),

  // Performance and optimization
  timeout: z
    .number()
    .max(30000)
    .optional()
    .default(10000)
    .describe('Query timeout in milliseconds (default: 10000, max: 30000)'),

  // Response formatting
  format: z
    .enum(['full', 'summary', 'minimal'])
    .optional()
    .default('full')
    .describe(
      'Response format level:\n' +
        '- "full": Complete data with all requested fields and relationships\n' +
        '- "summary": Essential fields only with basic relationships\n' +
        '- "minimal": IDs and names only for quick reference',
    ),

  // Debugging and development
  explain: z
    .boolean()
    .optional()
    .describe(
      'Include query execution plan for debugging and performance analysis',
    ),

  // Cache control
  cache: z
    .object({
      ttl: z
        .number()
        .optional()
        .describe('Cache TTL in seconds (default: 300)'),
      key: z
        .string()
        .optional()
        .describe('Custom cache key for specific caching strategy'),
    })
    .optional()
    .describe('Cache control options for performance optimization'),
});

export type UniversalQueryInput = z.infer<typeof UniversalQuerySchema>;

/**
 * 🚀 COMPREHENSIVE USAGE EXAMPLES
 *
 * ===== BASIC QUERIES =====
 *
 * // Get all in-progress tasks with full context
 * {
 *   entity: "task",
 *   where: { status: "in-progress" },
 *   include: {
 *     taskDescription: true,
 *     implementationPlans: {
 *       include: { subtasks: true }
 *     },
 *     comments: {
 *       orderBy: { createdAt: "desc" },
 *       take: 5
 *     }
 *   },
 *   orderBy: { createdAt: "desc" }
 * }
 *
 * // Get task summary with status counts
 * {
 *   entity: "task",
 *   aggregation: {
 *     count: true,
 *     groupBy: ["status", "priority"]
 *   }
 * }
 *
 * // Search tasks by name with pagination
 * {
 *   entity: "task",
 *   where: {
 *     name: { contains: "reporting" }
 *   },
 *   select: { taskId: true, name: true, status: true, priority: true },
 *   orderBy: { createdAt: "desc" },
 *   pagination: { take: 20 }
 * }
 *
 * ===== ADVANCED QUERIES =====
 *
 * // Get tasks with incomplete subtasks
 * {
 *   entity: "task",
 *   where: {
 *     subtasks: {
 *       some: {
 *         status: { not: "completed" }
 *       }
 *     }
 *   },
 *   include: {
 *     subtasks: {
 *       where: { status: { not: "completed" } },
 *       orderBy: { sequenceNumber: "asc" }
 *     }
 *   }
 * }
 *
 * // Get high-priority tasks created this month
 * {
 *   entity: "task",
 *   where: {
 *     AND: [
 *       { priority: { in: ["High", "Critical"] } },
 *       { createdAt: { gte: "2024-01-01T00:00:00Z" } },
 *       { status: { not: "cancelled" } }
 *     ]
 *   },
 *   include: {
 *     taskDescription: {
 *       select: { description: true, acceptanceCriteria: true }
 *     },
 *     implementationPlans: {
 *       include: {
 *         subtasks: {
 *           where: { status: "in-progress" }
 *         }
 *       }
 *     }
 *   },
 *   orderBy: { priority: "desc", createdAt: "desc" }
 * }
 *
 * // Get delegation analytics
 * {
 *   entity: "delegation",
 *   where: {
 *     delegationTimestamp: {
 *       gte: "2024-01-01T00:00:00Z"
 *     }
 *   },
 *   aggregation: {
 *     count: true,
 *     groupBy: ["fromMode", "toMode", "success"]
 *   }
 * }
 *
 * // Get recent code reviews with issues
 * {
 *   entity: "codeReviewReport",
 *   where: {
 *     AND: [
 *       { status: "NEEDS_CHANGES" },
 *       { createdAt: { gte: "2024-01-01T00:00:00Z" } }
 *     ]
 *   },
 *   include: {
 *     task: {
 *       select: { taskId: true, name: true, currentMode: true }
 *     }
 *   },
 *   orderBy: { createdAt: "desc" },
 *   pagination: { take: 10 }
 * }
 *
 * ===== PERFORMANCE OPTIMIZED QUERIES =====
 *
 * // Efficient task overview (minimal data transfer)
 * {
 *   entity: "task",
 *   select: {
 *     taskId: true,
 *     name: true,
 *     status: true,
 *     priority: true,
 *     currentMode: true,
 *     createdAt: true
 *   },
 *   where: { status: { not: "cancelled" } },
 *   orderBy: { createdAt: "desc" },
 *   pagination: { take: 50 }
 * }
 *
 * // Cursor-based pagination for large datasets
 * {
 *   entity: "comment",
 *   where: { mode: "architect" },
 *   select: { id: true, content: true, createdAt: true, taskId: true },
 *   orderBy: { createdAt: "desc" },
 *   pagination: {
 *     cursor: { id: 1000 },
 *     take: 100
 *   }
 * }
 *
 * ===== ANALYTICS QUERIES =====
 *
 * // Workflow efficiency metrics
 * {
 *   entity: "task",
 *   aggregation: {
 *     count: true,
 *     avg: { redelegationCount: true },
 *     groupBy: ["status", "priority"]
 *   },
 *   where: {
 *     createdAt: {
 *       gte: "2024-01-01T00:00:00Z"
 *     }
 *   }
 * }
 *
 * // Role performance analysis
 * {
 *   entity: "delegation",
 *   aggregation: {
 *     count: true,
 *     groupBy: ["toMode", "success"]
 *   },
 *   where: {
 *     delegationTimestamp: {
 *       gte: "2024-01-01T00:00:00Z"
 *     }
 *   }
 * }
 */
