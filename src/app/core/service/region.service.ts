import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Region} from "../interfaces/region";

@Injectable({
    providedIn: 'root'
})
export class RegionService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient
    ) { }

    public getRegions(): Observable<Region[]> {
        return this.http.get<Region[]>(`${this.apiServerUrl}/api/v1/regions/all`);
    }

    public getRegion(id: number): Observable<Region> {
        return this.http.get<Region>(`${this.apiServerUrl}/api/v1/regions/find/${id}`);
    }

    public addRegion(role: Region): Observable<Region> {
        return this.http.post<Region>(`${this.apiServerUrl}/api/v1/regions/add`, role);
    }

    public updateRegion(role: Region): Observable<Region> {
        return this.http.put<Region>(`${this.apiServerUrl}/api/v1/regions/update`, role);
    }

    public deleteRegion(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/regions/delete/${id}`);
    }
}
