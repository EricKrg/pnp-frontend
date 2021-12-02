import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonItem, IonList } from '@ionic/angular';
import { User } from 'src/app/model/pnp.interfaces';
import { ChatWebsocketService } from 'src/app/service/chatwebsocket.service';
import { SessionService } from 'src/app/session.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {

  inputMsg: string; 

  chatMsg: string | undefined = "";

  chatUser: Set<string> = new Set();

  msg: {user: User, msg: string}[] = []

  @ViewChild('chat', {read: ElementRef}) private chatContainer: ElementRef;

  constructor(private chatWSSSocketService: ChatWebsocketService,
              private sessionService: SessionService) { }

  ngOnInit() {
    this.msg = this.chatWSSSocketService.getAllMsg().filter(i => i.msg !== "");
    this.chatUser = this.chatWSSSocketService.getAllChatUser();
    console.log("user",this.chatUser)
    this.scrollToBottom();
  }

  ngAfterViewInit(): void {
    this.chatWSSSocketService.msg.subscribe({
      next: (msglist: {user: User, msg: string}[]) => {
        this.msg = msglist.filter(i => i.msg !== "");
        this.chatUser = this.chatWSSSocketService.getAllChatUser();
        setTimeout(() => {
          this.scrollToBottom();  
        }, 0);
        
      }
    });
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

  scrollToBottom(): void {
    try {
      console.log(this.chatContainer)
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { 
      console.log(err)
    }                 
}

}
