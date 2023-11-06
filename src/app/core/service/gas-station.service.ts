import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GasStation} from "../models/gas_station.models";
import {User} from "../models/user.models";
import {loggedInUser} from "../helpers/utils";

@Injectable({
  providedIn: 'root'
})
export class GasStationService {

    private apiServerUrl = environment.apiBaseUrl;
    user: User | null = null;

    constructor(private http: HttpClient) {

    }

    public currentUser(): User | null {
        if (!this.user) {
            this.user = loggedInUser();
        }
        return this.user;
    }

    public getGasStations(): Observable<GasStation[]> | null {
            if (this.currentUser() && this.currentUser()?.token) {
                return this.http.get<GasStation[]>(
                    `${this.apiServerUrl}/api/v1/gas_stations/all`,
                    {
                        headers:{
                            Authorization: `Bearer ${this.currentUser()?.token}`
                        }
                    }
                );
            }
        return null;
    }

    public getGasStation(id_gasStation: number): Observable<GasStation> {
        return this.http.get<GasStation>(`${this.apiServerUrl}/api/v1/gas_stations/find/${id_gasStation}`);
    }

    public addGasStation(gasStation1: GasStation): Observable<GasStation> {
        return this.http.post<GasStation>(`${this.apiServerUrl}/api/v1/gas_stations/add`, gasStation1);
    }

    public updateGasStation(gasStation1: GasStation): Observable<GasStation> {
        return this.http.put<GasStation>(`${this.apiServerUrl}/api/v1/gas_stations/update`, gasStation1);
    }

    public deleteGasStation(id_gasStation: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/gas_stations/delete/${id_gasStation}`);
    }
}
