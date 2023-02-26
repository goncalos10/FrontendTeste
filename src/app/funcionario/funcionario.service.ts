import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Response} from '../_models/response';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Utilizador } from 'app/_models/utilizador';
import {Categoria} from '../_models/categoria';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  public error?: HttpErrorResponse;

  constructor(private http: HttpClient) { }

  /* Get Fornecedores */
  getFornecedores(): Observable<any[]> {
    return this.http.get<Response<Utilizador[]>>(`${environment.apiUrl}/utilizador/tipo-utilizador/3`).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Get Categorias */
  getCategorias(id_utilizador: number): Observable<any[]> {
    return this.http.get<Response<any>>(`${environment.apiUrl}/categorias/user/${id_utilizador}`).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Get Subcategorias */
  getSubcategorias(id_categoria: number): Observable<any[]> {
    return this.http.get<Response<any>>(`${environment.apiUrl}/subcategorias/${id_categoria}`).pipe(map(response => {
      return response.response.data;
    }));
  }
  /* Get Produtos */
  getProdutos(id_subcategoria: number): Observable<any[]> {
    return this.http.get<Response<any>>(`${environment.apiUrl}/produtos/prod/${id_subcategoria}`).pipe(map(response => {
      return response.response.data;
    }));
  }

}
