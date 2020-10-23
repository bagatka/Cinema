import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditFimComponent } from './admin-edit-fim.component';

describe('AdminEditFimComponent', () => {
  let component: AdminEditFimComponent;
  let fixture: ComponentFixture<AdminEditFimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditFimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditFimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
