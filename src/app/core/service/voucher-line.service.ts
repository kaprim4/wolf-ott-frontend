import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {VoucherLine} from "../interfaces/voucher";

@Injectable({
    providedIn: 'root'
})
export class VoucherLineService {

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

    public getVoucherLines(): Observable<HttpResponse<VoucherLine[]>> {
        return this.http.get<VoucherLine[]>(
            `${this.apiServerUrl}/api/v1/voucher-line/all`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherLineStatistics(): Observable<HttpResponse<[]>> {
        return this.http.get<[]>(
            `${this.apiServerUrl}/api/v1/voucher-line/find/sum`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherLine(id: number): Observable<HttpResponse<VoucherLine>> {
        return this.http.get<VoucherLine>(
            `${this.apiServerUrl}/api/v1/voucher-line/find/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addVoucherLine(voucherTemp: VoucherLine): Observable<HttpResponse<VoucherLine>> {
        return this.http.post<VoucherLine>(`${this.apiServerUrl}/api/v1/voucher-line/add`,
            voucherTemp,
            {headers: this.header1, observe: 'response'},);
    }

    public updateVoucherLine(voucherTemp: VoucherLine): Observable<HttpResponse<VoucherLine>> {
        return this.http.put<VoucherLine>(`${this.apiServerUrl}/api/v1/voucher-line/update`, voucherTemp,
            {headers: this.header1, observe: 'response'},);
    }

    public deleteVoucherLine(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/voucher-line/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
