import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModalWindowComponent } from './main-modal-window.component';

describe('MainModalWindowComponent', () => {
  let component: MainModalWindowComponent;
  let fixture: ComponentFixture<MainModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainModalWindowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
