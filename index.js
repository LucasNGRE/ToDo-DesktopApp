const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'assets', process.platform === 'darwin' ? 'icon.icns' : 'icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Sécurise l’accès aux fichiers
            nodeIntegration: false 
        }
    });

    mainWindow.loadFile('index.html');

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
