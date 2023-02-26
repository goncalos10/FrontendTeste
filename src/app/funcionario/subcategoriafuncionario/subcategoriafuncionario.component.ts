import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Subcategoria} from '../../_models/subcategoria';
import {FuncionarioService} from '../funcionario.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-subcategoriafuncionario',
  templateUrl: './subcategoriafuncionario.component.html',
  styleUrls: ['./subcategoriafuncionario.component.css']
})
export class SubcategoriafuncionarioComponent implements OnInit {

  subscription!: Subscription;
  errorMessage = '';
  subcategorias: Subcategoria[] = [];

  constructor(private funcionarioService: FuncionarioService,
              public dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id_categoria = Number(this.route.snapshot.paramMap.get('id_categoria'));
    this.subscription = this.funcionarioService.getSubcategorias(id_categoria).subscribe({
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

}
