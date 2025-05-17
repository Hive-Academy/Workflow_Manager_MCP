# Cursor Workflow System

This project implements a RooCode-inspired workflow system for Cursor, enabling collaborative AI development with specialized roles.

## Overview

The system creates a structured workflow between different AI agent modes in Cursor:

- **Boomerang**: Task intake, project analysis, memory bank generation, and final verification
- **Architect**: Planning and coordination
- **Senior Developer**: Implementation and delegation
- **Junior Coder**: Specific code implementation
- **Junior Tester**: Test creation and implementation
- **Code Review**: Quality assurance
- **Researcher Expert**: Research and knowledge gathering

## Key Features

- **Project Analysis**: Boomerang can analyze existing projects to generate memory bank files
- **New Project Initialization**: Guide the creation of new projects from scratch
- **Task Workflow**: Structured approach to development with specialized AI roles
- **Inter-Mode Communication**: Communication between modes via FastMCP server
- **Memory Bank**: Project knowledge documentation for context

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the MCP Server

```bash
npm run dev
```

For production use:
```bash
npm run build
npm start
```

### 3. Configure Cursor

1. Make sure the MCP server configuration in `.cursor/mcp.json` is correct
2. Configure Custom Modes in Cursor settings using the JSON files in the `custom-modes` directory

## Project Structure

```
cursor-workflow/
│
├── .cursor/               # Cursor configuration files
│   └── mcp.json           # MCP server configuration
│
├── custom-modes/          # Custom mode definitions for Cursor
│   ├── boomerang-mode.json
│   ├── architect-mode.json
│   └── ...
│
├── memory-bank/           # Project knowledge documentation
│   ├── ProjectOverview.md # Overview of the project
│   ├── TechnicalArchitecture.md # Architecture details
│   └── DeveloperGuide.md  # Developer guidelines
│
├── task-tracking/         # Task repository
│   └── [taskID]-[taskName]/ # Task-specific directories
│
├── workflow-mcp-server.ts # FastMCP server implementation
├── package.json           # Project dependencies
├── PROJECT_GUIDE.md       # Guide for project analysis and initialization
├── USAGE_GUIDE.md         # Detailed usage instructions
└── README.md              # This file
```

## Using With Existing Projects

1. Copy the workflow system to your project directory or add it as a subdirectory
2. Start the MCP server
3. Configure Cursor with the custom modes
4. Switch to Boomerang mode and ask it to analyze your project and generate memory bank files
5. Start creating tasks following the workflow

## Starting New Projects

1. Set up the workflow system in a new directory
2. Start the MCP server
3. Configure Cursor with the custom modes
4. Switch to Boomerang mode and ask it to initialize a new project with your requirements
5. Boomerang will guide you through the process and create appropriate memory bank files

## Guide Documents

- **PROJECT_GUIDE.md**: How to analyze existing projects or start new ones
- **USAGE_GUIDE.md**: Detailed guide on using the workflow for tasks

## MCP Server Tools

- `get_task_context`: Retrieve the context of a specific task
- `update_task_status`: Update the status of a task
- `delegate_task`: Delegate a task to another mode
- `get_delegated_tasks`: Get tasks delegated to a specific mode
- `complete_task`: Mark a delegated task as completed
- `create_or_update_file`: Create or update a file in the task repository
- `read_file`: Read a file from the task repository
- `update_memory_bank`: Update a memory bank file with new content
- `get_memory_bank_content`: Get the content of a memory bank file
- `list_tasks`: List all tasks in the task repository

## Technology Stack

- **TypeScript**: Modern, typed JavaScript
- **FastMCP**: TypeScript framework for building MCP servers
- **Zod**: Schema validation for MCP tools
- **Cursor AI**: AI-powered code editor with custom modes support

## Best Practices

- Always switch to the correct mode before working on a task
- Check for delegated tasks after switching modes
- Use the MCP server tools for all task management
- Follow the workflow sequence precisely
- Document your work thoroughly for the next person in the chain
- Update memory bank files as your project evolves

## License

MIT

## Docker Usage

The recommended way to run the MCP server is with Docker Compose:

### 1. Build and Start with Docker Compose

```sh
docker-compose up --build -d
```

This will build the image (if needed) and start the server in a container named `workflow-mcp-server` on port 3000.

### 2. Stopping and Restarting the Server

To stop the server:

```sh
docker-compose down
```

To rebuild the image and restart (after code changes):

```sh
docker-compose down
# Rebuild and start
docker-compose up --build -d
```

### 3. Logs

To view logs:

```sh
docker-compose logs -f
```

---

You can also use plain Docker if you prefer:

```sh
docker build -t workflow-mcp .
docker run -p 3000:3000 workflow-mcp
```

But Docker Compose is recommended for easier management.

## Development Usage

1. Place your TypeScript source files in the `src/` directory.
2. Build with `npm run build`.
3. Start the server with `npm start`.

