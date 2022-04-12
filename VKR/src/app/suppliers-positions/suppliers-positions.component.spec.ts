import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersPositionsComponent } from './suppliers-positions.component';

describe('SyppliersPositionsComponent', () => {
  let component: SuppliersPositionsComponent;
  let fixture: ComponentFixture<SuppliersPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersPositionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
