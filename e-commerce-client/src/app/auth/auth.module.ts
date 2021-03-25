import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthFormComponent } from './containers/auth-form/auth-form.component';
import { SharedModule } from '../shared/shared.module';

import { effects, reducers } from './store';
@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent, AuthFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('authState', reducers),
    EffectsModule.forFeature(effects),
  ],
  exports: [AuthFormComponent],
})
export class AuthModule {}
