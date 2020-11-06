import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserControlScreenComponent} from './user-control-screen.component';

describe('UserControlScreenComponent', () => {
  let component: UserControlScreenComponent;
  let fixture: ComponentFixture<UserControlScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserControlScreenComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserControlScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
