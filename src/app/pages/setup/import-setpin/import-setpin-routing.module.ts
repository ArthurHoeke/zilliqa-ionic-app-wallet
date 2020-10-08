import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportSetpinPage } from './import-setpin.page';

const routes: Routes = [
  {
    path: '',
    component: ImportSetpinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportSetpinPageRoutingModule {}
