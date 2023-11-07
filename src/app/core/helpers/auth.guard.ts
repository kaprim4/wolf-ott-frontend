import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';

// services
import {AuthenticationService} from '../service/auth.service';
import {Observable} from "rxjs";
import {TokenService} from "../service/token.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private tokenService: TokenService
    ){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(this.tokenService.isLogged()){
            return true
        }
        return this.router.navigate(['/auth/login'])
    }

}
