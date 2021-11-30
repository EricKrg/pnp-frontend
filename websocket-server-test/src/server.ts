import { ChatWSS } from "./chat";
import { PlayerWSS } from "./player";
import { WSSComponent } from "./wss.component";
import { WSSRoutes } from "./wss.list";


export class PnPServer {

  wsComponents: WSSComponent[] = [];

  constructor() {

  }

  init(): void {
    this.wsComponents=[
      new ChatWSS(9000, WSSRoutes.chat),
      new PlayerWSS(9001, WSSRoutes.player)
    ] 

    this.wsComponents.forEach(i => {
      i.listen();
    })
  }
}


new PnPServer().init();