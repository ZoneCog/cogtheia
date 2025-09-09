const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const express = require('express');

let mainWindow;
let server;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'assets', 'icon.png'),
        title: 'Cogtheia - AI-Powered IDE'
    });

    // Start internal server
    const serverApp = express();
    serverApp.get('/', (req, res) => {
        res.send('<h1>Cogtheia Desktop</h1><p>AI-powered IDE with OpenCog integration</p>');
    });

    server = serverApp.listen(0, () => {
        const port = server.address().port;
        mainWindow.loadURL(`http://localhost:${port}`);
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
        if (server) server.close();
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
