# Cogtheia AI-Powered IDE Launcher
param(
    [switch]$Browser,
    [switch]$Help
)

if ($Help) {
    Write-Host @"
🧠 Cogtheia AI-Powered IDE

Usage:
  .\Start-Cogtheia.ps1          # Auto-detect best version
  .\Start-Cogtheia.ps1 -Browser # Force browser version

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

if (-not $Browser -and (Test-Path "examples\electron\package.json")) {
    Write-Host "🖥️  Starting Electron version..." -ForegroundColor Blue
    Set-Location "examples\electron"
    npm start
    exit 0
}

if (Test-Path "examples\browser\package.json") {
    Write-Host "🌐 Starting Browser version..." -ForegroundColor Blue
    Set-Location "examples\browser"
    
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
