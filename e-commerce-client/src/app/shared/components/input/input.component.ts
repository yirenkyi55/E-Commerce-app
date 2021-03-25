import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Self,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, ControlValueAccessor, OnChanges {
  @ViewChild('input', { static: true }) input: ElementRef; // Holds a reference of the control in the DOM
  @Input() type = 'text'; // The type for the input control, defaults to text
  @Input() label = 'Input Field'; // A label for the input control if any
  @Input() placeholder: string; // A placeholder for the input control if any
  @Input() includeValidation = true; // indicates whether we want to include validation tracking in a component or not
  @Input() patternMessage = 'Invalid Input';
  @Input() setFocus = false;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { setFocus } = changes;
    if (setFocus && setFocus.currentValue) {
      this.input.nativeElement.focus();
    }
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    const asyncValidators = control.asyncValidator
      ? [control.asyncValidator]
      : [];

    // Set all validators for the control
    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);
    control.updateValueAndValidity();
  }

  get validationIconStatus() {
    if (!this.includeValidation) {
      return '';
    }
    if (this.isInValidState) {
      return 'error';
    } else if (this.pendingStatus) {
      return 'validating';
    } else if (this.controlDir.control?.valid) {
      return 'success';
    }

    return '';
  }

  // Determines whether the control is busy performing server validation
  get pendingStatus() {
    return this.controlDir.control?.status === 'PENDING';
  }

  // Determine whether the state of the control is not valid
  get isInValidState() {
    return (
      this.required ||
      this.inValidPattern ||
      this.notValidEmail ||
      this.minLength ||
      this.notValidUsername
    );
  }

  // Determines whether the input value is not a valid email address
  get notValidEmail() {
    return this.controlDir.control?.errors?.emailExists;
  }

  // Determines whether the input value is not a valid email address
  get notValidUsername() {
    return this.controlDir.control?.errors?.usernameExists;
  }

  // Determines whether the control is not valid and has been touched at the same time
  get notValidAndTouched() {
    return this.controlDir.control?.invalid && this.controlDir.control.touched;
  }

  get minLength() {
    return (
      this.notValidAndTouched && this.controlDir.control?.errors?.minlength
    );
  }

  get requiredLengthFromMinLength() {
    return this.controlDir.control?.errors?.minlength?.requiredLength;
  }

  // Determines whether the control input is required
  get required() {
    return this.notValidAndTouched && this.controlDir.control?.errors?.required;
  }

  // Determines whether the control pattern is not satisfied
  get inValidPattern() {
    return this.notValidAndTouched && this.controlDir.control?.errors?.pattern;
  }

  onChange(event) {}
  onTouched() {}

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
