"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveMessageFromRender = void 0;
var electron_1 = require("electron");
var update_handler_1 = require("./update-handler");
function receiveMessageFromRender() {
    electron_1.ipcMain.on('checkForUpdate', function (event, data) {
        update_handler_1.updateHandler();
    });
}
exports.receiveMessageFromRender = receiveMessageFromRender;
//# sourceMappingURL=receive-message-from-render.js.map