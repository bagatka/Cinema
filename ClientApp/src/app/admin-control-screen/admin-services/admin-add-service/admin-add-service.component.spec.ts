import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminAddServiceComponent} from './admin-add-service.component';

describe('AdminAddServiceComponent', () => {
  let component: AdminAddServiceComponent;
  let fixture: ComponentFixture<AdminAddServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddServiceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
