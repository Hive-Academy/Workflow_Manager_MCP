# Phrasing Guidelines for Streamlined Workflow Rules

**Task ID**: TSK-RULE-ENHANCE-001

This document outlines new, concise phrasing standards for common patterns in workflow rules. The goal is to reduce verbosity while maintaining clarity and ensuring the AI can unambiguously interpret and act upon the instructions.

## Guiding Principles

1.  **Clarity over Brevity (if conflict)**: While the goal is conciseness, the instruction must remain crystal clear to the AI.
2.  **Prefix for MCP Calls**: Use a short, consistent prefix like "MCP:" to denote an intended MCP tool call.
3.  **Essential Parameters Only**: For MCP calls, assume `taskId` and `taskName` are in context if the AI is already working on a specific task. Only list them if they are different from the current context or for initiation calls like `create_task`. Other parameters that are variable should be listed.
4.  **Structured Delegation**: For `delegate_task` messages, use key-value pairs or a very brief summary if the full context is in an accessible document.
5.  **Direct Imperatives**: Use direct imperative mood for instructions where appropriate (e.g., "Announce role: [Role Name]").
6.  **Assume AI Context**: The AI should be aware of its current role and the task it's working on. Repetitive self-identification or stating obvious current states can be reduced.

## Standardized Phrasing Changes

Here are "Before" and "After" examples based on patterns identified in `verbosity-analysis.md`.

### 1. Stating Intent for MCP Tool Calls

**Pattern Category**: General MCP tool call intent.

**Before (General Example):**
```
The [Role Name] should state its intent to request the `workflow-manager` MCP server to execute the `[tool_name]` tool with parameters `param1='value1'`, `param2='value2'`, ...
```

**After (General Guideline):**
Use a prefix and list only essential, non-contextual, or variable parameters. Assume `taskId` and `taskName` are in active context unless specified.

**After (Specific Examples):**

*   **`create_task` (taskId, taskName not yet in context)**
    *   **Before**: Boomerang should state its intent to request the `workflow-manager` MCP server to execute the `create_task` tool with parameters `taskId`, `taskName`, and `description` after an initial assessment.
    *   **After**: MCP: `create_task(taskId='[taskId_value]', taskName='[taskName_value]', description='[description_value]')`. (Boomerang: Initial task creation.)
    *   *Rationale*: `taskId`, `taskName` are being defined here. `description` is variable. Brief note for human reader.

*   **`get_task_context`**
    *   **Before**: For existing tasks, it should state its intent to request the `workflow-manager` MCP server to execute the `get_task_context` tool with parameters `taskId` and `taskName`.
    *   **After**: MCP: `get_task_context(taskId='[taskId_value]', taskName='[taskName_value]')`. (AI Action: Retrieve full task details.)
    *   *Rationale*: `taskId` and `taskName` are necessary to specify which context.

*   **`update_task_status` (taskId, taskName assumed in context)**
    *   **Before**: The Architect should state its intent to request the `workflow-manager` MCP server to execute the `update_task_status` tool with parameters `taskId`, `taskName`, `status='in-progress'`, and `notes='Architect: Implementation planning started.'`.
    *   **After**: MCP: `update_task_status(status='in-progress', notes='Architect: Implementation planning started.')`.
    *   *Rationale*: `status` and `notes` are the key variables. `taskId` and `taskName` are assumed from the current task context.

*   **`add_task_note` (taskId, taskName assumed in context)**
    *   **Before**: The Code Review role should state its intent to request the `workflow-manager` MCP server to execute the `add_task_note` tool with parameters `taskId`, `taskName`, and `note='Code review complete. Status: [APPROVED/NEEDS CHANGES]. Report: code-review-report.md'`.
    *   **After**: MCP: `add_task_note(note='Code Review: Complete. Status: [STATUS]. Report: code-review-report.md')`.

*   **`delegate_task` (fromMode assumed by AI's current role, taskId/taskName assumed in context)**
    *   **Before**: Boomerang should state its intent to request the `workflow-manager` MCP server to execute the `delegate_task` tool with parameters `taskId`, `taskName`, `toMode='architect'`, and `message='Task ready for implementation planning, see task-description.md'`.
    *   **After**: MCP: `delegate_task(toMode='architect', message='Plan task. Ref: task-description.md')`.
    *   *Rationale*: `fromMode` is current role. `message` is significantly shortened.

*   **`process_command`**
    *   **Before**: The AI will state its intent to request the `workflow-manager` MCP server to execute the `process_command` tool with parameters `command_string='/role [role-name] [taskId]'`.
    *   **After**: MCP: `process_command(command_string='/role [role-name] [taskId]')`.

### 2. Role Transition Summaries and Delegation Messages

**Pattern Category**: Content of the `message` parameter in `delegate_task` and general role handoff announcements.

*   **Delegation Message Content (in `delegate_task`)**
    *   **Before**: Long, multi-line formatted strings detailing context, acceptance criteria, paths to documents (e.g., Boomerang to Architect delegation message in `100-boomerang-role.mdc`).
    *   **After (Guideline)**: The `message` field should be very concise, pointing to key documents or actions. E.g., "Review `task-description.md`. Plan implementation." or "Research complete. See `research-report.md`." The receiving role will be responsible for fetching full context using `get_task_context` and reading relevant documents.
    *   **Example (Architect to Code Review)**:
        *   **Before Message**: `'Implementation complete, ready for review. See implementation-plan.md and task-description.md'`
        *   **After Message**: `'Review implementation. Refs: implementation-plan.md, task-description.md'`

*   **Role Handoff Announcement (AI's conversational output after delegation)**
    *   **Before**:
        ```
        The task '[taskName]' has been delegated to me for Code Review.

        Previously, the 🏛️ Architect orchestrated the implementation based on the plan in `implementation-plan.md`.

        As the 🔍 CODE REVIEW role, I will now:
        - Thoroughly review the codebase against the task description and implementation plan.
        - ...
        ```
    *   **After**:
        ```
        Role: 🔍 CODE REVIEW for task '[taskName]'.
        Source: Delegated by 🏛️ Architect.
        Focus: Review implementation per `task-description.md` and `implementation-plan.md`, conduct tests, create `code-review-report.md`.
        Next: MCP: `add_task_note(note='Code Review: Review started.')`
        ```
    *   *Rationale*: More structured, less conversational, but still provides key context points. Assumes core role responsibilities are defined elsewhere (in the role-specific rule itself).

### 3. Repetitive Instructional Phrasing

**Pattern Category**: Repeated phrases within a sequence of instructions.

*   **Example (`100-boomerang-role.mdc`, Final Git Operations)**
    *   **Before**:
        ```
        - Stage All Changes: Execute: `git add .` (Confirm success).
        - Create Final Commit:
          - Construct commit message: `chore([TaskID]): ...`
          - Execute: `git commit -m "..."` (Confirm success).
        - Push Branch to Remote: Execute: `git push origin ...` (Confirm success).
        ```
    *   **After (Guideline)**: List commands directly. Confirmation of success can be an implicit expectation of the AI managing the execution, or a general instruction elsewhere can state "Report any command failures immediately."
    *   **After (Example)**:
        ```
        - Git: `add .`
        - Git: `commit -m "chore([TaskID]): finalize TSK-[TaskID] - [TaskName]"`
        - Git: `push origin [current_branch_name]`
        (AI Note: Report any command failures to the user.)
        ```
    *   *Rationale*: Uses a prefix "Git:" for clarity. Removes repetitive "(Confirm success)". Adds a general instruction for the AI.

### 4. Explicit Parameter Enumeration (Revisited for Context)

As covered in point 1, if `taskId` and `taskName` are firmly in the AI's current working context, they don't need to be restated in every MCP call *within the rule text*. The AI, when actually forming the tool call, would naturally include them if the tool's schema requires them. The rules should guide *what variable information* to pass.

### 5. Checklist Verbosity

**Pattern Category**: Long checklists in rule files.

*   **Before**: Extensive markdown checklists directly in rule files (e.g., Boomerang's "Task Delegation Checklist").
*   **After (Guideline)**:
    *   Keep checklists if they are *actionable instructions* the AI must verbally confirm or step through.
    *   If they are more for internal process adherence or a "definition of done" for a phase, they could be moved to a separate appendix or a `PROCESS_CHECKS.md` type document referenced by the rule, rather than inline.
    *   Alternatively, condense them into higher-level verification statements in the rule. Example: "Verify all task delegation prerequisites are met (see Appendix A.1 for checklist)."
*   **This is a structural change rather than just phrasing.** Decision here depends on how the AI is expected to use these checklists. For now, we'll assume minor phrasing changes if they remain inline, e.g., making items more concise.

## Application Notes

-   When rewriting rules, these new phrasings should be applied consistently.
-   The core logic and sequence of operations in the original rules MUST be preserved.
-   The emoji indicators for roles (🪃, 🏛️, etc.) should be retained for conversational clarity.
-   The goal is to make the rules themselves more token-efficient for the AI to process, which should translate to more concise AI responses when it explains its intended actions based on these rules.

This document provides the primary guidelines. Specific application during rule rewriting will require careful judgment to ensure no loss of critical information.
