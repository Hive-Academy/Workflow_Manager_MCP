/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  sanitizedData?: any;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  severity: 'error' | 'warning';
}

export interface ErrorBoundary {
  operation: string;
  taskId?: string;
  input: any;
  error: Error;
  context: Record<string, any>;
  recoveryAction?: string;
}

@Injectable()
export class ValidationErrorBoundaryService {
  private readonly logger = new Logger(ValidationErrorBoundaryService.name);

  // 🚀 ST-011: Advanced validation and error boundaries

  // Validate task context request parameters
  validateTaskContextRequest(params: any): ValidationResult {
    const errors: ValidationError[] = [];

    // Validate taskId
    if (!params.taskId) {
      errors.push({
        field: 'taskId',
        message: 'Task ID is required',
        code: 'MISSING_TASK_ID',
        severity: 'error',
      });
    } else if (
      typeof params.taskId !== 'string' ||
      params.taskId.trim().length === 0
    ) {
      errors.push({
        field: 'taskId',
        message: 'Task ID must be a non-empty string',
        code: 'INVALID_TASK_ID_FORMAT',
        severity: 'error',
      });
    }

    // Validate sliceType if provided
    if (params.sliceType) {
      const validSliceTypes = [
        'STATUS',
        'TD',
        'IP',
        'COMMENTS',
        'DELEGATIONS',
        'WORKFLOW',
        'FULL',
      ];
      if (!validSliceTypes.includes(params.sliceType)) {
        errors.push({
          field: 'sliceType',
          message: `Invalid slice type. Must be one of: ${validSliceTypes.join(', ')}`,
          code: 'INVALID_SLICE_TYPE',
          severity: 'error',
        });
      }
    }

    // Validate optional parameters
    if (params.maxComments !== undefined) {
      if (
        !Number.isInteger(params.maxComments) ||
        params.maxComments < 0 ||
        params.maxComments > 100
      ) {
        errors.push({
          field: 'maxComments',
          message: 'maxComments must be an integer between 0 and 100',
          code: 'INVALID_MAX_COMMENTS',
          severity: 'warning',
        });
      }
    }

    if (params.maxDelegations !== undefined) {
      if (
        !Number.isInteger(params.maxDelegations) ||
        params.maxDelegations < 0 ||
        params.maxDelegations > 50
      ) {
        errors.push({
          field: 'maxDelegations',
          message: 'maxDelegations must be an integer between 0 and 50',
          code: 'INVALID_MAX_DELEGATIONS',
          severity: 'warning',
        });
      }
    }

    // Sanitize data
    const sanitizedData = {
      taskId: params.taskId?.trim(),
      sliceType: params.sliceType || 'FULL',
      includeRelated: Boolean(params.includeRelated),
      maxComments: Math.min(Math.max(params.maxComments || 5, 0), 100),
      maxDelegations: Math.min(Math.max(params.maxDelegations || 10, 0), 50),
    };

    return {
      isValid: errors.filter((e) => e.severity === 'error').length === 0,
      errors,
      sanitizedData,
    };
  }

  // Validate context diff request parameters
  validateContextDiffRequest(params: any): ValidationResult {
    const errors: ValidationError[] = [];

    // Validate taskId (required)
    if (!params.taskId) {
      errors.push({
        field: 'taskId',
        message: 'Task ID is required for context diff',
        code: 'MISSING_TASK_ID',
        severity: 'error',
      });
    }

    // Validate hash format if provided
    if (params.lastContextHash && typeof params.lastContextHash !== 'string') {
      errors.push({
        field: 'lastContextHash',
        message: 'Context hash must be a string',
        code: 'INVALID_HASH_FORMAT',
        severity: 'error',
      });
    }

    // Validate hash length (SHA-256 = 64 chars)
    if (params.lastContextHash && params.lastContextHash.length !== 64) {
      errors.push({
        field: 'lastContextHash',
        message: 'Context hash must be 64 characters long (SHA-256)',
        code: 'INVALID_HASH_LENGTH',
        severity: 'warning',
      });
    }

    const sanitizedData = {
      taskId: params.taskId?.trim(),
      lastContextHash: params.lastContextHash?.trim(),
      sliceType: params.sliceType || 'STATUS',
    };

    return {
      isValid: errors.filter((e) => e.severity === 'error').length === 0,
      errors,
      sanitizedData,
    };
  }

  // Advanced error boundary handling
  handleErrorBoundary(boundary: ErrorBoundary): any {
    this.logger.error(`Error boundary triggered for ${boundary.operation}`, {
      taskId: boundary.taskId,
      error: boundary.error.message,
      context: boundary.context,
      stack: boundary.error.stack,
    });

    // Determine recovery action based on error type
    let recoveryAction = 'none';
    let fallbackResponse = null;

    if (boundary.error.name === 'NotFoundException') {
      recoveryAction = 'return_not_found_response';
      fallbackResponse = this.createNotFoundResponse(boundary);
    } else if (
      boundary.error.name === 'ValidationError' ||
      boundary.error.name === 'BadRequestException'
    ) {
      recoveryAction = 'return_validation_error_response';
      fallbackResponse = this.createValidationErrorResponse(boundary);
    } else if (boundary.error.name === 'InternalServerErrorException') {
      recoveryAction = 'return_internal_error_response';
      fallbackResponse = this.createInternalErrorResponse(boundary);
    } else {
      recoveryAction = 'return_generic_error_response';
      fallbackResponse = this.createGenericErrorResponse(boundary);
    }

    return {
      ...fallbackResponse,
      _errorBoundary: {
        operation: boundary.operation,
        taskId: boundary.taskId,
        errorType: boundary.error.name,
        recoveryAction,
        timestamp: new Date().toISOString(),
        handled: true,
      },
    };
  }

  // Schema validation with enhanced error messages
  validateWithSchema<T>(
    schema: z.ZodSchema<T>,
    data: any,
    operation: string,
  ): ValidationResult {
    try {
      const result = schema.safeParse(data);

      if (result.success) {
        return {
          isValid: true,
          errors: [],
          sanitizedData: result.data,
        };
      }

      const errors: ValidationError[] = result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
        severity: 'error' as const,
      }));

      return {
        isValid: false,
        errors,
      };
    } catch (error) {
      this.logger.error(`Schema validation failed for ${operation}`, error);

      return {
        isValid: false,
        errors: [
          {
            field: 'schema',
            message: 'Schema validation failed',
            code: 'SCHEMA_VALIDATION_ERROR',
            severity: 'error',
          },
        ],
      };
    }
  }

  // Input sanitization for security
  sanitizeInput(input: any): any {
    if (typeof input === 'string') {
      return input
        .replace(/[<>]/g, '') // Remove potential XSS chars
        .trim()
        .substring(0, 10000); // Limit length
    }

    if (Array.isArray(input)) {
      return input.slice(0, 100).map((item) => this.sanitizeInput(item)); // Limit array size
    }

    if (typeof input === 'object' && input !== null) {
      const sanitized: any = {};
      Object.keys(input)
        .slice(0, 50)
        .forEach((key) => {
          // Limit object keys
          const sanitizedKey = key.replace(/[<>]/g, '').trim();
          sanitized[sanitizedKey] = this.sanitizeInput(input[key]);
        });
      return sanitized;
    }

    return input;
  }

  // Private helper methods for error responses
  private createNotFoundResponse(boundary: ErrorBoundary): any {
    return {
      content: [
        {
          type: 'text',
          text: `Resource not found for ${boundary.operation}${boundary.taskId ? ` (Task: ${boundary.taskId})` : ''}`,
        },
        {
          type: 'text',
          text: JSON.stringify({
            notFound: true,
            operation: boundary.operation,
            taskId: boundary.taskId,
            message: boundary.error.message,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    };
  }

  private createValidationErrorResponse(boundary: ErrorBoundary): any {
    return {
      content: [
        {
          type: 'text',
          text: `Validation error in ${boundary.operation}: ${boundary.error.message}`,
        },
        {
          type: 'text',
          text: JSON.stringify({
            validationError: true,
            operation: boundary.operation,
            input: this.sanitizeInput(boundary.input),
            message: boundary.error.message,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    };
  }

  private createInternalErrorResponse(boundary: ErrorBoundary): any {
    return {
      content: [
        {
          type: 'text',
          text: `Internal error occurred in ${boundary.operation}`,
        },
        {
          type: 'text',
          text: JSON.stringify({
            internalError: true,
            operation: boundary.operation,
            taskId: boundary.taskId,
            message: 'An internal error occurred. Please try again later.',
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    };
  }

  private createGenericErrorResponse(boundary: ErrorBoundary): any {
    return {
      content: [
        {
          type: 'text',
          text: `Error in ${boundary.operation}: ${boundary.error.message}`,
        },
        {
          type: 'text',
          text: JSON.stringify({
            error: true,
            operation: boundary.operation,
            taskId: boundary.taskId,
            errorType: boundary.error.name,
            message: boundary.error.message,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    };
  }
}
