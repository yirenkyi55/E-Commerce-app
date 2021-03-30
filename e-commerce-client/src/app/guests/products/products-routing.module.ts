import { ProductCartComponent } from './containers/product-cart/product-cart.component';
import { ProductsComponent } from './containers/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './containers/product-detail/product-detail.component';
import { ProductCheckoutComponent } from './containers/product-checkout/product-checkout.component';
import { AuthGuard } from 'src/app/core/guards';
import { ProductShopSuccessComponent } from './containers/product-shop-success/product-shop-success.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'cart',
    component: ProductCartComponent,
  },
  {
    path: 'checkout',
    component: ProductCheckoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'success',
    component: ProductShopSuccessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':productId',
    component: ProductDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
