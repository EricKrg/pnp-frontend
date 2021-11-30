"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PnPServer = void 0;
var chat_1 = require("./chat");
var player_1 = require("./player");
var wss_list_1 = require("./wss.list");
var PnPServer = /** @class */ (function () {
    function PnPServer() {
        this.wsComponents = [];
    }
    PnPServer.prototype.init = function () {
        this.wsComponents = [
            new chat_1.ChatWSS(9000, wss_list_1.WSSRoutes.chat),
            new player_1.PlayerWSS(9001, wss_list_1.WSSRoutes.player)
        ];
        this.wsComponents.forEach(function (i) {
            i.listen();
        });
    };
    return PnPServer;
}());
exports.PnPServer = PnPServer;
new PnPServer().init();
//# sourceMappingURL=server.js.map