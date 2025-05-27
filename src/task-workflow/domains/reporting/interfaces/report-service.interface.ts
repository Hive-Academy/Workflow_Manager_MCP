// src/task-workflow/domains/reporting/interfaces/report-service.interface.ts

import { ReportType } from './service-contracts.interface';
import { ReportData, ReportFilters } from './report-data.interface';

/**
 * IReportService Interface
 *
 * Follows SOLID Principles:
 * - SRP: Single responsibility for report generation
 * - OCP: Open for extension via new implementations
 * - LSP: All implementations must be substitutable
 * - ISP: Interface segregated for specific report functionality
 * - DIP: Abstracts report generation from concrete implementations
 *
 * This interface defines the contract for all specialized report services,
 * ensuring consistent behavior across aggregate and individual task reports.
 */
export interface IReportService {
  /**
   * Generate report data for the specified report type
   *
   * @param reportType - The specific type of report to generate
   * @param startDate - Optional start date for date-range filtering
   * @param endDate - Optional end date for date-range filtering
   * @param filters - Optional additional filters for data selection
   * @returns Promise resolving to complete report data
   */
  generateReportData(
    reportType: ReportType,
    startDate?: Date,
    endDate?: Date,
    filters?: ReportFilters,
  ): Promise<ReportData>;

  /**
   * Render report template with provided data
   *
   * @param reportType - The report type for template selection
   * @param data - The report data to render
   * @param customizations - Optional template customizations
   * @returns Promise resolving to rendered report content
   */
  renderReportTemplate(
    reportType: ReportType,
    data: ReportData,
    customizations?: any,
  ): Promise<string>;

  /**
   * Generate complete report (data + template rendering)
   *
   * @param reportType - The report type to generate
   * @param options - Generation options including dates, filters, and customizations
   * @returns Promise resolving to complete rendered report
   */
  generateCompleteReport(
    reportType: ReportType,
    options?: {
      startDate?: Date;
      endDate?: Date;
      taskId?: string;
      includeCharts?: boolean;
      priority?: string;
      owner?: string;
      mode?: string;
      customizations?: any;
    },
  ): Promise<string>;

  /**
   * Validate if this service supports the given report type
   *
   * @param reportType - The report type to check
   * @returns Boolean indicating if this service handles the report type
   */
  supportsReportType(reportType: ReportType): boolean;

  /**
   * Get supported report types for this service
   *
   * @returns Array of report types supported by this service
   */
  getSupportedReportTypes(): ReportType[];
}

/**
 * Base Report Service Configuration
 *
 * Common configuration interface for all report services
 */
export interface IReportServiceConfig {
  /**
   * Service name for identification and logging
   */
  serviceName: string;

  /**
   * Supported report types for this service
   */
  supportedTypes: ReportType[];

  /**
   * Default options for report generation
   */
  defaultOptions?: {
    includeCharts?: boolean;
    cacheResults?: boolean;
    cacheTTL?: number;
  };
}

/**
 * Report Service Factory Interface
 *
 * Defines contract for the factory that creates appropriate report services
 * Implements Factory Pattern for service selection
 */
export interface IReportServiceFactory {
  /**
   * Get the appropriate report service for the given report type
   *
   * @param reportType - The report type requiring service
   * @returns The report service that handles this type
   * @throws Error if no service supports the report type
   */
  getReportService(reportType: ReportType): IReportService;

  /**
   * Register a new report service with the factory
   *
   * @param service - The report service to register
   * @param config - Configuration for the service
   */
  registerReportService(
    service: IReportService,
    config: IReportServiceConfig,
  ): void;

  /**
   * Get all registered report services
   *
   * @returns Map of service names to service instances
   */
  getAllServices(): Map<string, IReportService>;
}
