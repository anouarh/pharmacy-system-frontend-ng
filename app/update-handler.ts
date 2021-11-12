import { dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import { win } from './main';
import { sendMessageToRender } from './send-message-to-render';
import { writeLog } from './write-log';

export function updateHandler() {
  const returnData = {
    error: { status: -1, msg: 'Error' },
    checking: { status: 1, msg: 'Checking' },
    updateAva: { status: 2, msg: 'Update Available' },
    updateNotAva: { status: 0, msg: 'Update Not Available' },
  };

  autoUpdater.checkForUpdates();

  autoUpdater.on('error', (message) => {
    writeLog('error', returnData.error.msg);
    sendMessageToRender('message', returnData.error.msg);
  });

  autoUpdater.on('checking-for-update', () => {
    writeLog('warn', returnData.checking.msg);
    sendMessageToRender('message', returnData.checking.msg);
  });

  autoUpdater.on('update-available', (ev, info) => {
    writeLog('warn', returnData.updateAva.msg);

    sendMessageToRender('message', returnData.updateAva.msg);
  });

  autoUpdater.on('update-not-available', (info) => {
    writeLog('error', returnData.updateNotAva.msg);

    sendMessageToRender('message', returnData.updateNotAva.msg);
  });

  autoUpdater.on('download-progress', (progressObj) => {
    writeLog('warn', progressObj);
    sendMessageToRender('downloadProgress', progressObj.percent.toString());
  });

  autoUpdater.on(
    'update-downloaded',
    (event, releaseNotes, releaseName, releaseDate) => {
      writeLog('info', 'A new version has been downloaded');
      const options = {
        type: 'question',
        buttons: ['Non', 'Oui'],
        defaultId: 0,
        title: 'Mise à jour',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail:
          'La nouvelle version a été téléchargée, veuillez fermer le programme et installer la nouvelle version',
        checkboxLabel: 'Remember my answer',
        checkboxChecked: true,
      };
      dialog.showMessageBox(win, options).then((res) => {
        if (res.response === 0) {
          autoUpdater.quitAndInstall();
        }
      });
    }
  );
}
