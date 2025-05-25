import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { ReportGeneratorService } from './report-generator.service';
import { ReportRenderingService } from './report-rendering.service';
import { ChartGenerationModule } from './chart-generation.module';

// Analytics Services
import { MetricsCalculatorService } from './services/metrics-calculator.service';
import { TimeSeriesAnalysisService } from './services/time-series-analysis.service';
import { PerformanceBenchmarkService } from './services/performance-benchmark.service';
import { RecommendationEngineService } from './services/recommendation-engine.service';
import { ReportTemplateService } from './services/report-template.service';
import { EnhancedInsightsGeneratorService } from './services/enhanced-insights-generator.service';
import { SmartResponseSummarizationService } from './services/smart-response-summarization.service';
import { SchemaDrivenIntelligenceService } from './services/schema-driven-intelligence.service';
import { TemplateFactoryService } from './services/template-factory.service';
import { ContentGeneratorService } from './services/content-generator.service';
import { ReportPathGeneratorService } from './services/report-path-generator.service';
import { ReportMcpOperationsService } from './report-mcp-operations.service';

@Module({
  imports: [PrismaModule, ChartGenerationModule],
  providers: [
    // Core Report Services
    ReportGeneratorService,
    ReportRenderingService,

    // Core Analytics Services
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

    // MCP Operations
    ReportMcpOperationsService,
  ],
  exports: [
    // Core Services that might be needed externally
    ReportGeneratorService,
    ReportRenderingService,

    // MCP Operations Service (needed for MCP server registration)
    ReportMcpOperationsService,

    // Export the chart generation module for external use
    ChartGenerationModule,
  ],
})
export class ReportingModule {}
