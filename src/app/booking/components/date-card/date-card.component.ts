import { Component, Input } from '@angular/core';

export interface DateCard {
  date: Date;
  price: number;
  locale: string;
  currency: string;
  seats: number;
}

@Component({
  selector: 'app-date-card',
  templateUrl: './date-card.component.html',
  styleUrls: ['./date-card.component.scss']
})
export class DateCardComponent {
  @Input() public date = new Date();
  @Input() public isSelected = false;
  @Input() public dateCard?: DateCard;

  get isDisabled(): boolean {
    return this.dateCard === undefined;
  }

  get seats(): number {
    return this.dateCard?.seats ?? 0;
  }
}
