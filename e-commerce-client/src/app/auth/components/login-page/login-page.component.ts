import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  @Output() register = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      emailAddress: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.loginForm);
  }

  onRegister(): void {
    this.register.emit(true);
  }
}
