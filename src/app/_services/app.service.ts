import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Response} from '../_models/response';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Utilizador } from 'app/_models/utilizador';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) { }

    /**
     * GET all Something.
     */
    getSomething(): Observable<any[]> {
        return this.http.get<Response<Utilizador[]>>(`${environment.apiUrl}/path`).pipe(map(response => {
            return response.response.data;
        }));
    }

}
