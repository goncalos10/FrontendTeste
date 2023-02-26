import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Produto } from 'app/_models/produto';
import { Subscription } from 'rxjs';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  subscription!: Subscription;
  errorMessage = '';
  produtos: Produto[] = []

  constructor(private produtoService: ProdutosService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscription = this.produtoService.getProdutos().subscribe({
      next: produtos => {
        this.produtos = produtos;
      },
      error: err => {
        if (err === 500) {
          this.produtos = [];
        }
        this.errorMessage = err;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
