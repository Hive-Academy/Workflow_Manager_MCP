# Workflow Manager MCP Server

## Project Overview

This project implements a Model Context Protocol (MCP) server for managing AI workflow automation in Cursor and other MCP-compatible clients. It provides a structured approach to task management and workflow orchestration between different AI modes following the standard MCP ecosystem pattern.

## Key Features

- **Zero Setup Required**: Just add configuration to MCP client - no manual installation
- **Self-Contained NPX Package**: Automatic dependency management with no external requirements
- **Automatic Project Isolation**: Each project gets its own database automatically (NPX)
- **Role-Based Workflow**: Structured AI coordination between specialized roles
- **Task Management**: Complete task lifecycle with status tracking and delegation
- **Implementation Planning**: Batch-based subtask organization and execution
- **Analytics & Reporting**: Comprehensive workflow analytics and progress monitoring
- **Production Ready**: NestJS + Prisma architecture with comprehensive tooling
- **MCP Ecosystem Standard**: Follows the same patterns as other MCP servers

## Setup Methods

### NPX (Recommended - Follows MCP Standard)

**Configuration Only - No Installation Required**

Add to your MCP client config:

```json
{
  "mcpServers": {
    "workflow-manager": {
      "command": "npx",
      "args": ["-y", "@hive-academy/mcp-workflow-manager"]
    }
  }
}
```

**Self-Contained Package Benefits:**

- ✅ Zero setup - just add config and it works
- ✅ Automatic dependency management (Prisma client, database migrations)
- ✅ Conditional Playwright browser installation for reports
- ✅ Environment-aware initialization (NPX, global, local installations)
- ✅ Automatic project isolation - each project gets its own database
- ✅ Always latest version
- ✅ Follows MCP ecosystem patterns (same as @modelcontextprotocol/server-memory)
- ✅ Works on clean systems without any local dependencies

**Automatic Dependency Management:**

The NPX package automatically handles:

- **Prisma Client Generation**: Generates database client on first run
- **Database Migrations**: Runs migrations automatically when needed
- **Playwright Browsers**: Installs browsers conditionally for report generation
- **Environment Detection**: Adapts behavior for NPX vs local vs global installations
  **Configuration Only - No Manual Setup Required**

Add to your MCP client config:

```json
{
  "mcpServers": {
    "workflow-manager": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "-v",
        "project-specific-workflow:/app/data",
        "--rm",
        "hiveacademy/mcp-workflow-manager"
      ]
    }
  }
}
```

**Benefits:**

- ✅ Consistent environment across team
- ✅ Production ready and scalable
- ✅ Version control with specific image tags
- ⚠️ Requires manual volume naming for project isolation

## Project Isolation

### NPX (Automatic)

```
/project-a/workflow.db  ← Project A's data
/project-b/workflow.db  ← Project B's data
/project-c/workflow.db  ← Project C's data
```

### Docker (Manual)

```json
// Project A
"args": ["run", "-i", "-v", "project-a-workflow:/app/data", "--rm", "hiveacademy/mcp-workflow-manager"]

// Project B
"args": ["run", "-i", "-v", "project-b-workflow:/app/data", "--rm", "hiveacademy/mcp-workflow-manager"]
```

## Stakeholders

- AI Modes (Boomerang, Researcher, Architect, Senior Developer, Code Review)
- End Users (Cursor IDE, Claude Desktop, VS Code users)
- Development Teams using structured AI workflows

## Technical Stack

- **Backend**: NestJS with TypeScript
- **Database**: Prisma ORM with SQLite/PostgreSQL support
- **MCP Integration**: @rekog/mcp-nest for tool exposure
- **Validation**: Zod schemas for all tool parameters
- **Reporting**: Playwright for analytics report generation
- **Transport**: STDIO (default), SSE, Streamable HTTP support

## Core Components

1. **MCP Server**: Central communication hub using @rekog/mcp-nest
2. **Domain-Based Tools**: 10 focused MCP tools organized by domain
3. **Workflow Engine**: Role-based task delegation and status management
4. **Analytics System**: Comprehensive reporting with visual dashboards
5. **Database Layer**: Prisma-managed SQLite/PostgreSQL with automatic migrations

## MCP Tools Overview

### Core Workflow Domain (5 tools)

- `task_operations` - Task lifecycle management
- `planning_operations` - Implementation planning and batch management
- `workflow_operations` - Role-based delegation and transitions
- `review_operations` - Code review and completion reports
- `research_operations` - Research reports and communication

### Query Optimization Domain (3 tools)

- `query_task_context` - Comprehensive task context retrieval
- `query_workflow_status` - Delegation and workflow status
- `query_reports` - Report queries with evidence

### Batch Operations Domain (2 tools)

- `batch_subtask_operations` - Bulk subtask management
- `batch_status_updates` - Cross-entity synchronization

## Integration Points

- **MCP Clients**: Claude Desktop, Cursor IDE, VS Code via standard MCP protocol
- **Database**: Automatic SQLite (default) or configurable PostgreSQL
- **File System**: Report generation and temporary file management
- **External Services**: Playwright for report rendering

## Current Status

The project is production-ready with:

- ✅ Complete MCP tool suite (10 domain-focused tools)
- ✅ Automatic database setup and migrations
- ✅ NPX package published and ready for use
- ✅ Docker images available on Docker Hub
- ✅ Comprehensive documentation and setup guides
- ✅ Project isolation strategies implemented
- ✅ Analytics and reporting system operational

## Verification

After adding MCP configuration:

1. Restart your MCP client
2. Check for 10+ workflow tools in your MCP client
3. Create a test task to verify functionality
4. Confirm project isolation by checking database locations

The system follows the exact same setup pattern as other MCP servers in the ecosystem, ensuring familiar and reliable operation for users.
