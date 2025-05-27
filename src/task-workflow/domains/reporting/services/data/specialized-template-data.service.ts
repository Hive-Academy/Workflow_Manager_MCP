/**
 * Specialized Template Data Service (Coordinator)
 *
 * Coordinator service that delegates to focused specialized services.
 * This service maintains the original interface while distributing
 * responsibilities to smaller, focused services.
 *
 * This service coordinates:
 * - Comprehensive executive reports
 * - Implementation plan analytics
 * - Code review insights
 * - Delegation flow analysis
 */

import { Injectable, Logger } from '@nestjs/common';
import {
  CodeReviewInsightsDataService,
  CodeReviewInsightsTemplateData,
} from '../../interfaces/templates/code-review-insights-template.interface';
import {
  ComprehensiveDataService,
  ComprehensiveTemplateData,
} from '../../interfaces/templates/comprehensive-template.interface';
import {
  DelegationFlowAnalysisDataService,
  DelegationFlowAnalysisTemplateData,
} from '../../interfaces/templates/delegation-flow-analysis-template.interface';
import {
  ImplementationPlanAnalyticsDataService,
  ImplementationPlanAnalyticsTemplateData,
} from '../../interfaces/templates/implementation-plan-analytics-template.interface';
import { CodeReviewDelegationTemplateDataService } from './code-review-delegation-template-data.service';
import { ComprehensiveTemplateDataService } from './comprehensive-template-data.service';
import { ImplementationPlanTemplateDataService } from './implementation-plan-template-data.service';

@Injectable()
export class SpecializedTemplateDataService
  implements
    ComprehensiveDataService,
    ImplementationPlanAnalyticsDataService,
    CodeReviewInsightsDataService,
    DelegationFlowAnalysisDataService
{
  private readonly logger = new Logger(SpecializedTemplateDataService.name);

  constructor(
    private readonly comprehensiveService: ComprehensiveTemplateDataService,
    private readonly implementationPlanService: ImplementationPlanTemplateDataService,
    private readonly codeReviewDelegationService: CodeReviewDelegationTemplateDataService,
  ) {}

  /**
   * Get comprehensive analytics data combining all report types
   * Delegates to ComprehensiveTemplateDataService
   */
  async getComprehensiveData(
    startDate: Date,
    endDate: Date,
    filters?: Record<string, string>,
  ): Promise<ComprehensiveTemplateData> {
    this.logger.debug('Delegating comprehensive analytics data generation');
    return this.comprehensiveService.getComprehensiveData(
      startDate,
      endDate,
      filters,
    );
  }

  /**
   * Get implementation plan analytics data
   * Delegates to ImplementationPlanTemplateDataService
   */
  async getImplementationPlanAnalyticsData(
    startDate: Date,
    endDate: Date,
    filters?: Record<string, string>,
  ): Promise<ImplementationPlanAnalyticsTemplateData> {
    this.logger.debug(
      'Delegating implementation plan analytics data generation',
    );
    return this.implementationPlanService.getImplementationPlanAnalyticsData(
      startDate,
      endDate,
      filters,
    );
  }

  /**
   * Get code review insights data
   * Delegates to CodeReviewDelegationTemplateDataService
   */
  async getCodeReviewInsightsData(
    startDate: Date,
    endDate: Date,
    filters?: Record<string, string>,
  ): Promise<CodeReviewInsightsTemplateData> {
    this.logger.debug('Delegating code review insights data generation');
    return this.codeReviewDelegationService.getCodeReviewInsightsData(
      startDate,
      endDate,
      filters,
    );
  }

  /**
   * Get delegation flow analysis data
   * Delegates to CodeReviewDelegationTemplateDataService
   */
  async getDelegationFlowAnalysisData(
    startDate: Date,
    endDate: Date,
    filters?: Record<string, string>,
  ): Promise<DelegationFlowAnalysisTemplateData> {
    this.logger.debug('Delegating delegation flow analysis data generation');
    return this.codeReviewDelegationService.getDelegationFlowAnalysisData(
      startDate,
      endDate,
      filters,
    );
  }
}
