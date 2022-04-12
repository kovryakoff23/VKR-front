import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitUpkeepComponent } from './unit-upkeep.component';

describe('UnitUpkeepComponent', () => {
  let component: UnitUpkeepComponent;
  let fixture: ComponentFixture<UnitUpkeepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitUpkeepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitUpkeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
