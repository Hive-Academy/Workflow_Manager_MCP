# Universal MCP Operations - Tool Consolidation

## Overview

This module consolidates **40+ individual MCP tools** into **3 powerful, Prisma-backed tools** that leverage the full capabilities of Prisma's filtering, querying, and mutation system.

## 🎯 Consolidation Benefits

### Before: 40+ Individual Tools
- **Query Operations**: 9 tools (get_task_context, list_tasks, search_tasks, etc.)
- **CRUD Operations**: 4 tools (create_task, update_task_description, delete_task, etc.)
- **State Operations**: 4 tools (update_task_status, delegate_task, complete_task, etc.)
- **Implementation Plan Operations**: 4 tools (create_implementation_plan, add_subtask_to_batch, etc.)
- **Reporting Operations**: 13+ tools (create_research_report, generate_workflow_report, etc.)
- **Interaction Operations**: 1 tool (add_task_note)

### After: 3 Universal Tools
1. **`query_data`** - Universal querying with full Prisma filtering
2. **`mutate_data`** - Universal mutations with transaction support  
3. **`workflow_operations`** - Specialized workflow state management

## 🚀 Universal Tools

### 1. `query_data` - Universal Query Tool

**Replaces 15+ query tools** with one powerful, flexible interface.

**Key Features:**
- Full Prisma filtering (`where`, `include`, `select`, `orderBy`)
- Advanced pagination and sorting
- Aggregations and analytics
- Performance optimizations
- Flexible response formatting

**Example Usage:**
```typescript
// Get all in-progress tasks with implementation plans
{
  entity: "task",
  where: { status: "in-progress" },
  include: { 
    implementationPlans: { 
      include: { subtasks: true } 
    } 
  },
  orderBy: { createdAt: "desc" }
}

// Task analytics with grouping
{
  entity: "task",
  aggregation: { 
    count: true,
    groupBy: ["status", "priority"] 
  }
}

// Search tasks by name with pagination
{
  entity: "task",
  where: { name: { contains: "reporting" } },
  select: { id: true, name: true, status: true },
  pagination: { take: 20 }
}
```

### 2. `mutate_data` - Universal Mutation Tool

**Replaces 20+ mutation tools** with comprehensive CRUD operations.

**Key Features:**
- All CRUD operations (create, update, upsert, delete)
- Batch operations and transactions
- Relation management (connect, disconnect, create)
- Business rule validation
- Audit trail support

**Example Usage:**
```typescript
// Create task with description
{
  operation: "create",
  entity: "task",
  data: {
    id: "TSK-005",
    name: "New Feature",
    status: "not-started",
    taskDescription: {
      create: {
        description: "Implement new feature...",
        businessRequirements: "..."
      }
    }
  },
  include: { taskDescription: true }
}

// Update task status
{
  operation: "update",
  entity: "task", 
  where: { id: "TSK-001" },
  data: { 
    status: "completed",
    completedAt: "2024-01-15T10:00:00Z"
  }
}

// Batch create subtasks
{
  operation: "createMany",
  entity: "subtask",
  data: [
    { name: "Subtask 1", implementationPlanId: 1 },
    { name: "Subtask 2", implementationPlanId: 1 }
  ]
}
```

### 3. `workflow_operations` - Workflow State Management

**Replaces workflow-specific tools** with advanced state management.

**Key Features:**
- Role-based delegation with validation
- Completion with evidence tracking
- Escalation and rejection handling
- Batch workflow operations
- Conditional operations
- Audit trail and notifications

**Example Usage:**
```typescript
// Delegate task
{
  operation: "delegate",
  taskId: "TSK-001",
  fromRole: "architect", 
  toRole: "senior-developer",
  message: "Implementation plan ready. Please implement batch B001."
}

// Complete task with evidence
{
  operation: "complete",
  taskId: "TSK-001",
  fromRole: "senior-developer",
  completionData: {
    summary: "All features implemented and tested",
    filesModified: ["src/feature.ts", "tests/feature.test.ts"],
    acceptanceCriteriaVerification: { "AC1": true, "AC2": true }
  }
}

// Escalate with rejection
{
  operation: "escalate",
  taskId: "TSK-001",
  fromRole: "code-review",
  toRole: "architect",
  rejectionData: {
    reason: "Security vulnerabilities found",
    severity: "high",
    requiredChanges: "Fix input validation"
  }
}
```

## 📊 Tool Mapping

### Query Operations → `query_data`
| Old Tool | New Usage |
|----------|-----------|
| `get_task_context` | `{ entity: "task", where: { id: "TSK-001" }, include: { taskDescription: true, implementationPlans: { include: { subtasks: true } } } }` |
| `list_tasks` | `{ entity: "task", where: { status: "in-progress" }, pagination: { take: 20 } }` |
| `search_tasks` | `{ entity: "task", where: { name: { contains: "search" } } }` |
| `get_research_report` | `{ entity: "researchReport", where: { taskId: "TSK-001" } }` |
| `task_dashboard` | `{ entity: "task", aggregation: { count: true, groupBy: ["status"] } }` |

### CRUD Operations → `mutate_data`
| Old Tool | New Usage |
|----------|-----------|
| `create_task` | `{ operation: "create", entity: "task", data: { ... } }` |
| `update_task_description` | `{ operation: "update", entity: "taskDescription", where: { taskId: "TSK-001" }, data: { ... } }` |
| `delete_task` | `{ operation: "delete", entity: "task", where: { id: "TSK-001" } }` |
| `create_implementation_plan` | `{ operation: "create", entity: "implementationPlan", data: { ... } }` |

### State Operations → `workflow_operations`
| Old Tool | New Usage |
|----------|-----------|
| `delegate_task` | `{ operation: "delegate", taskId: "TSK-001", fromRole: "architect", toRole: "senior-developer" }` |
| `complete_task` | `{ operation: "complete", taskId: "TSK-001", completionData: { ... } }` |
| `update_task_status` | `{ operation: "transition", taskId: "TSK-001", newStatus: "completed" }` |

## 🔧 Implementation Strategy

### Phase 1: Deploy Universal Tools (Current)
1. ✅ Create universal schemas and services
2. ✅ Register in module system
3. ✅ Test basic functionality

### Phase 2: Migration Strategy
1. **Gradual Migration**: Keep old tools alongside new ones
2. **Update Workflow Rules**: Modify role-specific rules to use new tools
3. **Performance Testing**: Ensure new tools meet performance requirements
4. **Documentation Update**: Update all examples and guides

### Phase 3: Deprecation
1. **Mark Old Tools as Deprecated**: Add deprecation warnings
2. **Monitor Usage**: Track which old tools are still being used
3. **Complete Migration**: Update any remaining usage
4. **Remove Old Tools**: Clean up codebase

## 🎯 Benefits Achieved

### 1. **Reduced Complexity**
- From 40+ tools to 3 universal tools
- Consistent interface across all entities
- Easier to learn and maintain

### 2. **Enhanced Capabilities**
- Full Prisma filtering and querying power
- Advanced features: transactions, batching, aggregations
- Better performance optimizations

### 3. **Improved Maintainability**
- Single source of truth for data operations
- Centralized validation and business logic
- Easier to add new features

### 4. **Better Performance**
- Optimized queries with intelligent caching
- Batch operations for efficiency
- Reduced overhead from multiple tools

### 5. **Enhanced Developer Experience**
- Powerful, flexible interface
- Rich examples and documentation
- Consistent patterns across operations

## 🚀 Next Steps

1. **Test the Universal Tools**: Verify functionality with existing workflows
2. **Update Workflow Rules**: Modify role-specific instructions to use new tools
3. **Performance Benchmarking**: Compare performance with old tools
4. **Gradual Migration**: Start using new tools in new workflows
5. **Documentation**: Update all guides and examples

This consolidation represents a major improvement in our MCP architecture, providing more power with less complexity while maintaining full backward compatibility during the transition period.