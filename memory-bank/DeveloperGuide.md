# Developer Guide

This guide provides essential information for developers working on this project, including setup, coding standards, architectural patterns, and best practices. With the adoption of NestJS, Prisma, and `@rekog/mcp-nest`, this guide has been updated to reflect these technologies.

## 1. Development Setup

### 1.1. Prerequisites

- Node.js 18+ (ESM support recommended)
- npm 8+ or yarn
- TypeScript 5.8+
- Cursor IDE (or your preferred IDE with strong TypeScript support)
- Docker (for local database instances if not using a cloud provider)

### 1.2. Initial Project Installation

```bash
npm install
```

### 1.3. Setting up NestJS, Prisma, and @rekog/mcp-nest

- NestJS provides the application structure and DI system.
- Prisma is used for all database operations (see `prisma/schema.prisma`).
- `@rekog/mcp-nest` exposes MCP tools as decorated service methods.
- Zod is used for all tool parameter validation.

## 2. Project Structure

- See `memory-bank/TechnicalArchitecture.md` for a detailed architecture diagram and explanation of the overall NestJS architecture.
- The `TaskWorkflowModule` (located in `src/task-workflow/`) is a key feature module. It is internally structured using a Domain-Driven Design (DDD) approach:
  - **`src/task-workflow/domains/`**: This directory contains subdirectories for each domain/feature area (e.g., `crud`, `query`, `state`, `interaction`, `plan`, `reporting`).
  - Within each domain folder (e.g., `src/task-workflow/domains/crud/`):
    - **MCP Operation Services** (e.g., `task-crud-operations.service.ts`): These services expose MCP tools using `@Tool` decorators from `@rekog/mcp-nest`. They handle MCP request/response formatting and delegate business logic to core services.
    - **Core Business Logic Services** (e.g., `task-crud.service.ts`): These services implement the actual business logic for the domain, often interacting with Prisma.
    - **Schemas** (e.g., in a `schemas/` subdirectory like `task-crud.schema.ts`): Zod schemas define the input parameters for MCP tools and may also define shapes for internal data structures.
- The old facade (`task-workflow.service.ts`) and utility directories (`mcp-operations/`, `services/`, `schemas/` directly under `src/task-workflow/`) have been removed and their responsibilities redistributed into the new domain structure.

## 3. Coding Standards & Best Practices

- Follow NestJS modularity and DI patterns.
- Use Prisma's type-safe client and schema-first migrations.
- All MCP tool parameters must be validated with Zod.
- See the "Technical Architecture" file for more details.

## 4. Testing

- Unit and integration tests are required for all MCP tools and services.
- Use Jest and NestJS testing utilities.

## 5. Updating the Memory Bank

- When refactoring or adding tools, update this guide and `TechnicalArchitecture.md`.
- Ensure all new tools are documented and best practices are followed.

## 6. Deployment

- Build with `npm run build`.
- Run migrations with `npx prisma migrate deploy`.
- Start with `npm run start:prod`.

## 7. Support

- For questions, see the project README or contact the maintainers.

## 8. MCP Tool Usage Best Practices

### 8.1. Standardized Responses for Unchanged/Not Found/Empty Contexts

Many MCP tools that retrieve context or data have been standardized to return a specific two-part text-based JSON response when the requested context is unchanged, not found, or the data is empty. This helps in reducing ambiguity and allows clients (like AI agents) to efficiently handle these common scenarios.

**Response Format:**

The first part of the response is a human-readable text message, and the second part is a stringified JSON object providing details.

_Example for "Not Found":_

```json
// Part 1 (Human-readable)
"No research-report context found for task TSK-001."
// Part 2 (Stringified JSON details)
"{\"notFound\":true,\"contextIdentifier\":\"research-report\"}"
```

_Example for "Unchanged" (typically from `getContextDiff`):_

```json
// Part 1
"No changes to task-description context for task TSK-001 since last retrieval."
// Part 2
"{\"unchanged\":true,\"contextHash\":\"abcdef123456\",\"contextIdentifier\":\"task-description\"}"
```

_Example for "Empty" (e.g., an empty list of tasks):_

```json
// Part 1
"Task list is empty based on the provided filters."
// Part 2
"{\"empty\":true,\"contextIdentifier\":\"task-list\"}"
```

Key fields in the stringified JSON part:

- `unchanged: true`: Indicates the context slice has not changed since a previous hash was known.
- `notFound: true`: Indicates the requested data or entity does not exist.
- `empty: true`: Indicates that a normally list-based result is empty (e.g., no tasks found).
- `contextHash: "..."`: The hash of the context if it's unchanged (mainly from `getContextDiff`).
- `contextIdentifier: "..."`: A descriptive kebab-case string identifying the type of context (e.g., `task-status`, `ip-batch-b001`, `research-report`).

### 8.2. Efficient Context Retrieval: Prefer `getContextDiff`

To maximize token efficiency and minimize redundant data transfer, **it is strongly recommended to preferentially use the `mcp:get_context_diff(taskId, lastContextHash, sliceType)` tool when you need to check for updates to a known piece of context or retrieve its current version.**

- **When to use `mcp:get_context_diff`**:

  - You have previously fetched a context slice (e.g., Task Description, Implementation Plan, a specific report).
  - You have the `lastContextHash` that was returned with that slice.
  - You want to know if that slice has changed and, if so, get the new version.
  - `getContextDiff` will efficiently tell you if it's `unchanged` (returning the hash again) or provide the updated content if it has changed.

- **When to use `mcp:get_task_context(taskId, sliceType)`**:

  - You are fetching a specific context slice (e.g., `taskDescription`, `implementationPlan`) for the _first time_ for a given task.
  - You do not have a `lastContextHash` for that slice.
  - You explicitly need a full refresh of that slice, regardless of changes.

- **When to use `mcp:get_task_context(taskId)` (without `sliceType`)**:
  - You need the entire task object's current state (e.g., for initial task loading by Boomerang, which includes status, notes, core description, etc.). This is a more comprehensive, and thus larger, data retrieval.

Refer to the "Context Management" section in `enhanced-workflow-rules/000-workflow-core.md` for further guidance on these principles within the AI agent workflow.
