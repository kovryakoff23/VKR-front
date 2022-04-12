import { TestBed } from '@angular/core/testing';

import { SuppliersPositionsService } from './suppliers-positions.service';

describe('SuppliersPositionsService', () => {
  let service: SuppliersPositionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuppliersPositionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
