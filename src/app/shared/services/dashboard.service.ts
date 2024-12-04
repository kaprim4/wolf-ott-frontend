import { Injectable } from '@angular/core';
import { IDashboardStat } from '../models/stats';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl:string;

  constructor(private httpClient: HttpClient,
  ) {
    this.baseUrl = environment.apiBaseUrl
  }

  public getGlobalStates(): Observable<any> {
    return this.httpClient.get<HttpResponse<any>>(`${this.baseUrl}/api/v1/dashboard/global-state`);
  }
}
