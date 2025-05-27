import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { FileLoggerService } from './file-logger.service';

@Injectable({ scope: Scope.DEFAULT })
export class GlobalFileLoggerService implements LoggerService {
  private fileLogger: FileLoggerService;

  constructor() {
    // Initialize FileLoggerService directly since this will be used globally
    this.fileLogger = new FileLoggerService();
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, context?: string): void {
    this.fileLogger.info(message, context || 'Application');
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, trace?: string, context?: string): void {
    this.fileLogger.error(message, trace, context || 'Application');
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, context?: string): void {
    this.fileLogger.warn(message, context || 'Application');
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, context?: string): void {
    this.fileLogger.debug(message, context || 'Application');
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, context?: string): void {
    this.fileLogger.debug(message, context || 'Application');
  }

  /**
   * Set log levels
   */
  setLogLevels?(_levels: string[]): void {
    // FileLoggerService doesn't support dynamic log levels, so we'll ignore this
    // In a production environment, you might want to implement this
  }
}
