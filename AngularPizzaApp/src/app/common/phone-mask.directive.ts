import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {

  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let trimmedValue = input.value.replace(/\D/g, '');
    
    if (trimmedValue.length > 10) {
      trimmedValue = trimmedValue.substr(0, 10);
    }
    
    let formattedValue = '';
    
    if (trimmedValue.length > 3) {
      formattedValue = '(' + trimmedValue.substring(0, 3) + ') ';
    }
    
    if (trimmedValue.length > 6) {
      formattedValue += trimmedValue.substring(3, 6) + '-';
    }
    
    formattedValue += trimmedValue.substring(6);
    
    input.value = formattedValue;
  }
}