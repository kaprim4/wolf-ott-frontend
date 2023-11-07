import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// types
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../models/user.models";
import {GasStation} from "../models/gas_station.models";
import {AuthUser} from "../models/auth.models";

@Injectable({providedIn: 'root'})
export class UserService {

    private apiServerUrl = environment.apiBaseUrl;
    user: AuthUser | null = null;
    logged_user = JSON.parse(sessionStorage.getItem('currentUser')!);

    constructor(private http: HttpClient) {

    }

    public currentUser(): AuthUser | null {
        if (!this.user) {
            this.user = this.logged_user;
        }
        return this.user;
    }

    public getUsers(): Observable<User[]> | null {
        if (this.currentUser() && this.currentUser()?.token) {
            //console.log(this.currentUser()?.token)
            return this.http.get<User[]>(
                `${this.apiServerUrl}/api/v1/users/all`,
                {
                    headers:{
                        Authorization: `Bearer ${this.currentUser()?.token}`
                    }
                }
            );
        }
        return null;
    }

    public getUser(id_user: number): Observable<User> {
        return this.http.get<User>(`${this.apiServerUrl}/api/v1/users/find/${id_user}`);
    }

    public addUser(user1: User): Observable<User> {
        return this.http.post<User>(`${this.apiServerUrl}/api/v1/users/add`, user1);
    }

    public updateUser(user1: User): Observable<User> {
        return this.http.put<User>(`${this.apiServerUrl}/api/v1/users/update`, user1);
    }

    public deleteUser(id_user: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/users/delete/${id_user}`);
    }
}
