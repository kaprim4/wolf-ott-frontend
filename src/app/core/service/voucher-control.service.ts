import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {VoucherControl} from "../interfaces/voucher";

@Injectable({
  providedIn: 'root'
})
export class VoucherControlService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) {

    }

    public getVoucherControls(): Observable<VoucherControl[]> | null {
            if (this.tokenService.isLogged() && this.tokenService.getToken()) {
                return this.http.get<VoucherControl[]>(
                    `${this.apiServerUrl}/api/v1/vouchers-control/all`,
                    {
                        headers:{
                            Authorization: `Bearer ${this.tokenService.getToken()}`
                        }
                    }
                );
            }
        return null;
    }

    public getVoucherControl(id: number): Observable<VoucherControl> {
        return this.http.get<VoucherControl>(`${this.apiServerUrl}/api/v1/vouchers-control/find/${id}`);
    }

    public getVoucherControlByVoucherNumber(voucherNumber: string): Observable<VoucherControl> {
        return this.http.get<VoucherControl>(`${this.apiServerUrl}/api/v1/vouchers-control/find/number/${voucherNumber}`);
    }

    public addVoucherControl(voucherControl: VoucherControl): Observable<VoucherControl> {
        return this.http.post<VoucherControl>(`${this.apiServerUrl}/api/v1/vouchers-control/add`, voucherControl);
    }

    public updateVoucherControl(voucherControl: VoucherControl): Observable<VoucherControl> {
        return this.http.put<VoucherControl>(`${this.apiServerUrl}/api/v1/vouchers-control/update`, voucherControl);
    }

    public deleteVoucherControl(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/vouchers-control/delete/${id}`);
    }
}
