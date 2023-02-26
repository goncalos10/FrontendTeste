import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Categoria} from 'app/_models/categoria';
import {FuncionarioService} from '../funcionario.service';
import {Subcategoria} from '../../_models/subcategoria';

@Component({
  selector: 'app-categoriafuncionario',
  templateUrl: './categoriafuncionario.component.html',
  styleUrls: ['./categoriafuncionario.component.css']
})
export class CategoriafuncionarioComponent implements OnInit {

  subscription!: Subscription;
  errorMessage = '';
  categorias: Categoria[] = [];

  constructor(private funcionarioService: FuncionarioService,
              public dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id_cliente = Number(this.route.snapshot.paramMap.get('id_cliente'));
    this.subscription = this.funcionarioService.getCategorias(id_cliente).subscribe({
    next: categorias => {
      this.categorias = categorias;
    },
    error: err => {
      if (err.status === 500) {
        this.categorias = [];
      }
      this.errorMessage = err;
    }
  });
  }

}
