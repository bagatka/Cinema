import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminControlScreenComponent } from './admin-control-screen.component';

describe('AdminControlScreenComponent', () => {
  let component: AdminControlScreenComponent;
  let fixture: ComponentFixture<AdminControlScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminControlScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminControlScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
