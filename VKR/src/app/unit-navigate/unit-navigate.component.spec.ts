import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitNavigateComponent } from './unit-navigate.component';

describe('UnitNavigateComponent', () => {
  let component: UnitNavigateComponent;
  let fixture: ComponentFixture<UnitNavigateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitNavigateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
