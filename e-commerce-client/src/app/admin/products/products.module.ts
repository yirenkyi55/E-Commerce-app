import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';
import { ProductCreatePageComponent } from './components/product-create-page/product-create-page.component';
import { ProductInspectPageComponent } from './components/product-inspect-page/product-inspect-page.component';
import { ProductsComponent } from './containers/products/products.component';
import { ProductCreateComponent } from './containers/product-create/product-create.component';
import { ProductInspectComponent } from './containers/product-inspect/product-inspect.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductListPageComponent,
    ProductCreatePageComponent,
    ProductInspectPageComponent,
    ProductsComponent,
    ProductCreateComponent,
    ProductInspectComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
