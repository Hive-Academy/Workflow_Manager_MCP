/**
 * Communication Collaboration Template Interface
 * Defines the data structure for team dynamics and workflow efficiency analysis
 */

export interface CommunicationCollaborationData {
  generatedAt: string;
  dateRange?: string;

  collaborationStats: {
    totalInteractions: number;
    roleTransitions: number;
    avgResponseTime: string;
    collaborationScore: number;
  };

  communicationMetrics: {
    clarity: MetricScore;
    responsiveness: MetricScore;
    collaboration: MetricScore;
    knowledgeSharing: MetricScore;
    conflictResolution: MetricScore;
    teamAlignment: MetricScore;
  };

  workflowSteps: WorkflowStep[];

  channels: CommunicationChannel[];

  issues: CollaborationIssue[];

  rolePerformance: {
    boomerang: RoleMetrics;
    researcher: RoleMetrics;
    architect: RoleMetrics;
    'senior-developer': RoleMetrics;
    'code-review': RoleMetrics;
  };

  recommendations: CollaborationRecommendation[];

  task?: {
    comments?: any[];
  };
}

export interface MetricScore {
  score: number;
  icon: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  role: string;
  status: 'completed' | 'in-progress' | 'blocked' | 'pending';
  description: string;
  duration: string;
  interactions: number;
  efficiency: string;
  quality: string;
}

export interface CommunicationChannel {
  name: string;
  icon: string;
  usage: number;
  level: 'high' | 'medium' | 'low';
}

export interface CollaborationIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
}

export interface RoleMetrics {
  [key: string]: number;
}

export interface CollaborationRecommendation {
  type: 'communication' | 'process' | 'tooling' | 'training';
  text: string;
}
