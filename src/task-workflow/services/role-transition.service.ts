import { Injectable } from '@nestjs/common';
import { TaskStateService } from './task-state.service';
import { z } from 'zod';
import { RoleTransitionSchema } from '../schemas';

@Injectable()
export class RoleTransitionService {
  constructor(private readonly taskStateService: TaskStateService) {}

  async transitionRole(params: z.infer<typeof RoleTransitionSchema>) {
    const result = await this.taskStateService.transitionRole(params);

    const taskId = params.taskId;
    const toRoleName = params.roleId; // Target role from roleId
    const fromRoleName = params.fromRole || 'System'; // Source role, with a default

    const fromEmoji = ''; // Placeholder
    const toEmoji = ''; // Placeholder

    const displayTaskName = result.task.name || taskId;

    const textContent = `# ✈️ Role Transition: ${fromEmoji} ${fromRoleName.replace('-role', '')} -> ${toEmoji} ${toRoleName.replace('-role', '')}
\nTask '${displayTaskName}' (ID: ${result.task.taskId}) has transitioned from **${fromRoleName.replace('-role', '')}** to **${toRoleName.replace('-role', '')}**.
\nThe task is now with ${toEmoji} ${toRoleName.replace('-role', '')}. The new role should now take over.`;
    // Removed reference to params.summary as it does not exist in RoleTransitionSchema

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
