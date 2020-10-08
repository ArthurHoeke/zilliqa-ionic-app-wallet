import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportSetpinPageRoutingModule } from './import-setpin-routing.module';

import { ImportSetpinPage } from './import-setpin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportSetpinPageRoutingModule
  ],
  declarations: [ImportSetpinPage]
})
export class ImportSetpinPageModule {}
