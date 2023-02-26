import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utilizador } from 'app/_models/utilizador';
import { Subscription } from 'rxjs';
import { UtilizadorService } from './utilizador.service';

export interface DialogData {
    id_utilizador: number;
    nome: string;
  }

@Component({
    selector: 'remover-dialog',
    templateUrl: 'remover-dialog.html',
})

export class RemoverUtilizadorDialog {
    subscription!: Subscription;
    utilizador: Utilizador;
    errorMessage: string;
    
    constructor(
        public dialogRef: MatDialogRef<RemoverUtilizadorDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private utilizadorService: UtilizadorService
    ) {}
  
    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(id: number): void {
        this.subscription = this.utilizadorService.apagarUtilizador(id).subscribe({
            next: utilizador => {
              this.utilizador = utilizador;
            },
            error: err => this.errorMessage = err
          });
        this.dialogRef.close();
    }
}
