# Verbosity Analysis for Workflow Rules

**Task ID**: TSK-RULE-ENHANCE-001

This document outlines the key areas of verbosity identified in the current `.mdc` workflow rule files. The goal is to pinpoint patterns that can be streamlined to reduce conversational token usage.

## 1. Stating Intent for MCP Tool Calls

This is the most significant source of verbosity.

**Current Pattern Example (`000-workflow-core.mdc` for Boomerang):**
```
Boomerang should state its intent to request the `workflow-manager` MCP server to execute the `create_task` tool with parameters `taskId`, `taskName`, and `description` after an initial assessment.
```

**Observations:**
- The phrase "should state its intent to request the `workflow-manager` MCP server to execute the" is repeated for every MCP tool call.
- Parameters are explicitly listed, adding to length.
- This pattern is ubiquitous across all rule files when `workflow-manager` tools are invoked (`create_task`, `get_task_context`, `update_task_status`, `add_task_note`, `delegate_task`, `process_command`).

**Example from `100-boomerang-role.mdc` (Research Delegation):**
```
Next, Boomerang should state its intent to request the `workflow-manager` MCP server to execute the `add_task_note` tool with parameters `taskId` (current `taskId`), `taskName` (current `taskName`), and `note` containing the full detailed research request...
Then, Boomerang should state its intent to request the `workflow-manager` MCP server to execute the `process_command` tool with parameters `command_string='/research [concise_topic_summary] [taskId]'`...
```

## 2. Role Transition Summaries and Delegation Messages

Delegation messages, especially those templated in role-specific files, are often lengthy and repeat contextual information.

**Current Pattern Example (`000-workflow-core.mdc` for Architect to Code Review):**
```
The Architect should state its intent to request the `workflow-manager` MCP server to execute the `delegate_task` tool with parameters `taskId`, `taskName`, `toMode='code-review'`, and `message='Implementation complete, ready for review. See implementation-plan.md and task-description.md'`.
```

**Observations:**
- The `message` payload in `delegate_task` can be very long.
- Role-specific files (`100-boomerang-role.mdc`, `300-architect-role.mdc`) define multi-line, highly detailed message templates for delegation, which contribute significantly to token count if the AI needs to "state" this full message as part of its intent.
    - Example: Boomerang's delegation to Architect in `100-boomerang-role.mdc` (section 10) involves a large formatted string.
    - Example: Architect returning to Boomerang in `300-architect-role.mdc` also has a detailed message template.

## 3. Repetitive Instructional Phrasing

Common instructions within roles sometimes use repetitive phrasing.

**Current Pattern Example (`100-boomerang-role.mdc`, Final Git Operations):**
```
- Ask the user: "All task-related work, including memory bank updates, is complete. Am I clear to commit all changes on branch '[current_branch_name]' and push to the remote repository?"
- **STOP** if the user indicates they are not ready. Wait for their go-ahead.
- Stage All Changes: Execute: `git add .` (Confirm success).
- Create Final Commit:
  - Construct commit message: `chore([TaskID]): finalize TSK-[TaskID] - [TaskName]`
  - Execute: `git commit -m "chore([TaskID]): finalize TSK-[TaskID] - [TaskName]"` (Confirm success).
- Push Branch to Remote: Execute: `git push origin [current_branch_name]` (Confirm success).
```
**Observations:**
- The parenthetical "(Confirm success)" or similar boilerplate could be implied or handled differently.
- Phrases like "The [Role] should state its intent to..." are repeated.

## 4. Explicit Parameter Enumeration for MCP Calls

While good for explicit instruction, listing all parameters for each "intent to call" statement significantly adds to length.

**Current Pattern Example (`000-workflow-core.mdc` for Architect):**
```
The Architect should state its intent to request the `workflow-manager` MCP server to execute the `update_task_status` tool with parameters `taskId`, `taskName`, `status='in-progress'`, and `notes='Architect: Implementation planning started.'`.
```
**Observations:**
- If the AI is already in the context of a specific `taskId` and `taskName`, explicitly repeating them for every call might be redundant if a more concise convention can be established.

## 5. Introductory/Explanatory Text in Role Handoff Announcements

The protocol for announcing a role change includes a summary that, while clear, could be condensed.

**Current Pattern Example (`000-workflow-core.mdc`):**
```
The task '[taskName]' has been delegated to me for Code Review.

Previously, the 🏛️ Architect orchestrated the implementation based on the plan in `implementation-plan.md`.

As the 🔍 CODE REVIEW role, I will now:
- Thoroughly review the codebase against the task description and implementation plan.
- Perform mandatory manual testing.
- Create `code-review-report.md`.
- Report my findings (Approved / Needs Changes) back to the Architect by stating my intent to request the `workflow-manager` MCP server to execute the `add_task_note` tool.
```
**Observations:**
- The "Previously..." and "As the [ROLE] role, I will now:" sections are informative but might be partially inferable by the AI once the role transition is announced if the role's core responsibilities are well-defined and consistently followed.

## 6. Checklist Verbosity

Checklists in role-specific files (e.g., Boomerang's "Task Delegation Checklist", "Final Delivery Checklist") are comprehensive but add to the overall token count of the rules an AI might process.

**Example (`100-boomerang-role.mdc`):**
```markdown
#### Task Delegation Checklist

- [ ] Memory bank verification and analysis completed successfully
- [ ] Source code analysis completed
... many more items ...
```
**Observations:**
- While important for process adherence, if these are primarily for the AI's internal verification, their direct inclusion in conversational rule text could be reviewed.

## Conclusion

The most impactful areas for token reduction are the phrasing around MCP tool call intents and the detailed delegation messages. Streamlining these two areas will likely yield the largest savings. Other areas offer minor optimization opportunities. The challenge is to reduce verbosity without losing clarity or critical instructional information.
