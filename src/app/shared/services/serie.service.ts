import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ISerie } from '../models/serie';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { map, Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class SerieService extends CrudService<ISerie> {
  constructor(
    httpClient: HttpClient,
    jwtService: JwtService
  ) {
      super(httpClient, jwtService);
      this.endpoint = "series";
  }

  public getAllSeries<T extends ISerie>(search?: string): Observable<T[]> {
      return this.getAllAsList<T>(search || "").pipe(
          map((series: (ISerie | T)[]) => series as T[]) // Type assertion
      );
  }

  public getSeries<T extends ISerie>(search: string, page: number, size: number): Observable<Page<T>> {
      return this.getAllAsPage<T>(search, page, size).pipe(
          map((page: Page<ISerie>) => ({
              ...page,
              content: page.content as T[] // Type assertion
          }))
      );
  }

  public getSerie<T extends ISerie>(id_serie: number): Observable<T> {
      return this.getOneById(id_serie).pipe(
          map(res => res.body as T)
      );
  }

  public addSerie(serie: ISerie): Observable<HttpResponse<ISerie>> {
      return this.add(serie);
  }

  public updateSerie(serie: ISerie): Observable<HttpResponse<ISerie>> {
      return this.update(serie.id, serie);
  }

  public deleteSerie(id: number): Observable<HttpResponse<void>> {
      return this.delete<void>(id);
  }
}
