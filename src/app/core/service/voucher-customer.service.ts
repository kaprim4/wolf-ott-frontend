import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {VoucherCustomer} from "../interfaces/voucher";

@Injectable({
    providedIn: 'root'
})
export class VoucherCustomerService {

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

    public getVoucherCustomers(): Observable<HttpResponse<VoucherCustomer[]>> {
        return this.http.get<VoucherCustomer[]>(
            `${this.apiServerUrl}/api/v1/vouchers-customer/all`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherCustomer(id: number): Observable<HttpResponse<VoucherCustomer>> {
        return this.http.get<VoucherCustomer>(
            `${this.apiServerUrl}/api/v1/vouchers-customer/find/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addVoucherCustomer(voucherCustomer: VoucherCustomer): Observable<HttpResponse<VoucherCustomer>> {
        return this.http.post<VoucherCustomer>(
            `${this.apiServerUrl}/api/v1/vouchers-customer/add`, voucherCustomer,
            {headers: this.header1, observe: 'response'},
        );
    }

    public updateVoucherCustomer(voucherCustomer: VoucherCustomer): Observable<HttpResponse<VoucherCustomer>> {
        return this.http.put<VoucherCustomer>(
            `${this.apiServerUrl}/api/v1/vouchers-customer/update`, voucherCustomer,
            {headers: this.header1, observe: 'response'},
        );
    }

    public deleteVoucherCustomer(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(
            `${this.apiServerUrl}/api/v1/vouchers-customer/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
