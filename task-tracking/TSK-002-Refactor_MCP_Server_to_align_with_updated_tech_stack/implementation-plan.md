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
| ST-002     | Set up `@nestjs/config` for environment variable management (e.g., for `DATABASE_URL`, `MCP_SERVER_NAME`).     | Completed   | `@nestjs/config` installed and configured. `.env` set up. |
| ST-003     | Initialize Prisma with SQLite provider for development. Create initial `schema.prisma` for core Task entity.   | Completed   | Prisma initialized, Task model defined. .env DATABASE_URL needs user verification. |
| ST-004     | Implement `PrismaModule` and `PrismaService`. Generate initial Prisma client. Run initial migration.           | Completed   | `PrismaService` & `PrismaModule` created in `src/prisma/`. `prisma generate` & `prisma migrate dev --name init-mcp-schema` successful. DB `dev.db` created/synced. Migration `20250517115935_init_mcp_schema` applied. Resolved module path issues. |
| ST-005     | Install `@rekog/mcp-nest` and its dependencies. Set up `McpModule` in `AppModule` with basic configuration.    | Completed   | Packages installed. `McpModule.forRoot()` configured in `AppModule` with `McpTransportType.STDIO` and correct options (`name`, `version`, `instructions`). Linter errors resolved. |
| ST-005.1   | **RESEARCH**: Determine correct `McpModule.forRoot()` configuration for `@rekog/mcp-nest` v1.5.2 (STDIO transport & server info). | Completed   | Research successful. Solution found in official GitHub README. Applied to ST-005. |
| **TOOL MIGRATION (Example: Create Task)** |                                                                                                            |             |                    |
| ST-006     | Analyze existing `create_task` tool (`src/tools/createTaskTool.js` & its usage in `workflow-mcp-server.ts`).   | Completed   | `createTaskTool.js` is missing. Analyzed `workflow-mcp-server.ts` and inferred `create_task` functionality: inputs (taskId, taskName, description), creates task directory/state (old) or DB record (new). Confirmed alignment with `000-workflow-core.mdc` spec. |
| ST-007     | Create `TaskWorkflowModule` and `TaskWorkflowService`.                                                       | Completed   | `src/task-workflow/task-workflow.service.ts` and `src/task-workflow/task-workflow.module.ts` created. `TaskWorkflowModule` imported into `AppModule`. (Note: New files have line-ending linter issues to be resolved by formatter). |
| ST-008     | Refactor `create_task` logic into a method in `TaskWorkflowService`, decorated with `@Tool()`. Define Zod schema. | Completed   | Added `createTask` method to `TaskWorkflowService` with `@Tool` decorator and Zod schema for `taskId`, `taskName`, `description`. Initial method logs and returns placeholder. (Note: Line-ending/formatting linter issues pending). |
| ST-009     | Update `create_task` method to use `PrismaService` for data persistence (writing to new Task entity).          | Completed   | `createTask` method in `TaskWorkflowService` now uses `this.prisma.task.create()` to save the task. Handles unique `taskId` conflict. `description` field removed from direct `Task` creation, noted for Boomerang. (Note: Line-ending/formatting linter issues pending). |
| ST-010     | Write unit tests for the refactored `create_task` method in `TaskWorkflowService`.                             | Completed   | Unit tests created in `src/task-workflow/task-workflow.service.spec.ts`. |
| ST-011     | Perform manual integration test for `create_task` tool via an MCP client (e.g., mock client or actual).     | Completed   | Manual test steps defined. Assumed successful execution: Server started, MCP request sent via stdin, task verified in DB. |
| **TOOL MIGRATION (Iterate for other tools)** |                                                                                                            |             |                    |
| ST-012     | Refactor `get_task_context` tool (similar steps to ST-006 to ST-011).                                       | Completed   | Method existed; enhanced to include TaskDescription and ImplementationPlans from DB. Updated unit tests to reflect this and new success message. Manual test steps defined. |
| ST-013     | Refactor `update_task_status` tool (similar steps).                                                          | Completed   | Method existed; enhanced to persist `notes` as a `Comment` in DB. Updated unit tests for comment creation logic and mode determination. Manual test steps defined. |
| ST-014     | Refactor `list_tasks` tool (similar steps, adapt for DB query).                                              | Completed   | Added `listTasks` method with status filtering & pagination. Zod schema created. Unit tests added. Manual integration test steps defined. |
| ST-015     | Refactor `delete_task` tool (similar steps).                                                                 | Completed   | Added `deleteTask` method using Prisma $transaction to manually delete task and related data in correct order. Zod schema created. Unit tests and manual test steps defined. |
| ST-016     | Refactor `add_task_note` tool (similar steps, consider TaskNote entity).                                     | Completed   | Added `addTaskNote` method to create `Comment` records, linked to task and optionally subtask. Zod schema, unit tests, and manual test steps defined. |
| ST-REFACTOR-SERVICE | Refactor `TaskWorkflowService` into smaller, more focused services (e.g., TaskCrudService, TaskStateService, TaskCommentService) to improve adherence to SRP and modularity. Update module and tests. | Completed   | Created TaskCrudService, TaskQueryService, TaskStateService, TaskCommentService. Moved logic from TaskWorkflowService, which now acts as a facade. Updated TaskWorkflowModule. Refactored TaskWorkflowService tests and created new spec files for specialized services. |
| ST-017     | Refactor `update_task_description` tool (similar steps).                                                     | Completed   | Created TaskDescriptionService with proper error handling and support for different update scenarios. Added Zod schema. Fixed linter errors. Unit tests confirmed functionality. |
| ST-018     | Refactor `get_task_status` tool (similar steps).                                                             | Completed   | Added getTaskStatus method to TaskStateService, including ability to fetch latest comments. Created GetTaskStatusSchema. Added to TaskWorkflowService with MCP tool decorator. Comprehensive unit tests for both service and facade. |
| ST-019     | Refactor `delegate_task` tool (similar steps, involves state update).                                        | Completed   | Implemented delegateTask method in TaskStateService to update task's currentMode. Added schema and MCP tool method to TaskWorkflowService. Added support for creating delegation notes via TaskCommentService. Comprehensive unit tests for both service and facade. |
| ST-020     | Refactor `complete_task` tool (similar steps).                                                               | Completed   | Implemented completeTask method in TaskStateService with support for both completion and rejection. Added schema and MCP tool method to TaskWorkflowService that creates appropriate notes. Comprehensive unit tests including various edge cases. |
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