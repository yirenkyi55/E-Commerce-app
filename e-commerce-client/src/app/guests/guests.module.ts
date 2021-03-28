import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestsRoutingModule } from './guests-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { HomeComponent } from './containers/home/home.component';
import { AboutComponent } from './containers/about/about.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ContactComponent } from './containers/contact/contact.component';
import { SharedModule } from '../shared/shared.module';

import { reducers } from './store';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ContactPageComponent,
  ],
  imports: [
    CommonModule,
    GuestsRoutingModule,
    SharedModule,
    StoreModule.forFeature('guestState', reducers),
  ],
})
export class GuestsModule {}
