import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';

const { BN, Long, bytes, units } = require('@zilliqa-js/util');
const { Zilliqa } = require('@zilliqa-js/zilliqa');
const {
  toBech32Address,
  getAddressFromPrivateKey,
} = require('@zilliqa-js/crypto');

const zilliqa = new Zilliqa('https://api.zilliqa.com/');

@Component({
  selector: 'app-import-setpin',
  templateUrl: './import-setpin.page.html',
  styleUrls: ['./import-setpin.page.scss'],
})
export class ImportSetpinPage implements OnInit {

  selectedPin: string = "XXXXXX";
  confirmPin: string = "";
  privkey;

  constructor(private vibration: Vibration, public alertController: AlertController, private nativeStorage: NativeStorage, private route: Router, private activatedRoute: ActivatedRoute) { }

  async showPopup(head, message) {
    const alert = await this.alertController.create({
      header: head,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe( param => {
      this.privkey = param.privkey;
    });
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
      this.selectedPin = pin + "XXXXXX";
    }
  }

  savePin() {
    this.vibration.vibrate(100);
    var totalX = (this.selectedPin.match(/X/gi) || []).length;
    if(totalX == 0) {
      if(this.confirmPin.length == 0) {
        this.confirmPin = this.selectedPin;
        this.selectedPin = "XXXXXX";
        this.showPopup("Confirm", "Please re-enter your PIN to confirm it.");
      } else {
        if(this.selectedPin == this.confirmPin) {
          //Create wallet object
          zilliqa.wallet.addByPrivateKey(this.privkey)

          //Encrypt the private key
          var encryptedData = CryptoJS.AES.encrypt(JSON.stringify(zilliqa.wallet.defaultAccount.privateKey), this.confirmPin).toString();

          //Save data to device's native storage
          this.nativeStorage.setItem('wallet', {pubKey: zilliqa.wallet.defaultAccount.publicKey, privKey: encryptedData,address: zilliqa.wallet.defaultAccount.address})
            .then(() => {
              this.route.navigate(['/home/' + zilliqa.wallet.defaultAccount.privateKey]);
            },
            error => {
              this.showPopup("Whoops", "Error: " + error);
            }
          );
        } else {
          this.showPopup("No match", "Confirmed PIN code does not match the original. Please try again.");
          this.selectedPin = "XXXXXX";
          this.confirmPin = "";
        }
      }
    } else {
      this.showPopup("Not that fast!", "Please select a 6 digit PIN.");
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