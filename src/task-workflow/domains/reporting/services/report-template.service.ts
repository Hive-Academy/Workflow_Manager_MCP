// src/task-workflow/domains/reporting/services/report-template.service.ts

import { Injectable, Logger } from '@nestjs/common';
import * as ejs from 'ejs';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  IReportTemplateService,
  ReportType,
} from '../interfaces/service-contracts.interface';
import { ReportData } from '../interfaces/report-data.interface';
import { TemplateFactoryService } from './template-factory.service';
import { ContentGeneratorService } from './content-generator.service';

/**
 * Report Template Service
 *
 * Responsible for template rendering and file operations
 * Following SRP: Only handles template and file management
 */
@Injectable()
export class ReportTemplateService implements IReportTemplateService {
  private readonly logger = new Logger(ReportTemplateService.name);
  private readonly templatesPath = path.join(
    process.cwd(),
    'src',
    'task-workflow',
    'domains',
    'reporting',
    'templates',
  );
  private readonly tempPath = path.join(process.cwd(), 'reports', 'temp');

  constructor(
    private readonly templateFactory: TemplateFactoryService,
    private readonly contentGenerator: ContentGeneratorService,
  ) {
    this.ensureDirectories();
  }

  async renderReportTemplate(
    reportType: ReportType,
    data: ReportData,
  ): Promise<string> {
    const templateFileName = this.templateFactory.getTemplatePath(reportType);
    const templatePath = path.join(this.templatesPath, templateFileName);

    try {
      // Check if template exists, if not create a default one
      try {
        await fs.access(templatePath);
      } catch {
        await this.createDefaultTemplate(reportType, templatePath);
      }

      // Enhance data with generated content
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

      const template = await fs.readFile(templatePath, 'utf-8');
      return ejs.render(template, { data: enhancedData, reportType });
    } catch (error) {
      this.logger.error(`Failed to render template for ${reportType}`, error);
      return this.generateFallbackHtml(data);
    }
  }

  async saveTemporaryFile(
    content: string,
    extension: string = 'html',
  ): Promise<string> {
    const filename = `report_${uuidv4()}.${extension}`;
    const filepath = path.join(this.tempPath, filename);
    await fs.writeFile(filepath, content, 'utf-8');
    this.logger.log(`Saved temporary report file: ${filename}`);
    return filepath;
  }

  async cleanupTemporaryFile(filepath: string): Promise<void> {
    try {
      await fs.unlink(filepath);
      this.logger.log(`Cleaned up temporary file: ${filepath}`);
    } catch (error) {
      this.logger.warn(`Failed to cleanup temporary file: ${filepath}`, error);
    }
  }

  private async ensureDirectories(): Promise<void> {
    try {
      await fs.mkdir(this.templatesPath, { recursive: true });
      await fs.mkdir(this.tempPath, { recursive: true });
    } catch (error) {
      this.logger.error('Failed to create directories', error);
    }
  }

  private async createDefaultTemplate(
    reportType: ReportType,
    templatePath: string,
  ): Promise<void> {
    // Try to copy from the comprehensive template first
    const comprehensiveTemplatePath = path.join(
      this.templatesPath,
      'comprehensive.ejs',
    );
    try {
      await fs.access(comprehensiveTemplatePath);
      const comprehensiveTemplate = await fs.readFile(
        comprehensiveTemplatePath,
        'utf-8',
      );
      await fs.writeFile(templatePath, comprehensiveTemplate, 'utf-8');
      this.logger.log(
        `Created template for ${reportType} based on comprehensive template`,
      );
      return;
    } catch {
      // Fallback to basic template only if comprehensive doesn't exist
      const defaultTemplate = this.getDefaultTemplate(reportType);
      await fs.writeFile(templatePath, defaultTemplate, 'utf-8');
      this.logger.log(`Created basic default template for ${reportType}`);
    }
  }

  private getDefaultTemplate(_reportType: ReportType): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= data.title %></title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
        .content { padding: 30px; }
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: center; }
        .metric-value { font-size: 2rem; font-weight: bold; color: #2d3748; margin-bottom: 5px; }
        .metric-label { color: #718096; font-size: 0.9rem; }
        .chart-container { margin: 30px 0; }
        .chart-wrapper { background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .recommendations { background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; }
        .recommendations h3 { margin-top: 0; color: #1e40af; }
        .recommendations ul { margin: 0; padding-left: 20px; }
        .recommendations li { margin-bottom: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1><%= data.title %></h1>
            <p>Generated on <%= data.generatedAt.toLocaleString() %></p>
            <% if (data.dateRange) { %>
                <p>Period: <%= data.dateRange.startDate.toLocaleDateString() %> - <%= data.dateRange.endDate.toLocaleDateString() %></p>
            <% } %>
        </div>
        
        <div class="content">
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-value"><%= data.metrics.tasks.totalTasks %></div>
                    <div class="metric-label">Total Tasks</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value"><%= data.metrics.tasks.completionRate.toFixed(1) %>%</div>
                    <div class="metric-label">Completion Rate</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value"><%= data.metrics.delegations.totalDelegations %></div>
                    <div class="metric-label">Total Delegations</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value"><%= data.metrics.codeReviews.totalReviews %></div>
                    <div class="metric-label">Code Reviews</div>
                </div>
            </div>

            <% data.charts.forEach((chart, index) => { %>
                <div class="chart-wrapper">
                    <h3><%= chart.title %></h3>
                    <canvas id="chart<%= index %>" width="400" height="200"></canvas>
                </div>
            <% }); %>

            <% if (data.recommendations.length > 0) { %>
                <div class="recommendations">
                    <h3>Recommendations</h3>
                    <ul>
                        <% data.recommendations.forEach(recommendation => { %>
                            <li><%= recommendation %></li>
                        <% }); %>
                    </ul>
                </div>
            <% } %>
        </div>
    </div>

    <script>
        <% data.charts.forEach((chart, index) => { %>
            new Chart(document.getElementById('chart<%= index %>'), {
                type: '<%= chart.type %>',
                data: {
                    labels: <%- JSON.stringify(chart.labels) %>,
                    datasets: <%- JSON.stringify(chart.datasets) %>
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' }
                    }
                }
            });
        <% }); %>
    </script>
</body>
</html>`;
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
