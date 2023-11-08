import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {IUser} from "../interfaces/user";
import {IToken} from "../interfaces/token";
import {TokenService} from "./token.service";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) {

    }

    login(username: string, password: string): Observable<IToken> {
        console.log("login_username:", username);
        console.log("login_password:", password);
        console.log("API_URL:", `${this.apiServerUrl}/api/v1/auth/signin`);
        return this.http.post<IToken>(`${this.apiServerUrl}/api/v1/auth/signin`, {username, password})
    }

    signup(name: string, username: string, password: string): Observable<IUser> {
        console.log("signup_username:", username);
        console.log("signup_password:", password);
        console.log("API_URL:", `${this.apiServerUrl}/api/v1/auth/signup`);
        return this.http.post<IUser>(`${this.apiServerUrl}/api/v1/auth/signup`, {name, username, password})
    }

    logout(): void {
        this.tokenService.clearToken();
    }
}

