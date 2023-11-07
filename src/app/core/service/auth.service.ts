import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthResponse, AuthUser, TokenDecoded} from '../models/auth.models';
import {environment} from "../../../environments/environment";
import {jwtDecode} from "jwt-decode";


@Injectable({providedIn: 'root'})
export class AuthenticationService {

    private apiServerUrl = environment.apiBaseUrl;
    authUser: AuthUser | null = null;
    logged_user: AuthUser = JSON.parse(sessionStorage.getItem('currentUser')!);

    constructor(private http: HttpClient) {
        if (this.logged_user && this.logged_user.token) {
            let jwt_token = this.getDecodedAccessToken(this.logged_user.token);
            let user_exp = jwt_token.exp.toString();
            let now = new Date().getTime() / 1000;
            if (now > parseInt(user_exp)) {
                this.logout();
            } else {
                this.subscribeLoggedUser(this.logged_user.token);
            }
        }
    }

    public currentUser(): AuthUser | null {
        if (!this.authUser) {
            this.authUser = this.logged_user;
        }
        return this.authUser;
    }

    login(username: string, password: string): Observable<AuthResponse> | null {
        return this.http.post<AuthResponse>(`${this.apiServerUrl}/api/v1/auth/signin`, {username, password})
            .pipe(map(response => {
                if (response && response.token) {
                    console.log(response.token);
                    this.subscribeLoggedUser(response.token);
                }
                return response;
            }));
    }

    signup(name: string, username: string, password: string): Observable<AuthUser> {
        return this.http.post<AuthUser>(`${this.apiServerUrl}/api/v1/auth/signup`, {name, username, password})
            .pipe(map(authUser => this.authUser = authUser));

    }

    logout(): void {
        // remove user from session storage to log user out
        sessionStorage.removeItem('currentUser');
        this.authUser = null;
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwtDecode(token);
        } catch (Error) {
            return null;
        }
    }

    subscribeLoggedUser(_token: string): void {
        let token: TokenDecoded = this.getDecodedAccessToken(_token);
        console.log("login token:", token);
        let authUser: AuthUser = {
            id: token.id,
            username: token.username,
            firstName: token.firstName,
            lastName: token.lastName,
            email: token.email,
            gas_station_id: token.gas_station_id,
            gas_station_code_sap: token.gas_station_code_sap,
            token: _token,
        }
        this.authUser = authUser;
        sessionStorage.setItem('currentUser', JSON.stringify(authUser));
    }
}

