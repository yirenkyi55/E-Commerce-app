import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AdminGuard,
  ContactsGuard,
  ProductsGuard,
  ProductTypesGuard,
  PurchasesGuard,
  SystemAdminGuard,
  AboutGuard,
} from '../core/guards';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [
      AdminGuard,
      ProductTypesGuard,
      ProductsGuard,
      PurchasesGuard,
      SystemAdminGuard,
      ContactsGuard,
      AboutGuard,
    ],
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'types',
        loadChildren: () =>
          import('./types/types.module').then((m) => m.TypesModule),
      },

      {
        path: 'purchases',
        loadChildren: () =>
          import('./purchases/purchases.module').then((m) => m.PurchasesModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./info/info.module').then((m) => m.InfoModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
