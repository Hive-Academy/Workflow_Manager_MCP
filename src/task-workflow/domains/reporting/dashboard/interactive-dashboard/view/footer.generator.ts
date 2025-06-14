import { Injectable } from '@nestjs/common';
import { InteractiveDashboardData } from '../../../shared/types/report-data.types';

/**
 * Footer Generator
 * Responsible for generating dashboard footer section
 */
@Injectable()
export class FooterGenerator {
  /**
   * Generate footer section
   */
  generateFooter(metadata: InteractiveDashboardData['metadata']): string {
    return `
    <footer class="bg-white border-t border-gray-200 mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="flex items-center justify-between">
                <div class="text-sm text-gray-500">
                    Generated by ${this.escapeHtml(metadata.generatedBy)} • Version ${this.escapeHtml(metadata.version)}
                </div>
                <div class="text-sm text-gray-500">
                    Last updated: ${this.formatDate(metadata.generatedAt)}
                </div>
            </div>
        </div>
    </footer>`;
  }

  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  private formatDate(dateString: string): string {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  }
}
