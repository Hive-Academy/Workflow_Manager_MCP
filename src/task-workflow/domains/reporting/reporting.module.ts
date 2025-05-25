import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { ReportGeneratorService } from './report-generator.service';
import { ReportMcpOperationsService } from './report-mcp-operations.service';
import { ReportRenderingService } from './report-rendering.service';
import { ChartGenerationModule } from './chart-generation.module';

@Module({
  imports: [PrismaModule, ChartGenerationModule],
  providers: [
    ReportGeneratorService,
    ReportRenderingService,
    ReportMcpOperationsService,
  ],
  exports: [
    ReportGeneratorService,
    ReportRenderingService,
    ReportMcpOperationsService,
    ChartGenerationModule,
  ],
})
export class ReportingModule {}
