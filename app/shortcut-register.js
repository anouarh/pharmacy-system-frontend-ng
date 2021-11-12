"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortcutRegister = void 0;
var electron_1 = require("electron");
var update_handler_1 = require("./update-handler");
var main_1 = require("./main");
function shortcutRegister() {
    electron_1.globalShortcut.register('Command+Control+Alt+Shift+D', function () {
        main_1.win.webContents.openDevTools();
    });
    electron_1.globalShortcut.register('Command+Control+Alt+Shift+U', function () {
        update_handler_1.updateHandler();
    });
}
exports.shortcutRegister = shortcutRegister;
//# sourceMappingURL=shortcut-register.js.map