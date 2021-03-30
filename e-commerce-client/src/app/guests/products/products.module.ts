import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import { ProductCartPageComponent } from './components/product-cart-page/product-cart-page.component';
import { ProductCartComponent } from './containers/product-cart/product-cart.component';
import { ProductDetailComponent } from './containers/product-detail/product-detail.component';
import { ProductsComponent } from './containers/products/products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCartItemComponent } from './components/product-cart-item/product-cart-item.component';
import { ProductCheckoutPageComponent } from './components/product-checkout-page/product-checkout-page.component';
import { ProductCheckoutComponent } from './containers/product-checkout/product-checkout.component';
import { ProductShopSuccessPageComponent } from './components/product-shop-success-page/product-shop-success-page.component';
import { ProductShopSuccessComponent } from './containers/product-shop-success/product-shop-success.component';

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductDetailPageComponent,
    ProductCartPageComponent,
    ProductCartComponent,
    ProductDetailComponent,
    ProductsComponent,
    ProductItemComponent,
    ProductCartItemComponent,
    ProductCheckoutPageComponent,
    ProductCheckoutComponent,
    ProductShopSuccessPageComponent,
    ProductShopSuccessComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
