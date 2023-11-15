import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {GasStationVoucher} from "../interfaces/gas_station_voucher";

@Injectable({
  providedIn: 'root'
})
export class GasStationVoucherService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) {

    }

    public getGasStationVouchers(): Observable<GasStationVoucher[]> | null {
            if (this.tokenService.isLogged() && this.tokenService.getToken()) {
                return this.http.get<GasStationVoucher[]>(
                    `${this.apiServerUrl}/api/v1/gas-station-voucher/all`,
                    {
                        headers:{
                            Authorization: `Bearer ${this.tokenService.getToken()}`
                        }
                    }
                );
            }
        return null;
    }

    public getGasStationVoucher(id: number): Observable<GasStationVoucher> {
        return this.http.get<GasStationVoucher>(`${this.apiServerUrl}/api/v1/gas-station-voucher/find/${id}`);
    }

    public addGasStationVoucher(gasStationTemp: GasStationVoucher): Observable<GasStationVoucher> {
        return this.http.post<GasStationVoucher>(`${this.apiServerUrl}/api/v1/gas-station-voucher/add`, gasStationTemp);
    }

    public updateGasStationVoucher(gasStationTemp: GasStationVoucher): Observable<GasStationVoucher> {
        return this.http.put<GasStationVoucher>(`${this.apiServerUrl}/api/v1/gas-station-voucher/update`, gasStationTemp);
    }

    public deleteGasStationVoucher(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/gas-station-voucher/delete/${id}`);
    }
}
