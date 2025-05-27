import { Injectable, Logger } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  WorkflowOperationsSchema,
  WorkflowOperationsInput,
} from './workflow-operations.schema';
import { WORKFLOW_OPERATIONS_DESCRIPTION } from './descriptions';

// Type definitions for workflow operation results
interface WorkflowOperationResult {
  delegation?: any;
  task?: any;
  transition: string;
  completionReport?: any;
  escalation?: any;
}

interface BatchOperationResult {
  results: Array<{
    taskId: string;
    success: boolean;
    data?: any;
    error?: string;
  }>;
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
  errors?: Array<{
    taskId: string;
    success: boolean;
    error: string;
  }>;
}

/**
 * Workflow Operations Service
 *
 * Specialized service for workflow state management and transitions.
 * Handles complex workflow operations that require business logic validation.
 *
 * Replaces tools like:
 * - delegate_task
 * - complete_task
 * - handle_role_transition
 * - update_task_status (with workflow validation)
 */
@Injectable()
export class WorkflowOperationsService {
  private readonly logger = new Logger(WorkflowOperationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Tool({
    name: 'workflow_operations',
    description: WORKFLOW_OPERATIONS_DESCRIPTION,
    parameters: WorkflowOperationsSchema,
  })
  async executeWorkflowOperation(input: WorkflowOperationsInput): Promise<any> {
    const startTime = performance.now();

    try {
      this.logger.debug(
        `Workflow Operation: ${input.operation} for ${input.taskId}`,
        {
          fromRole: input.fromRole,
          toRole: input.toRole,
          newStatus: input.newStatus,
        },
      );

      // Validate conditions if specified
      if (input.conditions) {
        await this.validateConditions(input);
      }

      let result: any;

      // Handle batch operations
      if (input.batch) {
        result = await this.executeBatchWorkflowOperation(input);
      } else {
        result = await this.executeSingleWorkflowOperation(input);
      }

      // Create audit trail if enabled
      if (input.constraints?.createAuditTrail !== false) {
        this.createWorkflowAuditTrail(input, result);
      }

      // Send notifications if enabled
      if (input.constraints?.notifyStakeholders !== false) {
        this.sendWorkflowNotifications(input, result);
      }

      const responseTime = performance.now() - startTime;

      this.logger.debug(
        `Workflow operation completed in ${responseTime.toFixed(2)}ms`,
        {
          operation: input.operation,
          taskId: input.taskId,
          responseTime,
        },
      );

      const responseData = {
        success: true,
        data: result,
        metadata: {
          operation: input.operation,
          taskId: input.taskId,
          fromRole: input.fromRole,
          toRole: input.toRole,
          responseTime: Math.round(responseTime),
        },
      };

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(responseData, null, 2),
          },
        ],
      };
    } catch (error) {
      this.logger.error(
        `Workflow operation failed for ${input.operation} on ${input.taskId}:`,
        error,
      );

      const errorData = {
        success: false,
        error: {
          message: error.message,
          code: 'WORKFLOW_OPERATION_FAILED',
          operation: input.operation,
          taskId: input.taskId,
          details: error.stack,
        },
      };

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(errorData, null, 2),
          },
        ],
      };
    }
  }

  private async executeSingleWorkflowOperation(
    input: WorkflowOperationsInput,
  ): Promise<WorkflowOperationResult> {
    switch (input.operation) {
      case 'delegate':
        return await this.handleDelegation(input);

      case 'complete':
        return await this.handleCompletion(input);

      case 'transition':
        return await this.handleTransition(input);

      case 'escalate':
        return await this.handleEscalation(input);

      case 'reassign':
        return await this.handleReassignment(input);

      case 'pause':
        return await this.handlePause(input);

      case 'resume':
        return await this.handleResume(input);

      case 'cancel':
        return await this.handleCancellation(input);

      default:
        throw new Error(
          `Unknown workflow operation: ${input.operation as any}`,
        );
    }
  }

  private async executeBatchWorkflowOperation(
    input: WorkflowOperationsInput,
  ): Promise<BatchOperationResult> {
    const taskIds = input.batch!.taskIds;
    const results: Array<{
      taskId: string;
      success: boolean;
      data?: any;
      error?: string;
    }> = [];
    const errors: Array<{
      taskId: string;
      success: boolean;
      error: string;
    }> = [];

    const executeOperation = async (taskId: string) => {
      try {
        const singleInput = { ...input, taskId, batch: undefined };
        const result = await this.executeSingleWorkflowOperation(singleInput);
        return { taskId, success: true, data: result };
      } catch (error) {
        const errorResult = { taskId, success: false, error: error.message };
        errors.push(errorResult);

        if (!input.batch!.continueOnError) {
          throw error;
        }

        return errorResult;
      }
    };

    if (input.batch!.parallelExecution) {
      // Execute in parallel
      const promises = taskIds.map(executeOperation);
      const settledResults = await Promise.allSettled(promises);
      const mappedResults = settledResults.map((result) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          return { taskId: 'unknown', success: false, error: result.reason };
        }
      });
      results.push(...mappedResults);
    } else {
      // Execute sequentially
      for (const taskId of taskIds) {
        const result = await executeOperation(taskId);
        results.push(result);
      }
    }

    return {
      results,
      summary: {
        total: taskIds.length,
        successful: results.filter((r) => r.success).length,
        failed: errors.length,
      },
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  private async handleDelegation(
    input: WorkflowOperationsInput,
  ): Promise<WorkflowOperationResult> {
    const { taskId, fromRole, toRole, message } = input;

    // Validate delegation is allowed
    await this.validateDelegation(taskId, fromRole!, toRole!);

    // Create delegation record
    const delegation = await this.prisma.delegationRecord.create({
      data: {
        taskId,
        fromMode: fromRole!,
        toMode: toRole!,
        delegationTimestamp: new Date(),
      },
    });

    // Update task status and current mode
    const updatedTask = await this.prisma.task.update({
      where: { taskId: taskId },
      data: {
        currentMode: toRole!,
        status: input.newStatus || 'in-progress',
      },
      include: {
        taskDescription: true,
        delegationRecords: {
          orderBy: { delegationTimestamp: 'desc' },
          take: 1,
        },
      },
    });

    // Create workflow transition record
    await this.createWorkflowTransition(
      taskId,
      fromRole!,
      toRole!,
      'delegation',
      message,
    );

    return {
      delegation,
      task: updatedTask,
      transition: 'delegation_completed',
    };
  }

  private async handleCompletion(
    input: WorkflowOperationsInput,
  ): Promise<WorkflowOperationResult> {
    const { taskId, fromRole, completionData } = input;

    if (!completionData) {
      throw new Error('Completion data is required for completion operations');
    }

    // Validate completion is allowed
    await this.validateCompletion(taskId, fromRole!);

    // Create completion report
    const completionReport = await this.prisma.completionReport.create({
      data: {
        taskId,
        summary: completionData.summary,
        filesModified: completionData.filesModified || [],
        acceptanceCriteriaVerification:
          completionData.acceptanceCriteriaVerification || {},
        delegationSummary: `Task completed by ${fromRole}`,
        createdAt: new Date(),
      },
    });

    // Update task status
    const updatedTask = await this.prisma.task.update({
      where: { taskId: taskId },
      data: {
        status: 'completed',
        completionDate: new Date(),
      },
      include: {
        taskDescription: true,
        completionReports: true,
      },
    });

    // Create workflow transition
    await this.createWorkflowTransition(
      taskId,
      fromRole!,
      fromRole!,
      'completion',
      completionData.summary,
    );

    return {
      completionReport,
      task: updatedTask,
      transition: 'completion_recorded',
    };
  }

  private async handleEscalation(
    input: WorkflowOperationsInput,
  ): Promise<WorkflowOperationResult> {
    const { taskId, fromRole, toRole, rejectionData } = input;

    if (!rejectionData) {
      throw new Error('Rejection data is required for escalation operations');
    }

    // Create escalation record
    const escalation = await this.prisma.delegationRecord.create({
      data: {
        taskId,
        fromMode: fromRole!,
        toMode: toRole!,
        delegationTimestamp: new Date(),
        rejectionReason: rejectionData.reason,
      },
    });

    // Update task status
    const updatedTask = await this.prisma.task.update({
      where: { taskId: taskId },
      data: {
        currentMode: toRole!,
        status: input.newStatus || 'needs-changes',
      },
    });

    // Create workflow transition
    await this.createWorkflowTransition(
      taskId,
      fromRole!,
      toRole!,
      'escalation',
      rejectionData.reason,
    );

    return {
      escalation,
      task: updatedTask,
      transition: 'escalation_completed',
    };
  }

  private async handleTransition(
    input: WorkflowOperationsInput,
  ): Promise<WorkflowOperationResult> {
    const { taskId, fromRole, toRole, message } = input;

    // Update task current mode
    const updatedTask = await this.prisma.task.update({
      where: { taskId: taskId },
      data: {
        currentMode: toRole!,
        status: input.newStatus || 'in-progress',
      },
    });

    // Create workflow transition
    await this.createWorkflowTransition(
      taskId,
      fromRole!,
      toRole!,
      'transition',
      message,
    );

    return {
      task: updatedTask,
      transition: 'role_transition_completed',
    };
  }

  private async handleReassignment(
    input: WorkflowOperationsInput,
  ): Promise<WorkflowOperationResult> {
    // Similar to delegation but with different semantics
    return await this.handleDelegation(input);
  }

  private async handlePause(
    input: WorkflowOperationsInput,
  ): Promise<WorkflowOperationResult> {
    const updatedTask = await this.prisma.task.update({
      where: { taskId: input.taskId },
      data: {
        status: 'paused',
      },
    });

    await this.createWorkflowTransition(
      input.taskId,
      input.fromRole!,
      input.fromRole!,
      'pause',
      input.message,
    );

    return { task: updatedTask, transition: 'task_paused' };
  }

  private async handleResume(
    input: WorkflowOperationsInput,
  ): Promise<WorkflowOperationResult> {
    const updatedTask = await this.prisma.task.update({
      where: { taskId: input.taskId },
      data: {
        status: 'in-progress',
      },
    });

    await this.createWorkflowTransition(
      input.taskId,
      input.fromRole!,
      input.fromRole!,
      'resume',
      input.message,
    );

    return { task: updatedTask, transition: 'task_resumed' };
  }

  private async handleCancellation(
    input: WorkflowOperationsInput,
  ): Promise<WorkflowOperationResult> {
    const updatedTask = await this.prisma.task.update({
      where: { taskId: input.taskId },
      data: {
        status: 'cancelled',
      },
    });

    await this.createWorkflowTransition(
      input.taskId,
      input.fromRole!,
      input.fromRole!,
      'cancellation',
      input.message,
    );

    return { task: updatedTask, transition: 'task_cancelled' };
  }

  // Validation Methods

  private async validateConditions(
    input: WorkflowOperationsInput,
  ): Promise<void> {
    if (!input.conditions) return;

    const task = await this.prisma.task.findUnique({
      where: { taskId: input.taskId },
    });

    if (!task) {
      throw new Error(`Task ${input.taskId} not found`);
    }

    if (
      input.conditions.requiredStatus &&
      task.status !== input.conditions.requiredStatus
    ) {
      throw new Error(
        `Task status must be ${input.conditions.requiredStatus}, but is ${task.status}`,
      );
    }

    if (
      input.conditions.requiredRole &&
      task.currentMode !== input.conditions.requiredRole
    ) {
      throw new Error(
        `Task must be owned by ${input.conditions.requiredRole}, but is owned by ${task.currentMode}`,
      );
    }
  }

  private async validateDelegation(
    taskId: string,
    fromRole: string,
    _toRole: string,
  ): Promise<void> {
    const task = await this.prisma.task.findUnique({
      where: { taskId: taskId },
    });

    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    if (task.currentMode !== fromRole) {
      throw new Error(
        `Cannot delegate from ${fromRole}: task is currently owned by ${task.currentMode}`,
      );
    }

    if (task.status === 'completed') {
      throw new Error('Cannot delegate completed tasks');
    }

    if (task.status === 'cancelled') {
      throw new Error('Cannot delegate cancelled tasks');
    }
  }

  private async validateCompletion(
    taskId: string,
    fromRole: string,
  ): Promise<void> {
    const task = await this.prisma.task.findUnique({
      where: { taskId: taskId },
    });

    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }

    if (task.currentMode !== fromRole) {
      throw new Error(`Cannot complete task: not owned by ${fromRole}`);
    }

    if (task.status === 'completed') {
      throw new Error('Task is already completed');
    }
  }

  // Helper Methods

  private async createWorkflowTransition(
    taskId: string,
    fromRole: string,
    toRole: string,
    transitionType: string,
    reason?: string,
  ): Promise<void> {
    await this.prisma.workflowTransition.create({
      data: {
        taskId,
        fromMode: fromRole,
        toMode: toRole,
        reason: reason || `${transitionType} from ${fromRole} to ${toRole}`,
        transitionTimestamp: new Date(),
      },
    });
  }

  private createWorkflowAuditTrail(
    input: WorkflowOperationsInput,
    result: any,
  ): void {
    this.logger.log(`Workflow Audit: ${input.operation} on ${input.taskId}`, {
      fromRole: input.fromRole,
      toRole: input.toRole,
      message: input.message,
      result: result.transition || 'operation_completed',
    });
  }

  private sendWorkflowNotifications(
    input: WorkflowOperationsInput,
    result: any,
  ): void {
    // Placeholder for notification system
    this.logger.debug(
      `Workflow Notification: ${input.operation} completed for ${input.taskId}`,
      {
        recipients: [input.fromRole, input.toRole].filter(Boolean),
        operation: input.operation,
        result: result.transition,
      },
    );
  }
}
