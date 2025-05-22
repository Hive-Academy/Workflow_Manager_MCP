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
