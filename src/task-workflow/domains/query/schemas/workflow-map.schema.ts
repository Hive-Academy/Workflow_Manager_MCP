import { z } from 'zod';

// ✅ FIXED: Workflow map schema for visualizing workflow state
export const WorkflowMapSchema = z.object({
  taskId: z.string().optional().describe('Optional Task ID to highlight its current mode in the map'),
  showMetrics: z.boolean().optional().default(true).describe('Whether to include workflow metrics'),
  includeTransitionHistory: z.boolean().optional().default(false).describe('Whether to include transition history'),
});

export type WorkflowMapParams = z.infer<typeof WorkflowMapSchema>;

// ✅ FIXED: Workflow map response with complete workflow visualization
export const WorkflowMapResponseSchema = z.object({
  // Workflow structure
  workflowNodes: z.array(z.object({
    id: z.string().describe('Node ID (mode name)'),
    name: z.string().describe('Display name'),
    type: z.enum(['role', 'stage', 'decision']).describe('Type of workflow node'),
    description: z.string().describe('Node description'),
    
    // Node state
    isActive: z.boolean().describe('Whether this node is currently active'),
    currentTasks: z.array(z.string()).describe('Tasks currently in this mode'),
    taskCount: z.number().int().describe('Number of tasks in this mode'),
    
    // Node metrics
    averageTime: z.number().optional().describe('Average time spent in this mode (hours)'),
    throughput: z.number().optional().describe('Tasks processed per day'),
    successRate: z.number().optional().describe('Success rate (0-1)'),
  })),
  
  // Workflow edges (transitions)
  workflowEdges: z.array(z.object({
    from: z.string().describe('Source mode'),
    to: z.string().describe('Target mode'),
    type: z.enum(['normal', 'delegation', 'redelegation', 'escalation']).describe('Type of transition'),
    weight: z.number().describe('Frequency of this transition'),
    
    // Edge metrics
    transitionCount: z.number().int().describe('Number of times this transition occurred'),
    averageTransitionTime: z.number().optional().describe('Average time for this transition (minutes)'),
    successRate: z.number().optional().describe('Success rate for this transition (0-1)'),
  })),
  
  // Highlighted task context (if taskId provided)
  highlightedTask: z.object({
    taskId: z.string(),
    currentMode: z.string().nullable(),
    workflowPath: z.array(z.string()).describe('Path through workflow nodes'),
    stageProgress: z.number().describe('Progress through current stage (0-1)'),
    estimatedCompletion: z.date().optional().describe('Estimated completion time'),
  }).optional(),
  
  // Workflow health metrics
  workflowHealth: z.object({
    overallEfficiency: z.number().describe('Overall workflow efficiency (0-1)'),
    bottleneckModes: z.array(z.string()).describe('Modes that are bottlenecks'),
    recommendedOptimizations: z.array(z.string()).describe('Suggested workflow improvements'),
    
    // Performance indicators
    averageTaskCycleTime: z.number().describe('Average time from start to completion (hours)'),
    redelegationRate: z.number().describe('Rate of task redelegations (0-1)'),
    blockageRate: z.number().describe('Rate of task blockages (0-1)'),
  }),
  
  // Visual layout information
  layout: z.object({
    positions: z.record(z.object({
      x: z.number(),
      y: z.number(),
    })).describe('Node positions for visualization'),
    dimensions: z.object({
      width: z.number(),
      height: z.number(),
    }).describe('Overall map dimensions'),
  }).optional(),
  
  // Map metadata
  generatedAt: z.date(),
  includesHistory: z.boolean(),
  totalTransitions: z.number().int(),
  timeRange: z.object({
    start: z.date(),
    end: z.date(),
  }).optional(),
});

export type WorkflowMapResponse = z.infer<typeof WorkflowMapResponseSchema>;