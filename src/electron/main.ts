// src/electron/main.ts

import { app, BrowserWindow, ipcMain } from "electron";
import { execAsync } from "./utils/exec";
import { join } from "path";
import { writeFile, readFile } from "fs/promises";

// 2. simple check if we are running in dev / preview / production
const isDev = process.env.DEV != undefined;
const isPreview = process.env.PREVIEW != undefined;

let window: BrowserWindow | null = null;

let mapartothequeDirectory: string = ""

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      preload: join(__dirname, "preload.js")
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    // ^^^^ make sure this port
    // matches the port used when
    // you run 'yarn run vite'
    mainWindow.webContents.openDevTools();
  } else if (isPreview) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile("dist/index.html");
    // 3. ^^^^^ this 'dist' folder will be our output folder
  } else {
    mainWindow.loadFile("dist/index.html");
  }
  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  window = createWindow();

  mapartothequeDirectory = join(app.getPath("home"), ".mapartotheque")

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("generateLilypond", async (event, consoleParams) => {
  console.log("generateLilypond", consoleParams)
  const { lilypondFile, outputFile, params } = consoleParams
  const lilypondFilePath = join(mapartothequeDirectory, lilypondFile)
  const outputFilePath = join(mapartothequeDirectory, outputFile)
  const lilypondParams = params.replace("***outputFile***", outputFilePath).replace("***inputFile***", lilypondFilePath)
  const pageDirectory = __dirname.replace('app.asar/dist', lilypondParams)

  const result = await execAsync(join(pageDirectory, "batch/lilypond.sh " + lilypondParams))
  return result.stdout;
})

ipcMain.handle("writeToFile", async (event, { fileName, contents }) => {
  await writeFile(join(mapartothequeDirectory, fileName), contents);
})

ipcMain.handle("readFromFile", async (event, file_name) => {
  console.log("readFromFile", file_name)
  const mapartothequeDirectory = join(app.getPath("home"), ".mapartotheque")
  const result = await readFile(join(mapartothequeDirectory, file_name));
  return result;
})