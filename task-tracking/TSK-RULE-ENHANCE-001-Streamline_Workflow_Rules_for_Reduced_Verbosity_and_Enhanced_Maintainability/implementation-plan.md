# Implementation Plan: Streamline Workflow Rules

**Task ID**: TSK-RULE-ENHANCE-001
**Task Name**: Streamline Workflow Rules for Reduced Verbosity and Enhanced Maintainability

## 1. Overview

This plan outlines the subtasks required to review, rephrase, and rewrite the existing workflow rule files (from `.cursor/rules/*.mdc`) into a new set of streamlined `.md` files located in `enhanced-workflow-rules/`. The primary goal is to reduce conversational token usage while preserving core logic and improving maintainability.

## 2. Prerequisites

-   Access to all `.mdc` rule files in the `.cursor/rules/` directory.
-   Understanding of the `000-workflow-core.mdc` principles.

## 3. Subtasks

The process will be broken down by first establishing new condensed phrasing patterns, then applying these patterns to each rule file.

### Phase 1: Analysis and Pattern Definition

**Subtask 1.1: Analyze Existing Rules for Verbosity Hotspots**
    - **Description**: Systematically review all specified `.mdc` files to identify sections and phrases that are overly verbose, especially concerning MCP tool call intents, role transitions, and delegation messages.
    - **Files to Analyze**:
        - `000-workflow-core.mdc`
        - `100-boomerang-role.mdc`
        - `200-researcher-role.mdc`
        - `300-architect-role.mdc`
        - `400-senior-developer-role.mdc`
        - `500-code-review-role.mdc`
        - (Consider also: `mcp-nest-integration.mdc`, `nestjs-best-practices.mdc`, `prisma-best-practices.mdc` for contextual verbosity if they are frequently referenced in a way that can be streamlined).
    - **Output**: A list of identified verbosity patterns and specific examples.
    - **Assigned to**: Senior Developer
    - **Status**: Completed
    - **Note**: `verbosity-analysis.md` created in the task folder, detailing verbosity hotspots.

**Subtask 1.2: Develop Concise Phrasing Standards**
    - **Description**: Based on the analysis in Subtask 1.1, develop a set of standardized, concise phrases for common actions like:
        - Stating intent to call `workflow-manager` tools (e.g., "MCP: `create_task(...)`" or similar short, clear forms).
        - Announcing role transitions.
        - Summarizing delegation messages.
    - **Constraint**: New phrasing must maintain clarity and fulfill the informational requirements of the workflow.
    - **Output**: A document (e.g., `phrasing-guidelines.md` within the task folder) outlining the new standardized phrases with examples.
    - **Assigned to**: Senior Developer
    - **Status**: Completed
    - **Note**: `phrasing-guidelines.md` created in the task folder.

### Phase 2: Rule Rewriting and Conversion

This phase will involve rewriting each rule file. Each subtask below represents the rewriting of one rule file. The Senior Developer will apply the `phrasing-guidelines.md` created in Subtask 1.2.

**Subtask 2.1: Rewrite `000-workflow-core.mdc`**
    - **Description**: Convert `000-workflow-core.mdc` to `enhanced-workflow-rules/000-workflow-core.md`. Apply new phrasing standards.
    - **Input**: `.cursor/rules/000-workflow-core.mdc`, `phrasing-guidelines.md`
    - **Output**: `enhanced-workflow-rules/000-workflow-core.md`
    - **Assigned to**: Senior Developer
    - **Status**: Completed
    - **Note**: `enhanced-workflow-rules/000-workflow-core.md` created.

**Subtask 2.2: Rewrite `100-boomerang-role.mdc`**
    - **Description**: Convert `100-boomerang-role.mdc` to `enhanced-workflow-rules/100-boomerang-role.md`. Apply new phrasing standards.
    - **Input**: `.cursor/rules/100-boomerang-role.mdc`, `phrasing-guidelines.md`
    - **Output**: `enhanced-workflow-rules/100-boomerang-role.md`
    - **Assigned to**: Senior Developer
    - **Status**: Completed
    - **Note**: `enhanced-workflow-rules/100-boomerang-role.md` created.

**Subtask 2.3: Rewrite `200-researcher-role.mdc`**
    - **Description**: Convert `200-researcher-role.mdc` to `enhanced-workflow-rules/200-researcher-role.md`. Apply new phrasing standards.
    - **Input**: `.cursor/rules/200-researcher-role.mdc`, `phrasing-guidelines.md`
    - **Output**: `enhanced-workflow-rules/200-researcher-role.md`
    - **Assigned to**: Senior Developer
    - **Status**: Completed
    - **Note**: `enhanced-workflow-rules/200-researcher-role.md` created.

**Subtask 2.4: Rewrite `300-architect-role.mdc`**
    - **Description**: Convert `300-architect-role.mdc` to `enhanced-workflow-rules/300-architect-role.md`. Apply new phrasing standards.
    - **Input**: `.cursor/rules/300-architect-role.mdc`, `phrasing-guidelines.md`
    - **Output**: `enhanced-workflow-rules/300-architect-role.md`
    - **Assigned to**: Senior Developer
    - **Status**: Completed
    - **Note**: `enhanced-workflow-rules/300-architect-role.md` created.

**Subtask 2.5: Rewrite `400-senior-developer-role.mdc`**
    - **Description**: Convert `400-senior-developer-role.mdc` to `enhanced-workflow-rules/400-senior-developer-role.md`. Apply new phrasing standards.
    - **Input**: `.cursor/rules/400-senior-developer-role.mdc`, `phrasing-guidelines.md`
    - **Output**: `enhanced-workflow-rules/400-senior-developer-role.md`
    - **Assigned to**: Senior Developer
    - **Status**: Completed
    - **Note**: `enhanced-workflow-rules/400-senior-developer-role.md` created.

**Subtask 2.6: Rewrite `500-code-review-role.mdc`**
    - **Description**: Convert `500-code-review-role.mdc` to `enhanced-workflow-rules/500-code-review-role.md`. Apply new phrasing standards.
    - **Input**: `.cursor/rules/500-code-review-role.mdc`, `phrasing-guidelines.md`
    - **Output**: `enhanced-workflow-rules/500-code-review-role.md`
    - **Assigned to**: Senior Developer
    - **Status**: Completed
    - **Note**: `enhanced-workflow-rules/500-code-review-role.md` created.

**Subtask 2.7: Review and Potentially Rewrite Other Utility Rules**
    - **Description**: Review `mcp-nest-integration.mdc`, `nestjs-best-practices.mdc`, `prisma-best-practices.mdc`. Determine if their content needs adjustment for conciseness or if they should be converted to `.md` and included in `enhanced-workflow-rules/` for consistency. The primary focus is on rules directly governing AI role interactions.
    - **Input**: `.cursor/rules/mcp-nest-integration.mdc`, `.cursor/rules/nestjs-best-practices.mdc`, `.cursor/rules/prisma-best-practices.mdc`, `phrasing-guidelines.md`
    - **Output**: Corresponding `.md` files in `enhanced-workflow-rules/` if changes are made, or a note confirming they don't require changes.
    - **Assigned to**: Senior Developer
    - **Status**: Not Started

### Phase 3: Verification and Documentation

**Subtask 3.1: Conceptual Verification**
    - **Description**: The Architect will mentally walk through common workflow scenarios using the newly rewritten rules to ensure clarity, completeness, and that an AI could still perform all necessary actions without ambiguity.
    - **Input**: All rewritten `.md` files in `