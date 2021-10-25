import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import zilliqaAPI from '@zilliqa-js/viewblock'

const { BN, Long, bytes, units, validation } = require('@zilliqa-js/util');
const { Zilliqa } = require('@zilliqa-js/zilliqa');
const {
  toBech32Address,
  getAddressFromPrivateKey,
} = require('@zilliqa-js/crypto');

const zilliqa = new Zilliqa('https://api.zilliqa.com/');

const apiClient = zilliqaAPI({
  apiKey: '905e89d706d250f76783e41817d82af2317742831d330609e7434678d15ce62e',
})

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  expandTransactionBox = false; 
  expandReceiveBox = false; 
  processingTransaction = false;

  balance = 0;
  walletAddress;

  sendAddress = "";
  sendAmount = 0;
  newBalance = 0;

  transactionHistory;

  transactionFee = 0.002;
  defaultTransactionFee = 0.002;
  fastTransactionFee = 0.003;
  customFee = 0;

  updateData: boolean = false;
  
  constructor(private vibration: Vibration, public platform: Platform, private activatedRoute: ActivatedRoute, public alertController: AlertController, private clipboard: Clipboard, private route: Router) {
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.setupWallet();
    })
  }

  setupWallet() {
    this.activatedRoute.params.subscribe(param => {
      const privkey = param.privkey.replaceAll('"', "");
      zilliqa.wallet.addByPrivateKey(privkey);
      this.walletAddress = toBech32Address(getAddressFromPrivateKey(privkey));
      zilliqa.blockchain.getBalance(this.walletAddress).then((data) => {
        this.balance = units.fromQa(new BN(data.result.balance), units.Units.Zil);
      }).catch((error) => {
        //If balance is 0, prevent error
      });

      this.updateTransactionHistory();
    });
  }

  updateTransactionHistory() {
    apiClient.getAddressTxs(this.walletAddress, { page: 1 }).then((data) => {
      this.transactionHistory = data.docs;
    }).catch((err) => {
      console.log(err)
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  updateWalletData() {
    this.vibration.vibrate(100);
    this.updateData = true;
    (async () => { 
      await this.delay(1000);
      this.updateData = false;
    })();
    zilliqa.blockchain.getBalance(this.walletAddress).then((data) => {
      this.balance = units.fromQa(new BN(data.result.balance), units.Units.Zil);
    }).catch((error) => {
      //If balance is 0, prevent error
    });
    this.updateTransactionHistory();
  }

  confirmTransaction() {
    this.vibration.vibrate(100);
    if((this.balance - this.sendAmount) > 0) {
      if(validation.isAddress(this.sendAddress) || validation.isBech32(this.sendAddress)) {

        this.processingTransaction = true;
        this.expandTransactionBox = false;
        
        const gasPrice = units.toQa('1000', units.Units.Li);
        const tx = zilliqa.blockchain.createTransaction(
          zilliqa.transactions.new(
            {
              version: 65537,
              toAddr: this.sendAddress,
              amount: new BN(units.toQa(this.sendAmount, units.Units.Zil)),
              gasPrice: this.transactionFee,
              gasLimit: Long.fromNumber(1),
            }, false)
        ).then((response) => {
          console.log(response);
          this.processingTransaction = false;
          this.updateWalletData();
          this.vibration.vibrate([100,200,100]);
        }).catch((error) => {
          console.log(error);
        });
      } else {
        console.log(this.sendAddress);
        this.showPopup("Error", "Address is not valid.");
      }
    } else {
      this.showPopup("Error", "Not enough balance to complete this transaction.");
    }
  }

  copyAddress() {
    this.showReceivePopup("ZIL address", "Your address is: " + this.walletAddress);
  }

  async showCustomAmountPopup(head, message) {
    const alert = await this.alertController.create({
      header: head,
      message: message,
      inputs: [
        {
          name: 'amount',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Set',
          handler: (alertData) => {
            this.sendAmount = alertData.amount;
            this.calculateNewBalance();
          }
        }
      ]
    });
    await alert.present();
  }

  async showReceivePopup(head, message) {
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
            this.clipboard.copy(this.walletAddress);
          }
        }
      ]
    });
    await alert.present();
  }

  async showPopup(head, message) {
    const alert = await this.alertController.create({
      header: head,
      message: message,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    await alert.present();
  }

  increaseSend(amount) {
    this.sendAmount += amount;
    this.calculateNewBalance();
    this.vibration.vibrate(100);
  }

  setTransactionFee(amount) {
    this.transactionFee = amount;
  }

  getSelectedFee(amount) {
    if(this.transactionFee == amount) {
      return "selectedFee";
    }
  }

  getCustomFeeString() {
    if(this.transactionFee != this.defaultTransactionFee && this.transactionFee != this.fastTransactionFee) {
      return this.transactionFee + " ZIL";
    } else {
      return "..."
    }
  }

  setTransactionAmount() {
    this.showCustomAmountPopup("ZIL amount", "Enter the amount of ZIL you want to sent");
  }

  async showCustomTransactionFeePopup(head, message) {
    const alert = await this.alertController.create({
      header: head,
      message: message,
      inputs: [
        {
          name: 'amount',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Set',
          handler: (alertData) => {
            this.transactionFee = alertData.amount;
            this.customFee = alertData.amount;
          }
        }
      ]
    });
    await alert.present();
  }

  setCustomTransactionFee() {
    this.showCustomTransactionFeePopup("Custom fee", "Enter the amount of transaction fee you want to set");
  }

  calculateNewBalance() {
    this.newBalance = this.balance - this.sendAmount;
  }

  openSend() {
    if(!this.processingTransaction) {
      this.expandTransactionBox = !this.expandTransactionBox;
      this.vibration.vibrate(100);
    } else {
      this.vibration.vibrate([100, 200, 100]);
    }
  }

  openReceive() {
    if(!this.processingTransaction) {
      this.expandReceiveBox = !this.expandReceiveBox;
      this.vibration.vibrate(100);
    } else {
      this.vibration.vibrate([100, 200, 100]);
    }
    this.vibration.vibrate(100);
  }

  closeAction() {
    this.expandReceiveBox = false;
    this.expandTransactionBox = false;
    this.vibration.vibrate(100);
  }

  convertQa(amount) {
    return units.fromQa(new BN(amount), units.Units.Zil);
  }

  convertTimestamp(timestamp) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    var date = new Date(timestamp);
    return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
  }

  openSettings() {
    this.vibration.vibrate(100);
    this.route.navigate(['/settings/' + zilliqa.wallet.defaultAccount.privateKey]);
  }
}
