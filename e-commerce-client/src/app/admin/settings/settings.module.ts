import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ContactListPageComponent } from './components/contact-list-page/contact-list-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { AboutComponent } from './containers/about/about.component';
import { ContactListComponent } from './containers/contact-list/contact-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ContactListPageComponent,
    AboutPageComponent,
    AboutComponent,
    ContactListComponent,
  ],
  imports: [CommonModule, SettingsRoutingModule, SharedModule],
})
export class SettingsModule {}
