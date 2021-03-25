import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  @Input() visible = false;
  @Output() cancelled = new EventEmitter<boolean>();
  isLoginForm = true;
  registerText = 'Login';

  constructor() {}

  ngOnInit(): void {}

  onCancelled(event: boolean): void {
    this.cancelled.emit(event);
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
}
