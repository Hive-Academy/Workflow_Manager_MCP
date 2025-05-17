# RooCode-Style Workflow in Cursor Using FastMCP

This guide explains how to set up and use the FastMCP-based workflow system that replicates the functionality of RooCode in Cursor.

## Setup Instructions

### 1. Install Dependencies

First, install the required dependencies:

```bash
npm install
```

### 2. Start the MCP Server

Run the MCP server:

```bash
npm run dev
```

For production use, build and run the compiled version:

```bash
npm run build
npm start
```

### 3. Configure Cursor

1. Make sure the MCP server configuration in `.cursor/mcp.json` is correct
2. Configure Custom Modes in Cursor settings using the JSON files in the `custom-modes` directory

## Using the Workflow System

### Starting with Boomerang Mode

1. Switch to **Boomerang Mode** in Cursor
2. Ask Boomerang to analyze your project or guide you through creating a new one:

   ```
   Please analyze this project and generate appropriate memory bank files based on the codebase structure, technologies used, and architecture patterns.
   ```

   Or for a new project:

   ```
   I want to start a new project with [technology stack] for [purpose]. Please help me create initial memory bank files and project structure.
   ```

3. Once the memory bank files are created, you can create tasks:

   ```
   I'd like to create a new task:
   
   Task Name: [Name]
   Task ID: [ID]
   
   Please create a task description with the following requirements:
   - [Requirement 1]
   - [Requirement 2]
   ```

### Working with Architect Mode

1. Switch to **Architect Mode** in Cursor
2. Check for delegated tasks:

   ```
   Please check if there are any tasks delegated to me using the workflow-manager MCP server.
   ```

3. Create an implementation plan:

   ```
   I'll create an implementation plan for this task. Please use the workflow-manager MCP server to read the task description and create an implementation plan.
   ```

### Working with Other Modes

The workflow continues through Senior Developer, Junior Coder/Tester, and Code Review modes, with each using the MCP tools to communicate and track progress.

## MCP Tool Reference

The MCP server provides these tools:

- `get_task_context`: Retrieve the context of a task
- `update_task_status`: Update the status of a task
- `delegate_task`: Delegate a task to another mode
- `get_delegated_tasks`: Get tasks delegated to a specific mode
- `complete_task`: Mark a delegated task as completed
- `create_or_update_file`: Create or update a file in the task repository
- `read_file`: Read a file from the task repository
- `update_memory_bank`: Update a memory bank file
- `get_memory_bank_content`: Get the content of a memory bank file
- `list_tasks`: List all tasks in the task repository

## Example Workflows

### Analyzing an Existing Project

```
I'd like you to analyze this project and create memory bank files.

Please:
1. Examine the project structure, technologies, and architecture
2. Generate appropriate memory bank files
3. Save these to the memory-bank directory
```

### Creating and Delegating a Task

```
I need to create a new task for implementing user authentication.

Please:
1. Create a task description
2. Save it to the task-tracking directory
3. Delegate it to Architect mode
```

### Checking for Delegated Tasks

```
Please check if there are any tasks delegated to me (Architect mode) using the workflow-manager MCP server.
```

## Troubleshooting

1. **MCP server not connecting**: Verify that the server is running and the configuration in `.cursor/mcp.json` is correct.

2. **Tools not showing up**: Check that the Cursor AI is using Agent mode and that the MCP server is properly connected.

3. **File operations failing**: Ensure the appropriate directories exist and have the correct permissions.

4. **Modes not responding correctly**: Verify that the custom mode configurations are correctly loaded in Cursor.
