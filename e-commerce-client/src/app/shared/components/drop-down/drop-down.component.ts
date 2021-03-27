import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Self,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DropDownOptions } from 'src/app/core/models';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements OnInit, ControlValueAccessor {
  @ViewChild('dropdown', { static: true }) input: ElementRef;
  @Input() label = 'Field';
  @Input() placeholder: string;
  @Input() options: DropDownOptions[] = [];
  @Output() dropDownChange = new EventEmitter<{ value: any }>();

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    const asyncValidators = control.asyncValidator
      ? [control.asyncValidator]
      : [];
    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);
    control.updateValueAndValidity();
  }

  onChange(event) {}

  onTouched() {}

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onDropDownChange(event: any): void {
    this.dropDownChange.emit({ value: event?.target?.value });
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
