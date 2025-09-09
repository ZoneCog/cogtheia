const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('cogtheia', {
    getVersion: () => '1.64.0-fixed',
    getAIStatus: () => ({ opencog: 'active', reasoning: 'enabled' })
});
