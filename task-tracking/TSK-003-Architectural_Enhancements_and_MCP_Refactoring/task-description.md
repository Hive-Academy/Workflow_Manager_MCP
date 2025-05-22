# Task Description: TSK-003 - Architectural Enhancements and MCP Refactoring

## 1. Goals
- Systematically review and refactor the `task-workflow.service.ts` facade.
- Progressively move MCP tools from `task-workflow.service.ts` into dedicated, focused services within the `src/task-workflow/mcp-operations/` directory.
- Ensure the codebase adheres to SOLID principles, particularly SRP, by creating services with single, well-defined responsibilities.
- Apply TypeScript, NestJS, and MCP-Nest best practices throughout the refactoring process.
- Improve code organization and maintainability.

## 2. Scope
### 2.1. MCP Facade Refactoring (`task-workflow.service.ts`)
The following tools are candidates for migration from `task-workflow.service.ts` to specialized services. Each migrated tool should be removed from `task-workflow.service.ts`.

**Target Service: `TaskCrudOperationsService` (or new `TaskQueryOperationsService` if more appropriate)**
- `get_task_context`
- `list_tasks`
- `get_task_status`
- `get_current_mode_for_task`
- `task_dashboard`
- `workflow_map` (Consider if it fits CRUD/Query or needs a `WorkflowInfoService`)
- `workflow_status` (Consider if it fits CRUD/Query or needs a `WorkflowInfoService`)
- `get_context_diff` (Consider if it fits CRUD/Query or needs a `ContextManagementService` at MCP level)
- `continue_task` (Analyze dependencies: if primarily data retrieval, then here. If state changes, see below)

**Target Service: New `TaskStateOperationsService` (or combine with existing if semantically fitting)**
- `update_task_status`
- `delegate_task`
- `complete_task`
- `handle_role_transition`

**Target Service: New `TaskInteractionOperationsService` (or combine)**
- `add_task_note`
- `process_command`
- `shorthand_command`

### 2.2. Service Creation and Module Updates
- Create new service files in `src/task-workflow/mcp-operations/` as needed (e.g., `task-state-operations.service.ts`, `task-interaction-operations.service.ts`).
- Ensure all new and existing MCP operation services are correctly:
    - Decorated with `@Injectable()`.
    - Import necessary dependencies (business logic services from `src/task-workflow/services/`, schemas, etc.).
    - Exported from an `index.ts` file in `src/task-workflow/mcp-operations/`.
    - Provided and potentially exported in `TaskWorkflowModule` (`src/task-workflow/task-workflow.module.ts`).
- The main `TaskWorkflowService` facade should be updated to inject and call these new specialized services, or its methods removed if the tool is fully migrated.

### 2.3. File/Folder Organization
- Primarily focus on organizing services within `mcp-operations`.
- No major top-level folder restructuring is planned unless a strong need is identified during refactoring.

### 2.4. Best Practices Application
- **SRP**: Ensure each service has a single responsibility.
- **DRY**: Avoid code duplication.
- **Explicit Typing**: Use specific types, avoid `any`. Define explicit return types for all methods. Type Promises correctly.
- **Async/Await**: Use consistently for asynchronous operations.
- **Error Handling**: Ensure consistent and specific error handling.
- **Imports**: Organize imports.
- **NestJS Conventions**: Follow module and service conventions.
- **MCP-Nest Conventions**: Correct usage of `@Tool` decorator and Zod schemas for parameters.

## 3. Acceptance Criteria (AC)
- AC-1: All MCP tools listed in Scope 2.1 are successfully migrated from `task-workflow.service.ts` to their respective specialized MCP operation services.
- AC-2: Migrated tools are removed from `task-workflow.service.ts`. The facade either calls the new services or has the methods removed entirely.
- AC-3: New MCP operation services are created, organised in `src/task-workflow/mcp-operations/`, and correctly integrated into the `TaskWorkflowModule`.
- AC-4: The application compiles and all existing tests (if any are affected) pass after refactoring. (Note: Test creation/update for new services is ideal but might be a follow-up task if extensive).
- AC-5: Code consistently applies best practices outlined in Scope 2.4.
- AC-6: A review of the changes confirms improved code organization and adherence to SRP.
- AC-7: The `task-crud-operations.service.ts` is reviewed, and any tools that are *also* still in `task-workflow.service.ts` (e.g. `update_task_description`, `search_tasks`) are rationalized (i.e., removed from the facade).

## 4. Out of Scope
- Implementing new features not related to architectural refactoring.
- Major changes to the business logic within the services in `src/task-workflow/services/` (unless required for facade refactoring).
- Extensive new test writing (focus is on refactoring and ensuring existing functionality isn't broken).

## 5. High-Level Plan (Initial thoughts for Architect)
1. Create/update necessary MCP operation service files (e.g., `task-state-operations.service.ts`, `task-interaction-operations.service.ts`).
2. Sequentially migrate tools from `task-workflow.service.ts` to the new/updated services:
    a. Copy tool method and `@Tool` decorator.
    b. Update imports and dependencies in the new service.
    c. Remove/refactor the method in `task-workflow.service.ts`.
    d. Update `task-workflow.module.ts` with new providers.
3. Review and refactor `task-crud-operations.service.ts` to ensure no overlap with the facade.
4. Perform a general best practices pass on the modified files.
5. Test the application.

## 6. Memory Bank References
- `memory-bank/ProjectOverview.md`: Confirms strategic direction towards modularity with NestJS.
- `memory-bank/TechnicalArchitecture.md`: Outlines current NestJS/Prisma architecture, emphasizing modular services.
- `memory-bank/DeveloperGuide.md`: Guides on NestJS patterns, MCP tool implementation.

## 7. Component Analysis
- Primarily affects `src/task-workflow/task-workflow.service.ts`.
- Involves creation/modification of services in `src/task-workflow/mcp-operations/`.
- Requires updates to `src/task-workflow/task-workflow.module.ts`.
- May touch `src/task-workflow/schemas/` if new Zod schemas are needed for refined tool parameters (unlikely for this refactoring task).
- May touch `src/task-workflow/services/` if interfaces or underlying business logic needs slight adjustments for cleaner separation (aim to minimize).

## 8. Stakeholders
- AI Modes (primarily Architect, Senior Developer, Code Review who will interact with the refactored MCP layer).
- Developers maintaining the workflow system.
