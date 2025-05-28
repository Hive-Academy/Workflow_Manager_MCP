import { Injectable, Logger } from '@nestjs/common';
import { Tool } from '@rekog/mcp-nest';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  ResearchOperationsSchema,
  ResearchOperationsInput,
} from './schemas/research-operations.schema';

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
          throw new Error(`Unknown operation: ${String(input.operation)}`);
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
      this.logger.error(`Research operation failed:`, error);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                success: false,
                error: {
                  message: error.message,
                  code: 'RESEARCH_OPERATION_FAILED',
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

  private async createResearch(input: ResearchOperationsInput): Promise<any> {
    const { taskId, researchData } = input;

    if (!researchData) {
      throw new Error('Research data is required for creation');
    }

    const research = await this.prisma.researchReport.create({
      data: {
        taskId,
        title: researchData.title || 'Research Report',
        summary: researchData.summary || '',
        findings: researchData.findings,
        recommendations: researchData.recommendations || '',
        references: researchData.references || [],
      },
    });

    return research;
  }

  private async updateResearch(input: ResearchOperationsInput): Promise<any> {
    const { taskId, researchData } = input;

    if (!researchData) {
      throw new Error('Research data is required for update');
    }

    // Find the research report by taskId first
    const existingResearch = await this.prisma.researchReport.findFirst({
      where: { taskId },
    });

    if (!existingResearch) {
      throw new Error(`Research report not found for task ${taskId}`);
    }

    const research = await this.prisma.researchReport.update({
      where: { id: existingResearch.id },
      data: {
        ...(researchData.title && { title: researchData.title }),
        ...(researchData.summary && { summary: researchData.summary }),
        ...(researchData.findings && { findings: researchData.findings }),
        ...(researchData.recommendations && {
          recommendations: researchData.recommendations,
        }),
        ...(researchData.references && {
          references: researchData.references,
        }),
      },
    });

    return research;
  }

  private async getResearch(input: ResearchOperationsInput): Promise<any> {
    const { taskId, includeComments } = input;

    const research = await this.prisma.researchReport.findFirst({
      where: { taskId },
    });

    if (!research) {
      throw new Error(`Research report not found for task ${taskId}`);
    }

    // If comments requested, get them separately since they're not directly related
    if (includeComments) {
      const comments = await this.prisma.comment.findMany({
        where: { taskId },
        orderBy: { createdAt: 'desc' },
      });

      return {
        ...research,
        comments,
      };
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
        mode: commentData.author || 'system', // Map author to mode field
      },
    });

    return comment;
  }

  private async getComments(input: ResearchOperationsInput): Promise<any> {
    const { taskId, commentType } = input;

    const where: any = { taskId };
    if (commentType) {
      where.mode = commentType; // Map contextType to mode field
    }

    const comments = await this.prisma.comment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const summary = {
      total: comments.length,
      byType: {} as Record<string, number>,
    };

    // Build summary properly typed
    comments.forEach((comment) => {
      const type = comment.mode;
      summary.byType[type] = (summary.byType[type] || 0) + 1;
    });

    return {
      summary,
      comments,
    };
  }
}
