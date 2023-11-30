import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {VoucherTemp} from "../interfaces/voucher";

@Injectable({
    providedIn: 'root'
})
export class VoucherTempService {

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

    public getVoucherTemps(): Observable<HttpResponse<VoucherTemp[]>> {
        return this.http.get<VoucherTemp[]>(
            `${this.apiServerUrl}/api/v1/vouchers-temp/all`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherTempStatistics(voucherHeader_id: number): Observable<HttpResponse<[]>> {
        return this.http.get<[]>(
            `${this.apiServerUrl}/api/v1/vouchers-temp/find/sum/${voucherHeader_id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherTemp(id: number): Observable<HttpResponse<VoucherTemp>> {
        return this.http.get<VoucherTemp>(
            `${this.apiServerUrl}/api/v1/vouchers-temp/find/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherTempByVoucherNumber(voucherNumber: string): Observable<HttpResponse<VoucherTemp>> {
        return this.http.get<VoucherTemp>(
            `${this.apiServerUrl}/api/v1/vouchers-temp/find/number/${voucherNumber}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherTempByHeader(header_id: number): Observable<HttpResponse<VoucherTemp>> {
        return this.http.get<VoucherTemp>(
            `${this.apiServerUrl}/api/v1/vouchers-temp/find/header/${header_id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addVoucherTemp(voucherTemp: VoucherTemp): Observable<HttpResponse<VoucherTemp>> {
        return this.http.post<VoucherTemp>(`${this.apiServerUrl}/api/v1/vouchers-temp/add`,
            voucherTemp,
            {headers: this.header1, observe: 'response'},);
    }

    public updateVoucherTemp(voucherTemp: VoucherTemp): Observable<HttpResponse<VoucherTemp>> {
        return this.http.put<VoucherTemp>(`${this.apiServerUrl}/api/v1/vouchers-temp/update`, voucherTemp,
            {headers: this.header1, observe: 'response'},);
    }

    public deleteVoucherTemp(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/vouchers-temp/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
