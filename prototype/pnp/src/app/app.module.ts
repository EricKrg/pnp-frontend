import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { FormsModule } from '@angular/forms';
import { PlayersComponent } from './components/players/players.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [AppComponent, LoginModalComponent, PlayersComponent, ChatComponent],
  entryComponents: [],
  imports: [BrowserModule, FormsModule,
     CommonModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
