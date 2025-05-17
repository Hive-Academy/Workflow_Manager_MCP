# Task Description: TSK-001 - Update Memory Bank & Rules with NestJS, Prisma, and MCP-Nest

## 1. Task Overview

This task involves updating the project's memory bank files (`ProjectOverview.md`, `TechnicalArchitecture.md`, `DeveloperGuide.md`) and creating new best practice rule files in the `rules/` directory. These updates will incorporate learnings from the research conducted on NestJS, Prisma, and the `@rekog/mcp-nest` library. The goal is to modernize our documented architecture and development practices to reflect these technologies.

**Original User Request Context**: The user requested research into NestJS, Prisma, and the `@rekog/mcp-nest` package to update memory bank files and add new best practice rules. The user also mentioned installing the `@rekog/mcp-nest` package.

**Research Report Reference**: `D:/projects/cursor-workflow/task-tracking/TSK-001-Update_Memory_Bank_with_NestJS_Prisma_MCP-Nest_and_New_Best_Practices/research-report.md`

## 2. Current Implementation Analysis (Pre-Update)

-   **`ProjectOverview.md`**: Currently describes the project's purpose, high-level goals, and existing user interaction models. It needs to be updated to reflect how a NestJS/Prisma backend might alter or enhance these aspects, particularly for the MCP server component.
-   **`TechnicalArchitecture.md`**: Currently details the existing TypeScript/Node.js architecture, MCP protocol usage, Zod validation, and ESM module structure. This file requires significant updates to introduce NestJS as the backend framework, Prisma as the ORM, and `@rekog/mcp-nest` for MCP server implementation.
-   **`DeveloperGuide.md`**: Currently provides guidance on the existing development setup. It needs to be expanded with sections on NestJS (modules, services, controllers, DI), Prisma (schema, migrations, client), and `@rekog/mcp-nest` (tool/resource definition, guards).
-   **`rules/` folder**: This folder is intended for specific best practice documents. New files based on the research (e.g., `nestjs-best-practices.md`, `prisma-best-practices.md`, `mcp-nest-integration.md`) need to be created.
-   **Package Installation**: The research report clarifies that "installing" `@rekog/mcp-nest` involves adding it as an npm dependency along with `@modelcontextprotocol/sdk` and `zod`.

## 3. Component Structure (Post-Update - Conceptual)

This task primarily focuses on documentation and rule creation, not direct code implementation within the `workflow-manager` tool itself (unless a future task is to refactor `workflow-manager` to NestJS). However, the updated documentation will describe the following conceptual component structure for a NestJS-based MCP server:

-   **NestJS Application Core**: `AppModule`, configuration (`@nestjs/config`).
-   **MCP Integration Layer**: `@rekog/mcp-nest` module, tool/resource services, MCP guards.
-   **Business Logic/Feature Modules**: Standard NestJS modules containing controllers and services for specific functionalities.
-   **Data Access Layer**: `PrismaModule`, `PrismaService`, Prisma client.
-   **Database**: Underlying database managed by Prisma.

## 4. Detailed Requirements

1.  **Memory Bank Updates**:
    *   Modify `memory-bank/ProjectOverview.md` to include the strategic benefits of using NestJS, Prisma, and a dedicated MCP NestJS library for future backend development or refactoring.
    *   Substantially update `memory-bank/TechnicalArchitecture.md` to:
        *   Introduce NestJS as a recommended architectural pattern for server-side applications, detailing its core components (modules, controllers, services, DI).
        *   Introduce Prisma as the recommended ORM, explaining its schema-first approach, migration system, and type-safe client.
        *   Describe the architecture of an MCP server built with NestJS using `@rekog/mcp-nest`, including module setup, tool/resource definition with decorators, and authentication with guards.
        *   Provide high-level diagrams or descriptions of how these components interact.
    *   Significantly update `memory-bank/DeveloperGuide.md` to:
        *   Add sections on setting up a NestJS project, creating modules, services, and controllers.
        *   Add sections on initializing Prisma, defining schemas, running migrations, and using `PrismaClient` in NestJS services (via `PrismaService`).
        *   Add sections on integrating `@rekog/mcp-nest`, defining tools/resources, parameter validation with Zod, and progress reporting.
        *   Include code snippets and examples for common patterns.
2.  **New Rule File Creation**:
    *   Create `rules/nestjs-best-practices.md`: This file should detail best practices for NestJS development, including modularity, DI, DTOs and validation, configuration management, error handling, and consistent naming, based on the research report.
    *   Create `rules/prisma-best-practices.md`: This file should cover Prisma best practices such as `PrismaService` integration in NestJS, schema management, migration workflows, type safety, transaction handling, and seeding.
    *   Create `rules/mcp-nest-integration.md`: This file should provide guidelines for integrating `@rekog/mcp-nest`, including clear tool/resource definitions, using NestJS services for tool logic, authentication, progress reporting, and error handling within MCP tools.
3.  **Package Installation Clarification**:
    *   Ensure the `DeveloperGuide.md` clearly states that using `@rekog/mcp-nest` involves installing the necessary npm packages (`@rekog/mcp-nest`, `@modelcontextprotocol/sdk`, `zod`).

## 5. Acceptance Criteria Checklist

**AC1: `ProjectOverview.md` Update**
-   [ ] `memory-bank/ProjectOverview.md` is updated to briefly mention the strategic shift towards NestJS, Prisma for potential backend/MCP server components and their benefits.
-   Verification: Manual review of the updated file content.

**AC2: `TechnicalArchitecture.md` Update**
-   [ ] `memory-bank/TechnicalArchitecture.md` comprehensively details the architecture of a NestJS application using Prisma and `@rekog/mcp-nest`.
-   [ ] Core concepts of NestJS (modules, services, controllers, DI) are explained in an architectural context.
-   [ ] Core concepts of Prisma (schema, migrations, client, `PrismaService`) are explained in an architectural context.
-   [ ] The role and integration of `@rekog/mcp-nest` are clearly described.
-   Verification: Manual review of the updated file content against research report recommendations.

**AC3: `DeveloperGuide.md` Update**
-   [ ] `memory-bank/DeveloperGuide.md` includes new sections providing practical guidance and code examples for NestJS development.
-   [ ] `memory-bank/DeveloperGuide.md` includes new sections providing practical guidance and code examples for Prisma integration with NestJS.
-   [ ] `memory-bank/DeveloperGuide.md` includes new sections providing practical guidance and code examples for using `@rekog/mcp-nest`.
-   [ ] The guide clarifies the npm package installation for `@rekog/mcp-nest`.
-   Verification: Manual review of the updated file content, checking for clarity, correctness of examples, and coverage of topics from the research report.

**AC4: New Rule File: `nestjs-best-practices.md`**
-   [ ] `rules/nestjs-best-practices.md` is created.
-   [ ] The file contains detailed best practices for NestJS development as recommended in the research report.
-   Verification: Manual review of the new file content.

**AC5: New Rule File: `prisma-best-practices.md`**
-   [ ] `rules/prisma-best-practices.md` is created.
-   [ ] The file contains detailed best practices for Prisma usage (especially with NestJS) as recommended in the research report.
-   Verification: Manual review of the new file content.

**AC6: New Rule File: `mcp-nest-integration.md`**
-   [ ] `rules/mcp-nest-integration.md` is created.
-   [ ] The file contains detailed guidelines for integrating `@rekog/mcp-nest` as recommended in the research report.
-   Verification: Manual review of the new file content.

## 6. Implementation Guidance (for Architect)

-   The primary deliverables are updated Markdown files (`ProjectOverview.md`, `TechnicalArchitecture.md`, `DeveloperGuide.md`) and new Markdown files (`rules/nestjs-best-practices.md`, `rules/prisma-best-practices.md`, `rules/mcp-nest-integration.md`).
-   The content for these files should be directly derived from the `research-report.md`.
-   No direct coding or code modification in the `workflow-manager` project is expected for *this* task, beyond potentially adding the npm packages if it's decided to install them into `workflow-manager`'s `package.json` as an illustrative example (this should be a minor sub-task if included).
-   The Architect should break down the work into subtasks for the Senior Developer, likely focusing on:
    1.  Updating `ProjectOverview.md`.
    2.  Updating `TechnicalArchitecture.md`.
    3.  Updating `DeveloperGuide.md` (including clarification of npm package installation).
    4.  Creating `rules/nestjs-best-practices.md`.
    5.  Creating `rules/prisma-best-practices.md`.
    6.  Creating `rules/mcp-nest-integration.md`.
-   Ensure the Senior Developer understands that these are documentation tasks based on the provided research.

## 7. File and Component References

-   **Research Report**: `D:/projects/cursor-workflow/task-tracking/TSK-001-Update_Memory_Bank_with_NestJS_Prisma_MCP-Nest_and_New_Best_Practices/research-report.md`
-   **Memory Bank Files (to be updated)**:
    -   `D:/projects/cursor-workflow/memory-bank/ProjectOverview.md`
    -   `D:/projects/cursor-workflow/memory-bank/TechnicalArchitecture.md`
    -   `D:/projects/cursor-workflow/memory-bank/DeveloperGuide.md`
-   **New Rule Files (to be created in `D:/projects/cursor-workflow/rules/`)**:
    -   `nestjs-best-practices.md`
    -   `prisma-best-practices.md`
    -   `mcp-nest-integration.md`
-   **This Task Description**: `D:/projects/cursor-workflow/task-tracking/TSK-001-Update_Memory_Bank_with_NestJS_Prisma_MCP-Nest_and_New_Best_Practices/task-description.md`
-   **Package to "install" (document installation)**: `@rekog/mcp-nest` (and its dependencies: `@modelcontextprotocol/sdk`, `zod`)

### Memory Bank References
The following information from memory bank files informed this response:
1. From ProjectOverview.md:
     - General project goals and user interaction models.
2. From TechnicalArchitecture.md:
     - Existing architecture based on TypeScript/Node.js, MCP protocol, Zod, ESM.
3. From DeveloperGuide.md:
     - Current development setup guidance.
