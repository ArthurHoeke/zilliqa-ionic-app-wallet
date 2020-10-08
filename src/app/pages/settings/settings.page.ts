import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  privkey;

  constructor(private vibration: Vibration, private clipboard: Clipboard, private activatedRoute: ActivatedRoute, public alertController: AlertController, private route: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( param => {
      this.privkey = param.privkey;
    });
  }

  async showPopup(head, message) {
    const alert = await this.alertController.create({
      header: head,
      message: message,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Copy',
          handler: () => {
            this.clipboard.copy(this.privkey);
          }
        }
      ]
    });
    await alert.present();
  }

  copyPrivateKey() {
    this.showPopup("Private key", "Your private key is: " + this.privkey);
    this.vibration.vibrate(100);
  }

  openHome() {
    this.route.navigate(['/home/' + this.privkey]);
    this.vibration.vibrate(100);
  }
}
