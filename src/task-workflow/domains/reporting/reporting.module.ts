import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { ReportGeneratorService } from './report-generator.service';
import { ReportRenderingService } from './report-rendering.service';
import { ChartGenerationModule } from './chart-generation.module';

// New Architecture Services
import { TemplateRenderingService } from './services/rendering/template-rendering.service';
import { ReportingConfigService } from './services/infrastructure/reporting-config.service';

// Legacy Analytics Services (maintained for backward compatibility)
import { MetricsCalculatorService } from './services/data/metrics-calculator.service';
import { CoreMetricsService } from './services/data/core-metrics.service';
import { AdvancedAnalyticsService } from './services/analytics/advanced-analytics.service';
import { TaskHealthAnalysisService } from './services/analytics/task-health-analysis.service';

// Template Data Services (B003 - Template Type Safety Integration)
import { TemplateDataService } from './services/data/template-data.service';
import { SpecializedTemplateDataService } from './services/data/specialized-template-data.service';
import { IndividualTaskTemplateDataService } from './services/data/individual-task-template-data.service';

// Focused Template Data Services (B005 - Specialized Service Refactoring)
import { ComprehensiveTemplateDataService } from './services/data/comprehensive-template-data.service';
import { ImplementationPlanTemplateDataService } from './services/data/implementation-plan-template-data.service';
import { CodeReviewDelegationTemplateDataService } from './services/data/code-review-delegation-template-data.service';

// Individual Task Focused Services (B005 - Individual Service Refactoring)
import { TaskProgressExecutionService } from './services/data/task-progress-execution.service';
import { CodeReviewResearchService } from './services/data/code-review-research.service';
import { CommunicationCollaborationService } from './services/data/communication-collaboration.service';

// Refactored Services (B001 - Core Service Foundation)
import { ReportDataAccessService } from './services/data/report-data-access.service';
import { ChartCoordinationService } from './services/analytics/chart-coordination.service';
import { MetricsCoordinationService } from './services/coordination/metrics-coordination.service';
import { TimeSeriesAnalysisService } from './services/analytics/time-series-analysis.service';
import { PerformanceBenchmarkService } from './services/analytics/performance-benchmark.service';
import { RecommendationEngineService } from './services/analytics/recommendation-engine.service';
import { ReportTemplateService } from './services/core/report-template.service';
import { EnhancedInsightsGeneratorService } from './services/analytics/enhanced-insights-generator.service';
import { SmartResponseSummarizationService } from './services/analytics/smart-response-summarization.service';
import { SchemaDrivenIntelligenceService } from './services/analytics/schema-driven-intelligence.service';
import { TemplateFactoryService } from './services/rendering/template-factory.service';
import { ContentGeneratorService } from './services/core/content-generator.service';
import { ReportPathGeneratorService } from './services/infrastructure/report-path-generator.service';
import { FileLoggerService } from './services/infrastructure/file-logger.service';
import { ReportMcpOperationsService } from './report-mcp-operations.service';

// Strategy Pattern Services (SOLID Principles)
import { ReportStrategyFactory } from './strategies/report-strategy.factory';
import { AggregateReportStrategy } from './strategies/aggregate-report.strategy';
import { IndividualTaskReportStrategy } from './strategies/individual-task-report.strategy';

// Note: ReportDataTransformer is a static utility class, imported directly in services

// Legacy Template Service removed - replaced by TemplateRenderingService

@Module({
  imports: [PrismaModule, ChartGenerationModule],
  providers: [
    // === STRATEGY PATTERN SERVICES (SOLID Principles) ===
    ReportStrategyFactory,
    AggregateReportStrategy,
    IndividualTaskReportStrategy,

    // Rendering Layer
    TemplateRenderingService,

    // Infrastructure
    ReportingConfigService,

    // === REFACTORED SERVICES (B001 - Core Service Foundation) ===
    ReportDataAccessService,
    ChartCoordinationService,
    MetricsCoordinationService,

    // === TEMPLATE DATA SERVICES (B003 - Template Type Safety Integration) ===
    TemplateDataService,
    SpecializedTemplateDataService,
    IndividualTaskTemplateDataService,

    // === FOCUSED TEMPLATE DATA SERVICES (B005 - Specialized Service Refactoring) ===
    ComprehensiveTemplateDataService,
    ImplementationPlanTemplateDataService,
    CodeReviewDelegationTemplateDataService,

    // === INDIVIDUAL TASK FOCUSED SERVICES (B005 - Individual Service Refactoring) ===
    TaskProgressExecutionService,
    CodeReviewResearchService,
    CommunicationCollaborationService,

    // === LEGACY SERVICES (Backward Compatibility) ===

    // Core Report Services
    ReportGeneratorService,
    ReportRenderingService,

    // Core Analytics Services (actively used)
    MetricsCalculatorService,
    CoreMetricsService,
    AdvancedAnalyticsService,
    TaskHealthAnalysisService,
    TimeSeriesAnalysisService,
    PerformanceBenchmarkService,
    RecommendationEngineService,
    ReportTemplateService,
    EnhancedInsightsGeneratorService,

    // Integrated Intelligence Services (previously unused, now integrated)
    SmartResponseSummarizationService,
    SchemaDrivenIntelligenceService,
    ContentGeneratorService,

    // Supporting Services
    TemplateFactoryService,
    ReportPathGeneratorService,
    FileLoggerService,

    // Template Services (Legacy) - HandlebarsTemplateService removed, replaced by TemplateRenderingService

    // MCP Operations (unified interface for both database and analytics reports)
    ReportMcpOperationsService,

    // Individual Task Focused Services (B005 - Individual Service Refactoring)
    TaskProgressExecutionService,
    CodeReviewResearchService,
    CommunicationCollaborationService,
  ],
  exports: [
    // === NEW ARCHITECTURE EXPORTS ===

    // Individual Services (for advanced usage)
    TemplateRenderingService,
    ReportingConfigService,

    // === LEGACY EXPORTS (Backward Compatibility) ===

    // Core Services that might be needed externally
    ReportGeneratorService,
    ReportRenderingService,

    // MCP Operations Service (needed for MCP server registration)
    ReportMcpOperationsService,

    // Export the chart generation module for external use
    ChartGenerationModule,

    // Export integrated intelligence services for external use
    ContentGeneratorService,
    SchemaDrivenIntelligenceService,
    SmartResponseSummarizationService,

    // Export template services for external use
    ReportTemplateService,
    TemplateFactoryService,
    // HandlebarsTemplateService removed - replaced by TemplateRenderingService
  ],
})
export class ReportingModule {}
