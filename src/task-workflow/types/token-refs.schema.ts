import { z } from 'zod';

// ===== NEW: Full-name schemas (no shortcuts) =====
export const TaskStatusSchema = z.enum([
  'not-started',
  'in-progress',
  'needs-review',
  'completed',
  'needs-changes',
]);

export const WorkflowRoleSchema = z.enum([
  'boomerang',
  'researcher',
  'architect',
  'senior-developer',
  'code-review',
]);

export const DocumentTypeSchema = z.enum([
  'task-description',
  'implementation-plan',
  'research-report',
  'code-review-report',
  'completion-report',
  'memory-bank-project-overview',
  'memory-bank-technical-architecture',
  'memory-bank-developer-guide',
  'acceptance-criteria',
  'subtask',
  'subtasks-collection',
  'comments-collection',
  'delegation-history',
  'workflow-transitions',
]);

// ===== REMOVED: All legacy migration support since database is clean =====

// ===== TYPE EXPORTS =====
// New preferred types
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
export type WorkflowRole = z.infer<typeof WorkflowRoleSchema>;
export type DocumentType = z.infer<typeof DocumentTypeSchema>;

// ===== REMOVED: Legacy types completely eliminated =====
