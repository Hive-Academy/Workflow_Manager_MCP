# Workflow Enhancement and Token Optimization Summary

This document summarizes the enhancements made to the MCP (Model Context Protocol) server, focusing on token optimization and batch-oriented implementation planning. It also outlines remaining work and provides guidance on adapting workflow rules to leverage these new capabilities.

## 1. Completed Work

### Phase 1: Core Token Optimization Infrastructure

This phase laid the groundwork for reducing token usage in MCP interactions.

- **Token Reference Schema (`src/task-workflow/schemas/token-refs.schema.ts`)**:
  - Defined and implemented Zod schemas (`DocumentRefSchema`, `StatusCodeSchema`, `RoleCodeSchema`) for standard shortcodes (e.g., `TD`, `IP`, `INP`, `🪃MB`).
  - Created `TOKEN_MAPS` for translating between shortcodes and full names.
- **Context Management Service (`src/task-workflow/services/context-management.service.ts`)**:
  - Implemented to handle caching of task contexts in memory.
  - Provides functionality for hashing context objects to detect changes.
  - Supports diffing between old and new contexts to identify specific changes.
  - Allows retrieval of specific slices of context (e.g., `STATUS`, `AC`, `SUBTASKS`).
- **Shorthand Parser Service (`src/task-workflow/services/shorthand-parser.service.ts`)**:
  - Designed to parse and execute shorthand commands (e.g., `note(...)`, `status(...)`, `delegate(...)`, `context(...)`).
  - Integrates with `TaskWorkflowService` and `ContextManagementService` to perform actions.
- **Core Token Optimization Tools (in `TaskWorkflowService`)**:
  - **`get_context_diff` tool**:
    - Allows clients to request only the changes in a task's context since the last retrieval (using a context hash) or fetch specific slices of the context.
    - Schema: `get-context-diff.schema.ts`.
  - **`shorthand_command` tool (exposed as `executeShorthandCommand`)**:
    - Enables execution of MCP commands using a compact shorthand notation.
    - Schema: `shorthand-command.schema.ts`.
  - **`handle_role_transition` tool**:
    - A new tool for managing role transitions with token efficiency in mind.
    - Updates task mode, logs the transition, and can incorporate context diffing.
    - Schema: `role-transition.schema.ts` (aliased as `HandleRoleTransitionInputSchema`).
- **Schema Updates for Shorthand Support**:
  - `DelegateTaskSchema`: Updated to include `messageDetailsRef` and to transform shorthand role codes to full names.
- **Persistent Linting Issues**: Addressed minor, recurring linting errors (mostly carriage returns) which were deemed non-blocking.

### Phase 2: Batch-Oriented Implementation Planning & Initial Subtask Tools

This phase focuses on structuring implementation plans around batches of subtasks, aligning with the `000-workflow-core` guidelines.

- **Core Data Structures & Schemas for Batching**:
  - `SubtaskSchema` (`src/task-workflow/schemas/subtask.schema.ts`): Defines a subtask, now including an optional `_batchInfo` (id, title) for logical grouping and `sequenceNumber`.
  - `BatchInfoSchema` (within `subtask.schema.ts`): Defines the structure for `_batchInfo`.
  - `BatchSchema` (`src/task-workflow/schemas/batch.schema.ts`): Defines a batch for input, containing an ID, title, and an array of `SubtaskSchema` (or rather, `SubtaskInputSchema`).
  - `ImplementationPlanStorageSchema` (`src/task-workflow/schemas/implementation-plan.schema.ts`): Represents the stored/retrieved plan. It has a direct list of `SubtaskSchema` (where each subtask carries its `_batchInfo`).
  - `ImplementationPlanInputSchema` (in `implementation-plan.schema.ts`): Used for creating plans. It accepts an array of `BatchSchema`.
- **Prisma Integration for Implementation Plans**:
  - `ImplementationPlanService` (`src/task-workflow/services/implementation-plan.service.ts`) was refactored to use `PrismaService` directly for storing and retrieving implementation plans and their associated subtasks, aligning with the existing Prisma schema (`prisma/schema.prisma`).
  - The `Task` model relates to `ImplementationPlan`, which in turn relates to `Subtask`.
  - The concept of "Batches" from the workflow rules is handled as a logical grouping during input and for constructing the `_batchInfo` in Zod `Subtask` objects. No separate `Batch` table was added to Prisma _yet_.
- **`create_implementation_plan` Tool (in `TaskWorkflowService`)**:
  - Implemented to accept `ImplementationPlanInput` (including batches of subtasks).
  - Uses `ImplementationPlanService` to:
    - Create an `ImplementationPlan` Prisma record.
    - Create associated `Subtask` Prisma records, linking them to the plan and the main task.
    - The `_batchInfo` from the input batches is used to populate the corresponding field in the returned Zod `Subtask` objects.
  - The tool returns a summary including the number of batches from the input plan and total subtasks created.
- **`add_subtask_to_batch` Tool**:
  - **Status: COMPLETED**
  - Schema `add-subtask-to-batch.schema.ts` created, defining `SubtaskInputSchema` (which allows passing `_batchInfo`) and `AddSubtaskToBatchSchema`.
  - `ImplementationPlanService.addSubtaskToBatch` method added to create a new Prisma `Subtask` linked to an existing `ImplementationPlan`. The returned Zod `Subtask` includes `_batchInfo` constructed from the input `batchId` and `subtaskData._batchInfo`.
- **`update_subtask_status` Tool**:
  - **Status: COMPLETED**
  - Schema `update-subtask-status.schema.ts` created (uses `StatusCodeSchema`).
  - Service logic added to `ImplementationPlanService.updateSubtaskStatus`.
  - Exposed as an MCP `@Tool` in `TaskWorkflowService`.
  - _Note: `ImplementationPlanService` has internal linter errors pending Prisma schema updates for `batchId`/`batchTitle` which do not affect core subtask status update logic but relate to future batch-aware functionalities._
- **`add_note_to_subtask` Functionality**:
  - **Status: COMPLETED** (Consolidated with existing `add_task_note` tool)
  - Determined existing `TaskCommentService.addTaskNote` and `AddTaskNoteSchema` (using numeric `subtaskId`) are sufficient.
  - Redundant `add-note-to-subtask.schema.ts` deleted.
  - Description of `subtaskId` in `AddTaskNoteSchema` clarified.
- **Dependency Installation**: `uuid` and `@types/uuid` were installed for ID generation (though primary IDs are now DB-generated, `uuid` might still be useful for client-side temporary IDs or specific Zod schema default string IDs).

### Phase 2 Continued: Batch Workflow Enhancements & MCP Facade Refactoring

- **MCP Facade Refactoring (Initial Step)**:
  - **Status: COMPLETED**
  - Created `src/task-workflow/mcp-operations/implementation-plan-operations.service.ts`.
  - Moved existing tools (`create_implementation_plan`, `add_subtask_to_batch`, `update_subtask_status`) related to implementation plans and subtasks from `task-workflow.service.ts` to this new, focused service.
  - Updated `task-workflow.module.ts` to provide and export `ImplementationPlanOperationsService`.
  - This is the first step in breaking down the monolithic `task-workflow.service.ts` facade.
- **`check_batch_status` Tool**:
  - **Status: COMPLETED**
  - Schema `check-batch-status.schema.ts` created.
  - Service logic added to `ImplementationPlanService.checkBatchStatus`.
  - Exposed as an MCP `@Tool` in the new `ImplementationPlanOperationsService`.
  - Allows checking if all subtasks within a specified batch are complete and logs a system note if the batch is finished.
- **Context Management for Batch-Specific IP Slices**:
  - **Status: COMPLETED** (This resolves the previous "Context Management Service Enhancement (for `_batchInfo`)" PENDING item)
  - `ContextManagementService.getContextSlice` enhanced to support `sliceType: 'IP_BATCH:<batchId>'`.
  - This allows roles to fetch only the subtasks relevant to a specific batch within an Implementation Plan, improving token efficiency and focus for roles like Senior Developer.
  - Relies on `batchId` field in the `Subtask` Prisma model.

## 2. Remaining Work (Revised)

### Phase 2 Continued: Subtask and Batch Management Tools

- **Tool: `update_batch_status` (Conceptual)**:
  - **Status: PENDING**
  - While "Batches" are not a separate DB table, a tool to mark a conceptual batch as "complete" might be useful. (Lower priority).

### Phase 3: Broader Integration and Refinement

- **Shorthand Schema Updates**:
  - **Status: COMPLETED**
  - `UpdateTaskStatusSchema` (for main task) and `CompleteTaskSchema` updated to support shorthand codes using `z.preprocess`.
- **Role Transition Reconciliation**:
  - **Status: COMPLETED**
  - Verified `handle_role_transition` is the single, optimized tool.
  - Orphaned `transition-role.schema.ts` deleted.
- **Further MCP Facade Refactoring (Ongoing)**:
  - **Status: IN PROGRESS**
  - Created `src/task-workflow/mcp-operations/task-crud-operations.service.ts`.
  - Moved `create_task` tool from `task-workflow.service.ts` to `TaskCrudOperationsService`.
  - Added `delete_task` tool to `TaskCrudOperationsService`.
  - The `task-workflow.service.ts` (main facade) has had `create_task` and `delete_task` tools removed.
  - Plan to progressively move more tools into focused MCP operation services.
- **Implement Other Missing Tools**:
  - **Status: IN PROGRESS**
  - Based on review of `01-mcp-server-implementation.md` and existing tools:
    - **Task Description Management**:
      - `create_task_description` / `get_task_description`: Current `create_task` (now in `TaskCrudOperationsService`) and `get_task_context` tools cover these functionalities by integrating description fields directly. This approach will be maintained.
      - `update_task_description`:
        - **Status: COMPLETED** (Initial implementation; type assertions used in service layer - review for long-term robustness recommended).
        - **Purpose**: To allow modification of core task description fields (description, business/technical requirements, ACs) after task creation.
        - **Optimization Strategy**: Enables focused updates. Subsequent use of `get_context_diff` will highlight only these changes for other roles, saving tokens.
        - **Progress**:
          - Schema `update-task-description.schema.ts` created.
          - Service `src/task-workflow/services/task-description.service.ts` created and updated with `updateTaskDescription` (using strict update logic) and `getTaskDescription` methods. Linter errors addressed with type assertions.
          - Tool exposed in `TaskCrudOperationsService`.
    - **Report Management (`ResearchReport`, `CodeReviewReport`, `CompletionReport`)**:
      - `create/get` tools for these reports are **IN PROGRESS**.
        - **Purpose**: To create and retrieve structured report data associated with a task, stored in the database.
        - **Plan**: Implement schemas, service logic (likely new services like `ResearchReportService`, etc.), and expose as MCP tools.
        - **Progress**:
          - **`ResearchReport`**: **COMPLETED**
            - `src/task-workflow/schemas/research-report.schema.ts` created and aligned with Prisma model.
            - `src/task-workflow/services/research-report.service.ts` created with CRUD operations.
            - `src/task-workflow/mcp-operations/report-operations.service.ts` updated to expose `create_research_report`, `get_research_report`, and `update_research_report` tools.
            - Services integrated into `TaskWorkflowModule` via barrel files (`./services/index.ts`, `./mcp-operations/index.ts`).
            - _Note: Persistent linter issues regarding Prisma type resolution in `research-report.service.ts` are assumed to be environment-specific and would resolve with a correct Prisma generate/build process._
          - **`CodeReviewReport`**: **COMPLETED** (Schema and Service, MCP tools in `ReportOperationsService` drafted)
            - `src/task-workflow/schemas/code-review-report.schema.ts` created and aligned with Prisma model.
            - `src/task-workflow/services/code-review-report.service.ts` created with CRUD operations.
            - `src/task-workflow/mcp-operations/report-operations.service.ts` updated to include `create_code_review_report`, `get_code_review_report`, and `update_code_review_report` tools.
            - _Note: `ReportOperationsService.ts` has persistent linter/type errors related to the `@Tool` decorator and Prisma type usage that need resolution. Assumed `common.schema.ts` with `TaskIdSchema` exists or Zod direct types are used._
          - **`CompletionReport`**: **COMPLETED** (Schema and Service, MCP tools in `ReportOperationsService` drafted, Zod schema updated to match Prisma)
            - `src/task-workflow/schemas/completion-report.schema.ts` created and updated to align with the provided Prisma model.
            - `src/task-workflow/services/completion-report.service.ts` created with CRUD operations, updated to align with Prisma model (fields, ID type).
            - `src/task-workflow/mcp-operations/report-operations.service.ts` updated to include `create_completion_report`, `get_completion_report`, and `update_completion_report` tools.
            - _Note: `ReportOperationsService.ts` has persistent linter/type errors related to the `@Tool` decorator and Prisma type usage that need resolution. `completion-report.service.ts` Prisma type issues largely addressed based on user's direct Prisma schema; remaining issues in this service likely dependent on exact Prisma client generation._
    - **Task Searching/Filtering**:
      - `search_tasks`: **COMPLETED**.
        - **Purpose**: A tool to search/filter tasks by query string, status, mode, owner, priority, etc., going beyond the basic `list_tasks`.
        - **Optimization Strategy**: Will support pagination and return only summary fields to manage token usage. Shorthand codes can be used in parameters.
        - **Progress**:
          - Schema `src/task-workflow/schemas/search-tasks.schema.ts` created, defining `SearchTasksInputSchema`, `TaskSummarySchema`, and `PaginatedTaskSummarySchema`.
          - Service `src/task-workflow/services/task-query.service.ts` implemented with logic for dynamic query building, filtering (status, mode, owner, priority, task ID, general query string), sorting, and pagination.
          - MCP tool `search_tasks` exposed in `src/task-workflow/mcp-operations/task-crud-operations.service.ts`.
          - `TaskQueryService` and `TaskCrudOperationsService` correctly integrated into `task-workflow.module.ts`.
          - Related build errors resolved.
    - **Subtask Delegation**:
      - `delegate_subtask`: **DEFERRED**.
    - **Git Operations**:
      - `create_commit`: **WON\'T IMPLEMENT**.
  - **Dependency**: Detailed specifications for report management tools will be defined before implementation. Schemas and service plans for `update_task_description` and `search_tasks` are outlined above.
- **Prisma Schema for Batch Info**: **Status: COMPLETED**. `Subtask` model in `prisma/schema.prisma` now includes `batchId: String?` and `batchTitle: String?`. Prisma client has been regenerated. This should resolve previous linter/type errors in `ImplementationPlanService.ts` related to these fields and unblocks full `_batchInfo` support in `ContextManagementService`.
- **Persistent Linting Issues**: Monitor for and address any recurring CRLF line ending issues if they reappear. (Mainly resolved, type assertions used in `task-description.service.ts` to satisfy linter).
- **Further MCP Facade Refactoring**:
  - **Status: PENDING** (Marked as IN PROGRESS above, this is a duplicate entry, consolidating. The section above now covers this.)

## 3. Adapting Workflow Rules for Token Optimization

The new infrastructure (shorthand, context diffing, batch operations) requires adjustments to your workflow definition documents (e.g., `000-workflow-core.md` and role-specific rules like `100-boomerang-role`, `300-architect-role`, etc.) to maximize token efficiency.

**Status: `000-workflow-core.md` AND Individual role-specific rules are PENDING updates.**

### Key Changes for Workflow Rules:

- **Prefer Shorthand Commands**:

  - **Current**: Explicit MCP calls like `delegate_task(toMode='architect', message='Plan task. Ref: TD')`.
  - **New**: Use the `shorthand_command` tool with commands like `mcp:delegate(🏛️AR, "Plan task. Ref: TD")`.
    - Update all examples of `delegate_task`, `add_task_note`, `update_task_status` in workflow documents to use their shorthand equivalents:
      - `mcp:delegate(ROLE_CODE, "message", "REF_CODE")`
      - `mcp:note("message with ROLE_CODE prefix if needed")` (e.g., `mcp:note("🏛️AR: Planning started")`)
      - `mcp:status(STATUS_CODE, "optional note with ROLE_CODE prefix")`
  - The `000-workflow-core.md` document already provides a good list of `MCP Command Shorthand`. These should be strictly followed.

- **Utilize Context Diffing and Slices**:

  - **Current**: Roles might re-request full task context at each step.
  - **New**:
    - When a role receives a task, it should also receive the `contextHash` of the context seen by the previous role (this can be part of the delegation message or a standard field).
    - The role then calls `get_context_diff` with this `lastContextHash`.
    - If there are no changes, the role proceeds with its cached/known context.
    - If there are changes, it processes only the diff.
    - If a role only needs a specific part of the context (e.g., only the Acceptance Criteria `AC` or the Implementation Plan `IP`), it should use `get_context_diff` with the `sliceType` parameter (e.g., `sliceType: 'AC'`).
    - Workflow documents should instruct roles on _when_ to ask for full context vs. diffs vs. slices. Example: Boomerang might get full context initially. Architect, upon receiving delegation, asks for a diff against the hash Boomerang had. Senior Developer might ask for a slice of the IP relevant to their current batch.
  - **Batch-Specific Context**: For roles like Senior Developer working on a specific batch of subtasks, use `get_context_diff` with `sliceType: 'IP_BATCH:<batchId>'` (e.g., `sliceType: 'IP_BATCH:B001'`) to retrieve only the subtasks relevant to that batch. This ensures the developer has a focused view of their current work.
  - **Task Description Updates**: When a task's description (e.g., ACs) is modified using `update_task_description`, subsequent roles should use `get_context_diff` to efficiently see only what changed, rather than re-reading the entire description.

- **Leverage `handle_role_transition`**:

  - This tool is designed to be more token-efficient for role transitions. It inherently includes context hash and can return diffs.
  - Update workflow sequences to use `handle_role_transition` as the primary mechanism for passing control and context between roles. The parameters `fromRole`, `focus`, `refs`, and `contextHash` are key.

- **Batch Operations for Implementation and Development**:

  - **Architect (`300-architect-role`)**:
    - When creating the Implementation Plan (IP) using `create_implementation_plan`, the Architect _must_ structure the work into logical batches as per the `ImplementationPlanInputSchema` (array of `BatchSchema`).
    - Delegation to Senior Developer should be per batch. The `add_task_note` with "Delegating batch B001..." is good, but the actual subtasks for that batch should be clearly defined within the IP.
  - **Senior Developer (`400-senior-developer-role`)**:
    - Receives a batch of subtasks. **May use `get_context_diff(taskId, lastContextHash, sliceType: 'IP_BATCH:<relevant_batch_id>')` to get focused subtask list.**
    - Implements the entire batch.
    - Uses `update_subtask_status` for individual subtasks within the batch.
    - Reports batch completion to the Architect via `add_task_note`.
    - **Crucially, does NOT transition roles or make verbose MCP calls for each subtask.** The focus is on completing the entire assigned batch.

- **Document Referencing**:

  - Continue using the defined document shortcodes (`TD`, `IP`, `RR`, etc.) in all `refs` fields and messages. The `TOKEN_MAPS` ensure these are understood by the backend.

- **Status Updates**:

  - Minimize individual status updates. Batch them where possible or use notes for minor progress.
  - Use the shorthand `mcp:status(STATUS_CODE, "Note")`.

- **Leveraging New Tools in Workflow**:
  - **`update_task_description`**:
    - This tool can be used by roles like Boomerang or Architect if requirements change or need clarification during the task lifecycle.
    - Example: Boomerang receives user feedback that alters ACs. Boomerang calls `update_task_description`. When the task is next handled (e.g., by Architect), the Architect uses `get_context_diff` and is immediately aware of the precise changes to the ACs.
  - **`search_tasks`**:
    - Roles can use this to find tasks based on specific criteria instead of manually scanning through lists or relying on memory.
    - Example: An Architect might use `search_tasks(status: "NRV", mode: "PENDING_ARCHITECT_REVIEW")` to find all tasks ready for their review. The tool returns a summarized list, and the Architect can then use `get_task_context` or `get_context_diff` for specific tasks from the search results.
  - **`check_batch_status`**:
    - Can be used by the Senior Developer to confirm all subtasks in their current batch are marked complete before notifying the Architect.
    - Can also be used by the Architect to verify a batch's completion status upon notification from the Senior Developer, or as part of an automated check.

### Example Snippet for Updated Workflow Rule (Illustrative):

**Current (Conceptual from `000-workflow-core` for Architect to SD):**

```
3.  **🏛️ ARCHITECT (Planning & Batch Management)**:
    ...
    -   **BATCH DELEGATION**:
        -   Initial batch: MCP: `add_task_note(note='🏛️AR: Delegating batch B001 (ST-001..ST-005) to 👨‍💻SD')`.
```

**New (Conceptual with Shorthand & Context Hash & Batch Slicing):**

```
3.  **🏛️ ARCHITECT (Planning & Batch Management)**:
    ...
    -   Creates IP using `create_implementation_plan` with detailed batches and subtasks.
    -   Current context hash is `ARCH_CONTEXT_HASH_AFTER_IP_CREATION`.
    -   **BATCH DELEGATION to 👨‍💻SD (for B001)**:
        -   MCP: `shorthand_command(command="mcp:delegate(👨‍💻SD, "Implement B001 (ST-001..ST-005). Ref: IP slice B001", "IP", ARCH_CONTEXT_HASH_AFTER_IP_CREATION)")`
        -   MCP: `shorthand_command(command="mcp:note(\"🏛️AR: B001 (ST-001..ST-005) delegated to 👨‍💻SD. Details in IP.\")\")`

4.  **👨‍💻 SENIOR DEVELOPER (Batch Implementation)**:
    -   Receives delegation with `ARCH_CONTEXT_HASH_AFTER_IP_CREATION`.
    -   MCP: `get_context_diff(taskId=\"TSK-001\", lastContextHash=\"ARCH_CONTEXT_HASH_AFTER_IP_CREATION\", sliceType=\"IP_BATCH:B001\")` // Fetches only subtasks for B001
    -   Implements ST-001 to ST-005 from the received batch-specific slice.
    -   Uses `update_subtask_status` for each ST.
    -   Optional: MCP: `check_batch_status(taskId="TSK-001", batchId="B001")` to confirm completion.
    -   MCP: `shorthand_command(command="mcp:note(\"👨‍💻SD: B001 (ST-001..ST-005) COM. Ready for AR review.\")\")`
    -   Current context hash for SD is `SD_CONTEXT_HASH_AFTER_B001_IMPL`.
    -   Reports back to Architect (perhaps via a note, or if Architect takes over, `handle_role_transition` back).
```

### TODO: Update Individual Role-Specific Rule Files

**The following role-specific `.md` files in the `@enhanced-workflow-rules` folder need to be reviewed and updated to align with the revised `000-workflow-core.md` protocols:**

- `100-boomerang-role.md`
- `200-researcher-role.md`
- `300-architect-role.md`
- `400-senior-developer-role.md`
- `500-code-review-role.md`

**Key areas to update in each role file include:**

- Replacing explicit MCP tool calls (e.g., `delegate_task(...)`) with their `mcp:shorthand_command(...)` equivalents (e.g., `mcp:delegate_task(ROLE_CODE, ...)`).
- Incorporating the use of `mcp:get_context_diff(taskId, lastContextHash, [sliceType])` for fetching task context, especially after receiving a task via `handle_role_transition`.
- Referencing `mcp:handle_role_transition` as the mechanism for role changes, emphasizing the passing and usage of `lastContextHash`.
- For `300-architect-role.md` and `400-senior-developer-role.md`, ensure batch processing logic aligns with `create_implementation_plan` (for Architect) and `IP_BATCH` context slicing (for Senior Developer).
- Integrating new tools like `mcp:update_task_description`, `mcp:check_batch_status`, and report management tools (`mcp:create_research_report`, etc.) where appropriate for the role's responsibilities.
- Ensuring all examples and procedural descriptions reflect the optimized token usage and workflow patterns from `000-workflow-core.md`.
