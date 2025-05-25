// src/task-workflow/task-workflow.module.ts
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
import { CodeReviewReportService } from './domains/reporting/code-review-report.service';
import { CompletionReportService } from './domains/reporting/completion-report.service';

// New Report Generation Services
import { ReportGeneratorService } from './domains/reporting/report-generator.service';
import { ReportRenderingService } from './domains/reporting/report-rendering.service';

// MCP Operation Services - New Paths
import { TaskCrudOperationsService } from './domains/crud/task-crud-operations.service';
import { TaskQueryOperationsService } from './domains/query/task-query-operations.service';
import { TaskStateOperationsService } from './domains/state/task-state-operations.service';
import { TaskInteractionOperationsService } from './domains/interaction/task-interaction-operations.service';
import { ImplementationPlanOperationsService } from './domains/plan/implementation-plan-operations.service';
import { ReportOperationsService } from './domains/reporting/report-operations.service';

// New Report MCP Operations Service
import { ReportMcpOperationsService } from './domains/reporting/report-mcp-operations.service';

import { PrismaErrorHandlerService } from './utils/prisma-error.handler';
import { PerformanceAnalyticsService } from './domains/query/performance-analytics.service';

// SOLID Refactored Services
import { MetricsCalculatorService } from './domains/reporting/services/metrics-calculator.service';
import { TimeSeriesAnalysisService } from './domains/reporting/services/time-series-analysis.service';
import { PerformanceBenchmarkService } from './domains/reporting/services/performance-benchmark.service';
import { ChartGenerationService } from './domains/reporting/services/chart-generation.service';
import { RecommendationEngineService } from './domains/reporting/services/recommendation-engine.service';
import { ReportTemplateService } from './domains/reporting/services/report-template.service';

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
    CodeReviewReportService,
    CompletionReportService,

    // Report Generation Services
    ReportGeneratorService,
    ReportRenderingService,

    // MCP Operation Services
    TaskCrudOperationsService,
    TaskQueryOperationsService,
    TaskStateOperationsService,
    TaskInteractionOperationsService,
    ImplementationPlanOperationsService,
    ReportOperationsService,

    // Report MCP Operations Service
    ReportMcpOperationsService,

    PrismaErrorHandlerService,
    PerformanceAnalyticsService,

    // SOLID Refactored Services
    MetricsCalculatorService,
    TimeSeriesAnalysisService,
    PerformanceBenchmarkService,
    ChartGenerationService,
    RecommendationEngineService,
    ReportTemplateService,

    // Interface to Implementation Bindings
    {
      provide: 'IMetricsCalculatorService',
      useClass: MetricsCalculatorService,
    },
    {
      provide: 'ITimeSeriesAnalysisService',
      useClass: TimeSeriesAnalysisService,
    },
    {
      provide: 'IPerformanceBenchmarkService',
      useClass: PerformanceBenchmarkService,
    },
    { provide: 'IChartGenerationService', useClass: ChartGenerationService },
    {
      provide: 'IRecommendationEngineService',
      useClass: RecommendationEngineService,
    },
    { provide: 'IReportTemplateService', useClass: ReportTemplateService },
  ],
  exports: [
    // Export MCP Operation Services
    TaskCrudOperationsService,
    TaskQueryOperationsService,
    TaskStateOperationsService,
    TaskInteractionOperationsService,
    ImplementationPlanOperationsService,
    ReportOperationsService,

    // Export new Report MCP Operations Service
    ReportMcpOperationsService,

    // Export core services for potential external use
    ReportGeneratorService,
    ReportRenderingService,
  ],
})
export class TaskWorkflowModule {}
