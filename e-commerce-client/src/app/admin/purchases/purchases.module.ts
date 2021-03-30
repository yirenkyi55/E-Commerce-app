import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesListPageComponent } from './components/purchases-list-page/purchases-list-page.component';
import { PurchasesInspectPageComponent } from './components/purchases-inspect-page/purchases-inspect-page.component';
import { PurchasesListComponent } from './containers/purchases-list/purchases-list.component';
import { PurchasesInspectComponent } from './containers/purchases-inspect/purchases-inspect.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PurchasesListPageComponent,
    PurchasesInspectPageComponent,
    PurchasesListComponent,
    PurchasesInspectComponent,
  ],
  imports: [CommonModule, PurchasesRoutingModule, SharedModule],
})
export class PurchasesModule {}
