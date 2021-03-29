import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSecurityCode]',
})
export class SecurityCodeDirective {
  constructor() {}

  @HostListener('input', ['$event'])
  onKeyUp() {
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');

    if (trimmed.length > 3) {
      trimmed = trimmed.substr(0, 3);
    }

    if (isNaN(+trimmed)) {
      trimmed = trimmed.substr(0, trimmed.length - 1);
    }

    input.value = trimmed;
  }
}
