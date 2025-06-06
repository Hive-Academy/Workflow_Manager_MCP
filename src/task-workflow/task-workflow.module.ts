// src/task-workflow/task-workflow.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

// Utils (if they still exist)
import { PrismaErrorHandlerService } from './utils/prisma-error.handler';

// Reporting Module - Contains all reporting services and chart generation
import { ReportingModule } from './domains/reporting/reporting.module';

// Domain-Based Tool Modules - Replace universal tools with focused domain modules
import { CoreWorkflowModule } from './domains/core-workflow/core-workflow.module';
import { QueryOptimizationModule } from './domains/query-optimization/query-optimization.module';
import { BatchOperationsModule } from './domains/batch-operations/batch-operations.module';

@Module({
  imports: [
    PrismaModule,
    ReportingModule, // All reporting services are now contained here

    // Domain-based tool architecture - replaces universal tools
    CoreWorkflowModule, // Task, Planning, Workflow, Review, Research operations
    QueryOptimizationModule, // Pre-configured task context, workflow status, and report queries
    BatchOperationsModule, // Bulk subtask management and cross-entity status synchronization
  ],
  providers: [
    // Utils
    PrismaErrorHandlerService,
  ],
  exports: [
    // Export modules for potential external use
    ReportingModule,
    CoreWorkflowModule,
    QueryOptimizationModule,
    BatchOperationsModule,
  ],
})
export class TaskWorkflowModule {}
