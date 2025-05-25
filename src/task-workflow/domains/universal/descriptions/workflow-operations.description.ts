/**
 * Workflow Operations Tool Description
 * Comprehensive documentation for the workflow_operations MCP tool
 */

export const WORKFLOW_OPERATIONS_DESCRIPTION = `
Specialized workflow state management and transitions.

🎯 REPLACES WORKFLOW-SPECIFIC TOOLS:
• delegate_task, complete_task, handle_role_transition
• update_task_status (with workflow validation)
• Workflow state management and validation
• Role-based permission checking
• Escalation and rejection handling
• Batch workflow operations

🚀 ADVANCED WORKFLOW FEATURES:
• Role-based delegation with validation
• Completion with evidence tracking
• Escalation and rejection handling
• Batch workflow operations
• Conditional operations
• Audit trail and notifications
• State consistency validation
• Permission-based access control

📊 WORKFLOW OPERATION TYPES:

🔹 CORE WORKFLOW OPERATIONS:
• 'delegate': Hand off task/subtask from one role to another (ESSENTIAL for workflow)
• 'complete': Mark task/operation as completed with evidence (CRITICAL for closure)
• 'transition': Change task status with workflow validation (IMPORTANT for state management)

🔹 ESCALATION & MANAGEMENT:
• 'escalate': Escalate issues, blockers, or quality concerns (NECESSARY for problem resolution)
• 'reassign': Change task assignment within same role or to different role
• 'pause': Temporarily halt work on task (preserves context for resumption)
• 'resume': Resume paused work (restores previous context and state)
• 'cancel': Cancel task entirely (requires proper cleanup and notification)

💡 WORKFLOW OPERATION BENEFITS:
• Role Validation: Ensures proper role transitions and permissions
• State Consistency: Maintains workflow state integrity across operations
• Audit Trail: Complete tracking of all workflow changes and decisions
• Evidence Tracking: Documents completion criteria and verification results

📋 WORKFLOW ROLES & HIERARCHY:

🔹 ROLE DEFINITIONS:
• 'boomerang': Task intake, analysis, research evaluation, final delivery (ENTRY/EXIT point)
• 'researcher': In-depth research, knowledge gathering, option evaluation (KNOWLEDGE specialist)
• 'architect': Technical planning, implementation design, subtask creation (DESIGN specialist)
• 'senior-developer': Code implementation, testing, technical execution (IMPLEMENTATION specialist)
• 'code-review': Quality assurance, manual testing, approval/rejection (QUALITY specialist)

🔹 TYPICAL DELEGATION FLOW:
boomerang → researcher → boomerang → architect → senior-developer → architect → code-review → boomerang

🔹 ROLE TRANSITION RULES:
• Each role has specific entry/exit criteria
• Delegation requires proper handoff documentation
• Role validation ensures appropriate skill matching
• Escalation paths defined for each role transition

📋 TASK STATUS PROGRESSION:

🔹 WORKFLOW STATUS DEFINITIONS:
• 'not-started': Initial state, awaiting role assignment
• 'in-progress': Active work in progress by assigned role
• 'needs-review': Work completed, awaiting quality review
• 'completed': All work finished and approved
• 'needs-changes': Review identified issues requiring fixes
• 'paused': Work temporarily suspended (preserves context)
• 'cancelled': Task terminated (requires cleanup)

🔹 STATUS TRANSITION RULES:
• not-started → in-progress (via delegation)
• in-progress → needs-review (via completion)
• needs-review → completed (via approval)
• needs-review → needs-changes (via rejection)
• needs-changes → in-progress (via reassignment)
• Any status → paused/cancelled (via management operations)

📋 PRACTICAL WORKFLOW EXAMPLES:

🔸 DELEGATION OPERATIONS:
• Boomerang to Researcher:
  {
    operation: "delegate",
    taskId: "TSK-006",
    fromRole: "boomerang",
    toRole: "researcher",
    message: "Need research on authentication libraries and security best practices"
  }

• Researcher to Boomerang:
  {
    operation: "delegate",
    taskId: "TSK-006",
    fromRole: "researcher",
    toRole: "boomerang",
    message: "Research complete. Key findings: JWT with passport-jwt recommended. Ready for architecture."
  }

• Boomerang to Architect:
  {
    operation: "delegate",
    taskId: "TSK-006",
    fromRole: "boomerang",
    toRole: "architect",
    message: "Research findings reviewed. Please create implementation plan for JWT authentication."
  }

• Architect to Senior Developer:
  {
    operation: "delegate",
    taskId: "TSK-006",
    fromRole: "architect",
    toRole: "senior-developer",
    message: "Implementation plan ready. Please implement batch B001: Authentication Core."
  }

• Senior Developer to Architect:
  {
    operation: "delegate",
    taskId: "TSK-006",
    fromRole: "senior-developer",
    toRole: "architect",
    message: "Batch B001 complete. All subtasks finished. Ready for review delegation."
  }

• Architect to Code Review:
  {
    operation: "delegate",
    taskId: "TSK-006",
    fromRole: "architect",
    toRole: "code-review",
    message: "Implementation complete. Please review authentication system implementation."
  }

• Code Review to Boomerang:
  {
    operation: "delegate",
    taskId: "TSK-006",
    fromRole: "code-review",
    toRole: "boomerang",
    message: "Review complete. Status: APPROVED. All acceptance criteria met. Ready for delivery."
  }

🔸 COMPLETION OPERATIONS:
• Task completion with evidence:
  {
    operation: "complete",
    taskId: "TSK-006",
    fromRole: "boomerang",
    completionData: {
      summary: "User authentication system successfully implemented and tested",
      filesModified: [
        "src/auth/auth.service.ts",
        "src/auth/auth.controller.ts",
        "src/auth/jwt.strategy.ts",
        "src/auth/auth.module.ts"
      ],
      acceptanceCriteriaVerification: {
        "user_registration": "implemented_and_tested",
        "user_login": "implemented_and_tested",
        "jwt_expiry": "configured_24_hours",
        "password_hashing": "bcrypt_implemented"
      },
      evidence: {
        "manual_testing": "All authentication flows tested successfully",
        "code_review": "APPROVED with comprehensive security validation",
        "test_coverage": "95% coverage including edge cases"
      }
    }
  }

• Research completion:
  {
    operation: "complete",
    taskId: "TSK-006",
    fromRole: "researcher",
    completionData: {
      summary: "Authentication research completed with library recommendations",
      evidence: {
        "libraries_evaluated": ["jsonwebtoken", "passport-jwt", "bcrypt"],
        "security_analysis": "JWT best practices documented",
        "recommendations": "passport-jwt for NestJS integration"
      }
    }
  }

🔸 TRANSITION OPERATIONS:
• Status change with validation:
  {
    operation: "transition",
    taskId: "TSK-006",
    fromRole: "architect",
    newStatus: "needs-review",
    message: "Implementation complete, ready for quality review"
  }

• Batch status transition:
  {
    operation: "transition",
    taskId: "TSK-006",
    fromRole: "senior-developer",
    newStatus: "in-progress",
    message: "Starting implementation of authentication core components"
  }

🔸 ESCALATION OPERATIONS:
• Technical blocker escalation:
  {
    operation: "escalate",
    taskId: "TSK-006",
    fromRole: "senior-developer",
    toRole: "architect",
    rejectionData: {
      reason: "Technical blocker: JWT library compatibility issue with NestJS version",
      severity: "high",
      blockers: [
        "passport-jwt version conflict",
        "TypeScript compatibility issues"
      ],
      requiredChanges: "Need alternative JWT strategy or library upgrade"
    }
  }

• Quality concern escalation:
  {
    operation: "escalate",
    taskId: "TSK-006",
    fromRole: "code-review",
    toRole: "architect",
    rejectionData: {
      reason: "Security vulnerability: Password hashing implementation insufficient",
      severity: "critical",
      blockers: [
        "Weak salt generation",
        "Missing rate limiting on login attempts"
      ],
      requiredChanges: "Implement proper bcrypt configuration and rate limiting"
    }
  }

• Resource constraint escalation:
  {
    operation: "escalate",
    taskId: "TSK-006",
    fromRole: "architect",
    toRole: "boomerang",
    rejectionData: {
      reason: "Resource constraint: Authentication implementation requires database migration",
      severity: "medium",
      blockers: [
        "User table schema changes needed",
        "Migration strategy required"
      ],
      requiredChanges: "Need database migration plan and approval"
    }
  }

🔸 MANAGEMENT OPERATIONS:
• Pause task:
  {
    operation: "pause",
    taskId: "TSK-006",
    fromRole: "senior-developer",
    message: "Pausing for dependency resolution: waiting for database migration approval"
  }

• Resume task:
  {
    operation: "resume",
    taskId: "TSK-006",
    fromRole: "senior-developer",
    message: "Resuming implementation: database migration approved and completed"
  }

• Cancel task:
  {
    operation: "cancel",
    taskId: "TSK-006",
    fromRole: "boomerang",
    message: "Cancelling task: business requirements changed, authentication no longer needed"
  }

• Reassign task:
  {
    operation: "reassign",
    taskId: "TSK-006",
    fromRole: "architect",
    toRole: "senior-developer",
    message: "Reassigning to different developer: original assignee unavailable"
  }

🔸 BATCH WORKFLOW OPERATIONS:
• Batch delegation:
  {
    operation: "delegate",
    fromRole: "architect",
    toRole: "senior-developer",
    message: "Delegating multiple authentication tasks for parallel implementation",
    batch: {
      taskIds: ["TSK-006", "TSK-007", "TSK-008"],
      parallelExecution: true,
      continueOnError: false
    }
  }

• Batch completion:
  {
    operation: "complete",
    fromRole: "senior-developer",
    completionData: {
      summary: "Authentication module batch completed",
      evidence: {
        "batch_testing": "All components tested together",
        "integration": "Full authentication flow validated"
      }
    },
    batch: {
      taskIds: ["TSK-006", "TSK-007", "TSK-008"],
      parallelExecution: false,
      continueOnError: true
    }
  }

🔸 CONDITIONAL OPERATIONS:
• Conditional delegation:
  {
    operation: "delegate",
    taskId: "TSK-006",
    fromRole: "architect",
    toRole: "senior-developer",
    conditions: {
      requiredStatus: "in-progress",
      requiredRole: "architect"
    },
    message: "Delegating only if task is in-progress and owned by architect"
  }

• Conditional completion:
  {
    operation: "complete",
    taskId: "TSK-006",
    fromRole: "code-review",
    conditions: {
      requiredStatus: "needs-review",
      customConditions: ["all_tests_passing", "security_scan_clean"]
    },
    completionData: {
      summary: "Task completed after all conditions met"
    }
  }

🔸 SCHEDULING OPERATIONS:
• Scheduled delegation:
  {
    operation: "delegate",
    taskId: "TSK-006",
    fromRole: "architect",
    toRole: "senior-developer",
    scheduling: {
      scheduleFor: "2024-01-16T09:00:00Z",
      deadline: "2024-01-18T17:00:00Z",
      priority: "high",
      estimatedDuration: "2 days"
    },
    message: "Scheduled delegation for Monday morning start"
  }

💡 WORKFLOW BEST PRACTICES:
• Always provide clear, actionable messages in delegations
• Include specific evidence in completion operations
• Use appropriate severity levels for escalations
• Validate role permissions before operations
• Maintain audit trail for compliance
• Use batch operations for related tasks
• Apply conditions to prevent invalid state transitions

⚠️ VALIDATION RULES:
• fromRole must match current task assignment
• Role transitions must follow defined workflow paths
• Completion requires evidence and verification
• Escalation requires reason and severity
• Status transitions must be valid for current state
• Batch operations require consistent permissions

🎯 OPERATION CONSTRAINTS:
• createAuditTrail: Automatic audit logging (default: true)
• notifyStakeholders: Send notifications (default: true)
• allowSkipValidation: Bypass validation (default: false)
• forceTransition: Force invalid transitions (default: false)

🔒 AUDIT TRAIL FEATURES:
• Complete operation history tracking
• User identification and timestamps
• Reason codes and metadata preservation
• State change documentation
• Evidence and verification tracking
• Compliance reporting support

This tool provides comprehensive workflow state management with enterprise-grade validation, audit trails, and role-based access control for complex software development workflows.
`;
