import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import {RemoverCategoriaDialog} from '../remover-dialog';
import { Categoria } from 'app/_models/categoria';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  subscription!: Subscription;
  errorMessage = '';
  categorias: Categoria[] = []

  constructor(private categoriaService: CategoriaService, public dialog: MatDialog) { }

  ngOnInit(): void {
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

  openDialog(id: number): void {

    const dialogRef = this.dialog.open(RemoverCategoriaDialog, {
      width: '20%',
      data: {id_categoria: id}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
