import { z } from 'zod';

/**
 * Universal Mutation Schema - Leverages Prisma's full mutation capabilities
 * Replaces 20+ individual create/update/delete tools with one powerful tool
 *
 * 🎯 COMPLETE MUTATION REFERENCE:
 * This schema provides comprehensive CRUD operations with batch support,
 * transaction management, and relationship handling for all entities.
 *
 * 🚀 CRITICAL BATCH OPERATIONS:
 * - createMany: Essential for implementation plan subtasks batch creation
 * - updateMany: Critical for batch status updates and bulk modifications
 * - Batch transactions: Ensure data consistency across multiple operations
 */

// ===== OPERATION TYPE DEFINITIONS =====

/**
 * 📋 MUTATION OPERATION TYPES:
 *
 * 🔹 SINGLE RECORD OPERATIONS:
 * - 'create': Create a single new record with relationships
 * - 'update': Update a single existing record by ID/conditions
 * - 'upsert': Create if not exists, update if exists (atomic operation)
 * - 'delete': Delete a single record by ID/conditions
 *
 * 🔹 BATCH OPERATIONS (CRITICAL FOR PERFORMANCE):
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
  'createMany', // 🚀 CRITICAL: Batch creation for subtasks
  'updateMany', // 🚀 CRITICAL: Batch status updates
  'deleteMany',
]);

// Entity types (same as query, matching Prisma model names)
export const EntityTypeSchema = z.enum([
  'task',
  'taskDescription',
  'implementationPlan',
  'subtask', // 🎯 PRIMARY TARGET for batch operations
  'researchReport',
  'codeReviewReport', // Maps to CodeReview model
  'completionReport',
  'comment',
  'delegation', // Maps to DelegationRecord model
  'workflowTransition',
]);

// ===== DATA PAYLOAD SPECIFICATIONS =====

/**
 * 📊 DATA PAYLOAD EXAMPLES BY OPERATION TYPE:
 *
 * 🔹 CREATE SINGLE RECORD:
 * - Task: { taskId: "TSK-001", name: "New Task", status: "not-started", priority: "High" }
 * - Subtask: { taskId: "TSK-001", planId: 3, name: "Implement API", description: "...", sequenceNumber: 1, status: "not-started", batchId: "B001" }
 *
 * 🔹 CREATE MANY RECORDS (CRITICAL FOR SUBTASKS):
 * - Subtasks: [
 *     { taskId: "TSK-001", planId: 3, name: "Setup Database", sequenceNumber: 1, batchId: "B001" },
 *     { taskId: "TSK-001", planId: 3, name: "Create API Endpoints", sequenceNumber: 2, batchId: "B001" },
 *     { taskId: "TSK-001", planId: 3, name: "Add Validation", sequenceNumber: 3, batchId: "B001" }
 *   ]
 *
 * 🔹 UPDATE SINGLE RECORD:
 * - Task Status: { status: "completed", completionDate: "2024-01-15T10:00:00Z" }
 * - Subtask Progress: { status: "in-progress", startedAt: "2024-01-15T09:00:00Z" }
 *
 * 🔹 UPDATE MANY RECORDS (CRITICAL FOR BATCH STATUS UPDATES):
 * - Batch Status Update: { status: "completed", completedAt: "2024-01-15T10:00:00Z" }
 *   (Applied to all records matching where conditions)
 *
 * 🔹 RELATIONSHIP OPERATIONS:
 * - Connect Existing: { task: { connect: { taskId: "TSK-001" } } }
 * - Create and Connect: { taskDescription: { create: { description: "...", acceptanceCriteria: [...] } } }
 * - Update Related: { implementationPlans: { update: { where: { id: 3 }, data: { overview: "Updated..." } } } }
 */
export const DataPayloadSchema = z
  .record(z.any())
  .describe(
    '📊 DATA PAYLOAD - Complete mutation data structure:\n\n' +
      '🔹 SINGLE RECORD CREATION:\n' +
      '- { taskId: "TSK-001", name: "New Task", status: "not-started", priority: "High" }\n' +
      '- { taskId: "TSK-001", planId: 3, name: "Implement API", sequenceNumber: 1, batchId: "B001" }\n\n' +
      '🔹 BATCH CREATION (createMany - CRITICAL for subtasks):\n' +
      '- [{ name: "Setup DB", sequenceNumber: 1 }, { name: "Create API", sequenceNumber: 2 }]\n' +
      '- All records in array must have same structure and required fields\n\n' +
      '🔹 UPDATE OPERATIONS:\n' +
      '- { status: "completed", completionDate: "2024-01-15T10:00:00Z" }\n' +
      '- { status: "in-progress", startedAt: "2024-01-15T09:00:00Z" }\n\n' +
      '🔹 RELATIONSHIP MANAGEMENT:\n' +
      '- { task: { connect: { taskId: "TSK-001" } } } - Connect to existing\n' +
      '- { taskDescription: { create: { description: "..." } } } - Create and connect\n' +
      '- { subtasks: { updateMany: { where: { batchId: "B001" }, data: { status: "completed" } } } }\n\n' +
      '🔹 UPSERT OPERATIONS:\n' +
      '- create: { taskId: "TSK-001", name: "New Task" } - Data if creating\n' +
      '- update: { status: "updated" } - Data if updating\n' +
      '- where: { taskId: "TSK-001" } - Condition to check existence',
  );

// Where conditions for updates/deletes with comprehensive examples
export const WhereConditionSchema = z
  .record(z.any())
  .describe(
    '🔍 WHERE CONDITIONS - Precise record targeting:\n\n' +
      '🔹 SINGLE RECORD TARGETING:\n' +
      '- { id: 123 } - By primary key (auto-increment IDs)\n' +
      '- { taskId: "TSK-001" } - By unique identifier\n' +
      '- { taskId: "TSK-001", planId: 3 } - By composite conditions\n\n' +
      '🔹 BATCH TARGETING (updateMany/deleteMany):\n' +
      '- { batchId: "B001" } - All subtasks in batch B001\n' +
      '- { status: "not-started" } - All records with specific status\n' +
      '- { taskId: "TSK-001", status: { in: ["not-started", "in-progress"] } } - Multiple conditions\n\n' +
      '🔹 ADVANCED FILTERING:\n' +
      '- { AND: [{ taskId: "TSK-001" }, { status: "not-started" }] } - Multiple conditions\n' +
      '- { OR: [{ status: "completed" }, { status: "cancelled" }] } - Alternative conditions\n' +
      '- { createdAt: { lt: "2024-01-01T00:00:00Z" } } - Date-based filtering\n' +
      '- { sequenceNumber: { gte: 5 } } - Numeric comparisons\n\n' +
      '🔹 RELATIONSHIP-BASED CONDITIONS:\n' +
      '- { task: { status: "in-progress" } } - Filter by related record properties\n' +
      '- { plan: { createdBy: "architect" } } - Filter by implementation plan creator',
  );

// Connect/disconnect for relations with comprehensive examples
export const RelationOperationSchema = z.object({
  connect: z
    .record(z.any())
    .optional()
    .describe(
      'Connect to existing related records:\n' +
        '- { taskId: "TSK-001" } - Connect to existing task\n' +
        '- { id: 123 } - Connect by primary key\n' +
        '- { planId: 3 } - Connect to implementation plan',
    ),
  disconnect: z
    .record(z.any())
    .optional()
    .describe(
      'Disconnect from related records:\n' +
        '- { taskId: "TSK-001" } - Disconnect from task\n' +
        '- true - Disconnect all (for optional one-to-one relations)',
    ),
  create: z
    .record(z.any())
    .optional()
    .describe(
      'Create and connect new related records:\n' +
        '- { description: "...", acceptanceCriteria: [...] } - Create task description\n' +
        '- { content: "New comment", mode: "architect" } - Create comment',
    ),
  update: z
    .record(z.any())
    .optional()
    .describe(
      'Update connected related records:\n' +
        '- { where: { id: 123 }, data: { status: "updated" } } - Update specific record\n' +
        '- { data: { status: "completed" } } - Update all connected records',
    ),
  delete: z
    .record(z.any())
    .optional()
    .describe(
      'Delete connected related records:\n' +
        '- { id: 123 } - Delete specific related record\n' +
        '- true - Delete all connected records (cascade delete)',
    ),
});

export const UniversalMutationSchema = z.object({
  operation: MutationOperationSchema.describe('The type of mutation operation'),

  entity: EntityTypeSchema.describe('The entity type to mutate'),

  data: DataPayloadSchema.optional().describe(
    '📊 DATA FOR CREATE/UPDATE OPERATIONS:\n\n' +
      '🚀 CRITICAL BATCH EXAMPLES:\n\n' +
      '🔹 CREATE MANY SUBTASKS (Implementation Plan Batch Creation):\n' +
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
      '🔹 UPDATE MANY (Batch Status Updates):\n' +
      '- Data: { "status": "completed", "completedAt": "2024-01-15T10:00:00Z" }\n' +
      '- Where: { "batchId": "B001" } - Updates all subtasks in batch\n\n' +
      '🔹 SINGLE RECORD OPERATIONS:\n' +
      '- Create Task: { "taskId": "TSK-006", "name": "New Feature", "status": "not-started" }\n' +
      '- Update Status: { "status": "in-progress", "startedAt": "2024-01-15T09:00:00Z" }\n' +
      '- Create with Relations: { "taskId": "TSK-006", "taskDescription": { "create": { "description": "..." } } }',
  ),

  where: WhereConditionSchema.optional().describe(
    '🔍 WHERE CONDITIONS FOR UPDATE/DELETE OPERATIONS:\n\n' +
      '🚀 CRITICAL BATCH TARGETING:\n\n' +
      '🔹 BATCH OPERATIONS (updateMany/deleteMany):\n' +
      '- { "batchId": "B001" } - Target all subtasks in batch B001\n' +
      '- { "taskId": "TSK-005", "status": "not-started" } - All not-started subtasks for task\n' +
      '- { "assignedTo": "senior-developer", "status": { "in": ["not-started", "in-progress"] } }\n\n' +
      '🔹 SINGLE RECORD TARGETING:\n' +
      '- { "id": 123 } - By auto-increment primary key\n' +
      '- { "taskId": "TSK-005" } - By unique task identifier\n' +
      '- { "taskId": "TSK-005", "planId": 3 } - By composite foreign keys\n\n' +
      '🔹 ADVANCED CONDITIONS:\n' +
      '- { "AND": [{ "taskId": "TSK-005" }, { "sequenceNumber": { "gte": 3 } }] }\n' +
      '- { "OR": [{ "status": "completed" }, { "status": "cancelled" }] }\n' +
      '- { "createdAt": { "lt": "2024-01-01T00:00:00Z" } } - Date-based cleanup\n\n' +
      '🔹 RELATIONSHIP-BASED:\n' +
      '- { "task": { "status": "cancelled" } } - Target by related task status\n' +
      '- { "plan": { "createdBy": "architect" } } - Target by plan creator',
  ),

  include: z
    .record(z.any())
    .optional()
    .describe(
      '🔗 INCLUDE RELATED DATA IN RESPONSE:\n\n' +
        '🔹 ESSENTIAL INCLUDES:\n' +
        '- { "task": true } - Include parent task information\n' +
        '- { "plan": true } - Include implementation plan details\n' +
        '- { "comments": true } - Include related comments\n\n' +
        '🔹 NESTED INCLUDES:\n' +
        '- { "task": { "include": { "taskDescription": true } } }\n' +
        '- { "plan": { "include": { "subtasks": true } } }\n\n' +
        '🔹 FILTERED INCLUDES:\n' +
        '- { "comments": { "where": { "mode": "architect" }, "orderBy": { "createdAt": "desc" } } }',
    ),

  select: z
    .record(z.any())
    .optional()
    .describe(
      '🎯 SELECT SPECIFIC FIELDS TO RETURN:\n\n' +
        '🔹 PERFORMANCE OPTIMIZATION:\n' +
        '- { "id": true, "status": true, "completedAt": true } - Essential fields only\n' +
        '- { "taskId": true, "name": true, "batchId": true } - Batch operation results\n\n' +
        '🔹 RELATIONSHIP SELECTION:\n' +
        '- { "task": { "select": { "taskId": true, "name": true } } }\n' +
        '- { "plan": { "select": { "overview": true, "createdBy": true } } }',
    ),

  // Transaction support with comprehensive examples
  transaction: z
    .object({
      id: z
        .string()
        .optional()
        .describe('Transaction ID for grouping operations'),
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
      timeout: z
        .number()
        .optional()
        .describe('Transaction timeout in milliseconds (default: 30000)'),
    })
    .optional()
    .describe(
      '🔒 TRANSACTION CONTROL - Ensure data consistency:\n\n' +
        '🔹 BATCH OPERATION TRANSACTIONS:\n' +
        '- Essential for createMany/updateMany operations\n' +
        '- Ensures all subtasks created/updated together or none\n' +
        '- Prevents partial batch completion on errors\n\n' +
        '🔹 MULTI-ENTITY TRANSACTIONS:\n' +
        '- Group related operations (task + implementation plan + subtasks)\n' +
        '- Maintain referential integrity across entities\n' +
        '- Rollback all changes if any operation fails',
    ),

  // Batch operations with comprehensive configuration
  batch: z
    .object({
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
        .optional()
        .default(false)
        .describe(
          'Continue batch if individual operations fail:\n' +
            '- false (default): Stop on first error, rollback all\n' +
            '- true: Continue processing, collect all errors',
        ),
    })
    .optional()
    .describe(
      '📦 BATCH OPERATION CONFIGURATION:\n\n' +
        '🚀 CRITICAL FOR IMPLEMENTATION PLANS:\n' +
        '- Create implementation plan + all subtasks in single transaction\n' +
        '- Update multiple subtask statuses atomically\n' +
        '- Ensure consistency across related operations\n\n' +
        '🔹 EXAMPLE BATCH OPERATIONS:\n' +
        '[\n' +
        '  {\n' +
        '    "operation": "create",\n' +
        '    "entity": "implementationPlan",\n' +
        '    "data": { "taskId": "TSK-005", "overview": "..." }\n' +
        '  },\n' +
        '  {\n' +
        '    "operation": "createMany",\n' +
        '    "entity": "subtask",\n' +
        '    "data": [{ "name": "Subtask 1" }, { "name": "Subtask 2" }]\n' +
        '  }\n' +
        ']',
    ),

  // Validation and constraints
  validate: z
    .object({
      businessRules: z
        .boolean()
        .optional()
        .default(true)
        .describe('Apply business rule validation'),
      referentialIntegrity: z
        .boolean()
        .optional()
        .default(true)
        .describe('Check referential integrity'),
      customValidators: z
        .array(z.string())
        .optional()
        .describe('Custom validator names to apply'),
    })
    .optional()
    .describe('Validation options'),

  // Audit and tracking
  audit: z
    .object({
      userId: z.string().optional().describe('User performing the operation'),
      reason: z.string().optional().describe('Reason for the change'),
      metadata: z
        .record(z.any())
        .optional()
        .describe('Additional audit metadata'),
    })
    .optional()
    .describe('Audit trail information'),

  // Performance options
  performance: z
    .object({
      skipTriggers: z
        .boolean()
        .optional()
        .describe('Skip database triggers for performance'),
      bulkMode: z
        .boolean()
        .optional()
        .describe('Use bulk operations when possible'),
      timeout: z
        .number()
        .max(60000)
        .optional()
        .default(30000)
        .describe('Operation timeout'),
    })
    .optional()
    .describe('Performance optimization options'),

  // Response control
  response: z
    .object({
      format: z
        .enum(['full', 'summary', 'minimal', 'id-only'])
        .optional()
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
        .optional()
        .default(true)
        .describe('Include count of affected records'),
      includeValidationErrors: z
        .boolean()
        .optional()
        .default(true)
        .describe('Include validation error details'),
    })
    .optional()
    .describe('Response formatting options'),
});

export type UniversalMutationInput = z.infer<typeof UniversalMutationSchema>;

/**
 * 🚀 COMPREHENSIVE MUTATION EXAMPLES
 *
 * ===== CRITICAL BATCH OPERATIONS =====
 *
 * 🔹 CREATE MANY SUBTASKS (Implementation Plan Creation):
 * {
 *   "operation": "createMany",
 *   "entity": "subtask",
 *   "data": [
 *     {
 *       "taskId": "TSK-005",
 *       "planId": 3,
 *       "name": "Enhance Universal Query Schema Documentation",
 *       "description": "Add comprehensive field specifications for all 10 entities...",
 *       "sequenceNumber": 1,
 *       "status": "not-started",
 *       "assignedTo": "senior-developer",
 *       "estimatedDuration": "30 minutes",
 *       "batchId": "B001",
 *       "batchTitle": "Schema File Enhancement"
 *     },
 *     {
 *       "taskId": "TSK-005",
 *       "planId": 3,
 *       "name": "Enhance Universal Mutation Schema Documentation",
 *       "description": "Document all mutation operations with complete examples...",
 *       "sequenceNumber": 2,
 *       "status": "not-started",
 *       "assignedTo": "senior-developer",
 *       "estimatedDuration": "25 minutes",
 *       "batchId": "B001",
 *       "batchTitle": "Schema File Enhancement"
 *     },
 *     {
 *       "taskId": "TSK-005",
 *       "planId": 3,
 *       "name": "Enhance Workflow Operations Schema Documentation",
 *       "description": "Complete workflow operation documentation with examples...",
 *       "sequenceNumber": 3,
 *       "status": "not-started",
 *       "assignedTo": "senior-developer",
 *       "estimatedDuration": "20 minutes",
 *       "batchId": "B001",
 *       "batchTitle": "Schema File Enhancement"
 *     }
 *   ],
 *   "transaction": {
 *     "isolationLevel": "ReadCommitted",
 *     "timeout": 30000
 *   },
 *   "response": {
 *     "format": "summary",
 *     "includeAffectedCount": true
 *   }
 * }
 *
 * 🔹 UPDATE MANY SUBTASKS (Batch Status Update):
 * {
 *   "operation": "updateMany",
 *   "entity": "subtask",
 *   "where": {
 *     "batchId": "B001"
 *   },
 *   "data": {
 *     "status": "completed",
 *     "completedAt": "2024-01-15T10:00:00Z"
 *   },
 *   "include": {
 *     "task": {
 *       "select": { "taskId": true, "name": true }
 *     }
 *   },
 *   "response": {
 *     "format": "summary",
 *     "includeAffectedCount": true
 *   }
 * }
 *
 * 🔹 BATCH TRANSACTION (Implementation Plan + Subtasks):
 * {
 *   "batch": {
 *     "operations": [
 *       {
 *         "operation": "create",
 *         "entity": "implementationPlan",
 *         "data": {
 *           "taskId": "TSK-006",
 *           "overview": "Comprehensive implementation plan...",
 *           "approach": "Batch-based implementation methodology...",
 *           "technicalDecisions": "Key architectural choices...",
 *           "createdBy": "architect",
 *           "filesToModify": ["file1.ts", "file2.ts"]
 *         }
 *       },
 *       {
 *         "operation": "createMany",
 *         "entity": "subtask",
 *         "data": [
 *           {
 *             "taskId": "TSK-006",
 *             "planId": 4,
 *             "name": "Backend Core APIs",
 *             "sequenceNumber": 1,
 *             "batchId": "B001"
 *           },
 *           {
 *             "taskId": "TSK-006",
 *             "planId": 4,
 *             "name": "Frontend Components",
 *             "sequenceNumber": 2,
 *             "batchId": "B002"
 *           }
 *         ]
 *       }
 *     ],
 *     "continueOnError": false
 *   },
 *   "transaction": {
 *     "isolationLevel": "ReadCommitted"
 *   }
 * }
 *
 * ===== SINGLE RECORD OPERATIONS =====
 *
 * 🔹 CREATE TASK WITH DESCRIPTION:
 * {
 *   "operation": "create",
 *   "entity": "task",
 *   "data": {
 *     "taskId": "TSK-007",
 *     "name": "Implement User Authentication",
 *     "status": "not-started",
 *     "priority": "High",
 *     "currentMode": "boomerang",
 *     "taskDescription": {
 *       "create": {
 *         "description": "Implement secure user authentication system...",
 *         "businessRequirements": "Users need secure login...",
 *         "technicalRequirements": "JWT tokens, bcrypt hashing...",
 *         "acceptanceCriteria": [
 *           "Users can register with email/password",
 *           "Users can login securely",
 *           "JWT tokens expire appropriately"
 *         ]
 *       }
 *     }
 *   },
 *   "include": {
 *     "taskDescription": true
 *   }
 * }
 *
 * 🔹 UPDATE TASK STATUS:
 * {
 *   "operation": "update",
 *   "entity": "task",
 *   "where": {
 *     "taskId": "TSK-005"
 *   },
 *   "data": {
 *     "status": "completed",
 *     "completionDate": "2024-01-15T10:00:00Z",
 *     "currentMode": null
 *   },
 *   "select": {
 *     "taskId": true,
 *     "name": true,
 *     "status": true,
 *     "completionDate": true
 *   }
 * }
 *
 * 🔹 UPSERT OPERATION:
 * {
 *   "operation": "upsert",
 *   "entity": "comment",
 *   "where": {
 *     "taskId": "TSK-005",
 *     "mode": "architect"
 *   },
 *   "data": {
 *     "create": {
 *       "taskId": "TSK-005",
 *       "mode": "architect",
 *       "content": "Implementation plan created successfully"
 *     },
 *     "update": {
 *       "content": "Implementation plan updated with new requirements"
 *     }
 *   }
 * }
 *
 * ===== ADVANCED OPERATIONS =====
 *
 * 🔹 DELETE MANY (Cleanup Operations):
 * {
 *   "operation": "deleteMany",
 *   "entity": "comment",
 *   "where": {
 *     "AND": [
 *       { "createdAt": { "lt": "2024-01-01T00:00:00Z" } },
 *       { "mode": "system" }
 *     ]
 *   },
 *   "response": {
 *     "format": "id-only",
 *     "includeAffectedCount": true
 *   }
 * }
 *
 * 🔹 COMPLEX RELATIONSHIP UPDATE:
 * {
 *   "operation": "update",
 *   "entity": "implementationPlan",
 *   "where": {
 *     "taskId": "TSK-005"
 *   },
 *   "data": {
 *     "overview": "Updated implementation approach",
 *     "subtasks": {
 *       "updateMany": {
 *         "where": { "status": "not-started" },
 *         "data": { "assignedTo": "senior-developer" }
 *       }
 *     }
 *   },
 *   "include": {
 *     "subtasks": {
 *       "where": { "status": "not-started" }
 *     }
 *   }
 * }
 */
