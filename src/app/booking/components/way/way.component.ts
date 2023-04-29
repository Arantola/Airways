import { Component, Input } from '@angular/core';
import { CarouselItem } from '../date-carousel/date-carousel.component';

@Component({
  selector: 'app-way',
  templateUrl: './way.component.html',
  styleUrls: ['./way.component.scss']
})
export class WayComponent {
  @Input() isWayBack = false;

  public selectedItem?: CarouselItem;

  public selectedTicket?: boolean;
}
