import { TestBed } from '@angular/core/testing';

import { UnitInfoService } from './unit-info.service';

describe('UnitInfoService', () => {
  let service: UnitInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
