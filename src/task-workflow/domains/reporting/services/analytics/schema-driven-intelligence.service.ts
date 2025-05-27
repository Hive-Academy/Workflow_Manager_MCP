import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReportType } from '../../interfaces/service-contracts.interface';
import { ReportData } from '../../interfaces/report-data.interface';
import { SmartResponseSummarizationService } from './smart-response-summarization.service';

/**
 * Schema-Driven Intelligence Service
 *
 * Analyzes database schema relationships to generate intelligent insights
 * for existing report types. Follows SOLID principles:
 * - SRP: Single responsibility - schema-aware insight generation
 * - OCP: Open for extension via new insight strategies
 * - LSP: Insight generators are substitutable
 * - ISP: Clients depend only on methods they use
 * - DIP: Depends on abstractions for database access
 */
@Injectable()
export class SchemaDrivenIntelligenceService {
  private readonly logger = new Logger(SchemaDrivenIntelligenceService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly smartResponseService: SmartResponseSummarizationService,
  ) {}

  /**
   * Generate schema-driven insights for any report type
   */
  async generateSchemaInsights(
    reportType: ReportType,
    reportData: ReportData,
    filePath: string,
  ): Promise<{
    enhancedReportData: ReportData;
    smartResponse: {
      summary: string;
      keyInsights: string[];
      actionableRecommendations: string[];
      tokenCount: number;
    };
  }> {
    this.logger.log(`Generating schema-driven insights for ${reportType}`);

    // Generate schema-aware insights based on database relationships
    const schemaInsights = await this.generateInsightsFromSchema(
      reportType,
      reportData,
    );

    // Enhance the report data with schema insights
    const enhancedReportData: ReportData = {
      ...reportData,
      recommendations: [
        ...(reportData.recommendations || []),
        ...schemaInsights.recommendations,
      ],
      enhancedInsights: schemaInsights.insights.map((insight, index) => ({
        type: 'schema-analysis',
        category: reportType,
        title: `Schema Insight ${index + 1}`,
        description: insight,
        impact: 'medium' as const,
        priority: 5,
        confidence: 0.8,
        actionableSteps: [],
        dataPoints: {},
      })),
    };

    // Get optimized MCP response
    const smartResponse =
      await this.smartResponseService.createOptimizedSummary(
        reportType,
        enhancedReportData,
        filePath,
      );

    return {
      enhancedReportData,
      smartResponse,
    };
  }

  /**
   * Generate insights based on database schema relationships
   */
  private async generateInsightsFromSchema(
    reportType: ReportType,
    reportData: ReportData,
  ): Promise<{
    insights: string[];
    recommendations: string[];
  }> {
    switch (reportType) {
      case 'task_summary':
        return this.generateTaskSummaryInsights(reportData);
      case 'delegation_analytics':
        return this.generateDelegationInsights(reportData);
      case 'performance_dashboard':
        return this.generatePerformanceInsights(reportData);
      case 'code_review_insights':
        return this.generateCodeReviewInsights(reportData);
      case 'implementation_plan_analytics':
        return this.generateImplementationInsights(reportData);
      default:
        return this.generateGenericInsights(reportData);
    }
  }

  /**
   * Task Summary Schema Insights
   */
  private async generateTaskSummaryInsights(
    _reportData: ReportData,
  ): Promise<{ insights: string[]; recommendations: string[] }> {
    const insights: string[] = [];
    const recommendations: string[] = [];

    // Analyze task completion patterns using schema relationships
    const taskStats = await this.prisma.task.aggregate({
      _count: { taskId: true },
      _avg: { redelegationCount: true },
    });

    const completedTasks = await this.prisma.task.count({
      where: { status: 'completed' },
    });

    const completionRate = taskStats._count.taskId
      ? completedTasks / taskStats._count.taskId
      : 0;

    insights.push(
      `Schema analysis reveals ${taskStats._count.taskId} total tasks with ${completionRate.toFixed(2)}% completion rate`,
    );

    if (
      taskStats._avg.redelegationCount &&
      taskStats._avg.redelegationCount > 2
    ) {
      insights.push(
        `High average redelegation count (${taskStats._avg.redelegationCount.toFixed(1)}) indicates potential workflow inefficiencies`,
      );
      recommendations.push(
        'Review task delegation patterns to reduce redelegation overhead',
      );
    }

    if (completionRate < 0.8) {
      recommendations.push(
        'Focus on improving task completion rate through better planning',
      );
    }

    return { insights, recommendations };
  }

  /**
   * Delegation Analytics Schema Insights
   */
  private async generateDelegationInsights(
    _reportData: ReportData,
  ): Promise<{ insights: string[]; recommendations: string[] }> {
    const insights: string[] = [];
    const recommendations: string[] = [];

    // Analyze delegation patterns using schema relationships
    const delegationStats = await this.prisma.delegationRecord.groupBy({
      by: ['fromMode', 'toMode'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    });

    const mostCommonDelegation = delegationStats[0];
    if (mostCommonDelegation) {
      insights.push(
        `Most common delegation pattern: ${mostCommonDelegation.fromMode} → ${mostCommonDelegation.toMode} (${mostCommonDelegation._count.id} times)`,
      );
    }

    // Check for delegation bottlenecks
    const rejectedDelegations = await this.prisma.delegationRecord.count({
      where: { success: false },
    });

    const totalDelegations = await this.prisma.delegationRecord.count();

    if (rejectedDelegations > 0 && totalDelegations > 0) {
      const rejectionRate = rejectedDelegations / totalDelegations;
      if (rejectionRate > 0.1) {
        insights.push(
          `High delegation rejection rate (${(rejectionRate * 100).toFixed(1)}%) indicates workflow issues`,
        );
        recommendations.push(
          'Investigate common rejection reasons and improve delegation clarity',
        );
      }
    }

    return { insights, recommendations };
  }

  /**
   * Performance Dashboard Schema Insights
   */
  private async generatePerformanceInsights(
    _reportData: ReportData,
  ): Promise<{ insights: string[]; recommendations: string[] }> {
    const insights: string[] = [];
    const recommendations: string[] = [];

    // Analyze performance using schema relationships
    const recentTasks = await this.prisma.task.findMany({
      where: {
        creationDate: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
      include: {
        implementationPlans: {
          include: {
            subtasks: true,
          },
        },
        workflowTransitions: true,
      },
    });

    const avgSubtasksPerTask =
      recentTasks.reduce(
        (sum, task) =>
          sum +
          task.implementationPlans.reduce(
            (planSum, plan) => planSum + plan.subtasks.length,
            0,
          ),
        0,
      ) / (recentTasks.length || 1);

    insights.push(
      `Recent tasks average ${avgSubtasksPerTask.toFixed(1)} subtasks per task`,
    );

    if (avgSubtasksPerTask > 15) {
      recommendations.push(
        'Consider breaking down complex tasks into smaller, more manageable units',
      );
    }

    // Analyze workflow transition efficiency
    const avgTransitionsPerTask =
      recentTasks.reduce(
        (sum, task) => sum + task.workflowTransitions.length,
        0,
      ) / (recentTasks.length || 1);

    if (avgTransitionsPerTask > 5) {
      insights.push(
        `High average workflow transitions (${avgTransitionsPerTask.toFixed(1)}) may indicate process inefficiencies`,
      );
      recommendations.push(
        'Review workflow patterns to minimize unnecessary role transitions',
      );
    }

    return { insights, recommendations };
  }

  /**
   * Code Review Schema Insights
   */
  private async generateCodeReviewInsights(
    _reportData: ReportData,
  ): Promise<{ insights: string[]; recommendations: string[] }> {
    const insights: string[] = [];
    const recommendations: string[] = [];

    // Analyze code review patterns
    const reviewStats = await this.prisma.codeReview.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    const totalReviews = reviewStats.reduce(
      (sum, stat) => sum + stat._count.id,
      0,
    );

    if (totalReviews > 0) {
      const approvedReviews =
        reviewStats.find((stat) => stat.status === 'APPROVED')?._count.id || 0;
      const approvalRate = approvedReviews / totalReviews;

      insights.push(
        `Code review approval rate: ${(approvalRate * 100).toFixed(1)}%`,
      );

      if (approvalRate < 0.7) {
        recommendations.push(
          'Implement pre-review quality checks to improve first-time approval rates',
        );
      }
    }

    return { insights, recommendations };
  }

  /**
   * Implementation Plan Schema Insights
   */
  private async generateImplementationInsights(
    _reportData: ReportData,
  ): Promise<{ insights: string[]; recommendations: string[] }> {
    const insights: string[] = [];
    const recommendations: string[] = [];

    // Analyze implementation plan effectiveness
    const planStats = await this.prisma.implementationPlan.findMany({
      include: {
        subtasks: true,
        task: true,
      },
    });

    const completedPlans = planStats.filter((plan) =>
      plan.subtasks.every((subtask) => subtask.status === 'completed'),
    );

    const planCompletionRate = planStats.length
      ? completedPlans.length / planStats.length
      : 0;

    insights.push(
      `Implementation plan completion rate: ${(planCompletionRate * 100).toFixed(1)}%`,
    );

    if (planCompletionRate < 0.8) {
      recommendations.push(
        'Review implementation planning process to improve execution success',
      );
    }

    // Analyze subtask distribution
    const avgSubtasksPerPlan =
      planStats.reduce((sum, plan) => sum + plan.subtasks.length, 0) /
      (planStats.length || 1);

    if (avgSubtasksPerPlan > 20) {
      recommendations.push(
        'Consider using batch organization to better manage large implementation plans',
      );
    }

    return { insights, recommendations };
  }

  /**
   * Generic Schema Insights for other report types
   */
  private async generateGenericInsights(
    _reportData: ReportData,
  ): Promise<{ insights: string[]; recommendations: string[] }> {
    const insights: string[] = [];
    const recommendations: string[] = [];

    // Basic schema health check
    const totalTasks = await this.prisma.task.count();
    const activeTasks = await this.prisma.task.count({
      where: { status: { in: ['in-progress', 'needs-review'] } },
    });

    insights.push(
      `System contains ${totalTasks} total tasks, ${activeTasks} active`,
    );

    if (activeTasks > totalTasks * 0.5) {
      recommendations.push(
        'High number of active tasks - consider prioritization and resource allocation',
      );
    }

    return { insights, recommendations };
  }
}
