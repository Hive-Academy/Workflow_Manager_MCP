/**
 * Individual Task Template Data Service (Coordinator)
 *
 * Coordinates individual task report generation by delegating to focused services.
 * This service acts as a facade that routes requests to specialized services
 * following the Single Responsibility Principle.
 *
 * Focused Services:
 * - TaskProgressExecutionService: Task progress health & implementation execution
 * - CodeReviewResearchService: Code review quality & research documentation
 * - CommunicationCollaborationService: Communication & collaboration analytics
 */

import { Injectable, Logger } from '@nestjs/common';
import { TaskProgressHealthData } from '../../interfaces/templates/task-progress-health.interface';
import { ImplementationExecutionData } from '../../interfaces/templates/implementation-execution.interface';
import { CodeReviewQualityData } from '../../interfaces/templates/code-review-quality.interface';
import { ResearchDocumentationData } from '../../interfaces/templates/research-documentation.interface';
import { CommunicationCollaborationData } from '../../interfaces/templates/communication-collaboration.interface';
import { TaskProgressExecutionService } from './task-progress-execution.service';
import { CodeReviewResearchService } from './code-review-research.service';
import { CommunicationCollaborationService } from './communication-collaboration.service';

@Injectable()
export class IndividualTaskTemplateDataService {
  private readonly logger = new Logger(IndividualTaskTemplateDataService.name);

  constructor(
    private readonly taskProgressExecution: TaskProgressExecutionService,
    private readonly codeReviewResearch: CodeReviewResearchService,
    private readonly communicationCollaboration: CommunicationCollaborationService,
  ) {}

  /**
   * Get task progress health data for individual task analysis
   * Delegates to TaskProgressExecutionService
   */
  async getTaskProgressHealthData(
    taskId: string,
    filters?: Record<string, string>,
  ): Promise<TaskProgressHealthData> {
    this.logger.debug(
      `Coordinating task progress health data for task: ${taskId}`,
    );
    return this.taskProgressExecution.getTaskProgressHealthData(
      taskId,
      filters,
    );
  }

  /**
   * Get implementation execution data for task implementation analysis
   * Delegates to TaskProgressExecutionService
   */
  async getImplementationExecutionData(
    taskId: string,
    filters?: Record<string, string>,
  ): Promise<ImplementationExecutionData> {
    this.logger.debug(
      `Coordinating implementation execution data for task: ${taskId}`,
    );
    return this.taskProgressExecution.getImplementationExecutionData(
      taskId,
      filters,
    );
  }

  /**
   * Get code review quality data for individual task analysis
   * Delegates to CodeReviewResearchService
   */
  async getCodeReviewQualityData(
    taskId: string,
    filters?: Record<string, string>,
  ): Promise<CodeReviewQualityData> {
    this.logger.debug(
      `Coordinating code review quality data for task: ${taskId}`,
    );
    return this.codeReviewResearch.getCodeReviewQualityData(taskId, filters);
  }

  /**
   * Get research documentation data for individual task analysis
   * Delegates to CodeReviewResearchService
   */
  async getResearchDocumentationData(
    taskId: string,
    filters?: Record<string, string>,
  ): Promise<ResearchDocumentationData> {
    this.logger.debug(
      `Coordinating research documentation data for task: ${taskId}`,
    );
    return this.codeReviewResearch.getResearchDocumentationData(
      taskId,
      filters,
    );
  }

  /**
   * Get communication and collaboration data for individual task analysis
   * Delegates to CommunicationCollaborationService
   */
  async getCommunicationCollaborationData(
    taskId: string,
    filters?: Record<string, string>,
  ): Promise<CommunicationCollaborationData> {
    this.logger.debug(
      `Coordinating communication collaboration data for task: ${taskId}`,
    );
    return this.communicationCollaboration.getCommunicationCollaborationData(
      taskId,
      filters,
    );
  }
}
