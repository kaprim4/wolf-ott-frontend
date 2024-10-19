import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { IMag } from '../models/mag';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { map, Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class MagService extends CrudService<IMag> {
  constructor(
    httpClient: HttpClient,
    jwtService: JwtService
) {
    super(httpClient, jwtService);
    this.endpoint = "devices/mag";
}

  public getAllMags<T extends IMag>(search?: string): Observable<T[]> {
    return this.getAllAsList<T>(search || "").pipe(
        map((mags: (IMag | T)[]) => mags as T[]) // Type assertion
    );
}

public getMags<T extends IMag>(search: string, page: number, size: number): Observable<Page<T>> {
    return this.getAllAsPage<T>(search, page, size).pipe(
        map((page: Page<IMag>) => ({
            ...page,
            content: page.content as T[] // Type assertion
        }))
    );
}

public getMag<T extends IMag>(id_mag: number): Observable<T> {
    return this.getOneById(id_mag).pipe(
        map(res => res.body as T)
    );
}

public addMag(mag: IMag): Observable<HttpResponse<IMag>> {
    return this.add(mag);
}

public updateMag(mag: IMag): Observable<HttpResponse<IMag>> {
    return this.update(mag.id, mag);
}

public deleteMag(id: number): Observable<HttpResponse<void>> {
    return this.delete<void>(id);
}
}
