import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z, ZodTypeAny } from "zod";
import * as fs from "fs/promises";
import * as path from "path";
import { getTaskPath, getTaskState } from "./workflowTools.js"; // Import helpers

// const REPO_ROOT = process.env.REPO_ROOT || "./"; // Removed
// const TASK_TRACKING_PATH = path.join(REPO_ROOT, "task-tracking"); // Removed

export function registerUpdateTaskStatusTool(server: McpServer, registry: Map<string, Function>) {
  const toolName = "update_task_status";
  const description = "Updates the status, progress, and notes for a specific task.";
  const schemaRawShape: { [key: string]: ZodTypeAny } = {
    taskId: z.string().describe("The ID of the task to update"),
    taskName: z.string().optional().describe("The name of the task (optional, used for folder structure if ID is not full path)"),
    status: z.enum(["not-started", "in-progress", "needs-review", "completed", "needs-changes", "blocked"]).describe("The new status of the task"),
    progress: z.number().min(0).max(1).optional().describe("The progress percentage (0-1)"),
    notes: z.string().optional().describe("Additional notes about the status update"),
  };
  const compiledSchema = z.object(schemaRawShape);

  type UpdateTaskStatusArgs = z.infer<typeof compiledSchema>;

  const handler = async (args: UpdateTaskStatusArgs, extra: any) => {
    const { taskId, taskName, status, progress, notes } = args;
    try {
      const effectiveTaskPath = await getTaskPath(taskId, taskName);
      
      const taskState = await getTaskState(effectiveTaskPath);
      
      taskState.status = status;
      if (progress !== undefined) taskState.progress = progress;
      if (notes) {
        taskState.statusNotes = taskState.statusNotes || [];
        taskState.statusNotes.push({
          timestamp: new Date().toISOString(),
          status,
          notes,
        });
      }
      taskState.updatedAt = new Date().toISOString();
      if (!taskState.createdAt) taskState.createdAt = new Date().toISOString();
      if (taskName && !taskState.taskName) taskState.taskName = taskName;
      if (!taskState.taskId) taskState.taskId = taskId.split('-')[0];

      const statePath = path.join(effectiveTaskPath, "task-state.json");
      await fs.writeFile(statePath, JSON.stringify(taskState, null, 2), "utf8");
      const displayIdentifier = taskState.taskName || path.basename(effectiveTaskPath);
      return {
        content: [
          {
            type: "text" as const,
            text: `Task '${displayIdentifier}' status updated to '${status}'.${notes ? " Notes: " + notes : ""}`,
          },
        ],
      };
    } catch (err: any) {
      if (extra && extra.logger && typeof extra.logger.error === 'function') {
        extra.logger.error(`Failed to update task status: ${err.message}`, { error: err });
      }
      return {
        content: [
          {
            type: "text" as const,
            text: `Failed to update task status: ${err.message}`,
          },
        ],
        isError: true,
      };
    }
  };

  server.tool(toolName, description, schemaRawShape, handler);
  registry.set(toolName, handler);
} 