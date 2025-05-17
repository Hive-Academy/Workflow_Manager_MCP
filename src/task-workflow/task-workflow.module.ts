import { Module } from '@nestjs/common';
// import { TaskWorkflowController } from './task-workflow.controller'; // Temporarily remove if not yet implemented
import { TaskWorkflowService } from './task-workflow.service';
import { PrismaModule } from '../prisma/prisma.module';
import {
  TaskCrudService,
  TaskQueryService,
  TaskStateService,
  TaskCommentService,
  TaskDescriptionService,
} from './services'; // Import from the new services barrel file

@Module({
  imports: [PrismaModule], // Import PrismaModule as TaskWorkflowService depends on PrismaService
  // controllers: [TaskWorkflowController], // Temporarily remove
  providers: [
    TaskWorkflowService, // The main facade service
    TaskCrudService, // Specialized services
    TaskQueryService,
    TaskStateService,
    TaskCommentService,
    TaskDescriptionService,
  ],
  exports: [TaskWorkflowService], // Export TaskWorkflowService if it needs to be used by other modules
})
export class TaskWorkflowModule {}
