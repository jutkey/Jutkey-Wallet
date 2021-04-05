/*
 * @Author: abc
 * @Date: 2021-01-29 16:13:10
 * @LastEditors: abc
 * @LastEditTime: 2021-03-22 15:42:58
 * @Description: electron config
 */
'use strict';
// const path = require('path');
import { app, protocol, BrowserWindow, globalShortcut, Menu } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);
let win;
async function createWindow() {
  createMenu();
  // Create the browser window.
  win = new BrowserWindow({
    width: 1300,
    height: 660,
    minWidth: 1300,
    useContentSize: true,
    resizable: true,
    //  frame: false,
    //  backgroundColor: '#DC143C',
    // titleBarStyle: 'hidden',
    webPreferences: {
      webSecurity: false, //Remove cross domain restrictions
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      // eslint-disable-next-line no-undef
      preload: `${__static}/preload.js`
    },
    //${__ Static} corresponds to the public directory
    // eslint-disable-next-line no-undef
    icon: `${__static}/img/icons/logo-64.png`
    // icon: `${__static}/img/icons/favicon.ico`
  });
  if (process.platform === 'darwin') {
    // eslint-disable-next-line no-undef
    app.dock.setIcon(`${__static}/img/icons/logo-512.png`);
  }
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    /* if (!process.env.IS_TEST) win.webContents.openDevTools(); */
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }
  win.on('closed', () => {
    win = null;
  });
  globalShortcut.register('CommandOrControl+Shift+i', function () {
    win.webContents.openDevTools();
  });
  // esc，
  globalShortcut.register('ESC', function () {
    win.unmaximize();
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
});
// Setup menu bar
function createMenu() {
  // Darwin stands for MacOS, which is the setting for MacOS
  if (process.platform === 'darwin') {
    const template = [
      {
        label: 'electorn-my-app',
        submenu: [
          {
            role: 'about'
          },
          {
            role: 'quit'
          }
        ]
      }
    ];
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    // Windows and Linux system
    Menu.setApplicationMenu(null);
  }
}
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
