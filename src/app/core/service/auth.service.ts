import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {IUser} from "../interfaces/user";
import {IToken} from "../interfaces/token";
import {TokenService} from "./token.service";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

    private apiServerUrl = environment.apiBaseUrl;
    private header1: HttpHeaders;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) {
        this.header1 = new HttpHeaders();
        this.header1 = this.header1.append('Content-Type', 'application/json');
    }

    login(username: string, password: string): Observable<HttpResponse<IToken>> {
        return this.http.post<IToken>(
            `${this.apiServerUrl}/api/v1/auth/signin`,
            {username, password},
            {headers: this.header1, observe: 'response'},
        );
    }

    signup(name: string, username: string, password: string): Observable<HttpResponse<IUser>> {
        console.log("signup_username:", username);
        console.log("signup_password:", password);
        console.log("API_URL:", `${this.apiServerUrl}/api/v1/auth/signup`);
        return this.http.post<IUser>(
            `${this.apiServerUrl}/api/v1/auth/signup`,
            {name, username, password},
            {headers: this.header1, observe: 'response'},
        );
    }

    logout(): void {
        this.tokenService.clearToken();
    }
}

