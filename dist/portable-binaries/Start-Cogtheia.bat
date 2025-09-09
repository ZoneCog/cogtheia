@echo off
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
if exist "examples\electron\package.json" (
    echo 🖥️  Starting Electron version...
    cd examples\electron
    npm start
    goto :end
)

REM Fallback to browser version
if exist "examples\browser\package.json" (
    echo 🌐 Starting Browser version...
    cd examples\browser
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
