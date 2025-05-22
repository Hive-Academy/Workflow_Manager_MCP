import { z } from 'zod';
import {
  RoleCodeSchema,
  TOKEN_MAPS,
  DocumentRefSchema,
} from '../../../types/token-refs.schema';

export const RoleTransitionSchema = z.object({
  roleId: z
    .union([RoleCodeSchema, z.string()])
    .transform((val) => {
      return TOKEN_MAPS.role[val as keyof typeof TOKEN_MAPS.role] || val;
    })
    .pipe(
      z
        .string()
        .min(1)
        .describe(
          'The role ID being transitioned to (full name after transform).',
        ),
    ),
  taskId: z.string().describe('The ID of the task being worked on.'),
  fromRole: z
    .union([RoleCodeSchema, z.string()])
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      return TOKEN_MAPS.role[val as keyof typeof TOKEN_MAPS.role] || val;
    })
    .pipe(
      z
        .string()
        .optional()
        .describe('The previous role (full name after transform).'),
    ),
  focus: z.string().describe('The current focus area.'),
  refs: z
    .array(
      z
        .union([DocumentRefSchema, z.string()])
        .transform((val) => {
          return (
            TOKEN_MAPS.document[val as keyof typeof TOKEN_MAPS.document] || val
          );
        })
        .pipe(
          z
            .string()
            .min(1)
            .describe('Document reference (full name after transform).'),
        ),
    )
    .optional()
    .describe('Referenced documents (e.g., TD, IP, RR).'),
  contextHash: z
    .string()
    .optional()
    .describe('Hash of the previously seen context.'),
});
