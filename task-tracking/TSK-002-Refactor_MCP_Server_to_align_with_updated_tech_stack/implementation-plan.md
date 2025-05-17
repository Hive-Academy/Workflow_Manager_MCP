# Implementation Plan: Refactor MCP Server to align with updated tech stack

**Task ID**: TSK-002
**Task Name**: Refactor MCP Server to align with updated tech stack
**Architect**: 🏛️ ARCHITECT

## 1. Technical Summary

This plan outlines the refactoring of the current MCP server (`src/workflow-mcp-server.ts` and associated tool files in `src/tools/`) to a modern architecture leveraging NestJS, Prisma, and `@rekog/mcp-nest`. The goal is to enhance modularity, scalability, maintainability, and developer experience by adopting these technologies as specified in the project's memory bank.

## 2. Overall Architectural Approach

The refactored server will be a NestJS application.
-   **Core Framework**: NestJS will provide the application structure, dependency injection, and module system.
-   **Database Interaction**: Prisma will be used as the ORM for all database operations, replacing the current file-system based storage. A relational database (e.g., SQLite for development, PostgreSQL for production) will be used.
-   **MCP Layer**: `@rekog/mcp-nest` will be integrated to expose existing and new functionalities as MCP tools, leveraging NestJS services and decorators.
-   **Modularity**: The application will be divided into logical NestJS modules (e.g., `AppModule`, `McpModule`, `TaskWorkflowModule`, `PrismaModule`).

## 3. Key Technical Decisions

1.  **Database Choice**:
    *   For initial development and local testing: **SQLite**. This simplifies setup.
    *   For production (and potentially staging/CI): **PostgreSQL**. The Prisma schema will be designed to be compatible.
2.  **Initial NestJS Module Structure**:
    *   `AppModule`: Root module.
    *   `ConfigModule` (using `@nestjs/config`): For managing environment variables and configurations.
    *   `PrismaModule`: To provide `PrismaService`.
    *   `McpModule` (from `@rekog/mcp-nest`): To configure and initialize the MCP server.
    *   `TaskWorkflowModule`: A feature module to encapsulate all logic related to task management tools (create, update, list, etc.). This module will contain the services where the refactored tools will reside.
3.  **Tool Refactoring**: Each existing tool function (e.g., from `src/tools/createTaskTool.js`) will be migrated to a method within a NestJS service (likely `TaskWorkflowService` within `TaskWorkflowModule`). These methods will be decorated with `@Tool()` and use Zod schemas for parameter validation as defined in `@rekog/mcp-nest`.
4.  **Error Handling**: Utilize NestJS built-in exception filters and create custom ones if necessary for MCP-specific errors.
5.  **Logging**: Integrate a robust logging solution within NestJS (e.g., NestJS's built-in `LoggerService` or a library like `pino`).

## 4. High-Level Refactoring Steps (Subtask Categories)

1.  **Project Setup & Core Scaffolding**: Initialize NestJS, Prisma, and essential modules.
2.  **Database Modeling & Prisma Setup**: Define schema and set up `PrismaService`.
3.  **MCP Integration Layer Setup**: Configure `@rekog/mcp-nest`.
4.  **Tool Migration**: Refactor existing tools one by one.
5.  **Data Migration (if applicable)**: Develop and execute scripts.
6.  **Testing**: Implement unit and integration tests.
7.  **Documentation Updates**: Update memory bank files.

## 5. Subtask Breakdown

This plan will be broken down into the following subtasks, which will be delegated sequentially to the 👨‍💻 Senior Developer.

*Progress will be tracked here by the Senior Developer after each subtask is completed.*

| Subtask ID | Description                                                                                                | Status      | Notes / Commit SHA |
|------------|------------------------------------------------------------------------------------------------------------|-------------|--------------------|
| **SETUP & CORE** |                                                                                                            |             |                    |
| ST-001     | Initialize NestJS application structure within the existing project. Install NestJS CLI and core dependencies. | Completed   | NestJS app at root. Build success. Dev server started. |
| ST-002     | Set up `@nestjs/config` for environment variable management (e.g., for `DATABASE_URL`, `MCP_SERVER_NAME`).     | Not Started |                    |
| ST-003     | Initialize Prisma with SQLite provider for development. Create initial `schema.prisma` for core Task entity.   | Not Started |                    |
| ST-004     | Implement `PrismaModule` and `PrismaService`. Generate initial Prisma client. Run initial migration.           | Not Started |                    |
| ST-005     | Install `@rekog/mcp-nest` and its dependencies. Set up `McpModule` in `AppModule` with basic configuration.    | Not Started |                    |
| **TOOL MIGRATION (Example: Create Task)** |                                                                                                            |             |                    |
| ST-006     | Analyze existing `create_task` tool (`src/tools/createTaskTool.js` & its usage in `workflow-mcp-server.ts`).   | Not Started |                    |
| ST-007     | Create `TaskWorkflowModule` and `TaskWorkflowService`.                                                       | Not Started |                    |
| ST-008     | Refactor `create_task` logic into a method in `TaskWorkflowService`, decorated with `@Tool()`. Define Zod schema. | Not Started |                    |
| ST-009     | Update `create_task` method to use `PrismaService` for data persistence (writing to new Task entity).          | Not Started |                    |
| ST-010     | Write unit tests for the refactored `create_task` method in `TaskWorkflowService`.                             | Not Started |                    |
| ST-011     | Perform manual integration test for `create_task` tool via an MCP client (e.g., mock client or actual).     | Not Started |                    |
| **TOOL MIGRATION (Iterate for other tools)** |                                                                                                            |             |                    |
| ST-012     | Refactor `get_task_context` tool (similar steps to ST-006 to ST-011).                                       | Not Started |                    |
| ST-013     | Refactor `update_task_status` tool (similar steps).                                                          | Not Started |                    |
| ST-014     | Refactor `list_tasks` tool (similar steps, adapt for DB query).                                              | Not Started |                    |
| ST-015     | Refactor `delete_task` tool (similar steps).                                                                 | Not Started |                    |
| ST-016     | Refactor `add_task_note` tool (similar steps, consider TaskNote entity).                                     | Not Started |                    |
| ST-017     | Refactor `update_task_description` tool (similar steps).                                                     | Not Started |                    |
| ST-018     | Refactor `get_task_status` tool (similar steps).                                                             | Not Started |                    |
| ST-019     | Refactor `delegate_task` tool (similar steps, involves state update).                                        | Not Started |                    |
| ST-020     | Refactor `complete_task` tool (similar steps).                                                               | Not Started |                    |
| ST-021     | Refactor `get_current_mode_for_task` tool (similar steps).                                                   | Not Started |                    |
| ST-022     | Refactor `continue_task` tool (similar steps).                                                               | Not Started |                    |
| ST-023     | Refactor `task_dashboard` tool (similar steps, complex query likely).                                        | Not Started |                    |
| ST-024     | Refactor `workflow_map` tool (similar steps, complex logic).                                                 | Not Started |                    |
| ST-025     | Refactor `transition_role` tool (similar steps).                                                             | Not Started |                    |
| ST-026     | Refactor `workflow_status` tool (similar steps).                                                             | Not Started |                    |
| ST-027     | Refactor `process_command` tool and its sub-logic (this is more complex, might need its own service/module or be part of `McpService`). | Not Started |                    |
| **DATA MIGRATION & FINALIZATION** |                                                                                                        |             |                    |
| ST-028     | Design and implement script/logic for migrating existing task data from file system to SQLite database (if required by Boomerang/User). | Not Started |                    |
| ST-029     | Comprehensive integration testing of all refactored tools and workflow scenarios.                             | Not Started |                    |
| ST-030     | Update project `README.md` with new setup and run instructions.                                              | Not Started |                    |
| ST-031     | (Senior Dev) Document any necessary updates for memory bank files (`DeveloperGuide.md`, `TechnicalArchitecture.md`) based on implementation details. | Not Started |                    |

## 6. Data Migration Strategy (Initial Thoughts)

-   **Assessment Needed**: First, determine if migration of existing task data from `task-tracking/*.md` or JSON files is a hard requirement.
-   **If Required**:
    1.  Analyze the structure of existing data.
    2.  Develop a script (Node.js or TypeScript, can be run via `ts-node` or as a NestJS custom command) that:
        *   Reads data from existing files.
        *   Transforms it to match the new Prisma schema.
        *   Uses `PrismaService` (or direct Prisma Client) to insert/upsert data into the new database.
    3.  This script should be idempotent if possible.
    4.  This will be a dedicated subtask (ST-028).

## 7. Testing Strategy

-   **Unit Tests**: Jest will be used. Each service method, especially tool logic and complex business logic, will have unit tests. Dependencies like `PrismaService` will be mocked.
-   **Integration Tests**:
    *   Focus on testing MCP tool execution from the perspective of `@rekog/mcp-nest`, ensuring parameters are parsed, services are called, and database interactions occur correctly.
    *   May involve setting up an in-memory SQLite database for test runs.
    *   NestJS provides utilities for testing modules and applications (`Test.createTestingModule`).
-   **Manual Testing**: Critical for verifying end-to-end MCP communication and workflow logic with a sample client or tool.

## 8. Potential Challenges & Mitigation

-   **Complexity of `process_command`**: This tool appears to have internal routing logic. It might require careful refactoring, possibly into its own NestJS service or by enhancing how `@rekog/mcp-nest` handles dynamic dispatch if possible.
-   **Ensuring Full Functionality Parity**: Thorough testing will be crucial to ensure no existing functionality is lost or broken.
-   **Data Migration Complexity**: If data migration is complex, it might need to be a separate, more detailed sub-project.

This implementation plan provides a roadmap for the refactoring effort. Each subtask will be delegated with specific instructions. 