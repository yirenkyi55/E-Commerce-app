import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateAdminModel } from 'src/app/core/models';
import { AuthService } from 'src/app/auth/services';
import { AuthValidator } from 'src/app/core/validators';

@Component({
  selector: 'app-admin-create-page',
  templateUrl: './admin-create-page.component.html',
  styleUrls: ['./admin-create-page.component.scss'],
})
export class AdminCreatePageComponent implements OnInit, OnChanges {
  registerForm: FormGroup;
  @Output() createAdmin = new EventEmitter<CreateAdminModel>();
  @Input() loading: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService) {}
  ngOnChanges(changes: SimpleChanges): void {
    const { loading, productType } = changes;

    if (loading && loading.previousValue && !loading.currentValue) {
      // We Reset the form if saving was successful
      this.reset();
    }
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
          ],
          [AuthValidator.validateEmail(this.authService)],
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

  checkPasswords(group: FormGroup): { notEqual: boolean | null } {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notEqual: true };
  }

  reset(): void {
    this.registerForm.reset();
  }

  onCreateAdmin(): void {
    this.createAdmin.emit(this.registerForm.value);
  }
}
