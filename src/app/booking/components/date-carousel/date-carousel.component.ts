import { Component } from '@angular/core';

interface DateCarouselItem {
  isSelect: boolean;
  isDisable: boolean;
  date: Date;
  price: number;
  seats: number;
  locale: string;
  currency: string;
}

const data: DateCarouselItem[] = [
  {
    isSelect: false,
    isDisable: false,
    date: new Date("03.04.2023"),
    price: 130,
    seats: 188,
    locale: 'en',
    currency: '$',
  },
  {
    isSelect: false,
    isDisable: true,
    date: new Date("03.05.2023"),
    price: 120,
    seats: 60,
    locale: 'en',
    currency: '$',
  },
  {
    isSelect: false,
    isDisable: false,
    date: new Date("03.06.2023"),
    price: 90,
    seats: 6,
    locale: 'en',
    currency: '$',
  },
  {
    isSelect: false,
    isDisable: false,
    date: new Date("03.07.2023"),
    price: 160,
    seats: 60,
    locale: 'en',
    currency: '$',
  },
  {
    isSelect: false,
    isDisable: false,
    date: new Date("03.08.2023"),
    price: 110,
    seats: 100,
    locale: 'en',
    currency: '$',
  },
  {
    isSelect: false,
    isDisable: true,
    date: new Date("03.09.2023"),
    price: 130,
    seats: 8,
    locale: 'en',
    currency: '$',
  },
  {
    isSelect: false,
    isDisable: false,
    date: new Date("03.10.2023"),
    price: 160,
    seats: 8,
    locale: 'en',
    currency: '$',
  }
]

interface CarouselItem {
  isSelect: boolean;
  isDisable: boolean;
  date: Date;
  price: number;
  seats: number;
  locale: string;
  currency: string;
}

enum Animations {
  NONE,
  NEXT,
  PREV,
}

@Component({
  selector: 'app-date-carousel',
  templateUrl: './date-carousel.component.html',
  styleUrls: ['./date-carousel.component.scss']
})
export class DateCarouselComponent {
  public static readonly NUMBER_OF_SLIDES = 5;

  public animation = Animations.NONE;

  public isAnimationProcess = false;

  public selectedItemIndex = 3;

  public leftItemIndex = 0;

  public displayedItems = this.createDisplayedItems();

  public get selectedItem() {
    return data[this.selectedItemIndex]
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

  public next(): void {
    const itemIndex = this.leftItemIndex + DateCarouselComponent.NUMBER_OF_SLIDES;
    const item = data[itemIndex];
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
    const item = data[itemIndex];
    if (item === undefined) {
      return;
    }

    this.displayedItems.unshift(item);
    this.animation = Animations.PREV;

    setTimeout(() => {
      this.isAnimationProcess = true;
    });
  }

  selectedDate(item: DateCarouselItem) {
    if (item.isDisable === true) {
      return;
    }

    this.selectedItemIndex = data.indexOf(item);
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
    let count = data.length - this.leftItemIndex;
    if (count > DateCarouselComponent.NUMBER_OF_SLIDES) {
      count = DateCarouselComponent.NUMBER_OF_SLIDES;
    }

    return data.slice(this.leftItemIndex, this.leftItemIndex + count);
  }
}
