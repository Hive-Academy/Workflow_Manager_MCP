# Workflow Manager MCP Server

## Project Overview
This project implements a Model Context Protocol (MCP) server for managing AI workflow automation in Cursor. It provides a structured approach to task management and workflow orchestration between different AI modes.

## Key Features
- Task Creation and Management
- Task Context Tracking
- Status Updates and Progress Monitoring
- Workflow State Management
- Standardized Communication Protocol (MCP)

## Stakeholders
- AI Modes (Boomerang, Architect, Code, Code Review)
- End Users (Cursor IDE users)
- Developers maintaining the workflow system

## Technical Stack
- TypeScript/Node.js
- MCP Protocol (@modelcontextprotocol/sdk v1.11.2)
- Zod for schema validation
- ESM modules architecture

## Core Components
1. **MCP Server**: Central communication hub using stdio transport
2. **Task Management Tools**:
   - Create Task Tool
   - Get Task Context Tool
   - Update Task Status Tool
3. **File System Storage**:
   - Task tracking directory
   - Memory bank storage
   - Custom modes configuration

## Project Structure
```
.
├── workflow-mcp-server.ts    # Main server entry point
├── tools/                    # Tool implementations
├── task-tracking/            # Task state storage
├── memory-bank/             # Project documentation
├── custom-modes/            # Mode-specific configurations
└── dist/                    # Compiled JavaScript output
```

## Integration Points
- Cursor IDE via stdio communication
- File system for persistent storage
- Custom AI modes via MCP protocol

## Future Architectural Enhancements

To further enhance the robustness, scalability, and maintainability of the Workflow Manager MCP Server, particularly for its backend and data management aspects, the project will explore the adoption of the following technologies:

-   **NestJS**: A progressive Node.js framework that can provide a more structured, modular, and testable architecture for the MCP server logic. Its dependency injection system, modular organization, and strong TypeScript support align well with building complex server-side applications.
-   **Prisma**: A next-generation ORM that can offer type-safe database access, simplified data modeling, and a robust migration system. This would be beneficial for managing task states and other persistent data more effectively than the current file-system approach, especially as complexity grows.
-   **`@rekog/mcp-nest`**: A specialized NestJS module designed to streamline the integration of MCP capabilities within a NestJS application. This can simplify the development of MCP tools and resources by leveraging NestJS's architectural patterns and decorators.

Adopting these technologies is expected to improve developer experience, code quality, and the overall scalability of the MCP server components.

## Current Status
The project is operational with core task management functionality implemented. It uses the latest MCP SDK and follows modern TypeScript practices with ESM modules.