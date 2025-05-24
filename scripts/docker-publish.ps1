# Docker Hub Publication Script for MCP Workflow Manager
param(
    [string]$Version = "latest"
)

# Configuration
$DOCKER_HUB_USERNAME = if ($env:DOCKER_HUB_USERNAME) { $env:DOCKER_HUB_USERNAME } else { "hiveacademy" }
$IMAGE_NAME = "mcp-workflow-manager"
$FULL_IMAGE_NAME = "${DOCKER_HUB_USERNAME}/${IMAGE_NAME}"

# Get version from package.json if not specified
if ($Version -eq "latest") {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    $Version = $packageJson.version
}

Write-Host "Building and publishing MCP Workflow Manager" -ForegroundColor Green
Write-Host "Image: ${FULL_IMAGE_NAME}" -ForegroundColor Cyan
Write-Host "Version: ${Version}" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
try {
    docker info | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw "Docker not running"
    }
}
catch {
    Write-Host "Docker is not running. Please start Docker Desktop." -ForegroundColor Red
    exit 1
}

# Create builder for multi-platform builds
Write-Host "Setting up multi-platform builder..." -ForegroundColor Yellow
docker buildx create --name mcp-builder --use --bootstrap 2>$null | Out-Null
docker buildx use mcp-builder

Write-Host "Building multi-platform image..." -ForegroundColor Blue
Write-Host "Note: If you see authentication errors, run 'docker login' first" -ForegroundColor Yellow

docker buildx build --platform linux/amd64,linux/arm64 --tag "${FULL_IMAGE_NAME}:${Version}" --tag "${FULL_IMAGE_NAME}:latest" --push .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! If you see authentication errors, run:" -ForegroundColor Red
    Write-Host "   docker login" -ForegroundColor White
    Write-Host "Then run this script again." -ForegroundColor White
    exit 1
}

Write-Host ""
Write-Host "Successfully published to Docker Hub!" -ForegroundColor Green
Write-Host ""
Write-Host "Claude Desktop Configuration:" -ForegroundColor Cyan
$configExample = @"
{
  "mcpServers": {
    "workflow-manager": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "-v", "mcp-workflow-data:/app/data", "${FULL_IMAGE_NAME}"]
    }
  }
}
"@
Write-Host $configExample -ForegroundColor Gray
Write-Host ""
Write-Host "Docker Run Example:" -ForegroundColor Cyan
Write-Host "docker run -p 3000:3000 -v mcp-workflow-data:/app/data ${FULL_IMAGE_NAME}" -ForegroundColor Gray
Write-Host ""
Write-Host "View on Docker Hub: https://hub.docker.com/r/${DOCKER_HUB_USERNAME}/${IMAGE_NAME}" -ForegroundColor Cyan
Write-Host ""
Write-Host "Publication complete!" -ForegroundColor Green 