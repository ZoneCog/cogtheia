# Cogtheia AI-Powered IDE - Self-Contained Binary

## 🚀 Quick Start

### Windows
```cmd
cogtheia.bat
```

### Linux/macOS  
```bash
./cogtheia
```

### Direct execution
```bash
node cogtheia-ai-ide.js
```

Then open: http://localhost:3000

## 🧠 Features

- **OpenCog AI Integration** - Advanced cognitive reasoning
- **Cognitive Code Analysis** - Intelligent pattern recognition  
- **Adaptive Learning** - System learns from user behavior
- **Pattern Recognition** - Advanced code understanding
- **Real-time Monitoring** - System health and performance tracking
- **REST API** - Programmatic access to AI features
- **Web Interface** - Modern browser-based dashboard

## 📋 Requirements

- Node.js >=18.0.0
- 512MB RAM minimum
- 100MB storage space
- Optional: Internet for external integrations

## 🌐 Web Interface

Access the Cogtheia dashboard at http://localhost:3000

### Available Endpoints

- `/` - Main dashboard
- `/health` - System health check
- `/api/docs` - API documentation
- `/ide` - IDE interface (when full system installed)

## 📊 API Usage

### Health Check
```bash
curl http://localhost:3000/health
```

### AI Status
```javascript
fetch('http://localhost:3000/health')
  .then(response => response.json())
  .then(data => console.log(data.ai_status));
```

## 🔧 Configuration

The server runs on port 3000 by default. To change:

```bash
PORT=8080 node cogtheia-ai-ide.js
```

## 🔍 Troubleshooting

### "Cannot find module"
Ensure Node.js >=18 is installed: `node --version`

### "Port already in use"
Change port: `PORT=8080 ./cogtheia`

### "ECONNREFUSED"
Check if server is running: `curl http://localhost:3000/health`

## 🧠 AI Features

This binary includes:
- OpenCog reasoning engine
- Cognitive pattern recognition
- Adaptive learning systems
- Real-time performance monitoring
- Memory management
- Feedback integration

## 📈 Performance

- **Memory Usage**: ~50-100MB
- **CPU Usage**: Low (event-driven)
- **Startup Time**: <2 seconds
- **Response Time**: <100ms typical

## 🆘 Support

For issues:
1. Check `http://localhost:3000/health` for system status
2. Verify Node.js version: `node --version`  
3. Check console output for error messages
4. Ensure port 3000 is available

---

**Cogtheia** - Where AI meets Development Excellence 🧠✨
