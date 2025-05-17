# Task Description: Refactor MCP Server to align with updated tech stack

**Task ID**: TSK-002
**Task Name**: Refactor MCP Server to align with updated tech stack
**Branch**: feature/TSK-002-refactor-mcp-server

## 1. Task Overview

The primary goal of this task is to refactor the existing Workflow Manager MCP Server from its current custom TypeScript/Node.js architecture to a more robust and scalable solution based on NestJS, Prisma, and the `@rekog/mcp-nest` library. This aligns with the future architectural enhancements outlined in `memory-bank/ProjectOverview.md` and `memory-bank/TechnicalArchitecture.md`.

## 2. Current Implementation Analysis (High-Level)

The existing MCP server (`workflow-mcp-server.ts`) directly uses the `@modelcontextprotocol/sdk` and relies on a file-system based approach for data persistence (e.g., task tracking in JSON files or Markdown). Tools are likely implemented as individual modules/functions within the `tools/` directory.

A thorough analysis of the current codebase, especially `workflow-mcp-server.ts` and the contents of the `tools/` directory, is required to:
- Identify all existing MCP tools and their functionalities.
- Understand current data models and how they are persisted.
- Map out dependencies and core logic that needs to be migrated.

## 3. Target Architecture & Components

The refactored MCP server will adhere to the architecture detailed in `memory-bank/TechnicalArchitecture.md`. Key components will include:

-   **NestJS Application**: The core framework.
    -   `AppModule` as the root module.
    -   Feature modules for different concerns (e.g., a `TaskWorkflowModule`).
    -   Services (`@Injectable()`) to encapsulate business logic.
    -   Controllers (`@Controller()`) if any HTTP-based management interface is envisioned beyond MCP.
-   **Prisma**: ORM for database interaction.
    -   `schema.prisma` defining the data models (e.g., for tasks, task states).
    -   `PrismaService` for type-safe database access.
    -   Database migrations managed by Prisma.
-   **`@rekog/mcp-nest`**: For MCP integration.
    -   `McpModule` configured in the NestJS application.
    -   Existing tools refactored into NestJS services with methods decorated with `@Tool()`.
    -   Parameter validation using Zod schemas within `@Tool()` definitions.

## 4. Detailed Requirements

1.  **Setup NestJS Project**: Initialize a NestJS application structure within the existing repository or adapt the current structure.
2.  **Integrate Prisma**:
    *   Set up Prisma and define the database schema (e.g., for `Task`, `TaskHistory`, etc., to replace file-system storage).
    *   Implement `PrismaService` and a corresponding `PrismaModule`.
3.  **Integrate `@rekog/mcp-nest`**:
    *   Install and configure `@rekog/mcp-nest` within the NestJS application.
    *   Configure MCP server details (name, version, transport - likely stdio initially).
4.  **Refactor Existing Tools**:
    *   Migrate each existing MCP tool (from the current `tools/` directory and `workflow-mcp-server.ts`) into NestJS services.
    *   Define these tools using the `@Tool()` decorator from `@rekog/mcp-nest`, including their Zod schemas for parameters.
    *   Ensure all original tool functionality is preserved.
5.  **Data Persistence**:
    *   Replace file-system based data storage with Prisma and a relational database (e.g., SQLite for simplicity if appropriate, or PostgreSQL/MySQL as defined in `DeveloperGuide.md` examples).
    *   **Consider Data Migration**: Develop a strategy and potentially scripts to migrate any existing task data from the `task-tracking/` files into the new database schema, if preservation is required. This is a key area for the Architect to investigate.
6.  **Configuration**: Implement configuration management using `@nestjs/config` for database connections, MCP server settings, etc.
7.  **Testing**:
    *   Develop unit tests for NestJS services and tools.
    *   Develop integration tests to verify MCP tool functionality and database interactions.
8.  **Documentation**: Update `DeveloperGuide.md` and `TechnicalArchitecture.md` to reflect the final refactored architecture and usage patterns. (Note: Boomerang will handle final memory bank updates, but Architect should note changes needed).
9.  **Preserve Core Functionality**: The refactored server must provide at least the same level of functionality as the current one regarding task creation, context tracking, status updates, and workflow state management.

## 5. Acceptance Criteria Checklist

1.  [ ] A NestJS application structure is established for the MCP server.
2.  [ ] Prisma is integrated, with a defined schema for task management and a `PrismaService` implemented.
3.  [ ] `@rekog/mcp-nest` is integrated and configured to expose MCP tools.
4.  [ ] All MCP tools previously available in `workflow-mcp-server.ts` and the `tools/` directory are refactored into NestJS services and are fully functional via MCP requests using `@Tool()` decorators.
5.  [ ] All tool parameter validation is handled using Zod schemas within the `@Tool()` definitions.
6.  [ ] Data persistence for tasks and related information is handled by Prisma and a database, replacing the previous file-system approach.
7.  [ ] (If applicable) A data migration plan for existing task data is defined and executed, with data successfully moved to the new database.
8.  [ ] Application configuration (DB connection, etc.) is managed via NestJS's config mechanisms.
9.  [ ] Unit tests are in place for key services and tool logic.
10. [ ] Integration tests verify end-to-end MCP tool functionality with the new architecture.
11. [ ] The refactored MCP server successfully communicates via the configured MCP transport (e.g., stdio).
12. [ ] The project's `README.md` (if it contains setup/run instructions) is updated to reflect changes needed to run the new server.
13. [ ] The overall refactoring adheres to the best practices outlined in `memory-bank/DeveloperGuide.md` for NestJS and Prisma.
14. [ ] The refactored server successfully manages the lifecycle of at least one sample task through the workflow (e.g., create, update status, get context).

## 6. Implementation Guidance

-   Refer extensively to `memory-bank/TechnicalArchitecture.md` for the target architecture and `memory-bank/DeveloperGuide.md` for NestJS, Prisma, and `@rekog/mcp-nest` best practices.
-   **Incremental Refactoring**: Consider an incremental approach. For example, setting up the NestJS shell, then Prisma, then migrating one tool at a time.
-   **Tool Migration Strategy**: For each existing tool:
    1.  Identify its current parameters and logic.
    2.  Define a Zod schema for its parameters.
    3.  Create a method in a relevant NestJS service.
    4.  Decorate the method with `@Tool()`.
    5.  Adapt the tool's logic to use NestJS services (e.g., `PrismaService` for data access) and DI.
-   **Database Choice**: For initial development and testing, SQLite might be simpler if a full-fledged PostgreSQL/MySQL setup is too complex for the immediate environment, but the long-term goal should align with robust database solutions. The Architect should decide this.
-   **Potential Research Areas for Architect**:
    *   Detailed patterns for migrating existing TypeScript functions/classes to NestJS services with `@Tool()` decorators, specifically for `@rekog/mcp-nest`.
    *   Best practices for scripting data migration from a file-based structure (JSON/Markdown) to a Prisma-managed database schema.
    *   Strategies for testing MCP tools within a NestJS environment, especially mocking MCP context or transport layers if needed.

## 7. File and Component References

-   **Key input files from memory bank**:
    -   `memory-bank/ProjectOverview.md`
    -   `memory-bank/TechnicalArchitecture.md`
    -   `memory-bank/DeveloperGuide.md`
-   **Key files/directories to be refactored**:
    -   `workflow-mcp-server.ts` (main entry point to be replaced/refactored into NestJS `main.ts` and modules)
    -   `tools/` (directory containing current tool implementations)
    -   `task-tracking/` (directory for current data persistence, to be replaced by Prisma/DB)
-   **Expected output artifacts**:
    -   A refactored MCP server based on NestJS.
    -   New `prisma/schema.prisma` and migration files.
    -   Updated test suites.
    -   This task description: `task-tracking/TSK-002-Refactor_MCP_Server_to_align_with_updated_tech_stack/task-description.md`
    -   Implementation Plan by Architect: `task-tracking/TSK-002-Refactor_MCP_Server_to_align_with_updated_tech_stack/implementation-plan.md` 