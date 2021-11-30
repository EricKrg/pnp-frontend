import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { User } from './model/pnp.interfaces';
import { PlayerWebsocketService } from './service/playerwebsocket.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements CanActivate {

  private currentUser: User | undefined;

  constructor(public modalController: ModalController,
              private playerWSService: PlayerWebsocketService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!this.currentUser) {
      console.log("create modal")
      const login = await this.modalController.create({
        component: LoginModalComponent
      })
      await login.present();
      return false;
    }
    return true

  }

  registerUser(user:User): void {
    this.currentUser = user;
    this.playerWSService.sendMessage(user);


  }

}
