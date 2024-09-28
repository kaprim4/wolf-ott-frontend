import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

// types
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ILine} from "../interfaces/line";
import {TokenService} from "./token.service";
import {Page} from "../interfaces/formType";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class LineService {

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

    public getAllLines(search: string): Observable<Array<ILine>> {
        return this.http.get<Array<ILine>>(`${this.apiServerUrl}/api/v1/lines/list`, {
            params: {
                search: search,
            },
            observe: 'response'
        }).pipe(
            map((response: HttpResponse<Array<ILine>>) => {
                return response.body as Array<ILine>;  // Extract the page body
            })
        );
    }
    
    public getLines(search: string, page: number, size: number): Observable<Page<ILine>> {
        return this.http.get<Page<ILine>>(`${this.apiServerUrl}/api/v1/lines`, {
            params: {
                search: search,
                page: page.toString(),
                size: size.toString(),
            },
            observe: 'response'
        }).pipe(
            map((response: HttpResponse<Page<ILine>>) => {
                return response.body as Page<ILine>;  // Extract the page body
            })
        );
    }

    public getLine(id_line: number): Observable<HttpResponse<ILine>> {
        return this.http.get<ILine>(
            `${this.apiServerUrl}/api/v1/lines/${id_line}`,
            {headers: this.header1, observe: 'response'},
        );
    }

    public addLine(line1: ILine): Observable<HttpResponse<ILine>> {
        return this.http.post<ILine>(
            `${this.apiServerUrl}/api/v1/lines`, line1,
            {headers: this.header1, observe: 'response'},
        );
    }

    public updateLine(line1: ILine): Observable<HttpResponse<ILine>> {
        return this.http.put<ILine>(
            `${this.apiServerUrl}/api/v1/lines/update`, line1,
            {headers: this.header1, observe: 'response'},
        );
    }

    public deleteLine(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(
            `${this.apiServerUrl}/api/v1/lines/delete/${id}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
