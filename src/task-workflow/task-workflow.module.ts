import { Module } from '@nestjs/common';
// import { TaskWorkflowController } from './task-workflow.controller'; // Temporarily remove if not yet implemented
import { TaskWorkflowService } from './task-workflow.service';
// import { ImplementationPlanOperationsService } from './mcp-operations/implementation-plan-operations.service'; // Will come from barrel
import { PrismaModule } from '../prisma/prisma.module';
import {
  TaskCrudService,
  TaskQueryService,
  TaskStateService,
  TaskCommentService,
  TaskDescriptionService,
  RoleTransitionService,
  ProcessCommandService,
  ContextManagementService,
  ShorthandParserService,
  ImplementationPlanService as CoreImplementationPlanService, // Keep alias for CoreImplementationPlanService if used internally with this name
  ResearchReportService, // Added
} from './services';
import { PrismaErrorHandlerService } from './utils/prisma-error.handler';
import {
  ReportOperationsService,
  ImplementationPlanOperationsService,
  TaskCrudOperationsService,
} from './mcp-operations/index'; // Explicitly point to index file

@Module({
  imports: [PrismaModule], // Import PrismaModule as TaskWorkflowService depends on PrismaService
  // controllers: [TaskWorkflowController], // Temporarily remove
  providers: [
    TaskWorkflowService, // The main facade service
    ImplementationPlanOperationsService,
    TaskCrudService, // Specialized services
    TaskQueryService,
    TaskStateService,
    TaskCommentService,
    TaskDescriptionService,
    RoleTransitionService,
    ProcessCommandService,
    ContextManagementService, // Provide the new service
    ShorthandParserService, // Provide the new service
    PrismaErrorHandlerService, // Temporarily remove from providers
    CoreImplementationPlanService, // This is ImplementationPlanService from ./services
    TaskCrudOperationsService,
    ResearchReportService, // Added to providers
    ReportOperationsService, // Added to providers
  ],
  exports: [
    TaskWorkflowService,
    ImplementationPlanOperationsService,
    TaskCrudOperationsService,
    ReportOperationsService, // Added to exports
    // Exporting individual services if they are meant to be used directly by other modules
    // For now, assuming MCP operation services are the primary external interface
  ],
})
export class TaskWorkflowModule {}
