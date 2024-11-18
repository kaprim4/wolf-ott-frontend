import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Apps } from '../models/apps';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { map, Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
    providedIn: 'root',
})
export class AppsService extends CrudService<Apps> {
    constructor(httpClient: HttpClient, jwtService: JwtService) {
        super(httpClient, jwtService);
        this.endpoint = 'applications';
    }

    public getAllApps<T extends Apps>(search?: string): Observable<T[]> {
      return this.getAllAsList<T>(search || "").pipe(
          map((users: (Apps | T)[]) => users as T[]) // Type assertion
      );
  }

  public getApps<T extends Apps>(search: string, page: number, size: number): Observable<Page<T>> {
      return this.getAllAsPage<T>(search, page, size).pipe(
          map((page: Page<Apps>) => ({
              ...page,
              content: page.content as T[] // Type assertion
          }))
      );
  }

  public getApp<T extends Apps>(id_user: number): Observable<T> {
      return this.getOneById(id_user).pipe(map(res => res.body as T));
  }

  public addApp(user: Apps): Observable<HttpResponse<Apps>> {
      return this.add(user);
  }

  public updateApp(user: Apps): Observable<HttpResponse<Apps>> {
      return this.update(user.id, user);
  }

  public deleteApp(id: number): Observable<HttpResponse<void>> {
      return this.delete<void>(id);
  }
}
