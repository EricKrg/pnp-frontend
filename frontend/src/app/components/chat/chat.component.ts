import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/pnp.interfaces';
import { ChatWebsocketService } from 'src/app/service/chatwebsocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  inputMsg: string; 

  msg: any[] = []

  constructor(private chatWSSSocketService: ChatWebsocketService) { }

  ngOnInit() {
    this.chatWSSSocketService.msg.subscribe({
      next: (msglist: any[]) => {
        console.log(msglist)
        this.msg = msglist;
      }
      
    });
  }

  sendMsg(user: User, msg: string): void {
    this.chatWSSSocketService.sendMessage(user, msg)
  }

}
