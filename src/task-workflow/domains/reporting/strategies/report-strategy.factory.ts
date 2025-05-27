// src/task-workflow/domains/reporting/strategies/report-strategy.factory.ts

import { Injectable } from '@nestjs/common';
import { IReportStrategy } from './report-strategy.interface';
import { AggregateReportStrategy } from './aggregate-report.strategy';
import { IndividualTaskReportStrategy } from './individual-task-report.strategy';
import { ReportType } from '../interfaces/service-contracts.interface';

/**
 * Simple Strategy Factory
 *
 * Routes report types to appropriate strategies
 * Minimal factory pattern implementation
 */
@Injectable()
export class ReportStrategyFactory {
  private readonly strategies: IReportStrategy[];

  constructor(
    private readonly aggregateStrategy: AggregateReportStrategy,
    private readonly individualStrategy: IndividualTaskReportStrategy,
  ) {
    this.strategies = [this.aggregateStrategy, this.individualStrategy];
  }

  getStrategy(reportType: ReportType): IReportStrategy {
    const strategy = this.strategies.find((s) => s.canHandle(reportType));

    if (!strategy) {
      throw new Error(`No strategy found for report type: ${reportType}`);
    }

    return strategy;
  }
}
