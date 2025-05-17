import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";
import { getTaskPath, getTaskState } from "./workflowTools.js"; // Import helpers

// const REPO_ROOT = process.env.REPO_ROOT || "./"; // Removed
// const TASK_TRACKING_PATH = path.join(REPO_ROOT, "task-tracking"); // Removed

export function registerAddTaskNoteTool(server: McpServer, registry: Map<string, Function>) {
  const toolName = "add_task_note";
  const schemaRawShape = {
    taskId: z.string().describe("The ID of the task to add a note to"),
    taskName: z.string().optional().describe("The name of the task (optional, used for folder structure if ID is not full path)"),
    note: z.string().describe("The note to add"),
  };

  type AddTaskNoteArgs = {
    taskId: string;
    taskName?: string | undefined;
    note: string;
  };

  const handler = async (args: AddTaskNoteArgs, extra: any) => {
    const { taskId, taskName, note } = args;
    try {
      const effectiveTaskPath = await getTaskPath(taskId, taskName);
      const taskState = await getTaskState(effectiveTaskPath);

      taskState.notesLog = taskState.notesLog || [];
      taskState.notesLog.push({
        timestamp: new Date().toISOString(),
        note,
      });
      taskState.updatedAt = new Date().toISOString();
      if (taskName && !taskState.taskName) taskState.taskName = taskName;
      if (!taskState.taskId) taskState.taskId = taskId.split('-')[0];

      const statePath = path.join(effectiveTaskPath, "task-state.json");
      await fs.writeFile(statePath, JSON.stringify(taskState, null, 2), "utf8");
      
      const displayIdentifier = taskState.taskName || path.basename(effectiveTaskPath);
      return {
        content: [
          {
            type: "text" as const,
            text: `Note added to task '${displayIdentifier}'.`,
          },
        ],
      };
    } catch (err: any) {
      if (extra && extra.logger && typeof extra.logger.error === 'function') {
        extra.logger.error(`Failed to add note to task '${taskId}': ${err.message}`, { error: err });
      }
      return {
        content: [
          {
            type: "text" as const,
            text: `Failed to add note: ${err.message}`,
          },
        ],
        isError: true,
      };
    }
  };

  server.tool(toolName, schemaRawShape, handler);
  registry.set(toolName, handler);
} 