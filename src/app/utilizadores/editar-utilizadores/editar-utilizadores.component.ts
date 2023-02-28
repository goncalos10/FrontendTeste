import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {UtilizadorService} from '../utilizador.service';
import {ValidationService} from '../../validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Utilizador} from '../../_models/utilizador';
import { sha512 } from 'js-sha512';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-editar-utilizadores',
  templateUrl: './editar-utilizadores.component.html',
  styleUrls: ['./editar-utilizadores.component.css']
})
export class EditarUtilizadoresComponent implements OnInit {

  errorMessage = '';
  editarUtilizadorForm!: FormGroup;
  private sub!: Subscription;
  utilizador: Utilizador;
  error = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pageTitle = '';

  displayMessage: { [key: string]: string } = {};

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private utilizadorService: UtilizadorService,
              private validationService: ValidationService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.editarUtilizadorForm = this.fb.group({
      nome: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      username: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      email: ['', [Validators.required,
        this.validationService.emailValidator()]],
      password: ['', Validators.required],
      telemovel: ['', [Validators.required]]
    });

    // Read the user Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
        params => {
          const id_tipo = Number(this.route.snapshot.paramMap.get('id_tipo'));
          const id_utilizador = Number(this.route.snapshot.paramMap.get('id_utilizador'));
          if (id_utilizador !== 0) {
            this.getUtilizador(id_utilizador);
          } else {
            this.displayUtilizador(this.utilizador);
          }
        }
    );
  }

  openSnackBar(msg: string): void {
    this._snackBar.open(msg, '', {
      panelClass: ['red-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }

  getUtilizador(id: number): void {
    this.utilizadorService.getUtilizador(id)
        .subscribe({
          next: utilizador => {this.displayUtilizador(utilizador)},
          error: err => {
            if (err.status === 500) {
              this.router.navigate(['/login']);
            }
            this.errorMessage = err
          }
        });
  }

  displayUtilizador(utilizador: Utilizador): void {
    // clean form states
    if (this.editarUtilizadorForm) {
      this.editarUtilizadorForm.reset();
    }
    this.utilizador = utilizador;
    const id_tipo = Number(this.route.snapshot.paramMap.get('id_tipo'));
    const id_utilizador = Number(this.route.snapshot.paramMap.get('id_utilizador'));

    if (this.utilizador === undefined) {
      if (id_tipo === 2) {
        this.pageTitle = 'Adicionar Funcionário';
      } else if (id_tipo === 3) {
        this.pageTitle = 'Adicionar Cliente';
      }
    } else {
      this.pageTitle = `Editar Utilizador: ${this.utilizador.nome}`;
      // Update the data on the form
      this.editarUtilizadorForm.patchValue({
        nome: this.utilizador.nome,
        username: this.utilizador.username,
        email: this.utilizador.email,
        telemovel: this.utilizador.telemovel,
      });
    }
  }

  saveUtilizador(): void {
    if (this.editarUtilizadorForm.valid) {
      if (this.editarUtilizadorForm.dirty) {
        const utilizador = { ...this.utilizador, ...this.editarUtilizadorForm.value };
        utilizador.password = sha512(utilizador.password);
        const id_utilizador = Number(this.route.snapshot.paramMap.get('id'));
        const id_tipo = Number(this.route.snapshot.paramMap.get('id_tipo'));
        utilizador.id_tipo_utilizador = id_tipo;

        if (id_utilizador === 0) {
          this.utilizadorService.createUtilizador(utilizador)
              .subscribe({
                next: () => {
                  this.openSnackBar(`Utilizador ${utilizador.nome} Adicionado!`);
                  return this.onSaveComplete(utilizador.id_tipo_utilizador);
                },
                error: err => this.errorMessage = err
              });
        } else {

          this.utilizadorService.updateUtilizador(utilizador)
              .subscribe({
                next: () => {
                  this.openSnackBar(`Utilizador ${id_utilizador} Atualizado!`);
                  this.onSaveComplete(this.utilizador.id_tipo_utilizador)
                },
                error: err => this.errorMessage = err
              });
        }
      } else {
        this.onSaveComplete(this.utilizador.id_tipo_utilizador);
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(id_tipo_utilizador: number): void {
    // Reset the form to clear the flags
    this.editarUtilizadorForm.reset();
    if (id_tipo_utilizador === 2) {
      this.router.navigate(['/']);
    } else if (id_tipo_utilizador === 3) {
      this.router.navigate(['/']);
    } else if (id_tipo_utilizador === 4) {
      this.router.navigate(['/']);
    }
  }

}
