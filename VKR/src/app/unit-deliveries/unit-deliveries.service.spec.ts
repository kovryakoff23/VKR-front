import { TestBed } from '@angular/core/testing';

import { UnitDeliveriesService } from './unit-deliveries.service';

describe('UnitDeliveriesService', () => {
  let service: UnitDeliveriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitDeliveriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
