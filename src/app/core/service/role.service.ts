import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../interfaces/role";
import {TokenService} from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class RoleService {

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

    public getRoles(): Observable<HttpResponse<Role[]>> {
        return this.http.get<Role[]>(
            `${this.apiServerUrl}/api/v1/roles/all`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getRole(id: number): Observable<HttpResponse<Role>> {
        return this.http.get<Role>(
            `${this.apiServerUrl}/api/v1/roles/find/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addRole(role: Role): Observable<HttpResponse<Role>> {
        return this.http.post<Role>(
            `${this.apiServerUrl}/api/v1/roles/add`, role,
            {headers: this.header1, observe: 'response'},
        );
    }

    public updateRole(role: Role): Observable<HttpResponse<Role>> {
        return this.http.put<Role>(
            `${this.apiServerUrl}/api/v1/roles/update`, role,
            {headers: this.header1, observe: 'response'},
        );
    }

    public deleteRole(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(
            `${this.apiServerUrl}/api/v1/roles/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
