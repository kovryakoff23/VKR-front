import { TestBed } from '@angular/core/testing';

import { UnitEquipmentRentalService } from './unit-equipment-rental.service';

describe('UnitEquipmentRentalService', () => {
  let service: UnitEquipmentRentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitEquipmentRentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
