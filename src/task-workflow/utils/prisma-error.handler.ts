import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaErrorHandler } from '../types';

@Injectable()
export class PrismaErrorHandlerService implements PrismaErrorHandler {
  private readonly logger = new Logger(PrismaErrorHandlerService.name);

  private isPrismaError(
    err: unknown,
  ): err is Prisma.PrismaClientKnownRequestError {
    return (
      err instanceof Error &&
      'code' in err &&
      typeof (err as any).code === 'string'
    );
  }

  handlePrismaError(
    error: unknown,
    taskId: string,
    operationContext?: {
      operation: string;
      service: string;
      sliceType?: string;
      batchId?: string;
      performanceMs?: number;
    },
  ): never {
    if (error instanceof NotFoundException) {
      throw error;
    }

    const errorMetadata = {
      taskId,
      timestamp: new Date().toISOString(),
      operation: operationContext?.operation || 'unknown',
      service: operationContext?.service || 'unknown',
      sliceType: operationContext?.sliceType,
      batchId: operationContext?.batchId,
      performanceMs: operationContext?.performanceMs,
    };

    if (this.isPrismaError(error)) {
      this.logger.error('Prisma error occurred', {
        code: error.code,
        message: error.message,
        meta: error.meta,
        ...errorMetadata,
      });

      switch (error.code) {
        case 'P2025':
          throw new NotFoundException({
            message: `Task ${taskId} not found`,
            metadata: {
              ...errorMetadata,
              prismaCode: error.code,
              type: 'not_found',
            },
          });

        case 'P2002':
          throw new InternalServerErrorException({
            message: `Unique constraint violation for task ${taskId}`,
            metadata: {
              ...errorMetadata,
              prismaCode: error.code,
              type: 'constraint_violation',
              constraintField: error.meta?.target,
            },
          });

        case 'P2003':
          throw new InternalServerErrorException({
            message: `Foreign key constraint violation for task ${taskId}`,
            metadata: {
              ...errorMetadata,
              prismaCode: error.code,
              type: 'fk_violation',
              constraintField: error.meta?.field_name,
            },
          });

        default:
          throw new InternalServerErrorException({
            message: `Database operation failed for task ${taskId}`,
            metadata: {
              ...errorMetadata,
              prismaCode: error.code,
              type: 'database_error',
              originalMessage: error.message,
            },
          });
      }
    }

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    this.logger.error('Non-Prisma error occurred', {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      ...errorMetadata,
    });

    throw new InternalServerErrorException({
      message: `Failed to process request for task ${taskId}: ${errorMessage}`,
      metadata: {
        ...errorMetadata,
        type: 'generic_error',
        originalMessage: errorMessage,
      },
    });
  }
}
