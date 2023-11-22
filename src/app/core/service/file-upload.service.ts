import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    private baseUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient
    ) {
    }

    upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.request(
            new HttpRequest('POST', `${this.baseUrl}/api/v1/voucher-types/upload`, formData, {
                reportProgress: true,
                responseType: 'json',
            })
        );
    }

    getFiles(): Observable<any> {
        return this.http.get(`${this.baseUrl}/api/v1/voucher-types/files`);
    }
}
