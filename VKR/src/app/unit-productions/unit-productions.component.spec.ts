import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitProductionsComponent } from './unit-productions.component';

describe('UnitProductionsComponent', () => {
  let component: UnitProductionsComponent;
  let fixture: ComponentFixture<UnitProductionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitProductionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitProductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
