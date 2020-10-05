import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallSchemaComponent } from './hall-schema.component';

describe('HallSchemaComponent', () => {
  let component: HallSchemaComponent;
  let fixture: ComponentFixture<HallSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallSchemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HallSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
