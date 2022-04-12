import { TestBed } from '@angular/core/testing';

import { UnitDeliverService } from './unit-deliver.service';

describe('UnitDeliversService', () => {
  let service: UnitDeliverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitDeliverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
