import { Injectable, Logger } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  ReviewOperationsSchema,
  ReviewOperationsInput,
} from './schemas/review-operations.schema';

/**
 * Review Operations Service
 *
 * Focused service for code review and completion report management.
 * Clear operations for quality assurance workflow.
 */
@Injectable()
export class ReviewOperationsService {
  private readonly logger = new Logger(ReviewOperationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Tool({
    name: 'review_operations',
    description: `
Code review and completion report management.

**Operations:**
- create_review: Create code review with quality assessment
- update_review: Update existing code review status and findings
- get_review: Retrieve code review details
- create_completion: Create task completion report
- get_completion: Retrieve completion report

**Key Features:**
- Quality rating scale (1-10)
- Security and performance assessment
- Issue tracking and recommendations
- Completion report with evidence

**Examples:**
- Create review: { operation: "create_review", taskId: "TSK-001", reviewData: { status: "APPROVED", summary: "Good quality" } }
- Get review: { operation: "get_review", taskId: "TSK-001", includeDetails: true }
- Create completion: { operation: "create_completion", taskId: "TSK-001", completionData: { summary: "Task complete" } }
`,
    parameters: ReviewOperationsSchema,
  })
  async executeReviewOperation(input: ReviewOperationsInput): Promise<any> {
    const startTime = performance.now();

    try {
      this.logger.debug(`Review Operation: ${input.operation}`, {
        taskId: input.taskId,
      });

      let result: any;

      switch (input.operation) {
        case 'create_review':
          result = await this.createReview(input);
          break;
        case 'update_review':
          result = await this.updateReview(input);
          break;
        case 'get_review':
          result = await this.getReview(input);
          break;
        case 'create_completion':
          result = await this.createCompletion(input);
          break;
        case 'get_completion':
          result = await this.getCompletion(input);
          break;
        default:
          throw new Error(`Unknown operation: ${input.operation}`);
      }

      const responseTime = performance.now() - startTime;

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: true,
                data: result,
                metadata: {
                  operation: input.operation,
                  taskId: input.taskId,
                  responseTime: Math.round(responseTime),
                },
              },
              null,
              2,
            ),
          },
        ],
      };
    } catch (error: any) {
      this.logger.error(`Review operation failed:`, error);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: false,
                error: {
                  message: error.message,
                  code: 'REVIEW_OPERATION_FAILED',
                  operation: input.operation,
                },
              },
              null,
              2,
            ),
          },
        ],
      };
    }
  }

  private async createReview(input: ReviewOperationsInput): Promise<any> {
    const { taskId, reviewData } = input;

    if (!reviewData) {
      throw new Error('Review data is required for creation');
    }

    const review = await this.prisma.codeReviewReport.create({
      data: {
        taskId,
        status: reviewData.status,
        summary: reviewData.summary,
        qualityRating: reviewData.qualityRating || 5,
        securityValidation: reviewData.securityValidation || 'Not assessed',
        performanceAssessment:
          reviewData.performanceAssessment || 'Not assessed',
        codeQualityIssues: reviewData.codeQualityIssues || [],
        recommendations: reviewData.recommendations || [],
        reviewedBy: reviewData.reviewedBy,
        reviewDate: new Date(),
      },
    });

    return review;
  }

  private async updateReview(input: ReviewOperationsInput): Promise<any> {
    const { taskId, reviewData } = input;

    if (!reviewData) {
      throw new Error('Review data is required for update');
    }

    const review = await this.prisma.codeReviewReport.update({
      where: { taskId },
      data: {
        ...(reviewData.status && { status: reviewData.status }),
        ...(reviewData.summary && { summary: reviewData.summary }),
        ...(reviewData.qualityRating && {
          qualityRating: reviewData.qualityRating,
        }),
        ...(reviewData.securityValidation && {
          securityValidation: reviewData.securityValidation,
        }),
        ...(reviewData.performanceAssessment && {
          performanceAssessment: reviewData.performanceAssessment,
        }),
        ...(reviewData.codeQualityIssues && {
          codeQualityIssues: reviewData.codeQualityIssues,
        }),
        ...(reviewData.recommendations && {
          recommendations: reviewData.recommendations,
        }),
        ...(reviewData.reviewedBy && { reviewedBy: reviewData.reviewedBy }),
      },
    });

    return review;
  }

  private async getReview(input: ReviewOperationsInput): Promise<any> {
    const { taskId, includeDetails } = input;

    const review = await this.prisma.codeReviewReport.findUnique({
      where: { taskId },
    });

    if (!review) {
      throw new Error(`Code review not found for task ${taskId}`);
    }

    if (!includeDetails) {
      // Return summary only
      return {
        taskId: review.taskId,
        status: review.status,
        qualityRating: review.qualityRating,
        reviewedBy: review.reviewedBy,
        reviewDate: review.reviewDate,
      };
    }

    return review;
  }

  private async createCompletion(input: ReviewOperationsInput): Promise<any> {
    const { taskId, completionData } = input;

    if (!completionData) {
      throw new Error('Completion data is required for creation');
    }

    const completion = await this.prisma.completionReport.create({
      data: {
        taskId,
        summary: completionData.summary,
        filesModified: completionData.filesModified || [],
        acceptanceCriteriaVerification:
          completionData.acceptanceCriteriaVerification || {},
        delegationSummary: completionData.delegationSummary || '',
        qualityValidation: completionData.qualityValidation || '',
        completionDate: new Date(),
      },
    });

    return completion;
  }

  private async getCompletion(input: ReviewOperationsInput): Promise<any> {
    const { taskId, includeDetails } = input;

    const completion = await this.prisma.completionReport.findUnique({
      where: { taskId },
    });

    if (!completion) {
      throw new Error(`Completion report not found for task ${taskId}`);
    }

    if (!includeDetails) {
      // Return summary only
      return {
        taskId: completion.taskId,
        summary: completion.summary,
        completionDate: completion.completionDate,
      };
    }

    return completion;
  }
}
