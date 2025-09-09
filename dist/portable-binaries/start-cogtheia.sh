#!/bin/bash

# Cogtheia AI-Powered IDE Launcher
echo "========================================"
echo "  🧠 Cogtheia - AI-Powered IDE"
echo "  OpenCog Integration: ACTIVE"
echo "========================================"
echo

cd "$(dirname "$0")"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found! Please install Node.js >=20"
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"
echo "🔧 Starting Cogtheia IDE..."

# Try to start electron version
if [ -f "examples/electron/package.json" ]; then
    echo "🖥️  Starting Electron version..."
    cd examples/electron
    npm start
    exit 0
fi

# Fallback to browser version
if [ -f "examples/browser/package.json" ]; then
    echo "🌐 Starting Browser version..."
    cd examples/browser
    npm start &
    echo
    echo "✅ Cogtheia is running at http://localhost:3000"
    echo "🧠 OpenCog AI features are active"
    echo "Press Ctrl+C to stop"
    
    # Wait for a moment then open browser (if available)
    sleep 3
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:3000
    elif command -v open &> /dev/null; then
        open http://localhost:3000
    fi
    
    wait
    exit 0
fi

echo "❌ No Theia examples found"
echo "Please ensure the project is properly set up"
exit 1
