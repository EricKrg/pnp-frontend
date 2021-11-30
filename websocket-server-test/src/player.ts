import { WebSocketServer } from 'ws';
import { WSSComponent } from './wss.component';
import { WSSRoutes } from './wss.list';


export class PlayerWSS implements WSSComponent {

    route: WSSRoutes;
    port: number;
    wss: WebSocketServer;

    clients: WebSocket[] = [];

    players: any[] = [];

    constructor(port: number, route: WSSRoutes) {
        this.port = port;
        this.route = route;
    }
    
    listen(): void {
        console.log("creating server!", this.port, this.route)
        this.wss = new WebSocketServer({ port: this.port, path: this.route });
        //wss.binaryType = "arraybuffer"
        this.wss.on('connection', (ws: WebSocket) => {
            //ws.binaryType = "arraybuffer"
            this.clients.push(ws)
            console.log("connection", ws)

            ws.onmessage = (msg: MessageEvent<any>) => {
                console.log("event", msg.data)
                this.players.push(JSON.parse(msg.data));
                console.log(this.players);
                for (const client of this.clients) {
                    client.send(JSON.stringify(this.players));
                }
            }
        });
    }
}

