import { z } from 'zod';
import {
  RoleCodeSchema,
  TOKEN_MAPS,
  DocumentRefSchema,
} from 'src/task-workflow/types/token-refs.schema';

export const DelegateTaskSchema = z.object({
  taskId: z.string().describe('The ID of the task to delegate.'),
  fromMode: z
    .union([RoleCodeSchema, z.string()])
    .transform((val) => {
      return TOKEN_MAPS.role[val as keyof typeof TOKEN_MAPS.role] || val;
    })
    .pipe(
      z
        .string()
        .min(1)
        .describe('The mode delegating the task (full name after transform).'),
    ),
  toMode: z
    .union([RoleCodeSchema, z.string()])
    .transform((val) => {
      return TOKEN_MAPS.role[val as keyof typeof TOKEN_MAPS.role] || val;
    })
    .pipe(
      z
        .string()
        .min(1)
        .describe(
          'The mode receiving the delegation (full name after transform).',
        ),
    ),
  message: z
    .string()
    .optional()
    .describe('Additional delegation message or context.'),
  messageDetailsRef: z
    .union([DocumentRefSchema, z.string()])
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      return (
        TOKEN_MAPS.document[val as keyof typeof TOKEN_MAPS.document] || val
      );
    })
    .pipe(
      z
        .string()
        .optional()
        .describe(
          'Reference to a document containing detailed message (e.g., TD, IP, RR) (full name after transform).',
        ),
    ),
  taskName: z
    .string()
    .optional()
    .describe(
      'The name of the task (used if taskId is new or just an ID part).',
    ),
});
