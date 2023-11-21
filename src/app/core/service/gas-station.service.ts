import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../interfaces/user";
import {GasStation} from "../interfaces/gas_station";
import {AuthenticationService} from "./auth.service";
import {TokenService} from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class GasStationService {

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

    public getGasStations(): Observable<HttpResponse<GasStation[]>> {
        return this.http.get<GasStation[]>(
            `${this.apiServerUrl}/api/v1/gas_stations/all`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getGasStation(id: number): Observable<HttpResponse<GasStation>> {
        return this.http.get<GasStation>(
            `${this.apiServerUrl}/api/v1/gas_stations/find/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addGasStation(gasStation: GasStation): Observable<HttpResponse<GasStation>> {
        return this.http.post<GasStation>(
            `${this.apiServerUrl}/api/v1/gas_stations/add`, gasStation,
            {headers: this.header1, observe: 'response'},
        );
    }

    public updateGasStation(gasStation: GasStation): Observable<HttpResponse<GasStation>> {
        return this.http.put<GasStation>(
            `${this.apiServerUrl}/api/v1/gas_stations/update`, gasStation,
            {headers: this.header1, observe: 'response'},
        );
    }

    public deleteGasStation(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(
            `${this.apiServerUrl}/api/v1/gas_stations/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
