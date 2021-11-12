import { globalShortcut } from 'electron';
import { updateHandler } from './update-handler';
import { win } from './main';

export function shortcutRegister() {
  globalShortcut.register('Command+Control+Alt+Shift+D', () => {
    win.webContents.openDevTools();
  });

  globalShortcut.register('Command+Control+Alt+Shift+U', () => {
    updateHandler();
  });
}
