import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {City} from "../interfaces/city";
import {TokenService} from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class CityService {

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

    public getCities(): Observable<HttpResponse<City[]>> {
        return this.http.get<City[]>(
            `${this.apiServerUrl}/api/v1/cities/all`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getCity(id: number): Observable<HttpResponse<City>> {
        return this.http.get<City>(
            `${this.apiServerUrl}/api/v1/cities/find/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addCity(role: City): Observable<HttpResponse<City>> {
        return this.http.post<City>(
            `${this.apiServerUrl}/api/v1/cities/add`, role,
            {headers: this.header1, observe: 'response'},
        );
    }

    public updateCity(role: City): Observable<HttpResponse<City>> {
        return this.http.put<City>(
            `${this.apiServerUrl}/api/v1/cities/update`, role,
            {headers: this.header1, observe: 'response'},
        );
    }

    public deleteCity(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(
            `${this.apiServerUrl}/api/v1/cities/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
