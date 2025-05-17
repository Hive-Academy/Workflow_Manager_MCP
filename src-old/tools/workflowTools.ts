import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z, ZodTypeAny } from "zod";
import * as fs from "fs/promises";
import * as path from "path";

const REPO_ROOT = process.env.REPO_ROOT || "./";
export const TASK_TRACKING_PATH = path.join(REPO_ROOT, "task-tracking");

// Helper function to get emoji for mode
function getEmojiForMode(mode: string): string {
    switch(mode) {
        case "boomerang-mode": return "🪃";
        case "architect-mode": return "🏛️";
        case "senior-developer-mode": return "👨‍💻";
        case "code-review-mode": return "🔍";
        case "researcher-expert-mode": return "🔬";
        default: return "❓";
    }
}

// Helper function to get emoji for role
function getEmojiForRole(role: string): string {
    switch(role) {
        case "boomerang-role": return "🪃";
        case "researcher-role": return "🔬";
        case "architect-role": return "🏛️";
        case "senior-developer-role": return "👨‍💻";
        case "code-review-role": return "🔍";
        default: return "❓";
    }
}

// Helper function to find task directory from taskId
export async function getTaskPath(identifierOrBaseId: string, taskName?: string): Promise<string> {
    // Ensure the base task-tracking directory exists
    await fs.mkdir(TASK_TRACKING_PATH, { recursive: true });

    if (taskName) {
        // Construct path for creation or when name components are definitively known.
        // identifierOrBaseId is assumed to be the pure taskId like "TSK-001".
        const folderName = `${identifierOrBaseId}-${taskName.replace(/\s+/g, '_')}`;
        return path.join(TASK_TRACKING_PATH, folderName);
    } else {
        // identifierOrBaseId could be a full folder name (TSK-001-My_Task) or just an ID (TSK-001).
        
        // Attempt 1: Treat identifierOrBaseId as a potential full folder name.
        const potentialDirectPath = path.join(TASK_TRACKING_PATH, identifierOrBaseId);
        try {
            const stats = await fs.stat(potentialDirectPath);
            if (stats.isDirectory()) {
                return potentialDirectPath; // Found by full name.
            }
        } catch {
            // Not a direct path or doesn't exist, proceed to search by ID prefix.
        }

        // Attempt 2: Treat identifierOrBaseId as a base ID (e.g., TSK-001) and search for TSK-001-*.
        // Extract a base prefix, assuming format like TSK-XXX or similar.
        const idPrefixMatch = identifierOrBaseId.match(/^(TSK-\d+)/);
        const searchPrefix = idPrefixMatch ? idPrefixMatch[1] : identifierOrBaseId; 

        try {
            const taskDirs = await fs.readdir(TASK_TRACKING_PATH);
            // Find a directory that starts with the searchPrefix followed by a hyphen.
            // This is to correctly match "TSK-001-" and not just "TSK-001" if a folder "TSK-001" itself existed.
            const foundDir = taskDirs.find(dir => dir.startsWith(searchPrefix + '-'));
            if (foundDir) {
                return path.join(TASK_TRACKING_PATH, foundDir);
            }
        } catch (readDirErr: any) {
            // This can happen if TASK_TRACKING_PATH itself doesn't exist and fs.mkdir above failed silently or wasn't called,
            // or due to general permission issues.
            throw new Error(`Error reading task directory ${TASK_TRACKING_PATH}: ${readDirErr.message}`);
        }
        
        // If still not found, it means no task folder matches the identifier.
        throw new Error(`Task folder not found for identifier '${identifierOrBaseId}'. If creating a new task, ensure taskName is also provided.`);
    }
}

// Helper function to get task state
export async function getTaskState(taskPath: string): Promise<any> {
    try {
        const statePath = path.join(taskPath, "task-state.json");
        const stateContent = await fs.readFile(statePath, "utf8");
        const parsedState = JSON.parse(stateContent);
        // Ensure essential fields have defaults if missing from an old state file
        return {
            taskId: parsedState.taskId || path.basename(taskPath).split('-')[0],
            taskName: parsedState.taskName || path.basename(taskPath).split('-').slice(1).join(' ') || path.basename(taskPath),
            status: parsedState.status || "unknown",
            progress: parsedState.progress !== undefined ? parsedState.progress : 0,
            currentOwner: parsedState.currentOwner || "boomerang-mode",
            delegations: parsedState.delegations || [],
            notesLog: parsedState.notesLog || [],
            statusNotes: parsedState.statusNotes || [],
            createdAt: parsedState.createdAt || new Date().toISOString(),
            updatedAt: parsedState.updatedAt || new Date().toISOString(),
            ...parsedState // Spread the rest of the parsed state
        };
    } catch (err: any) {
        const baseName = path.basename(taskPath);
        return {
            taskId: baseName.split('-')[0],
            taskName: baseName.split('-').slice(1).join(' ') || baseName,
            status: "unknown",
            progress: 0,
            currentOwner: "boomerang-mode",
            delegations: [],
            notesLog: [],
            statusNotes: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
    }
}

export function registerDelegateTaskTool(server: McpServer, registry: Map<string, Function>) {
    const toolName = "delegate_task";
    const description = "Delegates a task from one mode/role to another, updating its ownership and status.";
    const schemaRawShape: { [key: string]: ZodTypeAny } = {
        taskId: z.string().describe("The ID of the task to delegate"),
        taskName: z.string().optional().describe("The name of the task (used if taskId is new or just an ID part)"),
        fromMode: z.string().describe("The mode delegating the task"),
        toMode: z.string().describe("The mode receiving the delegation"),
        message: z.string().optional().describe("Additional delegation message or context"),
    };
    const compiledSchema = z.object(schemaRawShape);

    type DelegateTaskArgs = z.infer<typeof compiledSchema>;

    const handler = async (args: DelegateTaskArgs, extra: any) => {
        const { taskId, taskName, fromMode, toMode, message } = args;
        try {
            const effectiveTaskPath = await getTaskPath(taskId, taskName);
            await fs.mkdir(effectiveTaskPath, { recursive: true });
            const taskState = await getTaskState(effectiveTaskPath);
            
            taskState.delegations.push({
                from: fromMode,
                to: toMode,
                timestamp: new Date().toISOString(),
                message: message || `Task delegated from ${fromMode} to ${toMode}`,
            });
            
            taskState.currentOwner = toMode;
            taskState.status = "in-progress";
            taskState.updatedAt = new Date().toISOString();
            if (taskName && !taskState.taskName) taskState.taskName = taskName;
            if (!taskState.taskId) taskState.taskId = taskId.split('-')[0];


            const statePath = path.join(effectiveTaskPath, "task-state.json");
            await fs.writeFile(statePath, JSON.stringify(taskState, null, 2), "utf8");
            
            const displayTaskName = taskState.taskName || path.basename(effectiveTaskPath);
            const textContent = 
`# 🔄 Task Delegated Successfully 🔄

Task '${displayTaskName}' (ID: ${taskState.taskId}) has been delegated from ${fromMode.replace('-mode', '')} to ${toMode.replace('-mode', '')}.

## Next Steps
1. Complete any remaining work in the current ${fromMode.replace('-mode', '')} mode
2. Switch to ${toMode.replace('-mode', '')} mode using the dropdown in the Cursor UI
3. Type "continue task ${taskState.taskId}" to resume the workflow

## Delegation Context
${message || `Task delegated from ${fromMode} to ${toMode}`}`;
            return {
                content: [
                    {
                        type: "text" as const,
                        text: textContent
                    },
                ],
            };
        } catch (err: any) {
            if (extra && extra.logger) extra.logger.error(`DelegateTask Error: ${err.message}`, err);
            return { content: [{ type: "text" as const, text: `Failed to delegate task: ${err.message}` }], isError: true };
        }
    };

    server.tool(toolName, description, schemaRawShape, handler);
    registry.set(toolName, handler);
}

export function registerCompleteTaskTool(server: McpServer, registry: Map<string, Function>) {
    const toolName = "complete_task";
    const description = "Marks a task as completed or rejected by a mode, potentially returning it to the delegator.";
    const schemaRawShape: { [key: string]: ZodTypeAny } = {
        taskId: z.string().describe("The ID of the task to complete"),
        taskName: z.string().optional().describe("The name of the task"),
        mode: z.string().describe("The mode completing the task"),
        status: z.enum(["completed", "rejected"]).describe("Whether the task was completed successfully or rejected"),
        notes: z.string().optional().describe("Additional notes about the completion"),
    };
    const compiledSchema = z.object(schemaRawShape);
    
    type CompleteTaskArgs = z.infer<typeof compiledSchema>;

    const handler = async (args: CompleteTaskArgs, extra: any) => {
        const { taskId, taskName, mode, status, notes } = args;
        try {
            const effectiveTaskPath = await getTaskPath(taskId, taskName);
            await fs.mkdir(effectiveTaskPath, { recursive: true });
            const taskState = await getTaskState(effectiveTaskPath);

            if (taskState.currentOwner && taskState.currentOwner !== mode) {
                return { content: [{ type: "text" as const, text: `Failed to complete task: Task is currently owned by ${taskState.currentOwner}, not ${mode}.` }], isError: true };
            }
            
            let delegator = null;
            if (taskState.delegations && taskState.delegations.length > 0) {
                for (let i = taskState.delegations.length - 1; i >= 0; i--) {
                    const delegation = taskState.delegations[i];
                    if (delegation.to === mode) {
                        delegator = delegation.from;
                        break;
                    }
                }
            }
            
            taskState.status = status === "completed" ? "completed" : "needs-changes";
            taskState.progress = status === "completed" ? 1.0 : taskState.progress;
            taskState.updatedAt = new Date().toISOString();
            taskState.completionNotes = notes || "";
            if (taskName && !taskState.taskName) taskState.taskName = taskName;
            if (!taskState.taskId) taskState.taskId = taskId.split('-')[0];


            if (delegator) {
                taskState.currentOwner = delegator;
                taskState.delegations.push({
                    from: mode,
                    to: delegator,
                    timestamp: new Date().toISOString(),
                    message: `Task ${status} by ${mode} and returned to ${delegator}.`,
                    status: status,
                    notes: notes || "",
                });
            } else {
                taskState.currentOwner = null;
            }
            
            const statePath = path.join(effectiveTaskPath, "task-state.json");
            await fs.writeFile(statePath, JSON.stringify(taskState, null, 2), "utf8");
            
            const displayTaskName = taskState.taskName || path.basename(effectiveTaskPath);
            const textContent = 
`# ✅ Task ${status.toUpperCase()} ✅

Task '${displayTaskName}' (ID: ${taskState.taskId}) marked as ${status} by ${mode.replace('-mode', '')}${delegator ? ` and returned to ${delegator.replace('-mode', '')}` : ""}.

## Next Steps
${delegator ? 
`1. Complete any remaining work in the current ${mode.replace('-mode', '')} mode\n` +
`2. Switch to ${delegator.replace('-mode', '')} mode using the dropdown in the Cursor UI\n` +
`3. Type "continue task ${taskState.taskId}" to resume the workflow\n\n` : 
`Task is now ${status}.\n\n`}
## Completion Notes
${notes || `Task ${status} by ${mode}`}`;
            return {
                content: [
                    {
                        type: "text" as const,
                        text: textContent
                    },
                ],
            };
        } catch (err: any) {
            if (extra && extra.logger) extra.logger.error(`CompleteTask Error: ${err.message}`, err);
            return { content: [{ type: "text" as const, text: `Failed to complete task: ${err.message}` }], isError: true };
        }
    };

    server.tool(toolName, description, schemaRawShape, handler);
    registry.set(toolName, handler);
}

export function registerGetCurrentModeForTaskTool(server: McpServer, registry: Map<string, Function>) {
    const toolName = "get_current_mode_for_task";
    const description = "Gets the current mode/role that owns a specific task.";
    const schemaRawShape: { [key: string]: ZodTypeAny } = {
        taskId: z.string().describe("The ID of the task to check"),
    };
    const compiledSchema = z.object(schemaRawShape);

    type GetCurrentModeArgs = z.infer<typeof compiledSchema>;

    const handler = async (args: GetCurrentModeArgs, extra: any) => {
        const { taskId } = args;
        try {
            const taskPath = await getTaskPath(taskId);
            const taskState = await getTaskState(taskPath);
            const currentMode = taskState.currentOwner || "unknown";
            const displayTaskName = taskState.taskName || taskId;
            return {
                content: [{ type: "text" as const, text: `Current mode for task '${displayTaskName}' (ID: ${taskState.taskId}): ${currentMode}` }],
                currentMode: currentMode,
            };
        } catch (err: any) {
            if (extra && extra.logger) extra.logger.error(`GetCurrentMode Error: ${err.message}`, err);
            return { content: [{ type: "text" as const, text: `Failed to get current mode: ${err.message}` }], isError: true };
        }
    };

    server.tool(toolName, description, schemaRawShape, handler);
    registry.set(toolName, handler);
}

export function registerContinueTaskTool(server: McpServer, registry: Map<string, Function>) {
    const toolName = "continue_task";
    const description = "Provides context for continuing a task based on its current state.";
    const schemaRawShape: { [key: string]: ZodTypeAny } = {
        taskId: z.string().describe("The ID of the task to continue"),
    };
    const compiledSchema = z.object(schemaRawShape);
    
    type ContinueTaskArgs = z.infer<typeof compiledSchema>;

    const handler = async (args: ContinueTaskArgs, extra: any) => {
        const { taskId } = args;
        try {
            const taskPath = await getTaskPath(taskId);
            const taskState = await getTaskState(taskPath);
            const currentMode = taskState.currentOwner || "boomerang-mode";
            const displayTaskName = taskState.taskName || taskId;
            const textContent = 
`# ▶️ Continuing Task: ${displayTaskName} (ID: ${taskState.taskId})

You are currently in **${currentMode.replace('-mode', '')}** mode for this task.
Review the task context, status, and any previous notes or delegation messages to proceed.`;
            return {
                content: [
                    {
                        type: "text" as const,
                        text: textContent
                    },
                ],
            };
        } catch (err: any) {
            if (extra && extra.logger) extra.logger.error(`ContinueTask Error: ${err.message}`, err);
            return { content: [{ type: "text" as const, text: `Failed to continue task: ${err.message}` }], isError: true };
        }
    };

    server.tool(toolName, description, schemaRawShape, handler);
    registry.set(toolName, handler);
}

export function registerTaskDashboardTool(server: McpServer, registry: Map<string, Function>) {
    const toolName = "task_dashboard";
    const description = "Displays a dashboard summarizing all current tasks.";
    const schemaRawShape: { [key: string]: ZodTypeAny } = {};
    const compiledSchema = z.object(schemaRawShape);
    
    type TaskDashboardArgs = z.infer<typeof compiledSchema>;

    const handler = async (args: TaskDashboardArgs, extra: any) => {
        try {
            const taskDirs = await fs.readdir(TASK_TRACKING_PATH, { withFileTypes: true });
            const tasksData = [];
            for (const dir of taskDirs) {
                if (dir.isDirectory()) {
                    // dir.name is the full folder name, e.g., TSK-001-MyTask
                    // getTaskPath(dir.name) will resolve it directly.
                    // Then getTaskState uses that path.
                    const individualTaskPath = await getTaskPath(dir.name); // Use getTaskPath for consistency
                    const taskState = await getTaskState(individualTaskPath);
                    tasksData.push({
                        id: taskState.taskId,
                        name: taskState.taskName,
                        status: taskState.status,
                        owner: taskState.currentOwner,
                        updated: taskState.updatedAt,
                    });
                }
            }
            
            let markdown = "# 📊 Task Dashboard\n\n| ID | Task Name | Status | Current Owner | Last Updated |\n|----|-----------|--------|---------------|--------------|\n";
            if (tasksData.length > 0) {
                tasksData.sort((a,b) => (a.id || "").localeCompare(b.id || "")); // Sort by ID
                tasksData.forEach(task => {
                    markdown += `| ${task.id || 'N/A'} | ${task.name || 'N/A'} | ${task.status || 'N/A'} | ${task.owner ? task.owner.replace('-mode', '') : 'N/A'} | ${task.updated ? new Date(task.updated).toLocaleString() : 'N/A'} |\n`;
                });
            } else {
                markdown += "| *No tasks found* | | | | |\n";
            }
            
            return { content: [{ type: "text" as const, text: markdown }] };
        } catch (err: any) {
            if (extra && extra.logger) extra.logger.error(`TaskDashboard Error: ${err.message}`, err);
            return { content: [{ type: "text" as const, text: `Failed to generate task dashboard: ${err.message}` }], isError: true };
        }
    };
    
    server.tool(toolName, description, schemaRawShape, handler);
    registry.set(toolName, handler);
}

export function registerWorkflowMapTool(server: McpServer, registry: Map<string, Function>) {
    const toolName = "workflow_map";
    const description = "Displays a Mermaid diagram of the workflow, optionally highlighting the current task's mode.";
    const schemaRawShape: { [key: string]: ZodTypeAny } = {
        taskId: z.string().optional().describe("Optional Task ID to highlight its current mode in the map"),
    };
    const compiledSchema = z.object(schemaRawShape);

    type WorkflowMapArgs = z.infer<typeof compiledSchema>;

    const handler = async (args: WorkflowMapArgs, extra: any) => {
        const { taskId } = args;
        let currentModeVal = null;
        if (taskId) {
            try {
                const taskPath = await getTaskPath(taskId);
                const taskState = await getTaskState(taskPath);
                currentModeVal = taskState.currentOwner;
            } catch (err: any) {
                 if (extra && extra.logger) extra.logger.warn(`WorkflowMap: Could not get state for task ${taskId}: ${err.message}`);
            }
        }

        const modes = [
            { id: "boomerang-mode", name: "🪃 Boomerang", description: "Task Intake, Analysis, Final Verification" },
            { id: "researcher-expert-mode", name: "🔬 Researcher", description: "In-depth Research (Optional)" },
            { id: "architect-mode", name: "🏛️ Architect", description: "Implementation Planning, Subtask Definition" },
            { id: "senior-developer-mode", name: "👨‍💻 Senior Developer", description: "Subtask Implementation & Testing" },
            { id: "code-review-mode", name: "🔍 Code Review", description: "Quality Assurance, Verification" },
        ];

        let mapText = "# 🗺️ Workflow Map\n\n";
        mapText += "```mermaid\ngraph TD\n";
        mapText += "    A[User Request] --> B(🪃 Boomerang Initial);\n";
        mapText += "    B -->|Needs Research?| C{Decision Point};\n";
        mapText += "    C -- Yes --> D(🔬 Researcher);\n";
        mapText += "    D --> B_Feeds_Research(🪃 Boomerang Integrates Research);\n";
        mapText += "    C -- No / Research Done --> E(🏛️ Architect);\n";
        mapText += "    B_Feeds_Research --> E;\n";
        mapText += "    E --> F(👨‍💻 Senior Developer Subtasks);\n";
        mapText += "    F --> G{All Subtasks Done?};\n";
        mapText += "    G -- No --> F;\n";
        mapText += "    G -- Yes --> H(🏛️ Architect Verifies);\n";
        mapText += "    H --> I(🔍 Code Review);\n";
        mapText += "    I --> J{Review Approved?};\n";
        mapText += "    J -- No --> H;\n";
        mapText += "    J -- Yes --> K(🪃 Boomerang Final Verification);\n";
        mapText += "    K --> L[Deliver to User];\n\n";
        
        modes.forEach(mode => {
            let nodeIdToStyle = "";
            if (mode.id === "boomerang-mode") {
                 if (currentModeVal === mode.id) {
                    mapText += "    style B fill:#00D1B2,stroke:#333,stroke-width:2px\n";
                    mapText += "    style B_Feeds_Research fill:#00D1B2,stroke:#333,stroke-width:2px\n";
                    mapText += "    style K fill:#00D1B2,stroke:#333,stroke-width:2px\n";
                 }
            } else {
                 if (mode.id === "researcher-expert-mode") nodeIdToStyle = "D";
                 else if (mode.id === "architect-mode") nodeIdToStyle = "E"; 
                 else if (mode.id === "senior-developer-mode") nodeIdToStyle = "F";
                 else if (mode.id === "code-review-mode") nodeIdToStyle = "I";
                 if (nodeIdToStyle && mode.id === currentModeVal) {
                    mapText += `    style ${nodeIdToStyle} fill:#00D1B2,stroke:#333,stroke-width:2px\n`;
                 }
            }
        });
        mapText += "```\\n";

        mapText += "\\n## Roles & Focus\\n";
        modes.forEach(mode => {
            mapText += `### \${mode.name} \${mode.id === currentModeVal ? "(Current Focus)" : ""}\\n- \${mode.description}\\n`;
        });

        return { content: [{ type: "text" as const, text: mapText }] };
    };

    server.tool(toolName, schemaRawShape, handler);
    registry.set(toolName, handler);
}

export function registerTransitionRoleTool(server: McpServer, registry: Map<string, Function>) {
    const toolName = "transition_role";
    const description = "Transitions a task between different roles/modes in the workflow.";
    const schemaRawShape: { [key: string]: ZodTypeAny } = {
        taskId: z.string().describe("The ID of the task being transitioned"),
        taskName: z.string().optional().describe("The name of the task (optional)"),
        fromRole: z.string().describe("The role transitioning from"),
        toRole: z.string().describe("The role transitioning to"),
        summary: z.string().optional().describe("Summary of work completed by the fromRole"),
    };
    const compiledSchema = z.object(schemaRawShape);

    type TransitionRoleArgs = z.infer<typeof compiledSchema>;
    
    const handler = async (args: TransitionRoleArgs, extra: any) => {
        const { taskId, taskName, fromRole, toRole, summary } = args;
        try {
            const effectiveTaskPath = await getTaskPath(taskId, taskName);
            await fs.mkdir(effectiveTaskPath, { recursive: true });
            const taskState = await getTaskState(effectiveTaskPath);

            taskState.delegations.push({
                from: fromRole,
                to: toRole,
                timestamp: new Date().toISOString(),
                message: summary || `Transitioned from ${fromRole} to ${toRole}`,
            });
            taskState.currentOwner = toRole;
            taskState.status = "in-progress";
            taskState.updatedAt = new Date().toISOString();
            if (taskName && !taskState.taskName) taskState.taskName = taskName;
            if (!taskState.taskId) taskState.taskId = taskId.split('-')[0];

            const statePath = path.join(effectiveTaskPath, "task-state.json");
            await fs.writeFile(statePath, JSON.stringify(taskState, null, 2), "utf8");

            const fromEmoji = getEmojiForRole(fromRole);
            const toEmoji = getEmojiForRole(toRole);
            const displayTaskName = taskState.taskName || path.basename(effectiveTaskPath);

            const textContent = 
`# ✈️ Role Transition: ${fromEmoji} ${fromRole.replace("-role","")} -> ${toEmoji} ${toRole.replace("-role","")}

Task '${displayTaskName}' (ID: ${taskState.taskId}) has transitioned from **${fromRole.replace("-role","")}** to **${toRole.replace("-role","")}**.

${summary ? `## Summary from ${fromRole.replace("-role","")}:\n${summary}\n\n` : ""}The task is now with ${toEmoji} ${toRole.replace("-role","")}. The new role should now take over.`;
            return {
                content: [
                    {
                        type: "text" as const,
                        text: textContent
                    },
                ],
            };
        } catch (err: any) {
            if (extra && extra.logger) extra.logger.error(`TransitionRole Error: ${err.message}`, err);
            return { content: [{ type: "text" as const, text: `Failed to transition role: ${err.message}` }], isError: true };
        }
    };

    server.tool(toolName, description, schemaRawShape, handler);
    registry.set(toolName, handler);
}

export function registerWorkflowStatusTool(server: McpServer, registry: Map<string, Function>) {
    const toolName = "workflow_status";
    const description = "Gets the detailed workflow status for a specific task.";
    const schemaRawShape: { [key: string]: ZodTypeAny } = {
        taskId: z.string().describe("The ID of the task to get workflow status for"),
    };
    const compiledSchema = z.object(schemaRawShape);
    
    type WorkflowStatusArgs = z.infer<typeof compiledSchema>;

    const handler = async (args: WorkflowStatusArgs, extra: any) => {
        const { taskId } = args;
        try {
            const taskPath = await getTaskPath(taskId);
            const taskState = await getTaskState(taskPath);
            const displayTaskName = taskState.taskName || taskId;

            let workflow = `# 📝 Workflow Status for: ${displayTaskName} (ID: ${taskState.taskId})\n\n`;
            workflow += `**Status**: ${taskState.status || 'N/A'}\n`;
            workflow += `**Current Owner**: ${taskState.currentOwner ? getEmojiForMode(taskState.currentOwner) + " " + taskState.currentOwner.replace('-mode','').replace('-role','') : 'N/A'}\n`;
            workflow += `**Progress**: ${taskState.progress !== undefined ? (taskState.progress * 100).toFixed(0) + '%' : 'N/A'}\n`;
            workflow += `**Last Updated**: ${taskState.updatedAt ? new Date(taskState.updatedAt).toLocaleString() : 'N/A'}\n`;
            
            if (taskState.statusNotes && taskState.statusNotes.length > 0) {
                workflow += "\n## Recent Status Updates:\n";
                taskState.statusNotes.slice(-3).forEach((note: any) => {
                    workflow += `- **[${new Date(note.timestamp).toLocaleString()}] (${note.status || 'Note'})**: ${note.notes || note.note}\n`;
                });
            }
            
            if (taskState.notesLog && taskState.notesLog.length > 0) {
                workflow += "\n## Recent General Notes:\n";
                taskState.notesLog.slice(-3).forEach((log: any) => {
                     workflow += `- **[${new Date(log.timestamp).toLocaleString()}]**: ${log.note}\n`;
                });
            }

            workflow += "\n## Current Position\n\n";
            const currentMode = taskState.currentOwner || "unknown";
            const currentEmoji = getEmojiForMode(currentMode);
            workflow += `**${currentEmoji} ${currentMode.replace("-mode", "").toUpperCase()}**\n\n`;
            
            workflow += "## Delegation History\n\n";
            if (taskState.delegations && taskState.delegations.length > 0) {
                for (const del of taskState.delegations) {
                    const fromEmoji = getEmojiForMode(del.from);
                    const toEmoji = getEmojiForMode(del.to);
                    workflow += `- ${new Date(del.timestamp).toLocaleString()}: ${fromEmoji} ${del.from.replace('-mode','')} -> ${toEmoji} ${del.to.replace('-mode','')} - Msg: ${del.message ? del.message.substring(0,100) + (del.message.length > 100 ? '...':'') : 'N/A'}\n`;
                }
            } else {
                workflow += "No delegation history.\n";
            }

            return { content: [{ type: "text" as const, text: workflow }] };
        } catch (err: any) {
            if (extra && extra.logger) extra.logger.error(`WorkflowStatus Error: ${err.message}`, err);
            return { content: [{ type: "text" as const, text: `Failed to get workflow status: ${err.message}` }], isError: true };
        }
    };

    server.tool(toolName, description, schemaRawShape, handler);
    registry.set(toolName, handler);
}

// Note: createTaskTool, getTaskContextTool, updateTaskStatusTool, listTasksTool,
// deleteTaskTool, addTaskNoteTool, updateTaskDescriptionTool, getTaskStatusTool
// are assumed to be in other files (e.g., createTaskTool.ts) and would need similar modifications
// if they are to be part of this registry pattern.
// For this example, we'll assume they are either not called internally by the command processor
// or are handled differently. The prompt focuses on the *workflow* tools.
// If they are defined in this file, they'd need the same pattern:
// export function registerCreateTaskTool(server: McpServer, returnHandlerInsteadOfRegistering?: boolean) {
//    const toolName = "create_task";
//    const schema = {...};
//    const handler = async ({...}) => {...};
//    if (returnHandlerInsteadOfRegistering) return handler;
//    server.tool(toolName, schema, handler);
// }
// ... and so on for the others.