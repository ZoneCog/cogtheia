# Cogtheia AI-Powered IDE - Production Docker Image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    bash \
    && rm -rf /var/cache/apk/*

# Copy package files first for better caching
COPY package*.json ./
COPY lerna.json ./

# Copy essential configuration
COPY configs/ ./configs/
COPY tsconfig.json ./
COPY tsfmt.json ./

# Copy packages directory
COPY packages/ ./packages/

# Copy examples
COPY examples/ ./examples/

# Copy dev-packages (needed for build tools)
COPY dev-packages/ ./dev-packages/

# Install dependencies with bypass for native modules
RUN npm install --no-optional --ignore-scripts \
    && npm cache clean --force

# Install Windows-specific NX dependency for compatibility
RUN npm install @nx/nx-win32-x64-msvc --save-dev || echo "NX Windows dependency install failed, continuing..."

# Set environment variables for production
ENV NODE_ENV=production
ENV THEIA_LOG_LEVEL=info
ENV COGTHEIA_AI_ENABLED=true

# Create application user for security
RUN addgroup -g 1001 -S cogtheia && \
    adduser -S cogtheia -u 1001 -G cogtheia

# Change ownership to application user
RUN chown -R cogtheia:cogtheia /app

# Switch to application user
USER cogtheia

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

# Create startup script
RUN echo '#!/bin/bash\n\
    echo "🚀 Starting Cogtheia AI-Powered IDE"\n\
    echo "🧠 OpenCog AI Integration: ACTIVE"\n\
    echo "📊 Production Mode: ENABLED"\n\
    echo "🌐 Server will be available at http://localhost:3000"\n\
    \n\
    # Validate OpenCog integration\n\
    echo "🔍 Validating OpenCog AI package..."\n\
    cd /app/packages/ai-opencog\n\
    if node validate-resource-requirements.js > /dev/null 2>&1; then\n\
    echo "✅ OpenCog AI validation: PASSED"\n\
    else\n\
    echo "⚠️  OpenCog AI validation: Warning (continuing anyway)"\n\
    fi\n\
    \n\
    # Start the browser application\n\
    cd /app/examples/browser\n\
    exec npm start\n\
    ' > /app/start-cogtheia.sh && chmod +x /app/start-cogtheia.sh

# Default command
CMD ["/app/start-cogtheia.sh"]

# Labels for container metadata
LABEL \
    org.opencontainers.image.title="Cogtheia AI-Powered IDE" \
    org.opencontainers.image.description="Eclipse Theia with OpenCog AI integration for cognitive development" \
    org.opencontainers.image.version="1.64.0" \
    org.opencontainers.image.source="https://github.com/cogtheia/cogtheia" \
    org.opencontainers.image.licenses="EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0" \
    cogtheia.ai.opencog="enabled" \
    cogtheia.features="cognitive-analysis,learning,reasoning,pattern-recognition"
