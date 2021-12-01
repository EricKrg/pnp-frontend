import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/pnp.interfaces';
import { ChatWebsocketService } from 'src/app/service/chatwebsocket.service';
import { SessionService } from 'src/app/session.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  inputMsg: string; 

  chatMsg: string | undefined = "";

  msg: {user: User, msg: string}[] = []

  constructor(private chatWSSSocketService: ChatWebsocketService,
              private sessionService: SessionService) { }

  ngOnInit() {
    this.chatWSSSocketService.msg.subscribe({
      next: (msglist: {user: User, msg: string}[]) => {
        console.log("chat",msglist)
        this.msg = msglist;
      }
    });
    this.chatMsg = "ping";
    this.sendMsg();
  }

  sendMsg(): void {
    console.log("send!")
    if (!this.chatMsg  || this.chatMsg === "") {
      return;
    }
    this.chatWSSSocketService.sendMessage(this.sessionService.getCurrentUser(), this.chatMsg);
    this.chatMsg = "";
  }

  getColor(user: User): string {
    if (user.id === this.sessionService.getCurrentUser().id) {
      return "primary";
    }
    return "light";
  }

  isCurrentUser(user: User): boolean {
    return user.id === this.sessionService.getCurrentUser().id;
  }

}
