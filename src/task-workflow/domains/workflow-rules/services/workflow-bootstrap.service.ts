import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

// Simplified bootstrap input - just execution setup
export interface BootstrapWorkflowInput {
  // Workflow execution setup only
  initialRole:
    | 'boomerang'
    | 'researcher'
    | 'architect'
    | 'senior-developer'
    | 'code-review';
  executionMode?: 'GUIDED' | 'AUTOMATED' | 'HYBRID';
  projectPath?: string;
}

/**
 * Workflow Bootstrap Service - Simple Execution Kickoff
 *
 * SIMPLIFIED APPROACH:
 * 1. Creates workflow execution without any task details
 * 2. Points execution to first boomerang step (git integration setup)
 * 3. Returns comprehensive execution data for immediate step execution
 * 4. Workflow steps handle all task gathering, analysis, and creation
 */
@Injectable()
export class WorkflowBootstrapService {
  private readonly logger = new Logger(WorkflowBootstrapService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Bootstrap a workflow - SIMPLE EXECUTION KICKOFF
   *
   * WHAT THIS DOES:
   * 1. Creates workflow execution without task (taskId = null)
   * 2. Points execution to first boomerang step (git integration setup)
   * 3. Returns comprehensive execution data for immediate step execution
   * 4. Workflow steps guide the agent through everything else
   *
   * WHAT THE BOOMERANG WORKFLOW WILL DO:
   * - Step 1: Git integration setup and verification
   * - Step 2: Source code analysis with functional testing
   * - Step 3: Gather task requirements and create comprehensive task
   * - Step 4: Research decision framework
   * - Step 5: Role delegation
   */
  async bootstrapWorkflow(input: BootstrapWorkflowInput): Promise<any> {
    const startTime = Date.now();

    try {
      this.logger.log(
        `Starting workflow execution with role: ${input.initialRole}`,
      );

      // Single transaction for workflow execution creation
      const result = await this.prisma.$transaction(async (tx) => {
        // Step 1: Get role with full context
        const role = await tx.workflowRole.findUnique({
          where: { name: input.initialRole },
          select: {
            id: true,
            name: true,
            displayName: true,
            description: true,
            capabilities: true,
            priority: true,
            roleType: true,
          },
        });

        if (!role) {
          throw new Error(`Role '${input.initialRole}' not found`);
        }

        // Step 2: Get the first workflow step for this role
        const firstStep = await tx.workflowStep.findFirst({
          where: {
            roleId: role.id,
          },
          orderBy: { sequenceNumber: 'asc' },
          select: {
            id: true,
            name: true,
            displayName: true,
            description: true,
            sequenceNumber: true,
            stepType: true,
            estimatedTime: true,
            behavioralContext: true,
            approachGuidance: true,
            qualityChecklist: true,
            actionData: true,
            contextValidation: true,
            patternEnforcement: true,
          },
        });

        if (!firstStep) {
          throw new Error(
            `No workflow steps found for role '${input.initialRole}'`,
          );
        }

        // Step 3: Create workflow execution - simple kickoff
        const workflowExecution = await tx.workflowExecution.create({
          data: {
            taskId: null, // No task yet - will be created by workflow
            currentRoleId: role.id,
            currentStepId: firstStep.id,
            executionMode: input.executionMode || 'GUIDED',
            autoCreatedTask: false,
            executionContext: {
              bootstrapped: true,
              bootstrapTime: new Date().toISOString(),
              projectPath: input.projectPath,
              initialRoleName: input.initialRole,
              firstStepName: firstStep.name,
              workflowPhase: 'kickoff',
            },
            executionState: {
              phase: 'initialized',
              currentContext: {},
              progressMarkers: [],
              currentStep: {
                id: firstStep.id,
                name: firstStep.name,
                displayName: firstStep.displayName,
                sequenceNumber: firstStep.sequenceNumber,
                assignedAt: new Date().toISOString(),
              },
            },
          },
          include: {
            task: true, // Will be null
            currentRole: {
              select: {
                id: true,
                name: true,
                displayName: true,
                description: true,
                capabilities: true,
                priority: true,
                roleType: true,
              },
            },
            currentStep: {
              select: {
                id: true,
                name: true,
                displayName: true,
                description: true,
                behavioralContext: true,
                approachGuidance: true,
                qualityChecklist: true,
                actionData: true,
                contextValidation: true,
                patternEnforcement: true,
              },
            },
          },
        });

        return {
          workflowExecution,
          role,
          firstStep,
        };
      });

      const duration = Date.now() - startTime;
      this.logger.log(
        `Workflow execution started in ${duration}ms - Ready for step execution`,
      );

      // Return execution data for immediate workflow start
      return {
        success: true,
        message: `Workflow execution started successfully. Begin with: ${result.firstStep.displayName}`,
        resources: {
          taskId: null, // Will be created by workflow
          executionId: result.workflowExecution.id,
          firstStepId: result.firstStep.id,
        },
        execution: result.workflowExecution,
        currentStep: result.firstStep,
        currentRole: result.role,
      };
    } catch (error) {
      this.logger.error(`Bootstrap failed:`, error);
      return {
        success: false,
        message: `Bootstrap failed: ${error.message}`,
        resources: {
          taskId: null,
          executionId: '',
          firstStepId: null,
        },
        execution: null,
        currentStep: null,
        currentRole: null,
      };
    }
  }
}
