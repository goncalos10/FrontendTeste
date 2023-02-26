import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Response} from '../_models/response';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Produto } from 'app/_models/produto';
import {Utilizador} from '../_models/utilizador';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  public error?: HttpErrorResponse;

  constructor(private http: HttpClient) { }

  /* Get Utilizadores */
  getProdutos(): Observable<any[]> {
    return this.http.get<Response<Utilizador[]>>(`${environment.apiUrl}/produtos`).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Get Produto */
  getProduto(id: number): Observable<any> {
    return this.http.get<Response<Produto>>(`${environment.apiUrl}/produtos/${id}`).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Update Produto */
  updateProduto(produto: Produto): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Response<Produto>>(
        `${environment.apiUrl}/produtos/${produto.id}`, produto, {headers}).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Create Produto */
  createProduto(produto: Produto): Observable<any> {
    return this.http.post<Response<Produto>>(`${environment.apiUrl}/produtos`, produto).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Apagar Produto */
  apagarProduto(id: number): Observable<any> {
    return this.http.delete<Response<Produto>>(`${environment.apiUrl}/produtos/${id}`).pipe(map(response => {
      return response.response.data;
    }));
  }
}

