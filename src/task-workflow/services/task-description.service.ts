import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateTaskDescriptionSchema } from '../schemas';
import { z } from 'zod';

@Injectable()
export class TaskDescriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async updateTaskDescription(
    input: z.infer<typeof UpdateTaskDescriptionSchema>,
  ) {
    const {
      taskId,
      description,
      acceptanceCriteria,
      businessRequirements,
      technicalRequirements,
    } = input;

    // Ensure task exists before attempting to upsert its description
    const task = await this.prisma.task.findUnique({
      where: { taskId },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID "${taskId}" not found.`);
    }

    return this.prisma.taskDescription.upsert({
      where: { taskId },
      create: {
        task: { connect: { taskId } },
        description: description || '', // description might be optional in schema but required in DB
        businessRequirements: businessRequirements || '', // empty string instead of null for string fields
        technicalRequirements: technicalRequirements || '', // empty string instead of null for string fields
        // If optional fields are undefined in input, store them as DB null during creation
        acceptanceCriteria: acceptanceCriteria ?? Prisma.JsonNull,
      },
      update: {
        // Only include fields in the update payload if they are explicitly provided in the input
        ...(description !== undefined && { description }),
        ...(businessRequirements !== undefined && { businessRequirements }),
        ...(technicalRequirements !== undefined && { technicalRequirements }),
        // For acceptanceCriteria, handle it specifically for JSON field
        ...(acceptanceCriteria !== undefined && {
          acceptanceCriteria: acceptanceCriteria as Prisma.InputJsonValue,
        }),
        // Prisma automatically handles the @updatedAt field
      },
    });
  }
}
