import { Directive } from '@angular/core';
import { Input, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appIndicatorColor]'
})
export class IndicatorColorDirective implements AfterViewInit {

  @Input() public numberOfSeats = 0;

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {

    if (this.numberOfSeats < 11) {
      this.el.nativeElement.style.backgroundColor = 'red';
    }

    if (this.numberOfSeats < 95 && this.numberOfSeats > 10) {
      this.el.nativeElement.style.backgroundColor = 'orange';
    }

    if (this.numberOfSeats < 189 && this.numberOfSeats > 94) {
      this.el.nativeElement.style.backgroundColor = 'green';
    }
  }
}
