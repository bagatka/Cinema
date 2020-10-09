import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminAddShowComponent} from './admin-add-show.component';

describe('AdminAddShowComponent', () => {
  let component: AdminAddShowComponent;
  let fixture: ComponentFixture<AdminAddShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddShowComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
