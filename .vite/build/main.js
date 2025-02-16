"use strict";
const electron = require("electron");
const path = require("path");
electron.ipcMain.handle(
  "node-version",
  (event, msg) => {
    console.log(event);
    console.log(msg);
    return process.versions.node;
  }
);
const isDev = process.env.DEV != void 0;
const isPreview = process.env.PREVIEW != void 0;
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.ts")
    }
  });
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else if (isPreview) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile("dist/index.html");
  } else {
    mainWindow.loadFile("dist/index.html");
  }
}
electron.app.whenReady().then(() => {
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
