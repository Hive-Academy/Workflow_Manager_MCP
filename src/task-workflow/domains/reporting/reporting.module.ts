import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { ReportGeneratorService } from './report-generator.service';
import { ReportMcpOperationsService } from './report-mcp-operations.service';
import { ReportRenderingService } from './report-rendering.service';

@Module({
  imports: [PrismaModule],
  providers: [
    ReportGeneratorService,
    ReportRenderingService,
    ReportMcpOperationsService,
  ],
  exports: [
    ReportGeneratorService,
    ReportRenderingService,
    ReportMcpOperationsService,
  ],
})
export class ReportingModule {}
