import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {VoucherTemp} from "../interfaces/voucher";

@Injectable({
  providedIn: 'root'
})
export class VoucherTempService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) {

    }

    public getVoucherTemps(): Observable<VoucherTemp[]> | null {
            if (this.tokenService.isLogged() && this.tokenService.getToken()) {
                return this.http.get<VoucherTemp[]>(
                    `${this.apiServerUrl}/api/v1/vouchers-temp/all`,
                    {
                        headers:{
                            Authorization: `Bearer ${this.tokenService.getToken()}`
                        }
                    }
                );
            }
        return null;
    }

    public getVoucherTemp(id: number): Observable<VoucherTemp> {
        return this.http.get<VoucherTemp>(`${this.apiServerUrl}/api/v1/vouchers-temp/find/${id}`);
    }

    public getVoucherTempByVoucherNumber(voucherNumber: string): Observable<VoucherTemp> {
        return this.http.get<VoucherTemp>(`${this.apiServerUrl}/api/v1/vouchers-temp/find/number/${voucherNumber}`);
    }

    public addVoucherTemp(voucherTemp: VoucherTemp): Observable<VoucherTemp> {
        return this.http.post<VoucherTemp>(`${this.apiServerUrl}/api/v1/vouchers-temp/add`, voucherTemp);
    }

    public updateVoucherTemp(voucherTemp: VoucherTemp): Observable<VoucherTemp> {
        return this.http.put<VoucherTemp>(`${this.apiServerUrl}/api/v1/vouchers-temp/update`, voucherTemp);
    }

    public deleteVoucherTemp(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/vouchers-temp/delete/${id}`);
    }
}
