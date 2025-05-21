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

- See `memory-bank/TechnicalArchitecture.md` for a detailed architecture diagram and explanation.
- MCP tools are implemented in `src/task-workflow/task-workflow.service.ts` and related services.
- Zod schemas for tool parameters are in `src/task-workflow/schemas/`.

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
