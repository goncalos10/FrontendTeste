import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarChecklistComponent } from './listar-checklist.component';

describe('ListarChecklistComponent', () => {
  let component: ListarChecklistComponent;
  let fixture: ComponentFixture<ListarChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
