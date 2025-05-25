// src/task-workflow/domains/reporting/chart-generation.module.ts

import { Module } from '@nestjs/common';
import { ChartGenerationRefactoredService } from './services/chart-generation-refactored.service';
import { ChartFactoryService } from './services/chart-factory.service';
import { ChartCalculationService } from './services/chart-calculation.service';
import { BaseChartGenerator } from './services/generators/base-chart.generator';
import { AdvancedChartGenerator } from './services/generators/advanced-chart.generator';
import { SpecializedChartGenerator } from './services/generators/specialized-chart.generator';

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
    ChartGenerationRefactoredService,

    // Chart generators
    BaseChartGenerator,
    AdvancedChartGenerator,
    SpecializedChartGenerator,

    // Alias for backward compatibility
    {
      provide: 'IChartGenerationService',
      useClass: ChartGenerationRefactoredService,
    },
  ],
  exports: [
    ChartGenerationRefactoredService,
    ChartFactoryService,
    'IChartGenerationService',
  ],
})
export class ChartGenerationModule {}
