const {app, BrowserWindow, ipcMain, Notification} = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "red",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    isDev && win.webContents.openDevTools();
}
if(isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}
app.whenReady().then(() => {
    createWindow();
    /*const notification = new Notification({title: 'Hello world', body: 'Notification body'});
    notification.show();*/
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
ipcMain.on('notify', (e, message) => {
    const notification = new Notification({title: 'Notification', body: message});
    notification.show();
});