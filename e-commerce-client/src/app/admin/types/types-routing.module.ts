import { TypeInspectComponent } from './containers/type-inspect/type-inspect.component';
import { TypeCreateComponent } from './containers/type-create/type-create.component';
import { TypeListComponent } from './containers/type-list/type-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TypeListComponent },
  { path: 'new', component: TypeCreateComponent },
  { path: ':typeId/inspect', component: TypeInspectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypesRoutingModule {}
