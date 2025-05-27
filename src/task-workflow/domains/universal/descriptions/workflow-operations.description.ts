/**
 * Workflow Operations Tool Description
 * Optimized and simplified for compatibility with Gemini
 */

export const WORKFLOW_OPERATIONS_DESCRIPTION = `
Specialized workflow state management and transitions.

REPLACES WORKFLOW-SPECIFIC TOOLS:
• delegate_task, complete_task, handle_role_transition
• update_task_status (with workflow validation)

WORKFLOW FEATURES:
• Role-based delegation with validation
• Completion with evidence tracking
• Escalation and rejection handling
• Batch workflow operations
• Audit trail and notifications

WORKFLOW OPERATION TYPES (operation parameter):
• delegate - Hand off task from one role to another
• complete - Mark task as completed with evidence
• transition - Change task status with validation
• escalate - Escalate issues, blockers, or quality concerns
• reassign - Change task assignment within/across roles
• pause - Temporarily suspend work
• resume - Resume paused work
• cancel - Terminate task entirely

WORKFLOW ROLES (fromRole/toRole parameters):
• boomerang - Task coordination and delivery
• researcher - Knowledge gathering
• architect - Technical planning
• senior-developer - Implementation
• code-review - Quality assurance

TASK STATUS VALUES (newStatus parameter):
• not-started - Initial state
• in-progress - Active work
• needs-review - Ready for review
• completed - All work finished
• needs-changes - Requires revisions
• paused - Temporarily suspended
• cancelled - Terminated

PRACTICAL EXAMPLES:

Delegation:
{
  operation: "delegate",
  taskId: "TSK-123",
  fromRole: "architect",
  toRole: "senior-developer",
  message: "Implementation plan ready. Please implement authentication."
}

Task Completion:
{
  operation: "complete",
  taskId: "TSK-123",
  fromRole: "senior-developer",
  completionData: {
    summary: "Authentication implementation complete",
    filesModified: [
      "src/auth/auth.service.ts",
      "src/auth/auth.controller.ts"
    ],
    acceptanceCriteriaVerification: {
      "user_registration": "implemented",
      "user_login": "implemented"
    }
  }
}

Escalation:
{
  operation: "escalate",
  taskId: "TSK-123",
  fromRole: "senior-developer",
  toRole: "architect",
  rejectionData: {
    reason: "Technical blocker: JWT library compatibility issue",
    severity: "high",
    blockers: [
      "passport-jwt version conflict"
    ]
  }
}

Status Transition:
{
  operation: "transition",
  taskId: "TSK-123",
  fromRole: "architect",
  newStatus: "needs-review",
  message: "Implementation complete, ready for quality review"
}

Batch Delegation:
{
  operation: "delegate",
  fromRole: "architect",
  toRole: "senior-developer",
  message: "Multiple authentication tasks for implementation",
  batch: {
    taskIds: ["TSK-123", "TSK-124", "TSK-125"],
    parallelExecution: true
  }
}
`;
