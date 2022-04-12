import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDeliveriesComponent } from './unit-deliveries.component';

describe('UnitDeliveriesComponent', () => {
  let component: UnitDeliveriesComponent;
  let fixture: ComponentFixture<UnitDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitDeliveriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
