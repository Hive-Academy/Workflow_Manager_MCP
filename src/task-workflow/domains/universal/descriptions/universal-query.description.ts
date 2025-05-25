/**
 * Universal Query Tool Description
 * Comprehensive documentation for the query_data MCP tool
 */

export const UNIVERSAL_QUERY_DESCRIPTION = `
Universal query tool with full Prisma filtering capabilities.

🎯 REPLACES 15+ INDIVIDUAL QUERY TOOLS:
• get_task_context, list_tasks, search_tasks
• get_research_report, get_code_review_report, get_completion_report  
• task_dashboard, workflow_status, get_current_mode_for_task
• get_implementation_plan, get_subtasks, get_delegation_history
• And many more specialized query tools...

🚀 POWERFUL FEATURES:
• Advanced Prisma filtering (where, include, select, orderBy)
• Pagination and sorting with cursor-based navigation
• Aggregations and analytics (count, sum, avg, min, max)
• Performance optimizations with caching and timeouts
• Flexible response formatting (full, summary, minimal)
• Relationship traversal with nested includes
• Complex filtering with AND/OR logic and operators

📊 COMPLETE ENTITY REFERENCE (10 Core Entities):

🔹 TASK ENTITY - Main workflow tasks
   Fields: taskId, name, status, creationDate, completionDate, owner, currentMode, priority, dependencies, redelegationCount, gitBranch
   Relationships: taskDescription, implementationPlans[], subtasks[], delegationRecords[], researchReports[], codeReviews[], completionReports[], comments[], workflowTransitions[]

🔹 TASK DESCRIPTION ENTITY - Detailed specifications
   Fields: taskId, description, businessRequirements, technicalRequirements, acceptanceCriteria, createdAt, updatedAt
   Relationships: task (required)

🔹 IMPLEMENTATION PLAN ENTITY - Technical implementation plans
   Fields: id, taskId, overview, approach, technicalDecisions, filesToModify, createdAt, updatedAt, createdBy
   Relationships: task (required), subtasks[]

🔹 SUBTASK ENTITY - Granular work items
   Fields: id, taskId, planId, name, description, sequenceNumber, status, assignedTo, estimatedDuration, startedAt, completedAt, batchId, batchTitle
   Relationships: task (required), plan (required), delegationRecords[], comments[]

🔹 RESEARCH REPORT ENTITY - Research findings
   Fields: id, taskId, title, summary, findings, recommendations, references, createdAt, updatedAt
   Relationships: task (required)

🔹 CODE REVIEW REPORT ENTITY - Quality assessments
   Fields: id, taskId, status, summary, strengths, issues, acceptanceCriteriaVerification, manualTestingResults, requiredChanges, createdAt, updatedAt
   Relationships: task (required)

🔹 COMPLETION REPORT ENTITY - Task completion summaries
   Fields: id, taskId, summary, filesModified, delegationSummary, acceptanceCriteriaVerification, createdAt
   Relationships: task (required)

🔹 COMMENT ENTITY - Notes and communications
   Fields: id, taskId, subtaskId, mode, content, createdAt
   Relationships: task (required), subtask (optional)

🔹 DELEGATION RECORD ENTITY - Role transition tracking
   Fields: id, taskId, subtaskId, fromMode, toMode, delegationTimestamp, completionTimestamp, success, rejectionReason, redelegationCount
   Relationships: task (required), subtask (optional)

🔹 WORKFLOW TRANSITION ENTITY - State change tracking
   Fields: id, taskId, fromMode, toMode, transitionTimestamp, reason
   Relationships: task (required)

📋 PRACTICAL QUERY EXAMPLES:

🔸 BASIC QUERIES:
• All in-progress tasks:
  { entity: "task", where: { status: "in-progress" } }

• Tasks by priority:
  { entity: "task", where: { priority: { in: ["High", "Critical"] } }, orderBy: { createdAt: "desc" } }

• Recent tasks:
  { entity: "task", where: { creationDate: { gte: "2024-01-01T00:00:00Z" } }, orderBy: { creationDate: "desc" }, pagination: { take: 10 } }

🔸 RELATIONSHIP QUERIES:
• Task with full context:
  { 
    entity: "task", 
    where: { taskId: "TSK-001" }, 
    include: { 
      taskDescription: true, 
      implementationPlans: { 
        include: { subtasks: true } 
      }, 
      researchReports: true, 
      codeReviews: true 
    } 
  }

• Implementation plan with subtasks:
  { 
    entity: "implementationPlan", 
    where: { taskId: "TSK-001" }, 
    include: { 
      subtasks: { 
        orderBy: { sequenceNumber: "asc" },
        where: { status: { not: "cancelled" } }
      } 
    } 
  }

• Subtasks by batch:
  { 
    entity: "subtask", 
    where: { batchId: "B001" }, 
    include: { task: { select: { name: true, status: true } } },
    orderBy: { sequenceNumber: "asc" }
  }

🔸 ADVANCED FILTERING:
• Complex conditions:
  { 
    entity: "task", 
    where: { 
      AND: [
        { status: { in: ["in-progress", "needs-review"] } },
        { priority: { not: "Low" } },
        { creationDate: { gte: "2024-01-01T00:00:00Z" } }
      ]
    } 
  }

• Relationship-based filtering:
  { 
    entity: "task", 
    where: { 
      implementationPlans: { 
        some: { 
          createdBy: "architect",
          subtasks: { some: { status: "in-progress" } }
        } 
      } 
    } 
  }

🔸 AGGREGATION QUERIES:
• Task status distribution:
  { entity: "task", aggregation: { count: true, groupBy: ["status"] } }

• Priority breakdown with counts:
  { entity: "task", aggregation: { count: true, groupBy: ["priority", "status"] } }

• Average redelegation count by role:
  { entity: "task", aggregation: { avg: { redelegationCount: true }, groupBy: ["currentMode"] } }

🔸 PAGINATION EXAMPLES:
• Offset-based (simple):
  { entity: "task", pagination: { skip: 20, take: 10 }, orderBy: { createdAt: "desc" } }

• Cursor-based (efficient for large datasets):
  { entity: "task", pagination: { cursor: { taskId: "TSK-005" }, take: 10 }, orderBy: { createdAt: "desc" } }

🔸 PERFORMANCE OPTIMIZATION:
• Select specific fields only:
  { entity: "task", select: { taskId: true, name: true, status: true, priority: true } }

• Minimal response format:
  { entity: "task", format: "minimal" }

• Distinct values:
  { entity: "task", distinct: ["status", "priority"] }

🔸 WORKFLOW-SPECIFIC QUERIES:
• Current task assignments:
  { entity: "task", where: { currentMode: { not: null }, status: "in-progress" }, include: { taskDescription: { select: { description: true } } } }

• Delegation history for task:
  { entity: "delegation", where: { taskId: "TSK-001" }, orderBy: { delegationTimestamp: "desc" }, include: { task: { select: { name: true } } } }

• Recent workflow transitions:
  { entity: "workflowTransition", orderBy: { transitionTimestamp: "desc" }, pagination: { take: 20 }, include: { task: { select: { name: true } } } }

🔸 REPORTING QUERIES:
• Tasks completed this week:
  { entity: "task", where: { status: "completed", completionDate: { gte: "2024-01-15T00:00:00Z" } }, include: { completionReports: true } }

• Code review status summary:
  { entity: "codeReviewReport", aggregation: { count: true, groupBy: ["status"] } }

• Research reports by task:
  { entity: "researchReport", include: { task: { select: { name: true, status: true } } }, orderBy: { createdAt: "desc" } }

💡 PERFORMANCE TIPS:
• Use select instead of include when you only need specific fields
• Apply where conditions to minimize data transfer
• Use pagination for large result sets (take ≤ 100 for optimal performance)
• Prefer cursor-based pagination for datasets > 1000 records
• Use aggregation queries for analytics instead of fetching all records
• Cache frequently accessed data with appropriate TTL

⚠️ COMMON PATTERNS TO AVOID:
• Don't fetch all records without pagination
• Avoid deep nested includes without where conditions
• Don't use select and include together (they're mutually exclusive)
• Avoid complex aggregations on large datasets without proper indexing

🎯 RESPONSE FORMATS:
• "full": Complete data with all requested fields and relationships (default)
• "summary": Essential fields only with basic relationships
• "minimal": IDs and names only for quick reference

This tool provides complete access to the workflow management system's data layer with enterprise-grade filtering, performance optimization, and relationship traversal capabilities.
`;
