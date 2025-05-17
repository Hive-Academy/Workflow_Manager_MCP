### ST-REFACTOR-SERVICE: Refactor TaskWorkflowService into Smaller Specialized Services
-   **Status:** Completed
-   **Effort:** Large
-   **Description:** Break down the monolithic `TaskWorkflowService` into smaller, more focused services (e.g., `TaskCrudService`, `TaskQueryService`, `TaskStateService`, `TaskCommentService`). Update `TaskWorkflowModule` and the main `TaskWorkflowService` to act as a facade.
    -   `TaskCrudService` (createTask, deleteTask) - **Completed**
    -   `TaskQueryService` (getTaskContext, listTasks) - **Completed**
    -   `TaskStateService` (updateTaskStatus) - **Completed**
    -   `TaskCommentService` (addTaskNote, createCommentForStatusUpdate) - **Completed**
    -   Update `TaskWorkflowModule` - **Completed**
    -   Refactor `TaskWorkflowService` facade - **Completed**
    -   Update main facade tests - **Completed**
    -   Create new spec files for specialized services - **Completed**

### ST-017: Refactor `update_task_description` tool
-   **Status:** Completed
-   **Effort:** Medium
-   **Description:** Create `src/task-workflow/schemas/update-task-description.schema.ts`. Create a new `TaskDescriptionService` with an `updateTaskDescription` method. Integrate into the facade and module. Add unit tests.
    -   Create `update-task-description.schema.ts` - **Completed**
    -   Create `TaskDescriptionService` - **Completed**
    -   Integrate into `TaskWorkflowModule` and `services/index.ts` - **Completed**
    -   Integrate into `TaskWorkflowService` (facade) - **Completed**
    -   Add unit tests for `TaskDescriptionService` - **Completed (with outstanding linter/type issues)**
    -   Update facade tests for `updateTaskDescription` - **Completed (with outstanding linter/type issues)** 