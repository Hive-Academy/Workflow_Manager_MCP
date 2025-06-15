import { Injectable, Logger } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';
// EnvelopeBuilderService removed - using minimal responses
import {
  WorkflowExecutionInput,
  WorkflowExecutionOperationsService,
} from '../services/workflow-execution-operations.service';

// ===================================================================
// 🎯 STRUCTURED SCHEMAS: Proper structure definitions instead of z.any()
// ===================================================================

// Execution State Schema - Based on actual usage patterns
const ExecutionStateSchema = z
  .object({
    phase: z
      .enum(['initialized', 'in-progress', 'completed', 'failed', 'paused'])
      .optional(),
    currentContext: z.record(z.string(), z.unknown()).optional(),
    progressMarkers: z.array(z.string()).optional(),
    lastProgressUpdate: z.string().optional(),
    lastCompletedStep: z
      .object({
        id: z.string(),
        name: z.string().optional(),
        completedAt: z.string(),
        result: z.enum(['success', 'failure']),
        executionData: z.unknown().optional(),
      })
      .optional(),
    currentStep: z
      .object({
        id: z.string(),
        name: z.string(),
        sequenceNumber: z.number().optional(),
        assignedAt: z.string(),
      })
      .optional(),
  })
  .describe('Current workflow execution state');

// Task Creation Data Schema - For auto-created tasks
const TaskCreationDataSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    requirements: z.string().optional(),
    codebaseAnalysis: z.record(z.string(), z.unknown()).optional(),
    gitBranch: z.string().optional(),
    priority: z.enum(['Low', 'Medium', 'High', 'Critical']).optional(),
  })
  .describe('Data used for automatic task creation');

// Execution Context Schema - Additional context for execution
const ExecutionContextSchema = z
  .object({
    bootstrapped: z.boolean().optional(),
    bootstrapTime: z.string().optional(),
    projectPath: z.string().optional(),
    initialRoleName: z.string().optional(),
    firstStepName: z.string().optional(),
    workflowPhase: z.string().optional(),
    taskCreationData: TaskCreationDataSchema.optional(),
  })
  .describe('Additional execution context');

// Last Error Schema - Error tracking
const LastErrorSchema = z
  .object({
    message: z.string(),
    timestamp: z.string(),
    stack: z.string().optional(),
    code: z.string().optional(),
    details: z.unknown().optional(),
  })
  .describe('Last error encountered during execution');

// Update Data Schema - What can be updated in WorkflowExecution
const UpdateDataSchema = z
  .object({
    currentRoleId: z.string().optional(),
    currentStepId: z.string().optional(),
    executionState: ExecutionStateSchema.optional(),
    completedAt: z.string().optional(), // ISO date string
    autoCreatedTask: z.boolean().optional(),
    taskCreationData: TaskCreationDataSchema.optional(),
    stepsCompleted: z.number().optional(),
    totalSteps: z.number().optional(),
    progressPercentage: z.number().min(0).max(100).optional(),
    executionMode: z.enum(['GUIDED', 'AUTOMATED', 'HYBRID']).optional(),
    executionContext: ExecutionContextSchema.optional(),
    lastError: LastErrorSchema.optional(),
    recoveryAttempts: z.number().optional(),
    maxRecoveryAttempts: z.number().optional(),
  })
  .describe('Fields that can be updated in WorkflowExecution');

// Service Call Schema - For orchestration
const ServiceCallSchema = z
  .object({
    serviceName: z.string().describe('MCP service name'),
    operation: z.string().describe('Operation to execute'),
    parameters: z
      .record(
        z.string(),
        z.union([z.string(), z.number(), z.boolean(), z.unknown()]),
      )
      .describe('Operation parameters'),
  })
  .describe('MCP service call configuration');

// Orchestration Config Schema
const OrchestrationConfigSchema = z
  .object({
    serviceCalls: z.array(ServiceCallSchema).optional(),
    executionMode: z.enum(['sequential', 'parallel']).optional(),
    continueOnFailure: z.boolean().optional(),
  })
  .describe('Configuration for orchestrating multiple service calls');

// Context Updates Schema - For updating execution context
const ContextUpdatesSchema = z
  .object({
    bootstrapped: z.boolean().optional(),
    bootstrapTime: z.string().optional(),
    projectPath: z.string().optional(),
    initialRoleName: z.string().optional(),
    firstStepName: z.string().optional(),
    workflowPhase: z.string().optional(),
    taskCreationData: TaskCreationDataSchema.optional(),
    // Allow additional dynamic context fields
  })
  .passthrough()
  .describe('Context updates to merge with existing execution context');

// Main Schema for workflow execution operations
const WorkflowExecutionSchema = z
  .object({
    operation: z
      .enum([
        'create_execution',
        'get_execution',
        'update_execution',
        'complete_execution',
        'get_active_executions',
        'get_execution_context',
        'update_execution_context',
      ])
      .describe('Operation to execute'),

    // Identifiers
    taskId: z
      .number()
      .optional()
      .describe('Task ID (optional for bootstrap executions)'),
    executionId: z
      .string()
      .optional()
      .describe('Execution ID for operations requiring it'),

    // Role and execution settings
    roleName: z
      .enum([
        'boomerang',
        'researcher',
        'architect',
        'senior-developer',
        'code-review',
      ])
      .optional()
      .describe('Role name for execution'),

    executionMode: z
      .enum(['GUIDED', 'AUTOMATED', 'HYBRID'])
      .optional()
      .describe('Execution mode'),
    autoCreatedTask: z
      .boolean()
      .optional()
      .describe('Whether task was auto-created'),

    // Structured data fields - NO MORE z.any()
    executionContext: ExecutionContextSchema.optional(),
    updateData: UpdateDataSchema.optional(),
    stepId: z.string().optional().describe('Current step ID'),
    orchestrationConfig: OrchestrationConfigSchema.optional(),

    // Context operation fields
    dataKey: z
      .string()
      .optional()
      .describe('Specific data key to retrieve from context'),
    contextUpdates: ContextUpdatesSchema.optional(),
  })
  .refine(
    (data) => {
      // Validation rules for different operations
      if (data.operation === 'get_execution') {
        return data.taskId !== undefined || data.executionId !== undefined;
      }
      if (
        [
          'update_execution',
          'complete_execution',
          'get_execution_context',
          'update_execution_context',
        ].includes(data.operation)
      ) {
        return data.executionId !== undefined;
      }
      if (data.operation === 'create_execution') {
        return data.roleName !== undefined;
      }
      if (data.operation === 'update_execution_context') {
        return data.contextUpdates !== undefined;
      }
      return true;
    },
    {
      message:
        'Invalid operation parameters - check required fields for each operation',
    },
  )
  .describe('Workflow execution operation with strongly typed parameters');

type WorkflowExecutionInputSchema = z.infer<typeof WorkflowExecutionSchema>;

// ===================================================================
// 🎯 WORKFLOW EXECUTION MCP SERVICE - NO MORE z.any() USAGE
// ===================================================================

/**
 * Workflow Execution MCP Service
 *
 * ✅ FIXED: Completely eliminated z.any() usage
 * ✅ STRUCTURED: All schemas properly typed based on Prisma model
 * ✅ VALIDATED: Strong type checking for all operations
 *
 * Simplified MCP interface that delegates to specialized services.
 * Follows Single Responsibility Principle - only handles MCP communication.
 */
@Injectable()
export class WorkflowExecutionMcpService {
  private readonly logger = new Logger(WorkflowExecutionMcpService.name);

  constructor(
    private readonly executionOps: WorkflowExecutionOperationsService,
  ) {}

  @Tool({
    name: 'workflow_execution_operations',
    description: `
**⚙️ WORKFLOW STATE MANAGEMENT - Query and manage execution state only**

**FOCUSED OPERATIONS:**
- get_active_executions: List all active executions (no parameters required)
- get_execution: Get current execution state (requires taskId OR executionId) 
- update_execution: Update execution state and progress (requires executionId + updateData)
- complete_execution: Mark execution as completed (requires executionId)
- get_execution_context: Get execution context data (requires executionId, optional dataKey)
- update_execution_context: Update execution context (requires executionId + contextUpdates)

**✅ STRONGLY TYPED: All parameters are properly validated - no z.any() usage**

**updateData fields (all optional):**
- currentRoleId: string (role ID)
- currentStepId: string (step ID) 
- executionState: object (workflow state)
- stepsCompleted: number (completed step count)
- totalSteps: number (total steps)
- progressPercentage: number (0-100)
- executionContext: object (additional context)
- lastError: object (error details)
- completedAt: string (ISO date)

**Does NOT provide:**
❌ Workflow guidance (use get_workflow_guidance)
❌ Step guidance (use get_step_guidance)  
❌ Role recommendations (use role transition tools)
❌ MCP operations (use execute_mcp_operation)

**Examples:**
- List active: { "operation": "get_active_executions" }
- Get by taskId: { "operation": "get_execution", "taskId": 123 }
- Update progress: { "operation": "update_execution", "executionId": "exec-123", "updateData": { "stepsCompleted": 1, "progressPercentage": 20 } }
- Get context: { "operation": "get_execution_context", "executionId": "exec-123" }
`,
    parameters: WorkflowExecutionSchema,
  })
  async executeWorkflowOperation(input: WorkflowExecutionInputSchema): Promise<{
    content: Array<{ type: 'text'; text: string }>;
  }> {
    try {
      this.logger.debug(`Workflow Execution: ${input.operation}`, {
        taskId: input.taskId,
        executionId: input.executionId,
        operation: input.operation,
      });

      const workflowInput: WorkflowExecutionInput = {
        taskId: input.taskId,
        executionId: input.executionId,
        roleName: input.roleName,
        executionMode: input.executionMode,
        autoCreatedTask: input.autoCreatedTask,
        executionContext: input.executionContext,
        updateData: input.updateData,
        stepId: input.stepId,
        orchestrationConfig: input.orchestrationConfig,
      };

      let result: any;

      switch (input.operation) {
        case 'create_execution':
          result = await this.executionOps.createExecution(workflowInput);
          break;
        case 'get_execution':
          result = await this.executionOps.getExecution(workflowInput);
          break;
        case 'update_execution':
          result = await this.executionOps.updateExecution(workflowInput);
          break;
        case 'complete_execution':
          result = await this.executionOps.completeExecution(workflowInput);
          break;
        case 'get_active_executions':
          result = await this.executionOps.getActiveExecutions();
          break;

        case 'get_execution_context':
          if (!input.executionId) {
            throw new Error(
              'executionId is required for get_execution_context',
            );
          }
          result = await this.executionOps.getExecutionContext({
            executionId: input.executionId,
            dataKey: input.dataKey,
          });
          break;
        case 'update_execution_context':
          if (!input.executionId) {
            throw new Error(
              'executionId is required for update_execution_context',
            );
          }
          if (!input.contextUpdates) {
            throw new Error(
              'contextUpdates is required for update_execution_context',
            );
          }
          result = await this.executionOps.updateExecutionContext({
            executionId: input.executionId,
            contextUpdates: input.contextUpdates,
          });
          break;
        default: {
          const exhaustiveCheck: never = input.operation;
          throw new Error(`Unknown operation: ${String(exhaustiveCheck)}`);
        }
      }

      // Return MINIMAL state data only - NO guidance generation, NO envelopes
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                operation: input.operation,
                taskId: input.taskId,
                executionId: input.executionId,
                success: true,
                data: result,
                timestamp: new Date().toISOString(),
              },
              null,
              2,
            ),
          },
        ],
      };
    } catch (error: unknown) {
      this.logger.error(`Workflow execution failed:`, error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                operation: input.operation,
                taskId: input.taskId,
                executionId: input.executionId,
                success: false,
                error: {
                  message: errorMessage,
                  code: 'WORKFLOW_EXECUTION_FAILED',
                },
                timestamp: new Date().toISOString(),
              },
              null,
              2,
            ),
          },
        ],
      };
    }
  }
}
