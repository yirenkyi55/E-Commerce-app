import { FormControl } from '@angular/forms';

export class SecurityCodeFormControl extends FormControl {
  deleted: boolean;

  setValue(value: string, options: any) {
    if (value.match(/[^0-9|\/]/gi)) {
      //Meaning not a number, then we return the current value and perform no update
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }

    if (value.length > 3) {
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }
    super.setValue(value, { ...options, emitModelToViewChange: true });
  }
}
