import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CategoriaService } from './categoria.service';
import {UtilizadorService} from '../utilizadores/utilizador.service';
import {Categoria} from '../_models/categoria';

export interface DialogData {
    id_categoria: number,
    nome: string
}

@Component({
    selector: 'remover-dialog',
    templateUrl: 'remover-dialog.html',
})

export class RemoverCategoriaDialog {
    subscription!: Subscription;
    categoria: Categoria;
    errorMessage: string;

    constructor(
        public dialogRef: MatDialogRef<RemoverCategoriaDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private categoriaService: CategoriaService
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(id: number): void {
        this.subscription = this.categoriaService.apagarCategoria(id).subscribe({
            next: categoria => {
                this.categoria = categoria;
            },
            error: err => this.errorMessage = err
        });
        this.dialogRef.close();
    }
}
