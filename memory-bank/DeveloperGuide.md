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
# Clone the repository (if not already done)
# git clone <repository-url>
# cd <project-directory>

# Install core dependencies
npm install

# Install NestJS CLI globally (if you don't have it)
npm install -g @nestjs/cli

# Install Prisma CLI as a dev dependency (usually done per project)
npm install prisma --save-dev
```

### 1.3. Setting up NestJS, Prisma, and @rekog/mcp-nest

The project leverages NestJS for its backend architecture, Prisma as its ORM, and `@rekog/mcp-nest` for Model Context Protocol (MCP) server implementation.

**1.3.1. NestJS Setup (if starting a new NestJS project or module area)**
- Create a new NestJS project (if applicable): `nest new your-project-name`
- For existing projects, NestJS core libraries (`@nestjs/common`, `@nestjs/core`, etc.) are already part of `package.json`.

**1.3.2. Prisma Setup**
1.  **Initialize Prisma**: If adding Prisma to a new project area or for the first time:
    ```bash
    npx prisma init --datasource-provider postgresql # (or your chosen DB: mysql, sqlite, sqlserver, mongodb)
    ```
    This creates a `prisma` directory with a `schema.prisma` file and updates your `.env` file with a `DATABASE_URL` placeholder.
2.  **Define Your Schema**: Edit `prisma/schema.prisma` to define your database models.
    Example:
    ```prisma
    // prisma/schema.prisma
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }

    generator client {
      provider = "prisma-client-js"
    }

    model User {
      id    Int     @id @default(autoincrement())
      email String  @unique
      name  String?
      posts Post[]
    }

    model Post {
      id        Int     @id @default(autoincrement())
      title     String
      content   String?
      published Boolean @default(false)
      author    User?   @relation(fields: [authorId], references: [id])
      authorId  Int?
    }
    ```
3.  **Database Migrations**:
    ```bash
    # Create and apply a new migration based on schema changes (development)
    npx prisma migrate dev --name initial-migration_or_descriptive_name

    # Generate Prisma Client (often run automatically by migrate dev, or run manually)
    npx prisma generate
    ```
    For production, use `npx prisma migrate deploy`.

**1.3.3. @rekog/mcp-nest Setup**
1.  **Install Packages**:
    ```bash
    npm install @rekog/mcp-nest @modelcontextprotocol/sdk zod
    # Also ensure you have @nestjs/common, @nestjs/core, reflect-metadata, rxjs
    ```
    *Clarification*: `@rekog/mcp-nest` is an npm package. The command `npm install @rekog/mcp-nest --save` (or simply `npm install @rekog/mcp-nest`) is how you add it to your project's dependencies. There isn't a separate, manual installation process beyond this standard npm package management.

## 2. Project Structure (Illustrative with NestJS Focus)

While the existing `workflow-manager` project has its structure, a typical NestJS application integrating Prisma and MCP tools might look like this:

```
your-project-name/
├── prisma/                     # Prisma schema and migration files
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app.module.ts           # Root application module
│   ├── main.ts                 # Application entry point
│   ├── config/                 # Configuration management (e.g., using @nestjs/config)
│   ├── core/                   # Core modules like PrismaService, Auth
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   └── auth/
│   │       ├── auth.guard.ts
│   │       └── auth.module.ts
│   ├── features/               # Feature-specific modules
│   │   ├── user/
│   │   │   ├── user.module.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── dto/user.dto.ts
│   │   └── post/
│   │       └── ...
│   ├── mcp/                    # MCP related logic
│   │   ├── mcp.module.ts         # Module to initialize @rekog/mcp-nest
│   │   ├── tools/
│   │   │   ├── example.tool.service.ts
│   │   │   └── example.tool.module.ts (optional, for organizing tool services)
│   │   └── resources/
│   │       └── ...
├── test/                       # Test files (unit, e2e)
├── .env                        # Environment variables (DATABASE_URL, etc.)
├── nest-cli.json
├── package.json
├── tsconfig.json
└── ...
```

## 3. Coding Standards & Best Practices

### 3.1. NestJS Best Practices

1.  **Modularity**:
    *   Organize code into feature modules (`@Module()`). Each module encapsulates related controllers, services, DTOs, and potentially entities.
    *   Import required modules into other modules as needed. The `AppModule` is the root.
2.  **Controllers (`@Controller()`)**:
    *   Handle incoming HTTP requests and route them to appropriate service methods.
    *   Keep controllers lean; delegate business logic to services.
    *   Use decorators like `@Get()`, `@Post()`, `@Body()`, `@Param()`, `@Query()`.
3.  **Services/Providers (`@Injectable()`)**:
    *   Encapsulate business logic, data access logic (e.g., using PrismaService), and other tasks.
    *   Services are injectable into controllers or other services.
4.  **Dependency Injection (DI)**:
    *   Leverage NestJS's powerful DI system. Declare services as `@Injectable()` and list them in a module's `providers` array. Inject them using constructor parameters.
5.  **DTOs (Data Transfer Objects)**:
    *   Use classes to define the shape of request and response payloads.
    *   Use `class-validator` and `class-transformer` libraries along with NestJS's `ValidationPipe` for automatic request validation.
    Example DTO:
    ```typescript
    // src/features/user/dto/create-user.dto.ts
    import { IsEmail, IsString, MinLength } from 'class-validator';

    export class CreateUserDto {
      @IsEmail()
      email: string;

      @IsString()
      @MinLength(3)
      name: string;
    }
    ```
6.  **Configuration Management**:
    *   Use the `@nestjs/config` module for managing environment variables and application configuration. Access configuration via `ConfigService`.
7.  **Asynchronous Operations**:
    *   Use `async/await` for all asynchronous operations (e.g., database calls, external API requests).
    *   Ensure proper error handling in async methods.
8.  **Error Handling**:
    *   NestJS has built-in exception filters. You can create custom exception filters to handle specific error types and customize responses.
    *   Throw standard NestJS exceptions (e.g., `NotFoundException`, `BadRequestException`) or custom exceptions.
9.  **Lifecycle Events**: Implement lifecycle hooks like `OnModuleInit`, `OnApplicationBootstrap` in your services or modules if needed (e.g., `PrismaService` connecting to DB).

### 3.2. Prisma Best Practices

1.  **`PrismaService`**:
    *   Create a dedicated `PrismaService` that extends `PrismaClient` and implements `OnModuleInit` to connect to the database and `OnModuleDestroy` to disconnect.
    *   This service should be part of a `PrismaModule` which exports `PrismaService`.
    Example `PrismaService`:
    ```typescript
    // src/core/prisma/prisma.service.ts
    import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
    import { PrismaClient } from '@prisma/client';

    @Injectable()
    export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
      async onModuleInit() {
        await this.$connect();
      }

      async onModuleDestroy() {
        await this.$disconnect();
      }
    }
    ```
    Example `PrismaModule`:
    ```typescript
    // src/core/prisma/prisma.module.ts
    import { Global, Module } from '@nestjs/common';
    import { PrismaService } from './prisma.service';

    @Global() // Optional: makes PrismaService available project-wide without importing PrismaModule
    @Module({
      providers: [PrismaService],
      exports: [PrismaService],
    })
    export class PrismaModule {}
    ```
    Remember to import `PrismaModule` in your `AppModule` (or feature modules if not global).
2.  **Schema as Source of Truth**: Your `prisma/schema.prisma` file is the single source of truth for your database schema.
3.  **Migrations**:
    *   Always use `npx prisma migrate dev` in development. Review generated SQL migration files.
    *   For production, use `npx prisma migrate deploy`.
4.  **Type Safety**:
    *   Leverage Prisma Client's generated types in your services and DTOs to maintain end-to-end type safety.
    *   Use `Prisma.ModelNameCreateInput`, `Prisma.ModelNameUpdateInput`, etc., for type-hinting data for Prisma operations.
5.  **Transaction Management**: Use Prisma's transaction API (`this.prisma.$transaction([...])`) for operations that need to be atomic.
6.  **Error Handling**: Handle Prisma-specific errors (e.g., `PrismaClientKnownRequestError` for unique constraint violations P2002).
7.  **Seeding**: Use Prisma's seeding capabilities (`prisma db seed`) to populate development/test databases. Create a `prisma/seed.ts` file.
8.  **Query Optimization**: Be mindful of N+1 problems. Use Prisma's `include` or `select` options to fetch related data efficiently.

### 3.3. @rekog/mcp-nest Best Practices & Usage

1.  **Module Setup**:
    *   Import `McpModule.forRootAsync()` or `McpModule.forRoot()` in your main application module (e.g., `AppModule` or a dedicated `McpModule`).
    Example using `forRootAsync` with `ConfigService`:
    ```typescript
    // src/mcp/mcp.module.ts or app.module.ts
    import { Module } from '@nestjs/common';
    import { McpModule } from '@rekog/mcp-nest';
    import { ConfigModule, ConfigService } from '@nestjs/config';
    // import { MyAuthGuard } from '../core/auth/auth.guard';
    // import { ExampleToolService } from './tools/example.tool.service';

    @Module({
      imports: [
        ConfigModule, // Ensure ConfigModule is imported if using ConfigService
        McpModule.forRootAsync({
          imports: [ConfigModule /* , AuthModule if MyAuthGuard needs it */],
          useFactory: async (configService: ConfigService) => ({
            name: configService.get<string>('MCP_SERVER_NAME', 'MyDefaultMcpServer'),
            version: configService.get<string>('MCP_SERVER_VERSION', '0.1.0'),
            // guards: [MyAuthGuard], // Apply auth guards to all MCP tools/resources
            // transport: { type: 'http-sse', port: 3001 }, // Example transport
            // prefix: '/mcp' // Optional API prefix
          }),
          inject: [ConfigService],
        }),
        // ExampleToolModule, // If ExampleToolService is in its own module
      ],
      // providers: [ExampleToolService], // Or provide tool services directly
      // exports: [McpModule]
    })
    export class MyMcpAppModule {}
    ```
2.  **Defining Tools & Resources**:
    *   Create NestJS injectable services (`@Injectable()`) to house your tool/resource logic.
    *   Use the `@Tool()` and `@Resource()` decorators on methods within these services.
    *   Provide clear `name`, `description`, and a `parameters` schema using `zod`.
    Example Tool:
    ```typescript
    // src/mcp/tools/example.tool.service.ts
    import { Injectable } from '@nestjs/common';
    import { Tool, Context, McpUtils } from '@rekog/mcp-nest';
    import { z } from 'zod';
    import { PrismaService } from '../../core/prisma/prisma.service'; // Example: injecting PrismaService

    @Injectable()
    export class ExampleToolService {
      constructor(private readonly prisma: PrismaService) {} // DI in action

      @Tool({
        name: 'get-user-info',
        description: 'Retrieves user information by ID.',
        parameters: z.object({
          userId: z.number().int().positive().describe('The ID of the user to retrieve.'),
        }),
      })
      async getUserInfo(
        params: { userId: number },
        context: Context, // Access request context, reportProgress, etc.
      ) {
        await context.reportProgress?.({ message: 'Fetching user...', progress: 10, total: 100 });

        const user = await this.prisma.user.findUnique({
          where: { id: params.userId },
        });

        await context.reportProgress?.({ message: 'User fetched.', progress: 80, total: 100 });

        if (!user) {
          // Standard way to return errors in MCP
          return McpUtils.errorResponse(`User with ID ${params.userId} not found.`, 'NOT_FOUND');
        }
        await context.reportProgress?.({ progress: 100, total: 100 });
        return {
          content: [{ type: 'json', jsonContent: user }],
        };
      }
    }
    ```
3.  **Parameter Validation**: Zod schemas defined in `@Tool()` or `@Resource()` are automatically used for validation.
4.  **Authentication**:
    *   Implement standard NestJS Guards (e.g., checking JWT, API keys).
    *   Apply these guards globally via `McpModule.forRoot({ guards: [MyAuthGuard] })` or selectively using NestJS's `@UseGuards()` decorator on tool/resource provider classes or methods if `@rekog/mcp-nest` supports that level of granularity (check library docs for specific guard application methods).
5.  **Progress Reporting**: Use `context.reportProgress()` within your tool methods for long-running operations.
6.  **Error Handling**: Return structured errors using `McpUtils.errorResponse(message, code)` or by throwing `McpError` instances. Standard NestJS exceptions thrown from tools might also be caught and formatted by `@rekog/mcp-nest`.
7.  **Leverage DI**: Inject other NestJS services (like `PrismaService`, `ConfigService`, custom business logic services) into your tool/resource services.

### 3.4. General TypeScript & Coding Style
(This section can retain much of the existing content from `DeveloperGuide.md` regarding TypeScript, error handling, file naming, etc., ensuring it doesn't contradict NestJS/Prisma patterns.)

*   **Use strict TypeScript**: Enable all strict type checking options.
*   **ESM Modules**: Prefer ESM module syntax.
*   **Error Handling**: Implement robust error handling. Use custom error classes where appropriate, or NestJS built-in HTTP exceptions.
*   **Async/Await**: Use `async/await` for all asynchronous operations.
*   **Code Style**: Follow a consistent code style (e.g., using Prettier).
*   **File Naming**:
    *   NestJS modules: `feature-name.module.ts` (e.g., `user.module.ts`)
    *   Controllers: `feature-name.controller.ts`
    *   Services: `feature-name.service.ts`
    *   DTOs: `dto-name.dto.ts` or within a `dto` subfolder.
    *   Guards: `guard-name.guard.ts`
    *   Prisma schema: `schema.prisma`
    *   Test files: `*.spec.ts` or `*.test.ts`

## 4. Testing

### 4.1. Unit Testing
*   **NestJS**: Test services, controllers, and guards in isolation. Use `@nestjs/testing` to create a testing module and mock dependencies.
*   **Prisma**: For services using `PrismaService`, mock `PrismaService` methods to avoid actual database calls in unit tests.
*   **@rekog/mcp-nest Tools**: Unit test the logic within your tool methods. Mock the `Context` object and any injected dependencies.

### 4.2. Integration Testing
*   Test interactions between controllers, services, and `PrismaService` (potentially with a test database).
*   Test MCP tool execution through the `@rekog/mcp-nest` layer if possible, or test the tool services more directly by providing mock contexts.

### 4.3. End-to-End (E2E) Testing
*   Use `@nestjs/testing` and a library like `supertest` to make HTTP requests to your running NestJS application, testing full request-response cycles.
*   For MCP tools exposed via HTTP, E2E tests can directly call these endpoints.

## 5. Development Workflow
(This section can also retain some existing content, adapted for NestJS.)

1.  **Branching**: Use feature branches (e.g., `feature/my-new-tool`, `fix/user-bug`).
2.  **Implementation**: Develop features, tools, or fixes within NestJS modules.
3.  **Testing**: Write unit and integration tests.
4.  **Committing**: Use meaningful commit messages (e.g., conventional commits).
5.  **Code Review**: Submit Pull Requests for review.
6.  **Merging**: Merge to main branch after approval.

## 6. Debugging
*   **NestJS**: Use your IDE's debugger. NestJS CLI supports running in debug mode.
*   **Prisma**: Enable query logging in `PrismaClient` options for debugging database interactions:
    ```typescript
    // In PrismaService or PrismaClient instantiation
    // new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })
    ```
*   **@rekog/mcp-nest**: Check logs from the MCP server. The library may offer its own debugging flags or verbose logging (refer to its documentation).

## 7. Deployment
*   Build your NestJS application: `npm run build` (compiles TypeScript to `dist` folder).
*   Run Prisma migrations in production: `npx prisma migrate deploy`.
*   Start the application: `npm run start:prod`.
*   Ensure environment variables (especially `DATABASE_URL`) are correctly set in the production environment.
*   Consider containerization (e.g., Docker) for deployment.

## 8. Common Patterns (Updated for NestJS/Prisma)

### 8.1. CRUD Operations with Prisma in a NestJS Service
```typescript
// src/features/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found to update`);
      }
      throw error;
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found to delete`);
      }
      throw error;
    }
  }
}
```

(Existing sections on "Contributing Guidelines" and "Support and Resources" can be kept and updated as needed.)
