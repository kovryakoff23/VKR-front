import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryWorkerComponent } from './salary-worker.component';

describe('SalaryWorkerComponent', () => {
  let component: SalaryWorkerComponent;
  let fixture: ComponentFixture<SalaryWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
