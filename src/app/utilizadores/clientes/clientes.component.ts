import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Utilizador} from '../../_models/utilizador';
import {UtilizadorService} from '../utilizador.service';
import {MatDialog} from '@angular/material/dialog';
import {RemoverUtilizadorDialog} from '../remover-dialog';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  subscription!: Subscription;
  errorMessage = '';
  fornecedores: Utilizador[] = []
  utilizador_tipo_nome: string;

  constructor(private utilizadorService: UtilizadorService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscription = this.utilizadorService.getFornecedores().subscribe({
      next: fornecedores => {
        this.fornecedores = fornecedores;
      },
      error: err => {
        if (err.status === 500){
          this.fornecedores = [];
        }
        this.errorMessage = err;
      }
    });
  }

  openDialog(id: number, id_tipo_utilizador: number): void {
    if (id_tipo_utilizador === 3){
      this.utilizador_tipo_nome = 'Fornecedor';
    }

    const dialogRef = this.dialog.open(RemoverUtilizadorDialog, {
      width: '20%',
      data: {id_utilizador: id, utilizador_tipo_nome: this.utilizador_tipo_nome},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

