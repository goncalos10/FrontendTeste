import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {ProdutosService} from '../produtos.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Produto} from '../../_models/produto';
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
import {SubcategoriasService} from '../../subcategorias/subcategorias.service';

@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.css']
})
export class EditarProdutosComponent implements OnInit {

  errorMessage = '';
  editarProdutoForm!: FormGroup;
  private sub!: Subscription;
  produto: Produto;
  error = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pageTitle = '';
  categorias: Categoria[] = [];
  clientes: Utilizador[] = [];
  subcategorias: Subcategoria[] = [];

  displayMessage: { [key: string]: string } = {};

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private produtoService: ProdutosService,
              private utilizadorService: UtilizadorService,
              private categoriaService: CategoriaService,
              private subcategoriaService: SubcategoriasService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.editarProdutoForm = this.fb.group({
        id_cliente: ['', Validators.required],
        id_categoria: ['', Validators.required],
        nome: ['', Validators.required],
        id_subcategoria: ['', Validators.required],
        pergunta1: ['', Validators.required],
        pergunta2: ['', Validators.required],
        pergunta3: [''],
        pergunta4: [''],
        pergunta5: [''],
        pergunta6: [''],
        pergunta7: [''],
        pergunta8: [''],
        pergunta9: [''],
        pergunta10: ['']
    });

        // Read the user Id from the route parameter
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

      this.sub = this.utilizadorService.getFornecedores().subscribe({
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

    onChangeCategoria(id_categoria: string) {

        this.subcategoriaService.getSubcategoria(Number(id_categoria)).subscribe({
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
    }

  getProduto(id: number): void {
    this.produtoService.getProduto(id)
        .subscribe({
          next: produto => {this.displayProduto(produto)},
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
    if (this.editarProdutoForm) {
      this.editarProdutoForm.reset();
    }
    this.produto = produto;

    if (this.produto === undefined) {
      this.pageTitle = 'Adicionar Produto';
    } else {
      this.pageTitle = `Editar produto: ${this.produto.nome}`;
      // Update the data on the form
      this.editarProdutoForm.patchValue({
        nome: this.produto.nome
      });
    }
  }

  saveProduto(): void {
    if (this.editarProdutoForm.valid) {
      if (this.editarProdutoForm.dirty) {
        const produto = { ...this.produto, ...this.editarProdutoForm.value };
        const id_produto = Number(this.route.snapshot.paramMap.get('id'));

        if (id_produto === 0) {
          this.produtoService.createProduto(produto)
              .subscribe({
                next: () => {
                  this.openSnackBar(`Produto ${produto.nome} Adicionado!`);
                  return this.router.navigate(['/produtos']);
                },
                error: err => this.errorMessage = err
              });
        } else {

          this.produtoService.updateProduto(produto)
              .subscribe({
                next: () => {
                  this.openSnackBar(`Produto ${id_produto} Atualizado!`);
                  return this.router.navigate(['/']);
                },
                error: err => this.errorMessage = err
              });
        }
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }


}
