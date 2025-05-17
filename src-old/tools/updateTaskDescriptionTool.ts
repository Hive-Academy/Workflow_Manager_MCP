import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";
import { getTaskPath, getTaskState } from "./workflowTools.js"; // Import helpers

// const REPO_ROOT = process.env.REPO_ROOT || "./"; // Removed
// const TASK_TRACKING_PATH = path.join(REPO_ROOT, "task-tracking"); // Removed

export function registerUpdateTaskDescriptionTool(server: McpServer, registry: Map<string, Function>) {
  const toolName = "update_task_description";
  const schemaRawShape = {
    taskId: z.string().describe("The ID of the task to update description for"),
    taskName: z.string().optional().describe("The name of the task (optional, used for folder structure if ID is not full path)"),
    description: z.string().describe("The new description for the task"), // Renamed from newDescription for consistency
  };

  type UpdateTaskDescriptionArgs = {
    taskId: string;
    taskName?: string | undefined;
    description: string;
  };

  const handler = async (args: UpdateTaskDescriptionArgs, extra: any) => {
    const { taskId, taskName, description } = args;
    try {
      const effectiveTaskPath = await getTaskPath(taskId, taskName);
      const taskState = await getTaskState(effectiveTaskPath);

      taskState.description = description;
      taskState.updatedAt = new Date().toISOString();
      if (taskName && !taskState.taskName) taskState.taskName = taskName;
      if (!taskState.taskId) taskState.taskId = taskId.split('-')[0];

      // Also update the task-description.md file if it exists, or create it.
      const descriptionFilePath = path.join(effectiveTaskPath, "task-description.md");
      await fs.writeFile(descriptionFilePath, description, "utf8");

      const statePath = path.join(effectiveTaskPath, "task-state.json");
      await fs.writeFile(statePath, JSON.stringify(taskState, null, 2), "utf8");

      const displayIdentifier = taskState.taskName || path.basename(effectiveTaskPath);
      return {
        content: [
          {
            type: "text" as const,
            text: `Description updated for task '${displayIdentifier}' and task-description.md file saved.`,
          },
        ],
      };
    } catch (err: any) {
      if (extra && extra.logger && typeof extra.logger.error === 'function') {
        extra.logger.error(`Failed to update task description for '${taskId}': ${err.message}`, { error: err });
      }
      return {
        content: [
          {
            type: "text" as const,
            text: `Failed to update description: ${err.message}`,
          },
        ],
        isError: true,
      };
    }
  };

  server.tool(toolName, schemaRawShape, handler);
  registry.set(toolName, handler);
} 