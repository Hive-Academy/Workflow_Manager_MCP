import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { McpModule, McpTransportType } from '@rekog/mcp-nest';
import { TaskWorkflowModule } from './task-workflow/task-workflow.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    McpModule.forRoot({
      name: process.env.MCP_SERVER_NAME || 'Roocode-MCP-Nest-Server',
      version: '0.1.0',
      instructions: 'MCP Server for Roocode Workflow, refactored with NestJS.',
      transport: McpTransportType.STDIO,
    }),
    TaskWorkflowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
