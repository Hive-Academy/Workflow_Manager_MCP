import { z } from 'zod';

/**
 * Universal Mutation Schema - Leverages Prisma's full mutation capabilities
 * Replaces 20+ individual create/update/delete tools with one powerful tool
 *
 *  COMPLETE MUTATION REFERENCE:
 * This schema provides comprehensive CRUD operations with batch support,
 * transaction management, and relationship handling for all entities.
 *
 * 🚀 CRITICAL BATCH OPERATIONS:
 * - createMany: Essential for implementation plan subtasks batch creation
 * - updateMany: Critical for batch status updates and bulk modifications
 * - Batch transactions: Ensure data consistency across multiple operations
 *
 *  COMPLETE ENTITY FIELD SPECIFICATIONS:
 *
 *  TASK ENTITY - Main workflow tasks
 *   Required: taskId (string), name (string), status (enum), creationDate (DateTime)
 *   Optional: completionDate (DateTime), owner (string), currentMode (enum), priority (enum),
 *            dependencies (string[]), redelegationCount (int), gitBranch (string)
 *   Relationships: taskDescription (1:1), implementationPlans (1:many), subtasks (1:many),
 *                 delegationRecords (1:many), researchReports (1:many), codeReviews (1:many),
 *                 completionReports (1:many), comments (1:many), workflowTransitions (1:many)
 *
 *  TASK DESCRIPTION ENTITY - Detailed specifications
 *   Required: taskId (string), description (string), createdAt (DateTime), updatedAt (DateTime)
 *   Optional: businessRequirements (string), technicalRequirements (string), acceptanceCriteria (string[])
 *   Relationships: task (1:1 required)
 *
 *  IMPLEMENTATION PLAN ENTITY - Technical implementation plans
 *   Required: taskId (string), overview (string), createdAt (DateTime), updatedAt (DateTime)
 *   Optional: approach (string), technicalDecisions (string), filesToModify (string[]), createdBy (string)
 *   Relationships: task (1:1 required), subtasks (1:many)
 *
 *  SUBTASK ENTITY - Granular work items (CRITICAL for batch operations)
 *   Required: taskId (string), planId (int), name (string), sequenceNumber (int), status (enum)
 *   Optional: description (string), assignedTo (string), estimatedDuration (string),
 *            startedAt (DateTime), completedAt (DateTime), batchId (string), batchTitle (string)
 *   Relationships: task (1:1 required), plan (1:1 required), delegationRecords (1:many), comments (1:many)
 *
 *  RESEARCH REPORT ENTITY - Research findings
 *   Required: taskId (string), title (string), createdAt (DateTime), updatedAt (DateTime)
 *   Optional: summary (string), findings (string), recommendations (string), references (string[])
 *   Relationships: task (1:1 required)
 *
 *  CODE REVIEW REPORT ENTITY - Quality assessments (maps to CodeReview model)
 *   Required: taskId (string), status (enum), createdAt (DateTime), updatedAt (DateTime)
 *   Optional: summary (string), strengths (string), issues (string), acceptanceCriteriaVerification (JSON),
 *            manualTestingResults (string), requiredChanges (string)
 *   Relationships: task (1:1 required)
 *
 *  COMPLETION REPORT ENTITY - Task completion summaries
 *   Required: taskId (string), summary (string), createdAt (DateTime)
 *   Optional: filesModified (string[]), delegationSummary (string), acceptanceCriteriaVerification (JSON)
 *   Relationships: task (1:1 required)
 *
 *  COMMENT ENTITY - Notes and communications
 *   Required: taskId (string), mode (enum), content (string), createdAt (DateTime)
 *   Optional: subtaskId (int)
 *   Relationships: task (1:1 required), subtask (1:1 optional)
 *
 *  DELEGATION RECORD ENTITY - Role transition tracking (maps to DelegationRecord model)
 *   Required: taskId (string), fromMode (enum), toMode (enum), delegationTimestamp (DateTime)
 *   Optional: subtaskId (int), completionTimestamp (DateTime), success (boolean),
 *            rejectionReason (string), redelegationCount (int)
 *   Relationships: task (1:1 required), subtask (1:1 optional)
 *
 *  WORKFLOW TRANSITION ENTITY - State change tracking
 *   Required: taskId (string), fromMode (enum), toMode (enum), transitionTimestamp (DateTime)
 *   Optional: reason (string)
 *   Relationships: task (1:1 required)
 *
 *  ENUM VALUE SPECIFICATIONS:
 *
 * 🔸 TASK STATUS: "not-started" | "in-progress" | "needs-review" | "completed" | "needs-changes" | "paused" | "cancelled"
 * 🔸 TASK PRIORITY: "Low" | "Medium" | "High" | "Critical"
 * 🔸 WORKFLOW MODES: "boomerang" | "researcher" | "architect" | "senior-developer" | "code-review"
 * 🔸 SUBTASK STATUS: "not-started" | "in-progress" | "completed" | "cancelled"
 * 🔸 CODE REVIEW STATUS: "APPROVED" | "APPROVED_WITH_RESERVATIONS" | "NEEDS_CHANGES"
 */

// ===== OPERATION TYPE DEFINITIONS =====

/**
 *  MUTATION OPERATION TYPES:
 *
 *  SINGLE RECORD OPERATIONS:
 * - 'create': Create a single new record with relationships
 * - 'update': Update a single existing record by ID/conditions
 * - 'upsert': Create if not exists, update if exists (atomic operation)
 * - 'delete': Delete a single record by ID/conditions
 *
 *  BATCH OPERATIONS (CRITICAL FOR PERFORMANCE):
 * - 'createMany': Create multiple records in a single operation (ESSENTIAL for subtasks)
 * - 'updateMany': Update multiple records matching conditions (CRITICAL for status updates)
 * - 'deleteMany': Delete multiple records matching conditions
 *
 * 💡 BATCH OPERATION BENEFITS:
 * - Performance: Single database transaction vs multiple round trips
 * - Consistency: All operations succeed or fail together
 * - Efficiency: Reduced network overhead and connection usage
 * - Atomicity: Ensures data integrity across multiple records
 */
export const MutationOperationSchema = z.enum([
  'create',
  'update',
  'upsert',
  'delete',
  'createMany',
  'updateMany',
  'deleteMany',
]);

// Entity types (same as query, matching Prisma model names)
export const EntityTypeSchema = z.enum([
  'task',
  'taskDescription',
  'implementationPlan',
  'subtask', //  PRIMARY TARGET for batch operations
  'researchReport',
  'codeReviewReport', // Maps to CodeReview model
  'completionReport',
  'comment',
  'delegation', // Maps to DelegationRecord model
  'workflowTransition',
]);

// ===== DATA PAYLOAD SPECIFICATIONS =====

/**
 *  COMPREHENSIVE DATA PAYLOAD EXAMPLES BY OPERATION TYPE:
 *
 *  CREATE SINGLE RECORD EXAMPLES:
 *
 * • Task Creation:
 *   {
 *     taskId: "TSK-006",
 *     name: "Implement User Authentication",
 *     status: "not-started",
 *     priority: "High",
 *     currentMode: "boomerang",
 *     creationDate: "2024-01-15T10:00:00Z",
 *     gitBranch: "feature/auth-system"
 *   }
 *
 * • Task Description Creation:
 *   {
 *     taskId: "TSK-006",
 *     description: "Implement comprehensive user authentication system with JWT tokens",
 *     businessRequirements: "Users need secure login/logout functionality",
 *     technicalRequirements: "JWT tokens, bcrypt hashing, session management",
 *     acceptanceCriteria: [
 *       "Users can register with email/password",
 *       "Users can login with valid credentials",
 *       "JWT tokens expire after 24 hours",
 *       "Passwords are securely hashed"
 *     ]
 *   }
 *
 * • Implementation Plan Creation:
 *   {
 *     taskId: "TSK-006",
 *     overview: "Multi-phase authentication implementation",
 *     approach: "JWT-based authentication with secure password handling",
 *     technicalDecisions: "Use bcrypt for hashing, jsonwebtoken for JWT",
 *     filesToModify: [
 *       "src/auth/auth.service.ts",
 *       "src/auth/auth.controller.ts",
 *       "src/auth/jwt.strategy.ts"
 *     ],
 *     createdBy: "architect"
 *   }
 *
 * • Subtask Creation:
 *   {
 *     taskId: "TSK-006",
 *     planId: 4,
 *     name: "Setup Authentication Module",
 *     description: "Create auth module with service and controller",
 *     sequenceNumber: 1,
 *     status: "not-started",
 *     assignedTo: "senior-developer",
 *     estimatedDuration: "2 hours",
 *     batchId: "B001",
 *     batchTitle: "Authentication Core"
 *   }
 *
 * • Research Report Creation:
 *   {
 *     taskId: "TSK-006",
 *     title: "Authentication Libraries Research",
 *     summary: "Comparison of JWT libraries and security best practices",
 *     findings: "jsonwebtoken is most popular, passport-jwt for NestJS integration",
 *     recommendations: "Use jsonwebtoken with passport-jwt strategy",
 *     references: [
 *       "https://jwt.io/",
 *       "https://docs.nestjs.com/security/authentication"
 *     ]
 *   }
 *
 * • Code Review Report Creation:
 *   {
 *     taskId: "TSK-006",
 *     status: "APPROVED",
 *     summary: "Authentication implementation meets all requirements",
 *     strengths: "Clean code structure, proper error handling, comprehensive tests",
 *     issues: "Minor: Consider adding rate limiting",
 *     acceptanceCriteriaVerification: {
 *       "Users can register": true,
 *       "Users can login": true,
 *       "JWT tokens expire": true,
 *       "Passwords hashed": true
 *     },
 *     manualTestingResults: "All authentication flows tested successfully"
 *   }
 *
 * • Completion Report Creation:
 *   {
 *     taskId: "TSK-006",
 *     summary: "User authentication system successfully implemented",
 *     filesModified: [
 *       "src/auth/auth.service.ts",
 *       "src/auth/auth.controller.ts",
 *       "src/auth/jwt.strategy.ts",
 *       "src/auth/auth.module.ts"
 *     ],
 *     delegationSummary: "Task completed through architect → senior-developer → code-review workflow",
 *     acceptanceCriteriaVerification: {
 *       "registration": "implemented",
 *       "login": "implemented",
 *       "jwt_expiry": "configured",
 *       "password_hashing": "implemented"
 *     }
 *   }
 *
 * • Comment Creation:
 *   {
 *     taskId: "TSK-006",
 *     mode: "architect",
 *     content: "Implementation plan ready. Focus on security best practices."
 *   }
 *
 * • Delegation Record Creation:
 *   {
 *     taskId: "TSK-006",
 *     fromMode: "architect",
 *     toMode: "senior-developer",
 *     delegationTimestamp: "2024-01-15T11:00:00Z"
 *   }
 *
 * • Workflow Transition Creation:
 *   {
 *     taskId: "TSK-006",
 *     fromMode: "architect",
 *     toMode: "senior-developer",
 *     transitionTimestamp: "2024-01-15T11:00:00Z",
 *     reason: "Implementation plan complete, delegating for development"
 *   }
 *
 *  CREATE MANY RECORDS (CRITICAL FOR SUBTASKS - Implementation Plan Batch Creation):
 *
 * • Subtasks Batch Creation:
 *   [
 *     {
 *       taskId: "TSK-006",
 *       planId: 4,
 *       name: "Setup Authentication Module",
 *       description: "Create auth module with service and controller",
 *       sequenceNumber: 1,
 *       status: "not-started",
 *       assignedTo: "senior-developer",
 *       estimatedDuration: "2 hours",
 *       batchId: "B001",
 *       batchTitle: "Authentication Core"
 *     },
 *     {
 *       taskId: "TSK-006",
 *       planId: 4,
 *       name: "Implement JWT Strategy",
 *       description: "Configure JWT authentication strategy",
 *       sequenceNumber: 2,
 *       status: "not-started",
 *       assignedTo: "senior-developer",
 *       estimatedDuration: "1.5 hours",
 *       batchId: "B001",
 *       batchTitle: "Authentication Core"
 *     },
 *     {
 *       taskId: "TSK-006",
 *       planId: 4,
 *       name: "Add Password Hashing",
 *       description: "Implement bcrypt password hashing",
 *       sequenceNumber: 3,
 *       status: "not-started",
 *       assignedTo: "senior-developer",
 *       estimatedDuration: "1 hour",
 *       batchId: "B001",
 *       batchTitle: "Authentication Core"
 *     }
 *   ]
 *
 *  UPDATE SINGLE RECORD EXAMPLES:
 *
 * • Task Status Update:
 *   { status: "completed", completionDate: "2024-01-15T16:00:00Z" }
 *
 * • Task Progress Update:
 *   { status: "in-progress", currentMode: "senior-developer" }
 *
 * • Subtask Progress Update:
 *   { status: "in-progress", startedAt: "2024-01-15T09:00:00Z" }
 *
 * • Subtask Completion:
 *   { status: "completed", completedAt: "2024-01-15T14:00:00Z" }
 *
 * • Implementation Plan Update:
 *   {
 *     overview: "Updated implementation approach",
 *     technicalDecisions: "Revised to use different JWT library"
 *   }
 *
 *  UPDATE MANY RECORDS (CRITICAL FOR BATCH STATUS UPDATES):
 *
 * • Batch Status Update (Applied to all records matching where conditions):
 *   { status: "completed", completedAt: "2024-01-15T14:00:00Z" }
 *   WHERE: { batchId: "B001" }
 *
 * • Bulk Task Assignment:
 *   { currentMode: "senior-developer", status: "in-progress" }
 *   WHERE: { status: "not-started", priority: "High" }
 *
 * • Bulk Subtask Cancellation:
 *   { status: "cancelled" }
 *   WHERE: { taskId: "TSK-006", status: "not-started" }
 *
 *  RELATIONSHIP OPERATIONS:
 *
 * • Connect to Existing Records:
 *   { task: { connect: { taskId: "TSK-001" } } }
 *   { plan: { connect: { id: 3 } } }
 *
 * • Create and Connect New Records:
 *   {
 *     taskDescription: {
 *       create: {
 *         description: "Detailed task description",
 *         acceptanceCriteria: ["Criteria 1", "Criteria 2"]
 *       }
 *     }
 *   }
 *
 * • Update Related Records:
 *   {
 *     subtasks: {
 *       updateMany: {
 *         where: { batchId: "B001" },
 *         data: { status: "completed" }
 *       }
 *     }
 *   }
 *
 *  UPSERT OPERATIONS (Create if not exists, update if exists):
 *
 * • Task Upsert:
 *   WHERE: { taskId: "TSK-006" }
 *   CREATE: { taskId: "TSK-006", name: "New Task", status: "not-started" }
 *   UPDATE: { name: "Updated Task Name", status: "in-progress" }
 *
 * • Comment Upsert:
 *   WHERE: { taskId: "TSK-006", mode: "architect" }
 *   CREATE: { taskId: "TSK-006", mode: "architect", content: "Initial comment" }
 *   UPDATE: { content: "Updated comment" }
 *
 *  DELETE OPERATIONS:
 *
 * • Single Record Delete:
 *   WHERE: { id: 25 } (Delete comment with ID 25)
 *   WHERE: { taskId: "TSK-006" } (Delete task TSK-006)
 *
 * • Multiple Records Delete:
 *   WHERE: { batchId: "B001", status: "cancelled" } (Delete cancelled subtasks in batch)
 *   WHERE: { taskId: "TSK-006", mode: "error" } (Delete error comments for task)
 */
export const DataPayloadSchema = z
  .record(z.any())
  .describe(
    ' DATA PAYLOAD - Complete mutation data structure:\n\n' +
      ' SINGLE RECORD CREATION:\n' +
      '- { taskId: "TSK-001", name: "New Task", status: "not-started", priority: "High" }\n' +
      '- { taskId: "TSK-001", planId: 3, name: "Implement API", sequenceNumber: 1, batchId: "B001" }\n\n' +
      ' BATCH CREATION (createMany - CRITICAL for subtasks):\n' +
      '- [{ name: "Setup DB", sequenceNumber: 1 }, { name: "Create API", sequenceNumber: 2 }]\n' +
      '- All records in array must have same structure and required fields\n\n' +
      ' UPDATE OPERATIONS:\n' +
      '- { status: "completed", completionDate: "2024-01-15T10:00:00Z" }\n' +
      '- { status: "in-progress", startedAt: "2024-01-15T09:00:00Z" }\n\n' +
      ' RELATIONSHIP MANAGEMENT:\n' +
      '- { task: { connect: { taskId: "TSK-001" } } } - Connect to existing\n' +
      '- { taskDescription: { create: { description: "..." } } } - Create and connect\n' +
      '- { subtasks: { updateMany: { where: { batchId: "B001" }, data: { status: "completed" } } } }\n\n' +
      ' UPSERT OPERATIONS:\n' +
      '- create: { taskId: "TSK-001", name: "New Task" } - Data if creating\n' +
      '- update: { status: "updated" } - Data if updating\n' +
      '- where: { taskId: "TSK-001" } - Condition to check existence',
  );

// Where conditions for updates/deletes with comprehensive examples
export const WhereConditionSchema = z
  .record(z.any())
  .describe(
    ' WHERE CONDITIONS - Precise record targeting:\n\n' +
      ' SINGLE RECORD TARGETING:\n' +
      '- { id: 123 } - By primary key (auto-increment IDs)\n' +
      '- { taskId: "TSK-001" } - By unique identifier\n' +
      '- { taskId: "TSK-001", planId: 3 } - By composite conditions\n\n' +
      ' BATCH TARGETING (updateMany/deleteMany):\n' +
      '- { batchId: "B001" } - All subtasks in batch B001\n' +
      '- { status: "not-started" } - All records with specific status\n' +
      '- { taskId: "TSK-001", status: { in: ["not-started", "in-progress"] } } - Multiple conditions\n\n' +
      ' ADVANCED FILTERING:\n' +
      '- { AND: [{ taskId: "TSK-001" }, { status: "not-started" }] } - Multiple conditions\n' +
      '- { OR: [{ status: "completed" }, { status: "cancelled" }] } - Alternative conditions\n' +
      '- { createdAt: { lt: "2024-01-01T00:00:00Z" } } - Date-based filtering\n' +
      '- { sequenceNumber: { gte: 5 } } - Numeric comparisons\n\n' +
      ' RELATIONSHIP-BASED CONDITIONS:\n' +
      '- { task: { status: "in-progress" } } - Filter by related record properties\n' +
      '- { plan: { createdBy: "architect" } } - Filter by implementation plan creator',
  );

// ===== ADVANCED OPERATION SCHEMAS =====

/**
 *  BATCH OPERATION CONFIGURATION:
 *
 *  CRITICAL FOR IMPLEMENTATION PLANS:
 * - Create implementation plan + all subtasks in single transaction
 * - Update multiple subtask statuses atomically
 * - Ensure consistency across related operations
 *
 *  EXAMPLE BATCH OPERATIONS:
 * [
 *   {
 *     "operation": "create",
 *     "entity": "implementationPlan",
 *     "data": { "taskId": "TSK-005", "overview": "..." }
 *   },
 *   {
 *     "operation": "createMany",
 *     "entity": "subtask",
 *     "data": [{ "name": "Subtask 1" }, { "name": "Subtask 2" }]
 *   }
 * ]
 */
export const BatchOperationSchema = z.object({
  operations: z
    .array(
      z.object({
        operation: MutationOperationSchema,
        entity: EntityTypeSchema,
        data: DataPayloadSchema.optional(),
        where: WhereConditionSchema.optional(),
      }),
    )
    .describe(
      'Array of operations to execute in batch:\n' +
        '- All operations execute in single transaction\n' +
        '- Maintains order of operations for dependencies\n' +
        '- Supports mixed operation types (create, update, delete)',
    ),
  continueOnError: z
    .boolean()
    .default(false)
    .describe(
      'Continue batch if individual operations fail:\n' +
        '- false (default): Stop on first error, rollback all\n' +
        '- true: Continue processing, collect all errors',
    ),
});

/**
 *  TRANSACTION CONTROL - Ensure data consistency:
 *
 *  BATCH OPERATION TRANSACTIONS:
 * - Essential for createMany/updateMany operations
 * - Ensures all subtasks created/updated together or none
 * - Prevents partial batch completion on errors
 *
 *  MULTI-ENTITY TRANSACTIONS:
 * - Group related operations (task + implementation plan + subtasks)
 * - Maintain referential integrity across entities
 * - Rollback all changes if any operation fails
 */
export const TransactionSchema = z.object({
  id: z.string().optional().describe('Transaction ID for grouping operations'),
  timeout: z
    .number()
    .optional()
    .describe('Transaction timeout in milliseconds (default: 30000)'),
  isolationLevel: z
    .enum([
      'ReadUncommitted',
      'ReadCommitted',
      'RepeatableRead',
      'Serializable',
    ])
    .optional()
    .describe(
      'Transaction isolation level:\n' +
        '- ReadUncommitted: Fastest, allows dirty reads\n' +
        '- ReadCommitted: Prevents dirty reads (default)\n' +
        '- RepeatableRead: Prevents dirty and non-repeatable reads\n' +
        '- Serializable: Highest isolation, prevents all phenomena',
    ),
});

// ===== RESPONSE AND PERFORMANCE SCHEMAS =====

export const ResponseFormatSchema = z.object({
  format: z
    .enum(['full', 'summary', 'minimal', 'id-only'])
    .default('full')
    .describe(
      'Response format level:\n' +
        '- "full": Complete data with all requested fields\n' +
        '- "summary": Essential fields only\n' +
        '- "minimal": Basic information\n' +
        '- "id-only": Just IDs for performance',
    ),
  includeAffectedCount: z
    .boolean()
    .default(true)
    .describe('Include count of affected records'),
  includeValidationErrors: z
    .boolean()
    .default(true)
    .describe('Include validation error details'),
});

export const PerformanceSchema = z.object({
  timeout: z.number().max(60000).default(30000).describe('Operation timeout'),
  bulkMode: z
    .boolean()
    .optional()
    .describe('Use bulk operations when possible'),
  skipTriggers: z
    .boolean()
    .optional()
    .describe('Skip database triggers for performance'),
});

export const ValidationSchema = z.object({
  businessRules: z
    .boolean()
    .default(true)
    .describe('Apply business rule validation'),
  referentialIntegrity: z
    .boolean()
    .default(true)
    .describe('Check referential integrity'),
  customValidators: z
    .array(z.string())
    .optional()
    .describe('Custom validator names to apply'),
});

export const AuditSchema = z.object({
  userId: z.string().optional().describe('User performing the operation'),
  reason: z.string().optional().describe('Reason for the change'),
  metadata: z.record(z.any()).optional().describe('Additional audit metadata'),
});

// ===== MAIN SCHEMA =====

export const UniversalMutationSchema = z.object({
  operation: MutationOperationSchema.describe('The type of mutation operation'),

  entity: EntityTypeSchema.describe('The entity type to mutate'),

  data: DataPayloadSchema.optional().describe(
    ' DATA FOR CREATE/UPDATE OPERATIONS:\n\n' +
      '🚀 CRITICAL BATCH EXAMPLES:\n\n' +
      ' CREATE MANY SUBTASKS (Implementation Plan Batch Creation):\n' +
      '[\n' +
      '  {\n' +
      '    "taskId": "TSK-005",\n' +
      '    "planId": 3,\n' +
      '    "name": "Enhance Universal Query Schema Documentation",\n' +
      '    "description": "Add comprehensive field specifications...",\n' +
      '    "sequenceNumber": 1,\n' +
      '    "status": "not-started",\n' +
      '    "assignedTo": "senior-developer",\n' +
      '    "estimatedDuration": "30 minutes",\n' +
      '    "batchId": "B001",\n' +
      '    "batchTitle": "Schema File Enhancement"\n' +
      '  },\n' +
      '  {\n' +
      '    "taskId": "TSK-005",\n' +
      '    "planId": 3,\n' +
      '    "name": "Enhance Universal Mutation Schema Documentation",\n' +
      '    "description": "Document all mutation operations...",\n' +
      '    "sequenceNumber": 2,\n' +
      '    "status": "not-started",\n' +
      '    "assignedTo": "senior-developer",\n' +
      '    "estimatedDuration": "25 minutes",\n' +
      '    "batchId": "B001",\n' +
      '    "batchTitle": "Schema File Enhancement"\n' +
      '  }\n' +
      ']\n\n' +
      ' UPDATE MANY (Batch Status Updates):\n' +
      '- Data: { "status": "completed", "completedAt": "2024-01-15T10:00:00Z" }\n' +
      '- Where: { "batchId": "B001" } - Updates all subtasks in batch\n\n' +
      ' SINGLE RECORD OPERATIONS:\n' +
      '- Create Task: { "taskId": "TSK-006", "name": "New Feature", "status": "not-started" }\n' +
      '- Update Status: { "status": "in-progress", "startedAt": "2024-01-15T09:00:00Z" }\n' +
      '- Create with Relations: { "taskId": "TSK-006", "taskDescription": { "create": { "description": "..." } } }',
  ),

  where: WhereConditionSchema.optional().describe(
    ' WHERE CONDITIONS FOR UPDATE/DELETE OPERATIONS:\n\n' +
      ' CRITICAL BATCH TARGETING:\n\n' +
      ' BATCH OPERATIONS (updateMany/deleteMany):\n' +
      '- { "batchId": "B001" } - Target all subtasks in batch B001\n' +
      '- { "taskId": "TSK-005", "status": "not-started" } - All not-started subtasks for task\n' +
      '- { "assignedTo": "senior-developer", "status": { "in": ["not-started", "in-progress"] } }\n\n' +
      ' SINGLE RECORD TARGETING:\n' +
      '- { "id": 123 } - By auto-increment primary key\n' +
      '- { "taskId": "TSK-005" } - By unique task identifier\n' +
      '- { "taskId": "TSK-005", "planId": 3 } - By composite foreign keys\n\n' +
      ' ADVANCED CONDITIONS:\n' +
      '- { "AND": [{ "taskId": "TSK-005" }, { "sequenceNumber": { "gte": 3 } }] }\n' +
      '- { "OR": [{ "status": "completed" }, { "status": "cancelled" }] }\n' +
      '- { "createdAt": { "lt": "2024-01-01T00:00:00Z" } } - Date-based cleanup\n\n' +
      ' RELATIONSHIP-BASED:\n' +
      '- { "task": { "status": "cancelled" } } - Target by related task status\n' +
      '- { "plan": { "createdBy": "architect" } } - Target by plan creator',
  ),

  include: z
    .record(z.any())
    .optional()
    .describe(
      ' INCLUDE RELATED DATA IN RESPONSE:\n\n' +
        ' ESSENTIAL INCLUDES:\n' +
        '- { "task": true } - Include parent task information\n' +
        '- { "plan": true } - Include implementation plan details\n' +
        '- { "comments": true } - Include related comments\n\n' +
        ' NESTED INCLUDES:\n' +
        '- { "task": { "include": { "taskDescription": true } } }\n' +
        '- { "plan": { "include": { "subtasks": true } } }\n\n' +
        ' FILTERED INCLUDES:\n' +
        '- { "comments": { "where": { "mode": "architect" }, "orderBy": { "createdAt": "desc" } } }',
    ),

  select: z
    .record(z.any())
    .optional()
    .describe(
      ' SELECT SPECIFIC FIELDS TO RETURN:\n\n' +
        ' PERFORMANCE OPTIMIZATION:\n' +
        '- { "id": true, "status": true, "completedAt": true } - Essential fields only\n' +
        '- { "taskId": true, "name": true, "batchId": true } - Batch operation results\n\n' +
        ' RELATIONSHIP SELECTION:\n' +
        '- { "task": { "select": { "taskId": true, "name": true } } }\n' +
        '- { "plan": { "select": { "overview": true, "createdBy": true } } }',
    ),

  batch: BatchOperationSchema.optional(),

  transaction: TransactionSchema.optional(),

  response: ResponseFormatSchema.optional(),

  performance: PerformanceSchema.optional(),

  validate: ValidationSchema.optional(),

  audit: AuditSchema.optional(),
});

export type UniversalMutationInput = z.infer<typeof UniversalMutationSchema>;
