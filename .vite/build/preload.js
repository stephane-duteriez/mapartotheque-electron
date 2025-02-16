"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const electron = require("electron");
const backend = {
  nodeVersion: async (msg) => await electron.ipcRenderer.invoke("node-version", msg)
};
electron.contextBridge.exposeInMainWorld("backend", backend);
exports.backend = backend;
