import { Component, Input } from '@angular/core';
import { CarouselItem } from '../date-carousel/date-carousel.component';

@Component({
  selector: 'app-date-card',
  templateUrl: './date-card.component.html',
  styleUrls: ['./date-card.component.scss']
})
export class DateCardComponent {
  @Input()
  public isSelect = false;

  @Input()
  public flight?: CarouselItem;
}
