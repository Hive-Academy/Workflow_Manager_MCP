import { Injectable, Logger } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { PrismaService } from '../../../prisma/prisma.service';
import { ResearchOperationsSchema, ResearchOperationsInput } from './schemas/research-operations.schema';

/**
 * Research Operations Service
 * 
 * Focused service for research reports and comment management.
 * Clear operations for knowledge gathering and communication.
 */
@Injectable()
export class ResearchOperationsService {
  private readonly logger = new Logger(ResearchOperationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Tool({
    name: 'research_operations',
    description: `
Research reports and communication management.

**Operations:**
- create_research: Create research report with findings and recommendations
- update_research: Update existing research report
- get_research: Retrieve research report with optional comments
- add_comment: Add contextual comment to task
- get_comments: Retrieve comments filtered by type

**Key Features:**
- Technology options and implementation approaches tracking
- Risk assessment and resource requirements
- Contextual comments (general, technical, business, clarification)
- Researcher attribution and findings organization

**Examples:**
- Create research: { operation: "create_research", taskId: "TSK-001", researchData: { findings: "JWT is best option", researchedBy: "researcher" } }
- Add comment: { operation: "add_comment", taskId: "TSK-001", commentData: { content: "Consider security implications", contextType: "technical" } }
- Get research: { operation: "get_research", taskId: "TSK-001", includeComments: true }
`,
    parameters: ResearchOperationsSchema,
  })
  async executeResearchOperation(input: ResearchOperationsInput): Promise<any> {
    const startTime = performance.now();

    try {
      this.logger.debug(`Research Operation: ${input.operation}`, {
        taskId: input.taskId,
      });

      let result: any;

      switch (input.operation) {
        case 'create_research':
          result = await this.createResearch(input);
          break;
        case 'update_research':
          result = await this.updateResearch(input);
          break;
        case 'get_research':
          result = await this.getResearch(input);
          break;
        case 'add_comment':
          result = await this.addComment(input);
          break;
        case 'get_comments':
          result = await this.getComments(input);
          break;
        default:
          throw new Error(`Unknown operation: ${input.operation}`);
      }

      const responseTime = performance.now() - startTime;

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: result,
              metadata: {
                operation: input.operation,
                taskId: input.taskId,
                responseTime: Math.round(responseTime),
              },
            }, null, 2),
          },
        ],
      };
    } catch (error: any) {
      this.logger.error(`Research operation failed:`, error);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: false,
              error: {
                message: error.message,
                code: 'RESEARCH_OPERATION_FAILED',
                operation: input.operation,
              },
            }, null, 2),
          },
        ],
      };
    }
  }

  private async createResearch(input: ResearchOperationsInput): Promise<any> {
    const { taskId, researchData } = input;

    if (!researchData) {
      throw new Error('Research data is required for creation');
    }

    const research = await this.prisma.researchReport.create({
      data: {
        taskId,
        findings: researchData.findings,
        recommendations: researchData.recommendations || '',
        investigationSummary: researchData.investigationSummary || '',
        technologyOptions: researchData.technologyOptions || [],
        implementationApproaches: researchData.implementationApproaches || [],
        riskAssessment: researchData.riskAssessment || '',
        resourceRequirements: researchData.resourceRequirements || '',
        researchedBy: researchData.researchedBy,
        researchDate: new Date(),
      },
      include: {
        comments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return research;
  }

  private async updateResearch(input: ResearchOperationsInput): Promise<any> {
    const { taskId, researchData } = input;

    if (!researchData) {
      throw new Error('Research data is required for update');
    }

    const research = await this.prisma.researchReport.update({
      where: { taskId },
      data: {
        ...(researchData.findings && { findings: researchData.findings }),
        ...(researchData.recommendations && { recommendations: researchData.recommendations }),
        ...(researchData.investigationSummary && { investigationSummary: researchData.investigationSummary }),
        ...(researchData.technologyOptions && { technologyOptions: researchData.technologyOptions }),
        ...(researchData.implementationApproaches && { implementationApproaches: researchData.implementationApproaches }),
        ...(researchData.riskAssessment && { riskAssessment: researchData.riskAssessment }),
        ...(researchData.resourceRequirements && { resourceRequirements: researchData.resourceRequirements }),
        ...(researchData.researchedBy && { researchedBy: researchData.researchedBy }),
      },
      include: {
        comments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return research;
  }

  private async getResearch(input: ResearchOperationsInput): Promise<any> {
    const { taskId, includeComments } = input;

    const include: any = {};
    if (includeComments) {
      include.comments = {
        orderBy: { createdAt: 'desc' },
      };
    }

    const research = await this.prisma.researchReport.findUnique({
      where: { taskId },
      include,
    });

    if (!research) {
      throw new Error(`Research report not found for task ${taskId}`);
    }

    return research;
  }

  private async addComment(input: ResearchOperationsInput): Promise<any> {
    const { taskId, commentData } = input;

    if (!commentData) {
      throw new Error('Comment data is required for creation');
    }

    const comment = await this.prisma.comment.create({
      data: {
        taskId,
        content: commentData.content,
        author: commentData.author,
        contextType: commentData.contextType,
        createdAt: new Date(),
      },
    });

    return comment;
  }

  private async getComments(input: ResearchOperationsInput): Promise<any> {
    const { taskId, commentType } = input;

    const where: any = { taskId };
    if (commentType) {
      where.contextType = commentType;
    }

    const comments = await this.prisma.comment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const summary = {
      total: comments.length,
      byType: comments.reduce((acc: any, comment: any) => {
        acc[comment.contextType] = (acc[comment.contextType] || 0) + 1;
        return acc;
      }, {}),
    };

    return {
      summary,
      comments,
    };
  }
}