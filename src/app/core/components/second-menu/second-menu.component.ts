import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  selectCurrentOrder,
  selectCurrentPage,
} from 'src/app/redux/selectors/app.selectors';
import { BOOKING_PAGES } from 'src/app/shared/constants/constants';
import { CurrentOrder } from 'src/app/shared/interfaces/interfaces';
import { IconService } from 'src/app/shared/services/icon.service';

@Component({
  selector: 'app-second-menu',
  templateUrl: './second-menu.component.html',
  styleUrls: ['./second-menu.component.scss'],
})
export class SecondMenuComponent implements OnInit, OnDestroy {
  private subscriptionCurrentOrder!: Subscription;
  private subscriptionCurrentPage!: Subscription;

  currentPage: string = 'main';
  pages = BOOKING_PAGES;
  isEditMode: boolean = false;
  currentOrder!: CurrentOrder;

  constructor(private store: Store, private iconService: IconService) {
    this.iconService.addPath('account', 'assets/icons/account.svg');
    this.iconService.addPath('return_trip', 'assets/icons/return_trip.svg');
  }

  ngOnInit(): void {
    this.trackPage();
    this.subscribeToCurrentOrder();
  }

  ngOnDestroy(): void {
    this.subscriptionCurrentOrder.unsubscribe();
    this.subscriptionCurrentPage.unsubscribe();
  }

  private trackPage() {
    this.subscriptionCurrentPage = this.store
      .select(selectCurrentPage)
      .subscribe((currentPage) => {
        this.currentPage = currentPage;
      });
  }

  private subscribeToCurrentOrder() {
    this.subscriptionCurrentOrder = this.store
      .select(selectCurrentOrder)
      .subscribe((currentOrder) => {
        this.currentOrder = currentOrder;
      });
  }

  get passengersCount() {
    return Object.values(this.currentOrder.passengersCompound).reduce(
      (acc, value) => acc + value
    );
  }

  onToggleEdit() {
    this.isEditMode = !this.isEditMode;
  }
}
