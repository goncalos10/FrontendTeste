import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Utilizador} from '../_models/utilizador';
import {Response} from '../_models/response'

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    user: Observable<AuthResponse>;
    private userSubject: BehaviorSubject<AuthResponse>;

    constructor(private router: Router, private http: HttpClient) {
        this.userSubject = new BehaviorSubject<AuthResponse>(JSON.parse(localStorage.getItem('utilizador')));
        this.user = this.userSubject.asObservable();
    }

    /**
     * Get logged user.
     */
    get userValue(): AuthResponse {
        return JSON.parse(localStorage.getItem('utilizador'));
    }

    /**
     * POST credentials for authentication.
     * @param email User email
     * @param password User password (already hashed)
     */
    login(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/authentication`, {email, password})
            .pipe(map(response => {
                // Save Utilizador details and basic auth credentials in local storage to keep him logged in between page refreshes
                response.authdata = window.btoa(email + ':' + password);
                localStorage.setItem('utilizador', JSON.stringify(response));
                this.userSubject.next(response);
                return response;
            }));
    }

    /**
     * POST User for registration.
     * @param newUser User information
     */
    register(newUser: Utilizador): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/authentication/register`, {newUser})
            .pipe(map(user => { return user; }));
    }

    /**
     * Performs logout.
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('utilizador');
        this.userSubject.next(null);
        this.router.navigate(['/login']).then();
    }
}

export class AuthResponse extends Response<Utilizador> {
    authdata: string;
}
