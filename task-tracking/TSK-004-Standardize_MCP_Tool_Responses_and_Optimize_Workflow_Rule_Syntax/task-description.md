# Task: Standardize MCP Tool Responses and Optimize Workflow Rule Syntax (TSK-004)

## 1. Overview
This task aims to enhance the efficiency and consistency of the MCP-based workflow. It involves two main parts:
1.  Standardizing the response format for all MCP tools when they encounter unchanged context or have no new information to return.
2.  Updating all workflow rule documents (`@enhanced-workflow-rules`) to use the new token-optimized MCP command syntax and operational guidelines.

## 2. Requirements

### 2.1. MCP Tool Response Standardization
-   All MCP tools that retrieve or might return cached/unchanged data must be modified.
-   When a tool determines that no changes have occurred for a given context (e.g., a context retrieval request where the data hasn't changed since the last access or a request for a non-existent/empty data slice), it **must** return a specific structured message.
-   The mandatory response format in such cases is:
    ```javascript
    return {
      content: [
        {
          type: 'text',
          text: `No changes to {contextIdentifier} context for task {taskId} since last retrieval.`, // Or similar appropriate message like "No {contextIdentifier} found for task {taskId}."
        },
        {
          type: 'text',
          text: JSON.stringify({
            unchanged: true, // Or similar flag like "empty: true" or "notFound: true"
            contextHash: currentHash, // If applicable, otherwise null
            contextType: contextIdentifier,
          })
        },
      ],
    };
    ```
    - `{contextIdentifier}`: A string identifying the type of context (e.g., "Task Status", "Implementation Plan Batch B001", "Research Report").
    - `{taskId}`: The ID of the task in question.
    - `currentHash`: The hash of the context if applicable and unchanged.
-   This applies to tools across all MCP operation services (e.g., `TaskCrudOperationsService`, `ImplementationPlanOperationsService`, `ReportOperationsService`, `ContextManagementService` if it exposes tools directly).

### 2.2. Workflow Rule Token Optimization
-   Review and update all workflow rule documents located in the project's designated rule directory (typically `@enhanced-workflow-rules` or a similar path defined in the project structure).
-   The updates must replace existing MCP tool call syntaxes with the new token-optimized versions.
-   Strictly adhere to the guidelines outlined in:
    -   Section 3 ("Adapting workflow rules for token optimization") of the `@WORKFLOW_ENHANCEMENT_SUMMARY.md` document.
    -   The specific transition examples and shorthand notations provided in the `@rules-updates-for-using-token-optimized-mcp.md` document.
-   Key changes include, but are not limited to:
    -   Adopting shorthand MCP commands: `mcp:create(...)`, `mcp:status(...)`, `mcp:note(...)`, `mcp:delegate(...)`, `mcp:context(...)`, `mcp:context_diff(...)`.
    -   Using standardized shortcodes for document references (e.g., TD, IP, RR).
    -   Using standardized shortcodes for status codes (e.g., INP, COM, NRV).
    -   Using standardized shortcodes for role codes (e.g., 🪃MB, 🏛️AR, 👨‍💻SD).
    -   Updating role transition announcement formats.
    -   Incorporating batch operation syntax and context slicing for roles like 🏛️AR and 👨‍💻SD.
-   The goal is to significantly reduce token usage and improve the clarity and maintainability of workflow rule definitions.

## 3. Acceptance Criteria

### 3.1. MCP Tool Responses
-   **AC1**: All relevant MCP tools, when encountering a scenario of unchanged or non-existent data for a requested context, return the specified structured JSON message (as `type: 'text'`) indicating this state.
-   **AC2**: The `contextIdentifier`, `taskId`, `unchanged` (or similar boolean flag), and `contextHash` (if applicable) fields in the standardized response are correctly populated.
-   **AC3**: Tools continue to function correctly for scenarios where data has changed or is found.

### 3.2. Workflow Rule Updates
-   **AC4**: All rule files within the `@enhanced-workflow-rules` directory (e.g., `000-workflow-core.md`, `100-boomerang-role.md`, `200-researcher-role.md`, `300-architect-role.md`, `400-senior-developer-role.md`, `500-code-review-role.md`) are updated.
-   **AC5**: All MCP command examples and instructions within the updated rule files use the correct shorthand notation as defined in the reference documents (`@WORKFLOW_ENHANCEMENT_SUMMARY.md`, `@rules-updates-for-using-token-optimized-mcp.md`).
-   **AC6**: Role transition formats, document references, status codes, and role codes within the rules use the prescribed shortcodes.
-   **AC7**: Batch operation descriptions and context slicing instructions (especially for Architect and Senior Developer roles) are updated to reflect the new optimized protocols.
-   **AC8**: The updated rules are internally consistent and accurately reflect the intended token-optimized workflow.

## 4. Technical Context
-   The primary files for MCP tool modifications will be within the `src/task-workflow/mcp-operations/` and `src/task-workflow/services/` directories.
-   The workflow rule files are Markdown documents located in a shared rule directory (e.g., `rules/`, `enhanced-workflow-rules/`).
-   Reference documents for syntax and guidelines: `@WORKFLOW_ENHANCEMENT_SUMMARY.md` and `@rules-updates-for-using-token-optimized-mcp.md`.

## 5. Notes
-   This task requires careful attention to detail for both code changes and documentation updates to ensure consistency and correctness.
-   The provided JavaScript snippet for the return format is a guideline; the actual implementation might involve returning an object that the MCP server framework then serializes into the correct response structure for the client. The key is that the client (e.g., Cursor) receives the specified structure.
-   It is crucial to test that the MCP server continues to operate as expected after these changes, especially the tools that are modified.
