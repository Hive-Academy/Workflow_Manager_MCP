import { Module } from '@nestjs/common';
import { TaskWorkflowService } from './task-workflow.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Import PrismaModule as TaskWorkflowService depends on PrismaService
  providers: [TaskWorkflowService],
  exports: [TaskWorkflowService], // Export TaskWorkflowService if it needs to be used by other modules
})
export class TaskWorkflowModule {}
