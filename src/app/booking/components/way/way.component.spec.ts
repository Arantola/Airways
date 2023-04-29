import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WayComponent } from './way.component';

describe('WayComponent', () => {
  let component: WayComponent;
  let fixture: ComponentFixture<WayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
