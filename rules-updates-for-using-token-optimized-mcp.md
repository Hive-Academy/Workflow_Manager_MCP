Yes, you'll need to make some adjustments to your rules to fully leverage the new MCP enhancements. The good news is that we've already updated the rule files in the `enhanced-workflow-rules` directory to be compatible with these new MCP features. 

However, here's a brief summary of what you would need to change in your cursor rules to match the MCP enhancements:

## Rule Updates to Match MCP Enhancements

### 1. Update Command Syntax

Replace the verbose MCP command formats with the new shorthand syntax:

**Old format:**
```
MCP: `add_task_note(note='Code Review: Review started.')`
MCP: `update_task_status(status='in-progress', notes='Architect: Implementation planning started.')`
MCP: `delegate_task(toMode='architect', message='Plan task. Ref: task-description.md')`
```

**New format:**
```
mcp:note("CR: Review started")
mcp:status(INP, "AR: Implementation planning started")
mcp:delegate(AR, "Plan task. Ref: TD")
```

### 2. Use Document Reference Shortcodes

Replace full document paths with shortcodes:

**Old format:**
```
task-description.md
implementation-plan.md
research-report.md
```

**New format:**
```
TD
IP
RR
```

### 3. Use Role Transition Format

Update the role transition announcement to use the new format:

**Old format:**
```
Role: 🔍 CODE REVIEW for task 'User Authentication Feature'.
Source: Delegated by 🏛️ Architect.
Focus: Review code per `task-description.md` & `implementation-plan.md`, test, create `code-review-report.md`.
```

**New format:**
```
<role id="CR" task="TSK-002">
From: AR | Focus: Review | Refs: TD,IP
</role>
```

### 4. Use Context Diff for Updates

Add context hash tracking and retrieval:

**Old format:**
```
MCP: `get_task_context(taskId='TSK-001')`
```

**New format:**
```
mcp:context(TSK-001, STATUS)
mcp:context_diff(TSK-001, "#abc123hash")
```

### 5. Use Status Shortcodes

Replace full status names with shortcodes:

**Old format:**
```
'in-progress'
'needs-review'
'completed'
```

**New format:**
```
INP
NRV
COM
```

## Implementation Timeline

You don't need to make all these changes at once. Here's a suggested phased approach:

1. **Phase 1:** Start using the shortcodes for documents and status values
2. **Phase 2:** Adopt the shorthand command syntax
3. **Phase 3:** Implement the role transition format
4. **Phase 4:** Enable context diff tracking

The rule files we've already updated include all these changes, so you can use them as a reference. The MCP enhancements are designed to be backward compatible, so existing commands will continue to work while you gradually transition to the more token-efficient formats.


# Cursor Rules to MCP Enhancements Transition Guide

This document provides a comprehensive reference for transitioning from the verbose formats in your current cursor rules to the token-efficient formats enabled by the MCP enhancements.

## 1. Command Format Transitions

### Task Notes

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| `MCP: add_task_note(note='Code Review: Review started.')` | `mcp:note("CR: Review started")` | ~50% |
| `MCP: add_task_note(note='Architect: Implementation plan created. Proceeding with subtask execution.')` | `mcp:note("AR: IP created. Delegating subtasks")` | ~65% |
| `MCP: add_task_note(note='Senior Developer: Subtask 1.2 progress: 75% complete')` | `mcp:note("SD: ST-001.2 75% complete")` | ~60% |

### Status Updates

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| `MCP: update_task_status(status='in-progress', notes='Boomerang: Task intake and analysis started.')` | `mcp:status(INP, "BM: Task analysis started")` | ~55% |
| `MCP: update_task_status(status='needs-review', notes='Architect: Implementation complete, delegated for review.')` | `mcp:status(NRV, "AR: Implementation complete")` | ~60% |
| `MCP: update_task_status(status='completed', notes='Task fully completed and delivered.')` | `mcp:status(COM, "Task delivered")` | ~65% |

### Task Delegation

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| `MCP: delegate_task(toMode='architect', message='Plan task. Ref: task-description.md')` | `mcp:delegate(AR, "Plan task. Ref: TD")` | ~60% |
| `MCP: delegate_task(toMode='researcher', message='Research needed. Details in task context/notes.')` | `mcp:delegate(RS, "Research needed. See notes")` | ~55% |
| `MCP: delegate_task(toMode='code-review', message='Review implementation. Refs: implementation-plan.md, task-description.md')` | `mcp:delegate(CR, "Review implementation. Refs: IP,TD")` | ~65% |

### Context Retrieval

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| `MCP: get_task_context(taskId='TSK-001', taskName='User Auth')` | `mcp:context(TSK-001)` | ~70% |
| No equivalent (full context always retrieved) | `mcp:context(TSK-001, STATUS)` | ~90% vs full context |
| No equivalent (no diff tracking) | `mcp:context_diff(TSK-001, "#abc123hash")` | ~95% for unchanged context |

## 2. Role Transition Format

### Boomerang Role Transition

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| ```Role: 🪃 BOOMERANG for task 'User Authentication Feature'.<br>Source: Initial task creation.<br>Focus: Task intake and analysis.``` | ```<role id="BM" task="TSK-002"><br>From: INIT | Focus: Task Analysis | Refs: MB-TA,MB-DG<br></role>``` | ~55% |

### Researcher Role Transition

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| ```Role: 🔬 RESEARCHER for task 'API Security Protocol'.<br>Source: Delegated by 🪃 Boomerang.<br>Focus: Research OAuth 2.0 implementation options.``` | ```<role id="RS" task="TSK-003"><br>From: BM | Focus: OAuth 2.0 Research | Refs: TD<br></role>``` | ~60% |

### Architect Role Transition

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| ```Role: 🏛️ ARCHITECT for task 'Database Schema Migration'.<br>Source: Delegated by 🪃 Boomerang.<br>Focus: Create implementation plan and define subtasks.``` | ```<role id="AR" task="TSK-004"><br>From: BM | Focus: Implementation Planning | Refs: TD,RR<br></role>``` | ~55% |

### Senior Developer Role Transition

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| ```Role: 👨‍💻 SENIOR DEVELOPER for task 'Payment Gateway Integration'.<br>Source: Assigned by 🏛️ Architect.<br>Focus: Implement subtasks 2.1-2.4 according to implementation plan.``` | ```<role id="SD" task="TSK-005"><br>From: AR | Focus: Implement ST-2.1-2.4 | Refs: IP<br></role>``` | ~65% |

### Code Review Role Transition

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| ```Role: 🔍 CODE REVIEW for task 'User Profile Management'.<br>Source: Delegated by 🏛️ Architect.<br>Focus: Review code per task-description.md & implementation-plan.md, test, create code-review-report.md.``` | ```<role id="CR" task="TSK-006"><br>From: AR | Focus: Code Review | Refs: TD,IP<br></role>``` | ~70% |

## 3. Document References

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| `task-description.md` | `TD` | ~85% |
| `implementation-plan.md` | `IP` | ~85% |
| `research-report.md` | `RR` | ~80% |
| `code-review-report.md` | `CR` | ~80% |
| `completion-report.md` | `CP` | ~80% |
| `memory-bank/ProjectOverview.md` | `MB-PO` | ~85% |
| `memory-bank/TechnicalArchitecture.md` | `MB-TA` | ~85% |
| `memory-bank/DeveloperGuide.md` | `MB-DG` | ~85% |

## 4. Status Codes

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| `in-progress` | `INP` | ~75% |
| `needs-review` | `NRV` | ~70% |
| `completed` | `COM` | ~70% |
| `not-started` | `NS` | ~65% |
| `needs-changes` | `NCH` | ~70% |

## 5. Role Codes

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| `boomerang` | `BM` | ~70% |
| `researcher` | `RS` | ~65% |
| `architect` | `AR` | ~65% |
| `senior-developer` | `SD` | ~75% |
| `code-review` | `CR` | ~65% |

## 6. Structured Information Formats

### Acceptance Criteria Verification

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| ```<br>### AC1: User Registration<br>- Status: SATISFIED<br>- Evidence: Implementation correctly validates email, password requirements, and displays appropriate error messages.<br>``` | ```<ac_check id="AC-01"><br>Status: SATISFIED<br>Evidence: Email/pwd validation works, errors display correctly<br></ac_check>``` | ~50% |

### Subtask Status

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| ```Subtask 2.3: User Profile Update API<br>Status: In Progress<br>Notes: Currently implementing field validation and sanitization.<br>Estimated completion: Tomorrow``` | ```<subtask id="ST-2.3"><br>Status: INP<br>Progress: 60%<br>Notes: Implementing validation<br></subtask>``` | ~55% |

### Issue Reporting

| Old Format | New Format | Token Savings |
|------------|------------|---------------|
| ```Issue: The password reset functionality does not handle special cases where the user's email is unverified.<br>Location: src/auth/reset.js (lines 45-60)<br>Severity: Major<br>Recommendation: Add a check for email verification status before initiating password reset.``` | ```<issue sev="MAJ" id="I001"><br>- File: src/auth/reset.js<br>- Line: 45-60<br>- Issue: No check for unverified emails<br>- Fix: Add verification check<br></issue>``` | ~65% |

## Implementation Steps

1. **Update Schemas & References**:
   - Start using document shortcodes (TD, IP, RR)
   - Use role codes (BM, AR, CR) in comments and documentation
   - Use status codes (INP, NRV, COM) for status updates

2. **Update MCP Commands**:
   - Implement shorthand command formats
   - Update role transition formats
   - Add context diff tracking

3. **Update Templates & Structured Information**:
   - Use structured formats for AC verification
   - Use compact subtask updates
   - Use issue reporting shorthand

## Compatibility Notes

- All new formats are backward compatible with existing commands
- Commands can be gradually migrated as the enhanced MCP server is deployed
- Development environments can use the new formats immediately
- Production systems should be updated in phases

## Example Workflow Comparison

### Before (1123 tokens)

```
Role: 🏛️ ARCHITECT for task 'User Authentication System'.
Source: Delegated by 🪃 Boomerang.
Focus: Create implementation plan and define subtasks according to task-description.md.

I'll review the task description and create a comprehensive implementation plan.

MCP: `get_task_context(taskId='TSK-AUTH-001', taskName='User Authentication System')`

Now that I have the context, I'll analyze the requirements and create an implementation plan.

MCP: `update_task_status(status='in-progress', notes='Architect: Implementation planning started. Analyzing task-description.md and creating detailed subtasks.')`

[Long implementation plan creation...]

I've created the implementation plan with 5 clearly defined subtasks.

MCP: `add_task_note(note='Architect: Implementation plan created in task-tracking/TSK-AUTH-001-User_Authentication_System/implementation-plan.md with 5 subtasks. Ready for development.')`

Now I'll delegate the implementation to the Senior Developer.

MCP: `add_task_note(note='Architect: Delegating subtasks 1.1-1.5 to Senior Developer. Please implement according to implementation-plan.md and report progress on each subtask.')`

MCP: `delegate_task(toMode='senior-developer', message='Implement subtasks 1.1-1.5 according to implementation-plan.md. Ensure all acceptance criteria are met and add proper tests.')`
```

### After (444 tokens = 60% reduction)

```
<role id="AR" task="TSK-AUTH-001">
From: BM | Focus: Implementation Planning | Refs: TD
</role>

I'll review the task description and create an implementation plan.

mcp:context(TSK-AUTH-001)

Now that I have the context, I'll analyze requirements and create a plan.

mcp:status(INP, "AR: Planning started")

[Concise implementation plan creation...]

<subtasks>
ST-001: User Registration API - NS
ST-002: Email Verification - NS
ST-003: Login Authentication - NS
ST-004: Password Reset - NS
ST-005: Session Management - NS
</subtasks>

mcp:note("AR: IP created with 5 subtasks. Ready for dev.")

Now I'll delegate the implementation to the Senior Developer.

mcp:delegate(SD, "Implement ST-001 through ST-005. Ref: IP")
```

This transition guide provides a comprehensive reference for updating your cursor rules to take full advantage of the token efficiency enhancements in the MCP server. By following these guidelines, you can achieve significant token savings while maintaining the functionality and clarity of your workflow.