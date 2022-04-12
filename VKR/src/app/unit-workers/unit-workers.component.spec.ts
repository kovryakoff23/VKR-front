import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitWorkersComponent } from './unit-workers.component';

describe('UnitWorkersComponent', () => {
  let component: UnitWorkersComponent;
  let fixture: ComponentFixture<UnitWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitWorkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
