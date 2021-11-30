import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Subject } from 'rxjs';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { User } from '../model/pnp.interfaces';

// todo add to config
export const WS_CHAT = "ws://localhost:9000/chat"

@Injectable({
  providedIn: 'root',
})
export class ChatWebsocketService implements CanActivate {

  constructor() {}

  msg: Subject<any> = new Subject();

  private socket: WebSocketSubject<any>;
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.socket) {
      console.log("creating socket")
      this.connect(WS_CHAT)
      return false;
    } 
    console.log("socket created")
    return true;
  }

  public connect(url: string): void {
    this.socket = this.getNewWebSocket(url);
    this.socket.subscribe({
      next: (player: any[]) => {
        console.log("incoming", player)
        const currentPlayers = [];
        player.forEach(i => {
          currentPlayers.push(JSON.parse(i));
        })
        this.msg.next(currentPlayers);
      },
      error: err => console.log("error", err)
    })
  }

  private getNewWebSocket(url: string): WebSocketSubject<{msg: string, user: string}> {
    return webSocket(url);
  }

  sendMessage(user: User, msg: string) {
    console.log("send")
    this.socket.next(JSON.stringify({user, msg}));
  }

  close() {
    this.socket.complete();
  }
}
