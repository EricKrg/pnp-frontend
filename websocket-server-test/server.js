"use strict";
exports.__esModule = true;
var ws_1 = require("ws");
var wss = new ws_1.WebSocketServer({ port: 8080, path: "/chat" });
//wss.binaryType = "arraybuffer"
var clients = [];
wss.on('connection', function (ws) {
    //ws.binaryType = "arraybuffer"
    clients.push(ws);
    ws.onmessage = function (msg) {
        console.log("event", msg.data);
        for (var _i = 0, clients_1 = clients; _i < clients_1.length; _i++) {
            var client = clients_1[_i];
            client.send(msg.data);
        }
    };
});
