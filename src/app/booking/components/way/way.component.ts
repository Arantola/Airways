import { Component, Input, OnInit } from '@angular/core';
import { CarouselItem } from '../date-carousel/date-carousel.component';
import { CurrentOrder, Flight } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-way',
  templateUrl: './way.component.html',
  styleUrls: ['./way.component.scss']
})
export class WayComponent {
  @Input() isWayBack = false;

  @Input() tripData?: Flight[];

  @Input() tripBackData?: Flight[];

  @Input() order?: CurrentOrder;

  @Input() orderDate?: Date | string | undefined;

  public selectedItem?: CarouselItem;

  public selectedTicket?: boolean;
}
