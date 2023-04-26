import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSelectionPageComponent } from './flight-selection-page.component';

describe('FlightSelectionPageComponent', () => {
  let component: FlightSelectionPageComponent;
  let fixture: ComponentFixture<FlightSelectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightSelectionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightSelectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
