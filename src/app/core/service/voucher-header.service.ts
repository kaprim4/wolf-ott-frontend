import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {VoucherHeader} from "../interfaces/voucher";

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
            `${this.apiServerUrl}/api/v1/voucher-header/all`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherHeaderStatistics(): Observable<HttpResponse<[]>> {
        return this.http.get<[]>(
            `${this.apiServerUrl}/api/v1/voucher-header/find/sum`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherHeader(id: number): Observable<HttpResponse<VoucherHeader>> {
        return this.http.get<VoucherHeader>(
            `${this.apiServerUrl}/api/v1/voucher-header/find/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addVoucherHeader(voucherTemp: VoucherHeader): Observable<HttpResponse<VoucherHeader>> {
        return this.http.post<VoucherHeader>(`${this.apiServerUrl}/api/v1/voucher-header/add`,
            voucherTemp,
            {headers: this.header1, observe: 'response'},);
    }

    public updateVoucherHeader(voucherTemp: VoucherHeader): Observable<HttpResponse<VoucherHeader>> {
        return this.http.put<VoucherHeader>(`${this.apiServerUrl}/api/v1/voucher-header/update`, voucherTemp,
            {headers: this.header1, observe: 'response'},);
    }

    public deleteVoucherHeader(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/voucher-header/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
