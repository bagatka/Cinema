import { TestBed } from '@angular/core/testing';

import { HallServiceService } from './hall-service.service';

describe('HallServiceService', () => {
  let service: HallServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HallServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
