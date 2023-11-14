import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';

// services
import {Observable} from "rxjs";
import {TokenService} from "../service/token.service";
import {ITokenUser} from "../interfaces/user";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private tokenService: TokenService
    ){}

    token: ITokenUser = {
        email: "",
        exp: 0,
        firstName: "",
        gas_station_code_sap: "",
        gas_station_id: 0,
        iat: 0,
        id: 0,
        lastName: "",
        role_id: 0,
        role_name: "",
        username: ""

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        if(this.tokenService.isLogged()){
            this.token = this.tokenService.getPayload();
            console.log("token:", this.token)
            if (this.tokenService.tokenExpired()) {
                console.log("expired");
                this.tokenService.clearToken();
                this.router.navigate(['/auth/login'])
            } else {
                console.log("valide");
            }
            return true;
        }
        return this.router.navigate(['/auth/login'])
    }
}
