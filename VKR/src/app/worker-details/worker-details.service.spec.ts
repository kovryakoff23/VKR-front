import { TestBed } from '@angular/core/testing';

import { WorkerDetailsService } from './worker-details.service';

describe('WorkerDetailsService', () => {
  let service: WorkerDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
