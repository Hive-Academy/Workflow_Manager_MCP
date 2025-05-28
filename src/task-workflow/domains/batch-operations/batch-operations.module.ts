import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { BatchSubtaskOperationsService } from './batch-subtask-operations.service';
import { BatchStatusUpdatesService } from './batch-status-updates.service';

@Module({
  imports: [PrismaModule],
  providers: [
    BatchSubtaskOperationsService,
    BatchStatusUpdatesService,
  ],
  exports: [
    BatchSubtaskOperationsService,
    BatchStatusUpdatesService,
  ],
})
export class BatchOperationsModule {}