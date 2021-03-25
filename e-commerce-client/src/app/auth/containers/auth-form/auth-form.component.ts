import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginRequestModel } from 'src/app/core/models';
import * as fromStore from 'src/app/auth/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  @Input() visible = false;
  @Output() cancelled = new EventEmitter<boolean>();

  isLoading$: Observable<boolean>;
  isLoginForm = true;
  registerText = 'Login';
  okClicked = false;

  constructor(private store: Store<fromStore.AuthenticationState>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromStore.getAuthLoading);
  }

  onCancelled(event: boolean): void {
    this.cancelled.emit(event);
    this.store.dispatch(fromStore.AuthenticateRequest({ value: false }));
  }

  get loginTitle(): string {
    return this.isLoginForm ? 'Login' : 'Register';
  }

  onRegister(): void {
    this.isLoginForm = false;
    this.registerText = 'Register';
  }

  onLogin(): void {
    this.isLoginForm = true;
    this.registerText = 'Login';
  }

  onLoginSubmit(requestModel: LoginRequestModel): void {
    this.store.dispatch(fromStore.LoginRequest(requestModel));
  }
}
