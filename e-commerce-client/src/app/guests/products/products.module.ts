import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import { ProductCartPageComponent } from './components/product-cart-page/product-cart-page.component';
import { ProductCartComponent } from './containers/product-cart/product-cart.component';
import { ProductDetailComponent } from './containers/product-detail/product-detail.component';
import { ProductsComponent } from './containers/products/products.component';

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductDetailPageComponent,
    ProductCartPageComponent,
    ProductCartComponent,
    ProductDetailComponent,
    ProductsComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
