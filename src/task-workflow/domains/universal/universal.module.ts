import { Module } from '@nestjs/common';
import { UniversalOperationsService } from './universal-operations.service';
import { WorkflowOperationsService } from './workflow-operations.service';
import { PrismaModule } from '../../../prisma/prisma.module';

/**
 * Universal Operations Module
 *
 * Provides consolidated MCP tools that replace 40+ individual tools:
 *
 * 🎯 CONSOLIDATION BENEFITS:
 * • Reduces complexity from 40+ tools to 3 powerful tools
 * • Leverages full Prisma filtering and querying capabilities
 * • Consistent interface across all entities
 * • Advanced features: transactions, batching, aggregations
 * • Better performance and maintainability
 *
 * 🚀 UNIVERSAL TOOLS:
 * • query_data - Universal querying with Prisma filtering
 * • mutate_data - Universal mutations with transaction support
 * • workflow_operations - Specialized workflow state management
 *
 * 📊 REPLACES THESE DOMAINS:
 * • Query Operations (9 tools) → query_data
 * • CRUD Operations (4 tools) → mutate_data
 * • State Operations (4 tools) → workflow_operations
 * • Implementation Plan Operations (4 tools) → mutate_data
 * • Reporting Operations (13+ tools) → query_data + mutate_data
 * • Interaction Operations (1 tool) → mutate_data
 */
@Module({
  imports: [PrismaModule],
  providers: [UniversalOperationsService, WorkflowOperationsService],
  exports: [UniversalOperationsService, WorkflowOperationsService],
})
export class UniversalModule {}
