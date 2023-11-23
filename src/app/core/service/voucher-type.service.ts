import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {VoucherType} from "../interfaces/voucher";
import {TokenService} from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class VoucherTypeService {

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

    public getVoucherTypes(): Observable<HttpResponse<VoucherType[]>> {
        return this.http.get<VoucherType[]>(
            `${this.apiServerUrl}/api/v1/vouchers-type/all`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public getVoucherType(id: number): Observable<HttpResponse<VoucherType>> {
        return this.http.get<VoucherType>(
            `${this.apiServerUrl}/api/v1/vouchers-type/find/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addVoucherType(voucherType: VoucherType): Observable<HttpResponse<VoucherType>> {
        return this.http.post<VoucherType>(
            `${this.apiServerUrl}/api/v1/vouchers-type/add`, voucherType,
            {headers: this.header1, observe: 'response'},
        );
    }

    public updateVoucherType(voucherType: VoucherType): Observable<HttpResponse<VoucherType>> {
        return this.http.put<VoucherType>(
            `${this.apiServerUrl}/api/v1/vouchers-type/update`, voucherType,
            {headers: this.header1, observe: 'response'},
        );
    }

    public deleteVoucherType(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(
            `${this.apiServerUrl}/api/v1/vouchers-type/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
