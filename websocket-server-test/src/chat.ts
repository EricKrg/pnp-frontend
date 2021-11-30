import { WebSocketServer } from 'ws';
import { WSSComponent } from './wss.component';
import { WSSRoutes } from './wss.list';


export class ChatWSS implements WSSComponent {

    route: WSSRoutes;
    port: number;
    wss: WebSocketServer;

    clients: WebSocket[] = [];

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

            

            ws.onmessage = (msg: MessageEvent<any>) => {
                console.log("event", msg.data)
                for (const client of this.clients) {
                    client.send(msg.data);
                }
            }
        });
    }
}

