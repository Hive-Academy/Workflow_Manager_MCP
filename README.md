# MCP Workflow Manager (NestJS, Prisma, @rekog/mcp-nest)

This project is a modern, scalable implementation of a Workflow Manager MCP server using [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), and [`@rekog/mcp-nest`](https://www.npmjs.com/package/@rekog/mcp-nest). It replaces the legacy file-system-based architecture with a robust, modular, and type-safe backend.

## Key Features

- **NestJS**: Modular, dependency-injected application structure
- **Prisma**: Type-safe ORM for all database operations
- **@rekog/mcp-nest**: Exposes MCP tools as decorated NestJS service methods
- **Zod**: Schema validation for all tool parameters
- **Comprehensive Workflow Tools**: Includes task creation, status updates, delegation, dashboard, workflow map, role transitions, and more

## Project Setup

```bash
npm install
```

## Running the Project

```bash
# Development
npm run start

# Watch mode
yarn start:dev

# Production
npm run start:prod
```

## MCP Tools Overview

- All MCP tools are defined as methods in NestJS services, decorated with `@Tool()` from `@rekog/mcp-nest`.
- Tool parameters are validated using Zod schemas (see `src/task-workflow/schemas/`).
- Core tools include:
  - `create_task`, `get_task_context`, `update_task_status`, `list_tasks`, `delete_task`, `add_task_note`, `get_task_status`, `delegate_task`, `complete_task`, `get_current_mode_for_task`, `continue_task`, `task_dashboard`, `workflow_map`, `transition_role`, `workflow_status`, `process_command`

## Database & Prisma

- Database schema is defined in `prisma/schema.prisma`.
- Use `npx prisma migrate dev` for local development and migrations.
- `PrismaService` is provided via a dedicated NestJS module.

## Memory Bank & Documentation

- See `memory-bank/DeveloperGuide.md` and `memory-bank/TechnicalArchitecture.md` for best practices, architecture, and workflow details.

## Updating the System

- When adding or refactoring MCP tools, update the Zod schemas and service methods accordingly.
- Update the memory bank files to reflect any architectural or workflow changes.

## Testing

- Unit and integration tests are located in `src/**/*.spec.ts`.
- Run all tests with:

```bash
npm run test
```

## Deployment

- See the [NestJS deployment guide](https://docs.nestjs.com/deployment) and Prisma documentation for production best practices.

## License

MIT

"workflow-manager": {
"command": "docker",
"args": [
"run",
"--rm",
"-i",
"-v",
"mcp-workflow-data:/app/data",
"hiveacademy/mcp-workflow-manager"
]
}
