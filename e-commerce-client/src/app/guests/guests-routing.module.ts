import { ContactComponent } from './containers/contact/contact.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './containers/about/about.component';
import { HomeComponent } from './containers/home/home.component';
import {
  GuestGuard,
  HomePageProductsGuard,
  ProductsGuard,
  ProductTypesGuard,
} from '../core/guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [
      GuestGuard,
      ProductsGuard,
      HomePageProductsGuard,
      ProductTypesGuard,
    ],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
        canActivate: [GuestGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestsRoutingModule {}
