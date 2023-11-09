import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {Role} from "../interfaces/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) {

    }

    public getRoles(): Observable<Role[]> | null {
            if (this.tokenService.isLogged() && this.tokenService.getToken()) {
                return this.http.get<Role[]>(
                    `${this.apiServerUrl}/api/v1/roles/all`,
                    {
                        headers:{
                            Authorization: `Bearer ${this.tokenService.getToken()}`
                        }
                    }
                );
            }
        return null;
    }

    public getRole(id: number): Observable<Role> {
        return this.http.get<Role>(`${this.apiServerUrl}/api/v1/roles/find/${id}`);
    }

    public addRole(role: Role): Observable<Role> {
        return this.http.post<Role>(`${this.apiServerUrl}/api/v1/roles/add`, role);
    }

    public updateRole(role: Role): Observable<Role> {
        return this.http.put<Role>(`${this.apiServerUrl}/api/v1/roles/update`, role);
    }

    public deleteRole(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/roles/delete/${id}`);
    }
}
