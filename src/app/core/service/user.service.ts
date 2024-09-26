import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

// types
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IUser} from "../interfaces/user";
import {TokenService} from "./token.service";
import {Page} from "../interfaces/formType";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class UserService {

    private apiServerUrl = environment.apiBaseUrl;
    private header1: HttpHeaders;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) {
        this.header1 = new HttpHeaders();
        this.header1 = this.header1.append('Content-Type', 'application/json');
        this.header1 = this.header1.append('Authorization', `Bearer ${this.tokenService.getToken()}`);
    }

    public getUsers(search: string, page: number, size: number): Observable<Page<IUser>> {
        return this.http.get<Page<IUser>>(`${this.apiServerUrl}/api/v1/users`, {
            params: {
                search: search,
                page: page.toString(),
                size: size.toString(),
            },
            observe: 'response'
        }).pipe(
            map((response: HttpResponse<Page<IUser>>) => {
                return response.body as Page<IUser>;  // Extract the page body
            })
        );
    }

    public getUser(id_user: number): Observable<HttpResponse<IUser>> {
        return this.http.get<IUser>(
            `${this.apiServerUrl}/api/v1/users/${id_user}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addUser(user1: IUser): Observable<HttpResponse<IUser>> {
        return this.http.post<IUser>(
            `${this.apiServerUrl}/api/v1/users`, user1,
            {headers: this.header1, observe: 'response'},
        );
    }

    public updateUser(user1: IUser): Observable<HttpResponse<IUser>> {
        return this.http.put<IUser>(
            `${this.apiServerUrl}/api/v1/users/update`, user1,
            {headers: this.header1, observe: 'response'},
        );
    }

    public deleteUser(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(
            `${this.apiServerUrl}/api/v1/users/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
