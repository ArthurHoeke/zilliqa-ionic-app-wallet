import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportPrivkeyPage } from './import-privkey.page';

const routes: Routes = [
  {
    path: '',
    component: ImportPrivkeyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportPrivkeyPageRoutingModule {}
