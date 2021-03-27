import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard, ProductsGuard, ProductTypesGuard } from '../core/guards';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard, ProductTypesGuard, ProductsGuard],
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
        path: 'info',
        loadChildren: () =>
          import('./info/info.module').then((m) => m.InfoModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
