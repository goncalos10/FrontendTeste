import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Response} from '../_models/response';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Categoria } from 'app/_models/categoria';
import {Utilizador} from '../_models/utilizador';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public error?: HttpErrorResponse;

  constructor(private http: HttpClient) { }

  /* Get Categorias */
  getCategorias(): Observable<any[]> {
    return this.http.get<Response<Categoria[]>>(`${environment.apiUrl}/categorias`).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Get Categorias de Cliente */
  getCategoriasCliente(id_user: number): Observable<any[]> {
    return this.http.get<Response<Categoria[]>>(`${environment.apiUrl}/categorias/user/${id_user}`).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Get Categoria */
  getCategoria(id: number): Observable<any> {
    return this.http.get<Response<Utilizador>>(`${environment.apiUrl}/categorias/${id}`).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Update Categoria */
  updateCategoria(categoria: Categoria): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Response<Categoria>>(
        `${environment.apiUrl}/categorias/${categoria.id}`, categoria, {headers}).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Create Categoria */
  createCategoria(categoria: Categoria): Observable<any> {
    return this.http.post<Response<Categoria>>(`${environment.apiUrl}/categorias`, categoria).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Apagar Categoria */
  apagarCategoria(id: number): Observable<any> {
    return this.http.delete<Response<Categoria>>(`${environment.apiUrl}/categorias/${id}`).pipe(map(response => {
      return response.response.data;
    }));
  }

}
