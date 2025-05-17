import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"; // Added for process_command schema
import { registerCreateTaskTool } from "./tools/createTaskTool.js";
import { registerGetTaskContextTool } from "./tools/getTaskContextTool.js";
import { registerUpdateTaskStatusTool } from "./tools/updateTaskStatusTool.js";
import { registerListTasksTool } from "./tools/listTasksTool.js";
import { registerDeleteTaskTool } from "./tools/deleteTaskTool.js";
import { registerAddTaskNoteTool } from "./tools/addTaskNoteTool.js";
import { registerUpdateTaskDescriptionTool } from "./tools/updateTaskDescriptionTool.js";
import { registerGetTaskStatusTool } from "./tools/getTaskStatusTool.js";
import { 
    registerDelegateTaskTool, 
    registerCompleteTaskTool,
    registerGetCurrentModeForTaskTool,
    registerContinueTaskTool,
    registerTaskDashboardTool,
    registerWorkflowMapTool,
    registerTransitionRoleTool,
    registerWorkflowStatusTool,
    getTaskPath,
    getTaskState
} from "./tools/workflowTools.js";
import fs from "fs/promises";
import path from "path";

// Map to store handlers for internal tool calls
const toolHandlerRegistry = new Map<string, (args: any, server?: McpServer) => Promise<any>>();

// Log errors to a file instead of stdout/stderr
async function logToFile(message: string) {
    await fs.appendFile("mcp-server-log.txt", `${new Date().toISOString()}: ${message}\n`);
}

function getServer() {
    const server = new McpServer({ 
        name: "workflow-manager", 
        version: "1.0.0",
        // Add timeout configs
        connectionTimeout: 30000, // 30 seconds
        keepAliveInterval: 15000, // 15 seconds
    });
    
    // Call each registration function, passing the server and the registry
    registerCreateTaskTool(server, toolHandlerRegistry);
    registerGetTaskContextTool(server, toolHandlerRegistry);
    registerUpdateTaskStatusTool(server, toolHandlerRegistry);
    registerListTasksTool(server, toolHandlerRegistry);
    registerDeleteTaskTool(server, toolHandlerRegistry);
    registerAddTaskNoteTool(server, toolHandlerRegistry);
    registerUpdateTaskDescriptionTool(server, toolHandlerRegistry);
    registerGetTaskStatusTool(server, toolHandlerRegistry);
    
    // Tools from workflowTools.ts
    registerDelegateTaskTool(server, toolHandlerRegistry);
    registerCompleteTaskTool(server, toolHandlerRegistry);
    registerGetCurrentModeForTaskTool(server, toolHandlerRegistry);
    registerContinueTaskTool(server, toolHandlerRegistry);
    registerTaskDashboardTool(server, toolHandlerRegistry);
    registerWorkflowMapTool(server, toolHandlerRegistry);
    registerTransitionRoleTool(server, toolHandlerRegistry);
    registerWorkflowStatusTool(server, toolHandlerRegistry);
    
    // Register the main command processor tool
    const processCommandSchemaRawShape = {
      command_string: z.string().describe("The full command string, e.g., '/next-role TSK-001'") 
    };
    
    const processCommandHandler = async ({ command_string } : { command_string: string }, extra: any) => {
        if (!command_string.startsWith('/')) {
            return { content: [{ type: "text", text: "Invalid command format. Commands must start with /" }] };
        }
        const parts = command_string.substring(1).split(' ');
        const command = parts[0].toLowerCase();
        const cmdArgs = parts.slice(1);

        await logToFile(`Processing command via tool: ${command} with args: ${cmdArgs.join(', ')}`);

        try {
            // Prefer using the toolHandlerRegistry if a command matches a registered tool name
            if (toolHandlerRegistry.has(command)) {
                const toolHandler = toolHandlerRegistry.get(command);
                if (toolHandler) {
                    // Need to parse cmdArgs into an object based on the tool's schema
                    // This is a complex part - for now, this direct invocation might fail for tools expecting structured args
                    // A more robust solution would be to have a way to get schema for registered tools
                    // or have command handlers be more specific.
                    // For simplicity, let's assume simple commands or that handlers are robust.
                    await logToFile(`Attempting to call ${command} via registry with args: ${cmdArgs.join(' ')}`);
                    // This is a placeholder: actual argument parsing and calling is complex here.
                    // return await toolHandler(cmdArgs, server); // This line would need proper arg mapping.
                }
            }

            // Fallback to existing switch statement for specific command logic
            switch (command) {
                case 'next-role':
                    return await executeNextRoleCommandLogic(cmdArgs);
                case 'role':
                    return await executeRoleCommandLogic(cmdArgs);
                case 'workflow-status':
                    // Check if workflow_status is in registry and call it
                    const wsHandler = toolHandlerRegistry.get("workflow_status");
                    if (wsHandler && cmdArgs.length > 0) {
                        return await wsHandler({ taskId: cmdArgs[0] }, server);
                    }
                    return await executeWorkflowStatusCommandLogic(cmdArgs); // Fallback or if no args
                case 'research':
                    return await executeResearchCommandLogic(cmdArgs);
                // Add other specific commands here if they don't map directly to a tool
                default:
                    return { 
                        content: [{ 
                            type: "text", 
                            text: `Unknown command: ${command}. Available commands: /next-role, /role, /workflow-status, /research` 
                        }],
                    };
            }
        } catch (error: any) {
            await logToFile(`Command handling error: ${error.message}`);
            return {
                content: [{ 
                    type: "text", 
                    text: `Error processing command: ${error.message}` 
                }],
            };
        }
    };

    server.tool(
        "process_command",
        "Processes slash commands for workflow management.",
        processCommandSchemaRawShape,
        processCommandHandler
    );

    return server;
}

async function main() {
    try {
        // Log startup to file
        await logToFile("Starting workflow-mcp-server");
        
        const server = getServer();
        // Remove transport options that cause errors
        const transport = new StdioServerTransport();
        
        await server.connect(transport);
        
        // Keep the process alive
        setInterval(async () => {
            // Heartbeat to keep process alive
            await logToFile("Server heartbeat");
        }, 60000); // Every minute
    } catch (error) {
        // Catch and log any errors during startup
        await logToFile(`Server startup error: ${error instanceof Error ? error.message : String(error)}`);
    }
}

// Refactored Handler functions for commands (now as standalone logic)
async function executeNextRoleCommandLogic(args: string[]) {
    const taskId = args[0] || "current"; // Use current task if not specified
    
    try {
        const taskPath = await getTaskPath(taskId); // getTaskPath is globally available from workflowTools import
        const taskState = await getTaskState(taskPath); // getTaskState is globally available
        
        const currentRole = taskState.currentRole || "boomerang-role";
        let nextRole = "boomerang-role";
        
        switch(currentRole) {
            case "boomerang-role":
                nextRole = (taskState.needsResearch) ? "researcher-role" : "architect-role";
                break;
            case "researcher-role":
                nextRole = "boomerang-role";
                break;
            case "architect-role":
                nextRole = "senior-developer-role";
                break;
            case "senior-developer-role":
                nextRole = (taskState.subtasksComplete) ? "code-review-role" : "senior-developer-role";
                break;
            case "code-review-role":
                nextRole = (taskState.reviewApproved) ? "boomerang-role" : "architect-role";
                break;
        }
        
        const handler = toolHandlerRegistry.get("transition_role");
        if (handler) {
            return await handler({
                taskId,
                fromRole: currentRole,
                toRole: nextRole,
                summary: `Automatic transition from ${currentRole} to ${nextRole}`
            });
        } else {
            throw new Error("transition_role tool handler not found in registry.");
        }
    } catch (error) {
        await logToFile(`Error in executeNextRoleCommandLogic: ${error instanceof Error ? error.message : String(error)}`);
        return {
            content: [{ 
                type: "text", 
                text: `Error transitioning to next role: ${error instanceof Error ? error.message : String(error)}` 
            }],
        };
    }
}

async function executeRoleCommandLogic(args: string[]) {
    if (args.length < 2) {
        return {
            content: [{ 
                type: "text", 
                text: "Usage: /role [role-name] [task-id]\nAvailable roles: boomerang, researcher, architect, developer, review" 
            }],
        };
    }
    
    const roleName = args[0];
    const taskId = args[1];
    
    try {
        let roleId = "unknown";
        switch(roleName.toLowerCase()) {
            case "boomerang": roleId = "boomerang-role"; break;
            case "researcher": roleId = "researcher-role"; break;
            case "architect": roleId = "architect-role"; break;
            case "developer": case "senior-developer": roleId = "senior-developer-role"; break;
            case "review": case "code-review": roleId = "code-review-role"; break;
            default:
                return {
                    content: [{ 
                        type: "text", 
                        text: `Unknown role: ${roleName}. Available roles: boomerang, researcher, architect, developer, review` 
                    }],
                };
        }
        
        const taskPath = await getTaskPath(taskId);
        const taskState = await getTaskState(taskPath);
        const currentRole = taskState.currentRole || "boomerang-role";
        
        const handler = toolHandlerRegistry.get("transition_role");
        if (handler) {
            return await handler({
                taskId,
                fromRole: currentRole,
                toRole: roleId,
                summary: `Manual transition from ${currentRole} to ${roleId}`
            });
        } else {
            throw new Error("transition_role tool handler not found in registry.");
        }
    } catch (error) {
        await logToFile(`Error in executeRoleCommandLogic: ${error instanceof Error ? error.message : String(error)}`);
        return {
            content: [{ 
                type: "text", 
                text: `Error transitioning to role: ${error instanceof Error ? error.message : String(error)}` 
            }],
        };
    }
}

async function executeWorkflowStatusCommandLogic(args: string[]) {
    const taskId = args[0] || "current";
    
    try {
        const handler = toolHandlerRegistry.get("workflow_status");
        if (handler) {
            return await handler({ taskId });
        } else {
            throw new Error("workflow_status tool handler not found in registry.");
        }
    } catch (error) {
        await logToFile(`Error in executeWorkflowStatusCommandLogic: ${error instanceof Error ? error.message : String(error)}`);
        return {
            content: [{ 
                type: "text", 
                text: `Error getting workflow status: ${error instanceof Error ? error.message : String(error)}` 
            }],
        };
    }
}

async function executeResearchCommandLogic(args: string[]) {
    if (args.length < 2) {
        return {
            content: [{ 
                type: "text", 
                text: "Usage: /research [topic] [task-id]" 
            }],
        };
    }
    
    try {
        const topic = args.slice(0, -1).join(' ');
        const taskId = args[args.length - 1];
        
        const taskPath = await getTaskPath(taskId);
        const taskState = await getTaskState(taskPath);
        const currentRole = taskState.currentRole || "boomerang-role";
        
        taskState.needsResearch = true;
        taskState.researchTopic = topic;
        
        const statePath = path.join(taskPath, "task-state.json");
        await fs.writeFile(statePath, JSON.stringify(taskState, null, 2), "utf8");
        
        if (currentRole !== "researcher-role") {
            const handler = toolHandlerRegistry.get("transition_role");
            if (handler) {
                return await handler({
                    taskId,
                    fromRole: currentRole,
                    toRole: "researcher-role",
                    summary: `Research requested on topic: ${topic}`
                });
            } else {
                throw new Error("transition_role tool handler not found in registry for research command.");
            }
        } else {
            return {
                content: [{ 
                    type: "text", 
                    text: `Updated research topic to: ${topic}` 
                }],
            };
        }
    } catch (error) {
        await logToFile(`Error in executeResearchCommandLogic: ${error instanceof Error ? error.message : String(error)}`);
        return {
            content: [{ 
                type: "text", 
                text: `Error initiating research: ${error instanceof Error ? error.message : String(error)}` 
            }],
        };
    }
}

// Export something to ensure file is treated as a module
export { getServer };

// Add a timeout before starting to ensure any previous process has finished
setTimeout(() => {
    main().catch(async (error) => {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Unhandled error in main:", errorMessage, error.stack);
        await logToFile(`Unhandled error in main: ${errorMessage}\nStack: ${error.stack}`);
        process.exit(1); // Exit if main crashes
    });
}, 1000); // 1 second delay 