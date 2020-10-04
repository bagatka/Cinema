import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowsComponent } from './admin-shows.component';

describe('AdminShowsComponent', () => {
  let component: AdminShowsComponent;
  let fixture: ComponentFixture<AdminShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
