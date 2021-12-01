import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from '../components/chat/chat.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(public modalController: ModalController,
    private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async openChat(): Promise<void> {
    const login = await this.modalController.create({
      component: ChatComponent
    })
    await login.present();
  }

}
