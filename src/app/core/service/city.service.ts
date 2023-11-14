import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {City} from "../interfaces/city";

@Injectable({
    providedIn: 'root'
})
export class CityService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient
    ) { }

    public getCities(): Observable<City[]> {
        return this.http.get<City[]>(`${this.apiServerUrl}/api/v1/cities/all`);
    }

    public getCity(id: number): Observable<City> {
        return this.http.get<City>(`${this.apiServerUrl}/api/v1/cities/find/${id}`);
    }

    public addCity(role: City): Observable<City> {
        return this.http.post<City>(`${this.apiServerUrl}/api/v1/cities/add`, role);
    }

    public updateCity(role: City): Observable<City> {
        return this.http.put<City>(`${this.apiServerUrl}/api/v1/cities/update`, role);
    }

    public deleteCity(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/cities/delete/${id}`);
    }
}
