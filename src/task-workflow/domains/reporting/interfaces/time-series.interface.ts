// src/task-workflow/domains/reporting/interfaces/time-series.interface.ts

export interface TimeSeriesMetrics {
  weeklyTrends: WeeklyTrend[];
  monthlyTrends: MonthlyTrend[];
  performanceTrends: PerformanceTrend[];
  historicalPatterns: HistoricalPattern[];
  seasonalAnalysis: SeasonalPattern[];
  trendInsights: TrendInsight[];
}

export interface WeeklyTrend {
  weekStart: Date;
  weekEnd: Date;
  tasksCreated: number;
  tasksCompleted: number;
  avgCompletionTimeHours: number;
  delegationVolume: number;
  codeReviewsCompleted: number;
  weeklyEfficiency: number;
}

export interface MonthlyTrend {
  month: string;
  year: number;
  tasksCreated: number;
  tasksCompleted: number;
  avgCompletionTimeHours: number;
  monthlyEfficiency: number;
  qualityScore: number;
  delegationSuccessRate: number;
}

export interface PerformanceTrend {
  period: string;
  completionRate: number;
  qualityScore: number;
  velocityScore: number;
  efficiency: number;
  trendDirection: 'improving' | 'declining' | 'stable';
}

export interface HistoricalPattern {
  pattern: string;
  frequency: number;
  period: string;
  impact: 'positive' | 'negative' | 'neutral';
  recommendation: string;
}

export interface SeasonalPattern {
  timeOfDay?: 'morning' | 'afternoon' | 'evening';
  dayOfWeek?: string;
  monthOfYear?: string;
  metric: string;
  averageValue: number;
  trend: 'peak' | 'low' | 'average';
}

export interface TrendInsight {
  metric: string;
  currentValue: number;
  previousValue: number;
  changePercent: number;
  trend: 'improving' | 'declining' | 'stable';
  insight: string;
  actionable: boolean;
}
