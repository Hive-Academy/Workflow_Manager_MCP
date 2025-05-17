import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";
import { getTaskPath, getTaskState } from "./workflowTools.js"; // Import helpers

// const REPO_ROOT = process.env.REPO_ROOT || "./"; // Removed
// const TASK_TRACKING_PATH = path.join(REPO_ROOT, "task-tracking"); // Removed

export function registerGetTaskStatusTool(server: McpServer, registry: Map<string, Function>) {
  const toolName = "get_task_status";
  const schemaRawShape = {
    taskId: z.string().describe("The ID of the task to get status for"),
    taskName: z.string().optional().describe("The name of the task (optional, used for folder structure if ID is not full path)"),
  };

  type GetTaskStatusArgs = {
    taskId: string;
    taskName?: string | undefined;
  };

  const handler = async (args: GetTaskStatusArgs, extra: any) => {
    const { taskId, taskName } = args;
    try {
      const effectiveTaskPath = await getTaskPath(taskId, taskName);
      const taskState = await getTaskState(effectiveTaskPath);
      const displayFolderName = path.basename(effectiveTaskPath);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({
              taskId: taskState.taskId || taskId.split('-')[0],
              taskName: taskState.taskName || (taskName ? taskName : displayFolderName.replace(/^TSK-\d+-/, '').replace(/_/g, ' ')),
              status: taskState.status,
              currentOwner: taskState.currentOwner,
              updatedAt: taskState.updatedAt,
              statusNotes: taskState.statusNotes ? taskState.statusNotes.slice(-1) : [] // Last status note
            }, null, 2),
          },
        ],
      };
    } catch (err: any) {
      if (extra && extra.logger && typeof extra.logger.error === 'function') {
        extra.logger.error(`Failed to get task status for '${taskId}': ${err.message}`, { error: err });
      }
      return {
        content: [
          {
            type: "text" as const,
            text: `Failed to get task status: ${err.message}`,
          },
        ],
        isError: true,
      };
    }
  };

  server.tool(toolName, schemaRawShape, handler);
  registry.set(toolName, handler);
} 