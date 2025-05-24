# MCP Workflow Manager

![Docker Pulls](https://img.shields.io/docker/pulls/hiveacademy/mcp-workflow-manager)
![Docker Image Size](https://img.shields.io/docker/image-size/hiveacademy/mcp-workflow-manager)
![Docker Image Version](https://img.shields.io/docker/v/hiveacademy/mcp-workflow-manager)

A comprehensive **Model Context Protocol (MCP) server** for AI workflow automation and task management in Cursor IDE and other MCP-compatible clients.

## 🚀 What is MCP Workflow Manager?

The MCP Workflow Manager provides a structured, role-based workflow system for AI development tasks. It enables seamless coordination between different AI modes (Boomerang, Researcher, Architect, Senior Developer, Code Review) with persistent task tracking, implementation planning, and progress monitoring.

### ⭐ Key Features

- **42+ MCP Tools** for comprehensive workflow management
- **Role-Based Workflow** with automatic task delegation
- **Persistent Task Tracking** with SQLite/PostgreSQL support
- **Implementation Planning** with batch-based subtask organization
- **Research & Code Review** integrated reporting
- **Real-time Status Updates** and progress monitoring
- **Multi-Transport Support** (STDIO, SSE, Streamable HTTP)
- **Production Ready** with NestJS + Prisma architecture
- **Automatic Database Setup** with migrations on container start

## 🔧 Quick Start

### Option 1: Docker Run (Simplest)

```bash
# Run with SQLite (data persists in named volume)
docker run -p 3000:3000 -v mcp-workflow-data:/app/data hiveacademy/mcp-workflow-manager

# Run with custom environment
docker run -p 3000:3000 \
  -e MCP_TRANSPORT_TYPE=SSE \
  -e MCP_SERVER_NAME=My-Workflow-Manager \
  -v mcp-workflow-data:/app/data \
  hiveacademy/mcp-workflow-manager
```

### Option 2: Docker Compose (Recommended)

```yaml
version: '3.8'
services:
  mcp-workflow:
    image: hiveacademy/mcp-workflow-manager
    ports:
      - '3000:3000'
    volumes:
      - mcp-workflow-data:/app/data
    environment:
      - DATABASE_URL=file:./data/workflow.db
      - MCP_SERVER_NAME=Workflow-Manager
      - MCP_TRANSPORT_TYPE=STDIO
    restart: unless-stopped

volumes:
  mcp-workflow-data:
```

### Option 3: With PostgreSQL Database

```yaml
version: '3.8'
services:
  mcp-workflow:
    image: hiveacademy/mcp-workflow-manager
    ports:
      - '3000:3000'
    environment:
      - DATABASE_URL=postgresql://workflow:secure_password@postgres:5432/workflow_db
      - MCP_SERVER_NAME=Workflow-Manager
      - MCP_TRANSPORT_TYPE=SSE
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=workflow_db
      - POSTGRES_USER=workflow
      - POSTGRES_PASSWORD=secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U workflow -d workflow_db']
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

## 🎯 MCP Client Configuration

### Claude Desktop Configuration

Add to your Claude Desktop `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "workflow-manager": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-v",
        "mcp-workflow-data:/app/data",
        "hiveacademy/mcp-workflow-manager"
      ]
    }
  }
}
```

### Cursor IDE Configuration

Add to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "workflow-manager": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "--network=host",
        "-v",
        "mcp-workflow-data:/app/data",
        "hiveacademy/mcp-workflow-manager"
      ]
    }
  }
}
```

### HTTP/SSE Transport (Alternative)

For HTTP/SSE transport instead of STDIO:

```json
{
  "mcpServers": {
    "workflow-manager": {
      "transport": {
        "type": "sse",
        "url": "http://localhost:3000/sse"
      }
    }
  }
}
```

First, start the container with SSE transport:

```bash
docker run -p 3000:3000 \
  -e MCP_TRANSPORT_TYPE=SSE \
  -v mcp-workflow-data:/app/data \
  hiveacademy/mcp-workflow-manager
```

## 🛠️ Available MCP Tools

### Core Task Management

- `create_task` - Create new workflow tasks
- `get_task_context` - Retrieve complete task context
- `update_task_status` - Update task status and progress
- `list_tasks` - List and filter tasks
- `search_tasks` - Advanced task searching
- `delete_task` - Remove tasks

### Workflow Orchestration

- `delegate_task` - Delegate tasks between AI roles
- `complete_task` - Mark tasks as completed
- `handle_role_transition` - Manage role transitions
- `workflow_status` - Get workflow state
- `workflow_map` - Visualize workflow diagram

### Implementation Planning

- `create_implementation_plan` - Create detailed implementation plans
- `add_subtask_to_batch` - Add subtasks to work batches
- `update_subtask_status` - Update individual subtask progress
- `check_batch_status` - Verify batch completion

### Reporting & Documentation

- `create_research_report` - Generate research findings
- `create_code_review_report` - Document code reviews
- `create_completion_report` - Final task completion reports
- `add_task_note` - Add notes and comments

### Analytics & Monitoring

- `task_dashboard` - Get workflow dashboard
- `get_context_diff` - Track context changes
- `continue_task` - Resume interrupted tasks

## 🔄 Workflow Roles

The system implements a structured workflow with specialized AI roles:

1. **🪃 Boomerang** - Task intake, analysis, and final delivery
2. **🔬 Researcher** - Information gathering and research
3. **🏛️ Architect** - Technical planning and design
4. **👨‍💻 Senior Developer** - Code implementation
5. **🔍 Code Review** - Quality assurance and testing

## 📊 Environment Variables

| Variable             | Default                   | Description                                     |
| -------------------- | ------------------------- | ----------------------------------------------- |
| `DATABASE_URL`       | `file:./data/workflow.db` | Database connection string                      |
| `MCP_SERVER_NAME`    | `MCP-Workflow-Manager`    | Server name for MCP protocol                    |
| `MCP_SERVER_VERSION` | `1.0.0`                   | Server version                                  |
| `MCP_TRANSPORT_TYPE` | `STDIO`                   | Transport type: STDIO, SSE, or STREAMABLE_HTTP  |
| `PORT`               | `3000`                    | HTTP server port (only for SSE/STREAMABLE_HTTP) |
| `HOST`               | `0.0.0.0`                 | HTTP server host                                |
| `NODE_ENV`           | `production`              | Runtime environment                             |

## 🗄️ Data Persistence & Database Setup

### Automatic Database Initialization

The container automatically handles database setup:

1. **First Run**: Creates database and runs all migrations
2. **Subsequent Runs**: Checks for pending migrations and applies them
3. **Multiple Database Support**: SQLite, PostgreSQL, MySQL/MariaDB

### SQLite (Default)

Data is stored in `/app/data/workflow.db` inside the container. Use volumes for persistence:

```bash
# Named volume (recommended)
docker run -v mcp-workflow-data:/app/data hiveacademy/mcp-workflow-manager

# Bind mount (development)
docker run -v $(pwd)/data:/app/data hiveacademy/mcp-workflow-manager
```

### PostgreSQL (Production)

Set `DATABASE_URL` to your PostgreSQL connection string:

```bash
docker run \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  hiveacademy/mcp-workflow-manager
```

### MySQL/MariaDB

```bash
docker run \
  -e DATABASE_URL="mysql://user:pass@host:3306/db" \
  hiveacademy/mcp-workflow-manager
```

## 🔍 Health Monitoring

The container includes intelligent health checks:

- **STDIO Transport**: Always healthy (no HTTP server)
- **SSE/HTTP Transports**: Checks HTTP endpoint at `/health`

```bash
# Check container health
docker ps  # Shows health status in STATUS column

# Manual health check (for HTTP transports)
curl http://localhost:3000/health
```

## 📈 Usage Examples

### Basic Task Creation with STDIO

```bash
# Start container with STDIO transport
docker run -i --rm -v mcp-workflow-data:/app/data hiveacademy/mcp-workflow-manager

# Connect via MCP client and create tasks
# (Container expects JSON-RPC over STDIO)
```

### HTTP/SSE API Usage

```bash
# Start with SSE transport
docker run -p 3000:3000 -e MCP_TRANSPORT_TYPE=SSE hiveacademy/mcp-workflow-manager

# Connect MCP clients to http://localhost:3000/sse
```

## 🔧 Development & Customization

### Building from Source

```bash
git clone https://github.com/Hive-Academy/Workflow_Manager_MCP.git
cd Workflow_Manager_MCP
docker build -t hiveacademy/mcp-workflow-manager .
```

### Custom Configuration

```bash
# Mount custom environment file
docker run -v $(pwd)/custom.env:/app/.env hiveacademy/mcp-workflow-manager
```

### Development Mode

```bash
# Run with development settings
docker run \
  -e NODE_ENV=development \
  -e MCP_TRANSPORT_TYPE=SSE \
  -p 3000:3000 \
  -v $(pwd):/app \
  hiveacademy/mcp-workflow-manager
```

## 📚 Documentation

- **[GitHub Repository](https://github.com/Hive-Academy/Workflow_Manager_MCP)** - Complete source code
- **[MCP Protocol](https://modelcontextprotocol.io/)** - Learn about Model Context Protocol
- **[NestJS Docs](https://nestjs.com/)** - Framework documentation
- **[Prisma Docs](https://www.prisma.io/)** - ORM documentation

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](https://github.com/Hive-Academy/Workflow_Manager_MCP/blob/main/CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](https://github.com/Hive-Academy/Workflow_Manager_MCP/blob/main/LICENSE) file.

## 🆘 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Hive-Academy/Workflow_Manager_MCP/issues)
- **Documentation**: [Full technical documentation](https://github.com/Hive-Academy/Workflow_Manager_MCP/wiki)
- **MCP Community**: [Join the MCP Discord](https://discord.gg/modelcontextprotocol)

---

**Built with ❤️ for the AI development community by Hive Academy**

Made possible by the [Model Context Protocol](https://modelcontextprotocol.io/) and the amazing MCP ecosystem.
