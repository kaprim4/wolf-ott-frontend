import {Injectable} from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';

// services
import {Observable} from "rxjs";
import {ITokenUser} from "../shared/models/user";
import {TokenService} from "../shared/services/token.service";
import {LoggingService} from "../services/logging.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private tokenService: TokenService,
        private loggingService: LoggingService
    ) {
    }

    token: ITokenUser = {
        email: "",
        email_verified: false,
        exp: 0,
        family_name: "",
        given_name: "",
        iat: 0,
        name: "",
        preferred_username: "",
        role: undefined,
        role_access: undefined,
        scope: "",
        sid: ""
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.tokenService.isLogged()) {
            this.loggingService.log("isLogged:", this.tokenService.isLogged());
            this.token = this.tokenService.getPayload();
            this.loggingService.log("token:", this.token);
            this.loggingService.log("tokenExpired:", this.tokenService.tokenExpired());
            if (this.tokenService.tokenExpired()) {
                this.loggingService.log("expired");
                this.tokenService.clearToken();
                this.router.navigate(['/auth/login']);
                return false; // Rediriger et empêcher l'activation
            } else {
                this.loggingService.log("valide");
                return true;
            }
        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }
}
