import { z } from 'zod';

// Document reference schema
export const DocumentRefSchema = z.enum([
  'TD', // task-description
  'IP', // implementation-plan
  'RR', // research-report
  'CRD', // code-review-report - Corrected from CR to CRD as per 000-workflow-core.md
  'CP', // completion-report
  'MB-PO', // memory-bank/ProjectOverview.md
  'MB-TA', // memory-bank/TechnicalArchitecture.md
  'MB-DG', // memory-bank/DeveloperGuide.md
  'AC', // acceptance criteria
  'ST', // subtask
]);

// Status code schema
export const StatusCodeSchema = z.enum([
  'INP', // in-progress
  'NRV', // needs-review
  'COM', // completed
  'NS', // not-started
  'NCH', // needs-changes
]);

// Role code schema
export const RoleCodeSchema = z.enum([
  '🪃MB', // boomerang
  '🔬RS', // researcher
  '🏛️AR', // architect
  '👨‍💻SD', // senior-developer
  '🔍CR', // code-review
]);

// Mapping objects for translation
export const TOKEN_MAPS = {
  document: {
    TD: 'task-description.md', // Added .md extension
    IP: 'implementation-plan.md', // Added .md extension
    RR: 'research-report.md', // Added .md extension
    CRD: 'code-review-report.md', // Corrected and added .md
    CP: 'completion-report.md', // Added .md extension
    'MB-PO': 'memory-bank/ProjectOverview.md',
    'MB-TA': 'memory-bank/TechnicalArchitecture.md',
    'MB-DG': 'memory-bank/DeveloperGuide.md',
    AC: 'acceptance criteria',
    ST: 'subtask',
  },
  status: {
    INP: 'in-progress',
    NRV: 'needs-review',
    COM: 'completed',
    NS: 'not-started',
    NCH: 'needs-changes',
  },
  role: {
    '🪃MB': 'boomerang',
    '🔬RS': 'researcher',
    '🏛️AR': 'architect',
    '👨‍💻SD': 'senior-developer',
    '🔍CR': 'code-review',
  },
};

// Types for TypeScript
export type DocumentRef = z.infer<typeof DocumentRefSchema>;
export type StatusCode = z.infer<typeof StatusCodeSchema>;
export type RoleCode = z.infer<typeof RoleCodeSchema>;
