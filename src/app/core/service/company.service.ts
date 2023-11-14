import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "../interfaces/company";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient
    ) { }

    public getCompanies(): Observable<Company[]> {
        return this.http.get<Company[]>(`${this.apiServerUrl}/api/v1/companies/all`);
    }

    public getCompany(id: number): Observable<Company> {
        return this.http.get<Company>(`${this.apiServerUrl}/api/v1/companies/find/${id}`);
    }

    public addCompany(role: Company): Observable<Company> {
        return this.http.post<Company>(`${this.apiServerUrl}/api/v1/companies/add`, role);
    }

    public updateCompany(role: Company): Observable<Company> {
        return this.http.put<Company>(`${this.apiServerUrl}/api/v1/companies/update`, role);
    }

    public deleteCompany(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/companies/delete/${id}`);
    }
}
