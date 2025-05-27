import { z } from 'zod';

/**
 * Workflow Operations Schema - Specialized workflow state management and transitions
 * Handles complex workflow transitions, delegations, and role-based operations
 *
 *  COMPLETE WORKFLOW REFERENCE:
 * This schema provides comprehensive workflow state management with role-based delegation,
 * completion tracking, escalation handling, and batch workflow operations.
 *
 *  CRITICAL WORKFLOW OPERATIONS:
 * - delegate: Essential for role-based task handoffs with validation
 * - complete: Critical for task completion with evidence tracking
 * - transition: Important for status changes with workflow validation
 * - escalate: Necessary for handling blockers and quality issues
 *
 *  COMPLETE WORKFLOW FIELD SPECIFICATIONS:
 *
 *  WORKFLOW OPERATION TYPES (operation):
 * - delegate: Hand off task/subtask between roles (ESSENTIAL)
 * - complete: Mark work completed with evidence (CRITICAL)
 * - transition: Change status with validation (IMPORTANT)
 * - escalate: Handle issues and blockers (NECESSARY)
 * - reassign: Change assignment within/across roles
 * - pause: Temporarily suspend work (preserves context)
 * - resume: Resume paused work (restores context)
 * - cancel: Terminate task entirely (requires cleanup)
 *
 *  WORKFLOW ROLES (fromRole/toRole):
 * - boomerang: Task coordination, intake, final delivery (ENTRY/EXIT)
 * - researcher: Knowledge gathering, analysis (KNOWLEDGE specialist)
 * - architect: Technical planning, design (DESIGN specialist)
 * - senior-developer: Implementation, coding (IMPLEMENTATION specialist)
 * - code-review: Quality assurance, testing (QUALITY specialist)
 *
 *  TASK STATUS VALUES (newStatus):
 * - not-started: Initial state, awaiting assignment
 * - in-progress: Active work by assigned role
 * - needs-review: Work complete, awaiting quality review
 * - completed: All work finished and approved
 * - needs-changes: Review identified required fixes
 * - paused: Work temporarily suspended
 * - cancelled: Task terminated with cleanup
 *
 *  COMPLETION DATA FIELDS (completionData):
 * - summary: Work accomplishment summary (REQUIRED)
 * - evidence: Supporting documentation and proof
 * - filesModified: Array of changed files
 * - acceptanceCriteriaVerification: JSON verification results
 *
 *  REJECTION DATA FIELDS (rejectionData):
 * - reason: Rejection explanation (REQUIRED)
 * - severity: Issue severity (low/medium/high/critical)
 * - requiredChanges: Specific change requirements
 * - blockers: Array of blocking issues
 *
 *  SCHEDULING FIELDS (scheduling):
 * - deadline: ISO date deadline for operation
 * - estimatedDuration: Time estimate for operation
 * - priority: Operation priority (low/medium/high/urgent)
 * - scheduleFor: ISO date to schedule operation
 *
 *  CONSTRAINT FIELDS (constraints):
 * - forceTransition: Force invalid transitions (default: false)
 * - allowSkipValidation: Skip validation checks (default: false)
 * - createAuditTrail: Create audit entry (default: true)
 * - notifyStakeholders: Send notifications (default: true)
 *
 *  BATCH OPERATION FIELDS (batch):
 * - taskIds: Array of task IDs for batch operations
 * - parallelExecution: Execute in parallel (default: false)
 * - continueOnError: Continue if individual ops fail (default: false)
 *
 *  CONDITION FIELDS (conditions):
 * - requiredRole: Required current role for operation
 * - requiredStatus: Required current status for operation
 * - customConditions: Array of custom condition checks
 *
 *  METADATA FIELDS (metadata):
 * - Additional operation-specific data as key-value pairs
 * - Used for custom workflow extensions and integrations
 */

// ===== WORKFLOW OPERATION DEFINITIONS =====

/**
 *  WORKFLOW OPERATION TYPES:
 *
 *  CORE WORKFLOW OPERATIONS:
 * - 'delegate': Hand off task/subtask from one role to another (ESSENTIAL for workflow)
 * - 'complete': Mark task/operation as completed with evidence (CRITICAL for closure)
 * - 'transition': Change task status with workflow validation (IMPORTANT for state management)
 *
 *  ESCALATION & MANAGEMENT:
 * - 'escalate': Escalate issues, blockers, or quality concerns (NECESSARY for problem resolution)
 * - 'reassign': Change task assignment within same role or to different role
 * - 'pause': Temporarily halt work on task (preserves context for resumption)
 * - 'resume': Resume paused work (restores previous context and state)
 * - 'cancel': Cancel task entirely (requires proper cleanup and notification)
 *
 *  WORKFLOW OPERATION BENEFITS:
 * - Role Validation: Ensures proper role transitions and permissions
 * - State Consistency: Maintains workflow state integrity across operations
 * - Audit Trail: Complete tracking of all workflow changes and decisions
 * - Evidence Tracking: Documents completion criteria and verification results
 */
export const WorkflowOperationSchema = z.enum([
  'delegate', //  CRITICAL: Role-based task handoffs
  'complete', //  CRITICAL: Task completion with evidence
  'transition', //  IMPORTANT: Status changes with validation
  'escalate', //  NECESSARY: Issue escalation and problem resolution
  'reassign', //  Role reassignment within workflow
  'pause', //  Temporary work suspension
  'resume', //  Resume paused work
  'cancel', // Task cancellation with cleanup
]);

/**
 *  WORKFLOW ROLE DEFINITIONS:
 *
 *  ROLE HIERARCHY & RESPONSIBILITIES:
 * - 'boomerang': Task intake, analysis, research evaluation, final delivery (ENTRY/EXIT point)
 * - 'researcher': In-depth research, knowledge gathering, option evaluation (KNOWLEDGE specialist)
 * - 'architect': Technical planning, implementation design, subtask creation (DESIGN specialist)
 * - 'senior-developer': Code implementation, testing, technical execution (IMPLEMENTATION specialist)
 * - 'code-review': Quality assurance, manual testing, approval/rejection (QUALITY specialist)
 *
 *  TYPICAL DELEGATION FLOW:
 * boomerang → researcher → boomerang → architect → senior-developer → architect → code-review → boomerang
 *
 *  ROLE TRANSITION RULES:
 * - Each role has specific entry/exit criteria
 * - Delegation requires proper handoff documentation
 * - Role validation ensures appropriate skill matching
 * - Escalation paths defined for each role transition
 */
export const WorkflowRoleSchema = z.enum([
  'boomerang',
  'researcher',
  'architect',
  'senior-developer',
  'code-review',
]);

/**
 *  TASK STATUS DEFINITIONS:
 *
 *  WORKFLOW STATUS PROGRESSION:
 * - 'not-started': Initial state, awaiting role assignment
 * - 'in-progress': Active work in progress by assigned role
 * - 'needs-review': Work completed, awaiting quality review
 * - 'completed': All work finished and approved
 * - 'needs-changes': Review identified issues requiring fixes
 * - 'paused': Work temporarily suspended (preserves context)
 * - 'cancelled': Task terminated (requires cleanup)
 *
 *  STATUS TRANSITION RULES:
 * - not-started → in-progress (via delegation)
 * - in-progress → needs-review (via completion)
 * - needs-review → completed (via approval)
 * - needs-review → needs-changes (via rejection)
 * - needs-changes → in-progress (via reassignment)
 * - Any status → paused/cancelled (via management operations)
 */
export const TaskStatusSchema = z.enum([
  'not-started',
  'in-progress',
  'needs-review',
  'completed',
  'needs-changes',
  'paused',
  'cancelled',
]);

/**
 *  COMPLETION DATA SCHEMA:
 * Comprehensive data structure for task/operation completion
 */
export const CompletionDataSchema = z.object({
  summary: z
    .string()
    .describe(
      ' COMPLETION SUMMARY - Concise description of work accomplished (REQUIRED):\n\n' +
        ' EFFECTIVE SUMMARY PATTERNS:\n' +
        '- "Research complete: Evaluated 5 options, recommended React Query for state management"\n' +
        '- "Implementation complete: All 8 subtasks finished, manual testing passed"\n' +
        '- "Code review complete: APPROVED - All acceptance criteria verified"\n' +
        '- "Architecture complete: Implementation plan created with 3 batches, 12 subtasks"\n\n' +
        ' SUMMARY REQUIREMENTS:\n' +
        '- Specific accomplishments with quantifiable results\n' +
        '- Key decisions made and rationale\n' +
        '- Quality verification status\n' +
        '- Next steps or handoff information',
    ),

  evidence: z
    .record(z.any())
    .optional()
    .describe(
      ' COMPLETION EVIDENCE - Supporting documentation and proof of completion:\n\n' +
        ' EVIDENCE TYPES:\n' +
        '- testResults: { "manual": "passed", "unit": "98% coverage", "integration": "all passed" }\n' +
        '- codeMetrics: { "linesAdded": 245, "filesModified": 8, "complexity": "low" }\n' +
        '- qualityChecks: { "linting": "passed", "security": "no issues", "performance": "optimized" }\n' +
        '- acceptanceCriteria: { "criterion1": "verified", "criterion2": "verified" }\n\n' +
        ' EVIDENCE STRUCTURE:\n' +
        '- Key-value pairs with descriptive keys\n' +
        '- Quantifiable metrics where possible\n' +
        '- Status indicators (passed/failed/verified)\n' +
        '- Supporting data and measurements',
    ),

  filesModified: z
    .array(z.string())
    .optional()
    .describe(
      ' FILES MODIFIED - Array of files changed during the operation:\n\n' +
        ' FILE PATH EXAMPLES:\n' +
        '- ["src/components/UserDashboard.tsx", "src/services/api.service.ts"]\n' +
        '- ["docs/implementation-plan.md", "tests/integration/api.test.ts"]\n' +
        '- ["schema/universal-query.schema.ts", "descriptions/query.description.ts"]\n\n' +
        ' PATH REQUIREMENTS:\n' +
        '- Relative paths from project root\n' +
        '- Include all significant file changes\n' +
        '- Group related changes logically\n' +
        '- Exclude temporary or generated files',
    ),

  acceptanceCriteriaVerification: z
    .record(z.any())
    .optional()
    .describe(
      ' ACCEPTANCE CRITERIA VERIFICATION - JSON verification results:\n\n' +
        ' VERIFICATION STRUCTURE:\n' +
        '- { "criterion1": { "status": "verified", "evidence": "Manual testing passed" } }\n' +
        '- { "criterion2": { "status": "verified", "evidence": "Code review approved" } }\n' +
        '- { "criterion3": { "status": "pending", "reason": "Awaiting deployment" } }\n\n' +
        ' VERIFICATION STATUSES:\n' +
        '- "verified": Criterion fully satisfied with evidence\n' +
        '- "partial": Partially satisfied, needs completion\n' +
        '- "pending": Awaiting verification or dependencies\n' +
        '- "failed": Criterion not met, requires attention',
    ),
});

/**
 *  REJECTION DATA SCHEMA:
 * Comprehensive data structure for escalation and rejection handling
 */
export const RejectionDataSchema = z.object({
  reason: z
    .string()
    .describe(
      'REJECTION REASON - Clear explanation for rejection or escalation (REQUIRED):\n\n' +
        ' EFFECTIVE REJECTION REASONS:\n' +
        '- "Security vulnerability: SQL injection risk in user input validation"\n' +
        '- "Performance issue: API response time exceeds 2s requirement"\n' +
        '- "Missing functionality: User authentication not implemented"\n' +
        '- "Code quality: Violates SOLID principles, needs refactoring"\n\n' +
        ' REASON REQUIREMENTS:\n' +
        '- Specific issue identification\n' +
        '- Impact assessment\n' +
        '- Reference to standards or requirements\n' +
        '- Actionable feedback for resolution',
    ),

  severity: z
    .enum(['low', 'medium', 'high', 'critical'])
    .optional()
    .describe(
      ' ISSUE SEVERITY - Impact level of the rejection or escalation:\n\n' +
        ' SEVERITY LEVELS:\n' +
        '- "low": Minor issues, cosmetic problems, non-blocking\n' +
        '- "medium": Functional issues, performance concerns, moderate impact\n' +
        '- "high": Security issues, major functionality gaps, significant impact\n' +
        '- "critical": System-breaking issues, security vulnerabilities, blocking\n\n' +
        ' SEVERITY GUIDELINES:\n' +
        '- Consider user impact and business risk\n' +
        '- Evaluate technical debt implications\n' +
        '- Assess security and compliance requirements\n' +
        '- Factor in timeline and resource constraints',
    ),

  requiredChanges: z
    .string()
    .optional()
    .describe(
      '🔧 REQUIRED CHANGES - Specific modifications needed to address issues:\n\n' +
        ' CHANGE SPECIFICATION EXAMPLES:\n' +
        '- "Add input sanitization to all user-facing forms using validator.js"\n' +
        '- "Implement caching layer to reduce API response time below 1s"\n' +
        '- "Add comprehensive error handling with user-friendly messages"\n' +
        '- "Refactor UserService to follow single responsibility principle"\n\n' +
        ' CHANGE REQUIREMENTS:\n' +
        '- Specific, actionable instructions\n' +
        '- Technical implementation guidance\n' +
        '- Quality standards and acceptance criteria\n' +
        '- Timeline and priority considerations',
    ),

  blockers: z
    .array(z.string())
    .optional()
    .describe(
      '🚧 BLOCKING ISSUES - Array of issues preventing progress:\n\n' +
        ' BLOCKER EXAMPLES:\n' +
        '- ["External API dependency not available", "Database schema changes required"]\n' +
        '- ["Missing design specifications", "Unclear business requirements"]\n' +
        '- ["Technical expertise gap", "Resource allocation conflicts"]\n\n' +
        ' BLOCKER DOCUMENTATION:\n' +
        '- Clear issue identification\n' +
        '- Impact on workflow progression\n' +
        '- Potential resolution approaches\n' +
        '- Escalation requirements',
    ),
});

/**
 *  SCHEDULING SCHEMA:
 * Comprehensive scheduling and timing information for workflow operations
 */
export const SchedulingSchema = z.object({
  deadline: z
    .string()
    .optional()
    .describe(
      ' OPERATION DEADLINE - ISO date deadline for the workflow operation:\n\n' +
        ' DEADLINE EXAMPLES:\n' +
        '- "2024-01-20T17:00:00Z": End of business day deadline\n' +
        '- "2024-01-22T09:00:00Z": Start of next business day\n' +
        '- "2024-01-25T23:59:59Z": End of sprint deadline\n\n' +
        ' DEADLINE CONSIDERATIONS:\n' +
        '- Business hours and timezone alignment\n' +
        '- Sprint and milestone boundaries\n' +
        '- Dependency and integration requirements\n' +
        '- Resource availability and capacity',
    ),

  estimatedDuration: z
    .string()
    .optional()
    .describe(
      ' ESTIMATED DURATION - Time estimate for completing the operation:\n\n' +
        ' DURATION EXAMPLES:\n' +
        '- "30 minutes": Quick fixes and minor updates\n' +
        '- "2 hours": Feature implementation or complex debugging\n' +
        '- "1 day": Major feature development or comprehensive testing\n' +
        '- "3 days": Complex integration or architectural changes\n\n' +
        ' ESTIMATION GUIDELINES:\n' +
        '- Include development, testing, and review time\n' +
        '- Factor in complexity and unknowns\n' +
        '- Consider team experience and expertise\n' +
        '- Account for integration and deployment time',
    ),

  priority: z
    .enum(['low', 'medium', 'high', 'urgent'])
    .optional()
    .describe(
      ' OPERATION PRIORITY - Urgency level for the workflow operation:\n\n' +
        ' PRIORITY LEVELS:\n' +
        '- "low": Nice-to-have improvements, non-critical enhancements\n' +
        '- "medium": Standard feature development, planned improvements\n' +
        '- "high": Important features, significant business value\n' +
        '- "urgent": Critical fixes, blocking issues, security vulnerabilities\n\n' +
        ' PRIORITY FACTORS:\n' +
        '- Business impact and user value\n' +
        '- Technical risk and dependencies\n' +
        '- Timeline constraints and deadlines\n' +
        '- Resource availability and capacity',
    ),

  scheduleFor: z
    .string()
    .optional()
    .describe(
      ' SCHEDULE FOR - ISO date to schedule the operation for execution:\n\n' +
        ' SCHEDULING EXAMPLES:\n' +
        '- "2024-01-16T09:00:00Z": Next business day morning\n' +
        '- "2024-01-19T14:00:00Z": Specific afternoon slot\n' +
        '- "2024-01-22T08:00:00Z": Start of next sprint\n\n' +
        ' SCHEDULING CONSIDERATIONS:\n' +
        '- Team availability and capacity\n' +
        '- Dependency completion requirements\n' +
        '- Integration and deployment windows\n' +
        '- Business and operational constraints',
    ),
});

/**
 *  CONSTRAINTS SCHEMA:
 * Workflow operation constraints and validation controls
 */
export const ConstraintsSchema = z.object({
  forceTransition: z
    .boolean()
    .default(false)
    .describe(
      ' FORCE TRANSITION - Force workflow transition even if validation fails:\n\n' +
        ' FORCE TRANSITION USAGE:\n' +
        '- Emergency situations requiring immediate action\n' +
        '- Administrative overrides for exceptional cases\n' +
        '- Recovery from workflow state corruption\n' +
        '- Testing and development scenarios\n\n' +
        ' CAUTION: Use sparingly as it bypasses safety checks',
    ),

  allowSkipValidation: z
    .boolean()
    .default(false)
    .describe(
      ' SKIP VALIDATION - Allow skipping standard validation checks:\n\n' +
        ' SKIP VALIDATION SCENARIOS:\n' +
        '- Performance-critical operations\n' +
        '- Bulk operations with pre-validated data\n' +
        '- Administrative maintenance tasks\n' +
        '- Development and testing environments\n\n' +
        ' CAUTION: May compromise data integrity and workflow consistency',
    ),

  createAuditTrail: z
    .boolean()
    .default(true)
    .describe(
      ' CREATE AUDIT TRAIL - Generate audit trail entry for the operation:\n\n' +
        ' AUDIT TRAIL BENEFITS:\n' +
        '- Complete operation history tracking\n' +
        '- Compliance and governance requirements\n' +
        '- Debugging and troubleshooting support\n' +
        '- Performance and workflow analysis\n\n' +
        ' RECOMMENDED: Keep enabled for production environments',
    ),

  notifyStakeholders: z
    .boolean()
    .default(true)
    .describe(
      ' NOTIFY STAKEHOLDERS - Send notifications to relevant stakeholders:\n\n' +
        ' NOTIFICATION RECIPIENTS:\n' +
        '- Role assignees and team members\n' +
        '- Project managers and stakeholders\n' +
        '- Quality assurance and review teams\n' +
        '- Integration and deployment teams\n\n' +
        ' RECOMMENDED: Keep enabled for team coordination',
    ),
});

/**
 *  BATCH OPERATIONS SCHEMA:
 * Configuration for batch workflow operations across multiple tasks
 */
export const BatchOperationsSchema = z.object({
  taskIds: z
    .array(z.string())
    .describe(
      ' TASK IDS - Array of task IDs for batch workflow operations:\n\n' +
        ' BATCH OPERATION EXAMPLES:\n' +
        '- ["TSK-001", "TSK-002", "TSK-003"]: Related feature tasks\n' +
        '- ["TSK-BUG-001", "TSK-BUG-002"]: Bug fix batch\n' +
        '- ["TSK-REFACTOR-001", "TSK-REFACTOR-002"]: Refactoring batch\n\n' +
        ' BATCH CONSIDERATIONS:\n' +
        '- Logical grouping of related tasks\n' +
        '- Dependency management across tasks\n' +
        '- Resource allocation and capacity\n' +
        '- Coordination and communication requirements',
    ),

  parallelExecution: z
    .boolean()
    .default(false)
    .describe(
      ' PARALLEL EXECUTION - Execute batch operations in parallel:\n\n' +
        ' PARALLEL EXECUTION BENEFITS:\n' +
        '- Faster completion for independent tasks\n' +
        '- Better resource utilization\n' +
        '- Reduced overall timeline\n\n' +
        ' PARALLEL EXECUTION RISKS:\n' +
        '- Dependency conflicts and race conditions\n' +
        '- Resource contention and bottlenecks\n' +
        '- Coordination and synchronization complexity',
    ),

  continueOnError: z
    .boolean()
    .default(false)
    .describe(
      ' CONTINUE ON ERROR - Continue batch processing if individual operations fail:\n\n' +
        ' CONTINUE ON ERROR SCENARIOS:\n' +
        '- Non-critical operations with acceptable failures\n' +
        '- Data migration and cleanup operations\n' +
        '- Bulk updates with partial success tolerance\n\n' +
        ' ERROR HANDLING CONSIDERATIONS:\n' +
        '- Error collection and reporting\n' +
        '- Rollback and recovery strategies\n' +
        '- Partial success communication',
    ),
});

/**
 *  CONDITIONS SCHEMA:
 * Conditions that must be met for workflow operations to proceed
 */
export const ConditionsSchema = z.object({
  requiredRole: WorkflowRoleSchema.optional().describe(
    ' REQUIRED ROLE - Role that must be current for the operation to proceed:\n\n' +
      ' ROLE VALIDATION EXAMPLES:\n' +
      '- "architect": Only architect can delegate to senior-developer\n' +
      '- "code-review": Only code-review can approve or reject\n' +
      '- "boomerang": Only boomerang can perform final delivery\n\n' +
      ' ROLE VALIDATION BENEFITS:\n' +
      '- Workflow integrity and consistency\n' +
      '- Permission and authorization control\n' +
      '- Audit trail and accountability\n' +
      '- Quality and process compliance',
  ),

  requiredStatus: TaskStatusSchema.optional().describe(
    ' REQUIRED STATUS - Status that must be current for the operation to proceed:\n\n' +
      ' STATUS VALIDATION EXAMPLES:\n' +
      '- "in-progress": Task must be active for completion\n' +
      '- "needs-review": Task must be ready for review operations\n' +
      '- "needs-changes": Task must need changes for reassignment\n\n' +
      ' STATUS VALIDATION BENEFITS:\n' +
      '- Workflow state consistency\n' +
      '- Operation sequence validation\n' +
      '- Data integrity protection\n' +
      '- Process compliance enforcement',
  ),

  customConditions: z
    .array(z.string())
    .optional()
    .describe(
      ' CUSTOM CONDITIONS - Array of custom condition checks to perform:\n\n' +
        ' CUSTOM CONDITION EXAMPLES:\n' +
        '- ["all_subtasks_completed", "acceptance_criteria_verified"]\n' +
        '- ["security_scan_passed", "performance_tests_passed"]\n' +
        '- ["dependencies_resolved", "integration_tests_passed"]\n\n' +
        ' CUSTOM CONDITION BENEFITS:\n' +
        '- Business rule enforcement\n' +
        '- Quality gate validation\n' +
        '- Integration requirement checks\n' +
        '- Custom workflow logic support',
    ),
});

/**
 *  MAIN WORKFLOW OPERATIONS SCHEMA:
 * Complete schema for all workflow operations with comprehensive field documentation
 */
export const WorkflowOperationsSchema = z.object({
  operation: WorkflowOperationSchema.describe(
    ' WORKFLOW OPERATION TYPE - The specific workflow action to perform:\n\n' +
      ' CRITICAL OPERATIONS:\n' +
      '- "delegate": Hand off task from current role to target role (ESSENTIAL)\n' +
      '- "complete": Mark work as completed with evidence and verification (CRITICAL)\n' +
      '- "transition": Change task status with proper workflow validation\n\n' +
      ' MANAGEMENT OPERATIONS:\n' +
      '- "escalate": Escalate issues, blockers, or quality concerns\n' +
      '- "reassign": Change task assignment (same or different role)\n' +
      '- "pause": Temporarily suspend work (preserves context)\n' +
      '- "resume": Resume paused work (restores context)\n' +
      '- "cancel": Terminate task entirely (requires cleanup)',
  ),

  taskId: z
    .string()
    .describe(
      ' TASK IDENTIFIER - The unique task ID to operate on:\n\n' +
        ' TASK ID FORMAT:\n' +
        '- Standard format: "TSK-001", "TSK-002", etc.\n' +
        '- Must exist in the system before workflow operations\n' +
        '- Used for tracking across all workflow transitions\n\n' +
        ' EXAMPLES:\n' +
        '- "TSK-005": Current documentation enhancement task\n' +
        '- "TSK-003": Integration testing implementation task',
    ),

  // Role and delegation management with comprehensive examples
  fromRole: WorkflowRoleSchema.optional().describe(
    ' SOURCE ROLE - Role performing the workflow operation:\n\n' +
      ' DELEGATION PATTERNS:\n' +
      '- "boomerang": Initial task assignment or final completion\n' +
      '- "researcher": Research completion, returning findings\n' +
      '- "architect": Implementation plan completion, delegating to developer\n' +
      '- "senior-developer": Code completion, delegating to review\n' +
      '- "code-review": Review completion, returning to architect or boomerang\n\n' +
      ' VALIDATION RULES:\n' +
      '- Must match current task assignment role\n' +
      '- Required for delegation and completion operations\n' +
      '- Used for permission validation and audit trail',
  ),

  toRole: WorkflowRoleSchema.optional().describe(
    ' TARGET ROLE - Destination role for delegation/transition:\n\n' +
      ' COMMON DELEGATION FLOWS:\n' +
      '- boomerang → researcher: "Need research on technology options"\n' +
      '- boomerang → architect: "Ready for technical planning"\n' +
      '- architect → senior-developer: "Implementation plan ready"\n' +
      '- senior-developer → architect: "Code complete, ready for review delegation"\n' +
      '- architect → code-review: "Implementation complete, needs quality review"\n' +
      '- code-review → boomerang: "Review complete, task ready for delivery"\n\n' +
      ' ESCALATION FLOWS:\n' +
      '- Any role → boomerang: "Escalating blocker or major issue"\n' +
      '- code-review → architect: "Needs significant changes"\n' +
      '- senior-developer → architect: "Technical blocker or design issue"',
  ),

  // Status management with workflow validation
  newStatus: TaskStatusSchema.optional().describe(
    ' NEW STATUS - Target status for transition operations:\n\n' +
      ' STATUS TRANSITION PATTERNS:\n' +
      '- "not-started" → "in-progress": Via delegation to active role\n' +
      '- "in-progress" → "needs-review": Via completion operation\n' +
      '- "needs-review" → "completed": Via approval from code-review\n' +
      '- "needs-review" → "needs-changes": Via rejection from code-review\n' +
      '- "needs-changes" → "in-progress": Via reassignment for fixes\n\n' +
      ' MANAGEMENT TRANSITIONS:\n' +
      '- Any status → "paused": Via pause operation\n' +
      '- "paused" → previous status: Via resume operation\n' +
      '- Any status → "cancelled": Via cancel operation',
  ),

  // Operation context with comprehensive documentation
  message: z
    .string()
    .optional()
    .describe(
      ' OPERATION MESSAGE - Context and reason for the workflow operation:\n\n' +
        ' DELEGATION MESSAGES:\n' +
        '- "Research complete. Key findings: [summary]. Ready for architecture."\n' +
        '- "Implementation plan ready. Please implement batch B001."\n' +
        '- "Code complete. All subtasks finished. Ready for review."\n' +
        '- "Review complete. Status: APPROVED. Ready for delivery."\n\n' +
        ' COMPLETION MESSAGES:\n' +
        '- "Task completed successfully. All acceptance criteria met."\n' +
        '- "Research findings documented. Recommendations provided."\n' +
        '- "Implementation complete. Manual testing passed."\n\n' +
        ' ESCALATION MESSAGES:\n' +
        '- "Blocking issue: API dependency not available."\n' +
        '- "Quality concern: Security vulnerability identified."\n' +
        '- "Resource constraint: Requires additional expertise."',
    ),

  // Completion data for successful task completion
  completionData: CompletionDataSchema.optional().describe(
    ' COMPLETION DATA - Comprehensive completion information for successful operations:\n\n' +
      ' REQUIRED FOR OPERATIONS:\n' +
      '- "complete": Must provide summary and evidence\n' +
      '- "delegate" (when completing): Include completion summary\n\n' +
      ' COMPLETION DATA STRUCTURE:\n' +
      '- summary: Work accomplishment description (REQUIRED)\n' +
      '- evidence: Supporting documentation and metrics\n' +
      '- filesModified: Array of changed files\n' +
      '- acceptanceCriteriaVerification: JSON verification results\n\n' +
      ' COMPLETION EXAMPLES:\n' +
      '- Research: { summary: "Technology evaluation complete", evidence: { optionsEvaluated: 5 } }\n' +
      '- Development: { summary: "Feature implementation complete", filesModified: ["src/api.ts"] }\n' +
      '- Review: { summary: "Code review complete: APPROVED", acceptanceCriteriaVerification: {...} }',
  ),

  // Rejection data for escalation and quality issues
  rejectionData: RejectionDataSchema.optional().describe(
    'REJECTION DATA - Comprehensive rejection and escalation information:\n\n' +
      ' REQUIRED FOR OPERATIONS:\n' +
      '- "escalate": Must provide reason and severity\n' +
      '- "transition" (to needs-changes): Include rejection details\n\n' +
      ' REJECTION DATA STRUCTURE:\n' +
      '- reason: Clear explanation for rejection (REQUIRED)\n' +
      '- severity: Issue impact level (low/medium/high/critical)\n' +
      '- requiredChanges: Specific modification requirements\n' +
      '- blockers: Array of blocking issues\n\n' +
      ' REJECTION EXAMPLES:\n' +
      '- Quality: { reason: "Security vulnerability found", severity: "high" }\n' +
      '- Blocker: { reason: "API dependency unavailable", blockers: ["External service down"] }\n' +
      '- Changes: { reason: "Missing functionality", requiredChanges: "Add user authentication" }',
  ),

  // Scheduling and timing information
  scheduling: SchedulingSchema.optional().describe(
    ' SCHEDULING - Timing and deadline information for the workflow operation:\n\n' +
      ' SCHEDULING COMPONENTS:\n' +
      '- deadline: ISO date deadline for operation completion\n' +
      '- estimatedDuration: Time estimate for the operation\n' +
      '- priority: Operation urgency level\n' +
      '- scheduleFor: ISO date to schedule operation execution\n\n' +
      ' SCHEDULING EXAMPLES:\n' +
      '- Urgent: { deadline: "2024-01-16T17:00:00Z", priority: "urgent" }\n' +
      '- Planned: { scheduleFor: "2024-01-20T09:00:00Z", estimatedDuration: "2 hours" }\n' +
      '- Sprint: { deadline: "2024-01-25T23:59:59Z", priority: "high" }',
  ),

  // Workflow operation constraints
  constraints: ConstraintsSchema.optional().describe(
    ' CONSTRAINTS - Workflow operation constraints and validation controls:\n\n' +
      ' CONSTRAINT OPTIONS:\n' +
      '- forceTransition: Force invalid transitions (emergency use)\n' +
      '- allowSkipValidation: Skip standard validation checks\n' +
      '- createAuditTrail: Generate audit trail entry (default: true)\n' +
      '- notifyStakeholders: Send notifications (default: true)\n\n' +
      ' CONSTRAINT EXAMPLES:\n' +
      '- Emergency: { forceTransition: true, createAuditTrail: true }\n' +
      '- Bulk: { allowSkipValidation: true, notifyStakeholders: false }\n' +
      '- Standard: { createAuditTrail: true, notifyStakeholders: true }',
  ),

  // Batch operation configuration
  batch: BatchOperationsSchema.optional().describe(
    ' BATCH OPERATIONS - Configuration for batch workflow operations:\n\n' +
      ' BATCH COMPONENTS:\n' +
      '- taskIds: Array of task IDs for batch processing\n' +
      '- parallelExecution: Execute operations in parallel\n' +
      '- continueOnError: Continue if individual operations fail\n\n' +
      ' BATCH EXAMPLES:\n' +
      '- Sequential: { taskIds: ["TSK-001", "TSK-002"], parallelExecution: false }\n' +
      '- Parallel: { taskIds: ["TSK-003", "TSK-004"], parallelExecution: true }\n' +
      '- Resilient: { taskIds: ["TSK-005", "TSK-006"], continueOnError: true }',
  ),

  // Conditional operation requirements
  conditions: ConditionsSchema.optional().describe(
    ' CONDITIONS - Conditions that must be met for operation to proceed:\n\n' +
      ' CONDITION TYPES:\n' +
      '- requiredRole: Role that must be current for operation\n' +
      '- requiredStatus: Status that must be current for operation\n' +
      '- customConditions: Array of custom condition checks\n\n' +
      ' CONDITION EXAMPLES:\n' +
      '- Role Check: { requiredRole: "architect" }\n' +
      '- Status Check: { requiredStatus: "in-progress" }\n' +
      '- Custom: { customConditions: ["all_subtasks_completed"] }',
  ),

  // Additional operation metadata
  metadata: z
    .record(z.any())
    .optional()
    .describe(
      ' METADATA - Additional operation-specific data and context:\n\n' +
        ' METADATA USAGE:\n' +
        '- Custom workflow extensions and integrations\n' +
        '- Operation-specific configuration and settings\n' +
        '- Integration with external systems and tools\n' +
        '- Performance metrics and monitoring data\n\n' +
        ' METADATA EXAMPLES:\n' +
        '- Integration: { "jiraTicket": "PROJ-123", "slackChannel": "#dev-team" }\n' +
        '- Metrics: { "complexity": "high", "riskLevel": "medium" }\n' +
        '- Config: { "autoAssign": true, "notificationDelay": 300 }',
    ),
});

export type WorkflowOperationsInput = z.infer<typeof WorkflowOperationsSchema>;

/**
 *  COMPREHENSIVE WORKFLOW OPERATION EXAMPLES
 *
 * ===== CRITICAL DELEGATION OPERATIONS =====
 *
 *  BOOMERANG → RESEARCHER (Research Request):
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
 *  ARCHITECT → SENIOR-DEVELOPER (Implementation Delegation):
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
 *  ARCHITECT → CODE-REVIEW (Review Delegation):
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
 *  RESEARCHER COMPLETION (Research Findings):
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
 *  SENIOR-DEVELOPER COMPLETION (Implementation Complete):
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
 *       "comprehensive-field-specs": " Complete - All 10 entities documented with field types, constraints, relationships",
 *       "practical-examples": " Complete - Added 20+ real-world usage examples for each schema",
 *       "batch-operation-docs": " Complete - Detailed createMany/updateMany documentation with subtask examples",
 *       "agent-usability": " Complete - Clear descriptions and decision frameworks for efficient agent usage",
 *       "relationship-mapping": " Complete - Complete relationship documentation with include/select examples"
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
 *  CODE-REVIEW COMPLETION (Quality Approval):
 * {
 *   "operation": "complete",
 *   "taskId": "TSK-005",
 *   "fromRole": "code-review",
 *   "completionData": {
 *     "summary": "Quality review complete. APPROVED. Schema documentation enhancements meet all quality standards. Comprehensive field specifications, excellent practical examples, and clear agent-friendly descriptions. Manual testing confirmed all examples work correctly.",
 *     "acceptanceCriteriaVerification": {
 *       "documentation-quality": " APPROVED - Comprehensive and well-structured",
 *       "practical-examples": " APPROVED - Real-world examples that agents can use directly",
 *       "batch-operations": " APPROVED - Critical createMany/updateMany operations well documented",
 *       "agent-usability": " APPROVED - Clear decision frameworks and usage patterns",
 *       "consistency": " APPROVED - Consistent formatting and structure across all files"
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
 *  TECHNICAL BLOCKER ESCALATION:
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
 *  QUALITY REJECTION ESCALATION:
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
 *  BATCH DELEGATION (Multiple Related Tasks):
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
 *  BATCH COMPLETION (Coordinated Milestone):
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
 *       "user-registration": " Complete with email validation and password hashing",
 *       "secure-login": " Complete with JWT token generation and validation",
 *       "session-management": " Complete with refresh token rotation",
 *       "integration-testing": " Complete with end-to-end test coverage",
 *       "security-validation": " Complete with input sanitization and rate limiting"
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
 *  PAUSE OPERATION (Temporary Suspension):
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
 *  RESUME OPERATION (Restore Work):
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
