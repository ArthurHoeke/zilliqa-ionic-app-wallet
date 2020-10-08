import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home/:privkey',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'getting-started',
    loadChildren: () => import('./pages/setup/getting-started/getting-started.module').then( m => m.GettingStartedPageModule)
  },
  {
    path: 'account-setup',
    loadChildren: () => import('./pages/setup/account-setup/account-setup.module').then( m => m.AccountSetupPageModule)
  },
  {
    path: 'success/:privkey',
    loadChildren: () => import('./pages/setup/success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'import-privkey',
    loadChildren: () => import('./pages/setup/import-privkey/import-privkey.module').then( m => m.ImportPrivkeyPageModule)
  },
  {
    path: 'import-setpin/:privkey',
    loadChildren: () => import('./pages/setup/import-setpin/import-setpin.module').then( m => m.ImportSetpinPageModule)
  },
  {
    path: 'settings/:privkey',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
