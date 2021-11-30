import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/model/pnp.interfaces';
import { PlayerWebsocketService, WS_PLAYER } from 'src/app/service/playerwebsocket.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {

  players: User[] = [];

  constructor(private playerWSSocketService: PlayerWebsocketService) {
   }

  ngOnInit() {
    this.playerWSSocketService.players.subscribe({
      next: (player: any[]) => {
        console.log(player)
        this.players = player;
        console.log(this.players)
      }
      
    });
  }

}
