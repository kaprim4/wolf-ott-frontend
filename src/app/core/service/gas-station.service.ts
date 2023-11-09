import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
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

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) {

    }

    public getGasStations(): Observable<GasStation[]> | null {
            if (this.tokenService.isLogged() && this.tokenService.getToken()) {
                return this.http.get<GasStation[]>(
                    `${this.apiServerUrl}/api/v1/gas_stations/all`,
                    {
                        headers:{
                            Authorization: `Bearer ${this.tokenService.getToken()}`
                        }
                    }
                );
            }
        return null;
    }

    public getGasStation(id: number): Observable<GasStation> {
        return this.http.get<GasStation>(`${this.apiServerUrl}/api/v1/gas_stations/find/${id}`);
    }

    public addGasStation(gasStation: GasStation): Observable<GasStation> {
        return this.http.post<GasStation>(`${this.apiServerUrl}/api/v1/gas_stations/add`, gasStation);
    }

    public updateGasStation(gasStation: GasStation): Observable<GasStation> {
        return this.http.put<GasStation>(`${this.apiServerUrl}/api/v1/gas_stations/update`, gasStation);
    }

    public deleteGasStation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/gas_stations/delete/${id}`);
    }
}
