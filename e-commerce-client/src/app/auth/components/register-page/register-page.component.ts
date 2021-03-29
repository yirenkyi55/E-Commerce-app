import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateAccountRequestModel } from 'src/app/core/models';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  @Input() loading: boolean;

  registerForm: FormGroup;
  @Output() login = new EventEmitter<boolean>();
  @Output() createAccount = new EventEmitter<CreateAccountRequestModel>();

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      otherName: [''],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.createAccount.emit(this.registerForm.value);
  }

  onLogin(): void {
    this.login.emit(true);
  }
}
