import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './containers/about/about.component';
import { ContactListComponent } from './containers/contact-list/contact-list.component';

const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
