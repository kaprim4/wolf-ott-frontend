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
        this.router.navigate(['/'])
    }

    clearTokenExpired(): void {
        localStorage.removeItem('token')
        this.router.navigate(['auth/login'])
    }

    getToken(): string | null {
        return localStorage.getItem('token')
    }

    getPayload() {
        let user: ITokenUser = {
            id: 0,
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            gas_station_id: 0,
            gas_station_code_sap: '',
            role: '',
            exp: 0,
            iat: 0
        }
        let token = localStorage.getItem('token')
        if (token) {
            const decode: ITokenUser = jwtDecode<ITokenUser>(token)
            user.id = decode.id;
            user.firstName = decode.firstName;
            user.lastName = decode.lastName;
            user.username = decode.username;
            user.email = decode.email;
            user.gas_station_id = decode.gas_station_id;
            user.gas_station_code_sap = decode.gas_station_code_sap;
            user.role = decode.role;
            user.exp = decode.exp;
            user.iat = decode.iat;
        }
        return user
    }
}
