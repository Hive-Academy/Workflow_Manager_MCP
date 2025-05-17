# MCP Server Implementation Plan - Part 1

## Overview

This document outlines the implementation plan for creating an MCP (Model Context Protocol) server that will enhance the Roocode workflow system. The server will replace the current file-based task tracking system with a database-driven approach while preserving the existing workflow and role functionality.

## System Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────┐
│              Roocode Agent              │
│  ┌─────────────┐      ┌──────────────┐  │
│  │ MCP Client  │      │ AI Agent     │  │
│  │ Library     │      │ Modes (7)    │  │
│  └─────┬───────┘      └────────┬─────┘  │
└───────┬─────────────────────────┬───────┘
        │                         │
        ▼                         ▼
┌───────────────────────────────────────────┐
│           MCP Server Implementation        │
│  ┌────────────┐    ┌────────────────────┐ │
│  │ Resources  │    │ Tools              │ │
│  │ - Tasks    │    │ - Task Management  │ │
│  │ - Subtasks │    │ - Mode Operations  │ │
│  │ - Reports  │    │ - Git Operations   │ │
│  │ - Memory   │    │ - Workflow Control │ │
│  └────────────┘    └────────────────────┘ │
│                                           │
│  ┌────────────────────────────────────┐   │
│  │ Data Access Layer                  │   │
│  └───────────────────┬────────────────┘   │
└────────────────────────────────────────────┘
                       │
                       ▼
            ┌─────────────────────┐
            │ SQLite Database     │
            └─────────────────────┘
```

## Implementation Components

### 1. Core MCP Server Setup

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { DataAccess } from "./data-access";

export class RoocodeMcpServer {
  private server: McpServer;
  private dataAccess: DataAccess;

  constructor() {
    this.server = new McpServer({
      name: "Roocode Workflow Manager",
      version: "1.0.0"
    });
    
    this.dataAccess = new DataAccess();
    
    this.registerResources();
    this.registerTools();
    this.registerPrompts();
  }

  // Start the server with appropriate transport
  async start(transportType: "stdio" | "sse", options?: any) {
    let transport;
    
    if (transportType === "stdio") {
      transport = new StdioServerTransport();
    } else if (transportType === "sse") {
      // Setup Express and SSE transport
      transport = new SSEServerTransport(options.postEndpoint, options.response);
    }
    
    await this.server.connect(transport);
    console.log(`MCP Server started with ${transportType} transport`);
  }

  // Register resources, tools, and prompts in the following methods
  private registerResources() {
    // Implementation will be detailed below
  }

  private registerTools() {
    // Implementation will be detailed below
  }

  private registerPrompts() {
    // Implementation will be detailed below
  }
}
```

### 2. Data Access Layer

```typescript
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { TaskModel, SubtaskModel, ImplementationPlanModel /* etc */ } from "./models";

export class DataAccess {
  private db: Database | null = null;
  
  async initialize(dbPath: string = ':memory:'): Promise<void> {
    this.db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    
    // Initialize schema if needed
    await this.initializeSchema();
  }
  
  async initializeSchema(): Promise<void> {
    // Implementation of schema creation from database schema design
  }
  
  // Task operations
  async getTasks(): Promise<TaskModel[]> {
    return this.db?.all("SELECT * FROM tasks") || [];
  }
  
  async getTask(taskId: string): Promise<TaskModel | null> {
    return this.db?.get("SELECT * FROM tasks WHERE task_id = ?", taskId) || null;
  }
  
  async createTask(task: Omit<TaskModel, 'task_id'>): Promise<string> {
    // Implementation
    return taskId;
  }
  
  async updateTask(taskId: string, task: Partial<TaskModel>): Promise<boolean> {
    // Implementation
    return success;
  }
  
  // Similar methods for all entity types in the database schema
  // ...
  
  // Advanced query operations for workflow state management
  async getTasksInMode(mode: string): Promise<TaskModel[]> {
    return this.db?.all("SELECT * FROM tasks WHERE current_mode = ?", mode) || [];
  }
  
  async transitionTaskToMode(taskId: string, fromMode: string, toMode: string, reason?: string): Promise<boolean> {
    // Implementation
    return success;
  }
  
  // Memory bank operations
  async getMemoryBankEntries(fileType: string): Promise<any[]> {
    return this.db?.all("SELECT * FROM memory_bank WHERE file_type = ? ORDER BY line_start", fileType) || [];
  }
  
  async searchMemoryBank(query: string): Promise<any[]> {
    return this.db?.all("SELECT * FROM memory_bank_fts WHERE content MATCH ?", query) || [];
  }
}
```

### 3. Resource Implementations (Part 1)

```typescript
private registerResources() {
  // Task resources
  this.server.resource(
    "tasks",
    "tasks://list",
    async (uri) => {
      const tasks = await this.dataAccess.getTasks();
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(tasks)
        }]
      };
    }
  );
  
  this.server.resource(
    "task",
    new ResourceTemplate("tasks://{taskId}", { list: undefined }),
    async (uri, { taskId }) => {
      const task = await this.dataAccess.getTask(taskId);
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(task)
        }]
      };
    }
  );
  
  // Task description resource
  this.server.resource(
    "taskDescription",
    new ResourceTemplate("tasks://{taskId}/description", { list: undefined }),
    async (uri, { taskId }) => {
      const description = await this.dataAccess.getTaskDescription(taskId);
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(description)
        }]
      };
    }
  );



  // Implementation plan resource
  this.server.resource(
    "implementationPlan",
    new ResourceTemplate("tasks://{taskId}/implementation-plan", { list: undefined }),
    async (uri, { taskId }) => {
      const plan = await this.dataAccess.getImplementationPlan(taskId);
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(plan)
        }]
      };
    }
  );
  
  // Subtasks resource
  this.server.resource(
    "subtasks",
    new ResourceTemplate("tasks://{taskId}/subtasks", { list: undefined }),
    async (uri, { taskId }) => {
      const subtasks = await this.dataAccess.getSubtasks(taskId);
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(subtasks)
        }]
      };
    }
  );
  
  // Code review resource
  this.server.resource(
    "codeReview",
    new ResourceTemplate("tasks://{taskId}/code-review", { list: undefined }),
    async (uri, { taskId }) => {
      const review = await this.dataAccess.getCodeReview(taskId);
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(review)
        }]
      };
    }
  );
  
  // Research report resource
  this.server.resource(
    "researchReport",
    new ResourceTemplate("tasks://{taskId}/research-report", { list: undefined }),
    async (uri, { taskId }) => {
      const report = await this.dataAccess.getResearchReport(taskId);
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(report)
        }]
      };
    }
  );
  
  // Completion report resource
  this.server.resource(
    "completionReport",
    new ResourceTemplate("tasks://{taskId}/completion-report", { list: undefined }),
    async (uri, { taskId }) => {
      const report = await this.dataAccess.getCompletionReport(taskId);
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(report)
        }]
      };
    }
  );
  
  // Memory bank resources
  this.server.resource(
    "memoryBank",
    new ResourceTemplate("memory-bank://{fileType}", { list: undefined }),
    async (uri, { fileType }) => {
      const entries = await this.dataAccess.getMemoryBankEntries(fileType);
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(entries)
        }]
      };
    }
  );
  
  // Template resources
  this.server.resource(
    "template",
    new ResourceTemplate("templates://{templateName}", { list: undefined }),
    async (uri, { templateName }) => {
      const template = await this.dataAccess.getTemplate(templateName);
      return {
        contents: [{
          uri: uri.href,
          text: template?.content || "Template not found"
        }]
      };
    }
  );
}
```

### 4. Tool Implementations (Part 1)

```typescript
private registerTools() {
  // Task management tools
  this.server.tool(
    "createTask",
    {
      name: z.string(),
      description: z.string(),
      businessRequirements: z.string(),
      technicalRequirements: z.string(), 
      acceptanceCriteria: z.array(z.string()),
      priority: z.string().optional(),
      dependencies: z.array(z.string()).optional()
    },
    async ({ name, description, businessRequirements, technicalRequirements, acceptanceCriteria, priority, dependencies }) => {
      const taskId = await this.dataAccess.createTask({
        name,
        status: 'Not Started',
        creation_date: new Date().toISOString(),
        current_mode: 'boomerang',
        priority: priority || 'Medium',
        dependencies: JSON.stringify(dependencies || [])
      });
      
      await this.dataAccess.createTaskDescription({
        task_id: taskId,
        description,
        business_requirements: businessRequirements,
        technical_requirements: technicalRequirements,
        acceptance_criteria: JSON.stringify(acceptanceCriteria),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      return {
        content: [{ type: "text", text: `Task created with ID: ${taskId}` }]
      };
    }
  );
  
  // Implementation plan creation
  this.server.tool(
    "createImplementationPlan",
    {
      taskId: z.string(),
      overview: z.string(),
      approach: z.string(),
      technicalDecisions: z.string(),
      filesToModify: z.array(z.string())
    },
    async ({ taskId, overview, approach, technicalDecisions, filesToModify }) => {
      const planId = await this.dataAccess.createImplementationPlan({
        task_id: taskId,
        overview,
        approach,
        technical_decisions: technicalDecisions,
        files_to_modify: JSON.stringify(filesToModify),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: 'architect'
      });
      
      return {
        content: [{ type: "text", text: `Implementation plan created with ID: ${planId}` }]
      };
    }
  );

  // Subtask management
  this.server.tool(
    "createSubtask",
    {
      taskId: z.string(),
      planId: z.number(),
      name: z.string(),
      description: z.string(),
      sequenceNumber: z.number(),
      estimatedDuration: z.string().optional()
    },
    async ({ taskId, planId, name, description, sequenceNumber, estimatedDuration }) => {
      const subtaskId = await this.dataAccess.createSubtask({
        task_id: taskId,
        plan_id: planId,
        name,
        description,
        sequence_number: sequenceNumber,
        status: 'Not Started',
        estimated_duration: estimatedDuration
      });
      
      return {
        content: [{ type: "text", text: `Subtask created with ID: ${subtaskId}` }]
      };
    }
  );

# MCP Server Implementation Plan - Part 3

Continuing with the tool implementations:

```typescript
  this.server.tool(
    "updateSubtaskStatus",
    {
      subtaskId: z.number(),
      status: z.string(),
      notes: z.string().optional()
    },
    async ({ subtaskId, status, notes }) => {
      const updated = await this.dataAccess.updateSubtask(subtaskId, {
        status,
        ...(status === 'In Progress' ? { started_at: new Date().toISOString() } : {}),
        ...(status === 'Completed' ? { completed_at: new Date().toISOString() } : {})
      });
      
      if (notes) {
        const subtask = await this.dataAccess.getSubtask(subtaskId);
        await this.dataAccess.createComment({
          task_id: subtask.task_id,
          subtask_id: subtaskId,
          mode: 'system',
          content: notes,
          created_at: new Date().toISOString()
        });
      }
      
      return {
        content: [{ type: "text", text: `Subtask status updated to: ${status}` }]
      };
    }
  );

  // Delegation management
  this.server.tool(
    "delegateTask",
    {
      taskId: z.string(),
      fromMode: z.string(),
      toMode: z.string(),
      message: z.string()
    },
    async ({ taskId, fromMode, toMode, message }) => {
      // First check if this is a valid workflow transition
      const isValidTransition = await this.validateWorkflowTransition(fromMode, toMode);
      if (!isValidTransition) {
        return {
          content: [{ type: "text", text: `Invalid workflow transition from ${fromMode} to ${toMode}` }],
          isError: true
        };
      }
      
      // Create delegation record
      const delegationId = await this.dataAccess.createDelegationRecord({
        task_id: taskId,
        from_mode: fromMode,
        to_mode: toMode,
        delegation_timestamp: new Date().toISOString(),
        success: true
      });
      
      // Update task current mode
      await this.dataAccess.updateTask(taskId, {
        current_mode: toMode
      });
      
      // Record workflow transition
      await this.dataAccess.createWorkflowTransition({
        task_id: taskId,
        from_mode: fromMode,
        to_mode: toMode,
        transition_timestamp: new Date().toISOString(),
        reason: message
      });
      
      return {
        content: [{ type: "text", text: `Task delegated from ${fromMode} to ${toMode}` }]
      };
    }
  );

  this.server.tool(
    "delegateSubtask",
    {
      subtaskId: z.number(),
      fromMode: z.string(),
      toMode: z.string(),
      message: z.string()
    },
    async ({ subtaskId, fromMode, toMode, message }) => {
      const subtask = await this.dataAccess.getSubtask(subtaskId);
      
      // Create delegation record
      const delegationId = await this.dataAccess.createDelegationRecord({
        task_id: subtask.task_id,
        subtask_id: subtaskId,
        from_mode: fromMode,
        to_mode: toMode,
        delegation_timestamp: new Date().toISOString(),
        success: true
      });
      
      // Update subtask
      await this.dataAccess.updateSubtask(subtaskId, {
        assigned_to: toMode,
        status: 'In Progress',
        started_at: new Date().toISOString()
      });
      
      // Create a comment with the delegation message
      await this.dataAccess.createComment({
        task_id: subtask.task_id,
        subtask_id: subtaskId,
        mode: fromMode,
        content: message,
        created_at: new Date().toISOString()
      });
      
      return {
        content: [{ type: "text", text: `Subtask delegated from ${fromMode} to ${toMode}` }]
      };
    }
  );
  
  // Research report creation and management
  this.server.tool(
    "createResearchReport",
    {
      taskId: z.string(),
      title: z.string(),
      summary: z.string(),
      findings: z.string(),
      recommendations: z.string(),
      references: z.array(z.string())
    },
    async ({ taskId, title, summary, findings, recommendations, references }) => {
      const reportId = await this.dataAccess.createResearchReport({
        task_id: taskId,
        title,
        summary,
        findings,
        recommendations,
        references: JSON.stringify(references),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      return {
        content: [{ type: "text", text: `Research report created with ID: ${reportId}` }]
      };
    }
  );
```

### 5. Tool Implementations (Part 2)

```typescript
  // Code review management
  this.server.tool(
    "createCodeReview",
    {
      taskId: z.string(),
      status: z.string(),
      summary: z.string(),
      strengths: z.string(),
      issues: z.string(),
      acceptanceCriteriaVerification: z.record(z.string()),
      manualTestingResults: z.string(),
      requiredChanges: z.string().optional()
    },
    async ({ taskId, status, summary, strengths, issues, acceptanceCriteriaVerification, manualTestingResults, requiredChanges }) => {
      const reviewId = await this.dataAccess.createCodeReview({
        task_id: taskId,
        status,
        summary,
        strengths,
        issues,
        acceptance_criteria_verification: JSON.stringify(acceptanceCriteriaVerification),
        manual_testing_results: manualTestingResults,
        required_changes: requiredChanges,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      // If status is NEEDS CHANGES, update task redelegation count
      if (status === 'NEEDS CHANGES') {
        const task = await this.dataAccess.getTask(taskId);
        await this.dataAccess.updateTask(taskId, {
          redelegation_count: (task.redelegation_count || 0) + 1
        });
      }
      
      return {
        content: [{ type: "text", text: `Code review created with ID: ${reviewId}` }]
      };
    }
  );
  
  // Completion report management
  this.server.tool(
    "createCompletionReport",
    {
      taskId: z.string(),
      summary: z.string(),
      filesModified: z.array(z.string()),
      delegationSummary: z.string(),
      acceptanceCriteriaVerification: z.record(z.string())
    },
    async ({ taskId, summary, filesModified, delegationSummary, acceptanceCriteriaVerification }) => {
      const reportId = await this.dataAccess.createCompletionReport({
        task_id: taskId,
        summary,
        files_modified: JSON.stringify(filesModified),
        delegation_summary: delegationSummary,
        acceptance_criteria_verification: JSON.stringify(acceptanceCriteriaVerification),
        created_at: new Date().toISOString()
      });
      
      // Update task status to completed
      await this.dataAccess.updateTask(taskId, {
        status: 'Completed',
        completion_date: new Date().toISOString()
      });
      
      return {
        content: [{ type: "text", text: `Completion report created with ID: ${reportId}` }]
      };
    }
  );
  
  // Memory bank management
  this.server.tool(
    "updateMemoryBank",
    {
      fileType: z.string(),
      section: z.string(),
      content: z.string(),
      lineStart: z.number().optional(),
      lineEnd: z.number().optional()
    },
    async ({ fileType, section, content, lineStart, lineEnd }) => {
      // Check if section exists
      const existing = await this.dataAccess.getMemoryBankSection(fileType, section);
      
      if (existing) {
        // Update existing section
        await this.dataAccess.updateMemoryBankEntry(existing.entry_id, {
          content,
          line_start: lineStart || existing.line_start,
          line_end: lineEnd || existing.line_end,
          last_updated: new Date().toISOString()
        });
      } else {
        // Create new section
        await this.dataAccess.createMemoryBankEntry({
          file_type: fileType,
          section,
          content,
          line_start: lineStart || 0,
          line_end: lineEnd || 0,
          last_updated: new Date().toISOString()
        });
      }
      
      return {
        content: [{ type: "text", text: `Memory bank section "${section}" in ${fileType} updated` }]
      };
    }
  );

# MCP Server Implementation Plan - Part 4

Continuing with additional tool implementations:

```typescript
  // Git operations
  this.server.tool(
    "createCommit",
    {
      taskId: z.string(),
      subtaskId: z.number().optional(),
      message: z.string(),
      filesChanged: z.array(z.string()),
      author: z.string()
    },
    async ({ taskId, subtaskId, message, filesChanged, author }) => {
      // This is a mock implementation - in a real system, this would invoke git commands
      // For now, we'll just record the commit information
      const commitId = await this.dataAccess.createCommit({
        task_id: taskId,
        subtask_id: subtaskId,
        hash: `mock-${Date.now().toString(16)}`,
        message,
        files_changed: JSON.stringify(filesChanged),
        commit_timestamp: new Date().toISOString(),
        author
      });
      
      return {
        content: [{ type: "text", text: `Commit recorded with ID: ${commitId}` }]
      };
    }
  );
  
  // Task search and filtering
  this.server.tool(
    "searchTasks",
    {
      query: z.string(),
      status: z.string().optional(),
      mode: z.string().optional()
    },
    async ({ query, status, mode }) => {
      const results = await this.dataAccess.searchTasks(query, status, mode);
      
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(results, null, 2)
        }]
      };
    }
  );
  
  // Memory bank search
  this.server.tool(
    "searchMemoryBank",
    {
      query: z.string(),
      fileType: z.string().optional()
    },
    async ({ query, fileType }) => {
      const results = await this.dataAccess.searchMemoryBank(query, fileType);
      
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(results, null, 2)
        }]
      };
    }
  );

  // Helper method to validate workflow transitions
  private async validateWorkflowTransition(fromMode: string, toMode: string): Promise<boolean> {
    // Define valid transitions based on the workflow
    const validTransitions: Record<string, string[]> = {
      'boomerang': ['architect', 'researcher-expert'],
      'architect': ['senior-developer', 'code-review', 'boomerang'],
      'senior-developer': ['junior-coder', 'junior-tester', 'architect'],
      'junior-coder': ['senior-developer'],
      'junior-tester': ['senior-developer'],
      'code-review': ['architect'],
      'researcher-expert': ['boomerang']
    };
    
    return validTransitions[fromMode]?.includes(toMode) || false;
  }
}
```

### 6. Prompt Implementations

```typescript
private registerPrompts() {
  // Task description prompt
  this.server.prompt(
    "create-task-description",
    {
      taskName: z.string(),
      projectContext: z.string(),
      businessRequirements: z.string(),
      technicalRequirements: z.string().optional()
    },
    ({ taskName, projectContext, businessRequirements, technicalRequirements }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `
# Task: ${taskName}

## Project Context
${projectContext}

## Business Requirements
${businessRequirements}

${technicalRequirements ? `## Technical Requirements\n${technicalRequirements}` : ''}

Please analyze these requirements and create a comprehensive task description with the following sections:
1. Task Overview
2. Business Requirements Analysis
3. Technical Context
4. Component Structure
5. Detailed Requirements
6. Acceptance Criteria Checklist
7. Implementation Guidance

Be specific, actionable, and thorough in your analysis.
`
        }
      }]
    })
  );
  
  // Implementation plan prompt
  this.server.prompt(
    "create-implementation-plan",
    {
      taskId: z.string(),
      taskDescription: z.string(),
      codebaseAnalysis: z.string(),
      memoryBankInsights: z.string()
    },
    ({ taskId, taskDescription, codebaseAnalysis, memoryBankInsights }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `
# Create Implementation Plan for Task ${taskId}

## Task Description
${taskDescription}

## Codebase Analysis
${codebaseAnalysis}

## Memory Bank Insights
${memoryBankInsights}

Please create a FOCUSED and CONCISE implementation plan with the following sections:
1. Brief Technical Summary (3-4 paragraphs)
2. Implementation Approach
3. Key Technical Decisions
4. Subtasks with Clear Boundaries and Interfaces
5. Testing Strategy
6. Component Delegation Strategy

Focus on practical implementation steps, not repeating business logic analysis. Define clear subtasks with specific files to modify, implementation details, and integration points.
`
        }
      }]
    })
  );
```

### 7. Additional Prompt Implementations

```typescript
  // Code review prompt
  this.server.prompt(
    "code-review",
    {
      taskId: z.string(),
      implementationDetails: z.string(),
      acceptanceCriteria: z.string(),
      codeChanges: z.string()
    },
    ({ taskId, implementationDetails, acceptanceCriteria, codeChanges }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `
# Code Review for Task ${taskId}

## Implementation Details
${implementationDetails}

## Acceptance Criteria
${acceptanceCriteria}

## Code Changes
${codeChanges}

Please conduct a thorough review of this implementation, focusing on:
1. Code correctness and functionality
2. Code quality and standards
3. Test coverage and quality
4. Security considerations
5. Performance aspects
6. Adherence to acceptance criteria
7. Manual testing results

Determine if the implementation should be APPROVED, APPROVED WITH RESERVATIONS, or NEEDS CHANGES. Provide clear, specific feedback on strengths and issues, particularly focusing on acceptance criteria verification.
`
        }
      }]
    })
  );
  
  // Research request prompt
  this.server.prompt(
    "research-request",
    {
      topic: z.string(),
      currentKnowledge: z.string(),
      specificQuestions: z.string(),
      timeConstraints: z.string().optional()
    },
    ({ topic, currentKnowledge, specificQuestions, timeConstraints }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `
# Research Request: ${topic}

## Current Knowledge Context
${currentKnowledge}

## Specific Questions Needing Answers
${specificQuestions}

${timeConstraints ? `## Time Constraints\n${timeConstraints}` : ''}

Please conduct comprehensive research on this topic, focusing on:
1. Current state of technologies/approaches
2. Architectural patterns and best practices
3. Implementation strategies
4. Integration considerations
5. Component design patterns

Provide a detailed research report with specific, actionable insights that can directly inform our implementation approach.
`
        }
      }]
    })
  );
  
  // Acceptance criteria verification prompt
  this.server.prompt(
    "verify-acceptance-criteria",
    {
      taskId: z.string(),
      acceptanceCriteria: z.string(),
      implementation: z.string(),
      testResults: z.string()
    },
    ({ taskId, acceptanceCriteria, implementation, testResults }) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: `
# Acceptance Criteria Verification for Task ${taskId}

## Acceptance Criteria
${acceptanceCriteria}

## Implementation Details
${implementation}

## Test Results
${testResults}

Please verify each acceptance criterion explicitly and provide:
1. Status: SATISFIED, PARTIALLY SATISFIED, or NOT SATISFIED
2. Evidence of satisfaction (or lack thereof) from the implementation
3. Verification method used
4. Any relevant notes or observations

Be thorough and specific in your assessment. Each criterion must be fully satisfied for the implementation to be considered complete.
`
        }
      }]
    })
  );
}
```

## Implementation Phases

The MCP server implementation will be rolled out in phases:

### Phase 1: Core Infrastructure 
- Set up SQLite database schema
- Implement basic MCP server structure
- Create data access layer
- Implement core resources and tools
- Basic CLI integration

### Phase 2: Workflow Integration 
- Complete all resources, tools, and prompts
- Implement workflow state management
- Task delegation and transition handling
- Mode-specific operations
- Rule transformation layer

### Phase 3: Migration and Testing 
- Data migration tools for existing tasks
- Testing with real workflows
- Performance optimization
- Error handling improvements

### Phase 4: Documentation and Deployment 
- Documentation for API usage
- Integration guides for CLI
- Deployment scripts
- User guides and examples
