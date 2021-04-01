import { AdminListComponent } from './containers/admin-list/admin-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCreateComponent } from './containers/admin-create/admin-create.component';

const routes: Routes = [
  { path: '', component: AdminListComponent },
  { path: 'new', component: AdminCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoRoutingModule {}
