import express, { Request, Response } from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
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
    registerWorkflowMapTool
} from "./tools/workflowTools.js";
import { randomUUID } from "crypto";

const app = express();
app.use(express.json());

function getServer() {
    const server = new McpServer({ name: "workflow-manager", version: "1.0.0" });
    registerCreateTaskTool(server);
    registerGetTaskContextTool(server);
    registerUpdateTaskStatusTool(server);
    registerListTasksTool(server);
    registerDeleteTaskTool(server);
    registerAddTaskNoteTool(server);
    registerUpdateTaskDescriptionTool(server);
    registerGetTaskStatusTool(server);
    registerDelegateTaskTool(server);
    registerCompleteTaskTool(server);
    registerGetCurrentModeForTaskTool(server);
    registerContinueTaskTool(server);
    registerTaskDashboardTool(server);
    registerWorkflowMapTool(server);
    return server;
}

// --- Streamable HTTP (modern MCP clients) ---
app.post("/mcp", async (req: Request, res: Response) => {
    try {
        const server = getServer();
        const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
        res.on("close", () => {
            transport.close();
            server.close();
        });
        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                jsonrpc: "2.0",
                error: { code: -32603, message: "Internal server error" },
                id: null,
            });
        }
    }
});
app.get("/mcp", (req: Request, res: Response) => {
    res.status(405).json({
        jsonrpc: "2.0",
        error: { code: -32000, message: "Method not allowed." },
        id: null,
    });
});
app.delete("/mcp", (req: Request, res: Response) => {
    res.status(405).json({
        jsonrpc: "2.0",
        error: { code: -32000, message: "Method not allowed." },
        id: null,
    });
});

// --- SSE (legacy/remote MCP clients, e.g., Cursor) ---
// Session management for SSE
const sseTransports: Record<string, SSEServerTransport> = {};
const sseServers: Record<string, McpServer> = {};

// GET /sse: Establish SSE stream and session
app.get("/sse", async (req: Request, res: Response) => {
    const sessionId = randomUUID();
    const server = getServer();
    const transport = new SSEServerTransport("/messages", res);
    sseTransports[sessionId] = transport;
    sseServers[sessionId] = server;
    res.on("close", () => {
        transport.close();
        server.close();
        delete sseTransports[sessionId];
        delete sseServers[sessionId];
    });
    await server.connect(transport);
    // Do not send any response here; the transport handles it
});

// POST /messages: Handle client-to-server messages for SSE
app.post("/messages", async (req: Request, res: Response) => {
    const sessionId = req.query.sessionId as string || req.headers["x-session-id"] as string;
    if (!sessionId || !sseTransports[sessionId]) {
        res.status(400).json({ error: "Invalid or missing sessionId" });
        return;
    }
    const transport = sseTransports[sessionId];
    try {
        await transport.handlePostMessage(req, res, req.body);
    } catch (err) {
        res.status(500).json({ error: "Failed to handle message" });
    }
});

// For legacy POST /sse (some clients may use this to initiate session)
app.post("/sse", async (req: Request, res: Response) => {
    res.status(405).json({ error: "Use GET /sse to establish SSE session." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
// No console.log here to avoid non-protocol stdout output 