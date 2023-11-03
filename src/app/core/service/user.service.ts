import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// types
import {User} from '../models/auth.models';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserProfileService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {

    }

    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiServerUrl}/api/v1/users/all`);
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
