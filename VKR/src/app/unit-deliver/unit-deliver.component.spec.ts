import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDeliverComponent } from './unit-deliver.component';

describe('UnitDeliverComponent', () => {
  let component: UnitDeliverComponent;
  let fixture: ComponentFixture<UnitDeliverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitDeliverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDeliverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
