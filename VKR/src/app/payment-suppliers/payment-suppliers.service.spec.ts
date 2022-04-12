import { TestBed } from '@angular/core/testing';

import { PaymentSuppliersService } from './payment-suppliers.service';

describe('PaymentSuppliersService', () => {
  let service: PaymentSuppliersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentSuppliersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
