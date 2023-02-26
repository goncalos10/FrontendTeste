import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import {ActivatedRoute, Router} from '@angular/router';
import {RemoverSubcategoriaDialog} from '../remover-dialog';
import {Subcategoria} from 'app/_models/subcategoria';
import {Categoria} from 'app/_models/categoria';
import { SubcategoriasService } from '../subcategorias.service';
import {CategoriaService} from '../../categorias/categoria.service';


@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css']
})
export class SubcategoriasComponent implements OnInit {

  subscription!: Subscription;
  errorMessage = '';
  subcategorias: Subcategoria[] = []
  categorias: Categoria[] = []

  constructor(private subcategoriaService: SubcategoriasService,
              private categoriaService: CategoriaService,
              public dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.subcategoriaService.getSubcategorias().subscribe({
      next: subcategorias => {
        this.subcategorias = subcategorias;
      },
      error: err => {
        if (err.status === 500) {
          this.subcategorias = [];
        }
        this.errorMessage = err;
      }
    });

    this.subscription = this.categoriaService.getCategorias().subscribe({
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

  /*openDialog(id: number): void {

    const dialogRef = this.dialog.open(RemoverCategoriaDialog, {
      width: '20%',
      data: {id_subcategoria: id}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }*/

}
