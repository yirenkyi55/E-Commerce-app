import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { AdminListPageComponent } from './components/admin-list-page/admin-list-page.component';
import { AdminCreatePageComponent } from './components/admin-create-page/admin-create-page.component';
import { AdminListComponent } from './containers/admin-list/admin-list.component';
import { AdminCreateComponent } from './containers/admin-create/admin-create.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AdminListPageComponent,
    AdminCreatePageComponent,
    AdminListComponent,
    AdminCreateComponent,
  ],
  imports: [CommonModule, InfoRoutingModule, SharedModule],
})
export class InfoModule {}
