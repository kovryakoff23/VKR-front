import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitProductionPositionComponent } from './unit-production-position.component';

describe('UnitProductionPositionComponent', () => {
  let component: UnitProductionPositionComponent;
  let fixture: ComponentFixture<UnitProductionPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitProductionPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitProductionPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
