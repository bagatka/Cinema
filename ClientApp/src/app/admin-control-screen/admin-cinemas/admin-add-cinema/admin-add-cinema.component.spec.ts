import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCinemaComponent } from './admin-add-cinema.component';

describe('AdminAddCinemaComponent', () => {
  let component: AdminAddCinemaComponent;
  let fixture: ComponentFixture<AdminAddCinemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddCinemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
