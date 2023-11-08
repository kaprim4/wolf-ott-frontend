import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {ITokenUser} from "../interfaces/user";

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(private router: Router) {
    }

    saveToken(token: string): void {
        localStorage.setItem('token', token)
        this.router.navigate(['dashboard'])
    }

    isLogged(): boolean {
        const token = localStorage.getItem('token')
        return !!token
    }

    clearToken(): void {
        localStorage.removeItem('token')
        this.router.navigate(['/auth/logout'])
    }

    clearTokenExpired(): void {
        localStorage.removeItem('token')
        this.router.navigate(['/auth/logout'])
    }

    getToken(): string {
        let token = localStorage.getItem('token');
        return <string>token
    }

    getPayload() {
        return jwtDecode<ITokenUser>(this.getToken());
    }
}
