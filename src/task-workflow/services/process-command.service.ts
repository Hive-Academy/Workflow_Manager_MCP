import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ProcessCommandSchema } from '../schemas';
import { RoleTransitionService } from './role-transition.service';
import { TaskQueryService } from './task-query.service';

@Injectable()
export class ProcessCommandService {
  constructor(
    private readonly roleTransitionService: RoleTransitionService,
    private readonly taskQueryService: TaskQueryService,
  ) {}

  async processCommand(params: z.infer<typeof ProcessCommandSchema>) {
    const commandString = String(params.command_string);
    if (!commandString.startsWith('/')) {
      return {
        content: [
          {
            type: 'text',
            text: 'Invalid command format. Commands must start with /',
          },
        ],
      };
    }
    const parts = commandString.substring(1).split(' ');
    const command = parts[0].toLowerCase();
    const cmdArgs = parts.slice(1);
    switch (command) {
      case 'next-role':
        if (cmdArgs.length < 1)
          return {
            content: [{ type: 'text', text: 'Usage: /next-role [task-id]' }],
          };
        // Implement next-role logic or call transitionRole
        return {
          content: [{ type: 'text', text: 'Not implemented: next-role' }],
        };
      case 'role':
        if (cmdArgs.length < 2)
          return {
            content: [
              { type: 'text', text: 'Usage: /role [role-name] [task-id]' },
            ],
          };
        return await this.roleTransitionService.transitionRole({
          taskId: cmdArgs[1],
          fromRole: 'unknown', // You may want to fetch the current role
          toRole: cmdArgs[0] + '-role',
          summary: `Manual transition to ${cmdArgs[0]}-role`,
        });
      case 'workflow-status':
        if (cmdArgs.length < 1)
          return {
            content: [
              { type: 'text', text: 'Usage: /workflow-status [task-id]' },
            ],
          };
        return await this.taskQueryService.getWorkflowStatus({
          taskId: cmdArgs[0],
        });
      case 'research':
        return {
          content: [{ type: 'text', text: 'Not implemented: research' }],
        };
      default:
        return {
          content: [
            {
              type: 'text',
              text: `Unknown command: ${command}. Available commands: /next-role, /role, /workflow-status, /research`,
            },
          ],
        };
    }
  }
}
