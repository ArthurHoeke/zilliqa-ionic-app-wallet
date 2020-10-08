import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSetupPage } from './account-setup.page';

const routes: Routes = [
  {
    path: '',
    component: AccountSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSetupPageRoutingModule {}
