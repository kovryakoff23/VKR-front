import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWorkerComponent } from './dialog-worker.component';

describe('DialogWorkerComponent', () => {
  let component: DialogWorkerComponent;
  let fixture: ComponentFixture<DialogWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
