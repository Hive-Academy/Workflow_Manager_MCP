/**
 * Universal Mutation Tool Description
 * Optimized and simplified for compatibility with Gemini
 */

export const UNIVERSAL_MUTATION_DESCRIPTION = `
Universal mutation tool for creating, updating, and deleting data.

REPLACES INDIVIDUAL MUTATION TOOLS:
• create_task, update_task_status, delete_task
• create_implementation_plan, update_subtask_status
• And many more specialized mutation tools...

FEATURES:
• All CRUD operations (create, update, upsert, delete)
• Batch operations and transactions
• Relation management (connect, disconnect, create)
• Business rule validation and referential integrity
• Comprehensive error handling and validation

MUTATION OPERATION TYPES (operation parameter):
• create - Create a single new record with relationships
• update - Update a single existing record by ID/conditions
• upsert - Create if not exists, update if exists
• delete - Delete a single record by ID/conditions
• createMany - Create multiple records in a single operation
• updateMany - Update multiple records matching conditions
• deleteMany - Delete multiple records matching conditions

ENTITY TYPES (entity parameter):
• task - Main workflow tasks
• taskDescription - Detailed specifications
• implementationPlan - Technical implementation plans
• subtask - Granular work items
• researchReport - Research findings
• codeReviewReport - Quality assessments
• completionReport - Task completion summaries
• comment - Notes and communications
• delegation - Role transition tracking
• workflowTransition - Workflow state changes
• codebaseAnalysis - Comprehensive codebase analysis results and findings

PRACTICAL EXAMPLES:

Create Task:
{
  operation: "create",
  entity: "task",
  data: {
    taskId: "TSK-123",
    name: "Implement Authentication",
    status: "not-started",
    priority: "High"
  }
}

Update Task Status:
{
  operation: "update",
  entity: "task",
  where: { taskId: "TSK-123" },
  data: {
    status: "in-progress",
    currentMode: "architect"
  }
}

Create Subtasks Batch:
{
  operation: "createMany",
  entity: "subtask",
  data: [
    {
      taskId: "TSK-123",
      planId: 4,
      name: "Setup Authentication Module",
      sequenceNumber: 1,
      status: "not-started"
    },
    {
      taskId: "TSK-123",
      planId: 4,
      name: "Implement JWT Strategy",
      sequenceNumber: 2,
      status: "not-started"
    }
  ]
}

Update Batch Status:
{
  operation: "updateMany",
  entity: "subtask",
  where: { batchId: "B001" },
  data: {
    status: "completed"
  }
}

Create With Relationships:
{
  operation: "create",
  entity: "task",
  data: {
    taskId: "TSK-123",
    name: "API Documentation",
    status: "not-started",
    taskDescription: {
      create: {
        description: "Create comprehensive API documentation"
      }
    }
  }
}

Create Codebase Analysis:
{
  operation: "create",
  entity: "codebaseAnalysis",
  data: {
    taskId: "TSK-123",
    architectureFindings: {
      moduleStructure: "Domain-driven design",
      techStack: "NestJS, Prisma, TypeScript"
    },
    problemsIdentified: {
      codeSmells: ["Large classes", "Duplicate logic"],
      technicalDebt: "High coupling in services"
    },
    implementationContext: {
      patterns: ["Repository", "Service layer", "Dependency injection"]
    },
    analyzedBy: "architect"
  }
}

Batch Transaction Operations:
{
  operation: "create",
  entity: "implementationPlan",
  data: { 
    taskId: "TSK-123",
    overview: "Authentication Implementation"
  },
  batch: {
    operations: [
      {
        operation: "createMany",
        entity: "subtask",
        data: [
          { taskId: "TSK-123", planId: 4, name: "Setup Auth Module", sequenceNumber: 1 },
          { taskId: "TSK-123", planId: 4, name: "Implement JWT", sequenceNumber: 2 }
        ]
      }
    ]
  }
}
`;
