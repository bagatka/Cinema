import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminAllFilmsComponent} from './admin-all-films.component';

describe('AdminAllFilmsComponent', () => {
  let component: AdminAllFilmsComponent;
  let fixture: ComponentFixture<AdminAllFilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAllFilmsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
