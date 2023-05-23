import { CurrencyService } from 'src/app/shared/services/currency.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppSettings, Flight, saveTicketData } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, OnDestroy {
  @Input() public isWayBack = false;
  @Input() public flight?: Flight;
  @Input() public currency = 'EUR';
  @Input() selected = false;
  @Input() public settings$!: Observable<AppSettings>;

  @Output() public ticketSelected = new EventEmitter<boolean>();
  @Output() public onSaveTicket = new EventEmitter<saveTicketData>();
  @Output() public onDeleteTicket = new EventEmitter<boolean>();

  public price!: number;
  private settingsSubscription?: Subscription;
  public disable = false;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.disable = this.isDisableDate();
    this.settingsSubscription = this.settings$.subscribe(
      (settings) => {
        this.currency = settings.currency;
        this.price = this.currencyService.calculateCurrencyValue(<number>this.flight?.price, this.currency);
      }
    )
  }

  public deleteTicket() {
    if (this.flight === undefined) {
      return
    }
    this.onDeleteTicket.emit(this.isWayBack)
    this.ticketSelected.emit(false);
  }

  public saveTicket() {
    if (this.flight === undefined) {
      return
    }
    this.onSaveTicket.emit({
      flight: this.flight,
      isWayBack: this.isWayBack,
      finishTime: this.finishTime
    })
    this.ticketSelected.emit(true);
  }

  public isDisableDate(): boolean {
    if (this.flight && (new Date(this.flight.date).getTime() - Date.now() < 0)) {
      return true;
    }
    return false
  }

  get finishTime(): string {
    if (this.flight === undefined) {
      return '00:00'
    }
    let startDateTime = new Date(`${this.flight.date} ${this.flight.startTime}`)
    const [hours, minutes] = this.flight.travelTime.split(':').map((item) => Number(item));
    const finishTime = new Date(startDateTime.getTime());
    finishTime.setHours(startDateTime.getHours() + hours, startDateTime.getMinutes() + minutes);

    const hoursFinishTime =
    finishTime.getHours() < 10 ? `0${finishTime.getHours()}:`:`${finishTime.getHours()}:`;
    const minutesFinishTime =
    finishTime.getMinutes() < 10 ? `0${finishTime.getMinutes()}`:`${finishTime.getMinutes()}`;
    const finishTimeString = hoursFinishTime + minutesFinishTime;

    return finishTimeString;
  }

  get travelHours() {
    return this.flight?.travelTime.split(':')[0];
  }

  get travelMinutes() {
    return this.flight?.travelTime.split(':')[1];
  }

  ngOnDestroy() {
    this.settingsSubscription?.unsubscribe();
  }
}
