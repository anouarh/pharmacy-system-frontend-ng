"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToRender = void 0;
var main_1 = require("./main");
function sendMessageToRender(channel, text) {
    main_1.win.webContents.on('did-finish-load', function () {
        main_1.win.webContents.send(channel, text);
    });
}
exports.sendMessageToRender = sendMessageToRender;
//# sourceMappingURL=send-message-to-render.js.map