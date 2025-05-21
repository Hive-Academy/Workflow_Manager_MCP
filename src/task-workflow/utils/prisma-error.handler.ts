import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaErrorHandler } from '../types';

@Injectable()
export class PrismaErrorHandlerService implements PrismaErrorHandler {
  private isPrismaError(
    err: unknown,
  ): err is Prisma.PrismaClientKnownRequestError {
    return (
      err instanceof Error &&
      'code' in err &&
      typeof (err as any).code === 'string'
    );
  }

  handlePrismaError(error: unknown, taskId: string): never {
    if (error instanceof NotFoundException) {
      throw error;
    }

    if (this.isPrismaError(error) && error.code === 'P2025') {
      throw new NotFoundException(`Task ${taskId} not found`);
    }

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new InternalServerErrorException(
      `Failed to process request: ${errorMessage}`,
    );
  }
}
