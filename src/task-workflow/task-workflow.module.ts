// src/task-workflow/task-workflow.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

// Report Generation Services (kept)
import { ReportGeneratorService } from './domains/reporting/report-generator.service';
import { ReportRenderingService } from './domains/reporting/report-rendering.service';

// Utils (if they still exist)
import { PrismaErrorHandlerService } from './utils/prisma-error.handler';

// SOLID Refactored Services
import { MetricsCalculatorService } from './domains/reporting/services/metrics-calculator.service';
import { TimeSeriesAnalysisService } from './domains/reporting/services/time-series-analysis.service';
import { PerformanceBenchmarkService } from './domains/reporting/services/performance-benchmark.service';
import { RecommendationEngineService } from './domains/reporting/services/recommendation-engine.service';
import { ReportTemplateService } from './domains/reporting/services/report-template.service';
import { EnhancedInsightsGeneratorService } from './domains/reporting/services/enhanced-insights-generator.service';
import { SmartResponseSummarizationService } from './domains/reporting/services/smart-response-summarization.service';
import { SchemaDrivenIntelligenceService } from './domains/reporting/services/schema-driven-intelligence.service';
import { TemplateFactoryService } from './domains/reporting/services/template-factory.service';
import { ContentGeneratorService } from './domains/reporting/services/content-generator.service';
import { ReportPathGeneratorService } from './domains/reporting/services/report-path-generator.service';

// Chart Generation Module
import { ChartGenerationModule } from './domains/reporting/chart-generation.module';

// Universal Operations Module - Consolidates 40+ MCP tools into 3 powerful tools
import { UniversalModule } from './domains/universal/universal.module';

@Module({
  imports: [PrismaModule, ChartGenerationModule, UniversalModule],
  providers: [
    // Report Generation Services
    ReportGeneratorService,
    ReportRenderingService,

    // SOLID Refactored Services
    MetricsCalculatorService,
    TimeSeriesAnalysisService,
    PerformanceBenchmarkService,
    RecommendationEngineService,
    ReportTemplateService,
    EnhancedInsightsGeneratorService,
    SmartResponseSummarizationService,
    SchemaDrivenIntelligenceService,
    TemplateFactoryService,
    ContentGeneratorService,
    ReportPathGeneratorService,

    // Utils
    PrismaErrorHandlerService,
  ],
  exports: [
    // Export core services for potential external use
    ReportGeneratorService,
    ReportRenderingService,
  ],
})
export class TaskWorkflowModule {}
