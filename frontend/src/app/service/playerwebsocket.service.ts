import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Subject } from 'rxjs';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { User } from '../model/pnp.interfaces';

// todo add to config
export const WS_PLAYER = "ws://localhost:9001/player"

@Injectable({
  providedIn: 'root',
})
export class PlayerWebsocketService implements CanActivate {

  constructor() {}

  players: Subject<any> = new Subject();

  private socket: WebSocketSubject<any>;
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.socket) {
      console.log("creating socket")
      this.connect(WS_PLAYER)
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
        this.players.next(currentPlayers);
      },
      error: err => console.log("error", err)
    })
  }

  private getNewWebSocket(url: string): WebSocketSubject<{msg: string, user: string}> {
    return webSocket(url);
  }

  sendMessage(user: User) {
    console.log("send")
    this.socket.next(JSON.stringify(user));
  }

  close() {
    this.socket.complete();
  }
}
