/**
 * Universal Query Tool Description
 * Optimized and simplified for compatibility with Gemini
 */

export const UNIVERSAL_QUERY_DESCRIPTION = `
Universal query tool with Prisma filtering capabilities.

REPLACES INDIVIDUAL QUERY TOOLS:
• get_task_context, list_tasks, search_tasks
• get_research_report, get_code_review_report, get_completion_report  
• And many more specialized query tools...

FEATURES:
• Advanced Prisma filtering (where, include, select, orderBy)
• Pagination and sorting with cursor-based navigation
• Aggregations and analytics (count, sum, avg, min, max)
• Relationship traversal with nested includes
• Complex filtering with AND/OR logic and operators

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

Basic Queries:
• All in-progress tasks:
  { entity: "task", where: { status: "in-progress" } }

• Tasks by priority:
  { entity: "task", where: { priority: { in: ["High", "Critical"] } } }

• Recent tasks:
  { entity: "task", where: { creationDate: { gte: "2024-01-01T00:00:00Z" } } }

Relationship Queries:
• Task with full context:
  { 
    entity: "task", 
    where: { taskId: "TSK-001" }, 
    include: { 
      taskDescription: true, 
      implementationPlans: { include: { subtasks: true } }
    } 
  }

• Implementation plan with subtasks:
  { 
    entity: "implementationPlan", 
    where: { taskId: "TSK-001" }, 
    include: { subtasks: { orderBy: { sequenceNumber: "asc" } } }
  }

Advanced Filtering:
• Complex conditions:
  { 
    entity: "task", 
    where: { 
      AND: [
        { status: { in: ["in-progress", "needs-review"] } },
        { priority: { not: "Low" } }
      ]
    } 
  }

Aggregation Queries:
• Task status distribution:
  { entity: "task", aggregation: { count: true, groupBy: ["status"] } }

Pagination Examples:
• Offset-based:
  { entity: "task", pagination: { skip: 20, take: 10 } }
`;
