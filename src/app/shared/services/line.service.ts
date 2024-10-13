import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ILine, LineDetail } from '../models/line';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { map, Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class LineService extends CrudService<ILine> {
  constructor(
    httpClient: HttpClient,
    jwtService: JwtService
  ) {
    super(httpClient, jwtService);
    this.endpoint = "lines";
  }

  public getAllLines<T extends ILine>(search?: string): Observable<T[]> {
    return this.getAllAsList<T>(search || "").pipe(
      map((lines: (ILine | T)[]) => lines as T[]) // Type assertion
    );
  }

  public getLines<T extends ILine>(search: string, page: number, size: number): Observable<Page<T>> {
    return this.getAllAsPage<T>(search, page, size).pipe(
      map((page: Page<ILine>) => ({
        ...page,
        content: page.content as T[] // Type assertion
      }))
    );
  }

  public getLine<T extends ILine>(id_line: number): Observable<T> {
    return this.getOneById(id_line).pipe(map(res => res.body as T));
  }

  public addLine(line: ILine): Observable<HttpResponse<ILine>> {
    return this.add(line);
  }

  public updateLine(line: ILine): Observable<HttpResponse<ILine>> {
    return this.update(line.id, line);
  }

  public deleteLine(id: number): Observable<HttpResponse<void>> {
    return this.delete<void>(id);
  }
}
