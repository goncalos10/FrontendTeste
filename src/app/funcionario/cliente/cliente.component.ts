import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Utilizador} from '../../_models/utilizador';
import {UtilizadorService} from '../../utilizadores/utilizador.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  subscription!: Subscription;
  errorMessage = '';
  clientes: Utilizador[] = []

  constructor(private utilizadorService: UtilizadorService, public dialog: MatDialog) { }

  ngOnInit(): void {
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
}
