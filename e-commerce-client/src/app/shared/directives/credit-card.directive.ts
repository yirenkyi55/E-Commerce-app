import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  AfterContentInit,
} from '@angular/core';

@Directive({
  selector: '[appCreditCard]',
})
export class CreditCardDirective implements AfterContentInit {
  constructor(private elementRef: ElementRef, private render: Renderer2) {}

  ngAfterContentInit() {
    this.render.setAttribute(
      this.elementRef.nativeElement,
      'placeholder',
      'Enter your 16 digit card number'
    );
  }

  @HostListener('input', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');

    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }

    if (isNaN(+trimmed)) {
      trimmed = trimmed.substr(0, trimmed.length - 1);
    }

    const numbers = [];

    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }

    input.value = numbers.join(' ');
  }
}
