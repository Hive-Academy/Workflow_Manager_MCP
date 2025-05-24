# Clean Repository for Publication

Write-Host "Cleaning repository..." -ForegroundColor Green

# Remove log files
if (Test-Path "mcp-server-log.txt") {
    Remove-Item "mcp-server-log.txt" -Force
    Write-Host "Removed log file" -ForegroundColor Green
}

# Remove database files
if (Test-Path "data") {
    Get-ChildItem "data" -Filter "*.db*" | Remove-Item -Force
    Write-Host "Cleaned data directory" -ForegroundColor Green
}

# Handle .env file
if (Test-Path ".env") {
    $response = Read-Host "Remove .env file? (y/N)"
    if ($response -match "^[Yy]") {
        Remove-Item ".env" -Force
        Write-Host "Removed .env file" -ForegroundColor Green
    }
}

Write-Host "Repository cleaned successfully!" -ForegroundColor Green
Write-Host "Next: Test with 'npm run build', then publish with docker-publish.ps1" 