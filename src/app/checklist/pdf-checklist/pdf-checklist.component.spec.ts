import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfChecklistComponent } from './pdf-checklist.component';

describe('PdfChecklistComponent', () => {
  let component: PdfChecklistComponent;
  let fixture: ComponentFixture<PdfChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
