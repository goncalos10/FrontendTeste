import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import {ValidationService} from '../../validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Checklist} from '../../_models/checklist';
import {ChecklistService} from '../checklist.service';
import {ProdutosService} from '../../produtos/produtos.service';
import {Produto} from '../../_models/produto';
import {AuthenticationService} from '../../_services/authentication.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {sha512} from 'js-sha512';
import {Utilizador} from '../../_models/utilizador';


@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  errorMessage = '';
  editarChecklistForm!: FormGroup;
  private sub!: Subscription;
  checklist: Checklist;
  produto: Produto;
  error = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pageTitle = '';

  displayMessage: { [key: string]: string } = {};

  loggedUtilizador: Utilizador;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private checklistService: ChecklistService,
              private produtoService: ProdutosService,
              private authenticationService: AuthenticationService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loggedUtilizador = this.authenticationService.userValue.response.data;
    this.editarChecklistForm  = this.fb.group({
      nome: ['', Validators.required],
      id_prod_checklist: ['', Validators.required],
      id_utilizador_checklist: ['', Validators.required],
      data: ['', Validators.required],
      encomenda: ['', Validators.required],
      estado: ['', Validators.required],
      resposta1: ['', Validators.required],
      resposta2: ['', Validators.required],
      resposta3: ['', Validators.required],
      resposta4: ['', Validators.required],
      resposta5: ['', Validators.required],
      resposta6: ['', ],
      resposta7: ['', ],
      resposta8: ['', ],
      resposta9: ['', ],
      resposta10: ['', ],
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
        params => {
          const id_produto = Number(this.route.snapshot.paramMap.get('id_produto'));
          if (id_produto !== 0) {
            this.getProduto(id_produto);
          } else {
            this.displayProduto(this.produto);
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

  getProduto(id: number): void {
    this.produtoService.getProduto(id)
        .subscribe({
          next: produto => {this.produto = produto},
          error: err => {
            if (err.status === 500) {
              this.router.navigate(['/login']);
            }
            this.errorMessage = err
          }
        });
  }

  displayProduto(produto: Produto): void {
    // clean form states
    if (this.editarChecklistForm) {
      this.editarChecklistForm.reset();
    }
    this.produto = produto;

    if (this.produto === undefined) {
      this.router.navigate(['/']);
    } else {
      this.pageTitle = `Adicionar Checklist: ${this.produto.nome}`;
      // Update the data on the form
      this.editarChecklistForm.patchValue({
        nome: this.produto.nome,
      });
    }
  }

  saveChecklist(): void {
    if (this.editarChecklistForm.valid) {
      if (this.editarChecklistForm.dirty) {
        const checklist = { ...this.checklist, ...this.editarChecklistForm.value };
          this.checklistService.createChecklist(checklist)
              .subscribe({
                next: () => {
                  this.openSnackBar(`Checklist Adicionada!`);
                  return this.onSaveComplete();
                },
                error: err => this.errorMessage = err
              });
      } else {
        this.errorMessage = 'Please correct the validation errors.';
      }
  }}

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.editarChecklistForm.reset();
    this.router.navigate(['/']);
  }

}
