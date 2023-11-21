import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "../interfaces/company";
import {TokenService} from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

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

    public getCompanies(): Observable<HttpResponse<Company[]>> {
        return this.http.get<Company[]>(
            `${this.apiServerUrl}/api/v1/companies/all`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getCompany(id: number): Observable<HttpResponse<Company>> {
        return this.http.get<Company>(
            `${this.apiServerUrl}/api/v1/companies/find/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addCompany(role: Company): Observable<HttpResponse<Company>> {
        return this.http.post<Company>(
            `${this.apiServerUrl}/api/v1/companies/add`, role,
            {headers: this.header1, observe: 'response'},
        );
    }

    public updateCompany(role: Company): Observable<HttpResponse<Company>> {
        return this.http.put<Company>(
            `${this.apiServerUrl}/api/v1/companies/update`, role,
            {headers: this.header1, observe: 'response'},
        );
    }

    public deleteCompany(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(
            `${this.apiServerUrl}/api/v1/companies/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
