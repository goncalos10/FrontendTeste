import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutofuncionarioComponent } from './produtofuncionario.component';

describe('ProdutofuncionarioComponent', () => {
  let component: ProdutofuncionarioComponent;
  let fixture: ComponentFixture<ProdutofuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutofuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutofuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
