import { TestBed } from '@angular/core/testing';

import { UnitProductionsService } from './unit-productions.service';

describe('UnitProductionsService', () => {
  let service: UnitProductionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitProductionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
