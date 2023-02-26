import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {CategoriaService} from '../categoria.service';
import {ValidationService} from '../../validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Categoria} from '../../_models/categoria'
import {Utilizador} from '../../_models/utilizador';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {UtilizadorService} from '../../utilizadores/utilizador.service';

@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.css']
})
export class EditarCategoriasComponent implements OnInit {

  errorMessage = '';
  editarCategoriasForm!: FormGroup;
  private sub!: Subscription;
  categoria: Categoria;
  error = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pageTitle = '';

  utilizador: Utilizador[] = [];

  displayMessage: { [key: string]: string } = {};

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private utilizadorService: UtilizadorService,
              private categoriaService: CategoriaService,
              private validationService: ValidationService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.editarCategoriasForm = this.fb.group({
      nome: ['', [Validators.required]],
      id_utilizador: ['', [Validators.required]],
    });

    // Read the user Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
        params => {
          const id_categoria = Number(this.route.snapshot.paramMap.get('id_categoria'));
          if (id_categoria !== 0) {
            this.getCategoria(id_categoria);
          } else {
            this.displayCategoria(this.categoria);
          }
        }
    );

    this.sub = this.utilizadorService.getFornecedores().subscribe({
      next: utilizador => {
        this.utilizador = utilizador;
      },
      error: err => {
        if (err.status === 500) {
          this.utilizador = [];
        }
        this.errorMessage = err;
      }
    });
  }

  openSnackBar(msg: string): void {
    this._snackBar.open(msg, '', {
      panelClass: ['red-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }

  getCategoria(id: number): void {
    this.categoriaService.getCategoria(id)
        .subscribe({
          next: categoria => {this.displayCategoria(categoria)},
          error: err => {
            if (err.status === 500) {
              this.router.navigate(['/login']);
            }
            this.errorMessage = err
          }
        });
  }

  displayCategoria(categoria: Categoria): void {
    // clean form states
    if (this.editarCategoriasForm) {
      this.editarCategoriasForm.reset();
    }
    this.categoria = categoria;

    if (this.categoria === undefined) {
      this.pageTitle = 'Adicionar Categoria';
    } else {
      this.pageTitle = `Editar Categoria: ${this.categoria.nome}`;
      // Update the data on the form
      this.editarCategoriasForm.patchValue({
        nome: this.categoria.nome,
        id_utilizador: this.categoria.id_utilizador,
      });
    }
  }

  saveCategoria(): void {
    if (this.editarCategoriasForm.valid) {
      if (this.editarCategoriasForm.dirty) {
        const categoria = { ...this.categoria, ...this.editarCategoriasForm.value };
        const id_categoria = Number(this.route.snapshot.paramMap.get('id'));

        if (id_categoria === 0) {
          this.categoriaService.createCategoria(categoria)
              .subscribe({
                next: () => {
                  this.openSnackBar(`Categoria ${categoria.nome} Adicionada!`);
                  return this.onSaveComplete(categoria.id);
                },
                error: err => this.errorMessage = err
              });
        } else {

          this.categoriaService.updateCategoria(categoria)
              .subscribe({
                next: () => {
                  this.openSnackBar(`Categoria ${categoria.id} Atualizada!`);
                  this.onSaveComplete(this.categoria.id)
                },
                error: err => this.errorMessage = err
              });
        }
      } else {
        this.onSaveComplete(this.categoria.id);
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(id_categoria: number): void {
    // Reset the form to clear the flags
    this.editarCategoriasForm.reset();
    this.router.navigate(['/categorias']);
  }


}
