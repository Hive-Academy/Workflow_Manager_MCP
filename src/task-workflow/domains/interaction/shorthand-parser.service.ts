import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  DocumentRefSchema,
  RoleCodeSchema,
  StatusCodeSchema,
  TOKEN_MAPS,
} from '../../types/token-refs.schema';
import { z } from 'zod';
import { ContextManagementService } from '../query/context-management.service';
import { TaskQueryOperationsService } from '../query/task-query-operations.service';
import { TaskInteractionOperationsService } from './task-interaction-operations.service';
import { TaskStateOperationsService } from '../state/task-state-operations.service';

// Define Zod schemas for shorthand command parameters
const NoteParamsSchema = z.object({ message: z.string() });
const StatusParamsSchema = z.object({
  status: StatusCodeSchema,
  note: z.string().optional(),
});
const DelegateParamsSchema = z.object({
  toMode: RoleCodeSchema,
  message: z.string(),
  messageDetailsRef: DocumentRefSchema.optional(),
});
const ContextParamsSchema = z.object({
  taskId: z.string(),
  type: DocumentRefSchema,
});

@Injectable()
export class ShorthandParserService {
  private readonly logger = new Logger(ShorthandParserService.name);

  constructor(
    private readonly contextManagementService: ContextManagementService,
    private readonly taskQueryOperationsService: TaskQueryOperationsService,
    private readonly taskInteractionOperationsService: TaskInteractionOperationsService,
    private readonly taskStateOperationsService: TaskStateOperationsService,
  ) {}

  async parseAndExecute(taskId: string, commandString: string): Promise<any> {
    this.logger.debug(`Parsing command for task ${taskId}: ${commandString}`);
    const match = commandString.match(/^([a-zA-Z_]+)\((.*)\)$/);
    if (!match) {
      throw new BadRequestException(`Invalid command format: ${commandString}`);
    }

    const command = match[1];
    const rawArgs = match[2];

    let args: any;
    try {
      if (
        (rawArgs.startsWith('{') && rawArgs.endsWith('}')) ||
        (rawArgs.startsWith('[') && rawArgs.endsWith(']'))
      ) {
        args = JSON.parse(rawArgs);
      } else {
        const parsedRawArgs = rawArgs
          .split(',')
          .map((arg) => arg.trim().replace(/^"|"$/g, ''));

        switch (command) {
          case 'note':
            args = { message: parsedRawArgs[0] };
            break;
          case 'status':
            args = { status: parsedRawArgs[0], note: parsedRawArgs[1] };
            break;
          case 'delegate':
            args = {
              toMode: parsedRawArgs[0],
              message: parsedRawArgs[1],
              messageDetailsRef: parsedRawArgs[2],
            };
            break;
          case 'context':
            args = { taskId: parsedRawArgs[0], type: parsedRawArgs[1] };
            break;
          default:
            args = parsedRawArgs;
        }
      }
    } catch (e) {
      this.logger.error(`Argument parsing error for '${rawArgs}': ${e}`);
      throw new BadRequestException(
        `Error parsing arguments for command ${command}: ${rawArgs}`,
      );
    }

    switch (command) {
      case 'note': {
        const noteData = NoteParamsSchema.parse(args);
        // Fetch currentMode for the task to be used as the mode for the note
        const taskContextForNote =
          await this.taskQueryOperationsService.getTaskContext({ taskId });
        const currentModeForNote = (taskContextForNote as any)?.content[0]?.json
          ?.currentMode;
        if (!currentModeForNote) {
          throw new BadRequestException(
            `Cannot determine mode for adding note to task ${taskId}: currentMode is missing from context.`,
          );
        }
        return this.taskInteractionOperationsService.addTaskNote({
          taskId,
          note: noteData.message,
          mode: currentModeForNote,
        });
      }
      case 'status': {
        const statusData = StatusParamsSchema.parse(args);
        const fullStatus =
          TOKEN_MAPS.status[statusData.status] || statusData.status;
        return this.taskStateOperationsService.updateTaskStatus({
          taskId,
          status: fullStatus,
          notes: statusData.note,
        });
      }
      case 'delegate': {
        const delegateData = DelegateParamsSchema.parse(args);
        const fullToMode =
          TOKEN_MAPS.role[delegateData.toMode] || delegateData.toMode;
        const taskContext =
          await this.taskQueryOperationsService.getTaskContext({
            taskId,
          });

        const currentMode = (taskContext as any)?.content[0]?.json?.currentMode;
        if (!currentMode) {
          throw new BadRequestException(
            `Cannot determine fromMode for task ${taskId}: currentMode is missing from context.`,
          );
        }

        const delegateTaskParams: any = {
          taskId,
          fromMode: currentMode,
          toMode: fullToMode,
          message: delegateData.message,
        };

        if (delegateData.messageDetailsRef) {
          delegateTaskParams.messageDetailsRef =
            TOKEN_MAPS.document[delegateData.messageDetailsRef] ||
            delegateData.messageDetailsRef;
        }

        return this.taskStateOperationsService.delegateTask(delegateTaskParams);
      }
      case 'context': {
        const contextData = ContextParamsSchema.parse(args);
        const sliceTaskId = contextData.taskId || taskId;
        const fullDocType =
          TOKEN_MAPS.document[contextData.type] || contextData.type;
        return this.contextManagementService.getContextSlice(
          sliceTaskId,
          fullDocType,
        );
      }
      default:
        throw new BadRequestException(`Unknown shorthand command: ${command}`);
    }
  }
}
