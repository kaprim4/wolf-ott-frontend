import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {VoucherControl} from "../interfaces/voucher";

@Injectable({
    providedIn: 'root'
})
export class VoucherControlService {

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

    public getVoucherControls(): Observable<HttpResponse<VoucherControl[]>> {
        return this.http.get<VoucherControl[]>(
            `${this.apiServerUrl}/api/v1/vouchers-control/all`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherControl(id: number): Observable<HttpResponse<VoucherControl>> {
        return this.http.get<VoucherControl>(
            `${this.apiServerUrl}/api/v1/vouchers-control/find/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherControlByVoucherNumber(voucherNumber: string): Observable<HttpResponse<VoucherControl>> {
        return this.http.get<VoucherControl>(
            `${this.apiServerUrl}/api/v1/vouchers-control/find/number/${voucherNumber}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addVoucherControl(voucherControl: VoucherControl): Observable<HttpResponse<VoucherControl>> {
        return this.http.post<VoucherControl>(
            `${this.apiServerUrl}/api/v1/vouchers-control/add`, voucherControl,
            {headers: this.header1, observe: 'response'},
        );
    }

    public updateVoucherControl(voucherControl: VoucherControl): Observable<HttpResponse<VoucherControl>> {
        return this.http.put<VoucherControl>(
            `${this.apiServerUrl}/api/v1/vouchers-control/update`, voucherControl,
            {headers: this.header1, observe: 'response'},
        );
    }

    public deleteVoucherControl(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(
            `${this.apiServerUrl}/api/v1/vouchers-control/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
