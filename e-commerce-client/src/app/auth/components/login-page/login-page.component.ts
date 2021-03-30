import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestModel } from 'src/app/core/models';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  @Input() isLoading: boolean;

  @Output() register = new EventEmitter<boolean>();
  @Output() loginSubmit = new EventEmitter<LoginRequestModel>();

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginSubmit.emit(this.loginForm.value);
    }
  }

  onRegister(): void {
    this.register.emit(true);
  }
}
