import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// types
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IUser, IUserSubmit} from "../interfaces/user";
import {AuthenticationService} from "./auth.service";
import {TokenService} from "./token.service";

@Injectable({providedIn: 'root'})
export class UserService {

    private apiServerUrl = environment.apiBaseUrl;
    user: IUser | null = null;

    constructor(
        private http: HttpClient,
        private authService: AuthenticationService,
        private tokenService: TokenService,
    ) { }

    public getUsers(): Observable<IUser[]> | null {
        if (this.tokenService.isLogged() && this.tokenService.getToken()) {
            return this.http.get<IUser[]>(
                `${this.apiServerUrl}/api/v1/users/all`,
                {
                    headers:{
                        Authorization: `Bearer ${this.tokenService.getToken()}`
                    }
                }
            );
        }
        return null;
    }

    public getUser(id_user: number): Observable<IUserSubmit> {
        return this.http.get<IUserSubmit>(`${this.apiServerUrl}/api/v1/users/find/${id_user}`);
    }

    public addUser(user1: IUserSubmit): Observable<IUser> {
        return this.http.post<IUser>(`${this.apiServerUrl}/api/v1/users/add`, user1);
    }

    public updateUser(user1: IUserSubmit): Observable<IUser> {
        return this.http.put<IUser>(`${this.apiServerUrl}/api/v1/users/update`, user1);
    }

    public deleteUser(id_user: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/users/delete/${id_user}`);
    }
}
