// src/task-workflow/domains/reporting/chart-generation.module.ts

import { Module } from '@nestjs/common';
import { ChartGenerationService } from './services/rendering/chart-generation.service';
import { ChartFactoryService } from './services/rendering/chart-factory.service';
import { ChartCalculationService } from './services/rendering/chart-calculation.service';
import { BaseChartGenerator } from './services/rendering/base-chart.generator';
import { AdvancedChartGenerator } from './services/rendering/advanced-chart.generator';
import { SpecializedChartGenerator } from './services/rendering/specialized-chart.generator';

/**
 * Chart Generation Module
 * Follows Dependency Injection principles
 * Provides clean separation of concerns
 */
@Module({
  providers: [
    // Core services
    ChartCalculationService,
    ChartFactoryService,
    ChartGenerationService,

    // Chart generators
    BaseChartGenerator,
    AdvancedChartGenerator,
    SpecializedChartGenerator,

    // Alias for backward compatibility
    {
      provide: 'IChartGenerationService',
      useClass: ChartGenerationService,
    },
  ],
  exports: [
    ChartGenerationService,
    ChartFactoryService,
    'IChartGenerationService',
  ],
})
export class ChartGenerationModule {}
