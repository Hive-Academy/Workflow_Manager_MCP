import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';

export interface ReportPathOptions {
  reportType: string;
  outputFormat: string;
  taskId?: string;
  taskName?: string;
  startDate?: Date;
  endDate?: Date;
  filters?: Record<string, any>;
  basePath?: string;
}

export interface GeneratedReportPath {
  filename: string;
  folderPath: string;
  fullPath: string;
}

/**
 * Report Path Generator Service
 *
 * Follows Single Responsibility Principle (SRP):
 * - Only responsible for generating meaningful file paths and folder structures
 * - Uses task-based organization for better report management
 */
@Injectable()
export class ReportPathGeneratorService {
  private readonly logger = new Logger(ReportPathGeneratorService.name);

  /**
   * Generate task-based folder structure and meaningful filename
   * Structure: workflow-manager-mcp-reports/[task-name]/[report-type]_[year]_[month].ext
   */
  generateReportPath(options: ReportPathOptions): GeneratedReportPath {
    const {
      reportType,
      outputFormat,
      taskId,
      taskName,
      startDate,
      endDate,
      filters,
      basePath,
    } = options;

    // Generate timestamp components
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);

    // Build filename components
    const filenameComponents = [reportType];

    // Add date range if provided
    if (startDate && endDate) {
      const start = startDate.toISOString().slice(0, 10);
      const end = endDate.toISOString().slice(0, 10);
      filenameComponents.push(`${start}_to_${end}`);
    } else if (startDate) {
      filenameComponents.push(`from_${startDate.toISOString().slice(0, 10)}`);
    } else if (endDate) {
      filenameComponents.push(`until_${endDate.toISOString().slice(0, 10)}`);
    } else {
      // Add year_month for current reports
      filenameComponents.push(`${year}_${month}`);
    }

    // Add filters if provided
    if (filters && Object.keys(filters).length > 0) {
      const filterParts = Object.entries(filters)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}-${value}`)
        .join('_');
      if (filterParts) {
        filenameComponents.push(filterParts);
      }
    }

    // Add timestamp for uniqueness
    filenameComponents.push(timestamp);

    // Generate final filename
    const filename = `${filenameComponents.join('_')}.${outputFormat}`;

    // Generate folder structure
    const baseReportsPath = basePath
      ? path.join(basePath, 'workflow-manager-mcp-reports')
      : path.join(process.cwd(), 'workflow-manager-mcp-reports');

    let folderPath: string;

    if (taskId || taskName) {
      // Task-based structure: workflow-manager-mcp-reports/[task-name]/
      const taskFolderName = this.sanitizeTaskName(
        taskName || taskId || 'unknown-task',
      );
      folderPath = path.join(baseReportsPath, taskFolderName);
    } else {
      // Aggregate reports: workflow-manager-mcp-reports/aggregate-reports/
      folderPath = path.join(baseReportsPath, 'aggregate-reports');
    }

    const fullPath = path.join(folderPath, filename);

    this.logger.log(`Generated report path: ${fullPath}`);

    return {
      filename,
      folderPath,
      fullPath,
    };
  }

  /**
   * Sanitize task name for use as folder name
   * Removes invalid characters and limits length
   */
  private sanitizeTaskName(taskName: string): string {
    return taskName
      .replace(/[^a-zA-Z0-9\-_\s]/g, '') // Remove invalid characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .toLowerCase() // Convert to lowercase
      .substring(0, 50) // Limit length
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  /**
   * Generate legacy path structure for backward compatibility
   * Structure: workflow-manager-mcp-reports/[report-type]/[year]/[month]/filename.ext
   */
  generateLegacyReportPath(options: ReportPathOptions): GeneratedReportPath {
    const { reportType, outputFormat, startDate, endDate, filters, basePath } =
      options;

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, '-')
      .slice(0, 19);

    // Build date range part
    let dateRange = '';
    if (startDate && endDate) {
      const start = startDate.toISOString().slice(0, 10);
      const end = endDate.toISOString().slice(0, 10);
      dateRange = `_${start}_to_${end}`;
    } else if (startDate) {
      dateRange = `_from_${startDate.toISOString().slice(0, 10)}`;
    } else if (endDate) {
      dateRange = `_until_${endDate.toISOString().slice(0, 10)}`;
    }

    // Build filters part
    let filtersStr = '';
    if (filters && Object.keys(filters).length > 0) {
      const filterParts = Object.entries(filters)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}-${value}`)
        .join('_');
      if (filterParts) {
        filtersStr = `_${filterParts}`;
      }
    }

    // Generate filename
    const filename = `${reportType}${dateRange}${filtersStr}_${timestamp}.${outputFormat}`;

    // Generate folder structure (legacy)
    const baseReportsPath = basePath
      ? path.join(basePath, 'workflow-manager-mcp-reports')
      : path.join(process.cwd(), 'workflow-manager-mcp-reports');

    const year = new Date().getFullYear().toString();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');

    const folderPath = path.join(baseReportsPath, reportType, year, month);
    const fullPath = path.join(folderPath, filename);

    return {
      filename,
      folderPath,
      fullPath,
    };
  }

  /**
   * Get task information for path generation
   */
  getTaskInfoForPath(taskId?: string): { taskName?: string; taskId?: string } {
    if (!taskId) {
      return {};
    }

    try {
      // For now, return the taskId as taskName
      // In the future, this could query the database for the actual task name
      return {
        taskId,
        taskName: taskId, // This could be enhanced to fetch actual task name from DB
      };
    } catch (error) {
      this.logger.warn(`Failed to get task info for ${taskId}`, error);
      return { taskId };
    }
  }
}
