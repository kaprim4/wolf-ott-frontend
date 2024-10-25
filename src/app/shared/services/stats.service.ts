// stats.service.ts
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IDashboardStat} from "../models/stats";

@Injectable({
    providedIn: 'root'
})
export class StatsService {

    private apiUrl = 'https://wolfott.tech/wolfs1337/api';
    private readonly header1: HttpHeaders;

    constructor(
        private http: HttpClient
    ) {
        this.header1 = new HttpHeaders();
        this.header1 = this.header1.append('Content-Type', 'application/json');
    }

    getStats(action:string): Observable<HttpResponse<IDashboardStat>> {
        return this.http.get<IDashboardStat>(
            `${this.apiUrl}?action=${action}`,
            {headers: this.header1, observe: 'response'},
        );
    }
}
