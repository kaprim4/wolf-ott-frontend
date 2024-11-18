import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { map, Observable, tap } from 'rxjs';
import { Page } from '../models/page';
import { Params } from '../models/params';

@Injectable({
  providedIn: 'root'
})
export class ParamsService extends CrudService<Params> {

  constructor(httpClient: HttpClient, jwtService: JwtService) {
    super(httpClient, jwtService);
    this.endpoint = 'parameters';
}

public getAllParams<T extends Params>(search?: string): Observable<T[]> {
  return this.getAllAsList<T>(search || "").pipe(
      map((users: (Params | T)[]) => users as T[]) // Type assertion
  );
}

public getParams<T extends Params>(search: string, page: number, size: number): Observable<Page<T>> {
  return this.getAllAsPage<T>(search, page, size).pipe(
      map((page: Page<Params>) => ({
          ...page,
          content: page.content as T[] // Type assertion
      }))
  );
}

public getParam<T extends Params>(id_param: number): Observable<T> {
  return this.getOneById(id_param).pipe(map(res => res.body as T));
}

public getParamByKey<T extends Params>(key_param: string): Observable<T> {
  const url = `${this.apiBaseUrl}/api/v1/${this.endpoint}/@${key_param}`
  return this.httpClient.get<T>(url, {headers: this.headers}).pipe(map(res => res as T));
}

public addParam(param: Params): Observable<Params> {
  return this.add(param).pipe(map(res => res.body as Params));
}

public updateParam(param: Params): Observable<Params> {
  return this.update(param.id, param).pipe(map(res => res.body as Params));
}

public deleteParam(id: number): Observable<HttpResponse<void>> {
  return this.delete<void>(id);
}
}
