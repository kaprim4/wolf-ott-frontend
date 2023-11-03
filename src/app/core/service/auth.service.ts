import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {loggedInUser} from '../helpers/utils';
import {AuthResponse, TokenDecoded, User} from '../models/auth.models';
import {environment} from "../../../environments/environment";
import {jwtDecode} from "jwt-decode";


@Injectable({providedIn: 'root'})
export class AuthenticationService {

    private apiServerUrl = environment.apiBaseUrl;
    user: User | null = null;

    constructor(private http: HttpClient) {

    }

    public currentUser(): User | null {
        if (!this.user) {
            this.user = loggedInUser();
        }
        return this.user;
    }

    login(username: string, password: string): Observable<AuthResponse> | null {
        return this.http.post<AuthResponse>(`${this.apiServerUrl}/api/v1/auth/signin`, {username, password})
            .pipe(map(response => {
                if(response && response.token){
                    console.log(response.token);
                    let token:TokenDecoded = this.getDecodedAccessToken(response.token);
                    console.log(token);
                    let user:User = {
                        id:token.id,
                        username:token.username,
                        firstName:token.firstName,
                        lastName:token.lastName,
                        email:token.email,
                        gas_station_id:token.gas_station_id,
                        gas_station_code_sap:token.gas_station_code_sap,
                        token:response.token,
                    }
                    this.user = user;
                    // store user details and jwt in session
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                }
                return response;
            }));
    }

    signup(name: string, username: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.apiServerUrl}/api/v1/auth/signup`, {name, username, password})
            .pipe(map(user => this.user = user));

    }

    logout(): void {
        // remove user from session storage to log user out
        sessionStorage.removeItem('currentUser');
        this.user = null;
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwtDecode(token);
        } catch (Error) {
            return null;
        }
    }
}

