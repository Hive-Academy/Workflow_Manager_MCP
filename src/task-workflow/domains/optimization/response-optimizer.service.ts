/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, Logger } from '@nestjs/common';

export interface ResponseFormatOptions {
  maxTokens?: number;
  preferredFormat?: 'minimal' | 'summary' | 'detailed' | 'full';
  includeMetadata?: boolean;
  compressionLevel?: 'none' | 'basic' | 'aggressive';
  clientType?: 'mcp' | 'api' | 'ui';
}

export interface OptimizedResponse {
  content: Array<{
    type: 'text' | 'json';
    text?: string;
    json?: any;
  }>;
  _responseOptimization?: {
    originalTokenCount: number;
    optimizedTokenCount: number;
    compressionRatio: string;
    format: string;
    optimizations: string[];
  };
}

@Injectable()
export class ResponseOptimizerService {
  private readonly logger = new Logger(ResponseOptimizerService.name);

  // 🚀 ST-012: Token-aware response formatting

  // Main optimization method
  optimizeResponse(
    data: any,
    operation: string,
    options: ResponseFormatOptions = {},
  ): OptimizedResponse {
    const {
      maxTokens = 4000,
      preferredFormat = 'summary',
      includeMetadata = true,
      compressionLevel = 'basic',
      clientType = 'mcp',
    } = options;

    const originalContent = this.formatInitialResponse(data, operation);
    const originalTokenCount = this.estimateTokenCount(originalContent);

    let optimizedContent = originalContent;
    const optimizations: string[] = [];

    // Apply optimizations based on token count and preferences
    if (originalTokenCount > maxTokens || preferredFormat !== 'full') {
      optimizedContent = this.applyFormatOptimizations(
        originalContent,
        preferredFormat,
        maxTokens,
        optimizations,
      );
    }

    if (compressionLevel !== 'none') {
      optimizedContent = this.applyCompressionOptimizations(
        optimizedContent,
        compressionLevel,
        optimizations,
      );
    }

    // Client-specific optimizations
    if (clientType === 'mcp') {
      optimizedContent = this.applyMCPOptimizations(
        optimizedContent,
        optimizations,
      );
    }

    const optimizedTokenCount = this.estimateTokenCount(optimizedContent);
    const compressionRatio = Math.round(
      (1 - optimizedTokenCount / originalTokenCount) * 100,
    );

    const result: OptimizedResponse = {
      content: optimizedContent,
    };

    if (includeMetadata) {
      result._responseOptimization = {
        originalTokenCount,
        optimizedTokenCount,
        compressionRatio: `${compressionRatio}%`,
        format: preferredFormat,
        optimizations,
      };
    }

    return result;
  }

  // Format initial response structure
  private formatInitialResponse(data: any, operation: string): any[] {
    if (Array.isArray(data) && data.length > 0 && data[0].type) {
      // Already in MCP format
      return data;
    }

    // Convert to MCP format
    if (typeof data === 'string') {
      return [{ type: 'text', text: data }];
    }

    if (typeof data === 'object' && data !== null) {
      return [
        {
          type: 'text',
          text: `${operation} result:`,
        },
        {
          type: 'json',
          json: data,
        },
      ];
    }

    return [{ type: 'text', text: String(data) }];
  }

  // Apply format-based optimizations
  private applyFormatOptimizations(
    content: any[],
    format: string,
    maxTokens: number,
    optimizations: string[],
  ): any[] {
    switch (format) {
      case 'minimal':
        optimizations.push('minimal_format');
        return this.createMinimalFormat(content);

      case 'summary':
        optimizations.push('summary_format');
        return this.createSummaryFormat(content, maxTokens);

      case 'detailed':
        optimizations.push('detailed_format');
        return this.createDetailedFormat(content, maxTokens);

      default:
        return content;
    }
  }

  // Apply compression optimizations
  private applyCompressionOptimizations(
    content: any[],
    level: string,
    optimizations: string[],
  ): any[] {
    if (level === 'basic') {
      optimizations.push('basic_compression');
      return this.applyBasicCompression(content);
    }

    if (level === 'aggressive') {
      optimizations.push('aggressive_compression');
      return this.applyAggressiveCompression(content);
    }

    return content;
  }

  // MCP-specific optimizations
  private applyMCPOptimizations(
    content: any[],
    optimizations: string[],
  ): any[] {
    optimizations.push('mcp_protocol_optimization');

    // Optimize for MCP STDIO protocol
    return content.map((item) => {
      if (item.type === 'json') {
        // Ensure JSON is properly structured for MCP
        return {
          type: 'json',
          json: this.optimizeJSONForMCP(item.json),
        };
      }

      if (item.type === 'text') {
        // Optimize text for MCP
        return {
          type: 'text',
          text: this.optimizeTextForMCP(item.text),
        };
      }

      return item;
    });
  }

  // Create minimal format (status + essential data only)
  private createMinimalFormat(content: any[]): any[] {
    const essential = content.find(
      (item) =>
        item.type === 'json' &&
        (item.json?.taskId ||
          item.json?.status ||
          item.json?.error ||
          item.json?.notFound),
    );

    if (essential) {
      const minimalData = {
        ...(essential.json.taskId && { taskId: essential.json.taskId }),
        ...(essential.json.status && { status: essential.json.status }),
        ...(essential.json.currentMode && {
          currentMode: essential.json.currentMode,
        }),
        ...(essential.json.error && { error: essential.json.error }),
        ...(essential.json.notFound && { notFound: essential.json.notFound }),
      };

      return [
        {
          type: 'json',
          json: minimalData,
        },
      ];
    }

    // Fallback to first text item
    const textItem = content.find((item) => item.type === 'text');
    return textItem ? [textItem] : content.slice(0, 1);
  }

  // Create summary format (key fields + summaries)
  private createSummaryFormat(content: any[], maxTokens: number): any[] {
    const result: any[] = [];
    let currentTokens = 0;

    for (const item of content) {
      if (item.type === 'json') {
        const summarized = this.summarizeJSONObject(
          item.json,
          maxTokens - currentTokens,
        );
        const summaryItem = { type: 'json', json: summarized };
        result.push(summaryItem);
        currentTokens += this.estimateTokenCount([summaryItem]);
      } else if (item.type === 'text') {
        const remainingTokens = maxTokens - currentTokens;
        const maxLength = remainingTokens * 4; // Rough estimate: 4 chars per token
        const text =
          item.text.length > maxLength
            ? item.text.substring(0, maxLength) + '...'
            : item.text;
        result.push({ type: 'text', text });
        currentTokens += this.estimateTokenCount([{ type: 'text', text }]);
      }

      if (currentTokens >= maxTokens) break;
    }

    return result;
  }

  // Create detailed format (full data with some optimizations)
  private createDetailedFormat(content: any[], maxTokens: number): any[] {
    const estimatedTokens = this.estimateTokenCount(content);

    if (estimatedTokens <= maxTokens) {
      return content; // No optimization needed
    }

    // Apply selective optimization
    return content.map((item) => {
      if (item.type === 'json') {
        return {
          type: 'json',
          json: this.optimizeJSONForDetailed(item.json),
        };
      }
      return item;
    });
  }

  // Basic compression (remove whitespace, shorten field names)
  private applyBasicCompression(content: any[]): any[] {
    return content.map((item) => {
      if (item.type === 'text') {
        return {
          type: 'text',
          text: item.text.replace(/\s+/g, ' ').trim(),
        };
      }

      if (item.type === 'json') {
        return {
          type: 'json',
          json: this.compressJSONBasic(item.json),
        };
      }

      return item;
    });
  }

  // Aggressive compression (abbreviations, remove optional fields)
  private applyAggressiveCompression(content: any[]): any[] {
    return content.map((item) => {
      if (item.type === 'json') {
        return {
          type: 'json',
          json: this.compressJSONAggressive(item.json),
        };
      }

      if (item.type === 'text') {
        return {
          type: 'text',
          text: this.compressTextAggressive(item.text),
        };
      }

      return item;
    });
  }

  // Helper methods
  private summarizeJSONObject(obj: any, maxTokens: number): any {
    if (!obj || typeof obj !== 'object') return obj;

    const summary: any = {};
    const priorityFields = [
      'taskId',
      'status',
      'currentMode',
      'error',
      'notFound',
      'message',
    ];

    // Add priority fields first
    priorityFields.forEach((field) => {
      if (obj[field] !== undefined) {
        summary[field] = obj[field];
      }
    });

    // Add other fields until token limit
    let currentSize = JSON.stringify(summary).length;
    const maxSize = maxTokens * 4; // Rough estimate

    for (const [key, value] of Object.entries(obj)) {
      if (priorityFields.includes(key)) continue;

      const fieldSize = JSON.stringify({ [key]: value }).length;
      if (currentSize + fieldSize > maxSize) break;

      summary[key] = value;
      currentSize += fieldSize;
    }

    return summary;
  }

  private compressJSONBasic(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    const compressed: any = {};

    // Field name abbreviations
    const abbreviations: Record<string, string> = {
      taskId: 'tId',
      currentMode: 'mode',
      creationDate: 'created',
      updatedAt: 'updated',
      completionDate: 'completed',
      implementationPlan: 'implPlan',
      acceptanceCriteria: 'ac',
    };

    for (const [key, value] of Object.entries(obj)) {
      const newKey = abbreviations[key] || key;
      compressed[newKey] =
        typeof value === 'object' ? this.compressJSONBasic(value) : value;
    }

    return compressed;
  }

  private compressJSONAggressive(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    // Remove null/undefined values and empty objects/arrays
    const filtered = Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => {
        if (value === null || value === undefined) return false;
        if (Array.isArray(value) && value.length === 0) return false;
        if (typeof value === 'object' && Object.keys(value).length === 0)
          return false;
        return true;
      }),
    );

    return this.compressJSONBasic(filtered);
  }

  private compressTextAggressive(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/\b(the|a|an|and|or|but|in|on|at|to|for|of|with|by)\b/gi, '')
      .replace(/[.,;:!?]/g, '')
      .trim();
  }

  private optimizeJSONForMCP(obj: any): any {
    // Ensure proper MCP structure
    if (obj && typeof obj === 'object') {
      // Remove internal fields that shouldn't be exposed via MCP
      const { _internal, __proto__, ...clean } = obj;
      return clean;
    }
    return obj;
  }

  private optimizeTextForMCP(text: string): string {
    // Ensure text is MCP-compatible (no special protocol characters)
    // eslint-disable-next-line no-control-regex
    return text.replace(/[\x00-\x1F\x7F]/g, '').trim();
  }

  private optimizeJSONForDetailed(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    // Keep all fields but optimize nested objects
    const optimized: any = {};

    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value) && value.length > 10) {
        // Limit large arrays
        optimized[key] = [
          ...value.slice(0, 10),
          { _truncated: value.length - 10 },
        ];
      } else if (typeof value === 'string' && value.length > 1000) {
        // Truncate long strings
        optimized[key] = value.substring(0, 1000) + '... (truncated)';
      } else {
        optimized[key] =
          typeof value === 'object'
            ? this.optimizeJSONForDetailed(value)
            : value;
      }
    }

    return optimized;
  }

  // Estimate token count (rough approximation)
  private estimateTokenCount(content: any[]): number {
    const text = JSON.stringify(content);
    // Rough estimate: 1 token ≈ 4 characters for English text
    return Math.ceil(text.length / 4);
  }
}
