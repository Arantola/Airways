import { Directive, OnChanges } from '@angular/core';
import { Input, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appIndicatorColor]'
})
export class IndicatorColorDirective implements OnChanges {

  @Input() public numberOfSeats = 0;

  @Input() public fewSeatsColor = '';

  @Input() public enoughSeatsColor = '';

  @Input() public manySeatsColor = '';

  constructor(private el: ElementRef) { }

  ngOnChanges(): void {

    if (this.numberOfSeats < 11) {
      this.el.nativeElement.style.backgroundColor = this.fewSeatsColor;
    }

    if (this.numberOfSeats < 95 && this.numberOfSeats > 10) {
      this.el.nativeElement.style.backgroundColor = this.enoughSeatsColor;
    }

    if (this.numberOfSeats < 189 && this.numberOfSeats > 94) {
      this.el.nativeElement.style.backgroundColor = this.manySeatsColor;
    }
  }
}
