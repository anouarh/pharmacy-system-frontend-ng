import { ipcMain } from 'electron';
import { updateHandler } from './update-handler';

export function receiveMessageFromRender() {
  ipcMain.on('checkForUpdate', (event, data) => {
    updateHandler();
  });
}
