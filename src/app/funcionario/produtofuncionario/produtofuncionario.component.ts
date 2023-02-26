import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Produto} from '../../_models/produto';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {FuncionarioService} from '../funcionario.service';

@Component({
  selector: 'app-produtofuncionario',
  templateUrl: './produtofuncionario.component.html',
  styleUrls: ['./produtofuncionario.component.css']
})
export class ProdutofuncionarioComponent implements OnInit {

  subscription!: Subscription;
  errorMessage = '';
  produtos: Produto[] = [];

  constructor(private funcionarioService: FuncionarioService,
              public dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id_subcategoria = Number(this.route.snapshot.paramMap.get('id_subcategoria'));
    this.subscription = this.funcionarioService.getProdutos(id_subcategoria).subscribe({
      next: produtos => {
        this.produtos = produtos;
      },
      error: err => {
        if (err.status === 500) {
          this.produtos = [];
        }
        this.errorMessage = err;
      }
    });
  }

}
