#!/usr/bin/env node

/**
 * Cogtheia Binary Deployment Script
 * Provides multiple deployment options for the generated binaries
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Cogtheia Binary Deployment');
console.log('=============================');

function runCommand(command, cwd = __dirname) {
    console.log(`\n📍 Running: ${command}`);
    try {
        const result = execSync(command, {
            cwd,
            stdio: 'inherit',
            maxBuffer: 1024 * 1024 * 10
        });
        return true;
    } catch (error) {
        console.error(`❌ Command failed: ${error.message}`);
        return false;
    }
}

function deployBrowserLocal() {
    console.log('\n🌐 Deploying Browser Version Locally...');
    console.log('=========================================');

    const browserDir = path.join(__dirname, 'browser');
    if (!fs.existsSync(browserDir)) {
        console.error('❌ Browser binary not found. Run build-binaries.js first.');
        return false;
    }

    console.log('📦 Installing dependencies...');
    if (!runCommand('npm install --no-optional --ignore-scripts', browserDir)) {
        return false;
    }

    console.log('🚀 Starting Cogtheia Browser...');
    console.log('📝 Access: http://localhost:3000');
    console.log('🧠 OpenCog AI features: ACTIVE');
    console.log('⌨️  Press Ctrl+C to stop');

    return runCommand('node start-cogtheia.js', browserDir);
}

function deployElectronLocal() {
    console.log('\n🖥️  Deploying Desktop Version Locally...');
    console.log('==========================================');

    const electronDir = path.join(__dirname, 'electron');
    if (!fs.existsSync(electronDir)) {
        console.error('❌ Electron binary not found. Run build-binaries.js first.');
        return false;
    }

    console.log('📦 Installing dependencies...');
    if (!runCommand('npm install --no-optional --ignore-scripts', electronDir)) {
        return false;
    }

    console.log('🚀 Starting Cogtheia Desktop...');
    console.log('🧠 OpenCog AI features: ACTIVE');

    return runCommand('node start-cogtheia-desktop.js', electronDir);
}

function deployDocker() {
    console.log('\n🐳 Deploying with Docker...');
    console.log('============================');

    if (!fs.existsSync('./Dockerfile')) {
        console.error('❌ Dockerfile not found in current directory');
        return false;
    }

    console.log('🔨 Building Docker image...');
    if (!runCommand('docker build -t cogtheia:latest .')) {
        return false;
    }

    console.log('🚀 Starting Cogtheia container...');
    console.log('📝 Access: http://localhost:3000');
    console.log('🧠 OpenCog AI features: ACTIVE');
    console.log('📊 Health check: http://localhost:3000/health');

    return runCommand('docker run -d -p 3000:3000 --name cogtheia cogtheia:latest');
}

function deployDockerCompose() {
    console.log('\n🐳 Deploying with Docker Compose (Full Stack)...');
    console.log('=================================================');

    if (!fs.existsSync('./docker-compose.yml')) {
        console.error('❌ docker-compose.yml not found');
        return false;
    }

    console.log('🔨 Building and starting services...');
    if (!runCommand('docker-compose up -d')) {
        return false;
    }

    console.log('✅ Services started successfully!');
    console.log('📝 Cogtheia IDE: http://localhost:3000');
    console.log('📊 Prometheus: http://localhost:9090');
    console.log('📈 Grafana: http://localhost:3001 (admin/cogtheia_admin)');
    console.log('🧠 OpenCog AI features: ACTIVE');

    return true;
}

function validateDeployment() {
    console.log('\n🔍 Validating OpenCog AI Integration...');
    console.log('========================================');

    const openCogPath = path.join(__dirname, '..', 'packages', 'ai-opencog');
    if (fs.existsSync(openCogPath)) {
        console.log('📦 Running OpenCog validation...');
        return runCommand('node validate-resource-requirements.js', openCogPath);
    } else {
        console.log('⚠️  OpenCog package not found in expected location');
        return false;
    }
}

function showHelp() {
    console.log(`
🚀 Cogtheia Deployment Options:

1. Browser (Local)      - node deploy.js --browser
2. Desktop (Local)      - node deploy.js --desktop  
3. Docker Single       - node deploy.js --docker
4. Docker Compose      - node deploy.js --compose
5. Validate Only       - node deploy.js --validate

Examples:
  node deploy.js --browser   # Start browser version
  node deploy.js --compose   # Full stack with monitoring
  node deploy.js --validate  # Validate AI integration

Features Included:
✅ OpenCog AI Integration (validated)
✅ Cognitive Code Analysis  
✅ Real-time Learning Systems
✅ Pattern Recognition
✅ Production Monitoring
✅ Performance Optimization

System Requirements:
- Node.js >=20
- Memory >=4GB (8GB recommended)
- Docker (for container deployment)
`);
}

// Main execution
function main() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
        showHelp();
        return;
    }

    let success = false;

    if (args.includes('--validate')) {
        success = validateDeployment();
    } else if (args.includes('--browser')) {
        success = deployBrowserLocal();
    } else if (args.includes('--desktop')) {
        success = deployElectronLocal();
    } else if (args.includes('--docker')) {
        success = deployDocker();
    } else if (args.includes('--compose')) {
        success = deployDockerCompose();
    } else {
        console.error('❌ Unknown deployment option');
        showHelp();
        return;
    }

    if (success) {
        console.log('\n🎉 Deployment completed successfully!');
    } else {
        console.log('\n❌ Deployment failed. Check error messages above.');
        process.exit(1);
    }
}

main();
