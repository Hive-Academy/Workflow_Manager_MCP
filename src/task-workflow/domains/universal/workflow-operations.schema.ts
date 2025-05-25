import { z } from 'zod';

/**
 * Workflow Operations Schema - Specialized workflow state management and transitions
 * Handles complex workflow transitions, delegations, and role-based operations
 *
 * 🎯 COMPLETE WORKFLOW REFERENCE:
 * This schema provides comprehensive workflow state management with role-based delegation,
 * completion tracking, escalation handling, and batch workflow operations.
 *
 * 🚀 CRITICAL WORKFLOW OPERATIONS:
 * - delegate: Essential for role-based task handoffs with validation
 * - complete: Critical for task completion with evidence tracking
 * - transition: Important for status changes with workflow validation
 * - escalate: Necessary for handling blockers and quality issues
 */

// ===== WORKFLOW OPERATION DEFINITIONS =====

/**
 * 📋 WORKFLOW OPERATION TYPES:
 *
 * 🔹 CORE WORKFLOW OPERATIONS:
 * - 'delegate': Hand off task/subtask from one role to another (ESSENTIAL for workflow)
 * - 'complete': Mark task/operation as completed with evidence (CRITICAL for closure)
 * - 'transition': Change task status with workflow validation (IMPORTANT for state management)
 *
 * 🔹 ESCALATION & MANAGEMENT:
 * - 'escalate': Escalate issues, blockers, or quality concerns (NECESSARY for problem resolution)
 * - 'reassign': Change task assignment within same role or to different role
 * - 'pause': Temporarily halt work on task (preserves context for resumption)
 * - 'resume': Resume paused work (restores previous context and state)
 * - 'cancel': Cancel task entirely (requires proper cleanup and notification)
 *
 * 💡 WORKFLOW OPERATION BENEFITS:
 * - Role Validation: Ensures proper role transitions and permissions
 * - State Consistency: Maintains workflow state integrity across operations
 * - Audit Trail: Complete tracking of all workflow changes and decisions
 * - Evidence Tracking: Documents completion criteria and verification results
 */
export const WorkflowOperationSchema = z.enum([
  'delegate', // 🚀 CRITICAL: Role-based task handoffs
  'complete', // 🚀 CRITICAL: Task completion with evidence
  'transition', // 🔄 IMPORTANT: Status changes with validation
  'escalate', // ⚠️ NECESSARY: Issue escalation and problem resolution
  'reassign', // 🔄 Role reassignment within workflow
  'pause', // ⏸️ Temporary work suspension
  'resume', // ▶️ Resume paused work
  'cancel', // ❌ Task cancellation with cleanup
]);

/**
 * 📋 WORKFLOW ROLE DEFINITIONS:
 *
 * 🔹 ROLE HIERARCHY & RESPONSIBILITIES:
 * - 'boomerang': Task intake, analysis, research evaluation, final delivery (ENTRY/EXIT point)
 * - 'researcher': In-depth research, knowledge gathering, option evaluation (KNOWLEDGE specialist)
 * - 'architect': Technical planning, implementation design, subtask creation (DESIGN specialist)
 * - 'senior-developer': Code implementation, testing, technical execution (IMPLEMENTATION specialist)
 * - 'code-review': Quality assurance, manual testing, approval/rejection (QUALITY specialist)
 *
 * 🔹 TYPICAL DELEGATION FLOW:
 * boomerang → researcher → boomerang → architect → senior-developer → architect → code-review → boomerang
 *
 * 🔹 ROLE TRANSITION RULES:
 * - Each role has specific entry/exit criteria
 * - Delegation requires proper handoff documentation
 * - Role validation ensures appropriate skill matching
 * - Escalation paths defined for each role transition
 */
export const WorkflowRoleSchema = z.enum([
  'boomerang', // 🪃 ENTRY/EXIT: Task coordination and delivery
  'researcher', // 🔬 KNOWLEDGE: Research and analysis
  'architect', // 🏛️ DESIGN: Technical planning and architecture
  'senior-developer', // 👨‍💻 IMPLEMENTATION: Code development and testing
  'code-review', // 🔍 QUALITY: Review and validation
]);

/**
 * 📋 TASK STATUS DEFINITIONS:
 *
 * 🔹 WORKFLOW STATUS PROGRESSION:
 * - 'not-started': Initial state, awaiting role assignment
 * - 'in-progress': Active work in progress by assigned role
 * - 'needs-review': Work completed, awaiting quality review
 * - 'completed': All work finished and approved
 * - 'needs-changes': Review identified issues requiring fixes
 * - 'paused': Work temporarily suspended (preserves context)
 * - 'cancelled': Task terminated (requires cleanup)
 *
 * 🔹 STATUS TRANSITION RULES:
 * - not-started → in-progress (via delegation)
 * - in-progress → needs-review (via completion)
 * - needs-review → completed (via approval)
 * - needs-review → needs-changes (via rejection)
 * - needs-changes → in-progress (via reassignment)
 * - Any status → paused/cancelled (via management operations)
 */
export const TaskStatusSchema = z.enum([
  'not-started', // 🆕 Initial state
  'in-progress', // 🔄 Active work
  'needs-review', // 👀 Awaiting review
  'completed', // ✅ Finished and approved
  'needs-changes', // 🔧 Requires modifications
  'paused', // ⏸️ Temporarily suspended
  'cancelled', // ❌ Terminated
]);

export const WorkflowOperationsSchema = z.object({
  operation: WorkflowOperationSchema.describe(
    '🔄 WORKFLOW OPERATION TYPE - The specific workflow action to perform:\n\n' +
      '🚀 CRITICAL OPERATIONS:\n' +
      '- "delegate": Hand off task from current role to target role (ESSENTIAL)\n' +
      '- "complete": Mark work as completed with evidence and verification (CRITICAL)\n' +
      '- "transition": Change task status with proper workflow validation\n\n' +
      '⚠️ MANAGEMENT OPERATIONS:\n' +
      '- "escalate": Escalate issues, blockers, or quality concerns\n' +
      '- "reassign": Change task assignment (same or different role)\n' +
      '- "pause": Temporarily suspend work (preserves context)\n' +
      '- "resume": Resume paused work (restores context)\n' +
      '- "cancel": Terminate task entirely (requires cleanup)',
  ),

  taskId: z
    .string()
    .describe(
      '🎯 TASK IDENTIFIER - The unique task ID to operate on:\n\n' +
        '📋 TASK ID FORMAT:\n' +
        '- Standard format: "TSK-001", "TSK-002", etc.\n' +
        '- Must exist in the system before workflow operations\n' +
        '- Used for tracking across all workflow transitions\n\n' +
        '📋 EXAMPLES:\n' +
        '- "TSK-005": Current documentation enhancement task\n' +
        '- "TSK-003": Integration testing implementation task',
    ),

  // Role and delegation management with comprehensive examples
  fromRole: WorkflowRoleSchema.optional().describe(
    '👤 SOURCE ROLE - Role performing the workflow operation:\n\n' +
      '🔹 DELEGATION PATTERNS:\n' +
      '- "boomerang": Initial task assignment or final completion\n' +
      '- "researcher": Research completion, returning findings\n' +
      '- "architect": Implementation plan completion, delegating to developer\n' +
      '- "senior-developer": Code completion, delegating to review\n' +
      '- "code-review": Review completion, returning to architect or boomerang\n\n' +
      '🔹 VALIDATION RULES:\n' +
      '- Must match current task assignment role\n' +
      '- Required for delegation and completion operations\n' +
      '- Used for permission validation and audit trail',
  ),

  toRole: WorkflowRoleSchema.optional().describe(
    '🎯 TARGET ROLE - Destination role for delegation/transition:\n\n' +
      '🔹 COMMON DELEGATION FLOWS:\n' +
      '- boomerang → researcher: "Need research on technology options"\n' +
      '- boomerang → architect: "Ready for technical planning"\n' +
      '- architect → senior-developer: "Implementation plan ready"\n' +
      '- senior-developer → architect: "Code complete, ready for review delegation"\n' +
      '- architect → code-review: "Implementation complete, needs quality review"\n' +
      '- code-review → boomerang: "Review complete, task ready for delivery"\n\n' +
      '🔹 ESCALATION FLOWS:\n' +
      '- Any role → boomerang: "Escalating blocker or major issue"\n' +
      '- code-review → architect: "Needs significant changes"\n' +
      '- senior-developer → architect: "Technical blocker or design issue"',
  ),

  // Status management with workflow validation
  newStatus: TaskStatusSchema.optional().describe(
    '📊 NEW STATUS - Target status for transition operations:\n\n' +
      '🔹 STATUS TRANSITION PATTERNS:\n' +
      '- "not-started" → "in-progress": Via delegation to active role\n' +
      '- "in-progress" → "needs-review": Via completion operation\n' +
      '- "needs-review" → "completed": Via approval from code-review\n' +
      '- "needs-review" → "needs-changes": Via rejection from code-review\n' +
      '- "needs-changes" → "in-progress": Via reassignment for fixes\n\n' +
      '🔹 MANAGEMENT TRANSITIONS:\n' +
      '- Any status → "paused": Via pause operation\n' +
      '- "paused" → previous status: Via resume operation\n' +
      '- Any status → "cancelled": Via cancel operation',
  ),

  // Operation context with comprehensive documentation
  message: z
    .string()
    .optional()
    .describe(
      '💬 OPERATION MESSAGE - Context and reason for the workflow operation:\n\n' +
        '🔹 DELEGATION MESSAGES:\n' +
        '- "Research complete. Key findings: [summary]. Ready for architecture."\n' +
        '- "Implementation plan ready. Please implement batch B001."\n' +
        '- "Code complete. All subtasks finished. Ready for review."\n' +
        '- "Review complete. Status: APPROVED. Ready for delivery."\n\n' +
        '🔹 COMPLETION MESSAGES:\n' +
        '- "Task completed successfully. All acceptance criteria met."\n' +
        '- "Research findings documented. Recommendations provided."\n' +
        '- "Implementation complete. Manual testing passed."\n\n' +
        '🔹 ESCALATION MESSAGES:\n' +
        '- "Blocking issue: API dependency not available."\n' +
        '- "Quality concern: Security vulnerability identified."\n' +
        '- "Resource constraint: Requires additional expertise."',
    ),

  metadata: z
    .record(z.any())
    .optional()
    .describe(
      '📋 OPERATION METADATA - Additional structured data for workflow operations:\n\n' +
        '🔹 DELEGATION METADATA:\n' +
        '- { "batchId": "B001", "priority": "high", "estimatedDuration": "2 hours" }\n' +
        '- { "researchScope": "technology-evaluation", "deadline": "2024-01-20" }\n' +
        '- { "reviewType": "security-focused", "criticalPath": true }\n\n' +
        '🔹 COMPLETION METADATA:\n' +
        '- { "testsRun": 15, "coveragePercent": 95, "performanceMetrics": {...} }\n' +
        '- { "filesModified": 8, "linesAdded": 245, "linesRemoved": 12 }\n' +
        '- { "acceptanceCriteriaMet": 5, "additionalFeatures": 2 }\n\n' +
        '🔹 ESCALATION METADATA:\n' +
        '- { "severity": "high", "impactedFeatures": ["auth", "api"], "blockerType": "dependency" }\n' +
        '- { "qualityIssues": 3, "securityConcerns": 1, "performanceImpact": "medium" }',
    ),

  // Completion data with comprehensive evidence tracking
  completionData: z
    .object({
      summary: z
        .string()
        .describe(
          'Comprehensive summary of completed work:\n' +
            '- What was accomplished and how\n' +
            '- Key technical decisions and implementations\n' +
            '- Challenges overcome and solutions applied\n' +
            '- Quality measures taken and results achieved',
        ),
      filesModified: z
        .array(z.string())
        .optional()
        .describe(
          'Complete list of files modified during work:\n' +
            '- Source code files with specific changes\n' +
            '- Configuration files updated\n' +
            '- Documentation files created/modified\n' +
            '- Test files added or updated',
        ),
      acceptanceCriteriaVerification: z
        .record(z.any())
        .optional()
        .describe(
          'Detailed verification of acceptance criteria:\n' +
            '- JSON object mapping each criterion to verification result\n' +
            '- Evidence and proof for each criterion met\n' +
            '- Test results and validation outcomes\n' +
            '- Manual verification steps performed',
        ),
      evidence: z
        .record(z.any())
        .optional()
        .describe(
          'Supporting evidence for completion claims:\n' +
            '- Screenshots of working functionality\n' +
            '- Test execution results and logs\n' +
            '- Performance metrics and benchmarks\n' +
            '- Code review feedback and resolutions',
        ),
    })
    .optional()
    .describe(
      '✅ COMPLETION DATA - Comprehensive evidence for task completion:\n\n' +
        '🔹 REQUIRED FOR COMPLETION OPERATIONS:\n' +
        '- summary: Clear description of what was accomplished\n' +
        '- acceptanceCriteriaVerification: Proof each criterion was met\n' +
        '- evidence: Supporting documentation and test results\n\n' +
        '🔹 COMPLETION EXAMPLES:\n' +
        '- Research: { summary: "Technology evaluation complete", evidence: { sources: [...], analysis: {...} } }\n' +
        '- Development: { summary: "Feature implemented", filesModified: [...], acceptanceCriteriaVerification: {...} }\n' +
        '- Review: { summary: "Quality review complete", evidence: { testResults: {...}, securityScan: {...} } }',
    ),

  // Rejection/escalation data with detailed issue tracking
  rejectionData: z
    .object({
      reason: z
        .string()
        .describe(
          'Clear, specific reason for rejection or escalation:\n' +
            '- Technical issues identified and their impact\n' +
            '- Quality standards not met and specific gaps\n' +
            '- Blockers encountered and their severity\n' +
            '- Requirements misunderstanding or scope issues',
        ),
      requiredChanges: z
        .string()
        .optional()
        .describe(
          'Specific changes required to resolve issues:\n' +
            '- Detailed action items with clear expectations\n' +
            '- Technical specifications for fixes needed\n' +
            '- Quality improvements required\n' +
            '- Additional work scope or clarifications needed',
        ),
      severity: z
        .enum(['low', 'medium', 'high', 'critical'])
        .optional()
        .describe(
          'Issue severity level for prioritization:\n' +
            '- "low": Minor issues, cosmetic fixes\n' +
            '- "medium": Moderate issues affecting functionality\n' +
            '- "high": Significant issues blocking progress\n' +
            '- "critical": Severe issues requiring immediate attention',
        ),
      blockers: z
        .array(z.string())
        .optional()
        .describe(
          'Specific blocking issues preventing progress:\n' +
            '- External dependencies not available\n' +
            '- Technical limitations or constraints\n' +
            '- Resource or expertise gaps\n' +
            '- Conflicting requirements or unclear specifications',
        ),
    })
    .optional()
    .describe(
      '⚠️ REJECTION/ESCALATION DATA - Detailed issue documentation:\n\n' +
        '🔹 REQUIRED FOR ESCALATION OPERATIONS:\n' +
        '- reason: Clear explanation of the problem\n' +
        '- severity: Impact level for proper prioritization\n' +
        '- blockers: Specific issues preventing progress\n\n' +
        '🔹 ESCALATION EXAMPLES:\n' +
        '- Technical: { reason: "API dependency unavailable", severity: "high", blockers: ["external-service-down"] }\n' +
        '- Quality: { reason: "Security vulnerabilities found", severity: "critical", requiredChanges: "Fix XSS issues" }\n' +
        '- Scope: { reason: "Requirements unclear", severity: "medium", blockers: ["stakeholder-clarification-needed"] }',
    ),

  // Workflow constraints with comprehensive validation options
  constraints: z
    .object({
      allowSkipValidation: z
        .boolean()
        .optional()
        .default(false)
        .describe(
          'Allow skipping standard workflow validation:\n' +
            '- false (default): Enforce all validation rules\n' +
            '- true: Skip validation for emergency operations',
        ),
      forceTransition: z
        .boolean()
        .optional()
        .default(false)
        .describe(
          'Force workflow transition even if conditions not met:\n' +
            '- false (default): Respect workflow rules\n' +
            '- true: Override validation for critical situations',
        ),
      notifyStakeholders: z
        .boolean()
        .optional()
        .default(true)
        .describe(
          'Send notifications to relevant stakeholders:\n' +
            '- true (default): Notify all relevant parties\n' +
            '- false: Silent operation without notifications',
        ),
      createAuditTrail: z
        .boolean()
        .optional()
        .default(true)
        .describe(
          'Create detailed audit trail entry:\n' +
            '- true (default): Full audit logging\n' +
            '- false: Minimal logging for performance',
        ),
    })
    .optional()
    .describe(
      '🔒 WORKFLOW CONSTRAINTS - Control workflow operation behavior:\n\n' +
        '🔹 VALIDATION CONTROL:\n' +
        '- Standard operations: Use default validation\n' +
        '- Emergency operations: May skip validation with allowSkipValidation\n' +
        '- Critical fixes: May force transitions with forceTransition\n\n' +
        '🔹 NOTIFICATION CONTROL:\n' +
        '- Normal operations: Notify all stakeholders\n' +
        '- Silent operations: Disable notifications for automated processes\n\n' +
        '🔹 AUDIT CONTROL:\n' +
        '- Full audit: Complete logging for compliance\n' +
        '- Minimal audit: Reduced logging for performance',
    ),

  // Scheduling and timing with comprehensive planning options
  scheduling: z
    .object({
      scheduleFor: z
        .string()
        .optional()
        .describe(
          'ISO 8601 date/time to schedule operation:\n' +
            '- "2024-01-20T09:00:00Z": Schedule for specific time\n' +
            '- Used for planned workflow transitions\n' +
            '- Enables workflow automation and coordination',
        ),
      deadline: z
        .string()
        .optional()
        .describe(
          'ISO 8601 date/time deadline for operation completion:\n' +
            '- "2024-01-25T17:00:00Z": Hard deadline\n' +
            '- Used for priority and escalation decisions\n' +
            '- Triggers alerts as deadline approaches',
        ),
      priority: z
        .enum(['low', 'medium', 'high', 'urgent'])
        .optional()
        .describe(
          'Operation priority level for resource allocation:\n' +
            '- "low": Background work, flexible timing\n' +
            '- "medium": Standard priority, normal scheduling\n' +
            '- "high": Important work, expedited handling\n' +
            '- "urgent": Critical work, immediate attention',
        ),
      estimatedDuration: z
        .string()
        .optional()
        .describe(
          'Estimated time to complete operation:\n' +
            '- "2 hours": Simple implementation\n' +
            '- "1 day": Complex feature development\n' +
            '- "3 days": Major architectural changes\n' +
            '- Used for resource planning and scheduling',
        ),
    })
    .optional()
    .describe(
      '📅 SCHEDULING INFORMATION - Timing and priority for workflow operations:\n\n' +
        '🔹 TIME MANAGEMENT:\n' +
        '- scheduleFor: When to start the operation\n' +
        '- deadline: When operation must be completed\n' +
        '- estimatedDuration: Expected time investment\n\n' +
        '🔹 PRIORITY MANAGEMENT:\n' +
        '- priority: Resource allocation and urgency level\n' +
        '- Used for queue management and escalation\n' +
        '- Affects notification frequency and routing',
    ),

  // Batch workflow operations with comprehensive coordination
  batch: z
    .object({
      taskIds: z
        .array(z.string())
        .describe(
          'Array of task IDs for batch workflow operations:\n' +
            '- ["TSK-001", "TSK-002", "TSK-003"]: Multiple related tasks\n' +
            '- All tasks must be in compatible states for operation\n' +
            '- Enables coordinated workflow transitions\n' +
            '- Maintains consistency across related work',
        ),
      continueOnError: z
        .boolean()
        .optional()
        .default(false)
        .describe(
          'Continue batch operation if individual tasks fail:\n' +
            '- false (default): Stop on first failure, rollback all\n' +
            '- true: Process all tasks, collect failures for review',
        ),
      parallelExecution: z
        .boolean()
        .optional()
        .default(false)
        .describe(
          'Execute batch operations in parallel:\n' +
            '- false (default): Sequential processing for safety\n' +
            '- true: Parallel processing for performance (if safe)',
        ),
    })
    .optional()
    .describe(
      '📦 BATCH OPERATION CONFIGURATION - Coordinate multiple workflow operations:\n\n' +
        '🔹 BATCH DELEGATION:\n' +
        '- Delegate multiple related tasks to same role\n' +
        '- Maintain consistency across task assignments\n' +
        '- Enable coordinated work planning\n\n' +
        '🔹 BATCH COMPLETION:\n' +
        '- Complete multiple tasks with shared evidence\n' +
        '- Coordinate milestone achievements\n' +
        '- Ensure consistent quality standards\n\n' +
        '🔹 BATCH ESCALATION:\n' +
        '- Escalate related issues together\n' +
        '- Coordinate problem resolution efforts\n' +
        '- Maintain context across related problems',
    ),

  // Conditional operations with comprehensive validation
  conditions: z
    .object({
      requiredStatus: TaskStatusSchema.optional().describe(
        'Required current task status for operation to proceed:\n' +
          '- "in-progress": Only operate on active tasks\n' +
          '- "needs-review": Only operate on tasks awaiting review\n' +
          '- Used to prevent invalid workflow transitions',
      ),
      requiredRole: WorkflowRoleSchema.optional().describe(
        'Required current role assignment for operation:\n' +
          '- "architect": Only if currently assigned to architect\n' +
          '- "senior-developer": Only if currently with developer\n' +
          '- Ensures proper role-based permissions',
      ),
      customConditions: z
        .array(z.string())
        .optional()
        .describe(
          'Custom condition checks to perform before operation:\n' +
            '- ["has-implementation-plan"]: Verify plan exists\n' +
            '- ["all-subtasks-complete"]: Check subtask completion\n' +
            '- ["acceptance-criteria-defined"]: Verify criteria exist\n' +
            '- ["manual-testing-passed"]: Confirm testing complete',
        ),
    })
    .optional()
    .describe(
      '🔍 CONDITIONAL OPERATIONS - Validation requirements for workflow operations:\n\n' +
        '🔹 STATUS CONDITIONS:\n' +
        '- Ensure task is in appropriate state for operation\n' +
        '- Prevent invalid workflow transitions\n' +
        '- Maintain workflow integrity and consistency\n\n' +
        '🔹 ROLE CONDITIONS:\n' +
        '- Verify proper role assignment and permissions\n' +
        '- Ensure appropriate expertise for operation\n' +
        '- Maintain role-based workflow discipline\n\n' +
        '🔹 CUSTOM CONDITIONS:\n' +
        '- Business rule validation specific to operation\n' +
        '- Quality gate enforcement\n' +
        '- Prerequisite verification and compliance',
    ),
});

export type WorkflowOperationsInput = z.infer<typeof WorkflowOperationsSchema>;

/**
 * 🚀 COMPREHENSIVE WORKFLOW OPERATION EXAMPLES
 *
 * ===== CRITICAL DELEGATION OPERATIONS =====
 *
 * 🔹 BOOMERANG → RESEARCHER (Research Request):
 * {
 *   "operation": "delegate",
 *   "taskId": "TSK-007",
 *   "fromRole": "boomerang",
 *   "toRole": "researcher",
 *   "message": "Need comprehensive research on authentication frameworks. Focus on security, performance, and integration complexity.",
 *   "metadata": {
 *     "researchScope": "authentication-frameworks",
 *     "priority": "high",
 *     "deadline": "2024-01-22T17:00:00Z",
 *     "keyQuestions": [
 *       "Which framework offers best security?",
 *       "What are integration complexities?",
 *       "Performance implications?"
 *     ]
 *   },
 *   "scheduling": {
 *     "priority": "high",
 *     "estimatedDuration": "4 hours",
 *     "deadline": "2024-01-22T17:00:00Z"
 *   }
 * }
 *
 * 🔹 ARCHITECT → SENIOR-DEVELOPER (Implementation Delegation):
 * {
 *   "operation": "delegate",
 *   "taskId": "TSK-005",
 *   "fromRole": "architect",
 *   "toRole": "senior-developer",
 *   "message": "Implementation plan ready. Please implement batch B001: Schema File Enhancement. Focus on comprehensive documentation with practical examples.",
 *   "metadata": {
 *     "batchId": "B001",
 *     "batchTitle": "Schema File Enhancement",
 *     "subtaskCount": 3,
 *     "priority": "medium",
 *     "technicalFocus": "documentation-enhancement"
 *   },
 *   "scheduling": {
 *     "priority": "medium",
 *     "estimatedDuration": "75 minutes",
 *     "deadline": "2024-01-20T15:00:00Z"
 *   },
 *   "conditions": {
 *     "requiredStatus": "in-progress",
 *     "customConditions": ["implementation-plan-exists", "subtasks-defined"]
 *   }
 * }
 *
 * 🔹 ARCHITECT → CODE-REVIEW (Review Delegation):
 * {
 *   "operation": "delegate",
 *   "taskId": "TSK-005",
 *   "fromRole": "architect",
 *   "toRole": "code-review",
 *   "message": "Implementation complete. All batches finished. Ready for comprehensive quality review including manual testing.",
 *   "metadata": {
 *     "implementationSummary": "Schema documentation enhanced with comprehensive examples",
 *     "batchesCompleted": ["B001"],
 *     "filesModified": 3,
 *     "reviewType": "documentation-quality",
 *     "manualTestingRequired": true
 *   },
 *   "scheduling": {
 *     "priority": "medium",
 *     "estimatedDuration": "30 minutes",
 *     "deadline": "2024-01-20T16:00:00Z"
 *   },
 *   "conditions": {
 *     "requiredStatus": "in-progress",
 *     "customConditions": ["all-batches-complete", "implementation-plan-satisfied"]
 *   }
 * }
 *
 * ===== CRITICAL COMPLETION OPERATIONS =====
 *
 * 🔹 RESEARCHER COMPLETION (Research Findings):
 * {
 *   "operation": "complete",
 *   "taskId": "TSK-007",
 *   "fromRole": "researcher",
 *   "completionData": {
 *     "summary": "Authentication framework research complete. Evaluated 5 major frameworks: Auth0, Firebase Auth, Passport.js, NextAuth.js, and Supabase Auth. Recommendation: NextAuth.js for best balance of security, performance, and integration simplicity.",
 *     "acceptanceCriteriaVerification": {
 *       "security-analysis": "Complete - evaluated encryption, session management, OAuth flows",
 *       "performance-analysis": "Complete - benchmarked response times and resource usage",
 *       "integration-complexity": "Complete - assessed setup time and code requirements",
 *       "cost-analysis": "Complete - compared pricing models and hidden costs"
 *     },
 *     "evidence": {
 *       "researchSources": [
 *         "Official documentation for all 5 frameworks",
 *         "Security audit reports and CVE databases",
 *         "Performance benchmarks from independent studies",
 *         "Community feedback and adoption metrics"
 *       ],
 *       "comparisonMatrix": {
 *         "security": { "NextAuth.js": 9, "Auth0": 10, "Firebase": 8 },
 *         "performance": { "NextAuth.js": 9, "Auth0": 7, "Firebase": 8 },
 *         "integration": { "NextAuth.js": 10, "Auth0": 6, "Firebase": 9 }
 *       },
 *       "recommendations": "NextAuth.js recommended for optimal balance"
 *     }
 *   },
 *   "metadata": {
 *     "researchDuration": "3.5 hours",
 *     "sourcesConsulted": 15,
 *     "frameworksEvaluated": 5,
 *     "confidenceLevel": "high"
 *   }
 * }
 *
 * 🔹 SENIOR-DEVELOPER COMPLETION (Implementation Complete):
 * {
 *   "operation": "complete",
 *   "taskId": "TSK-005",
 *   "fromRole": "senior-developer",
 *   "completionData": {
 *     "summary": "Schema documentation enhancement complete. Enhanced all 3 universal schema files with comprehensive field specifications, relationship mappings, and practical examples. Added detailed documentation for batch operations (createMany/updateMany) which are critical for implementation plan subtasks.",
 *     "filesModified": [
 *       "src/task-workflow/domains/universal/universal-query.schema.ts",
 *       "src/task-workflow/domains/universal/universal-mutation.schema.ts",
 *       "src/task-workflow/domains/universal/workflow-operations.schema.ts"
 *     ],
 *     "acceptanceCriteriaVerification": {
 *       "comprehensive-field-specs": "✅ Complete - All 10 entities documented with field types, constraints, relationships",
 *       "practical-examples": "✅ Complete - Added 20+ real-world usage examples for each schema",
 *       "batch-operation-docs": "✅ Complete - Detailed createMany/updateMany documentation with subtask examples",
 *       "agent-usability": "✅ Complete - Clear descriptions and decision frameworks for efficient agent usage",
 *       "relationship-mapping": "✅ Complete - Complete relationship documentation with include/select examples"
 *     },
 *     "evidence": {
 *       "documentationMetrics": {
 *         "linesAdded": 850,
 *         "examplesAdded": 65,
 *         "fieldSpecifications": 45,
 *         "relationshipMappings": 15
 *       },
 *       "qualityMeasures": {
 *         "consistentFormatting": true,
 *         "comprehensiveExamples": true,
 *         "practicalUseCases": true,
 *         "agentFriendlyDescriptions": true
 *       }
 *     }
 *   },
 *   "metadata": {
 *     "implementationTime": "75 minutes",
 *     "batchesCompleted": ["B001"],
 *     "subtasksCompleted": 3,
 *     "qualityChecksPerformed": true
 *   }
 * }
 *
 * 🔹 CODE-REVIEW COMPLETION (Quality Approval):
 * {
 *   "operation": "complete",
 *   "taskId": "TSK-005",
 *   "fromRole": "code-review",
 *   "completionData": {
 *     "summary": "Quality review complete. APPROVED. Schema documentation enhancements meet all quality standards. Comprehensive field specifications, excellent practical examples, and clear agent-friendly descriptions. Manual testing confirmed all examples work correctly.",
 *     "acceptanceCriteriaVerification": {
 *       "documentation-quality": "✅ APPROVED - Comprehensive and well-structured",
 *       "practical-examples": "✅ APPROVED - Real-world examples that agents can use directly",
 *       "batch-operations": "✅ APPROVED - Critical createMany/updateMany operations well documented",
 *       "agent-usability": "✅ APPROVED - Clear decision frameworks and usage patterns",
 *       "consistency": "✅ APPROVED - Consistent formatting and structure across all files"
 *     },
 *     "evidence": {
 *       "manualTestingResults": {
 *         "exampleValidation": "All 65 examples validated for syntax and logic",
 *         "usabilityTesting": "Agent-friendly descriptions tested for clarity",
 *         "consistencyCheck": "Formatting and structure consistent across files"
 *       },
 *       "qualityMetrics": {
 *         "documentationCoverage": "100%",
 *         "exampleAccuracy": "100%",
 *         "agentUsabilityScore": "95%",
 *         "consistencyScore": "98%"
 *       },
 *       "approvalStatus": "APPROVED"
 *     }
 *   },
 *   "metadata": {
 *     "reviewDuration": "25 minutes",
 *     "issuesFound": 0,
 *     "recommendationsProvided": 2,
 *     "approvalStatus": "APPROVED"
 *   }
 * }
 *
 * ===== ESCALATION OPERATIONS =====
 *
 * 🔹 TECHNICAL BLOCKER ESCALATION:
 * {
 *   "operation": "escalate",
 *   "taskId": "TSK-008",
 *   "fromRole": "senior-developer",
 *   "toRole": "boomerang",
 *   "rejectionData": {
 *     "reason": "Critical dependency unavailable. External API service is down and blocking authentication implementation. Cannot proceed without alternative approach.",
 *     "severity": "high",
 *     "blockers": [
 *       "external-api-service-down",
 *       "no-alternative-auth-method-defined",
 *       "deadline-at-risk"
 *     ],
 *     "requiredChanges": "Need alternative authentication approach or service provider. Recommend switching to NextAuth.js as researched alternative."
 *   },
 *   "metadata": {
 *     "blockerType": "external-dependency",
 *     "impactedFeatures": ["user-login", "user-registration", "session-management"],
 *     "timeBlocked": "4 hours",
 *     "alternativesConsidered": ["NextAuth.js", "local-auth-implementation"]
 *   },
 *   "scheduling": {
 *     "priority": "urgent",
 *     "deadline": "2024-01-20T17:00:00Z"
 *   }
 * }
 *
 * 🔹 QUALITY REJECTION ESCALATION:
 * {
 *   "operation": "escalate",
 *   "taskId": "TSK-009",
 *   "fromRole": "code-review",
 *   "toRole": "architect",
 *   "rejectionData": {
 *     "reason": "Security vulnerabilities identified during review. XSS and SQL injection risks found. Code quality below standards.",
 *     "severity": "critical",
 *     "blockers": [
 *       "xss-vulnerability-in-user-input",
 *       "sql-injection-risk-in-queries",
 *       "insufficient-input-validation"
 *     ],
 *     "requiredChanges": "Implement comprehensive input validation, parameterized queries, and XSS protection. Requires architectural review of security approach."
 *   },
 *   "metadata": {
 *     "securityIssues": 3,
 *     "qualityIssues": 5,
 *     "testingGaps": ["security-testing", "penetration-testing"],
 *     "reworkRequired": "significant"
 *   },
 *   "scheduling": {
 *     "priority": "critical",
 *     "deadline": "2024-01-21T09:00:00Z"
 *   }
 * }
 *
 * ===== BATCH OPERATIONS =====
 *
 * 🔹 BATCH DELEGATION (Multiple Related Tasks):
 * {
 *   "operation": "delegate",
 *   "fromRole": "architect",
 *   "toRole": "senior-developer",
 *   "batch": {
 *     "taskIds": ["TSK-010", "TSK-011", "TSK-012"],
 *     "continueOnError": false,
 *     "parallelExecution": false
 *   },
 *   "message": "Batch implementation ready. Three related authentication tasks: user registration, login flow, and session management. Implement in sequence for consistency.",
 *   "metadata": {
 *     "batchType": "authentication-suite",
 *     "dependencies": "sequential-implementation-required",
 *     "sharedResources": ["auth-service", "user-model", "session-store"]
 *   },
 *   "scheduling": {
 *     "priority": "high",
 *     "estimatedDuration": "2 days",
 *     "deadline": "2024-01-25T17:00:00Z"
 *   }
 * }
 *
 * 🔹 BATCH COMPLETION (Coordinated Milestone):
 * {
 *   "operation": "complete",
 *   "fromRole": "senior-developer",
 *   "batch": {
 *     "taskIds": ["TSK-010", "TSK-011", "TSK-012"],
 *     "continueOnError": false
 *   },
 *   "completionData": {
 *     "summary": "Authentication suite implementation complete. All three components working together: user registration with validation, secure login flow with JWT tokens, and session management with refresh tokens.",
 *     "filesModified": [
 *       "src/auth/registration.service.ts",
 *       "src/auth/login.service.ts",
 *       "src/auth/session.service.ts",
 *       "src/auth/auth.controller.ts",
 *       "tests/auth/auth.integration.test.ts"
 *     ],
 *     "acceptanceCriteriaVerification": {
 *       "user-registration": "✅ Complete with email validation and password hashing",
 *       "secure-login": "✅ Complete with JWT token generation and validation",
 *       "session-management": "✅ Complete with refresh token rotation",
 *       "integration-testing": "✅ Complete with end-to-end test coverage",
 *       "security-validation": "✅ Complete with input sanitization and rate limiting"
 *     },
 *     "evidence": {
 *       "testResults": {
 *         "unitTests": "45 tests passed",
 *         "integrationTests": "12 tests passed",
 *         "securityTests": "8 tests passed"
 *       },
 *       "performanceMetrics": {
 *         "registrationTime": "< 200ms",
 *         "loginTime": "< 150ms",
 *         "sessionValidation": "< 50ms"
 *       }
 *     }
 *   },
 *   "metadata": {
 *     "batchDuration": "1.8 days",
 *     "tasksCompleted": 3,
 *     "integrationSuccess": true,
 *     "qualityGatesPassed": true
 *   }
 * }
 *
 * ===== MANAGEMENT OPERATIONS =====
 *
 * 🔹 PAUSE OPERATION (Temporary Suspension):
 * {
 *   "operation": "pause",
 *   "taskId": "TSK-013",
 *   "fromRole": "architect",
 *   "message": "Pausing task pending stakeholder clarification on requirements. Technical approach ready but business requirements need refinement.",
 *   "metadata": {
 *     "pauseReason": "requirements-clarification-needed",
 *     "stakeholderMeeting": "2024-01-22T14:00:00Z",
 *     "contextPreserved": true,
 *     "resumeConditions": ["requirements-clarified", "stakeholder-approval"]
 *   },
 *   "scheduling": {
 *     "expectedResume": "2024-01-23T09:00:00Z"
 *   }
 * }
 *
 * 🔹 RESUME OPERATION (Restore Work):
 * {
 *   "operation": "resume",
 *   "taskId": "TSK-013",
 *   "fromRole": "architect",
 *   "message": "Resuming task. Requirements clarified in stakeholder meeting. Technical approach approved. Ready to proceed with implementation.",
 *   "metadata": {
 *     "resumeReason": "requirements-clarified",
 *     "stakeholderDecisions": ["approach-approved", "timeline-confirmed"],
 *     "contextRestored": true,
 *     "updatedRequirements": "Additional security requirements added"
 *   },
 *   "conditions": {
 *     "requiredStatus": "paused",
 *     "customConditions": ["stakeholder-approval-received"]
 *   }
 * }
 */
