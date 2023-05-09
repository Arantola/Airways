import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DateCard } from 'src/app/shared/interfaces/interfaces';

enum Animations {
  NONE,
  NEXT,
  PREV,
}

export interface DateCarouselItem {
  date: Date;
  dateCard?: DateCard;
}

@Component({
  selector: 'app-date-carousel',
  templateUrl: './date-carousel.component.html',
  styleUrls: ['./date-carousel.component.scss']
})

export class DateCarouselComponent implements OnChanges {
  @Output() public dateSelected = new EventEmitter<Date>();
  @Input() public activeItems: DateCarouselItem[] = [];
  @Input() public selectedDate = this.today();
  @Input() public isSelectedTicket = false;

  public animation = Animations.NONE;
  public isAnimationProcess = false;
  public displayedItems = this.createDisplayedItems();

  public get isNextAnimation(): boolean {
    return this.animation === Animations.NEXT;
  }

  public get isPrevAnimation(): boolean {
    return this.animation === Animations.PREV;
  }

  public get isNextAnimationProcess(): boolean {
    return this.isNextAnimation && this.isAnimationProcess;
  }

  public get isPrevAnimationProcess(): boolean {
    return this.isPrevAnimation && this.isAnimationProcess;
  }

  public today(): Date {
    const now = new Date();

    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    return date;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { selectedDate, activeItems } = changes;
    if (selectedDate !== undefined || activeItems !== undefined) {
      this.displayedItems = this.createDisplayedItems();
    }
  }

  public next(): void {
    const lastDate = this.displayedItems[this.displayedItems.length - 1].date;
    const nextDate = new Date(lastDate.getTime());
    nextDate.setDate(nextDate.getDate() + 1);

    let item = this.createItemByDate(nextDate);

    this.displayedItems.push(item);
    this.animation = Animations.NEXT;

    setTimeout(() => {
      this.isAnimationProcess = true;
    });
  }

  public prev(): void {
    const firstDate = this.displayedItems[0].date;
    const prevDate = new Date(firstDate.getTime());
    prevDate.setDate(prevDate.getDate() - 1);

    let item = this.createItemByDate(prevDate);

    this.displayedItems.unshift(item);
    this.animation = Animations.PREV;

    setTimeout(() => {
      this.isAnimationProcess = true;
    });
  }

  private createItemByDate(date: Date): DateCarouselItem {
    let item = this.activeItems.find((item) => {
      return item.date.getTime() == date.getTime();
    });
    
    if (item === undefined) {
      item = { date };
    }

    return item;
  }

  public selectItem(item: DateCarouselItem): void {
    if (item.dateCard === undefined) {
      return;
    }

    this.selectedDate = item.date;
    this.dateSelected.emit(item.date);
  }

  public onTransitionEnd(): void {
    if (this.isNextAnimation) {
      this.displayedItems.shift();
    }

    if (this.isPrevAnimation) {
      this.displayedItems.pop();
    }

    this.animation = Animations.NONE;
    this.isAnimationProcess = false;
  }

  public createDisplayedItems(): DateCarouselItem[] {
    let date = new Date(this.selectedDate.getTime());
    date.setDate(date.getDate() - 2);

    const dates = [
      new Date(date.setDate(date.getDate())),
      new Date(date.setDate(date.getDate() + 1)),
      new Date(date.setDate(date.getDate() + 1)),
      new Date(date.setDate(date.getDate() + 1)),
      new Date(date.setDate(date.getDate() + 1)),
    ]

    return dates.map((date) => this.createItemByDate(date));
  }

  public isItemSelected(item: DateCarouselItem): boolean {
    return item.date.getTime() == this.selectedDate.getTime();
  }

  public toDateCard(item: DateCarouselItem): DateCard | undefined {
    return item.dateCard;
  }
}
