import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router'
import { Vibration } from '@ionic-native/vibration/ngx';

const { BN, Long, bytes, units, validation } = require('@zilliqa-js/util');
const { Zilliqa } = require('@zilliqa-js/zilliqa');
const {
  toBech32Address,
  getAddressFromPrivateKey,
} = require('@zilliqa-js/crypto');

const zilliqa = new Zilliqa('https://api.zilliqa.com/');

@Component({
  selector: 'app-import-privkey',
  templateUrl: './import-privkey.page.html',
  styleUrls: ['./import-privkey.page.scss'],
})
export class ImportPrivkeyPage implements OnInit {

  privkey;

  constructor(private vibration: Vibration, public alertController: AlertController, private nativeStorage: NativeStorage, private route: Router) { }

  async showPopup(head, message) {
    const alert = await this.alertController.create({
      header: head,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }

  checkPrivateKey() {
    this.vibration.vibrate(100);
    if(validation.isPrivateKey(this.privkey)) {
      this.route.navigate(['/import-setpin/' + this.privkey]);
    } else {
      this.showPopup("Error", "Private key is incorrect.");
    }
  }
}