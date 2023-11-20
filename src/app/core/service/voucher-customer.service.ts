import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {VoucherCustomer} from "../interfaces/voucher";

@Injectable({
  providedIn: 'root'
})
export class VoucherCustomerService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) {

    }

    public getVoucherCustomers(): Observable<VoucherCustomer[]> | null {
            if (this.tokenService.isLogged() && this.tokenService.getToken()) {
                return this.http.get<VoucherCustomer[]>(
                    `${this.apiServerUrl}/api/v1/vouchers-customer/all`,
                    {
                        headers:{
                            Authorization: `Bearer ${this.tokenService.getToken()}`
                        }
                    }
                );
            }
        return null;
    }

    public getVoucherCustomer(id: number): Observable<VoucherCustomer> {
        return this.http.get<VoucherCustomer>(`${this.apiServerUrl}/api/v1/vouchers-customer/find/${id}`);
    }

    public addVoucherCustomer(voucherCustomer: VoucherCustomer): Observable<VoucherCustomer> {
        return this.http.post<VoucherCustomer>(`${this.apiServerUrl}/api/v1/vouchers-customer/add`, voucherCustomer);
    }

    public updateVoucherCustomer(voucherCustomer: VoucherCustomer): Observable<VoucherCustomer> {
        return this.http.put<VoucherCustomer>(`${this.apiServerUrl}/api/v1/vouchers-customer/update`, voucherCustomer);
    }

    public deleteVoucherCustomer(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/vouchers-customer/delete/${id}`);
    }
}
