import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z, ZodTypeAny } from "zod";
import * as fs from "fs/promises";
import * as path from "path";
import { getTaskPath, getTaskState } from "./workflowTools.js"; // Import helpers

// const REPO_ROOT = process.env.REPO_ROOT || "./"; // Removed
// const TASK_TRACKING_PATH = path.join(REPO_ROOT, "task-tracking"); // Removed

export function registerGetTaskContextTool(server: McpServer, registry: Map<string, Function>) {
  const toolName = "get_task_context";
  const description = "Retrieves the context for a given task, including its description, implementation plan, and current state.";
  
  const schemaRawShape: { [key: string]: ZodTypeAny } = {
    taskId: z.string().describe("The ID of the task to get context for (e.g., TSK-001)"),
    taskName: z.string().optional().describe("The name of the task (optional, used to help locate the folder if taskId is just the ID part, e.g., Implement Feature X)"),
  };
  const compiledSchema = z.object(schemaRawShape);

  type GetTaskContextArgs = z.infer<typeof compiledSchema>;

  const handler = async (args: GetTaskContextArgs, extra: any) => {
    const { taskId, taskName } = args;
    try {
      const effectiveTaskPath = await getTaskPath(taskId, taskName);
      
      const taskState = await getTaskState(effectiveTaskPath);

      let taskDescriptionContent = "";
      try {
        taskDescriptionContent = await fs.readFile(
          path.join(effectiveTaskPath, "task-description.md"),
          "utf8"
        );
      } catch (descErr: any) {
        // It's okay if this file doesn't exist, might be a new task
        if (extra && extra.logger && typeof extra.logger.warn === 'function') {
          extra.logger.warn(`task-description.md not found for ${effectiveTaskPath}: ${descErr.message}`);
        }
      }

      let implementationPlanContent = "";
      try {
        implementationPlanContent = await fs.readFile(
          path.join(effectiveTaskPath, "implementation-plan.md"),
          "utf8"
        );
      } catch (planErr: any) {
        // It's okay if this file doesn't exist
         if (extra && extra.logger && typeof extra.logger.warn === 'function') {
          extra.logger.warn(`implementation-plan.md not found for ${effectiveTaskPath}: ${planErr.message}`);
        }
      }
      
      const displayFolderName = path.basename(effectiveTaskPath);
      const fullContext = {
        ...taskState, 
        taskId: taskState.taskId || taskId.split('-')[0], 
        taskName: taskState.taskName || (taskName ? taskName : displayFolderName.replace(/^TSK-\d+-/, '').replace(/_/g, ' ')), 
        taskDescription: taskDescriptionContent,
        implementationPlan: implementationPlanContent,
      };

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(fullContext, null, 2),
          },
        ],
      };
    } catch (err: any) {
      if (extra && extra.logger && typeof extra.logger.error === 'function') {
        extra.logger.error(`Failed to get task context for '${taskId}': ${err.message}`, { error: err });
      }
      return {
        content: [
          { type: "text" as const, text: `Failed to get task context for '${taskId}': ${err.message}` },
        ],
        isError: true,
      };
    }
  };

  server.tool(toolName, description, schemaRawShape, handler);
  registry.set(toolName, handler);
} 