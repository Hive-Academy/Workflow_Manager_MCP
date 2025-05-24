#!/bin/bash

# Docker entrypoint script for MCP Workflow Manager
# Handles database initialization and migration

set -e

echo "🚀 Starting MCP Workflow Manager..."

# Function to wait for database connection (if using external DB)
wait_for_db() {
    if [[ "$DATABASE_URL" == postgresql* ]] || [[ "$DATABASE_URL" == mysql* ]]; then
        echo "📡 Waiting for database connection..."
        # Extract host and port from DATABASE_URL
        # This is a simple implementation - for production, consider using dockerize or wait-for-it
        timeout=30
        counter=0
        while [ $counter -lt $timeout ]; do
            if npx prisma db pull --schema=./prisma/schema.prisma >/dev/null 2>&1; then
                echo "✅ Database connection established"
                break
            fi
            echo "⏳ Waiting for database... ($counter/$timeout)"
            sleep 1
            counter=$((counter + 1))
        done
        
        if [ $counter -eq $timeout ]; then
            echo "❌ Failed to connect to database within $timeout seconds"
            exit 1
        fi
    fi
}

# Function to initialize database
init_database() {
    echo "🗄️  Initializing database..."
    
    # Create data directory for SQLite if needed
    if [[ "$DATABASE_URL" == "file:"* ]]; then
        mkdir -p "$(dirname "${DATABASE_URL#file:}")" 2>/dev/null || true
        echo "📁 Created data directory for SQLite"
    fi
    
    # Check if Prisma client exists, only generate if missing or schema changed
    if [ ! -f "./generated/prisma/index.js" ]; then
        echo "🔧 Generating Prisma client..."
        npx prisma generate --schema=./prisma/schema.prisma
    else
        echo "✅ Prisma client already available"
    fi
    
    # Safe database initialization that preserves existing data
    echo "📊 Initializing database schema..."
    
    # Try migration deploy first (safest for existing data)
    if npx prisma migrate deploy --schema=./prisma/schema.prisma >/dev/null 2>&1; then
        echo "✅ Database migrations applied successfully"
    else
        echo "⚠️  Migration deploy failed, checking if this is a fresh database..."
        
        # If migrations fail, check if database is completely fresh
        if is_first_run; then
            echo "🆕 Fresh database detected, using db push for initial schema..."
            npx prisma db push --schema=./prisma/schema.prisma
            echo "✅ Database schema created successfully"
        else
            echo "📋 Existing database detected, verifying schema compatibility..."
            # For existing databases with migration issues, try to validate schema
            if npx prisma validate --schema=./prisma/schema.prisma >/dev/null 2>&1; then
                echo "✅ Database schema is valid"
            else
                echo "❌ Database schema validation failed"
                echo "💡 Manual intervention may be required"
                exit 1
            fi
        fi
    fi
    
    echo "✅ Database initialization complete"
}

# Function to validate environment
validate_environment() {
    echo "🔍 Validating environment..."
    
    # Check if DATABASE_URL is set
    if [ -z "$DATABASE_URL" ]; then
        echo "❌ DATABASE_URL environment variable is required"
        exit 1
    fi
    
    # Set default values
    export MCP_SERVER_NAME="${MCP_SERVER_NAME:-MCP-Workflow-Manager}"
    export MCP_SERVER_VERSION="${MCP_SERVER_VERSION:-1.0.0}"
    export MCP_TRANSPORT_TYPE="${MCP_TRANSPORT_TYPE:-STDIO}"
    export NODE_ENV="${NODE_ENV:-production}"
    
    echo "✅ Environment validation complete"
    echo "   📦 Server: $MCP_SERVER_NAME v$MCP_SERVER_VERSION"
    echo "   🚀 Transport: $MCP_TRANSPORT_TYPE"
    echo "   🗄️  Database: $DATABASE_URL"
}

# Function to check if this is the first run
is_first_run() {
    if [[ "$DATABASE_URL" == "file:"* ]]; then
        # For SQLite, check if the database file exists
        db_file="${DATABASE_URL#file:}"
        [ ! -f "$db_file" ]
    else
        # For other databases, check if migration table exists
        ! npx prisma db pull --schema=./prisma/schema.prisma >/dev/null 2>&1
    fi
}

# Function to perform health check
health_check() {
    if [ "$MCP_TRANSPORT_TYPE" = "SSE" ] || [ "$MCP_TRANSPORT_TYPE" = "STREAMABLE_HTTP" ]; then
        echo "🏥 Health check endpoint available at http://localhost:${PORT:-3000}/health"
    fi
}

# Main execution
main() {
    echo "🪃 MCP Workflow Manager Docker Container"
    echo "   🐳 Container version: $(cat /etc/os-release | grep VERSION_ID | cut -d'"' -f2)"
    echo "   🟢 Node.js version: $(node --version)"
    echo ""
    
    # Validate environment variables
    validate_environment
    
    # Wait for external database if needed
    wait_for_db
    
    # Initialize database on first run or if migrations are pending
    if is_first_run; then
        echo "🆕 First run detected - initializing database..."
        init_database
    else
        echo "🔄 Checking for pending migrations..."
        npx prisma migrate deploy --schema=./prisma/schema.prisma
    fi
    
    # Display health check information
    health_check
    
    echo ""
    echo "🎯 Starting MCP Server..."
    echo "   📡 Transport: $MCP_TRANSPORT_TYPE"
    echo "   🔧 Mode: $NODE_ENV"
    echo ""
    
    # Execute the main command
    exec "$@"
}

# Handle signals gracefully
trap 'echo "🛑 Received shutdown signal, gracefully stopping..."; exit 0' SIGTERM SIGINT

# Run main function with all arguments
main "$@" 