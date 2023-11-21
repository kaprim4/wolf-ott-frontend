import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Supervisor} from "../interfaces/supervisor";
import {TokenService} from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class SupervisorService {

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

    public getSupervisors(): Observable<HttpResponse<Supervisor[]>> {
        return this.http.get<Supervisor[]>(
            `${this.apiServerUrl}/api/v1/supervisors/all`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getSupervisor(id: number): Observable<HttpResponse<Supervisor>> {
        return this.http.get<Supervisor>(
            `${this.apiServerUrl}/api/v1/supervisors/find/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addSupervisor(supervisor: Supervisor): Observable<HttpResponse<Supervisor>> {
        return this.http.post<Supervisor>(
            `${this.apiServerUrl}/api/v1/supervisors/add`, supervisor,
            {headers: this.header1, observe: 'response'},
        );
    }

    public updateSupervisor(supervisor: Supervisor): Observable<HttpResponse<Supervisor>> {
        return this.http.put<Supervisor>(
            `${this.apiServerUrl}/api/v1/supervisors/update`, supervisor,
            {headers: this.header1, observe: 'response'},
        );
    }

    public deleteSupervisor(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(
            `${this.apiServerUrl}/api/v1/supervisors/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
