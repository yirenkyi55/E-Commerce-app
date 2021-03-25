import { ProductCartComponent } from './containers/product-cart/product-cart.component';
import { ProductsComponent } from './containers/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './containers/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: ':productId',
    component: ProductDetailComponent,
  },
  {
    path: 'cart',
    component: ProductCartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
