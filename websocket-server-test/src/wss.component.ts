import { WebSocketServer } from 'ws';
import { WSSRoutes } from "./wss.list";

export interface WSSComponent {
    route: WSSRoutes;
    port: number;
    wss: WebSocketServer;
    listen();
}