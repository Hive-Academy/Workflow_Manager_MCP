import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { TaskOperationsService } from './task-operations.service';
import { PlanningOperationsService } from './planning-operations.service';
import { WorkflowOperationsService } from './workflow-operations.service';
import { ReviewOperationsService } from './review-operations.service';
import { ResearchOperationsService } from './research-operations.service';

@Module({
  imports: [PrismaModule],
  providers: [
    TaskOperationsService,
    PlanningOperationsService,
    WorkflowOperationsService,
    ReviewOperationsService,
    ResearchOperationsService,
  ],
  exports: [
    TaskOperationsService,
    PlanningOperationsService,
    WorkflowOperationsService,
    ReviewOperationsService,
    ResearchOperationsService,
  ],
})
export class CoreWorkflowModule {}
