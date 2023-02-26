import {Component, OnInit, ViewChild, ElementRef, Injectable} from '@angular/core';
import { Utilizador } from 'app/_models/utilizador';
import {UtilizadorService} from '../utilizadores/utilizador.service';
import {Subscription} from 'rxjs';
import { Chart, registerables } from 'chart.js';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    sub!: Subscription;
    errorMessage = '';
    utilizadores: Utilizador[] = [];

    constructor(private appService: UtilizadorService) {
        Chart.register(...registerables);
    }


    ngOnInit(): void {
        this.sub = this.appService.getUtilizadores().subscribe({
            next: utilizadores => {
                this.utilizadores = utilizadores;
            },
            error: err => this.errorMessage = err
        });


    }
}
