import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Response} from '../_models/response';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Utilizador } from 'app/_models/utilizador';

@Injectable({
    providedIn: 'root'
})
export class UtilizadorService {

    public error?: HttpErrorResponse;

    constructor(private http: HttpClient) { }

    /* Get Utilizadores */
    getUtilizadores(): Observable<any[]> {
        return this.http.get<Response<Utilizador[]>>(`${environment.apiUrl}/utilizador/tipo-utilizador/2`).pipe(map(response => {
            return response.response.data;
        }));
    }

    /* Get Fornecedores */
    getFornecedores(): Observable<any[]> {
        return this.http.get<Response<Utilizador[]>>(`${environment.apiUrl}/utilizador/tipo-utilizador/3`).pipe(map(response => {
            return response.response.data;
        }));
    }

    /* Get Utilizadores */
    getUtilizador(id: number): Observable<any> {
        return this.http.get<Response<Utilizador>>(`${environment.apiUrl}/utilizador/${id}`).pipe(map(response => {
            return response.response.data;
        }));
    }

    /* Update Utilizadores */
    updateUtilizador(utilizador: Utilizador): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<Response<Utilizador>>(
            `${environment.apiUrl}/utilizador/${utilizador.id}`, utilizador, {headers}).pipe(map(response => {
            return response.response.data;
        }));
    }

    /* Create Utilizador */
    createUtilizador(utilizador: Utilizador): Observable<any> {
        return this.http.post<Response<Utilizador>>(`${environment.apiUrl}/utilizador`, utilizador).pipe(map(response => {
            return response.response.data;
        }));
    }

    /* Apagar utilizador */
    apagarUtilizador(id: number): Observable<any> {
        return this.http.delete<Response<Utilizador>>(`${environment.apiUrl}/utilizador/${id}`).pipe(map(response => {
            return response.response.data;
        }));
    }
}
