import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Response} from '../_models/response';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Checklist} from '../_models/checklist';
import {Utilizador} from '../_models/utilizador';
import {Categoria} from '../_models/categoria';
import {Produto} from '../_models/produto';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  public error?: HttpErrorResponse;

  constructor(private http: HttpClient) { }

  /* Create Checklist */
  createChecklist(checklist: Checklist): Observable<any> {
    return this.http.post<Response<Checklist>>(`${environment.apiUrl}/checklist/`, checklist).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Get Checklists */
  getChecklists(): Observable<any[]> {
    return this.http.get<Response<Checklist[]>>(`${environment.apiUrl}/checklist`).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Get Checklist */
  getChecklist(id_checklist: number): Observable<any> {
    return this.http.get<Response<Checklist>>(`${environment.apiUrl}/checklist/${id_checklist}`).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Get Produto */
  getProduto(id_produto: number): Observable<any> {
    return this.http.get<Response<Produto>>(`${environment.apiUrl}/produtos/${id_produto}`).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Get Utilizador */
  getUtilizador(id: number): Observable<any> {
    return this.http.get<Response<Utilizador>>(`${environment.apiUrl}/utilizador/${id}`).pipe(map(response => {
      return response.response.data;
    }));
  }
}
