import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitEquipmentRentalComponent } from './unit-equipment-rental.component';

describe('UnitEquipmentRentalComponent', () => {
  let component: UnitEquipmentRentalComponent;
  let fixture: ComponentFixture<UnitEquipmentRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitEquipmentRentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitEquipmentRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
