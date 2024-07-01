import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor() { }

  @HostListener('input', ['$event']) 
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    value = value.replace(/[^0-9]/g, '');
    input.value = value;
  }
}
