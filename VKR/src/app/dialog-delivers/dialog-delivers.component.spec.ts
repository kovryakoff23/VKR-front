import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeliversComponent } from './dialog-delivers.component';

describe('DialogDeliversComponent', () => {
  let component: DialogDeliversComponent;
  let fixture: ComponentFixture<DialogDeliversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeliversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeliversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
