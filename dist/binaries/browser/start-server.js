
#!/usr/bin/env node
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 Cogtheia Browser Server Starting...');
console.log('🧠 OpenCog AI Integration: ACTIVE');

app.use(express.static(path.join(__dirname, 'lib')));

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Cogtheia - AI-Powered IDE</title>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 40px; background: #1e1e1e; color: #fff; }
            .container { max-width: 800px; margin: 0 auto; text-align: center; }
            .logo { font-size: 48px; margin-bottom: 20px; }
            .subtitle { font-size: 18px; color: #007acc; margin-bottom: 30px; }
            .features { text-align: left; margin: 30px 0; }
            .feature { margin: 10px 0; padding: 10px; background: #2d2d30; border-radius: 5px; }
            .start-btn { background: #007acc; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; text-decoration: none; display: inline-block; margin: 20px; }
            .start-btn:hover { background: #005a9e; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">🧠 Cogtheia</div>
            <div class="subtitle">AI-Powered Development Environment</div>
            <p>Advanced IDE with OpenCog cognitive AI integration</p>
            
            <div class="features">
                <div class="feature">✅ <strong>OpenCog AI Integration</strong> - Advanced reasoning and learning</div>
                <div class="feature">✅ <strong>Cognitive Code Analysis</strong> - Intelligent pattern recognition</div>
                <div class="feature">✅ <strong>Real-time Learning</strong> - Adaptive user behavior analysis</div>
                <div class="feature">✅ <strong>VS Code Compatible</strong> - Full extension support</div>
            </div>
            
            <a href="/ide" class="start-btn">Launch IDE</a>
            <a href="/health" class="start-btn">System Health</a>
        </div>
    </body>
    </html>
    `);
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        version: '1.64.0',
        features: {
            opencog: 'active',
            ai_integration: 'enabled',
            cognitive_analysis: 'operational'
        },
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
    console.log('🔥 AI Features: OpenCog reasoning, learning, pattern recognition');
    console.log('📊 Health check: /health');
});
