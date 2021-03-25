import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthFormComponent } from './containers/auth-form/auth-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent, AuthFormComponent],
  imports: [CommonModule, SharedModule],
  exports: [AuthFormComponent],
})
export class AuthModule {}
