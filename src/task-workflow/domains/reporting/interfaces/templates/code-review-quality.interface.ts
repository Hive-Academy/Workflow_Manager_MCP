/**
 * Code Review Quality Template Interface
 * Defines the data structure for code review quality analysis
 */

export interface CodeReviewQualityData {
  generatedAt: string;
  dateRange?: string;

  reviewReport: {
    status:
      | 'APPROVED'
      | 'APPROVED_WITH_RESERVATIONS'
      | 'NEEDS_CHANGES'
      | 'PENDING';
    summary: string;
    strengths?: string;
    issues?: string;
    manualTestingResults?: string;
    requiredChanges?: string;
  };

  qualityScores: {
    codeQuality: number;
    testCoverage: number;
    security: number;
    performance: number;
    maintainability: number;
    documentation: number;
  };

  acceptanceCriteria: AcceptanceCriterion[];

  testingResults: {
    unit: TestResults;
    integration: TestResults;
    e2e: TestResults;
    manual: ManualTestResults;
    performance: PerformanceTestResults;
    security: SecurityTestResults;
  };

  issuesFound?: CodeIssue[];

  recommendations?: QualityRecommendation[];
}

export interface AcceptanceCriterion {
  criterion: string;
  status: 'verified' | 'partial' | 'failed';
  description?: string;
  evidence?: string;
}

export interface TestResults {
  passed: number;
  failed: number;
  coverage: string;
  status: 'passed' | 'warning' | 'failed';
}

export interface ManualTestResults {
  scenarios: number;
  passed: number;
  failed: number;
  status: 'passed' | 'warning' | 'failed';
}

export interface PerformanceTestResults {
  avgResponse: string;
  p95: string;
  status: 'passed' | 'warning' | 'failed';
}

export interface SecurityTestResults {
  vulnerabilities: number;
  warnings: number;
  status: 'passed' | 'warning' | 'failed';
}

export interface CodeIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  location?: string;
}

export interface QualityRecommendation {
  priority: 'high' | 'medium' | 'low';
  text: string;
}

// Helper interfaces for template functions
export interface CriteriaStats {
  verified: number;
  total: number;
  percentage: number;
}
