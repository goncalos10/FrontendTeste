import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Utilizador } from 'app/_models/utilizador';
import { Subscription } from 'rxjs';
import { RemoverUtilizadorDialog } from '../remover-dialog';
import { UtilizadorService } from '../utilizador.service';

@Component({
  selector: 'app-utilizadores',
  templateUrl: './utilizadores.component.html',
  styleUrls: ['./utilizaddores.component.css']
})
export class UtilizadoresComponent implements OnInit {

  subscription!: Subscription;
  errorMessage = '';
  utilizadores: Utilizador[] = []
  utilizador_tipo_nome: string;

  constructor(private utilizadorService: UtilizadorService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscription = this.utilizadorService.getUtilizadores().subscribe({
      next: utilizadores => {
        this.utilizadores = utilizadores;
      },
      error: err => {
        if (err.status === 500){
          this.utilizadores = [];
        }
        this.errorMessage = err;
      }
    });
  }

  openDialog(id: number, id_tipo_utilizador: number): void {
    if(id_tipo_utilizador === 2){
      this.utilizador_tipo_nome = 'Funcionário';
    }
    else if (id_tipo_utilizador === 3){
      this.utilizador_tipo_nome = 'Fornecedor';
    }
    else if (id_tipo_utilizador === 4){
      this.utilizador_tipo_nome = 'Carenciado';
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
