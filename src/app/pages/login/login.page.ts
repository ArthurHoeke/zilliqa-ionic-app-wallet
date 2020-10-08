import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router'
import { Vibration } from '@ionic-native/vibration/ngx';

const { BN, Long, bytes, units } = require('@zilliqa-js/util');
const { Zilliqa } = require('@zilliqa-js/zilliqa');
const {
  toBech32Address,
  getAddressFromPrivateKey,
} = require('@zilliqa-js/crypto');

const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  selectedPin: string = "XXXXXX";
  walletData;

  constructor(private vibration: Vibration, public alertController: AlertController, private nativeStorage: NativeStorage, private route: Router) { }

  ngOnInit() {
    this.nativeStorage.getItem('wallet')
    .then(
      data => {
        this.walletData = data;
      },
      error => {
        this.route.navigate(['/getting-started']);
      }
    );
  }

  async showPopup(head, message) {
    const alert = await this.alertController.create({
      header: head,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  setPin(pin) {
    this.vibration.vibrate(100);
    var totalX = (this.selectedPin.match(/X/gi) || []).length - 1;
    if(totalX >= 0 || this.selectedPin == "XXXXXX") {
      this.selectedPin = this.selectedPin.replace(/X/gi, "");
      this.selectedPin += pin;
      for(let i = 0; i < totalX; i++) {
        this.selectedPin += "X";
      }
    } else { 
      this.selectedPin = pin + "XXXXX";
    }
  }

  savePin() {
    this.vibration.vibrate(100);
    var totalX = (this.selectedPin.match(/X/gi) || []).length;
    if(totalX == 0) {
        let bytes = CryptoJS.AES.decrypt(this.walletData.privKey, this.selectedPin);
        var key = bytes.toString(CryptoJS.enc.Utf8);
        if(key.length != 0) {
          this.route.navigate(['/home/' + key]);
        } else {
          this.showPopup("Wrong PIN", "PIN " + this.selectedPin + " is incorrect.");
          this.selectedPin = "XXXXXX";
        }
    } else {
      this.showPopup("Not that fast!", "Please select a 4 digit PIN.");
    }
  }

  checkPinValidity() {
    var totalX = (this.selectedPin.match(/X/gi) || []).length;
    if(totalX == 0) {
      return true;
    } else {
      return false;
    }
  }
}
