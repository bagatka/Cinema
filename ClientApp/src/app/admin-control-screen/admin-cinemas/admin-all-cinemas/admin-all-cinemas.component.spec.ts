import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminAllCinemasComponent} from './admin-all-cinemas.component';

describe('AdminAllCinemasComponent', () => {
  let component: AdminAllCinemasComponent;
  let fixture: ComponentFixture<AdminAllCinemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAllCinemasComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllCinemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
