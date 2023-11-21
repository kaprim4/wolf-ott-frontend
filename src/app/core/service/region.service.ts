import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Region} from "../interfaces/region";
import {TokenService} from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class RegionService {

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

    public getRegions(): Observable<HttpResponse<Region[]>> {
        return this.http.get<Region[]>(
            `${this.apiServerUrl}/api/v1/regions/all`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getRegion(id: number): Observable<HttpResponse<Region>> {
        return this.http.get<Region>(
            `${this.apiServerUrl}/api/v1/regions/find/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addRegion(role: Region): Observable<HttpResponse<Region>> {
        return this.http.post<Region>(
            `${this.apiServerUrl}/api/v1/regions/add`, role,
            {headers: this.header1, observe: 'response'},
        );
    }

    public updateRegion(role: Region): Observable<HttpResponse<Region>> {
        return this.http.put<Region>(
            `${this.apiServerUrl}/api/v1/regions/update`, role,
            {headers: this.header1, observe: 'response'},
        );
    }

    public deleteRegion(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(
            `${this.apiServerUrl}/api/v1/regions/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
