import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";
import { getTaskPath, TASK_TRACKING_PATH } from "./workflowTools.js"; // Import helper and TASK_TRACKING_PATH

// const REPO_ROOT = process.env.REPO_ROOT || "./"; // Removed
// const TASK_TRACKING_PATH = path.join(REPO_ROOT, "task-tracking"); // Removed

export function registerDeleteTaskTool(server: McpServer, registry: Map<string, Function>) {
  const toolName = "delete_task";
  const schemaRawShape = {
    taskId: z.string().describe("The ID of the task to delete (e.g., TSK-001 or TSK-001-task-name)"),
    // taskName is not strictly needed if taskId can be the full folder name or just the ID part
  };

  type DeleteTaskArgs = {
    taskId: string;
  };

  const handler = async (args: DeleteTaskArgs, extra: any) => {
    const { taskId } = args;
    try {
      // getTaskPath will find folder by ID-prefix or full name if taskName is not passed.
      const effectiveTaskPath = await getTaskPath(taskId);
      
      // Safety check should still use the imported TASK_TRACKING_PATH
      if (!effectiveTaskPath.startsWith(TASK_TRACKING_PATH) || effectiveTaskPath === TASK_TRACKING_PATH) {
        throw new Error(`Invalid task path resolution for deletion: ${effectiveTaskPath}`);
      }
      
      await fs.rm(effectiveTaskPath, { recursive: true, force: true });
      return {
        content: [
          {
            type: "text" as const,
            text: `Task associated with ID/path '${taskId}' (resolved to ${path.basename(effectiveTaskPath)}) deleted successfully.`,
          },
        ],
      };
    } catch (err: any) {
      if (extra && extra.logger && typeof extra.logger.error === 'function') {
        extra.logger.error(`Failed to delete task '${taskId}': ${err.message}`, { error: err });
      }
      return {
        content: [
          {
            type: "text" as const,
            text: `Failed to delete task '${taskId}': ${err.message}`,
          },
        ],
        isError: true,
      };
    }
  };

  server.tool(toolName, schemaRawShape, handler);
  registry.set(toolName, handler);
}
