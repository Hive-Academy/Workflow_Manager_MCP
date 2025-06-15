# Multi-stage build for optimized Docker Hub deployment with BUILD-TIME MIGRATION DEPLOYMENT
FROM node:22-alpine AS builder

# Add metadata labels for Docker Hub
LABEL org.opencontainers.image.title="MCP Workflow Manager"
LABEL org.opencontainers.image.description="A comprehensive Model Context Protocol server for AI workflow automation and task management"
LABEL org.opencontainers.image.version="1.0.15"
LABEL org.opencontainers.image.authors="Hive Academy <abdallah@nghive.tech>"
LABEL org.opencontainers.image.source="https://github.com/Hive-Academy/Workflow_Manager_MCP"
LABEL org.opencontainers.image.documentation="https://github.com/Hive-Academy/Workflow_Manager_MCP/blob/main/README.md"
LABEL org.opencontainers.image.licenses="MIT"

# Set working directory
WORKDIR /app

# Copy package files and install all dependencies (including dev) for build
COPY package*.json ./
RUN npm ci --ignore-scripts && npm cache clean --force

# Copy source code and Prisma schema
COPY . .

# Generate Prisma client and build TypeScript
RUN npx prisma generate
RUN npm run build

# Create necessary directories for reports
RUN mkdir -p temp/reports temp/rendered-reports templates/reports

# ================================================================================================
# BUILD-TIME MIGRATION AND SEEDING DEPLOYMENT STAGE - Strategic UX Enhancement
# Deploy migrations and seed data during image build for instant container startup
# ================================================================================================
FROM builder AS migration-deployer

# Set build-time database configuration for migration deployment
ENV DATABASE_URL="file:./build-time-migration-db.db"

# Create build-time database directory
RUN mkdir -p ./build-time-db

# STRATEGIC BUILD-TIME MIGRATION AND SEEDING DEPLOYMENT
# Deploy all migrations and seed essential workflow data during build
RUN echo "🔧 DEPLOYING MIGRATIONS AND SEEDING DATA AT BUILD-TIME for instant startup UX..." && \
    npx prisma migrate deploy --schema=./prisma/schema.prisma && \
    echo "✅ BUILD-TIME MIGRATION DEPLOYMENT SUCCESSFUL" && \
    npx prisma db seed && \
    echo "✅ BUILD-TIME DATABASE SEEDING SUCCESSFUL" && \
    ls -la ./build-time-db/ && \
    npx prisma db pull --schema=./prisma/schema.prisma --print && \
    echo "📊 Migration deployment and seeding verification complete"

# ================================================================================================
# Production stage with PRE-DEPLOYED migrations for INSTANT STARTUP
# ================================================================================================
FROM node:22-alpine AS production

# Add same metadata to final image
LABEL org.opencontainers.image.title="MCP Workflow Manager"
LABEL org.opencontainers.image.description="A comprehensive Model Context Protocol server for AI workflow automation and task management"
LABEL org.opencontainers.image.version="1.0.15"
LABEL org.opencontainers.image.authors="Hive Academy <abdallah@nghive.tech>"
LABEL org.opencontainers.image.source="https://github.com/Hive-Academy/Workflow_Manager_MCP"
LABEL org.opencontainers.image.documentation="https://github.com/Hive-Academy/Workflow_Manager_MCP/blob/main/README.md"
LABEL org.opencontainers.image.licenses="MIT"

# Install system dependencies: dumb-init for proper signal handling, curl for health checks, bash for entrypoint script
RUN apk add --no-cache \
    dumb-init \
    curl \
    bash \
    && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

# Set working directory
WORKDIR /app

# Copy package files and install production dependencies only (without running postinstall)
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts && npm cache clean --force

# Fix ownership of node_modules for the nestjs user
RUN chown -R nestjs:nodejs /app/node_modules

# Copy built application and generated Prisma client from builder stage
# NOTE: Unlike npm package, Docker includes full generated client for immediate runtime availability
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder --chown=nestjs:nodejs /app/prisma/onboarding-models.prisma ./prisma/onboarding-models.prisma
COPY --from=builder --chown=nestjs:nodejs /app/prisma/rule-models.prisma ./prisma/rule-models.prisma
COPY --from=builder --chown=nestjs:nodejs /app/prisma/task-models.prisma ./prisma/task-models.prisma
COPY --from=builder --chown=nestjs:nodejs /app/prisma/workflow-enums.prisma ./prisma/workflow-enums.prisma
# STRATEGIC: Migrations folder REQUIRED for verification commands (migrate status, etc.)
# Even with build-time deployment, runtime verification compares deployed vs migration files
COPY --from=builder --chown=nestjs:nodejs /app/prisma/migrations ./prisma/migrations
COPY --from=builder --chown=nestjs:nodejs /app/generated ./generated

# Copy essential workflow rules data for seeding
COPY --from=builder --chown=nestjs:nodejs /app/enhanced-workflow-rules ./enhanced-workflow-rules

# STRATEGIC ENHANCEMENT: Copy pre-deployed migration validation data from migration-deployer stage
# This enables instant startup verification without migration deployment delay
COPY --from=migration-deployer --chown=nestjs:nodejs /app/build-time-db ./build-time-db

# Copy report directories from builder stage
COPY --from=builder --chown=nestjs:nodejs /app/temp ./temp
COPY --from=builder --chown=nestjs:nodejs /app/templates ./templates

# Copy documentation
COPY --chown=nestjs:nodejs README.md ./

# Create data directory for SQLite with proper permissions
RUN mkdir -p /app/data && chown -R nestjs:nodejs /app/data

# Create the actual report directory structure where reports are generated
RUN mkdir -p /app/data/workflow-manager-mcp-reports/temp \
    && chown -R nestjs:nodejs /app/data/workflow-manager-mcp-reports

# Create the reports directory that ReportRenderingService expects
RUN mkdir -p /app/reports/rendered \
    && chown -R nestjs:nodejs /app/reports

# Ensure temp and templates directories exist with proper permissions (for other functionality)
RUN chown -R nestjs:nodejs /app/temp /app/templates

# Set default environment variables with unified database configuration
ENV RUNNING_IN_DOCKER="true"
ENV MCP_SERVER_NAME="MCP-Workflow-Manager"
ENV MCP_SERVER_VERSION="1.0.15"
ENV MCP_TRANSPORT_TYPE="STDIO"
ENV NODE_ENV="production"
ENV PORT="3000"
ENV DATABASE_URL="file:/app/data/workflow.db"

# STRATEGIC UX ENHANCEMENT: Mark image as having pre-deployed migrations
ENV MIGRATIONS_PRE_DEPLOYED="true"
ENV BUILD_TIME_MIGRATION_DEPLOYED="true"
ENV BUILD_TIME_SEEDING_DEPLOYED="true"

# Switch to non-root user
USER nestjs

# Expose port for HTTP/SSE transport (only used when MCP_TRANSPORT_TYPE is not STDIO)
EXPOSE 3000

# Add health check for container monitoring (simplified for MCP usage)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD if [ "$MCP_TRANSPORT_TYPE" = "STDIO" ]; then exit 0; else curl -f http://localhost:$PORT/health || exit 1; fi

# STRATEGIC SIMPLIFICATION: Direct startup without entrypoint complexity
# MCP servers expect immediate availability for protocol communication
CMD ["node", "dist/main.js"]