import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentModalWindowComponent } from './payment-modal-window.component';

describe('PaymentModalWindowComponent', () => {
  let component: PaymentModalWindowComponent;
  let fixture: ComponentFixture<PaymentModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentModalWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
