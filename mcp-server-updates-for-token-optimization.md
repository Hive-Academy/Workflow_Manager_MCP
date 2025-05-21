# MCP Server Enhancement Implementation Plan

## Overview

This plan outlines the necessary changes to optimize token usage in the MCP server while preserving the current workflow functionality. The enhancements focus on schema updates, new services for context management, and additional tools for efficient communication.

## 1. Create Token Reference Schema and Constants

### Create a new schema file: token-refs.schema.ts

```typescript
// src/task-workflow/schemas/token-refs.schema.ts
import { z } from 'zod';

// Document reference schema
export const DocumentRefSchema = z.enum([
  'TD', // task-description
  'IP', // implementation-plan
  'RR', // research-report
  'CR', // code-review-report
  'CP', // completion-report
  'MB', // memory-bank (generic)
]);

// Status code schema
export const StatusCodeSchema = z.enum([
  'INP', // in-progress
  'NRV', // needs-review
  'COM', // completed
  'NS',  // not-started
  'NCH', // needs-changes
]);

// Role code schema
export const RoleCodeSchema = z.enum([
  'BM', // boomerang
  'RS', // researcher
  'AR', // architect
  'SD', // senior-developer
  'CR', // code-review
]);

// Mapping objects for translation
export const TOKEN_MAPS = {
  document: {
    'TD': 'task-description',
    'IP': 'implementation-plan',
    'RR': 'research-report',
    'CR': 'code-review-report',
    'CP': 'completion-report',
    'MB': 'memory-bank',
  },
  status: {
    'INP': 'in-progress',
    'NRV': 'needs-review',
    'COM': 'completed',
    'NS': 'not-started',
    'NCH': 'needs-changes',
  },
  role: {
    'BM': 'boomerang',
    'RS': 'researcher',
    'AR': 'architect',
    'SD': 'senior-developer',
    'CR': 'code-review',
  },
};

// Types for TypeScript
export type DocumentRef = z.infer<typeof DocumentRefSchema>;
export type StatusCode = z.infer<typeof StatusCodeSchema>;
export type RoleCode = z.infer<typeof RoleCodeSchema>;
```

### Add to index.ts

```typescript
// src/task-workflow/schemas/index.ts
export * from './token-refs.schema';
// Existing exports...
```

## 2. Create Context Management Service

### Create a new service file: context-management.service.ts

```typescript
// src/task-workflow/services/context-management.service.ts
import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContextManagementService {
  // In-memory cache for efficient reuse
  private contextCache: Map<string, any> = new Map();
  
  constructor(private readonly prisma: PrismaService) {}
  
  // Generate hash for context object
  hashContext(context: any): string {
    return createHash('sha256')
      .update(JSON.stringify(context))
      .digest('hex');
  }
  
  // Store context in cache with hash key
  cacheContext(context: any): string {
    const hash = this.hashContext(context);
    this.contextCache.set(hash, context);
    return hash;
  }
  
  // Retrieve context by hash
  getContextByHash(hash: string): any {
    return this.contextCache.get(hash);
  }
  
  // Calculate difference between two contexts
  diffContext(oldContext: any, newContext: any): any {
    if (!oldContext) return { isNew: true, fullContext: newContext };
    
    const diff: any = {};
    
    for (const key in newContext) {
      // Skip comparison for functions and null values
      if (typeof newContext[key] === 'function') continue;
      
      // If key doesn't exist in old context or values are different
      if (
        !(key in oldContext) || 
        JSON.stringify(oldContext[key]) !== JSON.stringify(newContext[key])
      ) {
        diff[key] = newContext[key];
      }
    }
    
    // Keys that were removed
    const removed: string[] = [];
    for (const key in oldContext) {
      if (!(key in newContext)) {
        removed.push(key);
      }
    }
    
    if (removed.length > 0) {
      diff.__removed = removed;
    }
    
    return diff;
  }
  
  // Get a specific slice of context
  async getContextSlice(taskId: string, sliceType: string): Promise<any> {
    switch (sliceType) {
      case 'STATUS':
        return this.prisma.task.findUnique({
          where: { taskId },
          select: {
            taskId: true,
            name: true,
            status: true,
            currentMode: true,
            creationDate: true,
            completionDate: true,
          }
        });
        
      case 'AC': // Acceptance Criteria
        const taskDescription = await this.prisma.taskDescription.findUnique({
          where: { taskId },
          select: { acceptanceCriteria: true }
        });
        return taskDescription ? taskDescription.acceptanceCriteria : null;
        
      case 'SUBTASKS':
        // Get implementation plan with subtasks
        const implPlan = await this.prisma.implementationPlan.findFirst({
          where: { taskId },
          orderBy: { updatedAt: 'desc' },
          include: { subtasks: true }
        });
        return implPlan ? implPlan.subtasks : [];
        
      default:
        throw new Error(`Unknown context slice type: ${sliceType}`);
    }
  }
}
```

### Add service to index.ts

```typescript
// src/task-workflow/services/index.ts
export * from './context-management.service';
// Existing exports...
```

### Update task-workflow.module.ts

```typescript
// src/task-workflow/task-workflow.module.ts
// Import the new service
import {
  // Existing imports...
  ContextManagementService,
} from './services';

@Module({
  imports: [PrismaModule],
  providers: [
    // Existing providers...
    ContextManagementService,
  ],
  exports: [TaskWorkflowService],
})
export class TaskWorkflowModule {}
```

## 3. Create GetContextDiff Schema and Tool

### Create new schema file: get-context-diff.schema.ts

```typescript
// src/task-workflow/schemas/get-context-diff.schema.ts
import { z } from 'zod';

export const GetContextDiffSchema = z.object({
  taskId: z.string().describe('The ID of the task to get context difference for.'),
  lastContextHash: z.string().describe('Hash of the last context seen by the client.'),
  sliceType: z.string().optional().describe('Optional type of context slice to fetch (STATUS, AC, SUBTASKS).'),
});
```

### Add to index.ts

```typescript
// src/task-workflow/schemas/index.ts
export * from './get-context-diff.schema';
// Existing exports...
```

### Update TaskWorkflowService with new tool

```typescript
// src/task-workflow/task-workflow.service.ts
// Add import
import { GetContextDiffSchema } from './schemas';
import { ContextManagementService } from './services';

// Update constructor
constructor(
  // Existing dependencies...
  private readonly contextManagementService: ContextManagementService,
) {}

// Add new tool method
@Tool({
  name: 'get_context_diff',
  description: 'Gets only what has changed in the task context since last retrieval.',
  parameters: GetContextDiffSchema,
})
async getContextDiff(params: z.infer<typeof GetContextDiffSchema>) {
  try {
    const { taskId, lastContextHash, sliceType } = params;
    
    // If a specific slice is requested
    if (sliceType) {
      const contextSlice = await this.contextManagementService.getContextSlice(
        taskId, 
        sliceType
      );
      
      const sliceHash = this.contextManagementService.hashContext(contextSlice);
      
      // If hash matches, no changes
      if (lastContextHash === sliceHash) {
        return {
          content: [
            { 
              type: 'text', 
              text: `No changes to ${sliceType} since last retrieval.` 
            },
            {
              type: 'json',
              json: { 
                unchanged: true, 
                contextHash: sliceHash,
                sliceType 
              }
            }
          ]
        };
      }
      
      // Get the old slice for diff
      const oldSlice = this.contextManagementService.getContextByHash(lastContextHash);
      
      // Calculate diff if old slice exists
      const diff = oldSlice 
        ? this.contextManagementService.diffContext(oldSlice, contextSlice)
        : { isNew: true, fullSlice: contextSlice };
      
      // Cache the new slice
      this.contextManagementService.cacheContext(contextSlice);
      
      return {
        content: [
          { 
            type: 'text', 
            text: `${sliceType} context updated with ${Object.keys(diff).length - (diff.isNew ? 1 : 0)} changes.` 
          },
          {
            type: 'json',
            json: { 
              contextHash: sliceHash,
              sliceType,
              changes: diff
            }
          }
        ]
      };
    }
    
    // Get full task context
    const fullContext = await this.taskQueryService.getTaskContext({ taskId });
    const currentHash = this.contextManagementService.hashContext(fullContext);
    
    // If hash matches, no changes
    if (lastContextHash === currentHash) {
      return {
        content: [
          { 
            type: 'text', 
            text: 'No changes to task context since last retrieval.' 
          },
          {
            type: 'json',
            json: { 
              unchanged: true, 
              contextHash: currentHash 
            }
          }
        ]
      };
    }
    
    // Get the old context for diff
    const oldContext = this.contextManagementService.getContextByHash(lastContextHash);
    
    // Calculate diff if old context exists
    const diff = oldContext 
      ? this.contextManagementService.diffContext(oldContext, fullContext)
      : { isNew: true, fullContext };
    
    // Cache the new context
    this.contextManagementService.cacheContext(fullContext);
    
    return {
      content: [
        { 
          type: 'text', 
          text: `Task context updated with ${Object.keys(diff).length - (diff.isNew ? 1 : 0)} changes.` 
        },
        {
          type: 'json',
          json: { 
            contextHash: currentHash,
            changes: diff
          }
        }
      ]
    };
  } catch (error) {
    console.error(`Facade Error in getContextDiff for ${params.taskId}:`, error);
    throw new InternalServerErrorException(
      `Facade: Could not get context diff for task '${params.taskId}'.`,
    );
  }
}
```

## 4. Enhance Existing Schemas with Token-Efficient Formats

### Update UpdateTaskStatusSchema with shorthand support

```typescript
// src/task-workflow/schemas/update-task-status.schema.ts
import { z } from 'zod';
import { StatusCodeSchema, TOKEN_MAPS } from './token-refs.schema';

export const UpdateTaskStatusSchema = z.object({
  taskId: z.string().describe('The ID of the task to update.'),
  status: z.union([
    z.string().describe('The new status of the task.'),
    StatusCodeSchema.describe('Status shortcode (INP, NRV, COM, etc.)'),
  ]).transform(s => TOKEN_MAPS.status[s] || s),
  notes: z.string().optional().describe('Additional notes about the status update.'),
  currentMode: z.string().optional().describe('The mode currently owning the task.'),
});
```

### Update DelegateTaskSchema with shorthand support

```typescript
// src/task-workflow/schemas/delegate-task.schema.ts
import { z } from 'zod';
import { RoleCodeSchema, TOKEN_MAPS } from './token-refs.schema';

export const DelegateTaskSchema = z.object({
  taskId: z.string().describe('The ID of the task to delegate.'),
  fromMode: z.union([
    z.string().describe('The mode delegating the task.'),
    RoleCodeSchema.describe('Role shortcode (BM, AR, SD, etc.)'),
  ]).transform(m => TOKEN_MAPS.role[m] || m),
  toMode: z.union([
    z.string().describe('The mode receiving the delegation.'),
    RoleCodeSchema.describe('Role shortcode (BM, AR, SD, etc.)'),
  ]).transform(m => TOKEN_MAPS.role[m] || m),
  message: z
    .string()
    .optional()
    .describe('Additional delegation message or context.'),
  messageDetailsRef: z.string().optional().describe(
    'Reference to a document containing detailed message (e.g., TD, IP, RR).'
  ),
  taskName: z
    .string()
    .optional()
    .describe('The name of the task (used if taskId is new or just an ID part).'),
});
```

## 5. Create Shorthand Command Tool

### Create new schema file: shorthand-command.schema.ts

```typescript
// src/task-workflow/schemas/shorthand-command.schema.ts
import { z } from 'zod';

export const ShorthandCommandSchema = z.object({
  command: z.string().describe(
    'Shorthand command (e.g., "note(CR: Review started)" or "status(INP, AR: Planning started)").'
  ),
  taskId: z.string().describe('The ID of the task to apply the command to.'),
});
```

### Add to index.ts

```typescript
// src/task-workflow/schemas/index.ts
export * from './shorthand-command.schema';
// Existing exports...
```

### Add Shorthand Parser Service

```typescript
// src/task-workflow/services/shorthand-parser.service.ts
import { Injectable } from '@nestjs/common';
import { TOKEN_MAPS } from '../schemas/token-refs.schema';

@Injectable()
export class ShorthandParserService {
  parseShorthandCommand(command: string): { type: string; params: any } {
    // Extract command type and parameters
    const match = command.match(/^(\w+)\((.*)\)$/);
    
    if (!match) {
      throw new Error(`Invalid shorthand command format: ${command}`);
    }
    
    const [, type, paramString] = match;
    
    switch (type.toLowerCase()) {
      case 'note':
        return {
          type: 'add_task_note',
          params: { note: paramString.trim() }
        };
        
      case 'status':
        const statusParams = this.parseStatusParams(paramString);
        return {
          type: 'update_task_status',
          params: statusParams
        };
        
      case 'delegate':
        const delegateParams = this.parseDelegateParams(paramString);
        return {
          type: 'delegate_task',
          params: delegateParams
        };
        
      case 'context':
        const contextParams = this.parseContextParams(paramString);
        return {
          type: 'get_context_slice',
          params: contextParams
        };
        
      default:
        throw new Error(`Unknown shorthand command type: ${type}`);
    }
  }
  
  private parseStatusParams(paramString: string): any {
    // Format: "INP, Note text" or "in-progress, Note text"
    const parts = paramString.split(',');
    
    // Status is the first part
    const status = parts[0].trim();
    
    // Note is everything after the first comma
    const notes = parts.slice(1).join(',').trim();
    
    return {
      status: TOKEN_MAPS.status[status] || status,
      notes: notes || undefined
    };
  }
  
  private parseDelegateParams(paramString: string): any {
    // Format: "CR, Message text" or "code-review, Message text"
    const parts = paramString.split(',');
    
    // Target mode is the first part
    const toMode = parts[0].trim();
    
    // Message is everything after the first comma
    const message = parts.slice(1).join(',').trim();
    
    return {
      toMode: TOKEN_MAPS.role[toMode] || toMode,
      message: message || undefined
    };
  }
  
  private parseContextParams(paramString: string): any {
    // Format: "taskId, TYPE"
    const [taskId, sliceType] = paramString.split(',').map(p => p.trim());
    
    return {
      taskId,
      sliceType: sliceType || undefined
    };
  }
}
```

### Add service to index.ts

```typescript
// src/task-workflow/services/index.ts
export * from './shorthand-parser.service';
// Existing exports...
```

### Update task-workflow.module.ts

```typescript
// src/task-workflow/task-workflow.module.ts
// Import the new service
import {
  // Existing imports...
  ShorthandParserService,
} from './services';

@Module({
  imports: [PrismaModule],
  providers: [
    // Existing providers...
    ShorthandParserService,
  ],
  exports: [TaskWorkflowService],
})
export class TaskWorkflowModule {}
```

### Add new tool to TaskWorkflowService

// src/task-workflow/task-workflow.service.ts
// Add new tool method
@Tool({
  name: 'shorthand_command',
  description: 'Executes a shorthand command for more token-efficient operations.',
  parameters: ShorthandCommandSchema,
})
async executeShorthandCommand(params: z.infer<typeof ShorthandCommandSchema>) {
  try {
    const { command, taskId } = params;
    
    // Parse the shorthand command
    const parsedCommand = this.shorthandParserService.parseShorthandCommand(command);
    
    // Add taskId to the params
    const fullParams = {
      ...parsedCommand.params,
      taskId,
    };
    
    // Execute the appropriate method based on the command type
    switch (parsedCommand.type) {
      case 'add_task_note':
        return this.addTaskNote(fullParams);
        
      case 'update_task_status':
        return this.updateTaskStatus(fullParams);
        
      case 'delegate_task':
        // For delegation, we need fromMode
        if (!fullParams.fromMode) {
          // Try to get current mode from the task
          const task = await this.taskStateService.getCurrentModeForTask({ taskId });
          fullParams.fromMode = task.currentMode;
        }
        return this.delegateTask(fullParams);
        
      case 'get_context_slice':
        const contextSlice = await this.contextManagementService.getContextSlice(
          taskId, 
          fullParams.sliceType
        );
        return {
          content: [
            { 
              type: 'text', 
              text: `Retrieved ${fullParams.sliceType} context for task ${taskId}.` 
            },
            {
              type: 'json',
              json: contextSlice
            }
          ]
        };
        
      default:
        throw new Error(`Unsupported command type: ${parsedCommand.type}`);
    }
  } catch (error) {
    console.error(
      `Facade Error in executeShorthandCommand for ${params.taskId}:`,
      error,
    );
    throw new InternalServerErrorException(
      `Facade: Could not execute shorthand command '${params.command}' for task '${params.taskId}'. ${error.message}`,
    );
  }
}


## 6. Create Role Transition Schema and Tool

### Create new schema file: role-transition.schema.ts

```typescript
// src/task-workflow/schemas/role-transition.schema.ts
import { z } from 'zod';
import { RoleCodeSchema, DocumentRefSchema, TOKEN_MAPS } from './token-refs.schema';

export const RoleTransitionSchema = z.object({
  roleId: z.union([
    z.string().describe('The role ID being transitioned to.'),
    RoleCodeSchema.describe('Role shortcode (BM, AR, SD, etc.)'),
  ]).transform(r => TOKEN_MAPS.role[r] || r),
  taskId: z.string().describe('The ID of the task being worked on.'),
  fromRole: z.union([
    z.string().optional().describe('The previous role.'),
    RoleCodeSchema.optional().describe('Role shortcode (BM, AR, SD, etc.)'),
  ]).transform(r => r ? TOKEN_MAPS.role[r] || r : undefined),
  focus: z.string().describe('The current focus area.'),
  refs: z.array(
    z.union([
      z.string().describe('Document reference.'),
      DocumentRefSchema.describe('Document shortcode (TD, IP, RR, etc.)'),
    ]).transform(d => TOKEN_MAPS.document[d] || d)
  ).optional().describe('Referenced documents.'),
  contextHash: z.string().optional().describe('Hash of the previously seen context.'),
});
```

### Add to index.ts

```typescript
// src/task-workflow/schemas/index.ts
export * from './role-transition.schema';
// Existing exports...
```

### Add Role Transition Tool

```typescript
// src/task-workflow/task-workflow.service.ts
// Add import
import { RoleTransitionSchema } from './schemas';

// Add new tool method
@Tool({
  name: 'role_transition',
  description: 'Handles role transition with token-efficient context management.',
  parameters: RoleTransitionSchema,
})
async handleRoleTransition(params: z.infer<typeof RoleTransitionSchema>) {
  try {
    const { roleId, taskId, fromRole, focus, refs, contextHash } = params;
    
    // Get the task information
    const task = await this.taskStateService.getCurrentModeForTask({ taskId });
    
    // Get full task context
    const fullContext = await this.taskQueryService.getTaskContext({ taskId });
    
    // Generate hash of current context
    const currentHash = this.contextManagementService.hashContext(fullContext);
    
    // Calculate context diff if contextHash is provided
    let contextDiff = null;
    if (contextHash && contextHash !== currentHash) {
      const oldContext = this.contextManagementService.getContextByHash(contextHash);
      contextDiff = oldContext 
        ? this.contextManagementService.diffContext(oldContext, fullContext)
        : { isNew: true };
    }
    
    // Cache the current context
    this.contextManagementService.cacheContext(fullContext);
    
    // If the current mode doesn't match the requested role, update it
    if (task.currentMode !== roleId) {
      await this.taskStateService.updateTaskStatus({
        taskId,
        currentMode: roleId,
      });
      
      // Add note about role transition if fromRole is provided
      if (fromRole) {
        await this.taskCommentService.addTaskNote({
          taskId,
          note: `Role transition from ${fromRole} to ${roleId}. Focus: ${focus}`,
          mode: 'system', // Use system mode for automatic transitions
        });
      }
    }
    
    // Format document references
    const docRefs = refs 
      ? refs.map(ref => TOKEN_MAPS.document[ref] || ref).join(', ')
      : '';
    
    return {
      content: [
        {
          type: 'text',
          text: `Now acting as ${roleId} for task '${task.name}' (ID: ${taskId}). Focus: ${focus}${docRefs ? `. Referenced documents: ${docRefs}` : ''}`,
        },
        {
          type: 'json',
          json: {
            role: roleId,
            task: {
              id: taskId,
              name: task.name,
              status: task.status,
              currentMode: roleId,
            },
            focus,
            refs: refs || [],
            contextHash: currentHash,
            contextChanged: contextDiff !== null,
          }
        }
      ]
    };
  } catch (error) {
    console.error(
      `Facade Error in handleRoleTransition for ${params.taskId}:`,
      error,
    );
    throw new InternalServerErrorException(
      `Facade: Could not handle role transition to '${params.roleId}' for task '${params.taskId}'.`,
    );
  }
}
```

## 7. Create Implementation and Testing Plan

### 1. Schema Updates

1. **Create new schemas:**
   - token-refs.schema.ts
   - get-context-diff.schema.ts
   - shorthand-command.schema.ts
   - role-transition.schema.ts

2. **Update existing schemas:**
   - Update UpdateTaskStatusSchema with shorthand support
   - Update DelegateTaskSchema with shorthand support
   - Add all new schemas to index.ts

### 2. Service Implementations

1. **Create new services:**
   - ContextManagementService
   - ShorthandParserService

2. **Add services to module:**
   - Update task-workflow.module.ts
   - Update services/index.ts

### 3. Tool Implementations

1. **Add new tools to TaskWorkflowService:**
   - getContextDiff
   - executeShorthandCommand
   - handleRoleTransition

2. **Update TaskWorkflowService constructor:**
   - Add the new services

### 4. Testing Plan

1. **Unit tests:**
   - Create unit tests for ContextManagementService
   - Create unit tests for ShorthandParserService
   - Add unit tests for new tools in TaskWorkflowService

2. **Integration tests:**
   - Test shorthand commands with real tasks
   - Test role transitions with context diff tracking
   - Test context slice retrieval


## 9. Performance Considerations

1. **Memory usage:**
   - Monitor context cache size
   - Implement LRU cache eviction if needed
   - Consider Redis for distributed caching in multi-instance deployments

2. **API response time:**
   - Benchmark context diff operations
   - Optimize large context handling
   - Add performance metrics logging

## Complete Implementation Summary

This implementation plan provides a comprehensive approach to enhancing your MCP server with token-efficient operations while maintaining full compatibility with your existing workflow. The key components are:

1. **Standardized References:** Using shorthand notations (TD, IP, BM, AR, etc.)
2. **Context Management:** Tracking changes and providing only diffs
3. **Shorthand Commands:** Compact syntax for common operations
4. **Role Transitions:** Optimized format for workflow transitions
5. **Schema Enhancements:** Supporting both full and shorthand formats

By implementing these enhancements, you can expect to reduce token usage by 40-60% in role transitions and command interactions, while maintaining the robust workflow structure that makes your system effective.