import { ContactComponent } from './containers/contact/contact.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './containers/about/about.component';
import { HomeComponent } from './containers/home/home.component';
import { GuestGuard } from '../core/guards';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
    canActivate: [GuestGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestsRoutingModule {}
