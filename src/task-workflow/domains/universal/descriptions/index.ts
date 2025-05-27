/**
 * MCP Tool Descriptions Index
 * Centralized export of all comprehensive tool descriptions
 */

export { UNIVERSAL_QUERY_DESCRIPTION } from './universal-query.description';
export { UNIVERSAL_MUTATION_DESCRIPTION } from './universal-mutation.description';
export { WORKFLOW_OPERATIONS_DESCRIPTION } from './workflow-operations.description';

/**
 * Tool Description Metadata
 * Additional information about each tool description
 */
export const TOOL_DESCRIPTION_METADATA = {
  query_data: {
    name: 'Universal Query Tool',
    category: 'Data Access',
    replaces: 15,
    features: [
      'Prisma Filtering',
      'Aggregations',
      'Relationships',
      'Performance',
    ],
  },
  mutate_data: {
    name: 'Universal Mutation Tool',
    category: 'Data Modification',
    replaces: 20,
    features: [
      'CRUD Operations',
      'Batch Processing',
      'Transactions',
      'Validation',
    ],
  },
  workflow_operations: {
    name: 'Workflow Operations Tool',
    category: 'Workflow Management',
    replaces: 8,
    features: [
      'Role Delegation',
      'State Management',
      'Audit Trail',
      'Validation',
    ],
  },
} as const;
