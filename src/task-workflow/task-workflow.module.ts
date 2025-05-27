// src/task-workflow/task-workflow.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

// Utils (if they still exist)
import { PrismaErrorHandlerService } from './utils/prisma-error.handler';

// Reporting Module - Contains all reporting services and chart generation
import { ReportingModule } from './domains/reporting/reporting.module';

// Universal Operations Module - Consolidates 40+ MCP tools into 3 powerful tools
import { UniversalModule } from './domains/universal/universal.module';

@Module({
  imports: [
    PrismaModule,
    ReportingModule, // All reporting services are now contained here
    UniversalModule,
  ],
  providers: [
    // Utils
    PrismaErrorHandlerService,
  ],
  exports: [
    // Export modules for potential external use
    ReportingModule,
    UniversalModule,
  ],
})
export class TaskWorkflowModule {}
