import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {VoucherHeader, VoucherResponseHeader} from "../interfaces/voucher";

@Injectable({
    providedIn: 'root'
})
export class VoucherHeaderService {

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

    public getVoucherHeaders(): Observable<HttpResponse<VoucherHeader[]>> {
        return this.http.get<VoucherHeader[]>(
            `${this.apiServerUrl}/api/v1/vouchers-header/all`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherHeaderStatistics(): Observable<HttpResponse<[]>> {
        return this.http.get<[]>(
            `${this.apiServerUrl}/api/v1/vouchers-header/find/sum`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherHeader(id: number): Observable<HttpResponse<VoucherHeader>> {
        return this.http.get<VoucherHeader>(
            `${this.apiServerUrl}/api/v1/vouchers-header/find/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherHeaderBySlipNumber(slipNumber: number): Observable<HttpResponse<VoucherHeader>> {
        return this.http.get<VoucherHeader>(
            `${this.apiServerUrl}/api/v1/vouchers-header/find/slip_number/${slipNumber}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getNextVoucherHeader(gasStation_id: number): Observable<HttpResponse<VoucherResponseHeader>> {
        return this.http.get<VoucherResponseHeader>(
            `${this.apiServerUrl}/api/v1/vouchers-header/find/next/${gasStation_id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addVoucherHeader(voucherHeader: VoucherHeader): Observable<HttpResponse<VoucherHeader>> {
        return this.http.post<VoucherHeader>(`${this.apiServerUrl}/api/v1/vouchers-header/add`,
            voucherHeader,
            {headers: this.header1, observe: 'response'},);
    }

    public updateVoucherHeader(voucherHeader: VoucherHeader): Observable<HttpResponse<VoucherHeader>> {
        return this.http.put<VoucherHeader>(`${this.apiServerUrl}/api/v1/vouchers-header/update`, voucherHeader,
            {headers: this.header1, observe: 'response'},);
    }

    public deleteVoucherHeader(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/vouchers-header/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
