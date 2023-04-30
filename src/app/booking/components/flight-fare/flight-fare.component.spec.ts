import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFareComponent } from './flight-fare.component';

describe('FlightFareComponent', () => {
  let component: FlightFareComponent;
  let fixture: ComponentFixture<FlightFareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightFareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightFareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
