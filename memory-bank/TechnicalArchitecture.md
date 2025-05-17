# Technical Architecture

## 1. Current Architecture Overview (Legacy)

The Workflow Manager initially implemented a client-server architecture using the Model Context Protocol (MCP) directly with TypeScript/Node.js. Communication with the Cursor IDE was primarily via stdio, and data persistence relied on a file-system-based approach.

**Key Characteristics of Legacy Architecture**:
-   **Framework**: Custom TypeScript/Node.js setup.
-   **MCP Handling**: Direct use of `@modelcontextprotocol/sdk`.
-   **Data Persistence**: JSON files on the file system.
-   **Modularity**: Basic modularity through directory structure and ESM modules.
-   **Validation**: Zod for schema validation of tool parameters.

While functional, this architecture faces challenges in scalability, maintainability, and structured development as complexity grows. The following sections describe a recommended future architecture to address these challenges.

## 2. Recommended Future Architecture: NestJS, Prisma, and @rekog/mcp-nest

To enhance robustness, scalability, and developer experience, the recommended future architecture for MCP server development within this project (or for similar backend services) centers around NestJS as the application framework, Prisma as the ORM, and `@rekog/mcp-nest` for streamlined MCP integration.

### 2.1. Core Architectural Principles

-   **Modularity**: Leveraging NestJS modules to encapsulate features and concerns.
-   **Dependency Injection (DI)**: Utilizing NestJS's built-in DI system for managing dependencies and promoting loosely coupled components.
-   **Type Safety**: End-to-end type safety provided by TypeScript, Prisma Client, and Zod (for tool parameters via `@rekog/mcp-nest`).
-   **Declarative Programming**: Using decorators extensively in NestJS and `@rekog/mcp-nest` for defining modules, controllers, services, tools, and resources.
-   **Schema-First Database**: Employing Prisma's schema-first approach for database design and migrations.

### 2.2. High-Level Architecture Diagram

```mermaid
graph TD
    A[Client/Cursor IDE] <-->|MCP Transport (HTTP+SSE, Stdio, etc.)| B(NestJS Application)
    B --> C{Request Handling Layer (Controllers/Gateways)}
    C --> D{Application/Business Logic Layer (Services/Providers)}
    D --> E{MCP Tool/Resource Layer (@rekog/mcp-nest)}
    E --> F[PrismaService (Data Access)]
    F <--> G[(Database)]
    D --> F

    subgraph NestJS Application
        direction LR
        B1[AppModule]
        B2[Feature Modules]
        B3[PrismaModule]
        B4[McpModule (@rekog/mcp-nest)]
        B1 --> B2
        B1 --> B3
        B1 --> B4
        B2 -.-> D
        B3 -.-> F
        B4 -.-> E
    end
```

### 2.3. Key Technology Components

#### 2.3.1. NestJS (Application Framework)

-   **Role**: Provides the foundational structure for the server-side application.
-   **Core Concepts Used**:
    -   **Modules (`@Module()`)**: Organize the application into cohesive blocks of functionality. Each module can encapsulate controllers, providers (services), and even other modules. The `AppModule` is the root module.
    -   **Controllers (`@Controller()`)**: Handle incoming HTTP requests (or other transport-specific requests), delegate business logic to services, and return responses. They define routing paths.
    -   **Services/Providers (`@Injectable()`)**: Contain the business logic, data manipulation, and interaction with other services (like `PrismaService`). They are injectable into controllers or other services.
    -   **Dependency Injection (DI)**: NestJS manages the instantiation and injection of providers and other dependencies, promoting testability and decoupling.
    -   **Pipes (`@UsePipes()`, `ValidationPipe`)**: Used for data transformation and validation (e.g., validating DTOs with `class-validator`).
    -   **Guards (`@UseGuards()`)**: Implement authentication and authorization logic.
    -   **DTOs (Data Transfer Objects)**: Plain classes used to define the shape of request and response payloads, often used in conjunction with validation pipes.

#### 2.3.2. Prisma (ORM & Data Access)

-   **Role**: Manages database interactions, schema definition, and migrations.
-   **Core Concepts Used**:
    -   **`schema.prisma`**: A declarative file defining database models, relations, and the data source. This is the single source of truth for the database schema.
    -   **Prisma Client**: A type-safe query builder auto-generated from the `schema.prisma` file. It's used to perform CRUD operations and complex queries.
    -   **Prisma Migrate**: A CLI tool for evolving the database schema and generating/applying SQL migration files.
    -   **`PrismaService` (NestJS Pattern)**: A dedicated NestJS service that typically extends `PrismaClient` and implements `OnModuleInit` to connect to the database. This service is then provided and injected into other services that require database access, abstracting direct Prisma Client instantiation.
    -   **`PrismaModule` (NestJS Pattern)**: A NestJS module that provides the `PrismaService`, making it available for DI across the application.

#### 2.3.3. `@rekog/mcp-nest` (MCP Integration Layer)

-   **Role**: Simplifies the exposure of application functionalities as MCP tools and resources from within a NestJS application.
-   **Core Concepts Used**:
    -   **`McpModule.forRoot(options)`**: Imported into the NestJS `AppModule` to initialize and configure the MCP server capabilities (e.g., server name, version, transport type, authentication guards).
    -   **`@Tool()` Decorator**: Applied to methods within NestJS services (`@Injectable()`) to define them as MCP tools. Requires a `name`, `description`, and a Zod schema for `parameters`.
    -   **`@Resource()` Decorator**: Similarly defines MCP resources from service methods.
    -   **Parameter Validation**: Automatically handles validation of incoming tool parameters against the provided Zod schema.
    -   **Context (`Context` object)**: Injected into tool methods, providing access to request details and methods like `reportProgress()`.
    -   **Authentication**: Integrates with standard NestJS Guards. Guards can be specified in `McpModule.forRoot()` to protect MCP endpoints.
    -   **Transport Agnostic**: Supports multiple MCP transports like HTTP+SSE, Streamable HTTP, and STDIO, configured via the `McpModule` options.

### 2.4. Data Flow and Interaction

1.  **Request Initiation**: An MCP client (e.g., Cursor IDE) sends a request (e.g., `tool_run`) to the NestJS MCP server via the configured transport.
2.  **Transport Handling**: The `@rekog/mcp-nest` module, configured for a specific transport, receives the incoming MCP message.
3.  **Authentication & Authorization (via Guards)**: If guards are configured, they are executed to authenticate/authorize the request.
4.  **Tool/Resource Matching & Parameter Validation**: `@rekog/mcp-nest` identifies the target tool/resource based on the request. It validates incoming parameters against the tool's Zod schema.
5.  **Tool Execution**: The corresponding method in the NestJS service (decorated with `@Tool()` or `@Resource()`) is invoked. Dependencies (like `PrismaService` or other application services) are injected into this service by NestJS.
6.  **Business Logic & Data Access**: The tool method executes its logic, potentially interacting with other services or using `PrismaService` to query/mutate data in the database.
7.  **Progress Reporting**: For long-running tools, `context.reportProgress()` can be used to send intermediate updates to the client.
8.  **Response Generation**: The tool method returns its result, which `@rekog/mcp-nest` formats into an MCP response message.
9.  **Response Transmission**: The MCP response is sent back to the client via the transport layer.

### 2.5. Comparison with Legacy Architecture

| Aspect                 | Legacy Architecture                        | Recommended Future Architecture (NestJS, Prisma, @rekog/mcp-nest) |
| ---------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| **Framework**          | Custom TypeScript/Node.js                | NestJS (structured, opinionated)                                    |
| **Modularity**         | Directory-based                            | NestJS Modules (strong encapsulation, DI)                           |
| **Data Access**        | File system (JSON)                         | Prisma (Type-safe ORM, migrations, `schema.prisma`)                 |
| **MCP Implementation** | Direct SDK usage                           | `@rekog/mcp-nest` (decorators, NestJS integration)                  |
| **Validation**         | Zod (manual integration)                   | Zod (integrated with `@rekog/mcp-nest` tools), `class-validator` for DTOs |
| **Testing**            | More manual setup for unit/integration     | Enhanced by NestJS testing utilities, DI facilitates mocking        |
| **Scalability**        | Limited by custom structure                | Higher, due to NestJS patterns and Prisma capabilities              |
| **Developer Experience** | Relies on conventions                      | Improved by NestJS CLI, decorators, type safety from Prisma         |

## 3. Security Considerations (for Recommended Architecture)

1.  **Authentication & Authorization**: Utilize NestJS Guards, integrated with `@rekog/mcp-nest`, to secure MCP endpoints. Implement robust authentication strategies (e.g., API keys, JWT).
2.  **Input Validation**: Continue using Zod for MCP tool parameters (handled by `@rekog/mcp-nest`). For HTTP controllers, use DTOs with `class-validator` and NestJS `ValidationPipe`.
3.  **ORM Security**: Prisma helps prevent SQL injection by design due to its query builder. Be mindful of any raw SQL queries if used.
4.  **Dependency Management**: Regularly update dependencies (NestJS, Prisma, `@rekog/mcp-nest`, etc.) to patch vulnerabilities.
5.  **Error Handling**: Implement comprehensive error handling to avoid leaking sensitive information.
6.  **HTTPS**: Ensure HTTP-based MCP transports are served over HTTPS in production.

## 4. Deployment Considerations (for Recommended Architecture)

-   A NestJS application is typically built into a JavaScript bundle (e.g., using `nest build`).
-   The application can be containerized using Docker.
-   Prisma migrations need to be run as part of the deployment process (`prisma migrate deploy`).
-   Environment variables (e.g., `DATABASE_URL`, security keys) should be managed securely using a configuration service like `@nestjs/config`.

This refined architecture provides a more robust and maintainable foundation for developing and scaling the MCP server and related backend services.
