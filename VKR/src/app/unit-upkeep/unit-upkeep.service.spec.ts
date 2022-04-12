import { TestBed } from '@angular/core/testing';

import { UnitUpkeepService } from './unit-upkeep.service';

describe('UnitUpkeepService', () => {
  let service: UnitUpkeepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitUpkeepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
