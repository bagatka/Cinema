import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HallFreeSeatsBarComponent} from './hall-free-seats-bar.component';

describe('HallFreeSeatsBarComponent', () => {
  let component: HallFreeSeatsBarComponent;
  let fixture: ComponentFixture<HallFreeSeatsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HallFreeSeatsBarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HallFreeSeatsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
