// src/task-workflow/domains/reporting/services/report-template.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { ReportData } from '../../interfaces/report-data.interface';
import {
  IReportTemplateService,
  ReportType,
} from '../../interfaces/service-contracts.interface';
import { ContentGeneratorService } from './content-generator.service';
import { TemplateFactoryService } from '../rendering/template-factory.service';
import { TemplateRenderingService } from '../rendering/template-rendering.service';

/**
 * Report Template Service
 *
 * REFACTORED: Now delegates to TemplateRenderingService for modern Handlebars rendering
 * Following SRP: Only handles template coordination and content enhancement
 * Uses new architecture services for improved performance and maintainability
 */
@Injectable()
export class ReportTemplateService implements IReportTemplateService {
  private readonly logger = new Logger(ReportTemplateService.name);

  constructor(
    private readonly templateFactory: TemplateFactoryService,
    private readonly contentGenerator: ContentGeneratorService,
    private readonly templateRenderer: TemplateRenderingService,
  ) {}

  async renderReportTemplate(
    reportType: ReportType,
    data: ReportData,
  ): Promise<string> {
    this.logger.log(
      `Rendering template for ${reportType} using new architecture`,
    );

    try {
      // Enhance data with generated content using ContentGeneratorService
      const enhancedData = {
        ...data,
        executiveSummary: this.contentGenerator.generateExecutiveSummary(
          reportType,
          data,
        ),
        keyInsights: this.contentGenerator.generateKeyInsights(
          reportType,
          data,
        ),
        actionableRecommendations:
          this.contentGenerator.generateActionableRecommendations(
            reportType,
            data,
          ),
        detailedAnalysis: this.contentGenerator.generateDetailedAnalysis(
          reportType,
          data,
        ),
        chartConfig: this.templateFactory.getChartConfiguration(reportType),
        shouldIncludeCharts:
          this.templateFactory.shouldIncludeCharts(reportType),
      };

      // Delegate to new TemplateRenderingService for modern Handlebars rendering
      return await this.templateRenderer.renderReportTemplate(
        reportType,
        enhancedData,
      );
    } catch (error) {
      this.logger.error(`Failed to render template for ${reportType}`, error);
      return this.generateFallbackHtml(data);
    }
  }

  private generateFallbackHtml(data: ReportData): string {
    return `
    <html>
      <head><title>${data.title}</title></head>
      <body>
        <h1>${data.title}</h1>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </body>
    </html>
    `;
  }
}
