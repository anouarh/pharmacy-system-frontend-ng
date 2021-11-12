"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHandler = void 0;
var electron_1 = require("electron");
var electron_updater_1 = require("electron-updater");
var main_1 = require("./main");
var send_message_to_render_1 = require("./send-message-to-render");
var write_log_1 = require("./write-log");
function updateHandler() {
    var returnData = {
        error: { status: -1, msg: 'Error' },
        checking: { status: 1, msg: 'Checking' },
        updateAva: { status: 2, msg: 'Update Available' },
        updateNotAva: { status: 0, msg: 'Update Not Available' },
    };
    electron_updater_1.autoUpdater.checkForUpdates();
    electron_updater_1.autoUpdater.on('error', function (message) {
        write_log_1.writeLog('error', returnData.error.msg);
        send_message_to_render_1.sendMessageToRender('message', returnData.error.msg);
    });
    electron_updater_1.autoUpdater.on('checking-for-update', function () {
        write_log_1.writeLog('warn', returnData.checking.msg);
        send_message_to_render_1.sendMessageToRender('message', returnData.checking.msg);
    });
    electron_updater_1.autoUpdater.on('update-available', function (ev, info) {
        write_log_1.writeLog('warn', returnData.updateAva.msg);
        send_message_to_render_1.sendMessageToRender('message', returnData.updateAva.msg);
    });
    electron_updater_1.autoUpdater.on('update-not-available', function (info) {
        write_log_1.writeLog('error', returnData.updateNotAva.msg);
        send_message_to_render_1.sendMessageToRender('message', returnData.updateNotAva.msg);
    });
    electron_updater_1.autoUpdater.on('download-progress', function (progressObj) {
        write_log_1.writeLog('warn', progressObj);
        send_message_to_render_1.sendMessageToRender('downloadProgress', progressObj.percent.toString());
    });
    electron_updater_1.autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate) {
        write_log_1.writeLog('info', 'A new version has been downloaded');
        var options = {
            type: 'question',
            buttons: ['Non', 'Oui'],
            defaultId: 0,
            title: 'Mise à jour',
            message: process.platform === 'win32' ? releaseNotes : releaseName,
            detail: 'La nouvelle version a été téléchargée, veuillez fermer le programme et installer la nouvelle version',
            checkboxLabel: 'Remember my answer',
            checkboxChecked: true,
        };
        electron_1.dialog.showMessageBox(main_1.win, options).then(function (res) {
            if (res.response === 0) {
                electron_updater_1.autoUpdater.quitAndInstall();
            }
        });
    });
}
exports.updateHandler = updateHandler;
//# sourceMappingURL=update-handler.js.map