import { Injectable, Logger } from '@nestjs/common';
import { ReportType } from '../interfaces/service-contracts.interface';
import { ReportData } from '../interfaces/report-data.interface';
import { SmartResponseSummarizationService } from './smart-response-summarization.service';

/**
 * Enhanced Insights Generation Service
 *
 * Provides automated insight generation based on statistical analysis and pattern recognition.
 * Integrates with SmartResponseSummarizationService for token-efficient MCP responses.
 *
 * Follows SOLID principles:
 * - SRP: Single responsibility - generates intelligent insights from report data
 * - OCP: Open for extension via new insight strategies
 * - LSP: Insight strategies are substitutable
 * - ISP: Clients depend only on methods they use
 * - DIP: Depends on abstractions for extensibility
 */
@Injectable()
export class EnhancedInsightsGeneratorService {
  private readonly logger = new Logger(EnhancedInsightsGeneratorService.name);

  constructor(
    private readonly smartResponseService: SmartResponseSummarizationService,
  ) {}

  /**
   * Generate comprehensive insights for a report with smart MCP response
   */
  async generateInsightsWithSmartResponse(
    reportType: ReportType,
    reportData: ReportData,
    filePath: string,
  ): Promise<{
    insights: EnhancedInsight[];
    smartResponse: {
      summary: string;
      keyInsights: string[];
      actionableRecommendations: string[];
      tokenCount: number;
    };
  }> {
    this.logger.log(`Generating enhanced insights for ${reportType} report`);

    // Generate comprehensive insights
    const insights = await this.generateEnhancedInsights(
      reportType,
      reportData,
    );

    // Get smart MCP response
    const smartResponse =
      await this.smartResponseService.createOptimizedSummary(
        reportType,
        reportData,
        filePath,
      );

    return {
      insights,
      smartResponse,
    };
  }

  /**
   * Generate enhanced insights based on report type and data
   */
  async generateEnhancedInsights(
    reportType: ReportType,
    reportData: ReportData,
  ): Promise<EnhancedInsight[]> {
    const insights: EnhancedInsight[] = [];

    switch (reportType) {
      case 'performance_dashboard':
        insights.push(...this.generatePerformanceInsights(reportData));
        break;
      case 'task_summary':
        insights.push(...this.generateTaskSummaryInsights(reportData));
        break;
      case 'delegation_analytics':
        insights.push(...this.generateDelegationInsights(reportData));
        break;
      case 'code_review_insights':
        insights.push(...this.generateCodeReviewInsights(reportData));
        break;
      case 'implementation_plan_analytics':
        insights.push(...this.generateImplementationInsights(reportData));
        break;
      // Individual task report types
      case 'task_progress_health':
      case 'implementation_execution':
      case 'code_review_quality':
      case 'delegation_flow_analysis':
      case 'research_documentation':
      case 'communication_collaboration':
        insights.push(
          ...this.generateIndividualTaskInsights(reportType, reportData),
        );
        break;
      default:
        insights.push(...this.generateGenericInsights(reportData));
    }

    // Add cross-cutting insights
    insights.push(...this.generateCrossCuttingInsights(reportData));

    // Sort by priority and confidence
    return insights
      .sort((a, b) => b.priority - a.priority || b.confidence - a.confidence)
      .slice(0, 10); // Limit to top 10 insights
  }

  /**
   * Generate performance dashboard specific insights
   */
  private generatePerformanceInsights(
    reportData: ReportData,
  ): EnhancedInsight[] {
    const insights: EnhancedInsight[] = [];
    const metrics = reportData.metrics;

    // Task completion analysis
    if (metrics.tasks) {
      const completionRate = metrics.tasks.completionRate;
      const avgTime = metrics.tasks.avgCompletionTimeHours;

      if (completionRate < 0.7) {
        insights.push({
          type: 'performance_bottleneck',
          category: 'task_completion',
          title: 'Low Task Completion Rate Detected',
          description: `Current completion rate of ${(completionRate * 100).toFixed(1)}% is below optimal threshold. This indicates potential workflow bottlenecks.`,
          impact: 'high',
          priority: 9,
          confidence: 0.85,
          actionableSteps: [
            'Review task complexity and break down large tasks',
            'Identify common blockers in incomplete tasks',
            'Consider resource reallocation or additional support',
          ],
          dataPoints: {
            completionRate,
            avgCompletionTime: avgTime,
            totalTasks: metrics.tasks.totalTasks,
          },
        });
      }

      if (avgTime > 48) {
        insights.push({
          type: 'efficiency_concern',
          category: 'task_duration',
          title: 'Extended Task Duration Pattern',
          description: `Average task completion time of ${avgTime.toFixed(1)} hours exceeds recommended thresholds.`,
          impact: 'medium',
          priority: 7,
          confidence: 0.8,
          actionableSteps: [
            'Analyze tasks taking longer than expected',
            'Review estimation accuracy',
            'Consider process optimization',
          ],
          dataPoints: {
            avgCompletionTime: avgTime,
            recommendedTime: 24,
          },
        });
      }
    }

    // Delegation efficiency analysis
    if (metrics.delegations) {
      const successRate =
        metrics.delegations.successfulDelegations /
        metrics.delegations.totalDelegations;

      if (successRate < 0.8) {
        insights.push({
          type: 'delegation_issue',
          category: 'workflow_efficiency',
          title: 'Delegation Success Rate Below Target',
          description: `Delegation success rate of ${(successRate * 100).toFixed(1)}% indicates communication or clarity issues.`,
          impact: 'high',
          priority: 8,
          confidence: 0.9,
          actionableSteps: [
            'Review delegation messages for clarity',
            'Implement delegation templates',
            'Provide additional context in handoffs',
          ],
          dataPoints: {
            successRate,
            totalDelegations: metrics.delegations.totalDelegations,
            failedDelegations: metrics.delegations.failedDelegations,
          },
        });
      }
    }

    return insights;
  }

  /**
   * Generate task summary specific insights
   */
  private generateTaskSummaryInsights(
    reportData: ReportData,
  ): EnhancedInsight[] {
    const insights: EnhancedInsight[] = [];
    const metrics = reportData.metrics;

    if (metrics.tasks) {
      // Priority distribution analysis
      const priorityDistribution = metrics.tasks.priorityDistribution || [];
      const highPriorityTasks =
        priorityDistribution.find((p) => p.priority === 'High')?.count || 0;
      const totalTasks = metrics.tasks.totalTasks;

      if (highPriorityTasks / totalTasks > 0.4) {
        insights.push({
          type: 'priority_imbalance',
          category: 'task_management',
          title: 'High Priority Task Overload',
          description: `${((highPriorityTasks / totalTasks) * 100).toFixed(1)}% of tasks are high priority, indicating potential planning issues.`,
          impact: 'medium',
          priority: 6,
          confidence: 0.75,
          actionableSteps: [
            'Review priority assignment criteria',
            'Consider redistributing task priorities',
            'Implement priority escalation process',
          ],
          dataPoints: {
            highPriorityPercentage: (highPriorityTasks / totalTasks) * 100,
            totalTasks,
            highPriorityTasks,
          },
        });
      }

      // Owner distribution analysis
      const ownerDistribution = metrics.tasks.tasksByOwner || [];
      if (ownerDistribution.length > 0) {
        const maxTasksPerOwner = Math.max(
          ...ownerDistribution.map((o) => o.count),
        );
        const avgTasksPerOwner = totalTasks / ownerDistribution.length;

        if (maxTasksPerOwner > avgTasksPerOwner * 2) {
          insights.push({
            type: 'workload_imbalance',
            category: 'resource_allocation',
            title: 'Uneven Task Distribution Detected',
            description: `Workload imbalance detected with some team members handling significantly more tasks than others.`,
            impact: 'medium',
            priority: 5,
            confidence: 0.8,
            actionableSteps: [
              'Review task assignment process',
              'Consider workload balancing',
              'Identify capacity constraints',
            ],
            dataPoints: {
              maxTasksPerOwner,
              avgTasksPerOwner,
              ownerCount: ownerDistribution.length,
            },
          });
        }
      }
    }

    return insights;
  }

  /**
   * Generate delegation analytics insights
   */
  private generateDelegationInsights(
    reportData: ReportData,
  ): EnhancedInsight[] {
    const insights: EnhancedInsight[] = [];
    const metrics = reportData.metrics;

    if (metrics.delegations) {
      const avgRedelegations = metrics.delegations.avgRedelegationCount;

      if (avgRedelegations > 1.5) {
        insights.push({
          type: 'redelegation_pattern',
          category: 'workflow_efficiency',
          title: 'High Redelegation Rate Indicates Process Issues',
          description: `Average redelegation count of ${avgRedelegations.toFixed(1)} suggests unclear requirements or mismatched assignments.`,
          impact: 'high',
          priority: 8,
          confidence: 0.85,
          actionableSteps: [
            'Implement requirement clarity checklist',
            'Review role-task matching process',
            'Provide delegation training',
          ],
          dataPoints: {
            avgRedelegationCount: avgRedelegations,
            maxRedelegationCount: metrics.delegations.maxRedelegationCount,
          },
        });
      }

      // Mode transition analysis
      const modeTransitions = metrics.delegations.modeTransitions || [];
      const mostCommonTransition = modeTransitions.reduce(
        (max, current) => (current.count > max.count ? current : max),
        modeTransitions[0],
      );

      if (
        mostCommonTransition &&
        mostCommonTransition.count > metrics.delegations.totalDelegations * 0.3
      ) {
        insights.push({
          type: 'workflow_pattern',
          category: 'process_optimization',
          title: 'Dominant Workflow Pattern Identified',
          description: `${mostCommonTransition.fromMode} → ${mostCommonTransition.toMode} represents ${((mostCommonTransition.count / metrics.delegations.totalDelegations) * 100).toFixed(1)}% of delegations.`,
          impact: 'low',
          priority: 4,
          confidence: 0.9,
          actionableSteps: [
            'Optimize this common workflow path',
            'Create specialized templates for this transition',
            'Consider automation opportunities',
          ],
          dataPoints: {
            transitionPattern: `${mostCommonTransition.fromMode} → ${mostCommonTransition.toMode}`,
            frequency: mostCommonTransition.count,
            percentage:
              (mostCommonTransition.count /
                metrics.delegations.totalDelegations) *
              100,
          },
        });
      }
    }

    return insights;
  }

  /**
   * Generate code review insights
   */
  private generateCodeReviewInsights(
    reportData: ReportData,
  ): EnhancedInsight[] {
    const insights: EnhancedInsight[] = [];
    const metrics = reportData.metrics;

    if (metrics.codeReviews) {
      const approvalRate = metrics.codeReviews.approvalRate;
      const avgReviewTime = metrics.codeReviews.avgReviewTimeHours;

      if (approvalRate < 0.7) {
        insights.push({
          type: 'quality_concern',
          category: 'code_quality',
          title: 'Low Code Review Approval Rate',
          description: `Approval rate of ${(approvalRate * 100).toFixed(1)}% indicates potential quality issues or overly strict review criteria.`,
          impact: 'high',
          priority: 9,
          confidence: 0.9,
          actionableSteps: [
            'Review code quality standards',
            'Implement pre-review quality checks',
            'Provide developer training on common issues',
          ],
          dataPoints: {
            approvalRate,
            totalReviews: metrics.codeReviews.totalReviews,
            needsChangesReviews: metrics.codeReviews.needsChangesReviews,
          },
        });
      }

      if (avgReviewTime > 48) {
        insights.push({
          type: 'process_bottleneck',
          category: 'review_efficiency',
          title: 'Extended Code Review Cycle Time',
          description: `Average review time of ${avgReviewTime.toFixed(1)} hours may be impacting development velocity.`,
          impact: 'medium',
          priority: 6,
          confidence: 0.8,
          actionableSteps: [
            'Set review time expectations',
            'Implement review assignment rotation',
            'Consider smaller, more frequent reviews',
          ],
          dataPoints: {
            avgReviewTime,
            recommendedTime: 24,
          },
        });
      }
    }

    return insights;
  }

  /**
   * Generate implementation plan insights
   */
  private generateImplementationInsights(
    reportData: ReportData,
  ): EnhancedInsight[] {
    const insights: EnhancedInsight[] = [];
    const metrics = reportData.metrics;

    if (metrics.implementationPlans) {
      const batchCompletionRate =
        metrics.implementationPlans.batchCompletionRate;
      const estimationAccuracy = metrics.implementationPlans.estimationAccuracy;

      if (batchCompletionRate < 0.8) {
        insights.push({
          type: 'planning_issue',
          category: 'implementation_efficiency',
          title: 'Low Batch Completion Rate',
          description: `Batch completion rate of ${(batchCompletionRate * 100).toFixed(1)}% suggests planning or execution challenges.`,
          impact: 'high',
          priority: 8,
          confidence: 0.85,
          actionableSteps: [
            'Review batch sizing strategy',
            'Identify common batch blockers',
            'Improve dependency management',
          ],
          dataPoints: {
            batchCompletionRate,
            totalPlans: metrics.implementationPlans.totalPlans,
            avgBatchesPerPlan: metrics.implementationPlans.avgBatchesPerPlan,
          },
        });
      }

      if (estimationAccuracy < 0.7) {
        insights.push({
          type: 'estimation_accuracy',
          category: 'planning_quality',
          title: 'Poor Estimation Accuracy',
          description: `Estimation accuracy of ${(estimationAccuracy * 100).toFixed(1)}% indicates need for better planning processes.`,
          impact: 'medium',
          priority: 7,
          confidence: 0.8,
          actionableSteps: [
            'Implement historical data-based estimation',
            'Review estimation methodology',
            'Provide estimation training',
          ],
          dataPoints: {
            estimationAccuracy,
            planEfficiencyScore:
              metrics.implementationPlans.planEfficiencyScore,
          },
        });
      }
    }

    return insights;
  }

  /**
   * Generate individual task insights
   */
  private generateIndividualTaskInsights(
    reportType: ReportType,
    reportData: ReportData,
  ): EnhancedInsight[] {
    const insights: EnhancedInsight[] = [];
    const taskMetrics = reportData.metrics.taskSpecific;

    if (!taskMetrics) return insights;

    // Common individual task insights based on report type
    switch (reportType) {
      case 'task_progress_health':
        if (taskMetrics.healthScore < 0.7) {
          insights.push({
            type: 'task_health_concern',
            category: 'task_management',
            title: 'Task Health Below Optimal',
            description: `Task health score of ${(taskMetrics.healthScore * 100).toFixed(1)}% indicates potential issues requiring attention.`,
            impact: 'medium',
            priority: 7,
            confidence: 0.8,
            actionableSteps: [
              'Review current blockers and dependencies',
              'Assess resource allocation',
              'Consider scope adjustment',
            ],
            dataPoints: {
              healthScore: taskMetrics.healthScore,
              progressPercent: taskMetrics.progressPercent,
            },
          });
        }
        break;

      case 'implementation_execution':
        if (taskMetrics.estimationAccuracy < 0.8) {
          insights.push({
            type: 'estimation_variance',
            category: 'planning_accuracy',
            title: 'Estimation Accuracy Concern',
            description: `Estimation accuracy of ${(taskMetrics.estimationAccuracy * 100).toFixed(1)}% suggests planning improvements needed.`,
            impact: 'medium',
            priority: 6,
            confidence: 0.75,
            actionableSteps: [
              'Review original estimates vs actual progress',
              'Identify estimation blind spots',
              'Adjust remaining estimates',
            ],
            dataPoints: {
              estimationAccuracy: taskMetrics.estimationAccuracy,
            },
          });
        }
        break;
    }

    return insights;
  }

  /**
   * Generate cross-cutting insights that apply to multiple report types
   */
  private generateCrossCuttingInsights(
    reportData: ReportData,
  ): EnhancedInsight[] {
    const insights: EnhancedInsight[] = [];

    // Time-based patterns
    if (reportData.dateRange) {
      const daysDiff = Math.ceil(
        (reportData.dateRange.endDate.getTime() -
          reportData.dateRange.startDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      if (daysDiff > 30) {
        insights.push({
          type: 'temporal_pattern',
          category: 'data_quality',
          title: 'Extended Reporting Period',
          description: `Report covers ${daysDiff} days of data, providing comprehensive long-term insights.`,
          impact: 'low',
          priority: 3,
          confidence: 1.0,
          actionableSteps: [
            'Consider trend analysis over this period',
            'Look for seasonal patterns',
            'Compare with previous periods',
          ],
          dataPoints: {
            reportingPeriodDays: daysDiff,
            startDate: reportData.dateRange.startDate,
            endDate: reportData.dateRange.endDate,
          },
        });
      }
    }

    return insights;
  }

  /**
   * Generate generic insights when specific type is not recognized
   */
  private generateGenericInsights(reportData: ReportData): EnhancedInsight[] {
    return [
      {
        type: 'data_availability',
        category: 'general',
        title: 'Report Data Available',
        description:
          'Report has been generated with available data. Review detailed metrics for specific insights.',
        impact: 'low',
        priority: 1,
        confidence: 1.0,
        actionableSteps: [
          'Review detailed report sections',
          'Identify key metrics of interest',
          'Set up regular monitoring',
        ],
        dataPoints: {
          hasMetrics: !!reportData.metrics,
          hasCharts: reportData.charts?.length > 0,
          hasRecommendations: reportData.recommendations?.length > 0,
        },
      },
    ];
  }
}

/**
 * Enhanced Insight Interface
 */
export interface EnhancedInsight {
  type: string;
  category: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  priority: number; // 1-10, higher is more important
  confidence: number; // 0-1, confidence in the insight
  actionableSteps: string[];
  dataPoints: Record<string, any>;
}
