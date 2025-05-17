# Use official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port for SSE/HTTP (if needed)
EXPOSE 3000

# Start the MCP server (adjust entrypoint if using SSE/HTTP)
CMD ["node", "dist/workflow-mcp-server-http.js"] 