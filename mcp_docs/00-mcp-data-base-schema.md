
# MCP Database Schema Design - Part 1

## Overview

This document outlines the SQLite database schema design for the MCP server integration with the Roocode workflow system. The schema is designed to replace the current file-based task tracking system while preserving all information and relationships.

## Database Tables

### 1. Tasks

Stores the core information about each task, replacing the entries in `task-tracking/registry.md`.

```sql
CREATE TABLE tasks (
    task_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT NOT NULL, -- 'Not Started', 'In Progress', 'In Review', 'Completed'
    creation_date TEXT NOT NULL,
    completion_date TEXT,
    owner TEXT, -- Who created or owns the task
    current_mode TEXT, -- Current mode in the workflow
    priority TEXT, -- 'Low', 'Medium', 'High', 'Critical'
    dependencies TEXT, -- JSON array of task_ids that this task depends on
    redelegation_count INTEGER DEFAULT 0,
    git_branch TEXT -- Branch associated with this task
);
```

### 2. TaskDescriptions

Replaces the `task-tracking/[taskID]-[taskName]/task-description.md` files.

```sql
CREATE TABLE task_descriptions (
    task_id TEXT PRIMARY KEY,
    description TEXT NOT NULL, -- The detailed task description
    business_requirements TEXT NOT NULL, -- Business requirements section
    technical_requirements TEXT NOT NULL, -- Technical requirements section
    acceptance_criteria TEXT NOT NULL, -- JSON array of acceptance criteria
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);
```

### 3. ImplementationPlans

Replaces the `task-tracking/[taskID]-[taskName]/implementation-plan.md` files.

```sql
CREATE TABLE implementation_plans (
    plan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id TEXT NOT NULL,
    overview TEXT NOT NULL, -- High-level overview of the implementation
    approach TEXT NOT NULL, -- Implementation approach
    technical_decisions TEXT NOT NULL, -- Key technical decisions
    files_to_modify TEXT NOT NULL, -- JSON array of files to modify
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    created_by TEXT NOT NULL, -- Which mode created this plan
    FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);
```

### 4. Subtasks

Stores the individual subtasks from the implementation plan.

```sql
CREATE TABLE subtasks (
    subtask_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id TEXT NOT NULL,
    plan_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    sequence_number INTEGER NOT NULL, -- Order of implementation
    status TEXT NOT NULL, -- 'Not Started', 'In Progress', 'In Review', 'Completed'
    assigned_to TEXT, -- Which mode is responsible for this subtask
    estimated_duration TEXT, -- Estimated time to complete
    started_at TEXT,
    completed_at TEXT,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id),
    FOREIGN KEY (plan_id) REFERENCES implementation_plans(plan_id)
);
```

### 5. DelegationRecords

Tracks the delegation history between modes.

```sql
CREATE TABLE delegation_records (
    delegation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id TEXT NOT NULL,
    subtask_id INTEGER,
    from_mode TEXT NOT NULL, -- Which mode delegated
    to_mode TEXT NOT NULL, -- Which mode received
    delegation_timestamp TEXT NOT NULL,
    completion_timestamp TEXT,
    success BOOLEAN, -- Was the delegation successful
    rejection_reason TEXT, -- If rejected, why
    redelegation_count INTEGER DEFAULT 0, -- How many times it was redelegated
    FOREIGN KEY (task_id) REFERENCES tasks(task_id),
    FOREIGN KEY (subtask_id) REFERENCES subtasks(subtask_id)
);
```

### 6. ResearchReports

Replaces the `task-tracking/[taskID]-[taskName]/research-report.md` files.

```sql
CREATE TABLE research_reports (
    report_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL, -- Executive summary
    findings TEXT NOT NULL, -- Detailed findings
    recommendations TEXT NOT NULL, -- Recommendations based on research
    references TEXT NOT NULL, -- JSON array of references
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);
```

### 7. CodeReviews

Replaces the `task-tracking/[taskID]-[taskName]/code-review.md` files.

```sql
CREATE TABLE code_reviews (
    review_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id TEXT NOT NULL,
    status TEXT NOT NULL, -- 'APPROVED', 'APPROVED WITH RESERVATIONS', 'NEEDS CHANGES'
    summary TEXT NOT NULL, -- Overall assessment
    strengths TEXT NOT NULL, -- Key strengths
    issues TEXT NOT NULL, -- Critical issues
    acceptance_criteria_verification TEXT NOT NULL, -- JSON detailing status of each criterion
    manual_testing_results TEXT NOT NULL, -- Results of manual testing
    required_changes TEXT, -- Changes needed if status is 'NEEDS CHANGES'
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);
```

### 8. CompletionReports

Replaces the `task-tracking/[taskID]-[taskName]/completion-report.md` files.

```sql
CREATE TABLE completion_reports (
    report_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id TEXT NOT NULL,
    summary TEXT NOT NULL, -- Implementation summary
    files_modified TEXT NOT NULL, -- JSON array of files modified
    delegation_summary TEXT NOT NULL, -- Summary of delegation activities
    acceptance_criteria_verification TEXT NOT NULL, -- JSON detailing fulfillment of criteria
    created_at TEXT NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);
```

### 9. MemoryBank

Stores the content of the memory bank files.

```sql
CREATE TABLE memory_bank (
    entry_id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_type TEXT NOT NULL, -- 'ProjectOverview', 'TechnicalArchitecture', 'DeveloperGuide'
    section TEXT NOT NULL, -- Section heading
    content TEXT NOT NULL, -- Content of the section
    line_start INTEGER, -- Starting line in the original file
    line_end INTEGER, -- Ending line in the original file
    last_updated TEXT NOT NULL
);
```

### 10. Commits

Tracks Git commits associated with tasks.

```sql
CREATE TABLE commits (
    commit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id TEXT NOT NULL,
    subtask_id INTEGER,
    hash TEXT NOT NULL, -- Git commit hash
    message TEXT NOT NULL, -- Commit message
    files_changed TEXT NOT NULL, -- JSON array of files changed
    commit_timestamp TEXT NOT NULL,
    author TEXT NOT NULL, -- Which mode created the commit
    FOREIGN KEY (task_id) REFERENCES tasks(task_id),
    FOREIGN KEY (subtask_id) REFERENCES subtasks(subtask_id)
);
```

### 11. Comments

Allows for discussion and notes about tasks.

```sql
CREATE TABLE comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id TEXT NOT NULL,
    subtask_id INTEGER,
    mode TEXT NOT NULL, -- Which mode left the comment
    content TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id),
    FOREIGN KEY (subtask_id) REFERENCES subtasks(subtask_id)
);
```

### 12. WorkflowTransitions

Tracks the movement of tasks between modes in the workflow.

```sql
CREATE TABLE workflow_transitions (
    transition_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id TEXT NOT NULL,
    from_mode TEXT NOT NULL,
    to_mode TEXT NOT NULL,
    transition_timestamp TEXT NOT NULL,
    reason TEXT, -- Why the transition occurred
    FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);
```

### 13. Templates

Stores templates used by the system (equivalent to files in memory-bank/templates).

```sql
CREATE TABLE templates (
    template_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE, -- Template name
    content TEXT NOT NULL, -- Template content
    description TEXT NOT NULL, -- What the template is used for
    last_updated TEXT NOT NULL
);
```

## Indexes

To optimize query performance:

```sql
-- Task and relationship lookups
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_current_mode ON tasks(current_mode);
CREATE INDEX idx_subtasks_task_id ON subtasks(task_id);
CREATE INDEX idx_subtasks_status ON subtasks(status);
CREATE INDEX idx_delegation_records_task_id ON delegation_records(task_id);
CREATE INDEX idx_delegation_records_modes ON delegation_records(from_mode, to_mode);

-- Memory bank search optimization
CREATE INDEX idx_memory_bank_file_type ON memory_bank(file_type);
CREATE INDEX idx_memory_bank_section ON memory_bank(section);

-- Full-text search for content (SQLite FTS5 extension)
CREATE VIRTUAL TABLE memory_bank_fts USING fts5(
    content,
    content='memory_bank',
    content_rowid='entry_id'
);

CREATE VIRTUAL TABLE task_descriptions_fts USING fts5(
    description, 
    business_requirements,
    technical_requirements,
    acceptance_criteria,
    content='task_descriptions',
    content_rowid='rowid'
);
```

## Triggers

For maintaining data integrity and full-text search indexes:

```sql
-- Update memory_bank_fts when memory_bank is updated
CREATE TRIGGER memory_bank_ai AFTER INSERT ON memory_bank BEGIN
    INSERT INTO memory_bank_fts(rowid, content) VALUES (new.entry_id, new.content);
END;

CREATE TRIGGER memory_bank_ad AFTER DELETE ON memory_bank BEGIN
    INSERT INTO memory_bank_fts(memory_bank_fts, rowid, content) VALUES('delete', old.entry_id, old.content);
END;

CREATE TRIGGER memory_bank_au AFTER UPDATE ON memory_bank BEGIN
    INSERT INTO memory_bank_fts(memory_bank_fts, rowid, content) VALUES('delete', old.entry_id, old.content);
    INSERT INTO memory_bank_fts(rowid, content) VALUES (new.entry_id, new.content);
END;

-- Similar triggers for task_descriptions_fts
```

## Schema Versioning

The database schema will include a version table to track schema changes and facilitate future migrations:

```sql
CREATE TABLE schema_version (
    id INTEGER PRIMARY KEY CHECK (id = 1), -- Only one row allowed
    version TEXT NOT NULL,
    last_updated TEXT NOT NULL
);
```

## Data Migration Strategy

To migrate existing data from the file-based system to the SQLite database:

1. Extract task registry information from `task-tracking/registry.md`
2. Parse each task directory to extract:
   - Task descriptions
   - Implementation plans
   - Subtasks from implementation plans
   - Research reports
   - Code reviews
   - Completion reports
3. Load memory bank files into the database, segmented by sections
4. Analyze git history to populate commit information
5. Record any workflow transitions based on task history

This migration will be performed by a dedicated script that runs as part of the initial MCP server setup.

## Database File Location

The database file will be stored in the user's project directory:

```
.roo/workflow.db
```

This location ensures that:
1. The database is project-specific
2. It's stored alongside other Roocode configuration
3. It's easily accessible from both the CLI and agent environments
