// src/task-workflow/domains/reporting/report-rendering.service.ts
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Browser, chromium } from 'playwright';

export interface RenderOptions {
  format: 'pdf' | 'png' | 'jpeg';
  width?: number;
  height?: number;
  fullPage?: boolean;
  quality?: number; // For JPEG only
  waitForTimeout?: number;
  printBackground?: boolean; // For PDF
  landscape?: boolean; // For PDF
  scale?: number; // For PDF
}

export interface RenderedReport {
  buffer: Buffer;
  filename: string;
  mimeType: string;
  size: number;
}

@Injectable()
export class ReportRenderingService implements OnModuleDestroy {
  private readonly logger = new Logger(ReportRenderingService.name);
  private browser: Browser | null = null;
  private readonly outputPath = path.join(process.cwd(), 'reports', 'rendered');

  constructor() {
    this.ensureOutputDirectory();
  }

  async onModuleDestroy() {
    await this.closeBrowser();
  }

  private async ensureOutputDirectory(): Promise<void> {
    try {
      await fs.mkdir(this.outputPath, { recursive: true });
    } catch (error) {
      this.logger.error('Failed to create output directory', error);
    }
  }

  private async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.logger.log('Launching Playwright browser...');
      this.browser = await chromium.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
        ],
      });
      this.logger.log('Playwright browser launched successfully');
    }
    return this.browser;
  }

  private async closeBrowser(): Promise<void> {
    if (this.browser) {
      this.logger.log('Closing Playwright browser...');
      await this.browser.close();
      this.browser = null;
    }
  }

  async renderHtmlToPdf(
    htmlContent: string,
    options: RenderOptions = { format: 'pdf' },
  ): Promise<RenderedReport> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();

    try {
      this.logger.log('Rendering HTML to PDF...');

      // Set viewport
      await page.setViewportSize({
        width: options.width || 1200,
        height: options.height || 800,
      });

      // Load HTML content
      await page.setContent(htmlContent, {
        waitUntil: 'networkidle',
        timeout: options.waitForTimeout || 30000,
      });

      // Wait for charts to render
      await page.waitForTimeout(2000);

      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: options.printBackground ?? true,
        landscape: options.landscape ?? false,
        scale: options.scale ?? 1,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px',
        },
      });

      const filename = `report_${Date.now()}.pdf`;
      const filepath = path.join(this.outputPath, filename);
      await fs.writeFile(filepath, pdfBuffer);

      this.logger.log(`PDF report generated: ${filename}`);

      return {
        buffer: pdfBuffer,
        filename,
        mimeType: 'application/pdf',
        size: pdfBuffer.length,
      };
    } catch (error) {
      this.logger.error('Failed to render HTML to PDF', error);
      throw error;
    } finally {
      await page.close();
    }
  }

  async renderHtmlToImage(
    htmlContent: string,
    options: RenderOptions = { format: 'png' },
  ): Promise<RenderedReport> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();

    try {
      this.logger.log(
        `Rendering HTML to ${options.format?.toUpperCase() || 'PNG'}...`,
      );

      // Set viewport
      await page.setViewportSize({
        width: options.width || 1200,
        height: options.height || 800,
      });

      // Load HTML content
      await page.setContent(htmlContent, {
        waitUntil: 'networkidle',
        timeout: options.waitForTimeout || 30000,
      });

      // Wait for charts to render
      await page.waitForTimeout(2000);

      // Generate screenshot
      const screenshotOptions: any = {
        fullPage: options.fullPage ?? true,
        type: options.format === 'jpeg' ? 'jpeg' : 'png',
      };

      if (options.format === 'jpeg' && options.quality) {
        screenshotOptions.quality = options.quality;
      }

      const imageBuffer = await page.screenshot(screenshotOptions);
      const extension = options.format === 'jpeg' ? 'jpg' : 'png';
      const filename = `report_${Date.now()}.${extension}`;
      const filepath = path.join(this.outputPath, filename);
      await fs.writeFile(filepath, imageBuffer);

      const mimeType = options.format === 'jpeg' ? 'image/jpeg' : 'image/png';

      this.logger.log(
        `${options.format?.toUpperCase() || 'PNG'} report generated: ${filename}`,
      );

      return {
        buffer: imageBuffer,
        filename,
        mimeType,
        size: imageBuffer.length,
      };
    } catch (error) {
      this.logger.error(
        `Failed to render HTML to ${options.format?.toUpperCase() || 'PNG'}`,
        error,
      );
      throw error;
    } finally {
      await page.close();
    }
  }

  async renderReport(
    htmlContent: string,
    options: RenderOptions = { format: 'pdf' },
  ): Promise<RenderedReport> {
    const format = options.format || 'pdf';

    if (format === 'pdf') {
      return this.renderHtmlToPdf(htmlContent, options);
    } else {
      return this.renderHtmlToImage(htmlContent, options);
    }
  }

  async saveRenderedReport(report: RenderedReport): Promise<string> {
    const filepath = path.join(this.outputPath, report.filename);
    await fs.writeFile(filepath, report.buffer);
    return filepath;
  }

  getRenderedReportPath(filename: string): string {
    return path.join(this.outputPath, filename);
  }

  async cleanupRenderedReport(filename: string): Promise<void> {
    try {
      const filepath = path.join(this.outputPath, filename);
      await fs.unlink(filepath);
      this.logger.log(`Cleaned up rendered report: ${filename}`);
    } catch (error) {
      this.logger.warn(`Failed to cleanup rendered report: ${filename}`, error);
    }
  }

  async getReportAsBase64(filename: string): Promise<string> {
    const filepath = path.join(this.outputPath, filename);
    const buffer = await fs.readFile(filepath);
    return buffer.toString('base64');
  }

  // Health check method to ensure browser is working
  async healthCheck(): Promise<boolean> {
    try {
      const browser = await this.getBrowser();
      const page = await browser.newPage();
      await page.setContent(
        '<html><head><title>Health Check</title></head><body><h1>OK</h1></body></html>',
      );
      await page.close();
      return true;
    } catch (error) {
      this.logger.error('Health check failed', error);
      return false;
    }
  }
}
