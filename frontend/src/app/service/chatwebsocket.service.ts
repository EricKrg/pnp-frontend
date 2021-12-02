import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Subject } from 'rxjs';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Roles, User } from '../model/pnp.interfaces';

// todo add to config
export const WS_CHAT = "ws://localhost:9000/chat"

@Injectable({
  providedIn: 'root',
})
export class ChatWebsocketService implements CanActivate {

  constructor() {}

  msg: Subject<any> = new Subject();
  chatUser: Set<string> = new Set();

  private allMsg: {msg: string, user; User}[] = [];

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
      next: (msg: any[]) => {
        console.log("incoming msg", msg)
        const currentMsg = [];
        msg.forEach(i => {
          currentMsg.push(JSON.parse(i));
        })
        this.msg.next(currentMsg);
        currentMsg.forEach((i: {msg:string, user:User}) => {
          this.chatUser.add(i.user.name);
        });
        this.allMsg = currentMsg;
      },
      error: err => console.log("error", err)
    });
    this.sendMessage({id: "", name : "", role: Roles.Master}, "")
  }

  private getNewWebSocket(url: string): WebSocketSubject<{msg: string, user: string}> {
    return webSocket(url);
  }

  sendMessage(user: User, msg: string) {
    console.log("send")
    this.socket.next(JSON.stringify({user, msg}));
  }

  getAllMsg(): {msg: string, user; User}[] {
    return this.allMsg;
  };

  getAllChatUser(): Set<string> {
    return this.chatUser;
  }

  close() {
    this.socket.complete();
  }
}
