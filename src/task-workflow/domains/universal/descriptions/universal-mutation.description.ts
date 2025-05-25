/**
 * Universal Mutation Tool Description
 * Comprehensive documentation for the mutate_data MCP tool
 */

export const UNIVERSAL_MUTATION_DESCRIPTION = `
Universal mutation tool for creating, updating, and deleting data.

🎯 REPLACES 20+ INDIVIDUAL MUTATION TOOLS:
• create_task, update_task_status, delete_task
• create_implementation_plan, update_subtask_status
• create_research_report, update_code_review_report
• delegate_task, complete_task, add_task_note
• create_subtask, update_implementation_plan, delete_subtask
• create_comment, update_delegation_record, create_completion_report
• And many more specialized mutation tools...

🚀 POWERFUL FEATURES:
• All CRUD operations (create, update, upsert, delete)
• Batch operations and transactions (CRITICAL for performance)
• Relation management (connect, disconnect, create)
• Business rule validation and referential integrity
• Audit trail support with user tracking
• Performance optimizations with bulk operations
• Comprehensive error handling and validation

📊 MUTATION OPERATION TYPES:

🔹 SINGLE RECORD OPERATIONS:
• 'create': Create a single new record with relationships
• 'update': Update a single existing record by ID/conditions
• 'upsert': Create if not exists, update if exists (atomic operation)
• 'delete': Delete a single record by ID/conditions

🔹 BATCH OPERATIONS (CRITICAL FOR PERFORMANCE):
• 'createMany': Create multiple records in a single operation (ESSENTIAL for subtasks)
• 'updateMany': Update multiple records matching conditions (CRITICAL for status updates)
• 'deleteMany': Delete multiple records matching conditions

💡 BATCH OPERATION BENEFITS:
• Performance: Single database transaction vs multiple round trips
• Consistency: All operations succeed or fail together
• Efficiency: Reduced network overhead and connection usage
• Atomicity: Ensures data integrity across multiple records

📋 PRACTICAL MUTATION EXAMPLES:

🔸 TASK OPERATIONS:
• Create new task:
  {
    operation: "create",
    entity: "task",
    data: {
      taskId: "TSK-006",
      name: "Implement User Authentication",
      status: "not-started",
      priority: "High",
      currentMode: "boomerang",
      creationDate: "2024-01-15T10:00:00Z"
    }
  }

• Update task status:
  {
    operation: "update",
    entity: "task",
    where: { taskId: "TSK-006" },
    data: {
      status: "in-progress",
      currentMode: "architect"
    }
  }

• Complete task:
  {
    operation: "update",
    entity: "task",
    where: { taskId: "TSK-006" },
    data: {
      status: "completed",
      completionDate: "2024-01-15T16:00:00Z"
    }
  }

🔸 TASK DESCRIPTION OPERATIONS:
• Create task description:
  {
    operation: "create",
    entity: "taskDescription",
    data: {
      taskId: "TSK-006",
      description: "Implement comprehensive user authentication system with JWT tokens",
      businessRequirements: "Users need secure login/logout functionality",
      technicalRequirements: "JWT tokens, bcrypt hashing, session management",
      acceptanceCriteria: [
        "Users can register with email/password",
        "Users can login with valid credentials",
        "JWT tokens expire after 24 hours",
        "Passwords are securely hashed"
      ]
    }
  }

🔸 IMPLEMENTATION PLAN OPERATIONS:
• Create implementation plan:
  {
    operation: "create",
    entity: "implementationPlan",
    data: {
      taskId: "TSK-006",
      overview: "Multi-phase authentication implementation",
      approach: "JWT-based authentication with secure password handling",
      technicalDecisions: "Use bcrypt for hashing, jsonwebtoken for JWT",
      filesToModify: [
        "src/auth/auth.service.ts",
        "src/auth/auth.controller.ts",
        "src/auth/jwt.strategy.ts"
      ],
      createdBy: "architect"
    }
  }

🔸 SUBTASK BATCH OPERATIONS (CRITICAL):
• Create multiple subtasks (Implementation Plan Batch Creation):
  {
    operation: "createMany",
    entity: "subtask",
    data: [
      {
        taskId: "TSK-006",
        planId: 4,
        name: "Setup Authentication Module",
        description: "Create auth module with service and controller",
        sequenceNumber: 1,
        status: "not-started",
        assignedTo: "senior-developer",
        estimatedDuration: "2 hours",
        batchId: "B001",
        batchTitle: "Authentication Core"
      },
      {
        taskId: "TSK-006",
        planId: 4,
        name: "Implement JWT Strategy",
        description: "Configure JWT authentication strategy",
        sequenceNumber: 2,
        status: "not-started",
        assignedTo: "senior-developer",
        estimatedDuration: "1.5 hours",
        batchId: "B001",
        batchTitle: "Authentication Core"
      },
      {
        taskId: "TSK-006",
        planId: 4,
        name: "Add Password Hashing",
        description: "Implement bcrypt password hashing",
        sequenceNumber: 3,
        status: "not-started",
        assignedTo: "senior-developer",
        estimatedDuration: "1 hour",
        batchId: "B001",
        batchTitle: "Authentication Core"
      }
    ]
  }

• Update batch status (CRITICAL for batch completion):
  {
    operation: "updateMany",
    entity: "subtask",
    where: { batchId: "B001" },
    data: {
      status: "completed",
      completedAt: "2024-01-15T14:00:00Z"
    }
  }

🔸 RESEARCH REPORT OPERATIONS:
• Create research report:
  {
    operation: "create",
    entity: "researchReport",
    data: {
      taskId: "TSK-006",
      title: "Authentication Libraries Research",
      summary: "Comparison of JWT libraries and security best practices",
      findings: "jsonwebtoken is most popular, passport-jwt for NestJS integration",
      recommendations: "Use jsonwebtoken with passport-jwt strategy",
      references: [
        "https://jwt.io/",
        "https://docs.nestjs.com/security/authentication"
      ]
    }
  }

🔸 CODE REVIEW OPERATIONS:
• Create code review report:
  {
    operation: "create",
    entity: "codeReviewReport",
    data: {
      taskId: "TSK-006",
      status: "APPROVED",
      summary: "Authentication implementation meets all requirements",
      strengths: "Clean code structure, proper error handling, comprehensive tests",
      issues: "Minor: Consider adding rate limiting",
      acceptanceCriteriaVerification: {
        "Users can register": true,
        "Users can login": true,
        "JWT tokens expire": true,
        "Passwords hashed": true
      },
      manualTestingResults: "All authentication flows tested successfully"
    }
  }

🔸 COMPLETION REPORT OPERATIONS:
• Create completion report:
  {
    operation: "create",
    entity: "completionReport",
    data: {
      taskId: "TSK-006",
      summary: "User authentication system successfully implemented",
      filesModified: [
        "src/auth/auth.service.ts",
        "src/auth/auth.controller.ts",
        "src/auth/jwt.strategy.ts",
        "src/auth/auth.module.ts"
      ],
      delegationSummary: "Task completed through architect → senior-developer → code-review workflow",
      acceptanceCriteriaVerification: {
        "registration": "implemented",
        "login": "implemented",
        "jwt_expiry": "configured",
        "password_hashing": "implemented"
      }
    }
  }

🔸 COMMENT OPERATIONS:
• Add task comment:
  {
    operation: "create",
    entity: "comment",
    data: {
      taskId: "TSK-006",
      mode: "architect",
      content: "Implementation plan ready. Focus on security best practices."
    }
  }

• Add subtask comment:
  {
    operation: "create",
    entity: "comment",
    data: {
      taskId: "TSK-006",
      subtaskId: 15,
      mode: "senior-developer",
      content: "JWT strategy implemented with proper validation"
    }
  }

🔸 DELEGATION OPERATIONS:
• Create delegation record:
  {
    operation: "create",
    entity: "delegation",
    data: {
      taskId: "TSK-006",
      fromMode: "architect",
      toMode: "senior-developer",
      delegationTimestamp: "2024-01-15T11:00:00Z"
    }
  }

🔸 WORKFLOW TRANSITION OPERATIONS:
• Create workflow transition:
  {
    operation: "create",
    entity: "workflowTransition",
    data: {
      taskId: "TSK-006",
      fromMode: "architect",
      toMode: "senior-developer",
      transitionTimestamp: "2024-01-15T11:00:00Z",
      reason: "Implementation plan complete, delegating for development"
    }
  }

🔸 RELATIONSHIP OPERATIONS:
• Create task with description:
  {
    operation: "create",
    entity: "task",
    data: {
      taskId: "TSK-007",
      name: "API Documentation",
      status: "not-started",
      taskDescription: {
        create: {
          description: "Create comprehensive API documentation",
          acceptanceCriteria: ["All endpoints documented", "Examples provided"]
        }
      }
    }
  }

• Connect existing records:
  {
    operation: "update",
    entity: "subtask",
    where: { id: 15 },
    data: {
      task: { connect: { taskId: "TSK-006" } }
    }
  }

🔸 UPSERT OPERATIONS:
• Create or update task:
  {
    operation: "upsert",
    entity: "task",
    where: { taskId: "TSK-006" },
    data: {
      name: "Updated Task Name",
      status: "in-progress"
    }
  }

🔸 BATCH TRANSACTION OPERATIONS:
• Multiple operations in single transaction:
  {
    operation: "create",
    entity: "implementationPlan",
    data: { /* plan data */ },
    batch: {
      operations: [
        {
          operation: "createMany",
          entity: "subtask",
          data: [/* subtask array */]
        },
        {
          operation: "create",
          entity: "comment",
          data: { /* comment data */ }
        }
      ]
    }
  }

🔸 DELETE OPERATIONS:
• Delete single record:
  {
    operation: "delete",
    entity: "comment",
    where: { id: 25 }
  }

• Delete multiple records:
  {
    operation: "deleteMany",
    entity: "subtask",
    where: { batchId: "B001", status: "cancelled" }
  }

💡 PERFORMANCE OPTIMIZATION TIPS:
• Use createMany instead of multiple create operations
• Use updateMany for batch status updates
• Leverage transactions for related operations
• Use select to return only needed fields
• Apply where conditions to minimize affected records
• Use upsert for idempotent operations

⚠️ BUSINESS RULE VALIDATION:
• Completed tasks must have completion date
• Subtasks must belong to valid implementation plan
• Delegation records require valid role transitions
• Task status transitions must follow workflow rules

🎯 RESPONSE FORMATS:
• "full": Complete data with all requested fields and relationships (default)
• "summary": Essential fields only with basic relationships
• "minimal": Basic information for performance
• "id-only": Just IDs for bulk operations

🔒 AUDIT TRAIL SUPPORT:
• Automatic tracking of user operations
• Reason codes for changes
• Metadata preservation for compliance
• Change history maintenance

This tool provides complete CRUD capabilities for the workflow management system with enterprise-grade performance, validation, and audit trail support.
`;
