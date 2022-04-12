import { TestBed } from '@angular/core/testing';

import { UnitProductionPositionService } from './unit-production-position.service';

describe('UnitProductionPositionService', () => {
  let service: UnitProductionPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitProductionPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
