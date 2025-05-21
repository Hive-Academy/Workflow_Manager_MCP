import { Injectable } from '@nestjs/common';
import { TaskStateService } from './task-state.service';
import { z } from 'zod';
import { TransitionRoleSchema } from '../schemas';

@Injectable()
export class RoleTransitionService {
  constructor(private readonly taskStateService: TaskStateService) {}

  async transitionRole(params: z.infer<typeof TransitionRoleSchema>) {
    // All business logic for role transition
    const result = await this.taskStateService.transitionRole(params);
    const fromEmoji = '';
    const toEmoji = '';
    const fromRole = String(params.fromRole);
    const toRole = String(params.toRole);
    const displayTaskName = result.task.name || params.taskId;
    const textContent = `# ✈️ Role Transition: ${fromEmoji} ${fromRole.replace('-role', '')} -> ${toEmoji} ${toRole.replace('-role', '')}
\nTask '${displayTaskName}' (ID: ${result.task.taskId}) has transitioned from **${fromRole.replace('-role', '')}** to **${toRole.replace('-role', '')}**.\n\n${
      params.summary
        ? `## Summary from ${fromRole.replace('-role', '')}:
${params.summary}
\n`
        : ''
    }The task is now with ${toEmoji} ${toRole.replace('-role', '')}. The new role should now take over.`;
    return {
      content: [
        {
          type: 'text',
          text: textContent,
        },
      ],
    };
  }
}
