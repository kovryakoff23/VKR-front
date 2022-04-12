import { TestBed } from '@angular/core/testing';

import { SalaryWorkerService } from './salary-worker.service';

describe('SalaryWorkerService', () => {
  let service: SalaryWorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryWorkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
