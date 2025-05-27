// src/task-workflow/domains/reporting/services/rendering/template-rendering.service.ts

import { Injectable, Logger } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as fs from 'fs/promises';
import * as path from 'path';

import {
  IReportTemplateService,
  ReportType,
} from '../../interfaces/service-contracts.interface';
import { ReportData } from '../../interfaces/report-data.interface';
import { ReportingConfigService } from '../infrastructure/reporting-config.service';

/**
 * Template Rendering Service
 *
 * SINGLE RESPONSIBILITY: Template compilation and rendering
 * - Manages Handlebars template engine
 * - Handles template compilation and caching
 * - Provides template rendering with data injection
 * - Manages template helpers and partials
 *
 * DEPENDENCIES:
 * - ReportingConfigService: For template path resolution
 *
 * SOLID PRINCIPLES:
 * - SRP: Only handles template rendering concerns
 * - OCP: Extensible through helper registration
 * - DIP: Depends on abstractions (interfaces)
 */
@Injectable()
export class TemplateRenderingService implements IReportTemplateService {
  private readonly logger = new Logger(TemplateRenderingService.name);
  private readonly handlebarsInstance: typeof Handlebars;
  private readonly templateCache = new Map<
    string,
    HandlebarsTemplateDelegate
  >();

  constructor(private readonly config: ReportingConfigService) {
    this.handlebarsInstance = Handlebars.create();
    this.registerHelpers();
    // Register partials asynchronously (don't await in constructor)
    this.registerPartials().catch((error) => {
      this.logger.error(
        'Failed to register partials during initialization:',
        error,
      );
    });
  }

  /**
   * Render a report template with provided data
   */
  async renderReportTemplate(
    reportType: ReportType,
    data: ReportData,
  ): Promise<string> {
    try {
      const templatePath = this.getTemplatePath(reportType);
      const template = await this.getCompiledTemplate(templatePath);

      const enhancedData = this.enhanceDataForRendering(data, reportType);
      return template(enhancedData);
    } catch (error) {
      this.logger.error(
        `Failed to render template for ${reportType}`,
        error.stack,
      );
      return this.generateErrorTemplate(reportType, data, error);
    }
  }

  /**
   * Get compiled template with caching
   */
  private async getCompiledTemplate(
    templatePath: string,
  ): Promise<HandlebarsTemplateDelegate> {
    if (this.templateCache.has(templatePath)) {
      return this.templateCache.get(templatePath)!;
    }

    const templateSource = await fs.readFile(templatePath, 'utf-8');
    const compiledTemplate = this.handlebarsInstance.compile(templateSource);

    // Cache in production for performance
    if (process.env.NODE_ENV === 'production') {
      this.templateCache.set(templatePath, compiledTemplate);
    }

    return compiledTemplate;
  }

  /**
   * Enhance data with rendering metadata and utilities
   */
  private enhanceDataForRendering(
    data: ReportData,
    reportType: ReportType,
  ): any {
    return {
      ...data,
      // Template metadata
      reportType,
      generatedAt: new Date().toISOString(),
      templateVersion: '2.0.0',

      // Utility functions available in templates
      utils: {
        formatDate: (date: Date) => date?.toLocaleDateString() || 'N/A',
        formatDateTime: (date: Date) => date?.toLocaleString() || 'N/A',
        formatNumber: (num: number) => num?.toLocaleString() || '0',
        formatPercentage: (num: number) => `${(num || 0).toFixed(1)}%`,
        formatDuration: (hours: number) => {
          if (!hours) return 'N/A';
          if (hours < 1) return `${Math.round(hours * 60)}m`;
          if (hours < 24) return `${hours.toFixed(1)}h`;
          return `${Math.round(hours / 24)}d`;
        },
      },
    };
  }

  /**
   * Get template file path for report type
   */
  private getTemplatePath(reportType: ReportType): string {
    const templateFileName = `${reportType.replace(/_/g, '-')}.hbs`;
    return path.join(this.config.templatesPath, templateFileName);
  }

  /**
   * Register Handlebars helpers for enhanced template functionality
   */
  private registerHelpers(): void {
    // Date formatting helpers
    this.handlebarsInstance.registerHelper('formatDate', (date: Date) => {
      return date ? new Date(date).toLocaleDateString() : 'N/A';
    });

    this.handlebarsInstance.registerHelper('formatDateTime', (date: Date) => {
      return date ? new Date(date).toLocaleString() : 'N/A';
    });

    this.handlebarsInstance.registerHelper('formatTime', (date: Date) => {
      return date ? new Date(date).toLocaleTimeString() : 'N/A';
    });

    // Number formatting helpers
    this.handlebarsInstance.registerHelper('formatNumber', (num: number) => {
      return typeof num === 'number' ? num.toLocaleString() : '0';
    });

    this.handlebarsInstance.registerHelper(
      'formatPercentage',
      (num: number) => {
        return typeof num === 'number' ? `${num.toFixed(1)}%` : '0%';
      },
    );

    this.handlebarsInstance.registerHelper('formatCurrency', (num: number) => {
      return typeof num === 'number' ? `$${num.toLocaleString()}` : '$0';
    });

    this.handlebarsInstance.registerHelper(
      'formatDuration',
      (hours: number) => {
        if (typeof hours !== 'number') return 'N/A';
        if (hours < 1) return `${Math.round(hours * 60)}m`;
        if (hours < 24) return `${hours.toFixed(1)}h`;
        return `${Math.round(hours / 24)}d`;
      },
    );

    // String helpers
    this.handlebarsInstance.registerHelper('capitalize', (str: string) => {
      return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    });

    this.handlebarsInstance.registerHelper('uppercase', (str: string) => {
      return str ? str.toUpperCase() : '';
    });

    this.handlebarsInstance.registerHelper(
      'truncate',
      (str: string, length: number) => {
        if (!str) return '';
        return str.length > length ? str.substring(0, length) + '...' : str;
      },
    );

    // Conditional helpers
    this.handlebarsInstance.registerHelper('eq', (a: any, b: any) => a === b);
    this.handlebarsInstance.registerHelper('ne', (a: any, b: any) => a !== b);
    this.handlebarsInstance.registerHelper(
      'gt',
      (a: number, b: number) => a > b,
    );
    this.handlebarsInstance.registerHelper(
      'lt',
      (a: number, b: number) => a < b,
    );
    this.handlebarsInstance.registerHelper(
      'gte',
      (a: number, b: number) => a >= b,
    );
    this.handlebarsInstance.registerHelper(
      'lte',
      (a: number, b: number) => a <= b,
    );

    // Array helpers
    this.handlebarsInstance.registerHelper('length', (array: any[]) => {
      return Array.isArray(array) ? array.length : 0;
    });
    this.handlebarsInstance.registerHelper('first', (array: unknown[]) => {
      return Array.isArray(array) && array.length > 0 ? array[0] : null;
    });

    this.handlebarsInstance.registerHelper('last', (array: unknown[]) => {
      return Array.isArray(array) && array.length > 0
        ? array[array.length - 1]
        : null;
    });

    // Chart.js helper for generating chart configurations
    this.handlebarsInstance.registerHelper('chartConfig', (chartData: any) => {
      return JSON.stringify(chartData);
    });

    // Status badge helper for Tailwind CSS classes
    this.handlebarsInstance.registerHelper('statusBadge', (status: string) => {
      const statusClasses = {
        completed: 'bg-green-100 text-green-800 border-green-200',
        'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
        'not-started': 'bg-gray-100 text-gray-800 border-gray-200',
        'needs-review': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'needs-changes': 'bg-red-100 text-red-800 border-red-200',
        paused: 'bg-orange-100 text-orange-800 border-orange-200',
        cancelled: 'bg-red-100 text-red-800 border-red-200',
      };
      return (
        statusClasses[status as keyof typeof statusClasses] ||
        'bg-gray-100 text-gray-800 border-gray-200'
      );
    });

    // Priority badge helper
    this.handlebarsInstance.registerHelper(
      'priorityBadge',
      (priority: string) => {
        const priorityClasses = {
          Critical: 'bg-red-500 text-white',
          High: 'bg-orange-500 text-white',
          Medium: 'bg-yellow-500 text-white',
          Low: 'bg-green-500 text-white',
        } as const;
        return (
          priorityClasses[priority as keyof typeof priorityClasses] ||
          'bg-gray-500 text-white'
        );
      },
    );

    // Math helpers
    this.handlebarsInstance.registerHelper(
      'add',
      (a: number, b: number) => (a || 0) + (b || 0),
    );
    this.handlebarsInstance.registerHelper(
      'subtract',
      (a: number, b: number) => (a || 0) - (b || 0),
    );
    this.handlebarsInstance.registerHelper(
      'multiply',
      (a: number, b: number) => (a || 0) * (b || 0),
    );
    this.handlebarsInstance.registerHelper('divide', (a: number, b: number) =>
      b !== 0 ? (a || 0) / b : 0,
    );

    // JSON helper for debugging
    this.handlebarsInstance.registerHelper('json', (obj: any) => {
      return JSON.stringify(obj, null, 2);
    });

    this.logger.log('Handlebars helpers registered successfully');
  }

  /**
   * Register Handlebars partials from the layouts directory
   */
  private async registerPartials(): Promise<void> {
    try {
      const layoutsPath = path.join(this.config.templatesPath, 'layouts');

      // Check if layouts directory exists
      try {
        await fs.access(layoutsPath);
      } catch {
        this.logger.warn(`Layouts directory not found: ${layoutsPath}`);
        return;
      }

      // Read all .hbs files in the layouts directory
      const layoutFiles = await fs.readdir(layoutsPath);
      const hbsFiles = layoutFiles.filter((file) => file.endsWith('.hbs'));

      for (const file of hbsFiles) {
        const partialName = `layouts/${path.basename(file, '.hbs')}`;
        const partialPath = path.join(layoutsPath, file);

        try {
          const partialContent = await fs.readFile(partialPath, 'utf-8');
          this.handlebarsInstance.registerPartial(partialName, partialContent);
          this.logger.log(`Registered partial: ${partialName}`);
        } catch (error) {
          this.logger.error(
            `Failed to register partial ${partialName}:`,
            error,
          );
        }
      }

      this.logger.log(`Successfully registered ${hbsFiles.length} partials`);
    } catch (error) {
      this.logger.error('Failed to register partials:', error);
    }
  }

  /**
   * Generate error template when rendering fails
   */
  private generateErrorTemplate(
    reportType: ReportType,
    data: ReportData,
    error: any,
  ): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Template Error - ${data.title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-50 p-8">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="bg-red-100 p-3 rounded-full mr-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Template Rendering Error</h1>
              <p class="text-gray-600">Report Type: ${reportType}</p>
            </div>
          </div>
          
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h2 class="text-lg font-semibold text-red-800 mb-2">Error Details</h2>
            <p class="text-red-700 font-mono text-sm">${error.message}</p>
          </div>
          
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h2 class="text-lg font-semibold text-gray-800 mb-2">Raw Data</h2>
            <pre class="text-sm text-gray-600 overflow-auto">${JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </body>
    </html>
    `;
  }

  /**
   * Clear template cache (useful for development)
   */
  clearCache(): void {
    this.templateCache.clear();
    this.logger.log('Template cache cleared');
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.templateCache.size,
      keys: Array.from(this.templateCache.keys()),
    };
  }
}
