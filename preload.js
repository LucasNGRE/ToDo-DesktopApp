const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    saveTasks: (tasks) => ipcRenderer.send('save-tasks', tasks),
    loadTasks: (callback) => ipcRenderer.on('load-tasks', (_, tasks) => callback(tasks))
});
