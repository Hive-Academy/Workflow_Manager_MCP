/**
 * Research Documentation Template Interface
 * Defines the data structure for task research and documentation quality analysis
 */

export interface ResearchDocumentationData {
  research: {
    completeness: number;
    sourceCount: number;
    depth: string;
    findings: ResearchFinding[];
    findingsLabels: string[];
    findingsData: number[];
    findingsColors: string[];
  };

  documentation: {
    quality: number;
    metrics: DocumentationMetric[];
    qualityLabels: string[];
    qualityData: number[];
  };

  sources: {
    categories: SourceCategory[];
  };

  methodology: {
    approach: string[];
    validation: string[];
    timeline: MethodologyPhase[];
  };

  gaps: {
    identified: KnowledgeGap[];
    mitigations: MitigationStrategy[];
  };

  impact: {
    areas: ImpactArea[];
    chartLabels: string[];
    confidenceData: number[];
    riskData: number[];
    coverageData: number[];
  };

  recommendations: ResearchRecommendation[];

  futureResearch: FutureResearchArea[];
}

export interface ResearchFinding {
  category: string;
  categoryBorderClass: string;
  summary: string;
  confidence: string;
  confidenceClass: string;
  sourceCount: number;
  validation: string;
}

export interface DocumentationMetric {
  aspect: string;
  score: number;
  scoreClass: string;
  percentage: number;
  color: string;
  feedback: string;
}

export interface SourceCategory {
  type: string;
  count: number;
  description: string;
  reliability: number;
  color: string;
  icon: string;
}

export interface MethodologyPhase {
  phase: string;
  duration: string;
  status: string;
  statusColor: string;
  icon: string;
}

export interface KnowledgeGap {
  area: string;
  description: string;
  severity: string;
  impact: string;
  priority: string;
}

export interface MitigationStrategy {
  strategy: string;
  description: string;
  feasibility: string;
  effort: string;
  timeline: string;
}

export interface ImpactArea {
  category: string;
  color: string;
  metrics: ImpactMetric[];
}

export interface ImpactMetric {
  metric: string;
  value: string;
  valueClass: string;
}

export interface ResearchRecommendation {
  title: string;
  description: string;
  priority: string;
  confidence: number;
  confidenceClass: string;
  evidenceLevel: string;
  evidenceClass: string;
  supportingFindings?: string;
  icon: string;
}

export interface FutureResearchArea {
  area: string;
  description: string;
  priority: string;
  priorityClass: string;
  complexity: string;
  complexityClass: string;
  estimatedEffort: string;
  expectedValue: string;
  icon: string;
}
