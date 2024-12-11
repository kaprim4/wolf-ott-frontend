import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {TokenService} from "./token.service";
import {IUser} from "../models/user";
import {IToken} from "../models/token";
import {LoggingService} from "../../services/logging.service";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

    private apiServerUrl = `${environment.apiBaseUrl}/api/v1/auth`;
    private header1: HttpHeaders;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService,
        private loggingService: LoggingService
    ) {
        this.header1 = new HttpHeaders();
        this.header1 = this.header1.append('Content-Type', 'application/json');
    }

    validatePassword(username: string, password: string): Observable<HttpResponse<boolean>> {
        return this.http.post<boolean>(
            `${this.apiServerUrl}/login`,
            {username, password},
            {headers: this.header1, observe: 'response'},
        );
    }

    login(username: string, password: string): Observable<HttpResponse<IToken>> {
        return this.http.post<IToken>(
            `${this.apiServerUrl}/login`,
            {username, password},
            {headers: this.header1, observe: 'response'},
        );
    }

    signup(name: string, username: string, password: string): Observable<HttpResponse<IUser>> {
        this.loggingService.log("signup_username:", username);
        this.loggingService.log("signup_password:", password);
        this.loggingService.log("API_URL:", `${this.apiServerUrl}/signup`);
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

