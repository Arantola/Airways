import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersInputComponent } from './passengers-input.component';

describe('PassengersComponent', () => {
  let component: PassengersInputComponent;
  let fixture: ComponentFixture<PassengersInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassengersInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PassengersInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
