import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentPage } from 'src/app/redux/selectors/app.selectors';
import { BOOKING_PAGES } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  currentPage: string = 'main';
  pages = BOOKING_PAGES;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.trackPage();
  }

  private trackPage() {
    this.store.select(selectCurrentPage).subscribe((currentPage) => {
      this.currentPage = currentPage;
    });
  }

  isCurrentStep(step: number) {
    return this.currentPage === this.pages[step];
  }
}
