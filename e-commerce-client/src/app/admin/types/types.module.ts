import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypesRoutingModule } from './types-routing.module';
import { TypeListPageComponent } from './components/type-list-page/type-list-page.component';
import { TypeInspectPageComponent } from './components/type-inspect-page/type-inspect-page.component';
import { TypeCreatePageComponent } from './components/type-create-page/type-create-page.component';
import { TypeListComponent } from './containers/type-list/type-list.component';
import { TypeCreateComponent } from './containers/type-create/type-create.component';
import { TypeInspectComponent } from './containers/type-inspect/type-inspect.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrandItemComponent } from './components/brand-item/brand-item.component';

@NgModule({
  declarations: [
    TypeListPageComponent,
    TypeInspectPageComponent,
    TypeCreatePageComponent,
    TypeListComponent,
    TypeCreateComponent,
    TypeInspectComponent,
    BrandItemComponent,
  ],
  imports: [CommonModule, TypesRoutingModule, SharedModule],
})
export class TypesModule {}
