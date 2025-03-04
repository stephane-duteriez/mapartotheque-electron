// src/electron/preload.ts

import { contextBridge, ipcRenderer } from "electron";

export const backend = {
  nodeVersion: async (msg: string): Promise<string> =>
    await ipcRenderer.invoke("node-version", msg),
  send: async (channel: string, args: any[], callback: (result: string) => void) => {
    // whitelist channels
    let validChannels = ["askToRead", "askToWrite", "sendReturnFromLilypond"];
    if (validChannels.includes(channel)) {
      const result = await ipcRenderer.send(channel, callback);
      return result;
    } else {
      throw "invalid channel"
    }
  },
  receive: (channel: string, func: (...args: any[]) => void) => {
    let validChannels = ["sendReturnFromLilypond"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender` 
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    } else {
      throw "invalid channel"
    }
  },
  invoke: async (channel: string, args: any) => {
    let validChannels = ["generateLilypond", "writeToFile", "readFromFile"];
    if (validChannels.includes(channel)) {
      return await ipcRenderer.invoke(channel, args);
    } else {
      throw "invalid channel"
    }
  }
};

contextBridge.exposeInMainWorld("backend", backend);