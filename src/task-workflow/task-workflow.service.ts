import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Tool } from '@rekog/mcp-nest';
import { z } from 'zod';
import { Prisma } from 'generated/prisma';

const CreateTaskSchema = z.object({
  taskId: z.string().describe('The unique ID for the new task (e.g., TSK-001)'),
  taskName: z
    .string()
    .describe(
      'The descriptive name of the new task (e.g., Implement Feature X)',
    ),
  description: z
    .string()
    .optional()
    .describe(
      'A more detailed description of what the task entails (to be used by Boomerang for TaskDescription)',
    ),
});

@Injectable()
export class TaskWorkflowService {
  constructor(private readonly prisma: PrismaService) {}

  @Tool({
    name: 'create_task',
    description: 'Creates a new core task entry in the workflow system.',
    parameters: CreateTaskSchema,
  })
  async createTask(params: z.infer<typeof CreateTaskSchema>) {
    try {
      const newTask = await this.prisma.task.create({
        data: {
          taskId: params.taskId,
          name: params.taskName,
          // description: params.description, // Removed: description is part of TaskDescription, not Task model directly
          status: 'Not Started',
          currentMode: 'boomerang',
        },
      });
      // The input params.description can be returned or logged for Boomerang to use when creating the full TaskDescription record/file.
      return {
        content: [
          {
            type: 'text',
            text: `Task '${newTask.name}' (ID: ${newTask.taskId}) created successfully with status '${newTask.status}'. Description provided: ${params.description ? 'Yes' : 'No'}`,
          },
        ],
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002 is the Prisma error code for unique constraint violation
        if (error.code === 'P2002') {
          // Assuming 'taskId' is the unique field that caused the error
          // You might need to check error.meta.target to be certain
          throw new ConflictException(
            `Task with ID '${params.taskId}' already exists.`,
          );
        }
      }
      // Log the error for debugging
      console.error(`Error creating task ${params.taskId}:`, error);
      // Re-throw a generic server error for other Prisma errors or unexpected errors
      throw new InternalServerErrorException(
        `Could not create task '${params.taskId}'.`,
      );
    }
  }

  // Other tool methods will be added here
}
