# Task Description: Streamline Workflow Rules for Reduced Verbosity and Enhanced Maintainability

**Task ID**: TSK-RULE-ENHANCE-001

## 1. Goal

Review all existing workflow rule files (currently .mdc in `.cursor/rules`) and rephrase them to reduce conversational token usage, especially around "stating intent" for MCP calls and role handoffs. The output will be a new set of `.md` files in a root directory named `enhanced-workflow-rules`.

## 2. Key Objectives

*   Preserve the core workflow logic, role responsibilities, and artifact generation as defined in the current rules.
*   Reduce verbosity in AI responses by streamlining common phrases (e.g., intent to call MCP tools, role transition announcements).
*   Improve the maintainability and readability of the rule documents by converting them to standard Markdown (`.md`).
*   Ensure the new rules remain clear, actionable for the AI, and support the overall workflow integrity.

## 3. Scope of Work

1.  **Analysis**:
    *   Identify "verbosity hotspots" in the current `.cursor/rules/*.mdc` files.
    *   Pinpoint repetitive phrasing that can be condensed.
    *   Specifically analyze patterns for:
        *   Stating intent to call `workflow-manager` tools.
        *   Role transition summaries.
        *   Delegation messages.
2.  **Redesign Phrasing**:
    *   Develop concise and standardized phrasing for the identified patterns.
    *   Ensure new phrasing still meets the informational requirements of `000-workflow-core.mdc`.
3.  **Rewrite Rules**:
    *   Systematically go through each of the following rule files (and any others identified):
        *   `000-workflow-core.mdc`
        *   `100-boomerang-role.mdc`
        *   `200-researcher-role.mdc`
        *   `300-architect-role.mdc`
        *   `400-senior-developer-role.mdc`
        *   `500-code-review-role.mdc`
        *   (Consider if `mcp-nest-integration.mdc`, `nestjs-best-practices.mdc`, `prisma-best-practices.mdc` also need adjustments in how they are referenced or if their content contributes to verbosity in interactions).
    *   Convert content to `.md` format.
    *   Save new files into a new root directory: `enhanced-workflow-rules/`.
4.  **Verification (Conceptual)**:
    *   Mentally walk through scenarios using the new rules to ensure clarity and completeness.
    *   Confirm that an AI following these rules would still perform all necessary actions.

## 5. Deliverables

*   A new folder at the project root: `enhanced-workflow-rules/`.
*   Inside this folder, a set of `.md` files corresponding to the refactored rule documents.
*   (Potentially) A brief summary document (`enhanced-workflow-rules/README.md` or similar) explaining the key changes and principles of the streamlined rules, if deemed necessary.

## 6. Non-Goals

*   Changing the fundamental responsibilities of any AI role.
*   Altering the core sequence of the workflow (e.g., Boomerang -> Architect).
*   Removing essential information required for task execution or context.

## 7. Acceptance Criteria

*   All original `.mdc` rule files from `.cursor/rules/` have a corresponding `.md` version in `enhanced-workflow-rules/`.
*   The new rules demonstrably reduce common verbose patterns (e.g., MCP call intent statements are shorter but still clear).
*   The core operational logic and requirements from the original rules are retained.
*   The new rule files are in valid Markdown format.
*   The new location for rules (`enhanced-workflow-rules/`) is established.