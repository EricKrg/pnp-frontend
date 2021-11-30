"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatWSS = void 0;
var ws_1 = require("ws");
var ChatWSS = /** @class */ (function () {
    function ChatWSS(port, route) {
        this.clients = [];
        this.port = port;
        this.route = route;
    }
    ChatWSS.prototype.listen = function () {
        var _this = this;
        console.log("creating server!", this.port, this.route);
        this.wss = new ws_1.WebSocketServer({ port: this.port, path: this.route });
        //wss.binaryType = "arraybuffer"
        this.wss.on('connection', function (ws) {
            //ws.binaryType = "arraybuffer"
            _this.clients.push(ws);
            ws.onmessage = function (msg) {
                console.log("event", msg.data);
                for (var _i = 0, _a = _this.clients; _i < _a.length; _i++) {
                    var client = _a[_i];
                    client.send(msg.data);
                }
            };
        });
    };
    return ChatWSS;
}());
exports.ChatWSS = ChatWSS;
//# sourceMappingURL=chat.js.map