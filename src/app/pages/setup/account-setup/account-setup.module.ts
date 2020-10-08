import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountSetupPageRoutingModule } from './account-setup-routing.module';

import { AccountSetupPage } from './account-setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountSetupPageRoutingModule
  ],
  declarations: [AccountSetupPage]
})
export class AccountSetupPageModule {}
