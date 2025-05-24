import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

// Core Business Logic Services - New Paths
import { TaskCrudService } from './domains/crud/task-crud.service';
import { TaskDescriptionService } from './domains/crud/task-description.service';
import { TaskQueryService } from './domains/query/task-query.service';
import { ContextManagementService } from './domains/query/context-management.service';
import { TaskStateService } from './domains/state/task-state.service';
import { RoleTransitionService } from './domains/state/role-transition.service';
import { TaskCommentService } from './domains/interaction/task-comment.service';

import { ImplementationPlanService as CoreImplementationPlanService } from './domains/plan/implementation-plan.service';
import { ResearchReportService } from './domains/reporting/research-report.service';
import { CodeReviewReportService } from './domains/reporting/code-review-report.service'; // Added
import { CompletionReportService } from './domains/reporting/completion-report.service'; // Added

// MCP Operation Services - New Paths
import { TaskCrudOperationsService } from './domains/crud/task-crud-operations.service';
import { TaskQueryOperationsService } from './domains/query/task-query-operations.service';
import { TaskStateOperationsService } from './domains/state/task-state-operations.service';
import { TaskInteractionOperationsService } from './domains/interaction/task-interaction-operations.service';
import { ImplementationPlanOperationsService } from './domains/plan/implementation-plan-operations.service';
import { ReportOperationsService } from './domains/reporting/report-operations.service';

import { PrismaErrorHandlerService } from './utils/prisma-error.handler';
import { PerformanceAnalyticsService } from './domains/query/performance-analytics.service';

@Module({
  imports: [PrismaModule],
  providers: [
    // Core Business Logic Services
    TaskCrudService,
    TaskDescriptionService,
    TaskQueryService,
    ContextManagementService,
    TaskStateService,
    RoleTransitionService,
    TaskCommentService,
    CoreImplementationPlanService,
    ResearchReportService,
    CodeReviewReportService, // Added
    CompletionReportService, // Added

    // MCP Operation Services
    TaskCrudOperationsService,
    TaskQueryOperationsService,
    TaskStateOperationsService,
    TaskInteractionOperationsService,
    ImplementationPlanOperationsService,
    ReportOperationsService,

    PrismaErrorHandlerService,
    PerformanceAnalyticsService,
  ],
  exports: [
    // Export only MCP Operation Services as per original intent?
    // Or also core services if other modules might need them directly?
    // For now, keeping exports to MCP Operation services primarily.
    TaskCrudOperationsService,
    TaskQueryOperationsService,
    TaskStateOperationsService,
    TaskInteractionOperationsService,
    ImplementationPlanOperationsService,
    ReportOperationsService,
  ],
})
export class TaskWorkflowModule {}
