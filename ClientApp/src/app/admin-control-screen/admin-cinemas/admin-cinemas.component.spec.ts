import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCinemasComponent } from './admin-cinemas.component';

describe('AdminCinemasComponent', () => {
  let component: AdminCinemasComponent;
  let fixture: ComponentFixture<AdminCinemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCinemasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCinemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
