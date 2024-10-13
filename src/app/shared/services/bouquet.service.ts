import { Injectable } from '@angular/core';
import { IBouquet } from '../models/bouquet';
import { CrudService } from './crud.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { map, Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class BouquetService extends CrudService<IBouquet> {
  constructor(
    httpClient: HttpClient,
    jwtService: JwtService
  ) {
    super(httpClient, jwtService);
    this.endpoint = "bouquets";
  }

  public getAllBouquets<T extends IBouquet>(search?: string): Observable<T[]> {
    return this.getAllAsList<T>(search || "").pipe(
      map((bouquets: (IBouquet | T)[]) => bouquets as T[]) // Type assertion
    );
  }

  public getBouquets<T extends IBouquet>(search: string, page: number, size: number): Observable<Page<T>> {
    return this.getAllAsPage<T>(search, page, size).pipe(
      map((page: Page<IBouquet>) => ({
        ...page,
        content: page.content as T[] // Type assertion
      }))
    );
  }

  public getBouquet(id_bouquet: number): Observable<HttpResponse<IBouquet>> {
    return this.getOneById(id_bouquet);
  }

  public addBouquet(bouquet: IBouquet): Observable<HttpResponse<IBouquet>> {
    return this.add(bouquet);
  }

  public updateBouquet(bouquet: IBouquet): Observable<HttpResponse<IBouquet>> {
    return this.update(bouquet.id, bouquet);
  }

  public deleteBouquet(id: number): Observable<HttpResponse<void>> {
    return this.delete<void>(id);
  }
}
