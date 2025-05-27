// src/task-workflow/domains/reporting/services/chart-calculation.service.ts

import { Injectable } from '@nestjs/common';
import { IChartCalculationService } from '../../interfaces/chart-generator.interface';

/**
 * Chart calculation utility service
 * Follows Single Responsibility Principle (SRP) - handles only mathematical calculations
 */
@Injectable()
export class ChartCalculationService implements IChartCalculationService {
  /**
   * Calculate linear regression for trend analysis
   */
  calculateLinearRegression(values: number[]): number[] {
    const n = values.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * values[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return x.map((xi) => slope * xi + intercept);
  }

  /**
   * Calculate correlation coefficient between two datasets
   */
  calculateCorrelation(x: number[], y: number[]): number {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumYY = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
      (n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY),
    );

    return denominator === 0 ? 0 : numerator / denominator;
  }

  /**
   * Generate color gradient for data visualization
   */
  generateColorGradient(
    values: number[],
    startColor: string,
    endColor: string,
  ): string[] {
    // Handle edge cases
    if (!values || values.length === 0) {
      return ['#000000']; // Return default color for empty values
    }

    // Filter out invalid values for min/max calculation
    const validValues = values.filter(
      (v) => !isNaN(v) && v !== null && v !== undefined,
    );
    if (validValues.length === 0) {
      return values.map(() => '#000000'); // All values are invalid
    }

    const min = Math.min(...validValues);
    const max = Math.max(...validValues);

    // If all values are the same, return the start color
    if (max === min) {
      return values.map(() => startColor || '#000000');
    }

    return values.map((value) => {
      // Handle invalid values
      if (isNaN(value) || value === null || value === undefined) {
        return '#000000'; // Default color for invalid values
      }

      const ratio = Math.max(0, Math.min(1, (value - min) / (max - min))); // Clamp ratio between 0 and 1
      return this.interpolateColor(startColor, endColor, ratio);
    });
  }

  /**
   * Interpolate between two colors
   */
  interpolateColor(color1: string, color2: string, ratio: number): string {
    // Defensive programming: ensure colors are valid strings
    if (!color1 || typeof color1 !== 'string') {
      color1 = '#000000'; // Default to black
    }
    if (!color2 || typeof color2 !== 'string') {
      color2 = '#ffffff'; // Default to white
    }

    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');

    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);

    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);

    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  /**
   * Normalize value to a new range
   */
  normalizeValue(
    value: number,
    min: number,
    max: number,
    newMin: number,
    newMax: number,
  ): number {
    return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
  }

  /**
   * Generate prediction data for trend analysis
   */
  generatePredictionData(trendData: number[], periods: number): number[] {
    const lastTrend = trendData[trendData.length - 1];
    const secondLastTrend = trendData[trendData.length - 2];
    const slope = lastTrend - secondLastTrend;

    return Array.from(
      { length: periods },
      (_, i) => lastTrend + slope * (i + 1),
    );
  }

  /**
   * Generate prediction labels for future time periods
   */
  generatePredictionLabels(lastDate: Date, periods: number): string[] {
    const labels: string[] = [];
    for (let i = 1; i <= periods; i++) {
      const futureDate = new Date(lastDate);
      futureDate.setDate(futureDate.getDate() + i * 7); // Weekly predictions
      labels.push(
        futureDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
      );
    }
    return labels;
  }

  /**
   * Calculate scatter plot trend line
   */
  calculateScatterTrendLine(
    x: number[],
    y: number[],
  ): { x: number; y: number }[] {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const minX = Math.min(...x);
    const maxX = Math.max(...x);

    return [
      { x: minX, y: slope * minX + intercept },
      { x: maxX, y: slope * maxX + intercept },
    ];
  }

  /**
   * Generate heatmap colors based on scheme
   */
  generateHeatmapColors(
    values: number[],
    min: number,
    max: number,
    scheme: 'red-green' | 'blue-yellow' | 'viridis',
  ): string[] {
    const colorMaps = {
      'red-green': ['#ef4444', '#fbbf24', '#10b981'],
      'blue-yellow': ['#3b82f6', '#06b6d4', '#fbbf24'],
      viridis: ['#440154', '#31688e', '#35b779', '#fde725'],
    };

    const colors = colorMaps[scheme] || colorMaps['red-green']; // Fallback to red-green

    // Handle edge cases
    if (!values || values.length === 0) {
      return ['#000000']; // Return default color for empty values
    }

    if (max === min) {
      // All values are the same, return the middle color
      const middleIndex = Math.floor(colors.length / 2);
      return values.map(() => colors[middleIndex] || '#000000');
    }

    return values.map((value) => {
      // Handle NaN or invalid values
      if (isNaN(value) || value === null || value === undefined) {
        return '#000000'; // Default color for invalid values
      }

      const ratio = Math.max(0, Math.min(1, (value - min) / (max - min))); // Clamp ratio between 0 and 1
      const colorIndex = Math.max(
        0,
        Math.min(colors.length - 1, Math.floor(ratio * (colors.length - 1))),
      );
      const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
      const localRatio = Math.max(
        0,
        Math.min(1, ratio * (colors.length - 1) - colorIndex),
      );

      // Ensure we have valid colors before interpolating
      const color1 = colors[colorIndex] || '#000000';
      const color2 = colors[nextColorIndex] || '#ffffff';

      return this.interpolateColor(color1, color2, localRatio);
    });
  }

  /**
   * Darken a color by a factor
   */
  darkenColor(color: string, factor: number): string {
    // Defensive programming: ensure color is a valid string
    if (!color || typeof color !== 'string') {
      color = '#000000'; // Default to black
    }

    const hex = color.replace('#', '');
    const r = Math.round(parseInt(hex.substr(0, 2), 16) * (1 - factor));
    const g = Math.round(parseInt(hex.substr(2, 2), 16) * (1 - factor));
    const b = Math.round(parseInt(hex.substr(4, 2), 16) * (1 - factor));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}
