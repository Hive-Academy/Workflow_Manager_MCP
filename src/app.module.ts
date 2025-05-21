import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { McpModule, McpTransportType } from '@rekog/mcp-nest';
import { TaskWorkflowModule } from './task-workflow/task-workflow.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    McpModule.forRoot({
      name: process.env.MCP_SERVER_NAME || 'MCP-Nest-Server',
      version: '0.1.0',
      instructions: 'MCP Server for Workflow Manager.',
      transport: McpTransportType.SSE,
    }),
    TaskWorkflowModule,
  ],
})
export class AppModule {}
