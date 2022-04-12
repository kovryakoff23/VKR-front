import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDeliverAddComponent } from './unit-deliver-add.component';

describe('UnitDeliverAddComponent', () => {
  let component: UnitDeliverAddComponent;
  let fixture: ComponentFixture<UnitDeliverAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitDeliverAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDeliverAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
