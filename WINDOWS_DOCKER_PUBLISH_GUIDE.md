# 🪟 Windows Docker Publication Guide

## 🎯 Complete Guide for Publishing MCP Workflow Manager to Docker Hub on Windows

### 📋 Prerequisites

1. **Docker Desktop for Windows** - Installed and running
2. **Docker Hub Account** - Create at [hub.docker.com](https://hub.docker.com)
3. **PowerShell 5.1+** - Built into Windows 10/11
4. **Git for Windows** - For version control
5. **Node.js 22+** - For testing before publication

### 🔧 Pre-Publication Setup

#### Step 1: Verify Docker Installation

```powershell
# Check Docker is running
docker --version
docker info

# Login to Docker Hub
docker login
# Enter your Docker Hub username and password
```

#### Step 2: Security Audit and Cleanup

```powershell
# Run our security cleanup script
.\scripts\clean-for-publish.ps1

# This will:
# ✅ Remove log files
# ✅ Clean database files
# ✅ Handle .env configuration
# ✅ Update .gitignore
# ✅ Verify repository state
```

#### Step 3: Test Your Application

```powershell
# Install dependencies
npm install

# Build the application
npm run build

# Run tests (if available)
npm test

# Test Docker build locally
docker build -t test-mcp-workflow .
docker run --rm test-mcp-workflow --help
```

### 🚀 Publication Process

#### Option A: Quick Publication (PowerShell Script)

```powershell
# Set your Docker Hub username
$env:DOCKER_HUB_USERNAME = "hiveacademy"  # Replace with your username

# Run the publication script
.\scripts\docker-publish.ps1

# Or with a specific version
.\scripts\docker-publish.ps1 -Version "1.0.0"
```

#### Option B: Manual Step-by-Step

1. **Build Multi-Platform Image**:

   ```powershell
   # Create and use buildx builder
   docker buildx create --name mcp-builder --use --bootstrap

   # Build and push for multiple platforms
   docker buildx build `
     --platform linux/amd64,linux/arm64 `
     --tag hiveacademy/mcp-workflow-manager:latest `
     --tag hiveacademy/mcp-workflow-manager:1.0.0 `
     --push .
   ```

2. **Verify Publication**:

   ```powershell
   # Check the image was published
   docker pull hiveacademy/mcp-workflow-manager:latest

   # Test the published image
   docker run --rm hiveacademy/mcp-workflow-manager:latest --help
   ```

### 🔧 Configuration Options

#### Environment Variables for Different Use Cases

**1. Basic STDIO Usage (Default)**:

```powershell
# For Claude Desktop integration
docker run --rm -i `
  -v mcp-workflow-data:/app/data `
  hiveacademy/mcp-workflow-manager:latest
```

**2. HTTP Server Mode**:

```powershell
# For web-based clients
docker run --rm `
  -p 3000:3000 `
  -e MCP_TRANSPORT_TYPE=SSE `
  -e NODE_ENV=production `
  -v mcp-workflow-data:/app/data `
  hiveacademy/mcp-workflow-manager:latest
```

**3. Production with PostgreSQL**:

```powershell
# With external database
docker run --rm `
  -p 3000:3000 `
  -e DATABASE_URL="postgresql://user:pass@postgres:5432/workflow_db" `
  -e MCP_TRANSPORT_TYPE=SSE `
  -e NODE_ENV=production `
  hiveacademy/mcp-workflow-manager:latest
```

### 📝 Docker Hub Configuration

#### Repository Settings on Docker Hub

1. **Repository Name**: `mcp-workflow-manager`
2. **Description**: "A comprehensive Model Context Protocol server for AI workflow automation and task management"
3. **README**: Copy content from `DOCKER_HUB_README.md`
4. **Tags**:
   - `latest` (always points to newest stable)
   - `1.0.0`, `1.1.0`, etc. (specific versions)
   - `develop` (development builds)

#### Automated Builds (Optional)

Link your GitHub repository for automatic builds:

1. Go to Docker Hub → Account Settings → Linked Accounts
2. Link your GitHub account
3. Create automated build from `Hive-Academy/Workflow_Manager_MCP`

### 🔍 Testing Publication

#### Local Testing

```powershell
# Test different configurations
# 1. Basic functionality
docker run --rm -v mcp-test-data:/app/data hiveacademy/mcp-workflow-manager:latest --help

# 2. HTTP mode
docker run --rm -p 3000:3000 -e MCP_TRANSPORT_TYPE=SSE hiveacademy/mcp-workflow-manager:latest &
Start-Sleep 5
Invoke-WebRequest http://localhost:3000/health -UseBasicParsing
Stop-Process -Name node
```

#### Integration Testing

```powershell
# Test with Claude Desktop configuration
$claudeConfig = @{
    mcpServers = @{
        "workflow-manager" = @{
            command = "docker"
            args = @("run", "--rm", "-i", "-v", "mcp-workflow-data:/app/data", "hiveacademy/mcp-workflow-manager:latest")
        }
    }
} | ConvertTo-Json -Depth 3

Write-Host "Add this to your Claude Desktop config:"
Write-Host $claudeConfig
```

### 📊 Monitoring and Maintenance

#### Health Checks

```powershell
# Check container health
docker run --rm --health-cmd "npm run health-check" hiveacademy/mcp-workflow-manager:latest

# Monitor running containers
docker stats
```

#### Updates and Versioning

```powershell
# When releasing new versions
# 1. Update package.json version
npm version patch  # or minor/major

# 2. Build and publish new version
.\scripts\docker-publish.ps1 -Version $(node -p "require('./package.json').version")

# 3. Test the new version
docker pull hiveacademy/mcp-workflow-manager:latest
```

### 🛡️ Security Considerations

#### Container Security

- ✅ Image runs as non-root user
- ✅ Minimal attack surface (Alpine Linux base)
- ✅ No sensitive data in image layers
- ✅ Environment variables for configuration
- ✅ Health checks enabled

#### Network Security

```powershell
# For production deployment
docker run --rm `
  --network mcp-network `
  --restart unless-stopped `
  -v mcp-workflow-data:/app/data `
  hiveacademy/mcp-workflow-manager:latest
```

### 🌟 Best Practices

#### Version Management

- Use semantic versioning (1.0.0, 1.1.0, etc.)
- Tag releases in Git
- Maintain changelog
- Test before publishing

#### Performance Optimization

```powershell
# Optimize image size
docker images hiveacademy/mcp-workflow-manager

# Check layer sizes
docker history hiveacademy/mcp-workflow-manager:latest
```

### 🎉 Success Verification

After successful publication, verify:

1. **Docker Hub Page**: https://hub.docker.com/r/hiveacademy/mcp-workflow-manager
2. **Image Pull**: `docker pull hiveacademy/mcp-workflow-manager`
3. **Multi-Platform**: Check AMD64 and ARM64 support
4. **Documentation**: Verify README displays correctly
5. **Tags**: Confirm version tags are available

### 🔗 Integration Examples

#### Claude Desktop Configuration

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

#### Docker Compose

```yaml
version: '3.8'
services:
  mcp-workflow-manager:
    image: hiveacademy/mcp-workflow-manager:latest
    container_name: mcp-workflow
    environment:
      - MCP_TRANSPORT_TYPE=SSE
      - NODE_ENV=production
    ports:
      - '3000:3000'
    volumes:
      - mcp-workflow-data:/app/data
    restart: unless-stopped

volumes:
  mcp-workflow-data:
```

### 📞 Support and Troubleshooting

#### Common Issues

1. **Docker Build Fails**:

   ```powershell
   # Clear Docker cache
   docker system prune -a
   ```

2. **Multi-Platform Build Issues**:

   ```powershell
   # Reset buildx
   docker buildx rm mcp-builder
   docker buildx create --name mcp-builder --use --bootstrap
   ```

3. **Permission Issues**:
   ```powershell
   # Run PowerShell as Administrator
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

#### Getting Help

- 📖 Documentation: See README.md
- 🐛 Issues: GitHub Issues page
- 💬 Community: Docker Hub comments
- 📧 Support: Repository maintainers

---

**🎯 Quick Start Summary for Windows**:

1. `.\scripts\clean-for-publish.ps1` - Clean repository
2. `docker login` - Login to Docker Hub
3. `.\scripts\docker-publish.ps1` - Publish image
4. Verify at https://hub.docker.com/r/hiveacademy/mcp-workflow-manager

**Total time**: ~10-15 minutes for first publication! 🚀
