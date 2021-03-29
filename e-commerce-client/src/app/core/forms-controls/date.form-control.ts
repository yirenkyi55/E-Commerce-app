import { FormControl } from '@angular/forms';

export class DateFormControl extends FormControl {
  deleted: boolean;

  setValue(value: string, options: any) {
    if (value.match(/[^0-9|\/]/gi)) {
      // Meaning not a number, then we return the current value and perform no update
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }

    if (value.length > 5) {
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }

    if (value.length == 3 && this.value.length === 4) {
      this.deleted = true;
      super.setValue((value as string).substring(0, 2), {
        ...options,
        emitModelToViewChange: true,
      });
      return;
    }

    //emitModelToViewChange will update the input control on the form after the setValue
    if (value.length === 2) {
      super.setValue(value + '/', { ...options, emitModelToViewChange: true });
      return;
    }

    if (value.length == 3 && this.deleted) {
      this.deleted = false;
      super.setValue(
        (value as string).substring(0, 2) +
          '/' +
          (value as string).substring(2),
        { ...options, emitModelToViewChange: true }
      );
      return;
    }
    super.setValue(value, { ...options, emitModelToViewChange: true });
  }
}
