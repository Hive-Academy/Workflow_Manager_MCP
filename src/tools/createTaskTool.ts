import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z, ZodTypeAny } from "zod";
import * as fs from "fs/promises";
import * as path from "path";
import { TASK_TRACKING_PATH, getTaskPath } from "./workflowTools.js";

// const REPO_ROOT = process.env.REPO_ROOT || "./"; // Removed
// const TASK_TRACKING_PATH = path.join(REPO_ROOT, "task-tracking"); // Removed

export function registerCreateTaskTool(server: McpServer, registry: Map<string, Function>) {
  const toolName = "create_task";
  const description = "Creates a new task, including its directory and initial state file.";
  const schemaRawShape: { [key: string]: ZodTypeAny } = {
    taskId: z.string().describe("The unique ID for the new task (e.g., TSK-001)"),
    taskName: z.string().describe("The descriptive name of the new task (e.g., Implement Feature X)"),
    description: z.string().optional().describe("A more detailed description of what the task entails"),
  };
  const compiledSchema = z.object(schemaRawShape);

  type CreateTaskArgs = z.infer<typeof compiledSchema>;

  const handler = async (args: CreateTaskArgs, extra: any) => {
    const { taskId, taskName, description: taskDescFromArgs } = args;
    try {
      // Use the refactored getTaskPath to determine the correct and full task path
      const taskPath = await getTaskPath(taskId, taskName);
      
      // Ensure the specific task directory exists (getTaskPath ensures base TASK_TRACKING_PATH exists)
      await fs.mkdir(taskPath, { recursive: true }); 
      
      const initialState = {
        taskId,
        taskName,
        description: taskDescFromArgs || "",
        status: "not-started",
        progress: 0,
        currentOwner: "boomerang-mode",
        delegations: [],
        notesLog: [],
        statusNotes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      await fs.writeFile(
        path.join(taskPath, "task-state.json"),
        JSON.stringify(initialState, null, 2),
        "utf8"
      );
      
      if (taskDescFromArgs) {
        await fs.writeFile(path.join(taskPath, "task-description.md"), taskDescFromArgs, "utf8");
      }
      
      return {
        content: [
          {
            type: "text" as const,
            text: `Task '${taskName}' (ID: ${taskId}) created successfully in folder '${path.basename(taskPath)}'. Default owner: boomerang-mode.`,
          },
        ],
      };
    } catch (err: any) {
      if (extra && extra.logger && typeof extra.logger.error === 'function') {
        extra.logger.error(`Failed to create task '${taskId}-${taskName}': ${err.message}`, { error: err });
      }
      return {
        content: [
          {
            type: "text" as const,
            text: `Failed to create task '${taskId}-${taskName}': ${err.message}`,
          },
        ],
        isError: true
      };
    }
  };

  server.tool(toolName, description, schemaRawShape, handler);
  registry.set(toolName, handler);
} 