import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response} from '../_models/response';
import {Subcategoria} from '../_models/subcategoria';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Utilizador} from '../_models/utilizador';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriasService {

  public error?: HttpErrorResponse;

  constructor(private http: HttpClient) { }

  /* Get Subategorias */
  getSubcategorias(): Observable<any> {
    return this.http.get<Response<Subcategoria>>(`${environment.apiUrl}/subcategorias`).
    pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Get Subcategoria */
  getSubcategoria(id_subcategoria: number): Observable<any> {
    return this.http.get<Response<Subcategoria>>(`${environment.apiUrl}/subcategorias/${id_subcategoria}`).
    pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Update Subcategoria */
  updateSubcategoria(subcategoria: Subcategoria): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Response<Subcategoria>>(
        `${environment.apiUrl}/subcategorias/${subcategoria.id}`, subcategoria, {headers}).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Create Categoria */
  createSubcategoria(subcategoria: Subcategoria): Observable<any> {
    return this.http.post<Response<Subcategoria>>(`${environment.apiUrl}/subcategorias/1}`,
        subcategoria).pipe(map(response => {
      return response.response.data;
    }));
  }

  /* Apagar Subcategoria */
  apagarSubcategoria(subcategoria: Subcategoria): Observable<any> {
    return this.http.delete<Response<Subcategoria>>(`${environment.apiUrl}/subcategorias/${subcategoria.id_categoria}
    /${subcategoria.id_categoria}`).pipe(map(response => {
      return response.response.data;
    }));
  }

}
