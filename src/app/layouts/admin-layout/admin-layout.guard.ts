import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthenticationService } from 'app/_services/authentication.service';


@Injectable({
    providedIn: 'root'
})
export class AdminLayoutGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authenticationService.userValue) {
            // Admin logged in so return true
            if (this.authenticationService.userValue.response.data.id_tipo_utilizador === 1) {
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then();
        return false;
    }
}

