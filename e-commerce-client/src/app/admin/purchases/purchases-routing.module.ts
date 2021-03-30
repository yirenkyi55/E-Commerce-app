import { PurchasesInspectComponent } from './containers/purchases-inspect/purchases-inspect.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasesListComponent } from './containers/purchases-list/purchases-list.component';

const routes: Routes = [
  { path: '', component: PurchasesListComponent },
  { path: ':purchaseId/inspect', component: PurchasesInspectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchasesRoutingModule {}
