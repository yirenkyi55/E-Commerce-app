import { FormControl } from '@angular/forms';

export class CreditCardFormControl extends FormControl {
  deleted: boolean;

  setValue(value: string, options: any) {
    value = value.replace(/\-+/g, '');

    if (value.match(/[^0-9|\/]/gi)) {
      // Meaning not a number, then we return the current value and perform no update
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }

    if (value.length > 16) {
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }

    let numbers = [];

    for (let i = 0; i < value.length; i += 4) {
      numbers.push((value as string).substr(i, 4));
    }

    value = numbers.join('-');

    super.setValue(value, { ...options, emitModelToViewChange: true });
  }
}
