import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'phone-book',
    pathMatch: 'full',
  },
  {
    path: 'phone-book',
    loadChildren: () =>
      import('./pages/phone-book/phone-book.module').then(
        (m) => m.PhoneBookPageModule
      ),
  },
  {
    path: 'add-contact',
    loadChildren: () =>
      import('./pages/add-contact/add-contact.module').then(
        (m) => m.AddContactPageModule
      ),
  },
  /*   {
    path: 'add-contact/:id',
    loadComponent: () =>
      import('./pages/add-contact/add-contact.page').then(
        (m) => m.AddContactPage
      ),
  }, */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
