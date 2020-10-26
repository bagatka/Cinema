import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditCinemaComponent } from './admin-edit-cinema.component';

describe('AdminEditCinemaComponent', () => {
  let component: AdminEditCinemaComponent;
  let fixture: ComponentFixture<AdminEditCinemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditCinemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
