import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VoucherType} from "../interfaces/voucher";

@Injectable({
    providedIn: 'root'
})
export class VoucherTypeService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient
    ) { }

    public getVoucherTypes(): Observable<VoucherType[]> {
        return this.http.get<VoucherType[]>(`${this.apiServerUrl}/api/v1/voucher-types/all`);
    }

    public getVoucherType(id: number): Observable<VoucherType> {
        return this.http.get<VoucherType>(`${this.apiServerUrl}/api/v1/voucher-types/find/${id}`);
    }

    public addVoucherType(voucherType: VoucherType): Observable<VoucherType> {
        return this.http.post<VoucherType>(`${this.apiServerUrl}/api/v1/voucher-types/add`, voucherType);
    }

    public updateVoucherType(voucherType: VoucherType): Observable<VoucherType> {
        return this.http.put<VoucherType>(`${this.apiServerUrl}/api/v1/voucher-types/update`, voucherType);
    }

    public deleteVoucherType(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/api/v1/voucher-types/delete/${id}`);
    }
}
