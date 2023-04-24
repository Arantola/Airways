import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-card',
  templateUrl: './date-card.component.html',
  styleUrls: ['./date-card.component.scss']
})
export class DateCardComponent {
  @Input()
  public isSelect = false;

  @Input()
  public isDisable = false;

  @Input()
  public date = new Date();

  @Input()
  public price = 0;

  @Input()
  public locale = 'en';

  @Input()
  public currency = '$';

  @Input()
  public numberOfSeats = 0;
}
