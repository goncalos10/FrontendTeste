import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {jsPDF} from 'jspdf';
import {Subscription} from 'rxjs';
import {Checklist} from '../../_models/checklist';
import {ChecklistService} from '../checklist.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Produto} from '../../_models/produto';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Utilizador} from '../../_models/utilizador';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {Categoria} from '../../_models/categoria';
import {UtilizadorService} from '../../utilizadores/utilizador.service';

@Component({
  selector: 'app-pdf-checklist',
  templateUrl: './pdf-checklist.component.html',
  styleUrls: ['./pdf-checklist.component.css']
})
export class PdfChecklistComponent implements OnInit {
  private sub!: Subscription;
  errorMessage = '';
  checklistForm!: FormGroup;
  checklist: Checklist;
  error = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pageTitle = '';
  displayMessage: { [key: string]: string } = {};

  @ViewChild('content', {static: false}) el!: ElementRef;
  produto: Produto;
  utilizador: Utilizador;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private checklistService: ChecklistService,
              private utilizadorService: UtilizadorService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.checklistForm = this.fb.group({
      data: ['', [Validators.required]],
      encomenda: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      pergunta1: ['', [Validators.required]],
      resposta1: ['', [Validators.required]],
      pergunta2: ['', [Validators.required]],
      resposta2: ['', [Validators.required]],
      pergunta3: ['', [Validators.required]],
      resposta3: ['', [Validators.required]],
      pergunta4: ['', [Validators.required]],
      resposta4: ['', [Validators.required]],
      pergunta5: ['', [Validators.required]],
      resposta5: ['', [Validators.required]],
      pergunta6: ['', [Validators.required]],
      resposta6: ['', [Validators.required]],
      pergunta7: ['', [Validators.required]],
      resposta7: ['', [Validators.required]],
      pergunta8: ['', [Validators.required]],
      resposta8: ['', [Validators.required]],
      pergunta9: ['', [Validators.required]],
      resposta9: ['', [Validators.required]],
      pergunta10: ['', [Validators.required]],
      resposta10: ['', [Validators.required]],
      utilizador: ['', [Validators.required]],
    });

    this.sub = this.route.paramMap.subscribe(
        params => {
          const id_checklist = Number(this.route.snapshot.paramMap.get('id_checklist'));
          if (id_checklist !== 0) {
            this.getChecklist(id_checklist);
          }
        }
    );

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
        params => {
          const id_produto = Number(this.route.snapshot.paramMap.get('id_produto'));
          if (id_produto !== 0) {
            this.getProduto(id_produto);
          }
        }
    );
    // Read the user Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
        params => {
          const id_utilizador = Number(this.route.snapshot.paramMap.get('id_utilizador'));
          if (id_utilizador !== 0) {
            this.getUtilizador(id_utilizador);
          }
        }
    );

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

    this.utilizador = utilizador;

    // Update the data on the form
    this.checklistForm.patchValue({
      utilizador: this.utilizador.nome,
    });
  }

  getProduto(id: number): void {
    this.checklistService.getProduto(id)
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
    if (this.checklistForm) {
      this.checklistForm.reset();
    }
    this.produto = produto;

    // Update the data on the form
      this.checklistForm.patchValue({
        nome: this.produto.nome,
        data: this.checklist.data,
        encomenda: this.checklist.encomenda,
        pergunta1: this.produto.pergunta1,
        resposta1: this.checklist.resposta1,
        pergunta2: this.produto.pergunta2,
        resposta2: this.checklist.resposta2,
        pergunta3: this.produto.pergunta3,
        resposta3: this.checklist.resposta3,
        pergunta4: this.produto.pergunta4,
        resposta4: this.checklist.resposta4,
        pergunta5: this.produto.pergunta5,
        resposta5: this.checklist.resposta5,
        pergunta6: this.produto.pergunta6,
        resposta6: this.checklist.resposta6,
        pergunta7: this.produto.pergunta7,
        resposta7: this.checklist.resposta7,
        pergunta8: this.produto.pergunta8,
        resposta8: this.checklist.resposta8,
        pergunta9: this.produto.pergunta9,
        resposta9: this.checklist.resposta9,
        pergunta10: this.produto.pergunta10,
        resposta10: this.checklist.resposta10,
        utilizador: this.checklist.id_utilizador,
      });
  }

  getChecklist(id: number): void {
    this.checklistService.getChecklist(id)
        .subscribe({
          next: checklist => {this.displayChecklist(checklist)},
          error: err => {
            if (err.status === 500) {
              this.router.navigate(['/login']);
            }
            this.errorMessage = err
          }
        });
  }

  imprimirDoc(divName) {
    const printContents = document.getElementById(divName).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  displayChecklist(checklist: Checklist): void {
    // clean form states

    this.checklist = checklist;

    // Update the data on the form
    this.checklistForm.patchValue({
      pergunta1: this.produto.pergunta1,
      resposta1: this.checklist.resposta1,
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



  converterPdf() {
    let pdf = new jsPDF('p', 'pt', 'a5');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('demo.pdf');
      }
    });
  }

}
