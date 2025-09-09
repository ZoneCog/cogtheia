#!/usr/bin/env node

// Cogtheia Browser Launcher
const path = require('path');
const { spawn } = require('child_process');

console.log('🚀 Starting Cogtheia Browser Version...');
console.log('OpenCog AI features included!');

const serverProcess = spawn('npm', ['start'], {
    cwd: __dirname,
    stdio: 'inherit'
});

serverProcess.on('close', (code) => {
    console.log(`Server exited with code ${code}`);
});

process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down Cogtheia...');
    serverProcess.kill();
    process.exit(0);
});
