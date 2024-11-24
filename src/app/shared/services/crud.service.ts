import {HttpHeaders, HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, map} from 'rxjs';
import {environment} from 'src/environments/environment';
import {JwtService} from './jwt.service';
import {Page} from '../models/page';

@Injectable({
    providedIn: 'root'
})
export abstract class CrudService<T> {

    protected apiBaseUrl = environment.apiBaseUrl;
    protected endpoint: string;
    protected headers: HttpHeaders;

    protected constructor(
        protected httpClient: HttpClient,
        protected jwtService: JwtService
    ) {
        
    }

    protected getAllAsList<Res>(search: string): Observable<Array<T | Res>> {
        return this.httpClient.get<Array<T | Res>>(`${this.apiBaseUrl}/api/v1/${this.endpoint}/list`, {
            headers: this.headers,
            params: {
                search: search,
            },
            observe: 'response'
        }).pipe(
            map((response: HttpResponse<Array<T | Res>>) => {
                return response.body as Array<T | Res>;  // Extract the page body
            })
        );
    }

    protected getAllAsList2<Res>(): Observable<Array<T | Res>> {
        return this.httpClient.get<Array<T | Res>>(`${this.apiBaseUrl}/api/v1/${this.endpoint}/list`, {
            headers: this.headers,
            observe: 'response'
        }).pipe(
            map((response: HttpResponse<Array<T | Res>>) => {
                return response.body as Array<T | Res>;  // Extract the page body
            })
        );
    }

    protected getAllAsPage<Res>(search: string, page: number, size: number): Observable<Page<T | Res>> {
        return this.httpClient.get<Page<T | Res>>(`${this.apiBaseUrl}/api/v1/${this.endpoint}`, {
            headers: this.headers,
            params: {
                search: search,
                page: page.toString(),
                size: size.toString(),
            },
            observe: 'response'
        }).pipe(
            map((response: HttpResponse<Page<T | Res>>) => {
                return response.body as Page<T | Res>;  // Extract the page body
            })
        );
    }

    protected getOneById<Res>(id: number): Observable<HttpResponse<T | Res>> {
        return this.httpClient.get<Res>(
            `${this.apiBaseUrl}/api/v1/${this.endpoint}/${id}`,
            {headers: this.headers, observe: 'response'},
        );
    }

    protected add<Res>(obj: T): Observable<HttpResponse<T | Res>> {
        return this.httpClient.post<T | Res>(
            `${this.apiBaseUrl}/api/v1/${this.endpoint}`, obj,
            {headers: this.headers, observe: 'response'},
        );
    }

    protected update<Res>(id: number, obj: T): Observable<HttpResponse<T | Res>> {
        return this.httpClient.put<T | Res>(
            `${this.apiBaseUrl}/api/v1/${this.endpoint}/${id}`, obj,
            {headers: this.headers, observe: 'response'},
        );
    }

    protected delete<Res>(id: number): Observable<HttpResponse<Res>> {
        return this.httpClient.delete<Res>(
            `${this.apiBaseUrl}/api/v1/${this.endpoint}/${id}`,
            {headers: this.headers, observe: 'response'},
        );
    }

    // get headers(): HttpHeaders{
    //     const headers = new HttpHeaders();
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Authorization', `Bearer ${this.jwtService.getAccessToken()}`);
    //     return headers;
    // }
}
