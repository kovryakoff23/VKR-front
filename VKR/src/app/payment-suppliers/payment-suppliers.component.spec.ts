import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuppliersComponent } from './payment-suppliers.component';

describe('PaymentSuppliersComponent', () => {
  let component: PaymentSuppliersComponent;
  let fixture: ComponentFixture<PaymentSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentSuppliersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
