import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ITokenUser} from "../models/user";
import {jwtDecode} from "jwt-decode";

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(
        private router: Router
    ) {
    }

    saveToken(token: string): void {
        localStorage.setItem('token', token)
        this.router.navigate(['dashboard']).then(r =>
            console.log("Save Token : ", token)
        );
    }

    isLogged(): boolean {
        const token = localStorage.getItem('token')
        return !!token
    }

    clearToken(): void {
        localStorage.removeItem('token')
        this.router.navigate(['/auth/login']).then(r =>
            console.log("Clear Token : ", localStorage.getItem('token'))
        )
    }

    clearTokenExpired(): void {
        localStorage.removeItem('token')
        this.router.navigate(['/auth/logout']).then(r =>
            console.log("Clear Token Expired : ", localStorage.getItem('token'))
        )
    }

    getToken(): string {
        let token = localStorage.getItem('token');
        return <string>token
    }

    getPayload() {
        return jwtDecode<ITokenUser>(this.getToken());
    }

    tokenExpired() {
        if (this.isLogged()) {
            const expiry = (JSON.parse(atob(this.getToken().split('.')[1]))).exp;
            return (Math.floor((new Date).getTime() / 1000)) >= expiry;
        }
        return false;
    }
}
