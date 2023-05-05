import { Component, Output, EventEmitter, Input, AfterViewInit, OnInit } from '@angular/core';
import { Flight } from 'src/app/shared/interfaces/interfaces';

export interface CarouselItem {
  isSelect: boolean;
  isDisable: boolean;
  date: Date;
  price: number | string;
  seats: number;
  locale: string;
  currency: string;
  wayTo: string;
  wayFrom: string;
  startTime: Date | string | null;
  finishTime: Date | string | null;
  utcTo: number | string;
  utcFrom: number | string;
  wayTime: number | string;
}

enum Animations {
  NONE,
  NEXT,
  PREV,
}

const blankObject: CarouselItem = {
  isSelect: false,
  isDisable: true,
  date: new Date,
  price: '',
  seats: 0,
  locale: 'en',
  currency: '$',
  wayTo: '',
  wayFrom: '',
  startTime: null,
  finishTime: null,
  utcTo: 0,
  utcFrom: 0,
  wayTime: 0,
}

@Component({
  selector: 'app-date-carousel',
  templateUrl: './date-carousel.component.html',
  styleUrls: ['./date-carousel.component.scss']
})
export class DateCarouselComponent implements OnInit {

  public static readonly NUMBER_OF_SLIDES = 5;
  public static readonly NUMBER_OF_DAYS = 7;

  @Output() itemSelected = new EventEmitter<CarouselItem>();
  @Input() selectedTicket?: boolean;
  @Input() orderDate?: string | Date | undefined;

  public animation = Animations.NONE;
  public isAnimationProcess = false;
  public selectedItemIndex = 3;
  public leftItemIndex = 0;
  public displayedItems = this.createDisplayedItems();
  public data: CarouselItem[] = [];

  public get selectedItem() {
    return this.data[this.selectedItemIndex]
  }

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

  @Input() public set tripData(value: Flight[] | undefined) {
    console.log('start set trip data');
    if (value === undefined) {
      return;
    }

    let orderDate = this.orderDate;
    if (orderDate === undefined) {
      return;
    }

    if (typeof orderDate === 'string') {
      orderDate = new Date(orderDate);
    }

    const orderDay = orderDate.getDate();

    const dateArray = [
      new Date(orderDate.setDate(orderDay - 3)),
      new Date(orderDate.setDate(orderDay - 2)),
      new Date(orderDate.setDate(orderDay - 1)),
      new Date(orderDate.setDate(orderDay)),
      new Date(orderDate.setDate(orderDay + 1)),
      new Date(orderDate.setDate(orderDay + 2)),
      new Date(orderDate.setDate(orderDay + 3)),
    ]

    console.log('value', value)

    const activeDates: CarouselItem[] = value.map((item) => ({
      isSelect: false,
      isDisable: false,
      date: new Date(item.date),
      price: item.price,
      seats: item.availableTickets,
      locale: 'en',
      currency: '$',
      wayTo: item.destinationPoint.city,
      wayFrom: item.departurePoint.city,
      startTime: item.startTime,
      finishTime: '12:00',
      utcTo: item.destinationPoint.UTC,
      utcFrom: item.departurePoint.UTC,
      wayTime: item.travelTime,
    }))

    const length = DateCarouselComponent.NUMBER_OF_DAYS - activeDates.length;

    for(let i = 0; i < length; i++) {
      activeDates.push(Object.assign({}, blankObject))
    }

    this.data = activeDates.map((item, index) => {
      item.date = dateArray[index];
      return item;
    })

    console.log('data', this.data)
  }

  public next(): void {
    const itemIndex = this.leftItemIndex + DateCarouselComponent.NUMBER_OF_SLIDES;
    const item = this.data[itemIndex];
    if (item === undefined) {
      return;
    }

    this.displayedItems.push(item);
    this.animation = Animations.NEXT;

    setTimeout(() => {
      this.isAnimationProcess = true;
    });
  }

  public prev(): void {
    const itemIndex = this.leftItemIndex - 1;
    const item = this.data[itemIndex];
    if (item === undefined) {
      return;
    }

    this.displayedItems.unshift(item);
    this.animation = Animations.PREV;

    setTimeout(() => {
      this.isAnimationProcess = true;
    });
  }

  public selectedDate(item: CarouselItem): void {
    if (item.isDisable === true) {
      return;
    }

    this.selectedItemIndex = this.data.indexOf(item);
    this.itemSelected.emit(item);
  }

  public onTransitionEnd(): void {
    if (this.isNextAnimation) {
      this.leftItemIndex++;
    }

    if (this.isPrevAnimation) {
      this.leftItemIndex--;
    }

    this.displayedItems = this.createDisplayedItems();
    this.animation = Animations.NONE;
    this.isAnimationProcess = false;
  }

  public createDisplayedItems(): CarouselItem[] {
    if (this.data === undefined) {
      return [];
    }

    let count = this.data.length - this.leftItemIndex;
    if (count > DateCarouselComponent.NUMBER_OF_SLIDES) {
      count = DateCarouselComponent.NUMBER_OF_SLIDES;
    }
    return this.data.slice(this.leftItemIndex, this.leftItemIndex + count);
  }

  ngOnInit() {
    console.log('start carousel init')
  }
}
