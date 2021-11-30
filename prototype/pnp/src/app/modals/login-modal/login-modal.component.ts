import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Roles, User } from 'src/app/model/pnp.interfaces';
import { SessionService } from 'src/app/session.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  @Input() name: string;
  
  roles = Roles;
  newUser: User = {
    id: "",
    name: "",
    role: undefined
  };

  constructor(private sessionService: SessionService,
              private route: Router,
              public modalController: ModalController) { }

  ngOnInit() {}

  onSubmit(): void {
    this.newUser.id = uuidv4();
    this.sessionService.registerUser(this.newUser);
    this.modalController.dismiss();
    this.route.navigate([""]);
  }

  setProp(prop: string, value: any): void {
    console.log(prop, value);
    this.newUser[prop]=value;
    
  }

  userValid(): boolean {
    if (!this.newUser) {
      return false;
    }
    if (!this.newUser.name) {
      return false;
    }

    if (!this.newUser.role) {
      return false;
    }
    console.log("valid")
    return true;
  }

}
