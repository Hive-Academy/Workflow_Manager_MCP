/**
 * Template Data Service
 *
 * Dedicated service for template-specific data operations.
 * Implements template data service interfaces to provide type-safe data
 * that matches exact Handlebars template variable expectations.
 *
 * This service keeps the main ReportDataAccessService clean and focused
 * on core data access operations while handling template-specific logic.
 */

import { Injectable, Logger } from '@nestjs/common';
import {
  TaskSummaryTemplateData,
  TaskSummaryDataService,
  TaskSummaryItem,
  TaskSummaryInsight,
} from '../../interfaces/templates/task-summary-template.interface';
import {
  DelegationAnalyticsTemplateData,
  DelegationAnalyticsDataService,
  DelegationBottleneck,
} from '../../interfaces/templates/delegation-analytics-template.interface';
import {
  PerformanceDashboardTemplateData,
  PerformanceDashboardDataService,
  PerformanceMetrics as TemplatePerformanceMetrics,
  RolePerformanceData,
  PerformanceBenchmarks,
  PerformanceBottleneck,
  SystemHealthData,
  VelocityData,
  GoalProgressData,
} from '../../interfaces/templates/performance-dashboard-template.interface';
import { ReportDataAccessService } from './report-data-access.service';
import { ReportFilters } from '../../interfaces/report-data.interface';

@Injectable()
export class TemplateDataService
  implements
    TaskSummaryDataService,
    DelegationAnalyticsDataService,
    PerformanceDashboardDataService
{
  private readonly logger = new Logger(TemplateDataService.name);

  constructor(private readonly reportDataAccess: ReportDataAccessService) {}

  /**
   * Get task summary data matching task-summary.hbs template expectations
   * Implements TaskSummaryDataService interface for type safety
   */
  async getTaskSummaryData(
    startDate: Date,
    endDate: Date,
    filters?: Record<string, string>,
  ): Promise<TaskSummaryTemplateData> {
    this.logger.debug('Generating type-safe task summary data');

    const whereClause = this.reportDataAccess.buildWhereClause(
      startDate,
      endDate,
      filters as ReportFilters,
    );
    const baseMetrics = await this.reportDataAccess.getBaseMetrics(whereClause);

    // Get additional data for template
    const [tasks, insights] = await Promise.all([
      this.getTaskSummaryItems(whereClause),
      this.generateTaskSummaryInsights(baseMetrics),
    ]);

    const templateData: TaskSummaryTemplateData = {
      generatedAt: new Date(),
      dateRange: {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
      },
      filters,
      metrics: {
        totalTasks: baseMetrics.tasks.totalTasks,
        totalTasksChange: await this.calculateTasksChange(startDate, endDate),
        completedTasks: baseMetrics.tasks.completedTasks,
        completionRate: Math.round(baseMetrics.tasks.completionRate),
        inProgressTasks: baseMetrics.tasks.inProgressTasks,
        avgTimeInProgress: this.formatDuration(
          baseMetrics.tasks.avgCompletionTimeHours,
        ),
        highPriorityTasks: this.getHighPriorityCount(
          baseMetrics.tasks.priorityDistribution,
        ),
        overdueHighPriority:
          await this.getOverdueHighPriorityCount(whereClause),
      },
      tasks,
      chartData: {
        statusLabels: ['Completed', 'In Progress', 'Not Started'],
        statusData: [
          baseMetrics.tasks.completedTasks,
          baseMetrics.tasks.inProgressTasks,
          baseMetrics.tasks.notStartedTasks || 0,
        ],
        priorityLabels: baseMetrics.tasks.priorityDistribution.map(
          (p) => p.priority || 'Unknown',
        ),
        priorityData: baseMetrics.tasks.priorityDistribution.map(
          (p) => p.count,
        ),
      },
      insights,
    };

    return templateData;
  }

  /**
   * Get delegation analytics data matching delegation-analytics.hbs template expectations
   * Implements DelegationAnalyticsDataService interface for type safety
   */
  async getDelegationAnalyticsData(
    startDate: Date,
    endDate: Date,
    _filters?: Record<string, string>,
  ): Promise<DelegationAnalyticsTemplateData> {
    this.logger.debug('Generating type-safe delegation analytics data');

    const whereClause = this.reportDataAccess.buildWhereClause(
      startDate,
      endDate,
      _filters as ReportFilters,
    );
    const baseMetrics = await this.reportDataAccess.getBaseMetrics(whereClause);

    // Get delegation-specific data
    const [roleEfficiency, bottlenecks, transitionMatrix, weeklyTrends] =
      await Promise.all([
        this.calculateRoleEfficiency(startDate, endDate),
        this.analyzeWorkflowBottlenecks(startDate, endDate),
        this.generateTransitionMatrix(startDate, endDate),
        this.getWeeklyDelegationTrends(startDate, endDate),
      ]);

    const templateData: DelegationAnalyticsTemplateData = {
      generatedAt: new Date(),
      dateRange: {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
      },
      reportType: 'delegation_analytics',
      metrics: {
        delegations: {
          roleStats: {
            boomerang: this.extractRoleCount(
              baseMetrics.delegations,
              'boomerang',
            ),
            researcher: this.extractRoleCount(
              baseMetrics.delegations,
              'researcher',
            ),
            architect: this.extractRoleCount(
              baseMetrics.delegations,
              'architect',
            ),
            'senior-developer': this.extractRoleCount(
              baseMetrics.delegations,
              'senior-developer',
            ),
            'code-review': this.extractRoleCount(
              baseMetrics.delegations,
              'code-review',
            ),
          },
          roleEfficiency,
          successRate: this.extractDelegationMetric(
            baseMetrics.delegations,
            'successRate',
            0,
          ),
          avgHandoffTime: this.extractDelegationMetric(
            baseMetrics.delegations,
            'avgHandoffTime',
            0,
          ),
          avgRedelegationCount:
            baseMetrics.delegations.avgRedelegationCount || 0,
          totalDelegations: this.extractDelegationMetric(
            baseMetrics.delegations,
            'totalDelegations',
            0,
          ),
          avgCompletionTime: this.extractDelegationMetric(
            baseMetrics.delegations,
            'avgCompletionTime',
            0,
          ),
          mostEfficientRole: this.findMostEfficientRole(roleEfficiency),
          bottlenecks,
          transitionMatrix,
          weeklyTrends,
        },
      },
    };

    return templateData;
  }

  /**
   * Get performance dashboard data matching performance-dashboard.hbs template expectations
   * Implements PerformanceDashboardDataService interface for type safety
   */
  async getPerformanceDashboardData(
    startDate: Date,
    endDate: Date,
    _filters?: Record<string, string>,
  ): Promise<PerformanceDashboardTemplateData> {
    this.logger.debug('Generating type-safe performance dashboard data');

    const [
      metrics,
      rolePerformance,
      benchmarks,
      bottlenecks,
      systemHealth,
      velocity,
      goalProgress,
      chartData,
      insights,
    ] = await Promise.all([
      this.calculateRealTimeMetrics(),
      this.getRolePerformanceData(startDate, endDate),
      this.calculateBenchmarks(startDate, endDate),
      this.analyzePerformanceBottlenecks(startDate, endDate),
      this.getSystemHealth(),
      this.getVelocityData(startDate, endDate),
      this.getGoalProgressData(startDate, endDate),
      this.getPerformanceChartData(startDate, endDate),
      this.generatePerformanceInsights(startDate, endDate),
    ]);

    return {
      data: {
        metrics,
        rolePerformance,
        benchmarks,
        bottlenecks,
        systemHealth,
        velocity,
        goalProgress,
        ...chartData,
        insights: insights.insights,
        recommendations: insights.recommendations,
      },
    };
  }

  // ===== TEMPLATE-SPECIFIC HELPER METHODS =====

  private getTaskSummaryItems(_whereClause: any): Promise<TaskSummaryItem[]> {
    // TODO: Implement actual database query for task items
    // This is a placeholder showing the expected structure
    return Promise.resolve([
      {
        taskId: 'TSK-001',
        name: 'Sample Task',
        status: 'in-progress',
        priority: 'High',
        owner: 'developer',
        creationDate: new Date(),
      },
    ]);
  }

  private generateTaskSummaryInsights(
    baseMetrics: any,
  ): Promise<TaskSummaryInsight[]> {
    const insights: TaskSummaryInsight[] = [];

    // Generate insights based on metrics
    if (baseMetrics.tasks.completionRate > 80) {
      insights.push({
        title: 'High Completion Rate',
        description: `Excellent completion rate of ${baseMetrics.tasks.completionRate}%`,
        recommendation: 'Maintain current workflow practices',
      });
    }

    if (
      baseMetrics.tasks.inProgressTasks >
      baseMetrics.tasks.totalTasks * 0.5
    ) {
      insights.push({
        title: 'High Work in Progress',
        description: 'Many tasks are currently in progress',
        recommendation:
          'Consider focusing on completing existing tasks before starting new ones',
      });
    }

    return Promise.resolve(insights);
  }

  private async calculateTasksChange(
    startDate: Date,
    endDate: Date,
  ): Promise<number | undefined> {
    // Calculate change vs previous period
    const periodLength = endDate.getTime() - startDate.getTime();
    const previousStart = new Date(startDate.getTime() - periodLength);
    const previousEnd = startDate;

    const currentPeriodClause = this.reportDataAccess.buildWhereClause(
      startDate,
      endDate,
    );
    const previousPeriodClause = this.reportDataAccess.buildWhereClause(
      previousStart,
      previousEnd,
    );

    const [currentMetrics, previousMetrics] = await Promise.all([
      this.reportDataAccess.getBaseMetrics(currentPeriodClause),
      this.reportDataAccess.getBaseMetrics(previousPeriodClause),
    ]);

    if (previousMetrics.tasks.totalTasks === 0) return undefined;

    return Math.round(
      ((currentMetrics.tasks.totalTasks - previousMetrics.tasks.totalTasks) /
        previousMetrics.tasks.totalTasks) *
        100,
    );
  }

  private getOverdueHighPriorityCount(
    _whereClause: any,
  ): Promise<number | undefined> {
    // TODO: Implement actual query for overdue high priority tasks
    return Promise.resolve(0); // Placeholder
  }

  private calculateRoleEfficiency(
    _startDate: Date,
    _endDate: Date,
  ): Promise<any> {
    // TODO: Implement actual role efficiency calculation
    return Promise.resolve({
      boomerang: 0.85,
      researcher: 0.78,
      architect: 0.92,
      'senior-developer': 0.88,
      'code-review': 0.82,
    });
  }

  private analyzeWorkflowBottlenecks(
    _startDate: Date,
    _endDate: Date,
  ): Promise<DelegationBottleneck[]> {
    // TODO: Implement actual bottleneck analysis
    return Promise.resolve([
      {
        role: 'code-review',
        issue: 'High review queue causing delays',
        impact: 'high',
      },
    ]);
  }

  private generateTransitionMatrix(
    _startDate: Date,
    _endDate: Date,
  ): Promise<any> {
    // TODO: Implement actual transition matrix generation
    return Promise.resolve({
      boomerang: { researcher: 5, architect: 3 },
      researcher: { architect: 8 },
      architect: { 'senior-developer': 12 },
      'senior-developer': { 'code-review': 10 },
      'code-review': { boomerang: 9 },
    });
  }

  private getWeeklyDelegationTrends(
    _startDate: Date,
    _endDate: Date,
  ): Promise<{ successful: number[]; failed: number[] }> {
    // TODO: Implement actual weekly trends calculation
    return Promise.resolve({
      successful: [12, 15, 18, 22],
      failed: [3, 2, 4, 1],
    });
  }

  private findMostEfficientRole(roleEfficiency: any): string {
    return Object.entries(roleEfficiency).reduce((a, b) =>
      roleEfficiency[a[0]] > roleEfficiency[b[0]] ? a : b,
    )[0];
  }

  private calculateRealTimeMetrics(): Promise<TemplatePerformanceMetrics> {
    // TODO: Implement actual real-time metrics calculation
    return Promise.resolve({
      averageCompletionTime: '2.5h',
      completionTimeTrend: -8,
      throughputRate: 12,
      throughputTrend: 15,
      redelegationRate: 8,
      redelegationTrend: -5,
      qualityScore: 92,
      qualityTrend: 3,
    });
  }

  private analyzePerformanceBottlenecks(
    _startDate: Date,
    _endDate: Date,
  ): Promise<PerformanceBottleneck[]> {
    // TODO: Implement actual performance bottleneck analysis
    return Promise.resolve([
      {
        area: 'Code Review Process',
        severity: 'high',
        impact: 'High',
        description: 'Code review queue causing significant delays',
        averageDelay: '4.2h',
        frequency: '3/week',
        estimatedCost: '$2,400',
        recommendations: [
          'Add additional code reviewers',
          'Implement automated pre-review checks',
          'Set review time SLAs',
        ],
      },
    ]);
  }

  private getRolePerformanceData(
    _startDate: Date,
    _endDate: Date,
  ): Promise<RolePerformanceData[]> {
    // TODO: Implement actual role performance data retrieval
    return Promise.resolve([
      { name: 'Boomerang', efficiency: 85, quality: 92, speed: 78 },
      { name: 'Researcher', efficiency: 78, quality: 88, speed: 82 },
      { name: 'Architect', efficiency: 92, quality: 95, speed: 75 },
      { name: 'Senior Developer', efficiency: 88, quality: 90, speed: 85 },
      { name: 'Code Review', efficiency: 82, quality: 96, speed: 70 },
    ]);
  }

  private calculateBenchmarks(
    _startDate: Date,
    _endDate: Date,
  ): Promise<PerformanceBenchmarks> {
    // TODO: Implement actual benchmark calculation
    return Promise.resolve({
      industryStandard: '3.2h',
      vsIndustry: 22,
      teamAverage: '2.8h',
      vsTeam: 11,
      previousPeriod: '2.9h',
      vsPrevious: 14,
      targetGoal: '2.0h',
      vsTarget: -20,
    });
  }

  private getSystemHealth(): Promise<SystemHealthData> {
    // TODO: Implement actual system health monitoring
    return Promise.resolve({
      status: 'healthy',
      message: 'All systems operational',
      cpuUsage: 45,
      memoryUsage: 62,
      responseTime: 120,
    });
  }

  private getVelocityData(
    _startDate: Date,
    _endDate: Date,
  ): Promise<VelocityData> {
    // TODO: Implement actual velocity calculation
    return Promise.resolve({
      current: 12,
      completed: 85,
      remaining: 15,
    });
  }

  private getGoalProgressData(
    _startDate: Date,
    _endDate: Date,
  ): Promise<GoalProgressData> {
    // TODO: Implement actual goal progress calculation
    return Promise.resolve({
      percentage: 78,
      completed: 78,
      remaining: 22,
    });
  }

  private getPerformanceChartData(
    _startDate: Date,
    _endDate: Date,
  ): Promise<{
    trendLabels: string[];
    completionTimeData: number[];
    throughputData: number[];
    qualityData: number[];
  }> {
    // TODO: Implement actual chart data generation
    return Promise.resolve({
      trendLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      completionTimeData: [2.8, 2.6, 2.4, 2.5],
      throughputData: [10, 11, 13, 12],
      qualityData: [88, 90, 91, 92],
    });
  }

  private generatePerformanceInsights(
    _startDate: Date,
    _endDate: Date,
  ): Promise<{
    insights: string[];
    recommendations: string[];
  }> {
    // TODO: Implement actual insights generation
    return Promise.resolve({
      insights: [
        'Completion time has improved by 8% this month',
        'Code review bottleneck identified in workflow',
        'Quality scores consistently above 90%',
      ],
      recommendations: [
        'Implement automated testing to reduce review time',
        'Add dedicated code reviewer role',
        'Set up performance monitoring alerts',
      ],
    });
  }

  // ===== UTILITY METHODS =====

  private formatDuration(hours: number): string {
    if (!hours || hours === 0) return 'N/A';
    if (hours < 1) return `${Math.round(hours * 60)}m`;
    if (hours < 24) return `${hours.toFixed(1)}h`;
    return `${Math.round(hours / 24)}d`;
  }

  private getHighPriorityCount(
    priorityDistribution: Array<{ priority: string | null; count: number }>,
  ): number {
    return priorityDistribution
      .filter((p) => p.priority === 'High' || p.priority === 'Critical')
      .reduce((sum, p) => sum + p.count, 0);
  }

  /**
   * Extract role count from delegation metrics safely
   * Handles the case where roleStats might not exist in DelegationMetrics
   */
  private extractRoleCount(delegationMetrics: any, role: string): number {
    return delegationMetrics?.roleStats?.[role] || 0;
  }

  /**
   * Extract delegation metric safely with fallback
   */
  private extractDelegationMetric(
    delegationMetrics: any,
    metric: string,
    fallback: number,
  ): number {
    return delegationMetrics?.[metric] || fallback;
  }
}
