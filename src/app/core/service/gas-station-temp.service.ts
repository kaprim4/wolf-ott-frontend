import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {GasStationTemp} from "../interfaces/gas_station_temp";

@Injectable({
  providedIn: 'root'
})
export class GasStationTempService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) {

    }

    public getGasStationTemps(): Observable<GasStationTemp[]> | null {
            if (this.tokenService.isLogged() && this.tokenService.getToken()) {
                return this.http.get<GasStationTemp[]>(
                    `${this.apiServerUrl}/api/v1/gas-station-temp/all`,
                    {
                        headers:{
                            Authorization: `Bearer ${this.tokenService.getToken()}`
                        }
                    }
                );
            }
        return null;
    }

    public getGasStationTemp(id: number): Observable<GasStationTemp> {
        return this.http.get<GasStationTemp>(`${this.apiServerUrl}/api/v1/gas-station-temp/find/${id}`);
    }

    public addGasStationTemp(gasStationTemp: GasStationTemp): Observable<GasStationTemp> {
        return this.http.post<GasStationTemp>(`${this.apiServerUrl}/api/v1/gas-station-temp/add`, gasStationTemp);
    }

    public updateGasStationTemp(gasStationTemp: GasStationTemp): Observable<GasStationTemp> {
        return this.http.put<GasStationTemp>(`${this.apiServerUrl}/api/v1/gas-station-temp/update`, gasStationTemp);
    }

    public deleteGasStationTemp(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/gas-station-temp/delete/${id}`);
    }
}
