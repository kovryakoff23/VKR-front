import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveNavigateComponent } from './archive-navigate.component';

describe('ArchiveNavigateComponent', () => {
  let component: ArchiveNavigateComponent;
  let fixture: ComponentFixture<ArchiveNavigateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveNavigateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
