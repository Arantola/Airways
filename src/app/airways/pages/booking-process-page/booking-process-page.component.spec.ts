import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingProcessPageComponent } from './booking-process-page.component';

describe('BookingProcessPageComponent', () => {
  let component: BookingProcessPageComponent;
  let fixture: ComponentFixture<BookingProcessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingProcessPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingProcessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
