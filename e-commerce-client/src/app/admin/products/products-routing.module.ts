import { ProductInspectComponent } from './containers/product-inspect/product-inspect.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './containers/product-create/product-create.component';

import { ProductsComponent } from './containers/products/products.component';
const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'new/:productId', component: ProductCreateComponent },
  { path: ':productId/inspect', component: ProductInspectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
