import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentPage } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
})
export class PageContainerComponent implements OnInit {
  currentPage: string = 'main';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.trackPage();
  }

  private trackPage() {
    this.store.select(selectCurrentPage).subscribe((currentPage) => {
      this.currentPage = currentPage;
    });
  }

  get isMainPage() {
    return this.currentPage === 'main';
  }

  get isSecondMenuOn() {
    return (
      !this.isMainPage &&
      this.currentPage !== 'admin' &&
      this.currentPage !== 'shopping-cart' &&
      this.currentPage !== 'account'
    );
  }
}
