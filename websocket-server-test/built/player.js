"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerWSS = void 0;
var ws_1 = require("ws");
var PlayerWSS = /** @class */ (function () {
    function PlayerWSS(port, route) {
        this.clients = [];
        this.players = [];
        this.port = port;
        this.route = route;
    }
    PlayerWSS.prototype.listen = function () {
        var _this = this;
        console.log("creating server!", this.port, this.route);
        this.wss = new ws_1.WebSocketServer({ port: this.port, path: this.route });
        //wss.binaryType = "arraybuffer"
        this.wss.on('connection', function (ws) {
            //ws.binaryType = "arraybuffer"
            _this.clients.push(ws);
            console.log("connection", ws);
            ws.onmessage = function (msg) {
                console.log("event", msg.data);
                _this.players.push(JSON.parse(msg.data));
                console.log(_this.players);
                for (var _i = 0, _a = _this.clients; _i < _a.length; _i++) {
                    var client = _a[_i];
                    client.send(JSON.stringify(_this.players));
                }
            };
        });
    };
    return PlayerWSS;
}());
exports.PlayerWSS = PlayerWSS;
//# sourceMappingURL=player.js.map