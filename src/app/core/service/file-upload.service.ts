import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {TokenService} from "./token.service";
import {GasStation} from "../interfaces/gas_station";

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

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

    upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.request(
            new HttpRequest('POST', `${this.apiServerUrl}/api/v1/storage/upload`, formData, {
                reportProgress: true,
                responseType: 'json',
            })
        );
    }

    getFile(file_id: String): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.apiServerUrl}/api/v1/storage/files/${file_id}`,
            {headers: this.header1, observe: 'response'},
        )
    }

    getFiles(): Observable<HttpResponse<any>> {
        return this.http.get(
            `${this.apiServerUrl}/api/v1/storage/files`,
            {headers: this.header1, observe: 'response'},
        )
    }
}
