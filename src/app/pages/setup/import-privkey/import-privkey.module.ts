import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportPrivkeyPageRoutingModule } from './import-privkey-routing.module';

import { ImportPrivkeyPage } from './import-privkey.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportPrivkeyPageRoutingModule
  ],
  declarations: [ImportPrivkeyPage]
})
export class ImportPrivkeyPageModule {}
