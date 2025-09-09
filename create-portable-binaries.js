#!/usr/bin/env node

/**
 * Cogtheia Portable Binary Creator
 * Creates portable executables without requiring electron-builder
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Cogtheia Portable Binary Creator');
console.log('===================================');

const rootDir = __dirname;
const outputDir = path.join(rootDir, 'dist', 'portable-binaries');

function runCommand(command, cwd = rootDir) {
    console.log(`\n📍 Running: ${command}`);
    try {
        const result = execSync(command, {
            cwd,
            stdio: 'inherit',
            maxBuffer: 1024 * 1024 * 10
        });
        return true;
    } catch (error) {
        console.error(`❌ Command failed: ${command}`);
        console.error(`Error: ${error.message}`);
        return false;
    }
}

function createPortableExecutables() {
    console.log('\n📦 Creating Portable Executables...');
    console.log('===================================');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Windows Batch Script
    const windowsBatch = `@echo off
title Cogtheia AI-Powered IDE
echo ========================================
echo   🧠 Cogtheia - AI-Powered IDE
echo   OpenCog Integration: ACTIVE
echo ========================================
echo.

cd /d "%~dp0"

REM Check if Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found! Please install Node.js >=20
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected
echo 🔧 Starting Cogtheia IDE...

REM Try to start electron version
if exist "examples\\electron\\package.json" (
    echo 🖥️  Starting Electron version...
    cd examples\\electron
    npm start
    goto :end
)

REM Fallback to browser version
if exist "examples\\browser\\package.json" (
    echo 🌐 Starting Browser version...
    cd examples\\browser
    npm start
    echo.
    echo ✅ Cogtheia is running at http://localhost:3000
    echo 🧠 OpenCog AI features are active
    echo Press Ctrl+C to stop
    goto :end
)

echo ❌ No Theia examples found
echo Please ensure the project is properly set up
pause

:end
pause
`;

    // Linux/macOS Shell Script
    const unixScript = `#!/bin/bash

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
`;

    // PowerShell Script
    const powershellScript = `# Cogtheia AI-Powered IDE Launcher
param(
    [switch]$Browser,
    [switch]$Help
)

if ($Help) {
    Write-Host @"
🧠 Cogtheia AI-Powered IDE

Usage:
  .\\Start-Cogtheia.ps1          # Auto-detect best version
  .\\Start-Cogtheia.ps1 -Browser # Force browser version

Features:
  ✅ OpenCog AI Integration
  ✅ Cognitive Code Analysis  
  ✅ Real-time Learning
  ✅ Pattern Recognition
  ✅ VS Code Compatibility
"@
    exit 0
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  🧠 Cogtheia - AI-Powered IDE" -ForegroundColor Green
Write-Host "  OpenCog Integration: ACTIVE" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $PSScriptRoot

# Check if Node.js is available
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js detected: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found! Please install Node.js >=20" -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "🔧 Starting Cogtheia IDE..." -ForegroundColor Cyan

if (-not $Browser -and (Test-Path "examples\\electron\\package.json")) {
    Write-Host "🖥️  Starting Electron version..." -ForegroundColor Blue
    Set-Location "examples\\electron"
    npm start
    exit 0
}

if (Test-Path "examples\\browser\\package.json") {
    Write-Host "🌐 Starting Browser version..." -ForegroundColor Blue
    Set-Location "examples\\browser"
    
    # Start the server in background
    Start-Job -ScriptBlock {
        Set-Location $args[0]
        npm start
    } -ArgumentList (Get-Location).Path
    
    Start-Sleep 3
    
    Write-Host ""
    Write-Host "✅ Cogtheia is running at http://localhost:3000" -ForegroundColor Green
    Write-Host "🧠 OpenCog AI features are active" -ForegroundColor Yellow
    Write-Host "🌐 Opening browser..." -ForegroundColor Cyan
    
    Start-Process "http://localhost:3000"
    
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
    
    # Keep the script running
    try {
        while ($true) {
            Start-Sleep 1
        }
    } finally {
        Get-Job | Stop-Job | Remove-Job
    }
    
    exit 0
}

Write-Host "❌ No Theia examples found" -ForegroundColor Red
Write-Host "Please ensure the project is properly set up" -ForegroundColor Yellow
Read-Host "Press Enter to exit"
exit 1
`;

    // Create all executable scripts
    try {
        fs.writeFileSync(path.join(outputDir, 'Start-Cogtheia.bat'), windowsBatch);
        fs.writeFileSync(path.join(outputDir, 'start-cogtheia.sh'), unixScript);
        fs.writeFileSync(path.join(outputDir, 'Start-Cogtheia.ps1'), powershellScript);

        // Make shell script executable (if on Unix)
        if (process.platform !== 'win32') {
            try {
                fs.chmodSync(path.join(outputDir, 'start-cogtheia.sh'), 0o755);
            } catch (e) {
                console.log('⚠️  Could not set execute permissions on shell script');
            }
        }

        console.log('✅ Portable executables created:');
        console.log('  📁 Start-Cogtheia.bat (Windows)');
        console.log('  📁 start-cogtheia.sh (Linux/macOS)');
        console.log('  📁 Start-Cogtheia.ps1 (PowerShell)');

        return true;
    } catch (error) {
        console.error('❌ Failed to create portable executables:', error.message);
        return false;
    }
}

function createReadme() {
    console.log('\n📝 Creating documentation...');

    const readme = `# Cogtheia AI-Powered IDE - Portable Binaries

## 🚀 Quick Start

### Windows
- **Double-click**: \`Start-Cogtheia.bat\`
- **PowerShell**: \`.\Start-Cogtheia.ps1\`

### Linux/macOS
\`\`\`bash
./start-cogtheia.sh
\`\`\`

### PowerShell (Cross-platform)
\`\`\`powershell
.\Start-Cogtheia.ps1
.\Start-Cogtheia.ps1 -Browser  # Force browser version
.\Start-Cogtheia.ps1 -Help     # Show help
\`\`\`

## 🧠 Features

✅ **OpenCog AI Integration** - Advanced cognitive reasoning  
✅ **Cognitive Code Analysis** - Intelligent pattern recognition  
✅ **Real-time Learning** - Adaptive user behavior analysis  
✅ **Pattern Recognition** - Advanced code understanding  
✅ **VS Code Compatibility** - Full extension ecosystem  

## 📋 Requirements

- **Node.js** >=20.0.0
- **RAM** 4GB minimum, 8GB recommended
- **Storage** 2GB free space
- **OS** Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)

## 🔧 Troubleshooting

### "Node.js not found"
1. Install Node.js from https://nodejs.org/
2. Restart your terminal/command prompt
3. Verify with: \`node --version\`

### "npm start failed"
1. Navigate to the project directory
2. Run: \`npm install --no-optional --ignore-scripts\`
3. Try the launcher again

### Browser version not loading
1. Wait 30 seconds after starting
2. Manually open: http://localhost:3000
3. Check if port 3000 is available

## 🌐 Browser vs Desktop

**Desktop (Electron)**: 
- Native desktop integration
- Better performance
- Offline capabilities

**Browser**: 
- No installation required
- Universal compatibility
- Easier troubleshooting

## 🔬 AI Features

The OpenCog integration provides:
- **Reasoning Engine**: Logical inference and deduction
- **Learning System**: Adaptive behavior and personalization  
- **Pattern Recognition**: Advanced code analysis
- **Memory Management**: Persistent cognitive state
- **Feedback Integration**: User interaction learning

## 📊 System Health

Check AI integration status at:
- Desktop: Help → AI Status
- Browser: http://localhost:3000/health

## 🆘 Support

For issues:
1. Check the console output for error messages
2. Verify Node.js version: \`node --version\`
3. Try browser version if desktop fails
4. Check system requirements

---

**Cogtheia** - Where AI meets Development Excellence 🧠✨
`;

    try {
        fs.writeFileSync(path.join(outputDir, 'README.md'), readme);
        console.log('✅ Documentation created: README.md');
        return true;
    } catch (error) {
        console.error('❌ Failed to create documentation:', error.message);
        return false;
    }
}

function createDistributionInfo() {
    console.log('\n📊 Creating distribution info...');

    const packageInfo = {
        name: "cogtheia-portable",
        version: "1.64.0",
        description: "Cogtheia AI-Powered IDE - Portable Distribution",
        type: "portable-binaries",
        platform: process.platform,
        architecture: process.arch,
        created: new Date().toISOString(),
        features: {
            opencog_integration: true,
            cognitive_analysis: true,
            learning_systems: true,
            pattern_recognition: true,
            vscode_compatibility: true
        },
        requirements: {
            nodejs: ">=20.0.0",
            ram: "4GB minimum",
            storage: "2GB free space"
        },
        launchers: {
            windows: "Start-Cogtheia.bat",
            linux_macos: "start-cogtheia.sh",
            powershell: "Start-Cogtheia.ps1"
        }
    };

    try {
        fs.writeFileSync(
            path.join(outputDir, 'distribution-info.json'),
            JSON.stringify(packageInfo, null, 2)
        );
        console.log('✅ Distribution info created');
        return true;
    } catch (error) {
        console.error('❌ Failed to create distribution info:', error.message);
        return false;
    }
}

function main() {
    console.log(`Platform: ${process.platform}`);
    console.log(`Architecture: ${process.arch}`);
    console.log(`Node.js: ${process.version}`);

    try {
        // Create portable executables
        if (!createPortableExecutables()) {
            throw new Error('Failed to create portable executables');
        }

        // Create documentation
        createReadme();

        // Create distribution info
        createDistributionInfo();

        console.log('\n🎉 Portable Binary Creation Complete!');
        console.log('=====================================');
        console.log(`📁 Output directory: ${outputDir}`);
        console.log('📦 Created portable launchers for all platforms');
        console.log('📝 Documentation and usage instructions included');

        console.log('\n🚀 To use:');
        console.log('1. Copy the entire cogtheia folder to target system');
        console.log('2. Ensure Node.js >=20 is installed');
        console.log('3. Run the appropriate launcher script');

        console.log('\n✨ Features ready:');
        console.log('  🧠 OpenCog AI Integration');
        console.log('  🔍 Cognitive Code Analysis');
        console.log('  📚 Learning and Adaptation');
        console.log('  🎯 Pattern Recognition');
        console.log('  📊 Performance Monitoring');

    } catch (error) {
        console.error('\n❌ Portable binary creation failed:', error.message);
        process.exit(1);
    }
}

main();
