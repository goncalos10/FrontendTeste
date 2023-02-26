import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {SubcategoriasService} from '../subcategorias.service';
import {ValidationService} from '../../validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subcategoria} from '../../_models/subcategoria'
import {Categoria} from '../../_models/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import {UtilizadorService} from '../../utilizadores/utilizador.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {Utilizador} from '../../_models/utilizador';
import {Response} from '../../_models/response';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-editar-subcategorias',
  templateUrl: './editar-subcategorias.component.html',
  styleUrls: ['./editar-subcategorias.component.css']
})
export class EditarSubcategoriasComponent implements OnInit {

  errorMessage = '';
  editarSubcategoriasForm!: FormGroup;
  private sub!: Subscription;
  subscription!: Subscription;
  subcategoria: Subcategoria;
  error = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pageTitle = '';

  categorias: Categoria[] = [];
  clientes: Utilizador[] = [];
  TesteCliente: number;

  displayMessage: { [key: string]: string } = {};

  public categoriaResponse: Observable<Categoria[]>

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private subcategoriaService: SubcategoriasService,
              private categoriaService: CategoriaService,
              private utilizadorService: UtilizadorService,
              private validationService: ValidationService,
              private _snackBar: MatSnackBar,
              private http: HttpClient) { }


  ngOnInit(): void {

    this.editarSubcategoriasForm = this.fb.group({
      nome: ['', [Validators.required]],
      id_categoria: ['', [Validators.required]],
      id_cliente: ['', [Validators.required]],
    });

    // Read the user Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
        params => {
          const id_subcategoria = Number(this.route.snapshot.paramMap.get('id'));
          if (id_subcategoria !== 0) {
            this.getSubcategoria(id_subcategoria);
          } else {
            this.displaySubcategoria(this.subcategoria);
          }
        }
    );

    this.subscription = this.utilizadorService.getFornecedores().subscribe({
      next: clientes => {
        this.clientes = clientes;
      },
      error: err => {
        if (err.status === 500) {
          this.clientes = [];
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

  onChangeUser(id_cliente: string) {

    this.categoriaService.getCategoriasCliente(Number(id_cliente)).subscribe({
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

  getSubcategoria(id_subcategoria: number): void {
    this.subcategoriaService.getSubcategoria(id_subcategoria)
        .subscribe({
          next: subcategoria => {this.displaySubcategoria(subcategoria)},
          error: err => {
            if (err.status === 500) {
              this.router.navigate(['/login']);
            }
            this.errorMessage = err
          }
        });
  }
    displaySubcategoria(subcategoria: Subcategoria): void {
    // clean form states
    if (this.editarSubcategoriasForm) {
      this.editarSubcategoriasForm.reset();
    }
    this.subcategoria = subcategoria;

    if (this.subcategoria === undefined) {
      this.pageTitle = 'Adicionar Subcategoria';
    } else {
      this.pageTitle = `Editar Subcategoria: ${this.subcategoria.nome}`;
      // Update the data on the form
      this.editarSubcategoriasForm.patchValue({
        nome: this.subcategoria.nome,
        id_categoria: this.subcategoria.id_categoria,
      });
    }
  }

  saveSubcategoria(): void {
    if (this.editarSubcategoriasForm.valid) {
      if (this.editarSubcategoriasForm.dirty) {
        const subcategoria = { ...this.subcategoria, ...this.editarSubcategoriasForm.value };
        const id_subcategoria = Number(this.route.snapshot.paramMap.get('id_subcategoria'));

        if (id_subcategoria === 0) {
          this.subcategoriaService.createSubcategoria(subcategoria)
              .subscribe({
                next: () => {
                  this.openSnackBar(`Subcategoria ${subcategoria.nome} Adicionada!`);
                  return this.onSaveComplete(subcategoria.id);
                },
                error: err => this.errorMessage = err
              });
        } else {

          this.subcategoriaService.updateSubcategoria(subcategoria)
              .subscribe({
                next: () => {
                  this.openSnackBar(`Subcategoria ${subcategoria.id} Atualizada!`);
                  this.onSaveComplete(this.subcategoria.id)
                },
                error: err => this.errorMessage = err
              });
        }
      } else {
        this.onSaveComplete(this.subcategoria.id);
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(id_subcategoria: number): void {
    // Reset the form to clear the flags
    this.editarSubcategoriasForm.reset();
    this.router.navigate(['/subcategorias']);
  }


}
