/*
 * @Author: abc
 * @Date: 2020-10-30 10:40:12
 * @LastEditors: abc
 * @LastEditTime: 2021-04-15 17:14:17
 * @Description:
 */
const { autoUpdater } = require('electron-updater');
import { ipcMain } from 'electron';
let mainWindow = null;
export function updateHandle(win, url) {
  mainWindow = win;
  // Turn off automatic updates
  autoUpdater.autoDownload = false;
  // Automatically install when exiting
  autoUpdater.autoInstallOnAppQuit = true;
  //Set the address of the update package
  autoUpdater.setFeedURL(url);
  setTimeout(() => {
    // Check for updates
    autoUpdater.checkForUpdates();
  }, 1500);
  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('message', 'Checking for update...');
  });

  autoUpdater.on('update-available', (info) => {
    // The version can be updated
    sendStatusToWindow('autoUpdater-canUpdate', info);
  });
  //Listen for no update events available
  autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('update-not-available', info);
  });
  autoUpdater.on('error', (err) => {
    // Update error
    sendStatusToWindow('autoUpdater-error', err);
  });
  // Initiate update program
  ipcMain.on('autoUpdater-toDownload', () => {
    autoUpdater.downloadUpdate();
  });
  autoUpdater.on('download-progress', (progressObj) => {
    // Download progress in progress
    sendStatusToWindow('autoUpdater-progress', progressObj);
  });
  autoUpdater.on('update-downloaded', () => {
    // Download complete
    sendStatusToWindow('autoUpdater-downloaded');
    // Exit the program
    autoUpdater.quitAndInstall();
  });
}

// Send message to render thread
function sendStatusToWindow(status, params) {
  mainWindow.webContents.send(status, params);
}
