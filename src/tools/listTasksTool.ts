import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as fs from "fs/promises";
import * as path from "path";
import { TASK_TRACKING_PATH } from "./workflowTools.js";

// const REPO_ROOT = process.env.REPO_ROOT || "./";
// const TASK_TRACKING_PATH = path.join(REPO_ROOT, "task-tracking");

export function registerListTasksTool(server: McpServer, registry: Map<string, Function>) {
  const toolName = "list_tasks";
  const description = "Lists all tasks (directories) in the task-tracking folder.";
  const schemaRawShape = {}; // No specific parameters for listing tasks

  // Type for handler arguments, empty for this tool
  type ListTasksArgs = {}; 

  const handler = async (args: ListTasksArgs, extra: any) => {
    try {
      const folders = await fs.readdir(TASK_TRACKING_PATH, { withFileTypes: true });
      const tasks = folders.filter(f => f.isDirectory()).map(f => f.name);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(tasks, null, 2),
          },
        ],
      };
    } catch (err: any) {
      if (extra && extra.logger && typeof extra.logger.error === 'function') {
        extra.logger.error(`Failed to list tasks: ${err.message}`, { error: err });
      }
      return {
        content: [
          { type: "text" as const, text: `Failed to list tasks: ${err.message}` },
        ],
        isError: true,
      };
    }
  };

  server.tool(toolName, description, schemaRawShape, handler);
  registry.set(toolName, handler);
} 