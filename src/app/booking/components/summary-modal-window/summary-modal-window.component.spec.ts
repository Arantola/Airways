import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryModalWindowComponent } from './summary-modal-window.component';

describe('SummaryModalWindowComponent', () => {
  let component: SummaryModalWindowComponent;
  let fixture: ComponentFixture<SummaryModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryModalWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
