import {TestBed} from '@angular/core/testing';

import {DateTransformService} from './date-transform.service';

describe('DateTransformService', () => {
  let service: DateTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
