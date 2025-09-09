#!/usr/bin/env node

// Cogtheia Desktop Launcher
const path = require('path');
const { spawn } = require('child_process');

console.log('🚀 Starting Cogtheia Desktop Version...');
console.log('OpenCog AI features included!');

const electronProcess = spawn('npm', ['start'], {
    cwd: __dirname,
    stdio: 'inherit'
});

electronProcess.on('close', (code) => {
    console.log(`Cogtheia exited with code ${code}`);
});

process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down Cogtheia...');
    electronProcess.kill();
    process.exit(0);
});
