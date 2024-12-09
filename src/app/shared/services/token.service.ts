import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ITokenUser} from "../models/user";
import {jwtDecode} from "jwt-decode";
import * as moment from 'moment';
import {now} from "moment";
import {LoggingService} from "../../services/logging.service";

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(
        private router: Router,
        private loggingService: LoggingService
    ) {
    }

    saveToken(token: string): void {
        localStorage.setItem('token', token)
        this.router.navigate(['dashboard']).then(r =>
            this.loggingService.log("Save Token : ", token)
        );
    }

    isLogged(): boolean {
        const token = localStorage.getItem('token')
        return !!token
    }

    clearToken(): void {
        localStorage.removeItem('token')
        this.router.navigate(['/auth/login']).then(r =>
            this.loggingService.log("Clear Token : ", localStorage.getItem('token'))
        )
    }

    clearTokenExpired(): void {
        localStorage.removeItem('token')
        this.router.navigate(['/auth/logout']).then(r =>
            this.loggingService.log("Clear Token Expired : ", localStorage.getItem('token'))
        )
    }

    getToken(): string {
        let token = localStorage.getItem('token');
        return <string>token
    }

    getPayload() {
        return jwtDecode<ITokenUser>(this.getToken());
    }

    tokenExpired(): boolean {
        if (this.isLogged()) {
            const token = this.getToken();
            const decodedToken: any = jwtDecode(token);
            const currentTime = now().valueOf();
            const expiryTimeInMs = moment.unix(decodedToken.exp).valueOf();
            this.loggingService.log("now : ", moment(currentTime).format('YYYY-MM-DD HH:mm:ss'))
            this.loggingService.log("expiry : ", moment(expiryTimeInMs).format('YYYY-MM-DD HH:mm:ss'))
            return currentTime >= expiryTimeInMs;
        }
        return false;
    }
}
