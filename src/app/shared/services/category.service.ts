import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { ICategory } from '../models/category';
import { map, Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CrudService<ICategory> {

  constructor(
    httpClient: HttpClient,
    jwtService: JwtService
) {
    super(httpClient, jwtService);
    this.endpoint = "categories";
}

public getAllCategories<T extends ICategory>(search?: string): Observable<T[]> {
  return this.getAllAsList<T>(search || "").pipe(
      map((bouquets: (ICategory | T)[]) => bouquets as T[]) // Type assertion
  );
}

public getCategories<T extends ICategory>(search: string, page: number, size: number): Observable<Page<T>> {
  return this.getAllAsPage<T>(search, page, size).pipe(
      map((page: Page<ICategory>) => ({
          ...page,
          content: page.content as T[] // Type assertion
      }))
  );
}

public getCategory<T extends ICategory>(id_bouquet: number): Observable<T> {
  return this.getOneById(id_bouquet).pipe(
      map(res => res.body as T)
  );
}

public addCategory(bouquet: ICategory): Observable<HttpResponse<ICategory>> {
  return this.add(bouquet);
}

public updateCategory(bouquet: ICategory): Observable<HttpResponse<ICategory>> {
  return this.update(bouquet.id, bouquet);
}

public deleteCategory(id: number): Observable<HttpResponse<void>> {
  return this.delete<void>(id);
}
}
