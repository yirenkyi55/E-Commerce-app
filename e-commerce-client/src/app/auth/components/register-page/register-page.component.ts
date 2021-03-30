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
    this.registerForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
          ],
        ],
        firstName: ['', [Validators.required]],
        otherName: [''],
        lastName: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/((?=.*\d)(?=.*[A-Z]))/),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.checkPasswords }
    );
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.createAccount.emit(this.registerForm.value);
  }

  onLogin(): void {
    this.login.emit(true);
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notEqual: true };
  }
}
