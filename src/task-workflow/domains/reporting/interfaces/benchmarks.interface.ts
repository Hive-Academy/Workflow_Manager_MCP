// src/task-workflow/domains/reporting/interfaces/benchmarks.interface.ts

export interface PerformanceBenchmark {
  teamBenchmarks: TeamBenchmark[];
  individualBenchmarks: IndividualBenchmark[];
  periodComparisons: PeriodComparison[];
  performanceRankings: PerformanceRanking[];
  benchmarkInsights: BenchmarkInsight[];
}

export interface TeamBenchmark {
  metric: string;
  currentValue: number;
  teamAverage: number;
  industryBenchmark?: number;
  percentile: number;
  trend: 'above' | 'below' | 'at' | 'unknown';
}

export interface IndividualBenchmark {
  owner: string;
  metrics: IndividualMetrics;
  ranking: number;
  percentileScore: number;
  strengths: string[];
  improvementAreas: string[];
}

export interface IndividualMetrics {
  tasksCompleted: number;
  avgCompletionTime: number;
  qualityScore: number;
  velocityScore: number;
  efficiencyRating: number;
}

export interface PeriodComparison {
  metric: string;
  currentPeriod: number;
  previousPeriod: number;
  changePercent: number;
  trend: 'improving' | 'declining' | 'stable';
  significance: 'high' | 'medium' | 'low';
}

export interface PerformanceRanking {
  category: string;
  rankings: Ranking[];
}

export interface Ranking {
  name: string;
  score: number;
  rank: number;
}

export interface BenchmarkInsight {
  category: string;
  insight: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
}
